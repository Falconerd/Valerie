ig.module('game.entities.base.enemy')
    .requires('ember.abstractities.character')
    .defines(function() {
        'use strict';

        ig.EntityEnemy = ig.EmberCharacter.extend({

            type: ig.EmberEntity.TYPE.B,
            collides: ig.Entity.COLLIDES.NEVER,

            /**
             * Range at which this entity will detect the player
             * and start moving in.
             * @type {Number}
             */
            detectionRange: 500,

            attackRange: 64,

            attackDamage: 1,

            attackTimer: new ig.Timer(1),

            update: function() {

                this.parent();

                this.doAIThings();

            },

            doAIThings: function() {

                if (this.canDetectPlayer() && this.distanceTo(ig.game.getPlayer()) >= this.attackRange) {

                    this.moveToPlayer();

                } else {

                    this.moveToStop();

                    if (this.canHitPlayer()) {

                        this.attackPlayer();

                    }

                }

            },

            canDetectPlayer: function() {

                return (this.distanceTo(ig.game.getPlayer()) <= this.detectionRange);

            },

            attackPlayer: function() {

                if (this.attackTimer.delta() > 0) {

                    var damage = this.attackDamage;

                    ig.game.getPlayer().receiveDamage(damage, this);

                    this.attackTimer.reset();

                }

            },

            canHitPlayer: function() {

                return (this.distanceTo(ig.game.getPlayer()) <= this.attackRange);

            },

        });

    });