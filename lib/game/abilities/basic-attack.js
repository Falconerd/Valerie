ig.module('game.abilities.basic-attack')
    .requires('base.ability', 'abstractities.entities.cone', 'utils.math')
    .defines(function() {

        var _c = ig.constants;
        var _utm = ig.utils.math;

        ig.AbilityBasicAttack = ig.Ability.extend({

            name: 'Basic Attack',

            castStart: function() {

                this.parent();

                var alignment = this.caster.getDirection();

                var thing = ig.game.spawnEntity(ig.EntityCone, this.caster.castPos.x, this.caster.castPos.y, {
                    length: 32,
                    alignment: alignment
                });

            }

        });

    });