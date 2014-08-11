ig.module('game.entities.player')
    .requires(
        'ember.abstractities.player',
        'game.abilities.basic-attack',
        'game.abilities.ice-spear'
)
    .defines(function() {

        EntityPlayer = ig.EmberPlayer.extend({

            size: {
                x: 14,
                y: 16
            },
            offset: {
                x: 30,
                y: 80
            },

            maxVelGrounded: {
                x: 200,
                y: 200
            },

            type: ig.EmberEntity.TYPE.A,

            collides: ig.Entity.COLLIDES.NEVER,

            canFlipX: false,
            canFlipY: false,

            /**
             * Special property for energy shield.
             * @type {Boolean}
             */
            energyShieldActive: false,

            /**
             * This is the offset for the point at which projectiles spawn. It must, however, be set
             * in initialization as the size property does not yet exist.
             * @type {Vector2|Object}
             */
            castPointOffset: {
                x: null,
                y: null
            },

            animSheet: new ig.AnimationSheet("media/entities/player.png", 64, 96),
            animSettings: {
                idleN: {
                    sequence: [0],
                    frameTime: 0.1,
                },
                idleNE: {
                    sequence: [1],
                    frameTime: 0.1,
                },
                idleE: {
                    sequence: [2],
                    frameTime: 0.1,
                },
                idleSE: {
                    sequence: [3],
                    frameTime: 0.1,
                },
                idleS: {
                    sequence: [4],
                    frameTime: 0.1,
                },
                idleSW: {
                    sequence: [5],
                    frameTime: 0.1,
                },
                idleW: {
                    sequence: [6],
                    frameTime: 0.1,
                },
                idleNW: {
                    sequence: [7],
                    frameTime: 0.1,
                },
                basicAttackN: {
                    sequence: [8, 9],
                    frameTime: 0.1
                },
                basicAttackNE: {
                    sequence: [10, 11],
                    frameTime: 0.1
                },
                basicAttackE: {
                    sequence: [12, 13],
                    frameTime: 0.1
                },
                basicAttackSE: {
                    sequence: [14, 15],
                    frameTime: 0.1
                },
                basicAttackS: {
                    sequence: [16, 17],
                    frameTime: 0.1
                },
                basicAttackSW: {
                    sequence: [18, 19],
                    frameTime: 0.1
                },
                basicAttackW: {
                    sequence: [20, 21],
                    frameTime: 0.1
                },
                basicAttackNW: {
                    sequence: [22, 23],
                    frameTime: 0.1
                },
                iceSpearN: {
                    sequence: [0],
                    frameTime: 0.1,
                },
                iceSpearNE: {
                    sequence: [1],
                    frameTime: 0.1,
                },
                iceSpearE: {
                    sequence: [2],
                    frameTime: 0.1,
                },
                iceSpearSE: {
                    sequence: [3],
                    frameTime: 0.1,
                },
                iceSpearS: {
                    sequence: [4],
                    frameTime: 0.1,
                },
                iceSpearSW: {
                    sequence: [5],
                    frameTime: 0.1,
                },
                iceSpearW: {
                    sequence: [6],
                    frameTime: 0.1,
                },
                iceSpearNW: {
                    sequence: [7],
                    frameTime: 0.1,
                },
                energyShieldN: {
                    sequence: [0],
                    frameTime: 0.1,
                },
                energyShieldNE: {
                    sequence: [1],
                    frameTime: 0.1,
                },
                energyShieldE: {
                    sequence: [2],
                    frameTime: 0.1,
                },
                energyShieldSE: {
                    sequence: [3],
                    frameTime: 0.1,
                },
                energyShieldS: {
                    sequence: [4],
                    frameTime: 0.1,
                },
                energyShieldSW: {
                    sequence: [5],
                    frameTime: 0.1,
                },
                energyShieldW: {
                    sequence: [6],
                    frameTime: 0.1,
                },
                energyShieldNW: {
                    sequence: [7],
                    frameTime: 0.1,
                },
            },

            casting: false,

            preInit: function() {

                this.castPointOffset = {
                    x: this.size.x * .5,
                    y: this.size.y * .5
                }

            },

            postInit: function() {

                this.addAbility(this, 'basicAttack');

                this.addAbility(this, 'iceSpear');

                this.addAbility(this, 'energyShield');

            },

            handleInput: function() {

                this.parent();

                if (ig.input.pressed('rightClick') || ig.input.state('rightClick')) {

                    this.basicAttack.activate();

                } else if (ig.input.pressed('ability1') || ig.input.state('ability1')) {

                    if (this.abilities.equipped.length > 0) this.abilities.equipped[0].activate();

                } else if (ig.input.pressed('ability2') || ig.input.state('ability2')) {

                    if (this.abilities.equipped.length > 1) this.abilities.equipped[1].activate();

                } else if (ig.input.pressed('ability3') || ig.input.state('ability3')) {

                    if (this.abilities.equipped.length > 2) this.abilities.equipped[2].activate();

                } else if (ig.input.pressed('ability4') || ig.input.state('ability4')) {

                    if (this.abilities.equipped.length > 3) this.abilities.equipped[3].activate();

                }

            },

            receiveDamage: function(amount, from) {

                if (this.energyShieldActive) {

                    amount -= amount * .25;

                }

                this.parent(amount, from);

            }

        });

    });