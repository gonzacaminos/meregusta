import processing.serial.*;
import cc.arduino.*;

Arduino arduino;
String[] lines = new String[2] ;
int prev,ult, dif, pinMG, pinNMG;
String modo;

void setup() {

  size(300, 300);
  modo = "txt";
  prev = 0;  
  lines[0] = "0";
  lines[1] = "0";
  pinMG = 13;
  pinNMG = 12;
  println(Arduino.list());
  arduino = new Arduino(this, Arduino.list()[0], 57600);
  arduino.pinMode(pinMG, Arduino.OUTPUT);
  arduino.pinMode(pinNMG, Arduino.OUTPUT);


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
  
  
    arduino.digitalWrite(12, Arduino.LOW);
    arduino.digitalWrite(13, Arduino.HIGH);
    delay(5000);
    arduino.digitalWrite(13, Arduino.LOW);
    println("-------------------------------------------");    
    rect(random(0,width), random(0,height),50,50);
    println("ult " + ult);
    println("prev" +prev);

    
  } else if (dif<0) { // Negativo
        
    arduino.digitalWrite(13, Arduino.LOW);
    arduino.digitalWrite(12, Arduino.HIGH);
    delay(5000);
    arduino.digitalWrite(12, Arduino.LOW);
    ellipse(random(0,width), random(0,height),50,50);
    println("ult " + ult);
    println("prev" +prev);

  }
  
  prev = ult;

}


