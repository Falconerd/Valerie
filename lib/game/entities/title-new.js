ig.module('game.entities.title-new')
    .requires('abstractities.entities.static-clickable')
    .defines(function() {

        EntityTitleNew = ig.EntityStaticClickable.extend({

            size: {
                x: 59,
                y: 17
            },
            offset: {
                x: 0,
                y: 0
            },

            animSheet: new ig.AnimationSheet('media/entities/static/new.png', 59, 17),
            animations: {
                idle: {
                    sequence: [0],
                    frameTime: 1
                }
            },

            update: function() {

                this.parent();

                ig.game.screen.x = this.pos.x + this.size.x * .5 - ig.system.width * .5;
                ig.game.screen.y = this.pos.y + this.size.y * .5 - ig.system.height * .5;

            },

            clicked: function() {

                ig.game.loadLevelDeferred(LevelTest);

            }

        });

    });