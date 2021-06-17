let button=[]
let font
let pressing=false


function preload(){
  font=loadFont('Assets/AstroSpace-eZ2Bg.ttf')
}


function setup() {
  cv=createCanvas(850, 850);
  cv.position(windowWidth/2-width/2, windowHeight/2-height/2)
  button[0]= new Button(width/2-100,50, 300,100, 0,171,255, btn, 'Button', 1)
  button[1]= new Button(width/2-100,175, 300,100, 0,171,255, btn, 'Button', 2)
  button[2]= new Button(width/2-100,300, 300,100, 0,171,255, btn, 'Button', 3)

  button[3]= new Button(width/2-300,500, 100,100, 0,171,255, btn, 'Button', 4,1)
  button[4]= new Button(width/2-100,500, 100,100, 0,171,255, btn, 'Button', 4,2)
  button[5]= new Button(width/2-300,600, 100,100, 0,171,255, btn, 'Button', 4,3)
  button[6]= new Button(width/2-100,600, 100,100, 0,171,255, btn, 'Button', 4,4)

  button[7]= new Button(width/2-200,600, 100,100, 0,171,255, btn, 'Button', 4,5)
  button[8]= new Button(width/2-200,500, 100,100, 0,171,255, btn, 'Button', 4,5)
}


function draw() {
  background(230)

  for(let i=0; i<button.length; i++){
    button[i].mouse_over()
    button[i].draw_button()
  }
}

function keyPressed(){
  
}

function mousePressed(){

  for(let i=0; i<button.length; i++){
    if(button[i].mouse_over()){
      button[i].mouse_pressed()
    }
  }
}

function mouseReleased(){
  
  for(let i=0; i<button.length; i++){
    if(button[i].pressed==true){
      button[i].mouse_released(i)
    }
  }
}

function btn(){
  print('Unnecessary function')
}





class Button{
  constructor(x, y, w, h, r, g, b, func, text, bType, cSide){
    this.x=x
    this.y=y
    this.w=w
    this.h=h
    this.func=func
    this.bType=bType
    
    this.origR=r
    this.origG=g
    this.origB=b
    this.r=this.origR
    this.g=this.origG
    this.b=this.origB

    this.pressed=false
    this.text=text
    this.cSide=cSide

    switch(this.bType){
      case 1:
        this.clickDepth=2
        this.strkWeight=2
        this.clickStroke=0
        this.stkDiff=-255

        this.upL=10
        this.upR=10
        this.dnL=10
        this.dnR=10

        this.highlight1=-10
        this.highlight2=25

        break

      case 2:
        this.clickDepth=5
        this.strkWeight=5
        this.clickStroke=0
        this.stkDiff=20

        this.upL=35
        this.upR=5
        this.dnL=5
        this.dnR=35

        this.highlight1=10
        this.highlight2=30
        break

      case 3:
        this.clickDepth=10
        this.strkWeight=5
        this.clickStroke=1
        this.stkDiff=20

        this.upL=10000
        this.upR=10000
        this.dnL=10000
        this.dnR=10000

        this.highlight1
        this.highlight2
        break

      case 4:
        this.clickDepth=3
        this.strkWeight=5
        this.clickStroke=1
        this.stkDiff=20

        switch(this.cSide){ // Which side is slanted
          case 1: // top left
            this.upL=50
            this.upR=5
            this.dnL=5
            this.dnR=5
            break

          case 2: // top right
            this.upL=5
            this.upR=50
            this.dnL=5
            this.dnR=5
            break

          case 3: // bottom left
            this.upL=5
            this.upR=5
            this.dnL=50
            this.dnR=5
            break

          case 4: // bottom right
            this.upL=5
            this.upR=5
            this.dnL=5
            this.dnR=50
            break
            
          case 5: // none
            this.upL=5
            this.upR=5
            this.dnL=5
            this.dnR=5
            break
        }

        this.highlight1
        this.highlight2
        break
    }
    this.strkSave=this.strkWeight
  }

  draw_button(){
    push()
      strokeWeight(this.strkWeight)
      stroke(this.r+this.stkDiff, this.g+this.stkDiff, this.b+this.stkDiff)
      fill(this.r,this.g,this.b)
      rect(this.x,this.y,this.w,this.h, this.upL,this.upR,this.dnR,this.dnL)
      
      noStroke()
      textFont(font)
      fill("black")
      textSize(this.w/this.text.length)
      textAlign(CENTER, CENTER)
      text(this.text, this.x+this.w/2, this.y+this.h/2)
    pop()
  }

  mouse_over(){
    if(mouseX>this.x&&mouseX<this.x+this.w && mouseY>this.y&&mouseY<this.y+this.h && this.pressed==false && pressing==false){
      this.r=this.origR-this.highlight1
      this.g=this.origG-this.highlight1
      this.b=this.origB-this.highlight1
      return true
    }else if(this.pressed==false){
      this.r=this.origR
      this.g=this.origG
      this.b=this.origB
      return false
    }
  }

  mouse_pressed(){
    this.r=this.origR-this.highlight2
    this.g=this.origG-this.highlight2
    this.b=this.origB-this.highlight2
    this.y+=this.clickDepth
    this.pressed=true
    this.strkWeight=this.clickStroke
    pressing=true
  }

  mouse_released(index){
    this.pressed=false
    this.strkWeight=this.strkSave
    this.y-=this.clickDepth
    this.func(index)
    pressing=false
  }
}