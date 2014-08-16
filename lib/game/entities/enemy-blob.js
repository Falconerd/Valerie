ig.module('game.entities.enemy-blob')
    .requires('abstractities.entities.enemy')
    .defines(function() {

        /**
         * Blob enemy.
         * @extends {ig.EntityEnemy}
         */
        EntityEnemyBlob = ig.EntityEnemy.extend({

            size: {
                x: 64,
                y: 64
            },
            offset: {
                x: 32,
                y: 32
            },

            isFixedRotation: true,

            animSheet: new ig.AnimationSheet('media/entities/enemies/blob.png', 128, 128),
            animSettings: {
                idleN: {
                    sequence: [0],
                    frameTime: 1
                },
                idleNE: {
                    sequence: [0],
                    frameTime: 1
                },
                idleE: {
                    sequence: [0],
                    frameTime: 1
                },
                idleSE: {
                    sequence: [0],
                    frameTime: 1
                },
                idleS: {
                    sequence: [0],
                    frameTime: 1
                },
                idleSW: {
                    sequence: [0],
                    frameTime: 1
                },
                idleW: {
                    sequence: [0],
                    frameTime: 1
                },
                idleNW: {
                    sequence: [0],
                    frameTime: 1
                },
            },

        });

    });