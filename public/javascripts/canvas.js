const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var displayWidth = 1280;
var displayHeight = 739;
var scale = 2;
canvas.style.width = displayWidth + 'px';
canvas.style.height = displayHeight + 'px';
canvas.width = displayWidth * scale;
canvas.height = displayHeight * scale;

let width = canvas.height;
let height = canvas.width;

var simplex = new SimplexNoise();
let points = [];
let point_max = 10000;
// z offset and incrementfor the noise sampling
let zoff = 0;
let zincrement = 0.001;
// how much we want to step each iteration. Roughly indicates line speed
let step = 2;
// Noise angle constant
let angle = Math.PI;
// base line values
let base = 1000;
let factor = 2;
let strokeWidth = 80;

const radius = 8;
const rectWidth = 2;
const rectHeight = 2;

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
  resetCanvas();
  window.requestAnimationFrame(draw);
}

function resetCanvas(){
  for(let i = 0 ; i < point_max ; i++){
    points[i] = randomize_point(new Point(0,0));
  }
  simplex = new SimplexNoise();
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
    point.x += Math.sin(point_noise) * step;
    point.y += Math.cos(point_noise) * step;
    // draw it
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colorstring(point);
    ctx.fill();
    ctx.lineWidth = 0.4;
    ctx.strokeStyle = colorstring(point);
    ctx.stroke();
    if(point.x > width || point.x < 0 || point.y > height || point.y < 0){
      resetPoint(point);
    }
    point.h += 0.01;
  }
  zoff += zincrement;

  window.requestAnimationFrame(draw)
}

// maps a point on the plane that is the canvas to a degree angle around a circle
function circle_map(x, y){
  const range = 30;
  const offset = 220;
  return (Math.atan2(x - width / 2, y - height / 2) * range / Math.PI) + offset;
}

function getColor(){
  const random = Math.random();
  if (random > 0.66) {
    return 220;
  }
  if (random > 0.33) {
    return 215;
  }
  return 210;
}

function circle_map_restricted(min, max){
  return circle_map(min, max) * (max - min) + min;
}

function modulus_phase(x, y){
  let z = (Math.sqrt(x, y));
  return (z+1) / (z^4) + z - 100;
}

function randomize_point(point){
  point.x = point.pastX = width * Math.random();
  point.y = point.pastY = height * Math.random();
  point.h = getColor(point.x, point.y);
  point.s = 1;
  point.l = 0.4;
  point.a = 1;
  return point;
}

function resetPoint(point){
  point.x = 0;
  point.y = height * Math.random()
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

function record(canvas, time) {
  var recordedChunks = [];
  return new Promise(function (res, rej) {
      var stream = canvas.captureStream(60 /*fps*/);
      mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm; codecs=vp9", 
          videoBitsPerSecond: 1000000000
      });
      
      //ondataavailable will fire in interval of `time || 4000 ms`
      mediaRecorder.start(time || 400);

      mediaRecorder.ondataavailable = function (event) {
          recordedChunks.push(event.data);
           // after stop `dataavilable` event run one more time
          if (mediaRecorder.state === 'recording') {
              mediaRecorder.stop();
          }

      }

      mediaRecorder.onstop = function (event) {
          var blob = new Blob(recordedChunks, {type: "video/webm" });
          var url = URL.createObjectURL(blob);
          res(url);
      }
  })
}

init();

// const recording = record(canvas, 15000)
// download it
// var link$ = document.createElement('a')
// link$.setAttribute('download','recordingVideo') 
// recording.then(url => {
//  link$.setAttribute('href', url) 
//  link$.click()
// })




