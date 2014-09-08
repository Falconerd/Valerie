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
            faceTarget: false,
            costActivate: 10,

            castStart: function(settings, internalCallback, internalArgs) {

                this.parent(settings, internalCallback, internalArgs);

                this.entity.shaker.deactivate();
                this.entity.shaker.activate();

            }

        });

    });