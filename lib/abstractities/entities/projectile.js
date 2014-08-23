ig.module('abstractities.entities.projectile')
    .requires('impact.entity', 'game.constants', 'utils.math')
    .defines(function() {
        'use strict';

        var _c = ig.constants;
        var _utm = ig.utils.math;

        ig.EntityProjectile = ig.Entity.extend({

            isSensor: true,

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

        });

    });