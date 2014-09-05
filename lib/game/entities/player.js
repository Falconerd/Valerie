ig.module('game.entities.player')
    .requires(
        'plusplus.abstractities.player',
        'plusplus.ui.ui-meter',
        'plusplus.entities.camera-atmosphere',
        'plusplus.entities.camera-shake',
        'game.abilities.laser-gun'
)
    .defines(function() {
        'use strict';

        ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({

            size: {
                x: 24,
                y: 16
            },
            offset: {
                x: 12,
                y: 80
            },

            maxVelGrounded: {
                x: 200,
                y: 200
            },

            health: 100,

            ui: {},

            persistent: true,

            opaque: true,
            performance: 'dynamic',

            name: 'player',

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

            canFlipX: false,

            initProperties: function() {

                this.parent();

                this.shoot = new ig.LaserGun(this);
                this.abilities.addDescendants([this.shoot]);

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

                    this.atmosphere = ig.game.spawnEntity(ig.EntityCameraAtmosphere, 0, 0, {

                        atmosphereSettings: {
                            r: 0,
                            g: 0,
                            b: 0,
                            alpha: 0.5
                        },
                        atmosphereFadeDuration: 0,
                        lightsCutout: true,
                        lightAmplification: 0,

                    });
                    this.atmosphere.activate();

                    this.shaker = ig.game.spawnEntity(ig.EntityCameraShake, 0, 0, {

                        shakeStrength: 1,
                        shakeDuration: 0.1

                    });

                }

            },

            update: function() {

                this.parent();

                if (this.lockedTarget) {

                    if (this.lockedTarget._killed) {

                        this.lockedTarget = null;

                    } else {

                        this.faceLockedTarget();

                    }

                }

            },

            faceLockedTarget: function() {

                if (this.lockedTarget) {

                    if (!this.lockedTarget._killed) this.lookAt(this.lockedTarget);

                }

            },

            handleInput: function() {

                var shootX;
                var shootY;

                // check if shooting

                if (ig.input.pressed('shoot')) {

                    if (this.lockedTarget) {

                        shootX = this.lockedTarget.pos.x + this.lockedTarget.size.x * .5;
                        shootY = this.lockedTarget.pos.y + this.lockedTarget.size.y * .5;

                    } else {

                        var direction = this.getFacingAngle();

                        var shootX = this.pos.x + this.size.x * .5 + Math.cos(direction) * 100;
                        var shootY = this.pos.y + this.size.y * .5 + Math.sin(direction) * 100;

                    }

                    this.shoot.activate({
                        x: shootX,
                        y: shootY
                    });

                    this.shaker.deactivate();
                    this.shaker.activate();

                }

                if (ig.input.pressed('touch')) {

                    var targetList = [];

                    var enemies = ig.game.getEntitiesByGroup(ig.EntityExtended.GROUP.ENEMY);

                    var mouseX = ig.input.mouse.x + ig.game.screen.x;
                    var mouseY = ig.input.mouse.y + ig.game.screen.y;

                    for (var i = enemies.length - 1; i >= 0; i--) {

                        var enemy = enemies[i];

                        if (mouseX > enemy.pos.x && mouseY > enemy.pos.y && mouseX < enemy.pos.x + enemy.size.x && mouseY < enemy.pos.y + enemy.size.y) targetList.push(enemy);

                    }

                    if (targetList.length > 0) {
                        this.lockedTarget = targetList[0];
                    }

                }

            },

            handleMovementTrace: function(res) {

                if (res.collision.y || res.collision.x || res.collision.slope) {
                    this.applyAntiVelocity();
                }

                this.parent(res);

            },

            getDirectionalAnimName: function(animName) {

                var direction;

                if (this.facing.x === 0) {
                    if (this.facing.y === 1) direction = "S";
                    else if (this.facing.y === -1) direction = "N";
                } else if (this.facing.x === 1) {
                    if (this.facing.y === 1) direction = "SE";
                    else if (this.facing.y === -1) direction = "NE";
                    else direction = "E";
                } else {
                    if (this.facing.y === 1) direction = "SW";
                    else if (this.facing.y === -1) direction = "NW";
                    else direction = "W";
                }

                return animName + direction;

            },

            /**
             * Flips entity to face a target entity or position.
             * @param {ig.EntityExtended|Vector2|Object} target target to look at.
             **/
            lookAt: function(target) {

                ig.log('lookAT');

                // target is not self and not fixed

                if (target && this !== target && !target.fixed) {

                    var centerX = this.pos.x + this.size.x * 0.5;
                    var centerY;
                    var targetCenterX;
                    var targetCenterY;

                    centerY = this.pos.y + this.size.y * 0.5;

                    if (target instanceof ig.EntityExtended) {

                        targetCenterX = target.pos.x + target.size.x * 0.5;
                        targetCenterY = target.pos.y + target.size.y * 0.5;

                    } else {

                        targetCenterX = target.x;
                        targetCenterY = target.y;

                    }

                    var directionX = targetCenterX - centerX;
                    var directionY = targetCenterY - centerY;
                    var angle = Math.atan2(directionY, directionX);
                    angle *= 180 / Math.PI;

                    this.flip.x = false;

                    if (angle > -157.5 && angle <= -112.5) {
                        this.facing = {
                            x: -1,
                            y: -1
                        }
                    } // NW
                    else if (angle > -112.5 && angle <= -67.5) {
                        this.facing = {
                            x: 0,
                            y: -1
                        }
                    } // N
                    else if (angle > -67.5 && angle <= -22.5) {
                        this.facing = {
                            x: 1,
                            y: -1
                        }
                    } // NE
                    else if (angle > -22.5 && angle <= 22.5) {
                        this.facing = {
                            x: 1,
                            y: 0
                        }
                    } // E
                    else if (angle > 22.5 && angle <= 67.5) {
                        this.facing = {
                            x: 1,
                            y: 1
                        }
                    } // SE
                    else if (angle > 67.5 && angle <= 112.5) {
                        this.facing = {
                            x: 0,
                            y: 1
                        }
                    } // S
                    else if (angle > 112.5 && angle <= 157.5) {
                        this.facing = {
                            x: -1,
                            y: 1
                        }
                    } // SW
                    else {
                        this.facing = {
                            x: -1,
                            y: 0
                        }
                    } // W

                }

            },

            getFacingAngle: function() {

                var angle;

                if (this.facing.x === 0) {

                    if (this.facing.y === 1) angle = 90;
                    else angle = -90;

                } else if (this.facing.x === 1) {

                    if (this.facing.y === 1) angle = 26.6;
                    else if (this.facing.y === 0) angle = 0;
                    else angle = -26.6;

                } else if (this.facing.x === -1) {

                    if (this.facing.y === 1) angle = 153.4;
                    else if (this.facing.y === -1) angle = -153.4;
                    else angle = -180;

                }

                return angle * (Math.PI / 180);

            }

        });

    });