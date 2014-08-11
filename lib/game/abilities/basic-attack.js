ig.module('game.abilities.basic-attack')
    .requires('ember.abilities.ability')
    .defines(function() {

        ig.AbilityBasicAttack = ig.EmberAbility.extend({

            name: 'Basic Attack'

        });

    });