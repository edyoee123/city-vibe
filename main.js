// main.js - City Vibe Retro Mafia Full Demo
const canvas = document.getElementById('gameCanvas'), ctx = canvas.getContext('2d');
const chatbox = document.getElementById('chatbox'), cmdInput = document.getElementById('cmdInput');
const loading = document.getElementById('loading-screen'), loadpct = document.getElementById('loadpct');
const fsBtn = document.getElementById('fullscreen-btn');

// --- embedded map to avoid fetch cross-origin issues ---
const MAP = (function(){ return {"width": 40, "height": 30, "tilewidth": 32, "tileheight": 32, "layers": [{"name": "ground", "width": 40, "height": 30, "data": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]}], "tilesets": [{"name": "tiles32", "image": "assets/tiles32.png", "tilewidth": 32, "tileheight": 32, "tilecount": 9, "columns": 3}]}; })();

// assets list
const ASSETS = {
  tiles: 'assets/tiles32.png',
  player: 'assets/player32.png',
  enemy: 'assets/enemy32.png',
  loot: 'assets/loot16.png',
  logo: 'assets/logo64.png'
};

let images = {}, toload = Object.values(ASSETS), loaded = 0;
function loadAssets(cb){
  toload.forEach(src=>{ const i=new Image(); i.onload=()=>{ images[src]=i; loaded++; loadProgress(); if(loaded===toload.length) cb(); }; i.onerror=()=>{ loaded++; loadProgress(); if(loaded===toload.length) cb(); }; i.src=src; });
}
function loadProgress(){ loadpct.textContent = Math.round(loaded/toload.length*100) + '%'; }

// chat feed
let chat = [], MAX_CHAT=10;
function addChat(type, text){
  const color = {POLICE:'#6fb3ff',CRIME:'#ff6b6b',ALERT:'#ffd76b',LOOT:'#7bff8a',EMS:'#c67bff',INFO:'#ffffff'}[type]||'#fff';
  chat.push({text, color, ts:Date.now()});
  if(chat.length>MAX_CHAT) chat.shift();
  renderChat();
}
function renderChat(){ chatbox.innerHTML=''; chat.forEach(e=>{ const d=document.createElement('div'); d.textContent=e.text; d.style.color=e.color; chatbox.appendChild(d); }); }

// player and camera
let player = {x:MAP.width*32/2, y:MAP.height*32/2, w:32,h:32, vx:0, vy:0, speed:1.6, frame:0, ft:0, hp:100};
let camera = {x:0,y:0, w:canvas.width, h:canvas.height};
function centerCamera(){ camera.x = player.x - canvas.width/2 + player.w/2; camera.y = player.y - canvas.height/2 + player.h/2; // clamp
  camera.x = Math.max(0, Math.min(camera.x, MAP.width*32 - canvas.width));
  camera.y = Math.max(0, Math.min(camera.y, MAP.height*32 - canvas.height)); }

// input
let keys = {}; let mouse = {x:0,y:0, down:false};
window.addEventListener('keydown', e=>{ keys[e.key]=true; if(e.key==='Enter' && document.activeElement!==cmdInput) cmdInput.focus(); });
window.addEventListener('keyup', e=>{ keys[e.key]=false; });
canvas.addEventListener('mousemove', e=>{ const rect=canvas.getBoundingClientRect(); mouse.x = (e.clientX - rect.left) + camera.x; mouse.y = (e.clientY - rect.top) + camera.y; });
canvas.addEventListener('mousedown', e=>{ mouse.down=true; shoot(); });
canvas.addEventListener('mouseup', e=>{ mouse.down=false; });

// bullets
let bullets = [];
function shoot(){ const now = Date.now(); // fire single bullet per click (no auto)
  const angle = Math.atan2(mouse.y - (player.y+player.h/2), mouse.x - (player.x+player.w/2));
  const speed = 6.0;
  bullets.push({x: player.x+player.w/2, y: player.y+player.h/2, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, dmg:25, life:2000, born: now});
  addChat('ALERT', 'You fired a shot.'); }

// enemies simple AI
let enemies = [];
function spawnEnemy(x,y){ enemies.push({id:'E'+Math.random().toString(36).slice(2,6), x,y,w:32,h:32,hp:80, state:'idle', vx:0, vy:0, lastAct:Date.now()}); }

