import processing.serial.*;
import cc.arduino.*;

Arduino arduino;
String[] lines = new String[2] ;
int prev,ult, dif, pinMG, pinNMG, time;
String modo;
int wait = 5000;
boolean activarTimer, valvula1, valvula2;


void setup() {

  size(300, 300);
  modo = "web";
  prev = 0;  
  lines[0] = "0";
  lines[1] = "0";
  pinMG = 12;
  pinNMG = 12;
  println(Arduino.list());
  arduino = new Arduino(this, Arduino.list()[0], 57600);
  arduino.pinMode(pinMG, Arduino.OUTPUT);
  arduino.pinMode(pinNMG, Arduino.OUTPUT);

  if(modo.equals("web")){

    lines = loadStrings("http://www.fb.local/write.php?likes");

  } else if (modo.equals("txt")){
    
    lines = loadStrings("../../data.txt");
  }

}

void draw() {
  
  background(50);

  if(modo.equals("web")){

    lines = loadStrings("http://www.fb.local/write.php?likes");

  } else if (modo.equals("txt")){
    
    lines = loadStrings("../../data.txt");
  }

  ult = int(lines[0]);
  dif = ult - prev;

  if(  dif > 0 ) { //Positivo
  

    arduino.digitalWrite(8, Arduino.HIGH);

    valvula1 = true;
    activarTimer = true;
    
    println("-------------------------------------------");    
    rect(random(0,width), random(0,height),50,50);
    println("ult " + ult);
    println("prev" +prev);

    
  } else if (dif<0) { // Negativo
    
   
    arduino.digitalWrite(12, Arduino.HIGH);
    activarTimer = true;
    valvula2 = true;

    ellipse(random(0,width), random(0,height),50,50);
    println("ult " + ult);
    println("prev" +prev);

  }
  
  prev = ult;

  if( activarTimer && millis() - time >= wait) {

    if(valvula1) arduino.digitalWrite(8, Arduino.LOW); valvula1 = false;
    if(valvula2) arduino.digitalWrite(12, Arduino.LOW); valvula2 = false;

    time = millis();//also update the stored time
    activarTimer = false;

  }


 

}


void mousePressed(){
  /*arduino.pinMode(pinMG, Arduino.OUTPUT);
  arduino.pinMode(pinNMG, Arduino.OUTPUT);

    arduino.digitalWrite(12, Arduino.HIGH);
    delay(5000);
    arduino.digitalWrite(12, Arduino.LOW);
    //delay(500);*/

  arduino.digitalWrite(8, Arduino.HIGH);

  valvula1 = true;
  activarTimer = true;




}


void keyPressed(){

    arduino.digitalWrite(12, Arduino.HIGH);
    activarTimer = true;
    valvula2 = true;

}

void timer(boolean activado, boolean destino){




}


