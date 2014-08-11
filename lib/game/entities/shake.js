/*
This entity shakes the screen when its triggeredBy() method is called - usually
through an EntityTrigger entity.


Keys for Weltmeister:

strength 
    max amount of screen movement in pixels
    default: 8

duration 
    duration of the screen shaking in seconds
    default: 1
*/

ig.module(
    'game.entities.shake'
)
    .requires(
        'impact.entity'
)
    .defines(function() {

        EntityShake = ig.Entity.extend({
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(80, 130, 170, 0.7)',

            size: {
                x: 8,
                y: 8
            },

            duration: 1,
            strength: 8,
            quakeTimer: null,

            init: function(x, y, settings) {
                this.quakeTimer = new ig.Timer();
                this.parent(x, y, settings);
            },


            triggeredBy: function(entity, trigger) {
                this.quakeTimer.set(this.duration);
                ig.game.shakeAmplitude = this.strength;
            },


            update: function() {
                var delta = this.quakeTimer.delta();
                if (delta < -0.1) {
                    ig.game.shakeAmplitude = 0;
                }
            }
        });

    });