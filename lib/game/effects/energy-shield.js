ig.module('game.effects.energy-shield')
    .requires('base.effect')
    .defines(function() {
        'use strict';

        ig.EffectEnergyShield = ig.Effect.extend({

            size: {
                x: 96,
                y: 96
            },
            offset: {
                x: 0,
                y: 0
            },

            collides: ig.Entity.COLLIDES.NEVER,

            animSheet: new ig.AnimationSheet("media/effects/energy-shield.png", 96, 96),
            animSettings: {
                idle: {
                    sequence: [0],
                    frameTime: 0.1
                }
            },

            update: function() {

                this.pos.x = Math.floor(this.caster.pos.x - this.size.x * .5);
                this.pos.y = Math.floor(this.caster.pos.y - this.size.y * .5 - this.caster.size.y * 1.8);

                this.parent();

            },

        });

    });