ig.module('game.effects.ice-spear')
    .requires('base.effect')
    .defines(function() {
        'use strict';

        ig.EffectIceSpear = ig.Effect.extend({

            size: {
                x: 5,
                y: 5
            },
            offset: {
                x: 42,
                y: 59
            },

            collides: ig.Entity.COLLIDES.NEVER,

            animSheet: new ig.AnimationSheet("media/effects/ice-spear.png", 47, 64),
            animSettings: {
                idle: {
                    sequence: [5],
                    frameTime: 0.1
                }
            },

            postInit: function() {

                var speed = (this.speed.x + this.speed.y) * .5;

                var target = {
                    x: ig.input.mouse.x + ig.game.screen.x,
                    y: ig.input.mouse.y + ig.game.screen.y
                };

                var origin = {

                    x: this.caster.pos.x + this.size.x * .5,
                    y: this.caster.pos.y + this.size.y * .5

                }

                var angle = Math.atan2(target.y - origin.y, target.x - origin.x);

                this.pos = origin;

                this.maxVel.x = this.vel.x = this.accel.x = Math.cos(angle) * speed;
                this.maxVel.y = this.vel.y = this.accel.y = Math.sin(angle) * speed;

                this.currentAnim.angle = angle + Math.PI * 1.5;

            },

            update: function() {

                if (this.distanceTo(this.caster) > 1000) {

                    this.kill();

                }

                this.parent();

            },

            handleMovementTrace: function(res) {

                this.pos.x += this.vel.x * ig.system.tick;
                this.pos.y += this.vel.y * ig.system.tick;

            }

        });

    });