void setup() {
  // put your setup code here, to run once:
   pinMode(12, OUTPUT);
   pinMode(13, OUTPUT);
  // Turn the Serial Protocol ON
   Serial.begin(9600);
   Serial.print(-1);

}

void loop() {

  char byteRead;
  
   /* check if data has been sent from the computer: */
   if (Serial.available()) {
   
     /* read the most recent byte */
     byteRead = Serial.read();
     //You have to subtract '0' from the read Byte to convert from text to a number.
     //byteRead=byteRead-'0';
      //Serial.println(byteRead.toInt());
     //Turn LED ON depending on the byte Read.
     long a = atol(byteRead);
     Serial.println(a);
     if(a>0){
      
         digitalWrite(13, HIGH); // set the LED on
         delay(byteRead*10);
         digitalWrite(13, LOW);
         byteRead = 0;
         
     } else if(a<0){
       
         digitalWrite(12, HIGH); // set the LED on
         delay(byteRead*10);
         digitalWrite(12, LOW);
         byteRead = 0;
      
     } else {
      
         digitalWrite(12, LOW);
         digitalWrite(13, LOW);
     }
   }

}
