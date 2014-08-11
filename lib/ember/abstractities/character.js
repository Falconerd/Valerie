ig.module('ember.abstractities.character')
    .requires(
        'ember.core.entity',
        'ember.core.config',
        'ember.helpers.utilsstring',
        'game.abilities.basic-attack',
        'game.abilities.ice-spear',
        'game.abilities.energy-shield'
)
    .defines(function() {
        'use strict';

        var _c = ig.CONFIG;
        var _uts = ig.utilsstring;

        /**
         * The difference between a character and an entity is
         * a character is anything that requires AI and advanced
         * functions. We separate them so that if we need to spawn
         * simple entities, we don't have all this extra, un-necessary
         * bloat.
         */
        ig.EmberCharacter = ig.EmberEntity.extend({

            speed: {
                x: _c.CHARACTER.SPEED_X,
                y: _c.CHARACTER.SPEED_Y
            },
            canFlipX: _c.CHARACTER.CAN_FLIP_X,
            canFlipY: _c.CHARACTER.CAN_FLIP_Y,

            /**
             * Holds abilities for this entity. Equipped abilities
             * are useable, unequipped are not, but can be equipped.
             * Unlearned abilities are not listed here.
             * @type {Object}
             */
            abilities: {
                equipped: [],
                unequipped: [],
            },

            /**
             * Use A* pathfinding to get a path to the player and then follow it.
             */
            moveToPlayer: function() {

                this.getPath(ig.game.getPlayer().pos.x, ig.game.getPlayer().pos.y, true, [], []);

                this.followPath((this.speed.x + this.speed.y) * .5, true);

            },

            /**
             * Adds the ability to the character with these settings.
             * @param {String} name     The name of the ability.
             * @param {Object} settings The custom settings (if any) for this ability.
             */
            addAbility: function(caster, name, settings) {

                /**
                 * Construct the ability.
                 * @type {ig.EmberAbility}
                 */
                var ability = new ig['Ability' + _uts.ucFirst(name)](caster, settings);

                if (name === 'basicAttack') return this.basicAttack = ability;

                if (this.abilities.equipped.length < 4) this.abilities.equipped.push(ability);
                else this.abilities.unequipped.push(ability);

            },

        });

    });