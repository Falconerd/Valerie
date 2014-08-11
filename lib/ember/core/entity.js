ig.module('ember.core.entity')
    .requires(
        'impact.entity',
        'ember.core.config',
        'ember.helpers.utilsmath',
        'ember.helpers.utilsstring'
)
    .defines(function() {
        'use strict';

        var _c = ig.CONFIG;
        var _uts = ig.utilsstring;
        var _utm = ig.utilsmath;

        ig.EmberEntity = ig.Entity.extend({

            /**
             * The speed of the entity.
             * @type {Vector2|Object}
             */
            speed: {
                x: _c.ENTITY.SPEED_X,
                y: _c.ENTITY.SPEED_Y
            },

            /**
             * Facing direction of this entity.
             * When x is 1, facing is right. When y is 1, facing is down.
             * When both are 1, facing is down and right.
             * From this you can infer the other directions.
             * @type {Vector2|Object}
             */
            facing: {
                x: 1,
                y: 0
            },

            /**
             * Friction for this entity.
             * @type {Vector2|Object}
             */
            friction: {
                x: _c.ENTITY.FRICTION_X,
                y: _c.ENTITY.FRICTION_Y
            },

            /**
             * Maximum velocity for this entity.
             * @type {Vector2|Object}
             */
            maxVel: {
                x: _c.ENTITY.MAX_VEL_X,
                y: _c.ENTITY.MAX_VEL_Y
            },

            /**
             * The collision setting for this entity.
             * @type {[type]}
             */
            collides: ig.Entity.COLLIDES.ACTIVE,

            /**
             * Whether or not the entity is flipped.
             * Facing left is true, right is false.
             * Facing up is true, down is false.
             * @type {Object}
             */
            flip: {
                x: false,
                y: false
            },

            /**
             * Whether this entity should flip horizontally.
             * @type {Boolean}
             */
            canFlipX: true,

            /**
             * Whether this entity should flip vertically.
             * @type {Boolean}
             */
            canFlipY: false,

            /**
             * The position or entity which this entity is moving
             * towards.
             * @type {ig.EmberEntity|Vector2|Object}
             */
            movingTo: null,

            /**
             * The distance to the target {@see ig.EmberEntity#movingTo}
             * @type {Object -> Number}
             */
            distanceToTarget: {
                x: null,
                y: null
            },

            /**
             * Current health of entity. When health reaches 0, the entity
             * is killed via {@see ig.Entity.kill()}
             * @type {Number}
             */
            health: 10,

            /**
             * Maximum amount of health this entity can have.
             * @type {Number}
             */
            maxHealth: 10,

            /**
             * Current energy of entity. When an entity does not have enough
             * energy to use an ability, the ability can't be used. Seems
             * obvious enough, right?
             */
            energy: 10,

            /**
             * Maximum amount of energy this entity can have.
             * @type {Number}
             */
            maxEnergy: 10,

            /**
             * How much health this entity will regenerate per second.
             * @type {Number}
             */
            healthRegen: 0,

            /**
             * How much energy this enttiy will regenerate per second.
             * @type {Number}
             */
            energyRegen: 0,

            /**
             * Entity mass type. Some things will only affect entities with certain
             * mass types.
             * SMALL
             * NORMAL
             * LARGE            Large entities are not be affected by certain abilities. Namely those that move or slow other entities.
             * COLOSSAL         Colossal entities shake the screen a lot.
             * @type {ig.EmberEntity.MASSTYPE}
             */
            massType: 0,

            /**
             * Whether this entity is friendly or not.
             * NONE             None.
             * A                Friend.
             * B                Foe.
             * BOTH             Neutral.
             * INTERACTIVE      An interactive entity. Levers, switches, pressure plates etc.
             * DESTRUCTABLE     Anything that can be destroyed by abilities. EG: Barrels, Vases etc.
             * DANGEROUS        Anything that can passively cause damage to another entity. EG: Acid, Lava etc
             * @type {ig.EmberEntity.TYPE}
             */
            type: 0,

            isCasting: false,

            /**
             * If an entity is a simpleEntity, then it only uses one idle animation: 'idle'.
             * This is used for things such as levers, doors, pressure plates etc.
             * @type {Boolean}
             */
            simpleEntity: false,

            /**
             * Initializes entity.
             * @param {Number} x Horizontal position.
             * @param {Number} y Vertical position.
             * @param {Object} [settings] Settings object.
             */
            init: function(x, y, settings) {

                this.preInit();

                if (this.animSettings) {
                    for (var animation in this.animSettings) {
                        if (this.animSettings.hasOwnProperty(animation)) {
                            this.addAnim(animation.toString(), this.animSettings[animation].frameTime, this.animSettings[animation].sequence);
                        }
                    }
                }

                this.parent(x, y, settings);

                this.postInit();

            },

            /**
             * Anything in this takes place before init.
             */
            preInit: function() {},

            /**
             * Anything in this takes place after init.
             */
            postInit: function() {},

            /**
             * This function runs every frame. EG: At 60 frames per second this will run 60 times per second.
             */
            update: function() {

                if (!this.paused) {

                    this.parent();

                    this.checkMovement();

                    if (this.isCasting) this.isCasting.castUpdate();
                    else this.setAnimation();

                }

            },

            /**
             * Makes this entity look correctly at target entity or position.
             * @param  {ig.EmberEntity|Vector2|Object} target Target to look at.
             */
            lookAt: function(target) {

                if (!target || this === target || target.fixed) return;

                var angle = _utm.radiansToDegrees(_utm.angleToFrom(target, this));

                if (_utm.between(angle, -157.5, -112.5)) {
                    this.facing = ig.EmberEntity.FACING.NW;
                } else if (_utm.between(angle, -112.5, -67.5)) {
                    this.facing = ig.EmberEntity.FACING.N;
                } else if (_utm.between(angle, -67.5, -22.5)) {
                    this.facing = ig.EmberEntity.FACING.NE;
                } else if (_utm.between(angle, -22.5, 22.5)) {
                    this.facing = ig.EmberEntity.FACING.E;
                } else if (_utm.between(angle, 22.5, 67.5)) {
                    this.facing = ig.EmberEntity.FACING.SE;
                } else if (_utm.between(angle, 67.5, 112.5)) {
                    this.facing = ig.EmberEntity.FACING.S;
                } else if (_utm.between(angle, 112.5, 157.5)) {
                    this.facing = ig.EmberEntity.FACING.SW;
                } else {
                    this.facing = ig.EmberEntity.FACING.W;
                }

            },

            setAnimation: function() {

                var animation = this.getAnimation() || 'idle';
                var direction = this.getDirection() || 'S';

                /**
                 * If this is a simpleEntity, then we only assign it one animation: idle.
                 */
                if (this.simpleEntity) {

                    animation = 'idle';
                    direction = '';

                }

                this.currentAnim = this.anims[animation + direction];


            },

            getAnimation: function() {

                return 'idle';

            },

            /**
             * Gets the direction of the animation based on the entity's facing
             * values and whether or not they can flip vertically and/or horizontally.
             * @return {String} String representation of a direction.
             */
            getDirection: function() {

                var direction;

                if (this.canFlipX || this.canFlipY) {

                    if (this.facing.x !== 0) {

                        if (this.facing.y == 1) direction = 'DX';
                        if (this.facing.y == -1) direction = 'UX';
                        if (this.facing.y == 0) direction = 'X';

                    } else {

                        if (this.facing.y == 1) direction = 'D';
                        if (this.facing.y == -1) direction = 'U';

                    }

                } else {

                    /**
                     * We use cardinal directions for entities that cannot flip.
                     */
                    for (var cardinalDirection in ig.EmberEntity.FACING) {

                        if (ig.EmberEntity.FACING.hasOwnProperty(cardinalDirection)) {

                            if (this.facing == ig.EmberEntity.FACING[cardinalDirection]) {

                                direction = cardinalDirection.toString();

                            }

                        }

                    }

                }

                return direction || 'S';

            },

            updateVelocity: function() {

                this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
                this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);

            },

            getNewVelocity: function(vel, accel, friction, max) {

                if (accel) {

                    return _utm.clamp(vel + accel * ig.system.tick, -max, max);

                } else if (friction) {

                    var delta = friction * ig.system.tick;

                    if (vel - delta > 0) {

                        return Math.min(vel - delta, max);

                    } else if (vel + delta < 0) {

                        return Math.max(vel + delta, -max);

                    } else {

                        return 0;

                    }

                }

                return _utm.clamp(vel, -max, max);

            },

            /**
             * Zeroes current horizontal acceleration.
             */
            moveToHereHorizontal: function() {

                this.accel.x = 0;
                this.vel.x = 0;

            },

            /**
             * Zeroes current vertical acceleration.
             */
            moveToHereVertical: function() {

                this.accel.y = 0;
                this.vel.y = 0;

            },

            /**
             * Zeroes all current acceleration and clears path.
             */
            moveToHere: function() {

                this.moveToHereHorizontal();
                this.moveToHereVertical();

            },

            moveToStop: function() {

                this.moveToHereVertical();
                this.moveToHereHorizontal();

            },

            /**
             * Move an entity to a place or thing.
             * @param  {Vector2|ig.EmberEntity} item     Coordiantes of a place (x, y) or instance of an @ig.EmberEntity
             * @param  {Object} settings Settings which will be used in the method.
             */
            //TODO: add check for if entity is using pathfinding.
            moveTo: function(item, settings) {

                if (item instanceof ig.EmberEntity) {

                    this.movingTo = item.pos;
                    this.movingTo.x -= ig.game.screen.x;
                    this.movingTo.y -= ig.game.screen.y;

                } else {

                    this.movingTo = item;

                }

                if (ig.game.walkableMap.getTile(this.movingTo.x, this.movingTo.y) === 0) return;

                this.movingToSettings = settings;
                this.doneMovingHorizontally = false;
                this.doneMovingVertically = false;

                this.distanceToTarget.x = this.movingTo.x - this.pos.x - this.size.x / 2;
                this.distanceToTarget.y = this.movingTo.y - this.pos.y - this.size.y / 2; // Move to feet position

                /**
                 * If we have not yet reached our destination, do things.
                 */
                if (Math.abs(this.distanceToTarget.x) > 3 || Math.abs(this.distanceToTarget.y) > 3) {

                    /**
                     * The horizontal distance to the target is greater than the vertical
                     * distance to the target.
                     */
                    if (Math.abs(this.distanceToTarget.x) > Math.abs(this.distanceToTarget.y)) {

                        if (this.distanceToTarget.x > 3) {

                            this.vel.x = this.speed.x;
                            this.xydivision = this.distanceToTarget.y / this.distanceToTarget.x;
                            this.vel.y = this.xydivision * this.speed.y;

                        } else {

                            this.vel.x = -this.speed.x;
                            this.xydivision = this.distanceToTarget.y / Math.abs(this.distanceToTarget.x);
                            this.vel.y = this.xydivision * this.speed.y;

                        }

                    } else {

                        if (this.distanceToTarget.y > 3) {

                            this.vel.y = this.speed.y;
                            this.xydivision = this.distanceToTarget.x / this.distanceToTarget.y;
                            this.vel.x = this.xydivision * this.speed.x;

                        } else {

                            this.vel.y = -this.speed.y;
                            this.xydivision = this.distanceToTarget.x / Math.abs(this.distanceToTarget.y);
                            this.vel.x = this.xydivision * this.speed.x;

                        }

                    }

                } else {

                    this.vel.y = 0;
                    this.vel.x = 0;

                    this.movingTo = null;

                }

            },

            /**
             * Checks to see if the entity is moving somewhere and stops it if it's there.
             */
            checkMovement: function() {

                if (this.isCasting) return this.moveToStop();

                if (this.movingTo !== null) this.moveTo(this.movingTo, this.movingToSettings);

            },

            doneMoving: function() {

                this.movingTo = null;

            },

            /**
             * Restores energy to the entity. Checks to see whether or not the restored
             * amount would be more than the maximum and if so, restores to maximum. If
             * not, just restores normally.
             * @param  {Number} amount Amount of energy to restore.
             */
            restoreEnergy: function(amount) {

                if (this.energy + amount > this.maxEnergy) this.energy = this.maxEnergy;
                else this.energy += amount;

            },

        });

        ig.EmberEntity.MASSTYPE = {

            NORMAL: 0,
            SMALL: 1,
            LARGE: 2,
            COLOSSAL: 3,

        }

        ig.EmberEntity.TYPE = {

            NONE: 0,
            A: 1,
            B: 2,
            BOTH: 3,
            INTERACT: 4,
            DESTRUCTABLE: 5,
            DANGEROUS: 6,

        }

        ig.EmberEntity.FACING = {

            N: {
                x: 0,
                y: -1
            },
            NE: {
                x: 1,
                y: -1
            },
            E: {
                x: 1,
                y: 0
            },
            SE: {
                x: 1,
                y: 1
            },
            S: {
                x: 0,
                y: 1
            },
            SW: {
                x: -1,
                y: 1
            },
            W: {
                x: -1,
                y: 0
            },
            NW: {
                x: -1,
                y: -1
            },

        }

    });