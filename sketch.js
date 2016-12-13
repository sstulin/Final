var squares = [];
var beat1;
var beat2;
var slope;
var diff;
var speed;
var diff2;




var scaler = inData;
var serial;
var inData;
var options = {
  baudrate: 9600
};
var portName = '/dev/cu.usbmodem1451';

function setup() {
  createCanvas(500, 500);
  
 beat1=millis();
beat2 =millis();
 var slope;
  
  for (var i = 0; i<1; i++) {
    squares[i] = new Square();
  }
  
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  //serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.open(portName, options); // open a serial port

}

function Square (){
  this.x= random(0,500);
  this.y= random(0,500);
  

  
  this.display = function(){
    stroke (255);
    fill(random(0,255),random(0,255),random(0,255));
    rectMode(CENTER);
    rect(this.x, this.y,diff/slope, diff/slope);
    
  }

}


function draw() {
  
  background(0);
  fill(255);
  //text("millis: " + millis(), 30, 30);
  // text("beat1: " + beat1, 30, 50);
  //  text("diff: " + diff, 30, 70);
   //  text("slope: " + slope, 30, 90);
   //  text("inData: " + inData, 30, 120);
   //  text("speed: " + speed, 30, 150);
   //  text("diff2: " + diff2, 30, 170);
  
  for (var i=0; i<squares.length; i++) {
    squares[i].display();
  }
  

  if(inData>230){
    squares.push(new Square());
 }
 
 if (diff>500){
   squares.splice(0,1);
 }
  

 
}


function serialEvent() {


  inData = Number(serial.read());
  
 if (inData>230){

   beat1 = millis();
   slope= diff/500;
   
 } else {
  
   diff = millis() - beat1;
   
 }

}



function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}



function serverConnected() {
  println('connected to server.');
}

function portOpen() {
  println('the serial port opened.')
}