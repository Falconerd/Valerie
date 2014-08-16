ig.module('abstractities.entities.static-destructable')
    .requires(
        'abstractities.entities.static',
        'abstractities.entities.destructable'
)
    .defines(function() {
        'use strict';

        ig.EntityStaticDestructable = ig.EntityStatic.extend(ig.EntityDestructable.prototype).extend({



        });

    });