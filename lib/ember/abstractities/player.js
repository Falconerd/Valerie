ig.module('ember.abstractities.player')
    .requires('ember.abstractities.character')
    .defines(function() {
        'use strict';

        ig.EmberPlayer = ig.EmberCharacter.extend({

            update: function() {

                this.parent();

                if (ig.ua.mobile) {

                    this.handleInputMobile();

                } else {

                    this.handleInput();

                }

            },

            /**
             * This method handles all player input and adjusts the character velocity accordingly.
             */
            handleInput: function() {

                /**
                 * We need to detecte whether or not we are clicking or holding
                 */
                if (ig.input.state('leftClick')) {

                    /**
                     * We need to check which direction we are facing and then do things, I suppose.
                     */

                    this.moveTo({
                        x: ig.input.mouse.x + ig.game.screen.x,
                        y: ig.input.mouse.y + ig.game.screen.y
                    });


                    this.lookAt({
                        x: ig.input.mouse.x,
                        y: ig.input.mouse.y
                    });

                }

            },

            handleInputMobile: function() {

            }

        });

    });