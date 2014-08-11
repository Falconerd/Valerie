ig.module('game.entities.blob')
    .requires('game.entities.base.enemy')
    .defines(function() {

        EntityBlob = ig.EntityEnemy.extend({

            size: { x: 50, y: 50 },

            simpleEntity: true,

            animSheet: new ig.AnimationSheet("media/entities/enemies/blob.png", 50, 50),
            animSettings: {
                idle: {
                    sequence: [0,1,2,3],
                    frameTime: 0.2,
                },
            }

        });

    });