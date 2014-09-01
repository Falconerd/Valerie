ig.module('game.entities.boss-necromagi')
    .requires(
        'plusplus.abstractities.creature',
        'plusplus.helpers.utils'
)
    .defines(function() {
        'use strict';

        var _ut = ig.utils;

        ig.EntityBossNecromagi = ig.global.EntityBossNecromagi = ig.Creature.extend({

            size: {
                x: 48,
                y: 128
            },

            canWanderX: false,

            animSheet: new ig.AnimationSheet('media/particles.png', 1, 1),
            animSettings: true,

            textured: true,

            health: 10,
            healthMax: 10,

            deathSettings: {
                spawnCountMax: 100,
                spawnSettings: {
                    animTileOffset: ig.EntityParticleColor.colorOffsets.RED
                }
            },

            phases: [{
                breakPoint: .75,
                shieldStrength: 2
            }, {
                breakPoint: .5,
                shieldStrength: 4
            }, {
                breakPoint: .25,
                shieldStrength: 6
            }],

            phase: 0,

            shield: 0,

            shieldActive: false,

            initProperties: function() {

                this.parent();

                for (var i = this.phases.length - 1; i >= 0; i--) {
                    this.phases[i].breakPoint *= this.healthMax;
                }

            },

            initTypes: function() {

                this.parent();

                _ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");
                _ut.addType(ig.EntityExtended, this, 'group', "ENEMY", "GROUP");
                _ut.addType(ig.EntityExtended, this, 'checkAgainst', "CHARACTER");

            },

            update: function() {

                if (!this.shieldActive) this.phaseUpdate();

                this.parent();

            },

            phaseUpdate: function() {



            },

            phaseChange: function() {

                this.phase++;

                ig.log('phase changed.', this.phase);

                this.startShieldPhase();

            },

            startShieldPhase: function() {

                ig.log('shield activated.');

                this.shieldActive = true;
                this.shield = this.phases[this.phase].shieldStrength;
                this.pos.x = ig.game.getEntityByName('centrePoint').pos.x - this.size.x * .5;
                this.pos.y = ig.game.getEntityByName('centrePoint').pos.y - this.size.y;

            },

            endShieldPhase: function() {

                ig.log('shield deactivated');

                this.shieldActive = false;
                this.shield = 0;

            },

            receiveDamage: function(amount, from, unblockable) {

                if (this.shieldActive) {

                    this.shield -= amount;

                    ig.log('Shield strength:' + this.shield);

                    if (this.shield <= 0) {

                        this.endShieldPhase();

                    }

                } else {

                    this.parent(amount, from, unblockable);

                    if (this.phase < this.phases.length - 1) {

                        if (this.health - amount <= this.phases[this.phase].breakPoint) {

                            this.health = this.phases[this.phase].breakPoint;
                            this.phaseChange();

                        }

                    }

                }

            }

        });

    });