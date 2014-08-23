ig.module('abstractities.abilities.projectile')
    .requires('base.ability', 'abstractities.entities.cone')
    .defines(function() {
        'use strict';

        ig.AbilityProjectile = ig.Ability.extend({

            size: {
                x: 5,
                y: 5,
            },

            linger: 100,

            castStart: function() {

                this.parent();

                ig.game.spawnEntity(ig.EntityCone, this.pos.x, this.pos.y);

            }

        });

    });