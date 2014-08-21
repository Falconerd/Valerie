ig.module('base.effect')
    .requires('base.entity')
    .defines(function() {
        'use strict';

        ig.Effect = ig.EntityBase.extend({

            simpleEntity: true,

            filter: {
                groupIndex: 0
            },

            preInit: function() {

                if (this.caster) {
                    this.type = this.caster.type || ig.Entity.TYPE.NONE;
                    this.checkAgainst = this.caster.checkAgainst || ig.Entity.TYPE.NONE;
                }

                this.parent();
            }

        });

    });