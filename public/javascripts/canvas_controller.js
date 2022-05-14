let angleSlider = document.getElementById("angle");
let zincSlider = document.getElementById("zinc");
let stepSlider = document.getElementById("step");
let strokeSlider = document.getElementById("stroke");
let resetButton = document.getElementById("reset");

let angleDefault = angleSlider.value = angle;
let zincDefault = zincSlider.value = zincrement;
let stepDefault = stepSlider.value = step;
let strokeDefault = strokeSlider.value = strokeWidth;

angleSlider.oninput = function() {
  angle = this.value;
  resetCanvas();
}

zincSlider.oninput = function (){
  zincrement = this.value;
  resetCanvas();
}

stepSlider.oninput = function (){
  step = this.value;
  resetCanvas();
}

strokeSlider.oninput = function (){
  strokeWidth = this.value;
  resetCanvas();
}

resetButton.onclick = function (){
  angle = angleSlider.value=  angleDefault;
  zincrement = zincSlider.value = zincDefault;
  step = stepSlider.value = stepDefault;
  strokeWidth = strokeSlider.value = strokeDefault;
  resetCanvas();
}