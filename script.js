// Animated particle grid background (no external libs)
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w, h, t = 0;
function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
resize(); addEventListener('resize', resize);

function draw(){
  t += 0.005; ctx.clearRect(0,0,w,h);
  // subtle lines
  ctx.globalAlpha = 0.06; ctx.strokeStyle = '#ffffff';
  for (let y = 60; y < h; y += 60) {
    ctx.beginPath(); ctx.moveTo(0, y + Math.sin(t + y*0.01)*8); ctx.lineTo(w, y + Math.sin(t + y*0.01)*8); ctx.stroke();
  }
  for (let x = 80; x < w; x += 120) {
    ctx.beginPath(); ctx.moveTo(x + Math.cos(t + x*0.01)*6, 0); ctx.lineTo(x + Math.cos(t + x*0.01)*6, h); ctx.stroke();
  }
  // floating orbs
  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 6; i++) {
    const rad = 120 + Math.sin(t*2 + i)*40;
    const x = (w/2) + Math.cos(t + i*1.2) * (220 + i*30);
    const y = (h/2) + Math.sin(t*1.2 + i*0.8) * (120 + i*18);
    const grd = ctx.createRadialGradient(x, y, 0, x, y, rad);
    grd.addColorStop(0, 'rgba(167,139,250,0.7)');
    grd.addColorStop(1, 'rgba(167,139,250,0)');
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI*2); ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

// Fill year
document.getElementById('year').textContent = new Date().getFullYear();

// Optional: replace Contract Address from URL ?ca=0x....
const ca = new URLSearchParams(location.search).get('ca');
if (ca) document.getElementById('contract').textContent = ca;
