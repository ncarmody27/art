p5.disableFriendlyErrors = true;

/*
var xspacing = 16;    // Distance between each horizontal location
var theta = 0.0;      // Start angle at 0
var period = 500.0;   // How many pixels before the wave repeats FREQUENCY
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
*/

//var w;                // Width of entire wave
var amplitude = 75.0; // Height of wave
var returnArray; //array to return multiple values 
class Wave {
	constructor(frequency,increment,xspacing, color,height){
		this.frequency = frequency;
		this.increment = increment;
		this.xspacing = xspacing;
		this.color = color;
		this.height = height;
		this.theta = 0.0;
		this.yvalues;
		this.dx;
		this.width;
		this.on = false;
	}
	generate(){
		returnArray = calcWave(this.increment,this.theta,this.yvalues,this.dx);
		this.yvalues, returnArray[0];
		this.theta = returnArray[1];
		renderWave(this.color,this.yvalues,this.xspacing,this.height);
	}
	setup(twopi, wid){
		this.width = wid+this.xspacing;
		this.dx = (twopi / this.frequency) * this.xspacing;
		this.yvalues = new Array(floor(this.width/this.xspacing));
	}
}

function calcWave(increment,theta,yvalues,dx) {
		// Increment theta (try different values for 
		// 'angular velocity' here)
		theta += increment;
		// For every x value, calculate a y value with sine function
		var x = theta;
		for (var i = 0; i < yvalues.length; i++) {
			yvalues[i] = Math.sin(x)*amplitude;
			x+=dx;
		}
		return [yvalues, theta];
	}
	
function renderWave(color,yvalues,xspacing,h) {
		noStroke();
		fill(color);
		// A simple way to draw the wave with an ellipse at each location
		for (var x = 0; x < yvalues.length; x++) {
			ellipse(x*xspacing, h/2+yvalues[x], xspacing, xspacing);
		}
	}
	

function setup() {
  var myCanvas = createCanvas(710, 300);
	myCanvas.parent('myContainer');
	noLoop();
	one.setup(TWO_PI, width);
	two.setup(TWO_PI, width);
	three.setup(TWO_PI, width);
	four.setup(TWO_PI, width);
	twop5.setup(TWO_PI, width);
	onep5.setup(TWO_PI, width);
}

const four = new Wave(55,0.5,1,'white',150);
const three = new Wave(110,0.5,1,'red',208);
const twop5 = new Wave(165,0.5,2.5,'yellow',266);
const two = new Wave(220,0.5,2.5,'green',324);
const onep5 = new Wave(330,0.5,2.5,'teal',382);
const one = new Wave(440,0.5,10,'blue',440);
var waves = new Array(one, onep5, two, twop5,three,four);

function allOff(){ waves.forEach(wave => {wave.on = false;});}

function allOn(){ waves.forEach(wave => {wave.on = true;});}

function on(wave){ wave.on = true;}

function off(wave){ wave.on = false;}

function draw() {
  background(0);
	waves.forEach(wave => {
		if (wave.on === true){
			wave.generate();
		}
	});
}


