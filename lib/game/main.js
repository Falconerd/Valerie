ig.module('game.main')
    .requires(
        'plusplus.core.plusplus',
        'game.levels.boss',

        'plusplus.debug.debug'
)
    .defines(function() {
        'use strict';

        var _c = ig.CONFIG;
        var _pf = ig.pathfinding;
        var _utt = ig.utilstile;
        var _ut = ig.utils;

        var Valerie = ig.GameExtended.extend({

            sortBy: ig.Game.SORT.POS_Y,

            init: function() {

                this.parent();

                this.loadLevel(ig.global.LevelBoss);

            },

            inputStart: function() {

                this.parent();

                ig.input.bind(ig.KEY.M, 'shoot');

            },

            inputEnd: function() {

                this.parent();

                ig.input.unbind(ig.KEY.M, 'shoot');

            },

            /**
             * Game setup of required properties and elements. Called automatically and guaranteed to be called before anything else.
             * @private
             */
            setup: function() {

                this._gameNeedsSetup = false;

                this.onPaused = new ig.Signal();
                this.onUnpaused = new ig.Signal();

                if (this.cameraClass) {

                    this.camera = new(this.cameraClass)(this.cameraSettings);

                }

                if (this.playerManagerClass) {

                    this.playerManager = new(this.playerManagerClass)(this.playerManagerSettings);

                }

                // setup core layers

                this.sortLayersBy = this.sortLayersBy || ig.Game.SORT.Z_INDEX;

                this.addLayer(new ig.Layer('backgroundMaps', {
                    preRender: _c.PRERENDER_BACKGROUND_LAYER,
                    noUpdate: _c.NO_UPDATE_BACKGROUND_LAYER
                }));

                this.addLayer(new ig.Layer('entities'));

                this.addLayer(new ig.Layer('lights'));


                this.addLayer(new ig.Layer('foregroundMaps', {
                    preRender: _c.PRERENDER_FOREGROUND_LAYER,
                    noUpdate: _c.NO_UPDATE_FOREGROUND_LAYER
                }));

                this.addLayer(new ig.Layer('overlay', {
                    zIndex: 1,
                    ignorePause: _c.IGNORE_PAUSE_OVERLAY_LAYER,
                    autoSort: _c.AUTO_SORT_OVERLAY_LAYER
                }));

                this.addLayer(new ig.Layer('ui', {
                    zIndex: 2,
                    clearOnLoad: _c.CLEAR_ON_LOAD_UI_LAYER,
                    ignorePause: _c.IGNORE_PAUSE_UI_LAYER,
                    autoSort: _c.AUTO_SORT_UI_LAYER
                }));

                // setup custom layers

                for (var layerName in _c.LAYERS_CUSTOM) {

                    var layerSettings = _c.LAYERS_CUSTOM[layerName];

                    this.addLayer(new ig.Layer(layerName, layerSettings));

                }

                this._addDeferredLayers();

                ig.global.addEventListener('resize', _ut.debounce(this.resize.bind(this), _c.RESIZE_DELAY), false);
                this.resize();

                this.inputStart();

            },

            /**
             * Builds a level immediately.
             * <span class="alert"><strong>IMPORTANT:</strong> for proper stability, use {@link ig.GameExtended#loadLevelDeferred} instead.</span>
             **/
            buildLevel: function() {

                if (this._gameNeedsSetup) {

                    this.setup();

                }

                var levelData = this._levelToBuild;
                var playerSpawnerName = this._playerSpawnerName;
                var entData, ld, newMap;
                var i, il;

                if (levelData) {

                    // start building new

                    this._levelBuilding = true;

                    // unload previous level

                    this.unloadLevel();

                    // maps

                    this.collisionMap = ig.CollisionMap.staticNoCollision;

                    for (i = 0; i < levelData.layer.length; i++) {

                        ld = levelData.layer[i];

                        if (ld.name === 'lighting') {

                            this.lightingMap = new ig.CollisionMap(ld.tilesize, ld.data);

                        } else if (ld.name === 'collision') {

                            this.collisionMap = new ig.CollisionMap(ld.tilesize, ld.data);

                        } else if (ld.name === 'pathfinding') {

                            this.pathfindingMap = new ig.PathfindingMap(ld.tilesize, ld.data);

                        } else {

                            newMap = new ig.BackgroundMapExtended(ld.tilesize, ld.data, ld.tilesetName);
                            newMap.anims = this.backgroundAnims[ld.tilesetName] || {};
                            newMap.repeat = ld.repeat;
                            newMap.distance = ld.distance;
                            newMap.foreground = !!ld.foreground;
                            newMap.preRender = !!ld.preRender;
                            newMap.name = ld.name;

                            // no layer provided, which means we guesstimate
                            if (!newMap.layerName && newMap.foreground) {
                                newMap.layerName = 'foregroundMaps';
                            } else if (!newMap.layerName) {
                                newMap.layerName = 'backgroundMaps';
                            }

                            this.addItem(newMap);

                        }

                    }

                    // build tile shapes

                    _utt.rebuild(this.collisionMap);

                    // create shapes

                    this.createShapes();

                    // build pathfinding for level

                    if (_c.PATHFINDING.BUILD_WITH_LEVEL) {

                        _pf.rebuild(this.collisionMap, this.pathfindingMap);

                    }

                    // entities

                    this.namedEntities = {};

                    for (i = 0, il = levelData.entities.length; i < il; i++) {

                        entData = levelData.entities[i];

                        this.spawnEntity(entData.type, entData.x, entData.y, entData.settings);

                    }

                    // find player if already spawned

                    var player = this.getPlayer();

                    // else try to auto spawn

                    if (!player && this.autoSpawnPlayer) {

                        // player must have already spawned at least once
                        // or the game must have a player class to spawn

                        player = this.persistentEntities['player'] || this.playerClass;

                        if (player) {

                            this.spawnEntity(player, 0, 0);

                        }

                    }

                    // complete transition

                    if (this.transitioner) {

                        if (!this.transitioner._layerNameAdd) {
                            this.spawnEntity(this.transitioner, 0, 0, {
                                alpha: 1
                            });

                        } else {

                            this.transitioner.alpha = 1;


                        }
                        this.transitioner.fadeToDeath();
                        this.transitioner = undefined;

                    }

                    // immediately sort all layers

                    for (i = 0, il = this.layers.length; i < il; i++) {

                        var layer = this.layers[i];
                        layer.items.sort(layer.sortBy);

                    }

                    // level done building

                    this._levelBuilding = false;
                    this.hasLevel = true;

                    // set all layers ready

                    for (i = 0, il = this.layers.length; i < il; i++) {

                        this.layers[i].ready();

                    }

                    // move player to spawner

                    if (player && playerSpawnerName) {

                        var playerSpawner = this.namedEntities[playerSpawnerName];

                        if (playerSpawner) {

                            // try to spawn

                            if (playerSpawner instanceof ig.Spawner) {

                                playerSpawner.spawnNext(player);

                            }
                            // else move to
                            else {

                                player.moveToPosition(playerSpawner);

                            }

                        }

                    }

                    this.unpause(true);

                    if (this.camera) {

                        this.camera.ready();

                    }

                    if (this.playerManager) {

                        this.playerManager.ready();

                    }

                    this.resize(true);

                    this.dirtyEntities = this.dirtyLights = true;

                }

            },

            /**
             * Converts lighting map to shapes.
             **/
            createShapes: function() {

                var i, il;
                var options, shapes;

                if (this.shapesPasses && this.lightingMap) {

                    for (var pass in this.shapesPasses) {

                        options = this.shapesPasses[pass];
                        shapes = _utt.shapesFromCollisionMap(this.lightingMap, options);

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

            // convert the collision map shapes
            // either or both can be removed
            shapesPasses: [
                // for climbing
                // we ignore solids and one ways
                // to only retrieve climbable areas
                {
                    ignoreSolids: true,
                    ignoreOneWays: true
                },
                // for lighting and shadows
                // we ignore climbables and the edge boundary
                {
                    ignoreClimbable: true,
                    // throw away the inner loop of the edge of the map
                    discardBoundaryInner: false,
                    // throw away the outer loop of the edge of the map
                    retainBoundaryOuter: false
                }
            ]

        });

        ig.main('#canvas', Valerie, _c.GAME_FPS, _c.GAME_WIDTH, _c.GAME_HEIGHT, _c.GAME_SCALE, ig.LoaderExtended);

    });