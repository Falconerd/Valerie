ig.module('abstractities.entities.enemy')
    .requires('base.entity')
    .defines(function() {
        'use strict';

        var count = 0;

        /**
         * This entity is used for all enemies.
         * @extends {ig.EntityBase}
         */
        ig.EntityEnemy = ig.EntityBase.extend({

            /**
             * Unique ID for each enemy.
             * @type {Number}
             */
            id: count++,

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,

            /**
             * Should probably make the speed less than the players.
             * @type {Number}
             */
            speed: 50,

            aggroRange: 1000,

            update: function() {

                this.parent();

                if (this.distanceTo(ig.game.getPlayer()) <= this.aggroRange) {

                    this.moveToPlayer();

                }

            },

            draw: function() {
                // border/background
                ig.system.context.fillStyle = "rgb(0,0,0)";
                ig.system.context.beginPath();
                ig.system.context.rect(
                    (this.pos.x - ig.game.screen.x) * ig.system.scale, (this.pos.y - ig.game.screen.y + this.size.y) * ig.system.scale,
                    this.size.x * ig.system.scale,
                    4 * ig.system.scale
                );
                ig.system.context.closePath();
                ig.system.context.fill();

                // health bar
                ig.system.context.fillStyle = "rgb(255,0,0)";
                ig.system.context.beginPath();
                ig.system.context.rect(
                    (this.pos.x - ig.game.screen.x + 1) * ig.system.scale, (this.pos.y - ig.game.screen.y + this.size.y + 1) * ig.system.scale, ((this.size.x - 2) * (this.health / this.maxHealth)) * ig.system.scale,
                    2 * ig.system.scale
                );
                ig.system.context.closePath();
                ig.system.context.fill();

                this.parent();
            },

        });

    });