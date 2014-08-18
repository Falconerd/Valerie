ig.module('abstractities.entities.effect-damage')
    .requires('base.effect')
    .defines(function() {
        'use strict';

        ig.EffectDamage = ig.Effect.extend({

            checkAgainst: ig.Entity.TYPE.B,

            preInit: function() {



            },

            update: function() {

                this.parent();

                var destructables = ig.game.getEntitiesByType(ig.EntityDestructable);

                for (var i = 0; i < destructables.length; i++) {
                    if (this.touches(destructables[i])) {
                        destructables[i].kill();
                    }
                }

                var enemies = ig.game.getEntitiesByType(ig.EntityEnemy);

                for (var i = enemies.length - 1; i >= 0; i--) {
                    if (this.touches(enemies[i])) {
                        ig.log('touching!');
                    }
                };

            },


        });

    });