ig.module('ember.core.ember')
    .requires(
        'ember.core.config',
        'ember.core.loader',
        'ember.core.game',
        'ember.core.camera'
)
    .defines(function() {
        'use strict';

        ig.Game.inject({

            resize: function() {

                ig.system.resize(ig.global.innerWidth * 1 * (1 / 4), ig.global.innerHeight * 1 * (1 / 4), 4);

            }

        });

    });