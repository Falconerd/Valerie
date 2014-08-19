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

            autoSort: true,

            sortBy: ig.Game.SORT.POS_Y,

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

            loadLevel: function(level) {

                this.level = level;

                this.parent(level);

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

                this.parent();

                if (this.shakeAmplitude) ctx.restore();

            },

            getPlayer: function() {

                return ig.game.getEntitiesByType(EntityPlayer)[0] || false;

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