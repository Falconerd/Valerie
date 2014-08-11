ig.module('ember.core.loader')
    .requires(
        'impact.loader',
        'ember.core.config'
)
    .defines(function() {
        'use strict';

        var _c = ig.CONFIG;

        /*
         * Ember Loader, custom loading bar stuff.
         */
        ig.EmberLoader = ig.Loader.extend({

            draw: function() {

                /* Get the width and height of the canvas, then fill it with black. */
                var width = ig.system.realWidth;
                var height = ig.system.realHeight;
                ig.system.context.fillStyle = '#000';
                ig.system.context.fillRect(0, 0, width, height);

                /* Get the loading percentage and then draw a loading bar */
                var percentage = (this.status * 100).round();
                ig.system.context.fillStyle = '#fff';
                ig.system.context.fillRect(0, height / 2, (width / 100) * percentage, 1);

            }

        });

    });