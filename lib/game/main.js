ig.module('game.main')
    .requires(
        'plusplus.core.plusplus',
        'game.levels.test',

        'plusplus.debug.debug'
)
    .defines(function() {
        'use strict';

        var _c = ig.CONFIG;

        var Valerie = ig.GameExtended.extend({

            init: function() {

                this.parent();
                this.loadLevel(ig.global.LevelTest);

            }

        });

        ig.main('#canvas', Valerie, _c.GAME_FPS, _c.GAME_WIDTH, _c.GAME_HEIGHT, _c.GAME_SCALE, ig.LoaderExtended);

    });