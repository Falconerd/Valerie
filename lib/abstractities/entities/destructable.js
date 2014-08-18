ig.module('abstractities.entities.destructable')
    .requires('base.entity')
    .defines(function() {
        'use strict';

        ig.EntityDestructable = ig.EntityBase.extend({

            health: 1,
            type: ig.Entity.TYPE.DESTRUCTABLE,

            kill: function() {

                // Need some custom destruction entity to spawn here. EG: Crate pieces flying around.

                this.parent();

            }

        });

    });