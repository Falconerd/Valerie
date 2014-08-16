ig.module('game.abilities.energy-shield')
    .requires(
        'base.ability',
        'game.effects.energy-shield'
)
    .defines(function() {
        'use strict';

        ig.AbilityEnergyShield = ig.Ability.extend({

            name: 'Energy Shield',

            toggle: true,

            cooldown: 5,

            activate: function() {

                this.parent();

                var active = !this.caster.energyShieldActive;

                this.caster.energyShieldActive = active;

                if (active) {

                    this.effect = ig.game.spawnEntity(ig.EffectEnergyShield, this.caster.pos.x, this.caster.pos.y, {
                        caster: this.caster
                    });

                    console.log('activate');

                } else {

                    if (this.effect) this.effect.kill();

                    console.log('kill');

                }

            }

        });

    });