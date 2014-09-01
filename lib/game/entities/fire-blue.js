ig.module('game.entities.fire-blue')
    .requires('plusplus.core.entity')
    .defines(function() {
        'use strict';

        ig.EntityFireBlue = ig.global.EntityFireBlue = ig.EntityExtended.extend({

            size: {
                x: 96,
                y: 96
            },

            animSheet: new ig.AnimationSheet('media/environment/fire_blue.png', 96, 96),
            animInit: 'idle',
            animSettings: {
                idle: {
                    sequence: [0, 1, 2, 3],
                    frameTime: 0.1
                }
            }

        });

    });