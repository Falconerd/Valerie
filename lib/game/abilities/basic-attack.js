ig.module('game.abilities.basic-attack')
    .requires('base.ability')
    .defines(function() {

        ig.AbilityBasicAttack = ig.Ability.extend({

            name: 'Basic Attack'

        });

    });