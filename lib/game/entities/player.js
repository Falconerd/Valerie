ig.module('game.entities.player')
    .requires(
        'impact.entity',
        'plugins.box2d.entity'
)
    .defines(function() {

        EntityPlayer = ig.Box2DEntity.extend({

            size: {
                x: 64,
                y: 96,
            },
            offset: {
                x: 0,
                y: 0,
            },

            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NEVER,

            animSheet: new ig.AnimationSheet('media/entities/player.png', 64, 96),

            init: function(x, y, settings) {

                this.parent(x, y, settings);

                this.addAnim('idle', 1, [0]);

                if (!ig.global.wm) this.body.SetFixedRotation(true);

                ig.game.player = this;

            },

            update: function() {

                if (ig.input.state('left')) {
                    this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(-200, 0), this.body.GetPosition());
                } else if (ig.input.state('right')) {
                    this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(200, 0), this.body.GetPosition());
                }
                if (ig.input.state('up')) {
                    this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, -200), this.body.GetPosition());
                } else if (ig.input.state('down')) {
                    this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, 200), this.body.GetPosition());
                }

                this.parent();

            }

        });

    });