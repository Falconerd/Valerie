ig.module('game.entities.enemy-miniblob')
    .requires(
        'abstractities.entities.enemy'
)
    .defines(function() {

        /**
         * Blob enemy.
         * @extends {ig.EntityEnemy}
         */
        EntityEnemyMiniblob = ig.EntityEnemy.extend({

            size: {
                x: 16,
                y: 16
            },
            offset: {
                x: 8,
                y: 8
            },

            canFlipX: false,

            maySleep: false,

            maxHealth: 1,

            sounds: {
                walk: ['slime4', 'slime5'],
                attack: ['slime8', 'slime9'],
                attacked: ['slime1', 'slime2']
            },

            animSheet: new ig.AnimationSheet('media/entities/enemies/miniblob.png', 32, 32),
            animations: {
                idleN: {
                    sequence: [0, 1],
                    frameTime: .25
                },
                idleNE: {
                    sequence: [0, 1],
                    frameTime: .25
                },
                idleE: {
                    sequence: [0, 1],
                    frameTime: .25
                },
                idleSE: {
                    sequence: [0, 1],
                    frameTime: .25
                },
                idleS: {
                    sequence: [0, 1],
                    frameTime: .25
                },
                idleSW: {
                    sequence: [0, 1],
                    frameTime: .25
                },
                idleW: {
                    sequence: [0, 1],
                    frameTime: .25
                },
                idleNW: {
                    sequence: [0, 1],
                    frameTime: .25
                },
            },

            receiveDamage: function(amount, from) {

                this.parent(amount, from);

                if (this.sounds.attacked) {

                    this.sounds.attacked[Math.floor(Math.random() * this.sounds.attacked.length)].play();

                }

            },

        });

    });