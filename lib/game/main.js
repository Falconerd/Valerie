ig.module('game.main')
    .requires(
        'impact.game',
        'impact.font',

        'game.entities.player',
        'game.levels.test',

        'plugins.box2d.game',

        'impact.debug.debug'
)
    .defines(function() {
        'use strict';

        var Valerie = ig.Box2DGame.extend({

            font: new ig.Font('media/04b03.font.png'),
            clearColor: '#000',

            debugCollisionShapes: true,

            gravity: 1000,

            init: function() {

                ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                ig.input.bind(ig.KEY.UP_ARROW, 'up');
                ig.input.bind(ig.KEY.DOWN_ARROW, 'down');

                this.loadLevel(LevelTest);

            },

            loadLevel: function(data) {

                this.parent(data);

                for (var i = 0; i < this.backgroundMaps.length; i++) {

                    this.backgroundMaps[i].preRender = true;

                }

            },

            update: function() {

                this.parent();

                if (this.player) {

                    this.screen.x = this.player.pos.x - ig.system.width / 2;
                    this.screen.y = this.player.pos.y - ig.system.height / 2;

                }

            },

            draw: function() {

                this.parent();

            }

        });

        ig.main('#canvas', Valerie, 60, 640, 480, 1);

    });