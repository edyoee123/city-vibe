let player;
let npc;
let talkText;
let inBattle = false;
let inventory = [];
let inventoryText;

const lootTable = ['Gold Coin', 'Health Potion', 'Sword', 'Shield', 'Magic Scroll'];

const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 240,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('tiles', 'assets/tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 16, frameHeight: 16 });
    this.load.image('npc', 'assets/npc.png');
}

function create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('citytiles', 'tiles');
    map.createLayer('Below Player', tileset, 0, 0);

    // Player setup
    player = this.physics.add.sprite(50, 50, 'player', 0);
    player.setCollideWorldBounds(true);

    // NPC setup
    npc = this.physics.add.sprite(100, 100, 'npc');
    npc.setCollideWorldBounds(true);

    // Dialogue text
    talkText = this.add.text(10, 220, '', {
        font: '8px Arial',
        fill: '#ffffff',
        backgroundColor: '#000000'
    }).setScrollFactor(0).setDepth(1);

    // Inventory UI
    inventoryText = this.add.text(10, 10, 'Inventory: (empty)', {
        font: '8px Arial',
        fill: '#ffffff',
        backgroundColor: '#000000'
    }).setScrollFactor(0).setDepth(1);

    // Player animations
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });

    // Keys: WASD + Arrows
    this.keys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        attack: Phaser.Input.Keyboard.KeyCodes.LEFT,
        arrowUp: Phaser.Input.Keyboard.KeyCodes.UP,
        arrowDown: Phaser.Input.Keyboard.KeyCodes.DOWN,
        arrowRight: Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

    // Overlap detection for NPC
    this.physics.add.overlap(player, npc, startTalk, null, this);
}

function update() {
    if (inBattle) return;

    player.setVelocity(0);

    // WASD movement
    if (this.keys.left.isDown) {
        player.setVelocityX(-60);
        player.setFlipX(true);
        player.anims.play('walk', true);
    } else if (this.keys.right.isDown) {
        player.setVelocityX(60);
        player.setFlipX(false);
        player.anims.play('walk', true);
    } else if (this.keys.up.isDown) {
        player.setVelocityY(-60);
        player.anims.play('walk', true);
    } else if (this.keys.down.isDown) {
        player.setVelocityY(60);
        player.anims.play('walk', true);
    } else {
        player.anims.stop();
    }

    // NPC follow AI
    let dist = Phaser.Math.Distance.Between(player.x, player.y, npc.x, npc.y);
    if (dist < 120 && dist > 30) {
        this.physics.moveToObject(npc, player, 30);
    } else {
        npc.setVelocity(0);
    }

    // Auto-clear dialogue if far
    if (dist > 30 && !inBattle) {
        talkText.setText('');
    }

    // Attack with Left Arrow
    if (talkText.text !== '' && Phaser.Input.Keyboard.JustDown(this.keys.attack)) {
        startBattle();
    }

    // Reserved keys for future features
    if (Phaser.Input.Keyboard.JustDown(this.keys.arrowUp)) {
        console.log("Arrow Up pressed - future feature");
    }
    if (Phaser.Input.Keyboard.JustDown(this.keys.arrowDown)) {
        console.log("Arrow Down pressed - future feature");
    }
    if (Phaser.Input.Keyboard.JustDown(this.keys.arrowRight)) {
        console.log("Arrow Right pressed - future feature");
    }
}

function startTalk() {
    if (!inBattle) {
        talkText.setText('NPC: Welcome to City Vibe! Press ← to battle.');
    }
}

function startBattle() {
    inBattle = true;
    talkText.setText('Battle started! You win! (Demo)');

    // Random loot
    let loot = lootTable[Math.floor(Math.random() * lootTable.length)];
    inventory.push(loot);
    inventoryText.setText('Inventory: ' + inventory.join(', '));

    // Remove NPC temporarily
    npc.disableBody(true, true);

    // Respawn after 5 seconds
    setTimeout(() => {
        inBattle = false;
        talkText.setText('');
        npc.enableBody(true, player.x + 50, player.y, true, true);
    }, 5000);
}
