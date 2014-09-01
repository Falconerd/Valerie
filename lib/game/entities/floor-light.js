ig.module('game.entities.floor-light')
    .requires('plusplus.core.entity')
    .defines(function() {
        'use strict';

        ig.EntityFloorLight = ig.global.EntityFloorLight = ig.EntityExtended.extend({

            size: {
                x: 128,
                y: 5
            },
            offset: {
                x: 0,
                y: 48
            },

            //layerName: 'entitiesBehindLights',

            animSheet: new ig.AnimationSheet('media/environment/floor_light.png', 128, 80),
            animSettings: true

        });

    });