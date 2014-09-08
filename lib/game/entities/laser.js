ig.module('game.entities.laser')
    .requires('plusplus.abstractities.projectile')
    .defines(function() {
        'use strict';

        ig.EntityLaser = ig.global.EntityLaser = ig.Projectile.extend({

            collides: ig.EntityExtended.COLLIDES.LITE,
            size: {
                x: 4,
                y: 4
            },
            offset: {
                x: 2,
                y: 2
            },
            maxVel: {
                x: 2000,
                y: 2000
            },
            animSheet: new ig.AnimationSheet('media/projectile.png', 8, 8),
            animSettings: true,

            damage: 2,
            collisionKills: true,
            bounciness: 0,

            /**
             * Checks projectile to see if has hit an entity of type {@link ig.EntityExtended.TYPE.DAMAGEABLE}.
             * @override
             */
            check: function(entity) {

                // deal damage to colliding entity

                var damage;

                if (this.damageAsPct) {

                    damage = entity.health * this.damage;

                } else {

                    damage = this.damage;

                }

                entity.receiveDamage(damage, this, this.damageUnblockable);

                // kill self

                //this.kill();

            }

        });

    });