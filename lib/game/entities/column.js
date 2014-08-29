ig.module('game.entities.column')
    .requires('plusplus.core.entity')
    .defines(function() {
        'use strict';

        ig.EntityColumn = ig.global.EntityColumn = ig.EntityExtended.extend({

            size: {
                x: 128,
                y: 512
            },

            maxVelGrounded: {
                x: 0,
                y: 0
            },

            animSheet: new ig.AnimationSheet('media/entities/column.png', 128, 512),
            animSettings: true

        });

    });