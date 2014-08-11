ig.module('game.abilities.energy-shield')
    .requires(
        'ember.abilities.ability',
        'game.entities.effects.energy-shield'
)
    .defines(function() {
        'use strict';

        ig.AbilityEnergyShield = ig.EmberAbility.extend({

            name: 'Energy Shield',

            toggle: true,

            cooldown: 5,

            castStart: function() {

                this.parent();

                var active = !this.caster.energyShieldActive;

                this.caster.energyShieldActive = active;

                if (active) {

                    this.effect = ig.game.spawnEntity(ig.EffectEnergyShield, this.caster.pos.x, this.caster.pos.y, {
                        caster: this.caster
                    });

                } else {

                    if (this.effect) this.effect.kill();

                }

            }

        });

    });