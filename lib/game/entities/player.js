ig.module('game.entities.player')
    .requires('plusplus.abstractities.player')
    .defines(function() {
        'use strict';

        ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({

            size: {
                x: 16,
                y: 16
            },
            offset: {
                x: 16,
                y: 80
            },

            maxVelGrounded: {
                x: 200,
                y: 200
            },

            animSheet: new ig.AnimationSheet('media/entities/player.png', 64, 96),
            animInit: 'idleN',
            animSettings: {
                moveN: {
                    sequence: [0],
                    frameTime: 0.1
                },
                moveNE: {
                    sequence: [1],
                    frameTime: 0.1
                },
                moveE: {
                    sequence: [2],
                    frameTime: 0.1
                },
                moveSE: {
                    sequence: [3],
                    frameTime: 0.1
                },
                moveS: {
                    sequence: [4],
                    frameTime: 0.1
                },
                moveSW: {
                    sequence: [5],
                    frameTime: 0.1
                },
                moveW: {
                    sequence: [6],
                    frameTime: 0.1
                },
                moveNW: {
                    sequence: [7],
                    frameTime: 0.1
                },
                idleN: {
                    sequence: [0],
                    frameTime: 0.1
                },
                idleNE: {
                    sequence: [1],
                    frameTime: 0.1
                },
                idleE: {
                    sequence: [2],
                    frameTime: 0.1
                },
                idleSE: {
                    sequence: [3],
                    frameTime: 0.1
                },
                idleS: {
                    sequence: [4],
                    frameTime: 0.1
                },
                idleSW: {
                    sequence: [5],
                    frameTime: 0.1
                },
                idleW: {
                    sequence: [6],
                    frameTime: 0.1
                },
                idleNW: {
                    sequence: [7],
                    frameTime: 0.1
                }
            },

            getDirectionalAnimName: function(animName) {

                if (this.facing.x === 0) {
                    if (this.facing.y === -1) return animName + "N"; // North/Up
                    if (this.facing.y === 1) return animName + "S"; //South/Down
                } else if (this.facing.x === 1 || this.facing.x === -1) {
                    if (this.facing.y === -1) return animName + "NE"; // North East/Up Right
                    if (this.facing.y === 0) return animName + "E"; // East/Right
                    if (this.facing.y === 1) return animName + "SE"; // South East/Down Right
                } else if (this.facing.x === -1) {
                    if (this.facing.y === -1) return animName + "NW"; // North West/Up Left
                    if (this.facing.y === 0) return animName + "W"; // West/Left
                    if (this.facing.y === 1) return animName + "SW"; // South West/Down Left
                }

            }

        });

    });