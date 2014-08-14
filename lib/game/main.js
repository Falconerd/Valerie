ig.module('game.main')
    .requires(
        'impact.font',

        'game.levels.test',
        'game.levels.title',

        'plugins.joncom.box2d.game',
        //'plugins.joncom.box2d.debug',

        'impact.debug.debug'
)
    .defines(function() {
        'use strict';

        var Valerie = ig.Game.extend({

            gravity: 0,
            gameMode: 0,

            font: new ig.Font('media/montserrat.white.png'),

            init: function() {

                this.resize();

                ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                ig.input.bind(ig.KEY.UP_ARROW, 'up');
                ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
                ig.input.bind(ig.KEY.MOUSE1, 'click');

                this.loadLevel(LevelTitle);

            },

            update: function() {

                if (this.player) {
                    this.screen.x = this.player.pos.x - ig.system.width * .5;
                    this.screen.y = this.player.pos.y - ig.system.height * .5;
                }

                this.parent();

            },

            resize: function() {

                ig.system.resize(
                    ig.global.innerWidth * 1 * (1 / 1),
                    ig.global.innerHeight * 1 * (1 / 1),
                    1
                );

            },

            draw: function() {

                this.parent();

            }

        });

        ig.main('#canvas', Valerie, 60, 640, 480, 1);

        window.addEventListener('blur', function() {
            if (ig.system) {
                ig.music.stop();
                ig.system.stopRunLoop();
            }
        }, false);

        window.addEventListener('focus', function() {
            if (ig.system) {
                ig.music.play();
                ig.system.startRunLoop();
            }
        }, false);

    });