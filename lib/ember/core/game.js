ig.module('ember.core.game')
    .requires(
        'impact.game',
        'ember.core.camera'
)
    .defines(function() {
        'use strict';

        /**
         * Ember mini-framework.
         */
        ig.EmberGame = ig.Game.extend({

            init: function() {

                this.resize();

                if (ig.ua.mobile) return this.initializeMobile();

                this.initializeInput();

                //this.initializeCamera();

            },

            initializeMobile: function() {

                this.initializeMobileInput();

                this.initializeCamera();

            },

            initializeInput: function() {

                ig.input.bind(ig.KEY.MOUSE1, 'leftClick');
                ig.input.bind(ig.KEY.MOUSE2, 'rightClick');
                ig.input.bind(ig.KEY.SHIFT, 'shift');
                ig.input.bind(ig.KEY.CTRL, 'ctrl');
                ig.input.bind(ig.KEY.Q, 'ability1');
                ig.input.bind(ig.KEY.W, 'ability2');
                ig.input.bind(ig.KEY.E, 'ability3');
                ig.input.bind(ig.KEY.R, 'ability4');
                //ig.input.bind(ig.KEY.F, 'f');

            },

            initializeMobileInput: function() {



            },

            initializeCamera: function() {

                this.camera = new ig.EmberCamera(ig.system.width / 4, ig.system.height / 4, 5);
                this.camera.trap.size.x = ig.system.width / 10;
                this.camera.trap.size.y = ig.system.height / 10;
                this.camera.lookAhead.x = ig.system.width / 6;
                this.camera.lookAhead.y = ig.system.height / 6;

                var player = this.getPlayer();

                if (!player) return;

                this.camera.max.x = this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
                this.camera.max.y = this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;

                this.camera.set(player);

            },

            updateCamera: function() {

                var player = this.getPlayer();

                if (!player) return;

                if (this.shakeAmplitude > 0) {

                    this.screen.x = player.pos.x - ig.system.width / 2 + this.shakeAmplitude * (Math.random() - 0.5);
                    this.screen.y = player.pos.y - ig.system.height / 2 + this.shakeAmplitude * (Math.random() - 0.5);

                } else {

                    this.screen.x = player.pos.x - ig.system.width / 2;
                    this.screen.y = player.pos.y - ig.system.height / 2;

                }

                //this.camera.follow(player);

            },

            loadLevel: function(data) {

                /* Reset screen position. */
                this.screen = {
                    x: 0,
                    y: 0
                }

                /* Load entities */
                this.entities = [];
                this.namedEntities = {};
                for (var i = 0; i < data.entities.length; i++) {
                    var entity = data.entities[i];
                    this.spawnEntity(entity.type, entity.x, entity.y, entity.settings);
                }
                this.sortEntities();

                /* Generate the maps */
                this.collisionMap = ig.CollisionMap.staticNoCollision;
                this.backgroundMaps = [];
                this.foregroundMaps = [];
                this.unlitMap = {};
                for (var i = 0; i < data.layer.length; i++) {

                    var ld = data.layer[i];
                    if (ld.name === 'collision') {
                        this.collisionMap = new ig.CollisionMap(ld.tilesize, ld.data);
                    } else if (ld.name === 'walkable') {
                        this.walkableMap = new ig.BackgroundMap(ld.tilesize, ld.data, ld.tilesetName);
                        this.walkableMap.anims = this.backgroundAnims[ld.tilesetName] || {};
                        this.walkableMap.repeat = ld.repeat;
                        this.walkableMap.distance = ld.distance;
                        this.walkableMap.foreground = !!ld.foreground;
                        this.walkableMap.preRender = !!ld.preRender;
                        this.walkableMap.name = ld.name;

                        this.backgroundMaps.push(this.walkableMap);
                    } else {
                        var newMap = new ig.BackgroundMap(ld.tilesize, ld.data, ld.tilesetName);
                        newMap.anims = this.backgroundAnims[ld.tilesetName] || {};
                        newMap.repeat = ld.repeat;
                        newMap.distance = ld.distance;
                        newMap.foreground = !!ld.foreground;
                        newMap.preRender = !!ld.preRender;
                        newMap.unlit = !!ld.unlit;
                        newMap.name = ld.name;

                        if (newMap.foreground) {
                            this.foregroundMaps.push(newMap);
                        } else if (newMap.unlit) {
                            this.unlitMap = newMap;
                        } else {
                            this.backgroundMaps.push(newMap);
                        }
                    }

                }

                /* Call the ready function on all entities */
                for (var i = 0; i < this.entities.length; i++) {
                    this.entities[i].ready();
                }

            },

            getPlayer: function() {

                return this.getEntitiesByType(ig.EmberPlayer)[0];

            },

            update: function() {

                this.parent();

                this.updateCamera();

            },

            resize: function() {

                ig.system.resize(
                    ig.global.innerWidth * 1 * (1 / 1),
                    ig.global.innerHeight * 1 * (1 / 1),
                    1
                );

            }

        });

    });