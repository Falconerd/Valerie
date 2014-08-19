ig.module('abstractities.abilities.cone')
    .requires('base.ability', 'abstractities.entities.cone')
    .defines(function() {
        'use strict';

        ig.AbilityCone = ig.Ability.extend({

            castStart: function() {

                this.parent();

                var alignment = this.caster.getDirection();

                this.detector = ig.game.spawnEntity(ig.EntityCone, this.caster.castPos.x, this.caster.castPos.y, {
                    length: this.range,
                    alignment: alignment
                });

            }

        });

    });