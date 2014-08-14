ig.module('base.entity')
    .requires('impact.entity')
    .defines(function() {
        'use strict';

        ig.EntityBase = ig.Entity.extend({

            preInit: function() {},

            init: function(x, y, settings) {

                this.preInit();

                if (this.animSettings && this.animSheet) {
                    for (var animation in this.animSettings) {
                        if (this.animSettings.hasOwnProperty(animation)) {
                            this.addAnim(animation.toString(), this.animSettings[animation].frameTime, this.animSettings[animation].sequence);
                        }
                    }
                }

                this.parent(x, y, settings);

                this.postInit();

            },

            postInit: function() {},

        });

    });