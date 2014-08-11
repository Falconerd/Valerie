ig.module('ember.abstractities.particle')
    .requires('ember.core.config', 'ember.core.entity', 'impact.timer')
    .defines(function() {
        'use strict';

        var _c = ig.CONFIG;

        ig.EmberParticle = ig.EmberEntity.extend({

            animAutomatic: _c.PARTICLE.ANIM_AUTOMATIC,
            animsExpected: ['move'],
            zIndex: _c: Z_INDEX_ABOVE_ALL,
            size: {
                x: 1,
                y: 1
            },
            maxVel: {
                x: 1,
                y: 1
            },
            friction: {
                x: 20,
                y: 20
            },
            minBounceVelocity: 0,
            bounciness: 0.6,
            lifeDuration: 1,
            fadeInTime: 0,
            fadeOutTime: 0.5,
            collisionKills: false,
            collisionSticky: false,
            randomVel: true,
            randomDoubleVel: true,
            randomFlip: true,
            velocityFlip: true,
            lifeTimer: null,
            _fadeAfterInv: 0,
            _fadeBeforeDiff: 0,
            _fadeBeforeInv: 0,

            preInit: function() {

                this.lifeTimer = new ig.Timer();

            },

            /**
             * Called when this entity is added to the world.
             * <br> - sets {@link ig.EmberParticle#lifeTimer}
             * <br> - randomizes vvelocity using {@link ig.EmberParticle#randomVel} & {@link ig.EmberParticle#randomDoubleVel}
             * <br> - randomizes flip using {@link ig.EmberParticle#randomFlip}
             * @return {[type]} [description]
             */
            ready: function() {

                this.lifeTimer.set(this.lifeDuration);

                if (this.randomVel) {

                    if (this.randomDoubleVel) {

                        this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
                        this.vel.y = (Math.random() * 2 - 1) * this.vel.y;

                    } else {

                        this.vel.x *= Math.random();
                        this.vel.y *= Math.random();

                    }

                }

                if (this.currentAnim) {

                    if (this.randomFlip) {

                        this.flip.x = (Math.random() > .5);
                        this.flip.y = (Math.random() > .5);

                    } else if (this.velocityFlip) {

                        if (this.canFlipX) {

                            (this.flip.x = this.vel.x < 0) ? true : false;

                        }

                        if (this.canFlipY) {

                            (this.flip.y = this.vel.y < 0) ? true : false;

                        }

                    }

                }

                this.parent();

            },

            pause: function() {

                this.parent();

                this.lifeTimer.pause();

            },

            unpause: function() {

                this.parent();

                this.lifeTimer.unpause();

            },

            collideWith: function(other, axis) {

                this.parent(other, axis);

                if (this.collisionKills) this.kill();

                if (this.collisionSticky && !(entity instanceof ig.EmberParticle)) {

                    this.collides = ig.EmberEntity.COLLIDES.NEVER;

                    this.moveTo(other, {
                        offset: {
                            x: (this.pos.x + this.size.x * 0.5) - (entity.pos.x + entity.size.x * 0.5),
                            y: (this.pos.y + this.size.y * 0.5) - (entity.pos.y + entity.size.y * 0.5)
                        }
                    });

                }

            },

            handleMovementTrace: function(res) {

                this.parent(res);

                if (this.collisionKills) this.kill();

                if (this.collisionSticky) {

                    this.collides = ig.EmberEntity.COLLIDES.NEVER;
                    this.moveToStop();

                }

            },

            update: function() {

                if (this.lifeTimer.delta() >= 0) {

                    this.kill();

                } else {

                    var deltaInv = this.lifeTimer.delta() + this.lifeDuration;
                    this.alpha = (this.fadeInTime !== 0 ? Math.min(1, deltaInv * this._fadeAfterInv) : 1) - (this.fadeOutTime !== 0 ? Math.max(0, (deltaInv - this._fadeBeforeDiff) * this._fadeBeforeInv) : 0);

                }

                this.parent();

            },



        });

    });