import processing.net.*;
import processing.serial.*;
import java.io.*;

String[] lines = new String[2] ;
int prev,ult, dif;
String modo;
Serial myPort;

void setup() {
  size(800, 800);
  background(50);
  fill(200);
  modo = "web";
  prev = 0;  
  frameRate(10);
  lines[0] = "0";
  lines[1] = "0";
  myPort = new Serial(this, "COM4", 9600);
  myPort.bufferUntil('\n');

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
  
    println("-------------------------------------------");
    
    rect(random(0,width), random(0,height),50,50);
    println("ult " + ult);
    println("prev" +prev);

     myPort.write(dif);

    
  } else if (dif<0) { // Negativo
      
    //fill(255,0,0);
    ellipse(random(0,width), random(0,height),50,50);
    println("ult " + ult);
    println("prev" +prev);
    myPort.write(dif);
    println(dif);

  }
  
  prev = ult;
  
  


}

