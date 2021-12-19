const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.height;
let height = canvas.width;

var simplex = new SimplexNoise();
let points = [];
let point_max = 1500;
// z offset and incrementfor the noise sampling
let zoff = 0;
let zincrement = 0.00001;
// how much we want to step each iteration. Roughly indicates line speed
let step = 2.5;
// Noise angle constant
let angle = Math.PI * 2;
// base line values
let base = 2000;
let factor = 2;
let strokeWidth = 10;

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
  window.addEventListener('resize', onWindowResize, false);
  onWindowResize();
  for(let i = 0 ; i < point_max ; i++){
    points[i] = randomize_point(new Point(0,0));
  }
  simplex = new SimplexNoise();
  window.requestAnimationFrame(draw);
}

function onWindowResize(e){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
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
    // point.h = circle_map_restricted(270, 310);
    // draw it
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = colorstring(point);
    ctx.moveTo(point.pastX, point.pastY);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    if(point.x > width || point.x < 0 || point.y > height || point.y < 0){
      randomize_point(point);
    }
    point.h += 0.001;
  }
  zoff += zincrement;

  window.requestAnimationFrame(draw)
}

// maps a point on the plane that is the canvas to a degree angle around a circle
function circle_map(x, y){
  return Math.atan2(x - width / 2, y - height / 2) * 180 / Math.PI;
}

function circle_map_restricted(min, max){
  return Math.random() * (max - min) + min;
}

function modulus_phase(x, y){
  let z = (Math.sqrt(x, y));
  return (z+1) / (z^4) + z - 100;
}

function randomize_point(point){
  point.x = point.pastX = width * Math.random();
  point.y = point.pastY = height * Math.random();
  point.h = circle_map_restricted(180, 270);
  point.s = 1;
  point.l = 0.5;
  point.a = 1;
  return point;
}

function noise(x, y, z){
  var octaves = 4;
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




