import processing.serial.*;
import cc.arduino.*;

Arduino arduino;
String[] lines = new String[2] ;
int prev,ult, dif, pinMG, pinNMG, time;
String modo, ruta, rutaTexto, rutaWeb;
int wait = 10000;
boolean activarTimer, valvula1, valvula2;
int tempWait;
PImage like,noLike;

void setup() {

  size(500, 500);
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
  rutaTexto = "../../data.txt";
  rutaWeb = "http://www.fb.local/write.php?likes";
  like = loadImage("like.png");
  noLike = loadImage("nolike.png");

  if(modo.equals("web")){

    ruta = rutaWeb;

  } else if (modo.equals("txt")){
    
    ruta = rutaTexto;

  }

  textSize(70);


}

void draw() {
  
  background(50);

  lines = loadStrings(ruta);

  ult = int(lines[0]);
  dif = ult - prev;

  if(  dif > 0 ) { //Positivo
  

    arduino.digitalWrite(8, Arduino.HIGH);

    valvula1 = true;
    activarTimer = true;
    
    println("-------------------------------------------");    
    println("ult " + ult);
    println("prev" +prev);

    tempWait = wait * abs(dif);

    image(like,width/2-like.width/2, height/2-like.height/2);

  } else if (dif<0) { // Negativo
    
   
    arduino.digitalWrite(12, Arduino.HIGH);
    activarTimer = true;
    valvula2 = true;
    
    image(noLike,width/2-like.width/2, height/2-like.height/2);

    println("ult " + ult);
    println("prev" +prev);
    tempWait = wait * abs(dif);

  } 

  
  prev = ult;


  if( activarTimer && millis() - time >= tempWait) {

    if(valvula1) arduino.digitalWrite(8, Arduino.LOW); valvula1 = false;
    if(valvula2) arduino.digitalWrite(12, Arduino.LOW); valvula2 = false;

    time = millis();//also update the stored time
    activarTimer = false;
    tempWait = 0;

  }

  debug();


 

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

    if(key == 'w' || key == 'W') ruta = rutaWeb;

    else if(key == 't' || key == 'T') ruta = rutaTexto;

    else if(key == '+') wait +=1000;
    
    else if(key == '-') wait +=500;



}

void debug(){

  text(abs(dif), width/2-70/2, height/2+70/2); 

  
  pushStyle();
    textSize(20);
    text("Tiempo Fijo " + wait/1000 + " s", 0+30/2, 0+70/2); 
    text("Tiempo Actual " + tempWait/1000 + " s", width-200, 0+70/2); 

    text(ruta, 0+30/2, height-70/2); 
  popStyle();


}


