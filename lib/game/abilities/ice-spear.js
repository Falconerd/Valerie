ig.module('game.abilities.ice-spear')
    .requires(
        'base.ability',
        'game.effects.ice-spear'
)
    .defines(function() {

        ig.AbilityIceSpear = ig.Ability.extend({

            name: 'Ice Spear',

            range: 1000,

            cooldown: 1,

            speed: 25,

            damage: 3,

            linger: 20,

            castStart: function() {

                this.parent();

                this.target = {
                    x: ig.input.mouse.x,
                    y: ig.input.mouse.y
                };

                this.caster.lookAt(this.target);

                this.detector = ig.game.spawnEntity(ig.EffectIceSpear, 0, 0, {
                    caster: this.caster,
                    speed: this.speed,
                    range: this.range,
                    target: this.target
                });

            }

        });

    });