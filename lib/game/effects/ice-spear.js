ig.module('game.effects.ice-spear')
    .requires('abstractities.entities.effect-damage')
    .defines(function() {
        'use strict';

        ig.EffectIceSpear = ig.EffectDamage.extend({

            size: {
                x: 5,
                y: 5
            },
            offset: {
                x: 20,
                y: 28
            },

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,

            animSheet: new ig.AnimationSheet("media/effects/ice-spear.png", 47, 64),
            animSettings: {
                idle: {
                    sequence: [5],
                    frameTime: 0.1
                }
            },

            postInit: function() {

                var speed = this.speed;

                this.target.x = this.target.x + ig.game.screen.x;
                this.target.y = this.target.y + ig.game.screen.y;

                var target = this.target;

                var origin = {

                    x: this.caster.pos.x + this.caster.size.x * .5 - this.size.x * .5,
                    y: this.caster.pos.y

                }

                var angle = Math.atan2(target.y - origin.y, target.x - origin.x);

                this.pos = origin;

                this.maxVel.x = this.vel.x = this.accel.x = Math.cos(angle) * speed;
                this.maxVel.y = this.vel.y = this.accel.y = Math.sin(angle) * speed;

                this._setAngle(angle + Math.PI * 1.5);

            },

            update: function() {

                this.pos.x += this.maxVel.x * ig.system.tick;
                this.pos.y += this.maxVel.y * ig.system.tick;

                if (this.distanceTo(this.caster) > this.range) {

                    this.kill();

                }

                this.parent();

            },

            handleMovementTrace: function(res) {

                this.pos.x += this.maxVel.x * ig.system.tick;
                this.pos.y += this.maxVel.y * ig.system.tick;

            }

        });

    });