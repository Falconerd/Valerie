ig.module('game.entities.effects.ice-spear')
    .requires('ember.abstractities.effect')
    .defines(function() {
        'use strict';

        ig.EffectIceSpear = ig.EmberEffect.extend({

            size: { x: 5, y: 5 },
            offset: { x: 42, y: 59 },

            collides: ig.Entity.COLLIDES.NEVER,
            checkAgainst: ig.EmberEntity.TYPE.B,

            animSheet: new ig.AnimationSheet("media/entities/effects/ice-spear.png", 47, 64),
            animSettings: {
                idle: {
                    sequence: [5],
                    frameTime: 0.1
                }
            },

            hit: [],

            postInit: function() {

                var speed = (this.speed.x + this.speed.y) * .5;

                var target = {
                    x: ig.input.mouse.x + ig.game.screen.x,
                    y: ig.input.mouse.y + ig.game.screen.y
                };

                var origin = {

                    x: this.caster.pos.x + this.caster.castPointOffset.x - this.size.x,
                    y: this.caster.pos.y + this.caster.castPointOffset.y - this.size.y

                }

                var angle = Math.atan2(target.y - origin.y, target.x - origin.x);

                this.pos = origin;

                this.maxVel.x = this.vel.x = this.accel.x = Math.cos(angle) * speed;
                this.maxVel.y = this.vel.y = this.accel.y = Math.sin(angle) * speed;

                this.currentAnim.angle = angle + Math.PI * 1.5;

            },

            update: function() {

                if (this.distanceTo(this.caster) > this.range) {

                    this.kill();

                }

                this.parent();

            },

            handleMovementTrace: function(res) {

                this.pos.x += this.vel.x * ig.system.tick;
                this.pos.y += this.vel.y * ig.system.tick;

            },

            check: function(other) {

                    console.log('Boom!');

                /**
                 * Entity was not previously hit. Let's smash it.
                 */
                if (this.hit.indexOf(other) < 0) {

                    this.hit.push(other);
                    other.receiveDamage(this.damage, this.caster);

                }

                this.parent();

            }

        });

    });