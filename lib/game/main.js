ig.module('game.main')
    .requires(
        'ember.core.ember',
        'ember.light.main',

        'game.entities.player',

        'plugins.astar-for-entities',

        'game.levels.test',

        'impact.debug.debug',
        'ember.helpers.utilsmath'
)
    .defines(function() {
        'use strict';

        var _utm = ig.utilsmath;

        var untitledGame = ig.EmberGame.extend({

            autoSort: true,
            sortBy: ig.Game.SORT.POS_Y,

            font: new ig.Font('media/04b03.font.png'),

            shakeAmplitude: 0,

            init: function() {

                this.loadLevel(LevelTest);

                this.parent();

            },

        });

        ig.System.scaleMode = ig.System.SCALE.CRISP;

        ig.main('#canvas', untitledGame, 60, 640, 480, 1, ig.EmberLoader);

    });