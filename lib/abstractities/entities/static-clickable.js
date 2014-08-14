ig.module('abstractities.entities.static-clickable')
    .requires(
        'abstractities.entities.static',
        'abstractities.entities.clickable'
)
    .defines(function() {
        'use strict';

        ig.EntityStaticClickable = ig.EntityStatic.extend(ig.EntityClickable.prototype).extend({



        });

    });