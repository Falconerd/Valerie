ig.module('base.ability')
    .requires(
        'utils.string'
)
    .defines(function() {
        'use strict';

        var _uts = ig.utils.string;

        var count = 0;

        /**
         * Main ability class. Will expand on this later. For now, we'll
         * just do a lot of custom stuff for each ability. :(
         * @type {[type]}
         */
        ig.Ability = ig.Class.extend({

            /**
             * Unique ID for each ability.
             * @type {Number}
             */
            id: count++,

            /**
             * The nice name of the ability.
             * @type {String}
             */
            name: '',

            /**
             * Range in pixels of ability.
             * @type {Number}
             */
            range: 0,

            /**
             * Whether this ability is togglable.
             * @type {Boolean}
             */
            toggle: false,

            /**
             * Whether this ability is passive.
             * @type {Boolean}
             */
            passive: false,

            /**
             * Whether this ability is channelled.
             * @type {Boolean}
             */
            channelled: false,

            /**
             * Whether this ability is currently being channelled.
             * @type {Boolean}
             */
            channelling: false,

            /**
             * The initial cost of this ability.
             * @type {Number}
             */
            costActivate: 0,

            /**
             * The cost per frame if this ability is being channelled.
             * @type {Number}
             */
            costChannel: 0,

            /**
             * The cooldown time between uses.
             * @type {Number}
             */
            cooldown: 0,

            /**
             * The amount of time it takes to cast this ability.
             * @type {Number}
             */
            castTime: 0,

            /**
             * The timer for the cooldown of this ability.
             * <br> - created on init
             * @type {ig.Timer}
             */
            cooldownTimer: null,

            /**
             * The timer for the cast time of this ability
             * <br> - created on init
             * @type {ig.Timer}
             */
            castTimer: null,

            /**
             * The type of ability.
             * @type {Number}
             * @see ig.CONFIG.ABILITY.TREE
             */
            abilityTree: 0,

            /**
             * The type of damage.
             * @type {Number}
             * @see ig.CONFIG.ABILITY.DAMAGETYPE
             */
            damageType: 0,

            /**
             * The entity which is casting this abiltiy
             * @type {ig.EmberEntity}
             */
            caster: null,

            /**
             * The target of this ability. Can be an entity or position.
             * @type {ig.EmberEntity|Vector2|Object}
             */
            target: null,

            /**
             * The magnitude of damage/heals/whatever else we need to calculate.
             * @type {Number}
             */
            // TODO: Add a formula for this.
            magnitude: 1,

            /**
             * Amount the ability damages the target.
             * @type {Number}
             */
            damage: 0,

            /**
             * Amount the ability heals the target.
             * @type {Number}
             */
            heal: 0,

            firstCast: true,

            globalCooldown: .2,

            /**
             * If this ability destroys destructable objects.
             * @type {Boolean}
             */
            destroyDestructables: true,

            /**
             * This is the Box2D shape which is used to detect targets of the ability.
             * @type {[type]}
             */
            detector: null,

            /**
             * Time in seconds for the ability to remain active.
             * @type {Number}
             */
            linger: 0,

            /**
             * The timer for lingering abilties.
             * @type {ig.Timer}
             */
            lingerTimer: null,

            /**
             * An object to hold the entities already damaged by this ability.
             * @type {Object}
             */
            damagedEntities: {},

            /**
             * The amount of screen shake this ability creates.
             * @type {Number}
             */
            shakeAmplitude: 0,

            init: function(caster, settings) {

                this.caster = caster;

                this.preInit();

                if (this.castTime > 0) this.castTimer = new ig.Timer();
                if (this.cooldown > 0) this.cooldownTimer = new ig.Timer();
                if (this.linger > 0) this.lingerTimer = new ig.Timer();
                if (this.globalCooldown > 0) this.globalCooldownTimer = new ig.Timer();

                this.id = count++;

                this.postInit();

            },

            preInit: function() {

            },

            postInit: function() {

            },

            enable: function() {

                this.enabled = true;

            },

            disable: function() {

                this.disabled = true;

                if (this.channelling) {

                    this.channelInterrupt();

                }

            },

            /**
             * Called when the ability is activated.
             * This is called regardless of type of ability.
             */
            activate: function() {

                if (this.globalCooldown > this.globalCooldownTimer.delta()) return;
                else this.globalCooldownTimer.reset();

                if (this.cooldownTimer) {

                    if (this.cooldown < this.cooldownTimer.delta() || this.firstCast) {
                        this.firstCast = false;
                        this.caster.isCasting = false;
                        this.cooldownTimer.reset();
                    } else {
                        this.caster.isCasting = this;
                    }

                }

                if (!this.caster.isCasting) {

                    this.caster.isCasting = this;

                    if (this.passive) {

                        // Do passive things...

                    } else {

                        this.castStart();

                    }

                }

            },

            /**
             * Called when the ability is activated so long as the following conditions are met:
             * <br> - This ability is <strong>not</strong> {@see ig.EmberAbility#passive}
             */
            castStart: function() {

                /**
                 * We do not want to make abilities animation cancelable;
                 */

                var animation = _uts.camelCase(this.name);
                var direction = this.caster.getDirection();

                this.caster.currentAnim = this.caster.anims[animation + direction].rewind();

                if (this.shakeAmplitude > 0) ig.game.shakeAmplitude = this.shakeAmplitude;

            },

            /**
             * Called every frame until {@link ig.EmberAbility#castFinish} or {@link ig.EmberAbility#castInterrupt}
             */
            castUpdate: function() {

                if (this.caster.isCasting) {

                    /**
                     * Do things with the detector polygon
                     */
                    if (this.detector) {

                        if (this.destroyDestructables) {

                            var destructables = ig.game.getEntitiesByType(ig.EntityDestructable);

                            for (var i = 0; i < destructables.length; i++) {
                                if (this.detector.touches(destructables[i])) {
                                    destructables[i].kill();
                                }
                            }

                        }

                        if (this.damage > 0) {

                            // Change this for enemy abilities
                            var enemies = ig.game.getEntitiesByType(ig.EntityEnemy);

                            for (var i = 0; i < enemies.length; i++) {
                                if (this.detector.touches(enemies[i])) {
                                    if (!this.damagedEntities[enemies[i].id]) {
                                        this.damagedEntities[enemies[i].id] = true;
                                        enemies[i].receiveDamage(this.damage, this.caster);
                                    }
                                }
                            };

                        }

                        if (this.linger > 0) {
                            if (this.lingerTimer.delta() > this.linger) this.detector.kill();
                        } else {
                            this.detector.kill();
                        }

                    }

                    if (this.caster.currentAnim.loopCount >= 1) {

                        this.caster.isCasting = false;
                        this.castFinish();

                    }

                }

            },

            /**
             * Called if casting is interrupted. Casting can only be interrupted if
             * this ability has a {@see ig.EmberAbility#castTime} or is {@see ig.EmberAbility#channelled.}
             */
            castInterrupt: function() {

            },

            /**
             * Called when the ability is finished without interruption.
             */
            castFinish: function() {

                this.damagedEntities = {};

                if (this.shakeAmplitude > 0) ig.game.shakeAmplitude = 0;

            },

            /**
             * This function is called when the ability successfully hits
             * a target.
             */
            onAbilityHit: function(target) {

                /**
                 * If the target hit is an entity.
                 */
                if (target instanceof ig.Entity) {

                    /**
                     * If the entity hit is an enemy, deal damage.
                     */
                    if (target.type == ig.Entity.TYPE.B) {

                        target.receiveDamage(this.damage * this.magnitude, this.caster);

                        /**
                         * If the ability hits an ally, heal them (if heal is not 0).
                         */
                    } else if (target.type == ig.Entity.TYPE.A) {

                        target.receiveDamage(-this.heal * this.magnitude, this.caster);

                    }

                }

            },


        });

    });