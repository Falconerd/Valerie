ig.module('abstractities.entities.cone')
    .requires('impact.entity')
    .defines(function() {
        'use strict';

        ig.EntityCone = ig.Entity.extend({

            createBody: function(friction) {

                var vertices = [];

                var angle = this.angle;
                var length = this.length;

                var endHeight = Math.round(_utm.triangleSolveSide(length, length, angle));

                var a = {
                    x: 0,
                    y: 0
                };
                var b = {
                    x: length * 1.5,
                    y: -length * .25
                };
                var c = {
                    x: length * .5,
                    y: -length + length * .25
                };

                vertices.push(new Box2D.Common.Math.b2Vec2(a.x, a.y));
                vertices.push(new Box2D.Common.Math.b2Vec2(b.x, b.y));
                vertices.push(new Box2D.Common.Math.b2Vec2(c.x, c.y));

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