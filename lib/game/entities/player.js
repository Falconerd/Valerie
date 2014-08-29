ig.module('game.entities.player')
    .requires('plusplus.abstractities.player', 'plusplus.ui.ui-meter', 'plusplus.entities.camera-atmosphere', 'game.entities.player-light')
    .defines(function() {
        'use strict';

        ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({

            size: {
                x: 16,
                y: 16
            },
            offset: {
                x: 16,
                y: 80
            },

            maxVelGrounded: {
                x: 200,
                y: 200
            },

            ui: {},

            persistent: true,

            opaque: true,
            performance: 'dynamic',

            animSheet: new ig.AnimationSheet('media/entities/player.png', 64, 96),
            animInit: 'idleN',
            animSettings: {
                moveN: {
                    sequence: [0],
                    frameTime: 0.1
                },
                moveNE: {
                    sequence: [1],
                    frameTime: 0.1
                },
                moveE: {
                    sequence: [2],
                    frameTime: 0.1
                },
                moveSE: {
                    sequence: [3],
                    frameTime: 0.1
                },
                moveS: {
                    sequence: [4],
                    frameTime: 0.1
                },
                moveSW: {
                    sequence: [5],
                    frameTime: 0.1
                },
                moveW: {
                    sequence: [6],
                    frameTime: 0.1
                },
                moveNW: {
                    sequence: [7],
                    frameTime: 0.1
                },
                idleN: {
                    sequence: [0],
                    frameTime: 0.1
                },
                idleNE: {
                    sequence: [1],
                    frameTime: 0.1
                },
                idleE: {
                    sequence: [2],
                    frameTime: 0.1
                },
                idleSE: {
                    sequence: [3],
                    frameTime: 0.1
                },
                idleS: {
                    sequence: [4],
                    frameTime: 0.1
                },
                idleSW: {
                    sequence: [5],
                    frameTime: 0.1
                },
                idleW: {
                    sequence: [6],
                    frameTime: 0.1
                },
                idleNW: {
                    sequence: [7],
                    frameTime: 0.1
                }
            },

            initProperties: function() {


                if (!ig.global.wm) {
                    this.ui.healthBar = ig.game.spawnEntity(ig.UIMeter, 0, 0, {
                        margin: {
                            x: 0.02,
                            y: 0.02
                        },
                        fillStyle: 'rgb(255,54,90)',
                        animSheet: new ig.AnimationSheet('media/icons_stats.png', 8, 8),
                        size: {
                            x: 8,
                            y: 8
                        },
                        animSettings: true
                    });

                    this.light = ig.game.spawnEntity(ig.EntityPlayerLight, this.pos.x, this.pos.y, {

                        r: 1,
                        g: .9,
                        b: .7,
                        alpha: .4,
                        radius: 512,
                        performance: 'movable',
                        castsShadows: true,
                        castsShadowsMovable: true,

                    });

                    this.atmosphere = ig.game.spawnEntity(ig.EntityCameraAtmosphere, 0, 0, {

                        atmosphereSettings: {
                            r: 0,
                            g: 0,
                            b: 0,
                            alpha: 1
                        },
                        atmosphereFadeDuration: 0,
                        lightsCutout: true,
                        lightAmplification: 3,

                    });
                    this.atmosphere.activate();
                }

                this.parent();

            },

            update: function() {

                this.light.pos.x = this.pos.x + this.size.x * .5 - this.light.size.x * .5;
                this.light.pos.y = this.pos.y + this.size.y * .5 - this.light.size.y * .5;

                this.parent();

            },

            handleMovementTrace: function(res) {

                if (res.collision.y || res.collision.x || res.collision.slope) {
                    this.applyAntiVelocity();
                }

                this.parent(res);

            },

            getDirectionalAnimName: function(animName) {

                if (this.facing.x === 0) {
                    if (this.facing.y === -1) return animName + "N"; // North/Up
                    if (this.facing.y === 1) return animName + "S"; //South/Down
                } else if (this.facing.x === 1 || this.facing.x === -1) {
                    if (this.facing.y === -1) return animName + "NE"; // North East/Up Right
                    if (this.facing.y === 0) return animName + "E"; // East/Right
                    if (this.facing.y === 1) return animName + "SE"; // South East/Down Right
                } else if (this.facing.x === -1) {
                    if (this.facing.y === -1) return animName + "NW"; // North West/Up Left
                    if (this.facing.y === 0) return animName + "W"; // West/Left
                    if (this.facing.y === 1) return animName + "SW"; // South West/Down Left
                }

            }

        });

    });