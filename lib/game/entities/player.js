ig.module('game.entities.player')
    .requires('base.entity')
    .defines(function() {

        EntityPlayer = ig.EntityBase.extend({

            size: {
                x: 24,
                y: 24,
            },
            offset: {
                x: 20,
                y: 72,
            },

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NEVER,

            speed: 200,

            isFixedRotation: true,
            maySleep: false,

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
            },

            init: function(x, y, settings) {

                this.parent(x, y, settings);

                if (!isNaN(this.speed)) {
                    var speed = ig.copy(this.speed);
                    this.speed = {};
                    this.speed.x = speed;
                    this.speed.y = speed;
                }

                this.maxVel = this.speed;

                ig.game.player = this;

            },

            update: function() {

                this.handleInput();

                this.parent();

            },

            handleInput: function() {

                if (ig.input.state('click')) {

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

            }

        });

    });