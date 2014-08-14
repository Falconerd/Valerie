ig.module('game.entities.player')
    .requires('plugins.joncom.box2d.entity')
    .defines(function() {

        EntityPlayer = ig.Entity.extend({

            size: {
                x: 24,
                y: 24,
            },
            offset: {
                x: 20,
                y: 72,
            },

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NEVER,

            speed: 200,

            isFixedRotation: true,
            maySleep: false,

            animSheet: new ig.AnimationSheet('media/entities/player.png', 64, 96),

            init: function(x, y, settings) {

                this.parent(x, y, settings);

                if (!isNaN(this.speed)) {
                    var speed = ig.copy(this.speed);
                    this.speed = {};
                    this.speed.x = speed;
                    this.speed.y = speed;
                }

                this.maxVel = this.speed;

                this.addAnim('idle', 1, [0]);

                ig.game.player = this;

            },

            update: function() {

                this.handleInput();

                this.parent();

            },

            handleInput: function() {

                if (ig.input.state('left')) {
                    this.vel.x -= this.speed.x;
                } else if (ig.input.state('right')) {
                    this.vel.x += this.speed.x;
                } else {
                    this.vel.x = 0;
                }
                if (ig.input.state('up')) {
                    this.vel.y -= this.speed.y;
                } else if (ig.input.state('down')) {
                    this.vel.y += this.speed.y;
                } else {
                    this.vel.y = 0;
                }

            }

        });

    });