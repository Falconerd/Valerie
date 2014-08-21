ig.module('game.effects.energy-shield')
    .requires('base.effect')
    .defines(function() {
        'use strict';

        ig.EffectEnergyShield = ig.Effect.extend({

            size: {
                x: 64,
                y: 104
            },
            offset: {
                x: 0,
                y: 0
            },

            filter: {
                groupIndex: -1
            },

            animSheet: new ig.AnimationSheet("media/effects/energy-shield.png", 64, 104),
            animations: {
                idle: {
                    sequence: [0],
                    frameTime: 0.1
                }
            },

            update: function() {

                this.pos.x = Math.floor(this.caster.pos.x - this.size.x * .5 + this.caster.size.x * .5);
                this.pos.y = Math.floor(this.caster.pos.y - this.size.y * .5 - this.caster.size.y * .25);

                this.parent();

            },

        });

    });