ig.module('game.entities.destructable-crate')
    .requires('abstractities.entities.static-destructable')
    .defines(function() {

        EntityDestructableCrate = ig.EntityStaticDestructable.extend({

            size: {
                x: 64,
                y: 64
            },

            simpleEntity: true,

            animSheet: new ig.AnimationSheet('media/entities/static/destructables/crate.png', 64, 64),
            animSettings: {
                idle: {
                    sequence: [0],
                    frameTime: 1
                }
            }

        });

    });