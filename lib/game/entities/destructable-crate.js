ig.module('game.entities.destructable-crate')
    .requires('abstractities.entities.static-destructable', 'utils.math')
    .defines(function() {

        var _utm = ig.utils.math;

        EntityDestructableCrate = ig.EntityStaticDestructable.extend({

            size: {
                x: 64,
                y: 64
            },

            simpleEntity: true,

            isometricShape: true,

            filter: {

                groupIndex: 1,

            },

            animSheet: new ig.AnimationSheet('media/entities/static/destructables/crate.png', 64, 64),
            animSettings: {
                idle: {
                    sequence: [0],
                    frameTime: 1
                }
            },

            postInit: function() {}

        });

    });