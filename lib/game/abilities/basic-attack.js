ig.module('game.abilities.basic-attack')
    .requires('base.ability', 'abstractities.entities.cone', 'utils.math')
    .defines(function() {

        var _utm = ig.utils.math;

        ig.AbilityBasicAttack = ig.Ability.extend({

            name: 'Basic Attack',

            castStart: function() {

                this.parent();

                var thing = ig.game.spawnEntity(ig.EntityCone, this.caster.pos.x, this.caster.pos.y, {
                    angle: 45,
                    length: 100
                });

                thing._setAngle(_utm.degreesToRadians(180));

            }

        });

    });