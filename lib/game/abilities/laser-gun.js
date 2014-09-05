ig.module('game.abilities.laser-gun')
    .requires(
        'plusplus.abilities.ability-shoot',
        'game.entities.laser'
)
    .defines(function() {
        'use strict';

        ig.LaserGun = ig.AbilityShoot.extend({

            spawningEntity: ig.EntityLaser,
            offsetVelX: 1000,
            offsetVelY: 1000,
            faceTarget: false

        });

    });