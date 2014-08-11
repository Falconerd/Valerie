ig.module('ember.light.main')
    .requires('ember.light.entity')
    .defines(function() {

        ig.EmberLight = {

            initialized: false,

            /**
             * This queue stores entities until it is safe to push them into
             * the entities array.
             * @type {Array}
             */
            entityQueue: [],

            /**
             * This is where the entities are stored.
             * @type {Array}
             */
            entities: [],

            segmentCount: 0,

            /**
             * The vertices generation code was originally written by a brilliant person and bestest buddie, Shale Kuzmanovski in C#, specifically for this. I just ported it over and failed to optimize it :)
             * TODO: Optimize it. Rewrite the whole thing, actually. It is pretty badly organised. Will work on this a bit later.
             *
             * The lighting code is from a developer named Ncase. He made the game Nothing To Hide and put a tutorial up about his lighting system. Awesome.
             */
            initialize: function() {

                this.initialized = true;

                var tilesize = ig.game.level.layer[0].tilesize;

                this.tilesize = tilesize;

                this.map = ig.game.level.lightMap;

                var map = this.map;

                var arr = map.slice();

                var pairs = [];

                for (var i = 0; i < map.length; i++) {

                    pairs.push(this.findSequences(arr[i], i));

                }

                this.segments = this.combineRectangles(pairs);

            },

            queueEntity: function(entity) {

                this.entityQueue.push(entity);

            },

            updateEntities: function() {

                if (this.entityQueue.length > 0) {

                    this.entities.push(this.entityQueue[0]);
                    this.entityQueue.splice(0, 1);

                }

            },

            combineRectangles: function(pairs) {

                var exit = true;

                do {

                    exit = true;

                    for (var i = 0; i < pairs.length - 1; i++) {
                        for (var j = 0; j < pairs[i].length; j++) {
                            for (var k = 0; k < pairs[i + 1].length; k++) {

                                if (pairs[i][j].start.x === pairs[i + 1][k].start.x && pairs[i][j].end.x === pairs[i + 1][k].end.x) {

                                    pairs[i][j].end.y = pairs[i + 1][k].end.y;
                                    pairs[i + 1].splice(k, 1);

                                    if (k >= 1) k--;

                                    exit = false;

                                }
                            }
                        }

                        if (pairs[i + 1].length === 0) {

                            pairs.splice(i + 1, 1);

                        }

                    }

                } while (!exit);

                var rectangleList = [];

                for (var i = 0; i < pairs.length; i++) {
                    for (var j = 0; j < pairs[i].length; j++) {

                        rectangleList.push(pairs[i][j]);

                    }
                }

                do {

                    exit = true;

                    for (var i = 0; i < rectangleList.length; i++) {
                        for (var j = 0; j < rectangleList.length; j++) {

                            var iRectangle = rectangleList[i];
                            var jRectangle = rectangleList[j];

                            /* Check to see if these rectangles are the same width */
                            if (iRectangle.start.x == jRectangle.start.x && iRectangle.end.x == jRectangle.end.x) {

                                /* Check to see if these rectangles are connected vertically */
                                if (iRectangle.end.y == jRectangle.start.y - 1) {

                                    iRectangle.end.y = jRectangle.end.y;
                                    rectangleList.splice(j, 1);
                                    exit = false;

                                }

                            }

                        }
                    }

                } while (!exit);

                var revisedList = [];

                for (var i = rectangleList.length - 1; i >= 0; i--) {

                    var pos = rectangleList[i];

                    var topLeft = {
                        x: pos.start.x,
                        y: pos.start.y
                    };
                    var topRight = {
                        x: pos.end.x + 1,
                        y: pos.start.y
                    };
                    var bottomRight = {
                        x: pos.end.x + 1,
                        y: pos.end.y + 1
                    };
                    var bottomLeft = {
                        x: pos.start.x,
                        y: pos.end.y + 1
                    };

                    revisedList.push({
                        start: topLeft,
                        end: topRight
                    });
                    revisedList.push({
                        start: topRight,
                        end: bottomRight
                    });
                    revisedList.push({
                        start: bottomRight,
                        end: bottomLeft
                    });
                    revisedList.push({
                        start: bottomLeft,
                        end: topLeft
                    });

                }

                return revisedList;

            },

            findSequences: function(array, height) {

                var list = [];

                var persist = false;
                var start = -1;
                var end = -1;

                for (var i = 0; i < array.length; i++) {

                    if (array[i] == 1 && persist == false) {

                        start = i;
                        end = i;
                        persist = true;

                    } else if (array[i] == 1 && persist == true) {

                        end++;

                    } else if (array[i] == 0 && persist == true) {

                        list.push({
                            start: {
                                x: start,
                                y: height
                            },
                            end: {
                                x: end,
                                y: height
                            }
                        });
                        persist = false;

                    }

                }

                if (persist == true) {

                    list.push({
                        start: {
                            x: start,
                            y: height
                        },
                        end: {
                            x: end,
                            y: height
                        }
                    });

                }

                return list;

            },

            getIntersection: function(ray, segment) {

                // RAY in parametric: Point + Delta*T1
                var r_px = ray.start.x;
                var r_py = ray.start.y;
                var r_dx = ray.end.x - ray.start.x;
                var r_dy = ray.end.y - ray.start.y;

                // SEGMENT in parametric: Point + Delta*T2
                var s_px = segment.start.x;
                var s_py = segment.start.y;
                var s_dx = segment.end.x - segment.start.x;
                var s_dy = segment.end.y - segment.start.y;

                // Are they parallel? If so, no intersect
                var r_mag = Math.sqrt(r_dx * r_dx + r_dy * r_dy);
                var s_mag = Math.sqrt(s_dx * s_dx + s_dy * s_dy);
                if (r_dx / r_mag == s_dx / s_mag && r_dy / r_mag == s_dy / s_mag) {
                    // Unit vectors are the same.
                    return null;
                }

                // SOLVE FOR T1 & T2
                // r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
                // ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
                // ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
                // ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
                var T2 = (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy - s_dy * r_dx);
                var T1 = (s_px + s_dx * T2 - r_px) / r_dx;

                // Must be within parametic whatevers for RAY/SEGMENT
                if (T1 < 0) return null;
                if (T2 < 0 || T2 > 1) return null;

                // Return the POINT OF INTERSECTION
                return {
                    x: r_px + r_dx * T1,
                    y: r_py + r_dy * T1,
                    param: T1
                }

            },

            drawThings: function() {

                if (!this.initialized) return this.initialize();

                if (this.map == undefined || this.segments == undefined) return;

                this.updateEntities();

                this.drawLightingThings();

            },

            drawLightingThings: function() {

                for (var i = 0; this.entities; i++) {

                    this.entity = this.entities[i];

                    if (this.entity == undefined) return;

                    var ctx = ig.system.context;

                    var segments = this.updateSegmentLocation(this.segments);

                    var points = this.getPoints(segments);

                    var uniquePoints = this.getUniquePoints(points);

                    var uniqueAngles = this.getUniqueAngles(uniquePoints);

                    var intersects = this.getIntersects(uniqueAngles, segments);

                    ctx.fillStyle = "#fff";
                    ctx.beginPath();
                    ctx.moveTo(intersects[0].x, intersects[0].y);
                    for (var i = 1; i < intersects.length; i++) {
                        var intersect = intersects[i];
                        ctx.lineTo(intersect.x, intersect.y);
                    }
                    ctx.fill();

                }

            },

            cullUnseenSegments: function(segments) {
                return this.updateSegmentLocation(segments);
            },

            updateSegmentLocation: function(segments) {

                var array = [];
                var screenX = ig.game.screen.x;
                var screenY = ig.game.screen.y;
                var width = ig.system.realWidth;
                var height = ig.system.realHeight;

                for (var i = 0; i < segments.length; i++) {

                    var segment = segments[i];

                    var object = {
                        start: {
                            x: (segment.start.x * this.tilesize - screenX) * ig.system.scale,
                            y: (segment.start.y * this.tilesize - screenY) * ig.system.scale
                        },
                        end: {
                            x: (segment.end.x * this.tilesize - screenX) * ig.system.scale,
                            y: (segment.end.y * this.tilesize - screenY) * ig.system.scale
                        }
                    }

                    if (object.end.x > screenX || object.end.y > screenY || object.start.x < screenX + width || object.start.y < screenY + height) {
                        array.push(object);
                    }

                }

                this.segmentCount = array.length;

                return array;

            },

            getPoints: function(segments) {

                var array = [];

                segments.forEach(function(segment) {

                    array.push(segment.start, segment.end);

                });

                return array;

            },

            getUniquePoints: function(points) {

                var set = {};
                return points.filter(function(point) {

                    var key = point.x + "," + point.y;
                    if (key in set) {
                        return false;
                    } else {
                        set [key] = true;
                        return true;
                    }

                });

            },

            getUniqueAngles: function(uniquePoints) {

                var array = [];

                for (var i = 0; i < uniquePoints.length; i++) {

                    var uniquePoint = uniquePoints[i];
                    var angle = Math.atan2(uniquePoint.y - (this.entity.pos.y - ig.game.screen.y) * ig.system.scale, uniquePoint.x - (this.entity.pos.x - ig.game.screen.x) * ig.system.scale);
                    uniquePoint.angle = angle;
                    array.push(angle - 0.00001, angle, angle + 0.00001);

                }

                return array;

            },

            getIntersects: function(uniqueAngles, segments) {

                var intersects = [];
                for (var j = 0; j < uniqueAngles.length; j++) {
                    var angle = uniqueAngles[j];

                    // Calculate dx & dy from angle
                    var dx = Math.cos(angle);
                    var dy = Math.sin(angle);

                    // Ray from center of screen to mouse
                    var ray = {
                        start: {
                            x: (this.entity.pos.x - ig.game.screen.x) * ig.system.scale,
                            y: (this.entity.pos.y - ig.game.screen.y) * ig.system.scale
                        },
                        end: {
                            x: (this.entity.pos.x - ig.game.screen.x) * ig.system.scale + dx,
                            y: (this.entity.pos.y - ig.game.screen.y) * ig.system.scale + dy
                        }
                    };

                    // Find CLOSEST intersection
                    var closestIntersect = null;
                    for (var i = 0; i < segments.length; i++) {
                        var intersect = this.getIntersection(ray, segments[i]);
                        if (!intersect) continue;
                        if (!closestIntersect || intersect.param < closestIntersect.param) {
                            closestIntersect = intersect;
                        }
                    }

                    // Intersect angle
                    if (!closestIntersect) continue;
                    closestIntersect.angle = angle;

                    // Add to list of intersects
                    intersects.push(closestIntersect);

                }

                // Sort intersects by angle
                intersects = intersects.sort(function(a, b) {
                    return a.angle - b.angle;
                });

                return intersects;

            },

            log: function(thing) {
                return console.log(JSON.stringify(thing));
            }

        }

    });