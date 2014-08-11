ig.module('game.abilities.ice-spear')
    .requires(
        'ember.abilities.ability',
        'game.entities.effects.ice-spear'
)
    .defines(function() {

        ig.AbilityIceSpear = ig.EmberAbility.extend({

            name: 'Ice Spear',

            range: 1000,

            cooldown: 1,

            damage: 5,

            castStart: function() {

                this.parent();

                var origin = {

                    x: this.caster.pos.x + this.caster.size.x / 2,
                    y: this.caster.pos.y + this.caster.size.y / 2

                }

                ig.game.spawnEntity(ig.EffectIceSpear, origin.x, origin.y, {
                    caster: this.caster, range: this.range, damage: this.damage
                });

            }

        });

    });