ig.module('game.main')
    .requires(
        'impact.font',

        'game.levels.test',
        'game.levels.title',

        'utils.utils',

        'plugins.joncom.box2d.game',
        'plugins.joncom.box2d.debug',

        'impact.debug.debug'
)
    .defines(function() {
        'use strict';

        var Valerie = ig.Game.extend({

            gravity: 0,
            gameMode: 0,
            shakeAmplitude: 0,

            font: new ig.Font('media/montserrat.white.png'),

            init: function() {

                this.resize();

                ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                ig.input.bind(ig.KEY.UP_ARROW, 'up');
                ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
                ig.input.bind(ig.KEY.MOUSE1, 'leftClick');
                ig.input.bind(ig.KEY.MOUSE2, 'rightClick');
                ig.input.bind(ig.KEY.Q, 'ability1');
                ig.input.bind(ig.KEY.W, 'ability2');
                ig.input.bind(ig.KEY.E, 'ability3');
                ig.input.bind(ig.KEY.R, 'ability4');

                this.loadLevel(LevelTest);

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
                    ig.global.innerWidth * 1 * (1 / 2),
                    ig.global.innerHeight * 1 * (1 / 2),
                    2
                );

            },

            draw: function() {

                var ctx = ig.system.context;
                if (this.shakeAmplitude > 0) {
                    ctx.save();
                    ctx.translate(this.shakeAmplitude * (Math.random() - 0.5), this.shakeAmplitude * (Math.random() - 0.5));
                }

                if (this.clearColor) {
                    ig.system.clear(this.clearColor);
                }

                // This is a bit of a circle jerk. Entities reference game._rscreen 
                // instead of game.screen when drawing themselfs in order to be 
                // "synchronized" to the rounded(?) screen position
                this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
                this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;


                var mapIndex;
                for (mapIndex = 0; mapIndex < this.backgroundMaps.length; mapIndex++) {
                    var map = this.backgroundMaps[mapIndex];
                    if (map.foreground) {
                        // All foreground layers are drawn after the entities
                        break;
                    }
                    map.setScreenPos(this.screen.x, this.screen.y);
                    map.draw();
                }

                this.drawEntities();

                for (mapIndex; mapIndex < this.backgroundMaps.length; mapIndex++) {
                    var map = this.backgroundMaps[mapIndex];
                    map.setScreenPos(this.screen.x, this.screen.y);
                    map.draw();
                }

                if (this.shakeAmplitude) ctx.restore();

            }

        });

        ig.main('#canvas', Valerie, 60, 640, 480, 2);

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