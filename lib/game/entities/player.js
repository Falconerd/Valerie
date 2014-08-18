ig.module('game.entities.player')
    .requires(
        'base.entity',
        'game.abilities.basic-attack',
        'game.abilities.energy-shield',
        'game.abilities.ice-spear',

        'utils.math'
)
    .defines(function() {

        var _utm = ig.utils.math;

        EntityPlayer = ig.EntityBase.extend({

            size: {
                x: 32,
                y: 32,
            },
            offset: {
                x: 16,
                y: 64,
            },

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,

            speed: 200,

            maySleep: false,

            isometricShape: true,

            canFlipX: false,

            animSheet: new ig.AnimationSheet('media/entities/player.png', 64, 96),
            animSettings: {
                idleN: {
                    sequence: [0],
                    frameTime: 1
                },
                idleNE: {
                    sequence: [1],
                    frameTime: 1
                },
                idleE: {
                    sequence: [2],
                    frameTime: 1
                },
                idleSE: {
                    sequence: [3],
                    frameTime: 1
                },
                idleS: {
                    sequence: [4],
                    frameTime: 1
                },
                idleSW: {
                    sequence: [5],
                    frameTime: 1
                },
                idleW: {
                    sequence: [6],
                    frameTime: 1
                },
                idleNW: {
                    sequence: [7],
                    frameTime: 1
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

            init: function(x, y, settings) {

                this.parent(x, y, settings);

                ig.game.player = this;

            },

            postInit: function() {

                this.addAbility(this, 'basicAttack');

                this.addAbility(this, 'iceSpear');

                this.addAbility(this, 'energyShield');

            },

            update: function() {

                this.handleInput();

                this.parent();

            },

            handleInput: function() {

                if (ig.input.state('leftClick')) {

                    /**
                     * We need to check which direction we are facing and then do things, I suppose.
                     */

                    this.moveTo({
                        x: ig.input.mouse.x + ig.game.screen.x,
                        y: ig.input.mouse.y + ig.game.screen.y
                    });


                    this.lookAt({
                        x: ig.input.mouse.x,
                        y: ig.input.mouse.y
                    });

                }

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

            }

        });

    });