// loot bags
let lootBags = [];
function spawnLoot(x,y, items){ const id='L'+Math.random().toString(36).slice(2,6); lootBags.push({id,x,y,items,created:Date.now()}); addChat('LOOT','Loot spawned at ('+Math.round(x)+','+Math.round(y)+')'); setTimeout(()=>{ lootBags = lootBags.filter(l=>l.id!==id); addChat('INFO','Loot bag despawned ('+Math.round(x)+','+Math.round(y)+')'); }, 5*60*1000); }

// commands handler
function handleCommand(str){
  if(!str) return;
  if(!str.startsWith('/')){ addChat('INFO','You: '+str); return; }
  const parts = str.split(' '), cmd = parts[0].toLowerCase();
  switch(cmd){
    case '/help': addChat('INFO', 'Commands: /enter /exit /robstore /loot /inventory /myguns /bail'); break;
    case '/enter': addChat('INFO', 'Try /enter near hospital or police (demo)'); break;
    case '/exit': addChat('INFO', 'You exited interior (demo)'); break;
    case '/robstore': addChat('CRIME', 'Robbery started (demo). Police will respond.'); setTimeout(()=>{ spawnLoot(player.x+40, player.y, [{name:'Cash', qty:1200}]); addChat('LOOT','You grabbed loot from store.'); }, 2500); setTimeout(()=>{ addChat('POLICE','Police responded to robbery (demo).'); }, 45000); break;
    case '/loot': { let nearest=null, nd=9999; lootBags.forEach(b=>{ const d=Math.hypot(player.x-b.x, player.y-b.y); if(d<nd){ nd=d; nearest=b; } }); if(!nearest || nd>40){ addChat('INFO','No loot nearby.'); break; } nearest.items.forEach(it=>addChat('INFO','Collected: '+it.name+' x'+it.qty)); lootBags = lootBags.filter(b=>b.id!==nearest.id); } break;
    case '/inventory': addChat('INFO', 'Inventory: Cash x500 (demo)'); break;
    case '/myguns': addChat('INFO','Guns: Rusty Pistol (12)'); break;
    case '/bail': addChat('POLICE','Bail paid (demo)'); break;
    default: addChat('INFO','Unknown command.'); break;
  }
}

// input event
cmdInput.addEventListener('keydown', e=>{ if(e.key==='Enter'){ handleCommand(cmdInput.value.trim()); cmdInput.value=''; } });

// fullscreen button
fsBtn.addEventListener('click', ()=>{ if(!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); });

// helper collision
function rectsColl(a,b){ return !(a.x+b.w < b.x || a.x > b.x+b.w || a.y+a.h < b.y || a.y > b.y+b.h); }

// main loop
function start(){
  loading.style.display='none';
  addChat('INFO','Welcome to City Vibe - Retro Mafia (full demo)');
  addChat('INFO','Use WASD or Arrow keys to move. Aim with mouse, click to shoot. Type /help.');
  // spawn some enemies and loot
  spawnEnemy(player.x+200, player.y+40);
  spawnEnemy(player.x-160, player.y-80);
  spawnLoot(player.x+120, player.y+100, [{name:'Cash',qty:400}]);
  requestAnimationFrame(loop);
}

function loop(ts){
  update(ts); draw(); requestAnimationFrame(loop);
}

function update(ts){
  // movement
  let mvx=0, mvy=0;
  if(keys['ArrowLeft']||keys['a']) mvx-=player.speed;
  if(keys['ArrowRight']||keys['d']) mvx+=player.speed;
  if(keys['ArrowUp']||keys['w']) mvy-=player.speed;
  if(keys['ArrowDown']||keys['s']) mvy+=player.speed;
  player.x += mvx; player.y += mvy;
  if(mvx!==0||mvy!==0){ player.ft++; player.frame = Math.floor((player.ft/6)%3); } else player.frame=0;
  // camera center
  centerCamera();
  // bullets move & collisions
  const now = Date.now();
  bullets = bullets.filter(b=> now - b.born < b.life);
  bullets.forEach(b=>{ b.x += b.vx; b.y += b.vy; // check enemy hit
    enemies.forEach(en=>{ if(Math.hypot(en.x - b.x, en.y - b.y) < 18){ en.hp -= b.dmg; b.life = 0; addChat('ALERT','Enemy hit!'); } }); });
  enemies = enemies.filter(e=> e.hp>0 );
  // enemies simple AI: wander towards player occasionally
  enemies.forEach(e=>{
    if(Date.now() - e.lastAct > 800){
      e.lastAct = Date.now();
      const dx = player.x - e.x, dy = player.y - e.y;
      const d = Math.hypot(dx,dy);
      if(d < 180){ e.vx = (dx/d)*0.6; e.vy = (dy/d)*0.6; }
      else { e.vx = (Math.random()-0.5)*0.8; e.vy = (Math.random()-0.5)*0.8; }
    }
    e.x += e.vx; e.y += e.vy;
    // enemy attack if close
    if(Math.hypot(e.x - player.x, e.y - player.y) < 28){ player.hp -= 0.2; if(player.hp <=0){ addChat('DEATH','You were killed by an enemy (demo). Respawning...'); player.hp = 100; player.x = MAP.width*32/2; player.y = MAP.height*32/2; } }
  });
  // cleanup loot old
  lootBags = lootBags.filter(b=> Date.now() - b.created < 5*60*1000);
}

