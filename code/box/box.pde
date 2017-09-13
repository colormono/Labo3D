import nervoussystem.obj.*;

boolean record;

int cubos = 120;

void setup() {
  size(800,800,P3D);
}

void draw() {
  background(0);
  
  if (record) {
    beginRecord("nervoussystem.obj.OBJExport", "filename.obj");
  }
  
  
  fill(255);
  for(int x=0; x<cubos; x++){
    pushMatrix();
    translate( random(width), random(height), random(width) );
    box(100,100,100);
    popMatrix();
  }
  
  
  if (record) {
    endRecord();
    record = false;
  }
}

void keyPressed(){
  if (key == 'r') {
    record = true;
  }
}