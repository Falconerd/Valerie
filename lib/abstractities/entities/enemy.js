ig.module('abstractities.entities.enemy')
    .requires('base.entity')
    .defines(function() {
        'use strict';

        /**
         * This entity is used for all enemies.
         * @extends {ig.EntityBase}
         */
        ig.EntityEnemy = ig.EntityBase.extend({

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,

            speed: 150,

            isFixedRotation: true,

        });

    });