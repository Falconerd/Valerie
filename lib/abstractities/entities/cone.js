ig.module('abstractities.entities.cone')
    .requires('impact.entity')
    .defines(function() {
        'use strict';

        ig.EntityCone = ig.Entity.extend({

            createBody: function(friction) {

                var vertices = [];
                var width = this.size.x;
                var height = this.size.y;

                var angle = this.angle;
                var length = this.length;

                var endHeight = Math.round(_utm.triangleSolveSide(length, length, angle));

                vertices.push(new Box2D.Common.Math.b2Vec2(0, 0));
                vertices.push(new Box2D.Common.Math.b2Vec2(length, endHeight * .5));
                vertices.push(new Box2D.Common.Math.b2Vec2(length, endHeight * .25));
                vertices.push(new Box2D.Common.Math.b2Vec2(length, -endHeight * .25));
                vertices.push(new Box2D.Common.Math.b2Vec2(length, -endHeight * .5));

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