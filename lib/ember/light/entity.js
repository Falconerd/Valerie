ig.module('ember.light.entity')
    .requires('ember.core.entity')
    .defines(function() {

        ig.EntityEmberLight = ig.EmberEntity.extend({

            size: {
                x: 1,
                y: 1
            },

            simpleEntity: true,

            postInit: function() {

                ig.EmberLight.queueEntity(this);

            }

        });

    });