ig.module('game.constants')
    .defines(function() {
        'use strict';

        ig.constants = {};

        /**
         * Collision base configuration settings.
         * <span class="alert alert-error"><strong>IMPORTANT:</strong> Don't modify config directly! (see example)</span>
         * @example
         * // in order to add your own custom configuration to Impact++
         * // edit the file defining ig.constants_USER, 'plusplus.config-user'
         * // ig.constants_USER is never modified by Impact++ (it is strictly for your use)
         * // ig.constants_USER is automatically merged over Impact++'s config
         * @static
         * @readonly
         * @memberof ig.constants
         * @namespace ig.constants.COLLISION
         * @author Collin Hover - collinhover.com
         **/
        ig.constants.COLLISION = {};

        /**
         * Whether to allow two fixed entities to collide just like any other entities.
         * @type {Number}
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.ALLOW_FIXED = false;

        /**
         * Solid tile.
         * @type {Number}
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILE_SOLID = 1;

        /**
         * One way up tile.
         * @type {Number}
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILE_ONE_WAY_UP = 12;

        /**
         * One way down tile.
         * @type {Number}
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILE_ONE_WAY_DOWN = 23;

        /**
         * One way right tile.
         * @type {Number}
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILE_ONE_WAY_RIGHT = 34;

        /**
         * One way left tile.
         * @type {Number}
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILE_ONE_WAY_LEFT = 45;

        /**
         * Climbable tile with a top.
         * @type {Number}
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILE_CLIMBABLE_WITH_TOP = 46;

        /**
         * Climbable tile.
         * @type {Number}
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILE_CLIMBABLE = 47;

        /**
         * Stairs tile with a top.
         * @type {Number}
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILE_CLIMBABLE_STAIRS_WITH_TOP = 48;

        /**
         * Stairs tile.
         * @type {Number}
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILE_CLIMBABLE_STAIRS = 49;

        /**
         * Hash of one way collision map tiles.
         * @type Array
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILES_HASH_ONE_WAY = {};
        ig.constants.COLLISION.TILES_HASH_ONE_WAY[ig.constants.COLLISION.TILE_ONE_WAY_UP] = true;
        ig.constants.COLLISION.TILES_HASH_ONE_WAY[ig.constants.COLLISION.TILE_ONE_WAY_DOWN] = true;
        ig.constants.COLLISION.TILES_HASH_ONE_WAY[ig.constants.COLLISION.TILE_ONE_WAY_RIGHT] = true;
        ig.constants.COLLISION.TILES_HASH_ONE_WAY[ig.constants.COLLISION.TILE_ONE_WAY_LEFT] = true;
        ig.constants.COLLISION.TILES_HASH_ONE_WAY[ig.constants.COLLISION.TILE_CLIMBABLE_WITH_TOP] = true;
        ig.constants.COLLISION.TILES_HASH_ONE_WAY[ig.constants.COLLISION.TILE_CLIMBABLE_STAIRS_WITH_TOP] = true;

        /**
         * Hash of climbable collision map tiles.
         * @type Array
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILES_HASH_CLIMBABLE = {};
        ig.constants.COLLISION.TILES_HASH_CLIMBABLE[ig.constants.COLLISION.TILE_CLIMBABLE_WITH_TOP] = true;
        ig.constants.COLLISION.TILES_HASH_CLIMBABLE[ig.constants.COLLISION.TILE_CLIMBABLE] = true;
        ig.constants.COLLISION.TILES_HASH_CLIMBABLE[ig.constants.COLLISION.TILE_CLIMBABLE_STAIRS_WITH_TOP] = true;
        ig.constants.COLLISION.TILES_HASH_CLIMBABLE[ig.constants.COLLISION.TILE_CLIMBABLE_STAIRS] = true;

        /**
         * Hash of climbable one way collision map tiles.
         * @type Array
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILES_HASH_CLIMBABLE_ONE_WAY = {};
        ig.constants.COLLISION.TILES_HASH_CLIMBABLE_ONE_WAY[ig.constants.COLLISION.TILE_CLIMBABLE_WITH_TOP] = true;
        ig.constants.COLLISION.TILES_HASH_CLIMBABLE_ONE_WAY[ig.constants.COLLISION.TILE_CLIMBABLE_STAIRS_WITH_TOP] = true;

        /**
         * Hash of climbable stairs collision map tiles.
         * @type Array
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILES_HASH_CLIMBABLE_STAIRS = {};
        ig.constants.COLLISION.TILES_HASH_CLIMBABLE_STAIRS[ig.constants.COLLISION.TILE_CLIMBABLE_STAIRS_WITH_TOP] = true;
        ig.constants.COLLISION.TILES_HASH_CLIMBABLE_STAIRS[ig.constants.COLLISION.TILE_CLIMBABLE_STAIRS] = true;

        /**
         * Hash of walkable collision map tiles.
         * @type Array
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILES_HASH_WALKABLE = {
            0: true,
            50: true,
            51: true
        };
        ig.constants.COLLISION.TILES_HASH_WALKABLE[ig.constants.COLLISION.TILE_ONE_WAY_UP] = true;
        ig.constants.COLLISION.TILES_HASH_WALKABLE[ig.constants.COLLISION.TILE_ONE_WAY_DOWN] = true;
        ig.constants.COLLISION.TILES_HASH_WALKABLE[ig.constants.COLLISION.TILE_ONE_WAY_RIGHT] = true;
        ig.constants.COLLISION.TILES_HASH_WALKABLE[ig.constants.COLLISION.TILE_ONE_WAY_LEFT] = true;
        ig.constants.COLLISION.TILES_HASH_WALKABLE[ig.constants.COLLISION.TILE_CLIMBABLE_WITH_TOP] = true;
        ig.constants.COLLISION.TILES_HASH_WALKABLE[ig.constants.COLLISION.TILE_CLIMBABLE] = true;
        ig.constants.COLLISION.TILES_HASH_WALKABLE[ig.constants.COLLISION.TILE_CLIMBABLE_STAIRS_WITH_TOP] = true;
        ig.constants.COLLISION.TILES_HASH_WALKABLE[ig.constants.COLLISION.TILE_CLIMBABLE_STAIRS] = true;

        /**
         * Hash of strictly walkable, i.e. empty, collision map tiles.
         * @type Array
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILES_HASH_WALKABLE_STRICT = {
            0: true,
            50: true,
            51: true
        };
        ig.constants.COLLISION.TILES_HASH_WALKABLE_STRICT[ig.constants.COLLISION.TILE_CLIMBABLE] = true;
        ig.constants.COLLISION.TILES_HASH_WALKABLE_STRICT[ig.constants.COLLISION.TILE_CLIMBABLE_STAIRS] = true;

        /**
         * Hash of sloped collision map tiles.
         * @type Array
         * @memberof ig.constants.COLLISION
         */
        ig.constants.COLLISION.TILES_HASH_SLOPED = {
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            13: true,
            14: true,
            15: true,
            16: true,
            17: true,
            18: true,
            19: true,
            20: true,
            21: true,
            22: true,
            24: true,
            25: true,
            26: true,
            27: true,
            28: true,
            29: true,
            30: true,
            31: true,
            32: true,
            33: true,
            35: true,
            36: true,
            37: true,
            38: true,
            39: true,
            40: true,
            41: true,
            42: true,
            43: true,
            44: true,
            52: true,
            53: true,
            54: true,
            55: true
        };

        ig.constants.ENTITY = {};
        ig.constants.ENTITY.SPEED_X = 100;
        ig.constants.ENTITY.SPEED_Y = 100;
        ig.constants.FRICTION_X = 100;
        ig.constants.MAX_VEL_X = 100;

        ig.constants.POLYGONS = {};

        ig.constants.POLYGONS.CONE = {};

        ig.constants.POLYGONS.CONE.N = function(length, width) {

            return {
                a: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: -width * .5,
                    y: -length * .75
                },
                c: {
                    x: width * .5,
                    y: -length * .75
                }
            };

        };

        ig.constants.POLYGONS.CONE.NE = function(length, width) {

            return {
                a: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: width * 1.5,
                    y: -length * .25
                },
                c: {
                    x: width * .5,
                    y: -length * .75
                }
            };

        };

        ig.constants.POLYGONS.CONE.E = function(length, width) {

            return {
                a: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: width * 1.5,
                    y: length * .25
                },
                c: {
                    x: width * 1.5,
                    y: -length * .25
                }
            };

        };

        ig.constants.POLYGONS.CONE.SE = function(length, width) {

            return {
                a: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: width * .5,
                    y: length * .75
                },
                c: {
                    x: width * 1.5,
                    y: length * .25
                }
            };

        };

        ig.constants.POLYGONS.CONE.S = function(length, width) {

            return {
                a: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: -width * .5,
                    y: length * .75
                },
                c: {
                    x: width * .5,
                    y: length * .75
                }
            };

        };

        ig.constants.POLYGONS.CONE.SW = function(length, width) {

            return {
                a: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: -width * 1.5,
                    y: length * .25
                },
                c: {
                    x: -width * .5,
                    y: length * .75
                }
            };

        };

        ig.constants.POLYGONS.CONE.W = function(length, width) {

            return {
                a: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: -width * 1.5,
                    y: length * .25
                },
                c: {
                    x: -width * 1.5,
                    y: -length * .25
                }
            };

        };

        ig.constants.POLYGONS.CONE.NW = function(length, width) {

            return {
                a: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: -width * 1.5,
                    y: -length * .25
                },
                c: {
                    x: -width * .5,
                    y: -length * .75
                }
            };

        };

    });