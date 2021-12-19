const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var simplex = new SimplexNoise();
let points = [];
let point_max = 600;
// z offset and incrementfor the noise sampling
let zoff = 0;
let zincrement = 0.004;
// how much we want to step for the next iteration of noise sampling
let step = 5;
// Noise angle constant
let angle = Math.PI * 6;
// base line values
let base = 1000;
let factor = 1.75;

class Point {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.pastX = x;
    this.pastY = y;
    this.h = 0;
    this.s = 0;
    this.l = 0;
    this.a = 1;
  }
}

function init(){
  for(let i = 0 ; i < point_max ; i++){
    points[i] = randomize_point(new Point(0,0));
  }
  window.requestAnimationFrame(draw);
}

function draw(){
  for(let i = 0 ; i < points.length ; i++){
    // update the point
    let point = points[i];
    point.pastX = point.x;
    point.pastY = point.y;
    let point_noise = angle * noise(point.x / base * factor, point.y / base * factor, zoff);
    point.x += Math.cos(point_noise) * step;
    point.y += Math.sin(point_noise) * step;
    // draw it
    ctx.beginPath();
    ctx.strokeStyle = colorstring(point);
    ctx.moveTo(point.pastX, point.pastY);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  }
  zoff += zincrement;

  window.requestAnimationFrame(draw)
}

function randomize_point(point){
  point.x = point.pastX = canvas.width * Math.random();
  point.y = point.pastY = canvas.height * Math.random();
  point.h = Math.atan2(point.x, point.y) * 180 / Math.PI;
  point.s = 1;
  point.l = 0.5;
  point.a = 1;
  return point;
}

function noise(x, y, z){
  var octaves = 16;
  var decay = 0.5;
  var amp = 1;
  var freq = 1;
  var sum = 0;
  for(let i = 0 ; i < octaves ; i++){
    amp *= decay;
    sum += amp * (simplex.noise3D(x*freq, y*freq, z*freq) + 1) * 0.5;
    freq *= 2;
  }
  return sum;
}

function colorstring(point){
  return `hsla(${point.h}, ${point.s * 100}%, ${point.l * 100}%, ${point.a})`;
}

init();




