ig.module('game.entities.title-quit')
    .requires('abstractities.entities.static')
    .defines(function() {

        EntityTitleQuit = ig.EntityStatic.extend({

            size: {
                x: 59,
                y: 22
            },
            offset: {
                x: 0,
                y: 0
            },

            animSheet: new ig.AnimationSheet('media/entities/static/quit.png', 59, 22),
            animations: {
                idle: {
                    sequence: [0],
                    frameTime: 1
                }
            },

        });

    });