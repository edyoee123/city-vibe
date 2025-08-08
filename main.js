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
let npc;
let cursors;
let talkText;
let inBattle = false;

let game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('npc', 'assets/npc.png', { frameWidth: 16, frameHeight: 16 });
}

function create() {
    // Background color
    this.cameras.main.setBackgroundColor('#228B22');

    // Spawn player at center
    player = this.physics.add.sprite(160, 120, 'player', 0);

    // Spawn NPC near player
    npc = this.physics.add.sprite(200, 120, 'npc', 0);

    // Overlap detection
    this.physics.add.overlap(player, npc, startTalk, null, this);

    // Controls
    cursors = this.input.keyboard.createCursorKeys();

    // Talk text UI
    talkText = this.add.text(10, 210, '', { font: '8px Arial', fill: '#ffffff', backgroundColor: '#000000' });
    talkText.setScrollFactor(0).setDepth(1);

    // Player walk animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });

    // Camera follow
    this.cameras.main.startFollow(player);
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

    if (talkText.text !== '' && Phaser.Input.Keyboard.JustDown(cursors.space)) {
        startBattle();
    }
}

function startTalk() {
    talkText.setText('NPC: Welcome to City Vibe! Press SPACE to battle.');
}

function startBattle() {
    inBattle = true;
    talkText.setText('Battle started! You win! (Demo)');
    setTimeout(() => {
        inBattle = false;
        talkText.setText('');
    }, 2000);
}
