ig.module(
    'plugins.box2d.game'
)
    .requires(
        'plugins.box2d.lib',
        'impact.game',
        'utils.tile'
)
    .defines(function() {

        var _utt = ig.utils.tile;

        ig.Box2DGame = ig.Game.extend({

            collisionRects: [],
            debugCollisionShapes: false,

            worldVelocityIterations: 6,
            worldPositionIterations: 6,

            shapesPasses: {
                level: {
                    retainBoundaryOuter: false,
                    discardEdgesInner: true,
                    ignoreClimbables: true,
                    ignoreOneWays: true
                },
                climbables: {
                    ignoreSolids: true,
                    ignoreOneWays: true
                }
            },

            shapesLevel: [],

            loadLevel: function(data) {

                // Find the collision layer and create the box2d world from it
                for (var i = 0; i < data.layer.length; i++) {
                    var ld = data.layer[i];
                    if (ld.name == 'collision') {
                        this.collisionMap = new ig.CollisionMap(ld.tilesize, ld.data);
                        break;
                    }
                }

                // build tile shapes

                _utt.rebuild(this.collisionMap);

                // create shapes

                this.createShapes();

                ig.world = this.createWorld(this.collisionMap.width, this.collisionMap.height, this.collisionMap.tilesize);

                this.parent(data);
            },

            /**
             * Converts collision map to shapes.
             **/
            createShapes: function() {

                var i, il;
                var options, shapes;

                if (this.shapesPasses && this.collisionMap) {

                    for (var pass in this.shapesPasses) {

                        options = this.shapesPasses[pass];

                        shapes = _utt.shapesFromCollisionMap(this.collisionMap, options);

                        // solid shapes

                        for (i = 0, il = shapes.solids.length; i < il; i++) {

                            var shape = shapes.solids[i];

                            // special case for when pass is for level inner shape

                            if (pass === "level") {

                                shape.size = shape.settings.size;
                                shape.vertices = shape.settings.vertices;
                                delete shape.id;
                                delete shape.settings;

                                this.shapesLevel.push(shape);

                            } else {

                                this.spawnEntity(ig.EntityShapeSolid, shape.x, shape.y, shape.settings);

                            }

                        }

                        // one-way shapes

                        for (i = 0, il = shapes.oneWays.length; i < il; i++) {

                            var shape = shapes.oneWays[i];
                            this.spawnEntity(ig.EntityShapeSolid, shape.x, shape.y, shape.settings);

                        }

                        // climbable shapes

                        for (i = 0, il = shapes.climbables.length; i < il; i++) {

                            var shape = shapes.climbables[i];
                            this.spawnEntity((shape.settings.oneWay ? ig.EntityShapeClimbableOneWay : ig.EntityShapeClimbable), shape.x, shape.y, shape.settings);

                        }

                    }

                }

            },

            createWorld: function(width, height, tilesize) {
                var worldBoundingBox = new Box2D.Collision.b2AABB();
                worldBoundingBox.lowerBound.Set(0, 0);
                worldBoundingBox.upperBound.Set(
                    (width + 1) * tilesize * Box2D.SCALE, (height + 1) * tilesize * Box2D.SCALE
                );

            var gravity = new Box2D.Common.Math.b2Vec2(0, 0);
                world = new Box2D.Dynamics.b2World(gravity, true);

                var shapes = ig.copy(this.shapesLevel);

                for (var i = 0; i < shapes.length; i++) {

                    var shape = shapes[i];
                    var width = shape.size.x;
                    var height = shape.size.y;
                    var vertices = shape.vertices;

                    console.log(shape, width, height, vertices);

                    for (i = 0; i < vertices.length; i++) {

                        vertices[i].x *= Box2D.SCALE;
                        vertices[i].y *= Box2D.SCALE;

                    }

                    var bodyDef = new Box2D.Dynamics.b2BodyDef();
                    bodyDef.position.Set(
                        shape.x * Box2D.SCALE + (width / 2) * Box2D.SCALE,
                        shape.y * Box2D.SCALE + (height / 2) * Box2D.SCALE
                    );

                    var body = world.CreateBody(bodyDef);
                    var b2shape = new Box2D.Collision.Shapes.b2PolygonShape();
                    b2shape.SetAsArray(vertices, vertices.length);
                    body.CreateFixture2(b2shape);

                }

                return world;

            },


            update: function() {
                ig.world.Step(
                    ig.system.tick,
                    this.worldVelocityIterations,
                    this.worldPositionIterations
                );
                ig.world.ClearForces();
                this.parent();
            },


            draw: function() {
                this.parent();

                if (this.debugCollisionShapes) {
                    // Draw outlines of all collision rects
                    var ts = this.collisionMap.tilesize;
                    var ctx = ig.system.context;

                    ctx.save();

                    for (var k in this.shapesLevel) {

                        if (this.shapesLevel.hasOwnProperty(k)) {

                            var shape = this.shapesLevel[k];

                            ctx.fillStyle = 'rgba(200,255,200,.2)';

                            ctx.fillRect(shape.x - this.screen.x, shape.y - this.screen.y, shape.size.x, shape.size.y);

                            ctx.strokeStyle = '#00ff00';

                            var x = shape.x + shape.size.x * .5 - this.screen.x
                            var y = shape.y + shape.size.y * .5 - this.screen.y

                            for (i = 0; i < shape.vertices.length; i++) {
                                ctx.beginPath();
                                ctx.moveTo(x + shape.vertices[i].x, y + shape.vertices[i].y);
                                if (i == shape.vertices.length - 1) {
                                    ctx.lineTo(x + shape.vertices[0].x, y + shape.vertices[0].y);
                                    ctx.closePath();
                                } else {
                                    ctx.lineTo(x + shape.vertices[i + 1].x, y + shape.vertices[i + 1].y);
                                }
                                ctx.stroke();

                            }

                        }

                    }

                    ctx.restore();

                    // for (var i = 0; i < this.collisionRects.length; i++) {
                    //     var rect = this.collisionRects[i];



                    //     ig.system.context.strokeStyle = '#00ff00';
                    //     ig.system.context.strokeRect(
                    //         rect.x * ts - this.screen.x),
                    //         rect.y * ts - this.screen.y),
                    //         rect.width * ts),
                    //         rect.height * ts)
                    //     );
                    // }
                }
            }


        });

    });