ig.module('abstractities.entities.static-destructable')
    .requires(
        'abstractities.entities.static',
        'abstractities.entities.destructable'
)
    .defines(function() {
        'use strict';

        ig.EntityStaticDestructable = ig.EntityDestructable.extend(ig.EntityStatic.prototype).extend({

        bodyType: 0,

        });

    });