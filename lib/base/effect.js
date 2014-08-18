ig.module('base.effect')
    .requires('base.entity')
    .defines(function() {
        'use strict';

        ig.Effect = ig.EntityBase.extend({

            simpleEntity: true

        });

    });