ig.module('ember.core.config')
    .requires()
    .defines(function() {
        'use strict';

        ig.CONFIG = {};

        ig.CONFIG.LOADER_LOGO_SRC_MAIN = "media/logo.png";
        ig.CONFIG.LOADER_LOGO_SRC_ALT = "media/logo.png";

        ig.CONFIG.ENTITY = {};

        ig.CONFIG.ENTITY.FRICTION_X = 200;
        ig.CONFIG.ENTITY.FRICTION_Y = 200;

        ig.CONFIG.ENTITY.MAX_VEL_X = 300;
        ig.CONFIG.ENTITY.MAX_VEL_Y = 300;

        ig.CONFIG.ENTITY.SPEED_X = 750;
        ig.CONFIG.ENTITY.SPEED_Y = 750;

        ig.CONFIG.CHARACTER = {};

        ig.CONFIG.CHARACTER.SPEED_X = 750;
        ig.CONFIG.CHARACTER.SPEED_Y = 750;

        ig.CONFIG.CHARACTER.CAN_FLIP_X = true;
        ig.CONFIG.CHARACTER.CAN_FLIP_Y = false;

        ig.CONFIG.ABILITY = {};

        ig.CONFIG.ABILITY.TREE = [];

        ig.CONFIG.ABILITY.TREE[0] = 'physical';
        ig.CONFIG.ABILITY.TREE[1] = 'magical';
        ig.CONFIG.ABILITY.TREE[2] = 'defense';
        ig.CONFIG.ABILITY.TREE[3] = 'utility';

        ig.CONFIG.ABILITY.DAMAGETYPE = [];

        ig.CONFIG.ABILITY.DAMAGETYPE[0] = 'physical';
        ig.CONFIG.ABILITY.DAMAGETYPE[1] = 'magical';
        ig.CONFIG.ABILITY.DAMAGETYPE[2] = 'pure';

        ig.CONFIG.ABILITY.GLOBAL_COOLDOWN = 0.2;

    });