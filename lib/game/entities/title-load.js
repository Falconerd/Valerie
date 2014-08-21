ig.module('game.entities.title-load')
    .requires('abstractities.entities.static')
    .defines(function() {

        EntityTitleLoad = ig.EntityStatic.extend({

            size: {
                x: 67,
                y: 19
            },
            offset: {
                x: 0,
                y: 0
            },

            animSheet: new ig.AnimationSheet('media/entities/static/load.png', 67, 19),
            animations: {
                idle: {
                    sequence: [0],
                    frameTime: 1
                }
            },

        });

    });