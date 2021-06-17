let button

function setup() {
  cv=createCanvas(720, 720);
  cv.position(windowWidth/2-width/2, windowHeight/2-height/2)
  button= new Button(width/2-100,height/2-37.5, 200,75, 0,151,225, btn, 'Increase')
}


function draw() {
  background(230)

  button.mouse_over()
  button.draw_button()
}

function keyPressed(){
  
}

function mousePressed(){
  if(button.mouse_over()){
    button.mouse_pressed()
  }
}

function mouseReleased(){
  if(button.pressed==true){
    button.mouse_released()
  }
}

function btn(){
  print('Unnecessary function')
}





class Button{
  constructor(x, y, w, h, r, g, b, func, text){
    this.x=x
    this.y=y
    this.w=w
    this.h=h
    this.func=func
    
    this.origR=r
    this.origG=g
    this.origB=b
    this.r=this.origR
    this.g=this.origG
    this.b=this.origB

    this.pressed=false
    this.text=text
    this.strkWeight=5

  }

  draw_button(){
    push()
      fill(this.r,this.g,this.b)
      strokeWeight(this.strkWeight)
      stroke(this.r+40,this.g+40,this.b+40)
      textAlign(CENTER, CENTER)
      rect(this.x,this.y,this.w,this.h,20,5,20,5)
      fill("black")
      noStroke()
      text(this.text, this.x+this.w/2, this.y+this.h/2)
    pop()
  }

  mouse_over(){
    if(mouseX>this.x&&mouseX<this.x+this.w && mouseY>this.y&&mouseY<this.y+this.h){
      this.r=this.origR-20
      this.g=this.origG-20
      this.b=this.origB-20
      return true
    }else{
      this.r=this.origR
      this.g=this.origG
      this.b=this.origB
      return false
    }
  }

  mouse_pressed(index){
    this.y+=5
    this.pressed=true
    this.strkWeight=0
    this.func(index)
  }

  mouse_released(){
    this.pressed=false
    this.strkWeight=5
    this.y-=5
  }
}