// draw functions
function draw(){
  // clear
  ctx.fillStyle='#0f0f0f'; ctx.fillRect(0,0,canvas.width,canvas.height);
  // draw map tiles
  const tilesImg = images[ASSETS.tiles];
  if(tilesImg && MAP){
    for(let y=0;y<MAP.height;y++){
      for(let x=0;x<MAP.width;x++){
        const tid = MAP.layers[0].data[y*MAP.width + x]; // 1=road,2=grass
        const sx = (tid-1)*32, sy = 0;
        const dx = x*32 - camera.x, dy = y*32 - camera.y;
        if(dx+32<0||dx>canvas.width||dy+32<0||dy>canvas.height) continue;
        ctx.drawImage(tilesImg, sx, sy, 32,32, dx, dy, 32,32);
      }
    }
  }
  // draw loot
  const lootImg = images[ASSETS.loot];
  lootBags.forEach(b=>{ const dx=b.x - camera.x -8, dy=b.y-camera.y-8; if(lootImg) ctx.drawImage(lootImg, dx, dy, 16,16); });
  // draw enemies
  const enImg = images[ASSETS.enemy];
  enemies.forEach(e=>{ const dx=e.x - camera.x, dy=e.y - camera.y; if(enImg) ctx.drawImage(enImg, 0,0,32,32, dx, dy, 32,32); });
  // draw bullets
  ctx.fillStyle='yellow'; bullets.forEach(b=>{ ctx.fillRect(b.x-camera.x-2, b.y-camera.y-2, 4,4); });
  // draw player (rotated to face mouse)
  const pimg = images[ASSETS.player];
  const px = player.x - camera.x, py = player.y - camera.y;
  if(pimg){
    // draw sprite frame
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(pimg, player.frame*32, 0, 32,32, px, py, 32,32);
    // draw simple gun line to mouse
    ctx.strokeStyle='rgba(255,255,255,0.6)'; ctx.beginPath();
    const cx = px + 16, cy = py + 16;
    ctx.moveTo(cx, cy); ctx.lineTo(mouse.x - camera.x, mouse.y - camera.y); ctx.stroke();
  } else { ctx.fillStyle='cyan'; ctx.fillRect(px,py,32,32); }
  // draw fog of war overlay (darken outside circle)
  drawFog();
  // draw HUD (HP)
  ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillRect(12, canvas.height-42, 160,28);
  ctx.fillStyle='red'; ctx.fillRect(16, canvas.height-38, Math.max(0, player.hp)/100*152, 20);
  ctx.strokeStyle='#fff'; ctx.strokeRect(16, canvas.height-38, 152,20);
}

// fog of war: radial gradient mask centered on player with blurred edge
function drawFog(){
  // full-screen dark overlay
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  // create radial gradient on a temporary canvas for soft edge
  const gx = player.x - camera.x + 16, gy = player.y - camera.y + 16;
  const grad = ctx.createRadialGradient(gx, gy, 40, gx, gy, 200);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.6, 'rgba(0,0,0,0.3)');
  grad.addColorStop(1, 'rgba(0,0,0,0.9)');
  // use composite operation to cut hole
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = grad;
  ctx.beginPath(); ctx.arc(gx, gy, 200, 0, Math.PI*2); ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

// load and start
loadAssets(()=>{ // stash loaded images by key for convenience
  const tmp={}; Object.keys(ASSETS).forEach(k=> tmp[ASSETS[k]] = images[ASSETS[k]] ); images = tmp;
  // embed map into global var so index.html can show it (not required but kept)
  window.MAP_EMBED = MAP;
  start();
});