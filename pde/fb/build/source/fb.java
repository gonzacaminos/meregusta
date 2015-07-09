import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import processing.net.*; 
import processing.serial.*; 
import java.io.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class fb extends PApplet {





String[] lines = new String[2] ;
int prev,ult, dif;
String modo;
Serial myPort;

public void setup() {
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

public void draw() {
  
  background(50);

  if(modo.equals("web")){

    lines = loadStrings("http://www.fb.local/write.php?likes");

  } else if (modo.equals("txt")){
    
    lines = loadStrings("../../data.txt");
  }

  ult = PApplet.parseInt(lines[0]);
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

  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "fb" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
