ig.module( 'game.levels.title' )
.requires( 'impact.image','game.entities.title-new','game.entities.title-load','game.entities.title-quit' )
.defines(function(){
LevelTitle=/*JSON[*/{
	"entities": [
		{
			"type": "EntityTitleNew",
			"x": 40,
			"y": 72
		},
		{
			"type": "EntityTitleLoad",
			"x": 36,
			"y": 116
		},
		{
			"type": "EntityTitleQuit",
			"x": 40,
			"y": 160
		}
	],
	"layer": [
		{
			"name": "new_layer_0",
			"width": 2,
			"height": 3,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/terrain/walls01.png",
			"repeat": true,
			"preRender": false,
			"distance": "2",
			"tilesize": 64,
			"foreground": false,
			"data": [
				[13,14],
				[17,18],
				[21,22]
			]
		},
		{
			"name": "new_layer_1",
			"width": 2,
			"height": 3,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/terrain/walls01.png",
			"repeat": true,
			"preRender": false,
			"distance": "2",
			"tilesize": 64,
			"foreground": false,
			"data": [
				[21,22],
				[0,0],
				[13,14]
			]
		}
	]
}/*]JSON*/;
LevelTitleResources=[new ig.Image('media/terrain/walls01.png'), new ig.Image('media/terrain/walls01.png')];
});