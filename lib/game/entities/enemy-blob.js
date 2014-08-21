ig.module('game.entities.enemy-blob')
    .requires(
        'abstractities.entities.enemy',
        'game.entities.enemy-miniblob'
)
    .defines(function() {

        /**
         * Blob enemy.
         * @extends {ig.EntityEnemy}
         */
        EntityEnemyBlob = ig.EntityEnemy.extend({

            size: {
                x: 96,
                y: 96
            },
            offset: {
                x: 16,
                y: 16
            },

            canFlipX: false,

            maySleep: false,

            maxHealth: 3,

            sounds: {
                walk: ['slime4', 'slime5'],
                attack: ['slime8', 'slime9'],
                attacked: ['slime1', 'slime2']
            },

            animSheet: new ig.AnimationSheet('media/entities/enemies/blob.png', 128, 128),
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

            kill: function() {

                for (var i = 3; i > 0; i--) {
                    var rand = Math.round(Math.random() * 20);
                    var rand2 = Math.round(Math.random() * 20);
                    ig.game.spawnEntity(EntityEnemyMiniblob, this.pos.x + rand, this.pos.y + rand2);
                };

                this.parent();

            }

        });

    });