ig.module('ember.abstractities.effect')
    .requires('ember.core.entity')
    .defines(function() {
        'use strict';

        ig.EmberEffect = ig.EmberEntity.extend({

            simpleEntity: true,

        });

    });