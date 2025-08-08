let config = {
    type: Phaser.AUTO,
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: { preload: preload, create: create, update: update }
};

let player;
let cursors;
let npc;
let talkText;
let inBattle = false;

let game = new Phaser.Game(config);

function preload() {
    this.load.image('tiles', 'assets/tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('npc', 'assets/npc.png', { frameWidth: 16, frameHeight: 16 });
}

function create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('citytiles', 'tiles');
    const belowLayer = map.createLayer('Below Player', tileset, 0, 0);
    const worldLayer = map.createLayer('World', tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    player = this.physics.add.sprite(50, 50, 'player', 0);
    npc = this.physics.add.sprite(100, 100, 'npc', 0);

    this.physics.add.collider(player, worldLayer);
    this.physics.add.overlap(player, npc, startTalk, null, this);

    cursors = this.input.keyboard.createCursorKeys();

    talkText = this.add.text(10, 210, '', { font: '8px Arial', fill: '#ffffff', backgroundColor: '#000000' });
    talkText.setScrollFactor(0);
    talkText.setDepth(1);

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });
}

function update() {
    if (inBattle) return;

    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-60);
        player.anims.play('walk', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(60);
        player.anims.play('walk', true);
    } else if (cursors.up.isDown) {
        player.setVelocityY(-60);
        player.anims.play('walk', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(60);
        player.anims.play('walk', true);
    } else {
        player.anims.stop();
    }
}

function startTalk() {
    talkText.setText('NPC: Welcome to City Vibe! Press SPACE to battle.');
    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
        startBattle();
    }
}

function startBattle() {
    inBattle = true;
    talkText.setText('Battle started! You win! (Demo)');
    setTimeout(() => {
        inBattle = false;
        talkText.setText('');
    }, 2000);
}
