ig.module('game.entities.player-light')
    .requires('plusplus.entities.light')
    .defines(function() {
        'use strict';

        var _uti = ig.utilsintersection;

        ig.EntityPlayerLight = ig.global.EntityPlayerLight = ig.EntityLight.extend({

            /**
             * Find all opaque items bounds that are {@link ig.EntityExtended#opaque}.
             **/
            findItems: function() {

                var minX = this.pos.x;
                var minY = this.pos.y;
                var maxX = minX + this.size.x;
                var maxY = minY + this.size.y;
                var numItemsPrefind = this.items.length;

                // faster to reset items list each time we find than to cautious add/remove

                this.items.length = 0;

                for (var i = 0, il = ig.game.layers.length; i < il; i++) {

                    var layer = ig.game.layers[i];

                    if (layer.numEntities) {

                        var itemsOpaque = layer.itemsOpaque;

                        for (var j = 0, jl = itemsOpaque.length; j < jl; j++) {

                            var item = itemsOpaque[j];

                            if (item === ig.game.getPlayer()) continue;

                            // under and within light

                            if (item._killed !== true && (item.performance === ig.EntityExtended.PERFORMANCE.STATIC || this.castsShadowsMovable && !this.pixelPerfect) && _uti.AABBIntersect(
                                minX, minY, maxX, maxY,
                                item.pos.x, item.pos.y, item.pos.x + item.size.x, item.pos.y + item.size.y
                            )) {

                                this.items.push(item);

                                var anim = item.currentAnim;

                                if (item.changed) {

                                    this.changed = true;

                                } else if (anim && ((anim !== item._animCastShadow && (anim.opaqueOffset || (item._animCastShadow && item._animCastShadow.opaqueOffset))) || (anim.changed && anim.opaqueOffset && anim.opaqueOffset.tiles))) {

                                    this.changed = true;

                                    // force opaque vertices to be recalculated in item

                                    if (!item.opaqueFromVertices) {

                                        item._verticesFound = false;

                                    }

                                }

                                item._animCastShadow = anim;

                            }

                        }

                    }

                }

                // items changed, light is changed

                if (numItemsPrefind !== this.items.length) {

                    this.changed = true;

                }

            },

        });

    });