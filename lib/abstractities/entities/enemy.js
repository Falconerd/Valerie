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

            /**
             * Should probably make the speed less than the players.
             * @type {Number}
             */
            speed: 150,

            aggroRange: 1000,

            update: function() {

                this.parent();

                if (this.distanceTo(ig.game.getPlayer()) <= this.aggroRange) {

                    this.moveToPlayer();

                }

            }

        });

    });