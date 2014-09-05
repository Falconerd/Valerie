ig.module('game.entities.skeleton-mage')
    .requires(
        'plusplus.abstractities.creature',
        'plusplus.abilities.melee',
        'plusplus.helpers.utils'
)
    .defines(function() {
        'use strict';

        var _ut = ig.utils;

        ig.EntitySkeletonMage = ig.global.EntitySkeletonMage = ig.Creature.extend({

            size: {
                x: 75,
                y: 96
            },

            animSheetStandard: new ig.AnimationSheet('media/entities/ghast.png', 75, 96),
            animSheetHighlighted: new ig.AnimationSheet('media/entities/ghast_highlighted.png', 75, 96),
            animSettings: true,

            textured: true,

            deathSettings: {
                spawnCountMax: 3,
                spawnSettings: {
                    animTileOffset: ig.EntityParticleColor.colorOffsets.RED
                }
            },

            canWanderX: true,
            canWanderY: true,

            // instead of switching wander direction
            // when hitting a wall, lets switch at random also

            wanderSwitchChance: 0.005,
            wanderSwitchChanceStopped: 0.015,

            tetherDistance: 8,

            // don't notice prey too far away

            reactionDistance: 75,

            moveToPreySettings: {
                searchDistance: 150
            },

            initProperties: function() {

                this.animSheet = this.animSheetStandard;

                this.parent();

                this.melee = new ig.AbilityMelee(this, {
                    // target will be provided by attack method
                    canFindTarget: false,
                    // one shot kill player
                    damage: 1,
                    // shorter range than melee default
                    // about half of character width
                    rangeX: this.size.x * 0.5,
                    rangeY: this.size.y * 0.5
                });

                this.abilities.addDescendants([
                    this.melee
                ]);

            },

            initTypes: function() {

                this.parent();

                _ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");

                _ut.addType(ig.EntityExtended, this, 'group', "ENEMY", "GROUP");

                _ut.addType(ig.EntityExtended, this, 'checkAgainst', "CHARACTER");

                _ut.addType(ig.EntityExtended, this, 'preyGroup', "FRIEND", "GROUP");

            },

            attack: function(entity) {

                this.melee.setEntityTarget(entity);

                if (this.melee.entityTarget) {

                    var closeEnough = this.melee.closeEnough();

                    this.melee.activate();

                    return closeEnough;

                } else {

                    // the original attack method does a basic distance check

                    return this.parent();

                }

            },

        });

    });