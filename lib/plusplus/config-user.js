ig.module(
    'plusplus.config-user'
)
    .defines(function() {

        /**
         * User configuration of Impact++.
         * <span class="alert alert-info"><strong>Tip:</strong> it is recommended to modify this configuration file!</span>
         * @example
         * // in order to add your own custom configuration to Impact++
         * // edit the file defining ig.CONFIG_USER, 'plusplus/config-user.js'
         * // ig.CONFIG_USER is never modified by Impact++ (it is strictly for your use)
         * // ig.CONFIG_USER is automatically merged over Impact++'s config
         * @static
         * @readonly
         * @memberof ig
         * @namespace ig.CONFIG_USER
         * @author Collin Hover - collinhover.com
         **/
        ig.CONFIG_USER = {

            GAME_FPS: 60,
            GAME_WIDTH: 640,
            GAME_HEIGHT: 480,
            GAME_SCALE: 1,

            TOP_DOWN: true,

            GAME_WIDTH_PCT: 1,
            GAME_HEIGHT_PCT: 1,

            GAME_WIDTH_VIEW: 640,
            GAME_HEIGHT_VIEW: 480,

            PLAYER_MANAGER: {
                HOLD_TO_MOVE: true,
                SWIPE_TO_JUMP: false,
                TOUCH_DPAD_ENABLED: false
            },

            AUTO_SORT_LAYERS: true

        };

    });