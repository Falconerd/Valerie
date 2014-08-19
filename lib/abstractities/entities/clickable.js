ig.module('abstractities.entities.clickable')
    .requires('base.entity')
    .defines(function() {
        'use strict';

        ig.EntityClickable = ig.EntityBase.extend({

            update: function() {
                if (ig.input.pressed('leftClick') && this.inFocus()) {
                    this.clicked();
                }
            },

            inFocus: function() {
                return (
                    (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
                    ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
                    (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
                    ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
                );
            },

            clicked: function() {}

        });

    });