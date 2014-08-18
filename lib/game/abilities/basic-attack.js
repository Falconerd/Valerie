ig.module('game.abilities.basic-attack')
    .requires('base.ability')
    .defines(function() {

        ig.AbilityBasicAttack = ig.Ability.extend({

            name: 'Basic Attack',

            castStart: function() {

                this.parent();

                ig.game.spawnEntity(ig.EffectDamage, this.caster.pos.x, this.caster.pos.y);

            }

        });

    });