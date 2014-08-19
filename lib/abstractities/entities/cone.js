ig.module('abstractities.entities.cone')
    .requires('impact.entity', 'game.constants', 'utils.math')
    .defines(function() {
        'use strict';

        var _c = ig.constants;
        var _utm = ig.utils.math;

        ig.EntityCone = ig.Entity.extend({

            createBody: function(friction) {

                var vertices = [];

                var length = this.length;
                var width = _utm.triangleSolveSide(length, length, 26.6 * 2);

                var presetVertices = _c.POLYGONS.CONE[this.alignment](length, width);

                vertices.push(new Box2D.Common.Math.b2Vec2(presetVertices.a.x, presetVertices.a.y));
                vertices.push(new Box2D.Common.Math.b2Vec2(presetVertices.b.x, presetVertices.b.y));
                vertices.push(new Box2D.Common.Math.b2Vec2(presetVertices.c.x, presetVertices.c.y));

                for (var i = vertices.length - 1; i >= 0; i--) {
                    vertices[i].x *= Box2D.SCALE;
                    vertices[i].y *= Box2D.SCALE;
                };

                var bodyDef = new Box2D.Dynamics.b2BodyDef();
                bodyDef.type = this.bodyType;
                bodyDef.position.Set((this.pos.x + this.size.x / 2) * Box2D.SCALE, (this.pos.y + this.size.y / 2) * Box2D.SCALE);
                this.body = ig.world.CreateBody(bodyDef);
                var shape = new Box2D.Collision.Shapes.b2PolygonShape();
                shape.SetAsArray(vertices, vertices.length);

                var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
                fixtureDef.shape = shape;
                fixtureDef.density = this.density;
                fixtureDef.friction = friction;
                fixtureDef.restitution = this.bounciness;
                fixtureDef.filter.groupIndex = this.filter.groupIndex;

                this.body.CreateFixture(fixtureDef);

            },

        });

    });