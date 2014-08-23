ig.module('game.abilities.basic-attack')
    .requires('abstractities.abilities.cone')
    .defines(function() {
        'use strict';

        ig.AbilityBasicAttack = ig.AbilityCone.extend({

            name: 'Basic Attack',

            range: 32,

            damage: 1,

            shakeAmplitude: 4,

        });

    });