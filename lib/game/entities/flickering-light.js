ig.module('game.entities.flickering-light')
    .requires('plusplus.entities.light')
    .defines(function() {
        'use strict';

        ig.EntityFlickeringLight = ig.global.EntityFlickeringLight = ig.EntityLight.extend({

            /**
             * Range of seconds between which the light will flicker
             * @type {Array}
             */
            flickerInterval: [0.25, 2],

            /**
             * Range of time the light will be off for.
             * @type {Number}
             */
            flickerLength: [0.1, 0.25],

            /**
             * Timer for flicker interval.
             * @type {ig.Timer}
             */
            flickerIntervalTimer: null,

            /**
             * Timer for flicker length.
             * @type {ig.Timer}
             */
            flickerLengthTimer: null,

            /**
             * Whether this entity is currently flickering.
             * @type {Boolean}
             */
            flickering: false,

            /**
             * The alpha that this entity should return to after flickering.
             * @type {Number}
             */
            startingAlpha: null,

            /**
             * Whether this should flicker more like a fire than a modern light bulb.
             * @type {Boolean}
             */
            smoothFlicker: true,

            performance: 'movable',
            castsShadows: true,
            castsShadowsMovable: true,

            initProperties: function() {

                this.parent();

                this.flickerIntervalTimer = new ig.Timer();
                this.flickerLengthTimer = new ig.Timer();



            },

            update: function() {

                if (this.flickerIntervalTimer.delta() >= 0) {

                    if (this.startingAlpha === null) this.startingAlpha = this.alpha;

                    this.flickering = true;
                    this.alpha -= 0.05;
                    this.resetTimers();

                }

                if (this.flickering) {

                    if (this.flickerLengthTimer.delta() >= 0) {

                        this.flickering = false;
                        this.alpha = this.startingAlpha;

                    }

                }

                this.parent();

            },

            resetTimers: function() {

                this.flickerIntervalTimer.set(Math.floor(Math.random() * this.flickerInterval[1]) + this.flickerInterval[0]);
                this.flickerLengthTimer.set(Math.floor(Math.random() * this.flickerLength[1]) + this.flickerLength[0]);

            }

        });

    });