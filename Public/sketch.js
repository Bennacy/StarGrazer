let addBtn
let cv
let playerCard
let playerArr=[]
let grid=[]
let value=0
let gridSize=15
let totalPlayer
let squareCycle

function setup() {
  playerCard=''
  totalPlayer=4
  squareCycle=1
  cv=createCanvas(720, 720);
  cv.position(windowWidth/2-width/2, windowHeight/2-height/2)
  // addBtn= new Button(0,0, 100,50, 210,50,120, addStuff, 'Increase')

  for(let i=0; i<width/gridSize; i++){
    grid[i]=[]
    for(let j=0; j<height/gridSize; j++){
      grid[i][j]= new Grid(i,j)
      grid[i][j].draw_grid()
    }
  }
  push()
    strokeWeight(3)
    stroke('red')

    line(width/2 - 1*gridSize, height/2 - 1*gridSize, width/2 - 1*gridSize, height/2 + 1*gridSize)
    line(width/2 - 1*gridSize, height/2 - 1*gridSize, width/2 + 1*gridSize, height/2 - 1*gridSize)

    line(width/2 + 1*gridSize, height/2 - 1*gridSize, width/2 + 1*gridSize, height/2 + 1*gridSize)
    line(width/2 + 1*gridSize, height/2 + 1*gridSize, width/2 - 1*gridSize, height/2 + 1*gridSize)
  pop()
}

function draw() {
  // addBtn.mouse_over()
  // addBtn.draw_button()

  if(playerCard!=''){
    playerCard.visitBtn.mouse_over()
    playerCard.visitBtn.draw_button()
  }


}

function keyPressed(){
  switch (keyCode) {
    case (81):
      playerArr=[]
      clear()
      setup()
      for(let i=0; i<width/gridSize*2-4; i++)
        setTimeout(function(){
          addStuff()
        }, 250)
        
      break;

    case 69:
      playerArr=[]
      clear()
      setup()
      break

    case 87:
      addStuff()
      break
  }
}

function mousePressed(){
  // if(addBtn.mouse_over()){
  //   addBtn.mouse_pressed()
  // }

  for(let i=0; i<playerArr.length; i++){
    if(playerArr[i].mouse_over() && playerCard==''){
      playerArr[i].mouse_pressed()
    }
  }
  
  if(playerCard!=''){
    
    if(playerCard.visitBtn.mouse_over()){
      playerCard.visitBtn.mouse_pressed()
    }

    playerCard.over_x()
  }
}

function addStuff(){
  totalPlayer++

  // let pX= (value % (width/gridSize))
  // let pY= Math.floor(value / (width/gridSize))

  if(Math.ceil(totalPlayer/4)>squareCycle)
  {
    squareCycle++
    push()
      strokeWeight(2)
      stroke('red')

      // line(width/2 - Math.ceil(totalPlayer/4)*gridSize, height/2 - Math.ceil(totalPlayer/4)*gridSize, width/2 - Math.ceil(totalPlayer/4)*gridSize, height/2 + Math.ceil(totalPlayer/4)*gridSize)
      // line(width/2 - Math.ceil(totalPlayer/4)*gridSize, height/2 - Math.ceil(totalPlayer/4)*gridSize, width/2 + Math.ceil(totalPlayer/4)*gridSize, height/2 - Math.ceil(totalPlayer/4)*gridSize)

      // line(width/2 + Math.ceil(totalPlayer/4)*gridSize, height/2 - Math.ceil(totalPlayer/4)*gridSize, width/2 + Math.ceil(totalPlayer/4)*gridSize, height/2 + Math.ceil(totalPlayer/4)*gridSize)
      // line(width/2 + Math.ceil(totalPlayer/4)*gridSize, height/2 + Math.ceil(totalPlayer/4)*gridSize, width/2 - Math.ceil(totalPlayer/4)*gridSize, height/2 + Math.ceil(totalPlayer/4)*gridSize)
    pop()
}

  placeNew()

  playerArr[totalPlayer-5].draw_player()
}

function placeNew(){
  let sideVar= totalPlayer%4
  let placeVar

  switch (sideVar) {
    case 1:
      placeVar=(width/2 - Math.ceil(totalPlayer/4)*gridSize)+(gridSize*int(random(squareCycle*2-1, 1)))
      playerArr.push(new Player(placeVar, height/2 - Math.ceil(totalPlayer/4)*gridSize, sideVar))
      break;
    
    case 2:
      placeVar=(height/2 - Math.ceil(totalPlayer/4)*gridSize)+(gridSize*int(random(squareCycle*2-1, 1)))
      playerArr.push(new Player(width/2 + Math.ceil(totalPlayer/4)*gridSize -gridSize, placeVar, sideVar))
      break;
    
    case 3:
      placeVar=(width/2 - Math.ceil(totalPlayer/4)*gridSize)+(gridSize*int(random(squareCycle*2-1, 1)))
      playerArr.push(new Player(placeVar, height/2 + Math.ceil(totalPlayer/4)*gridSize -gridSize, sideVar))
      break;

    case 0:
      placeVar=(height/2 - Math.ceil(totalPlayer/4)*gridSize)+(gridSize*int(random(squareCycle*2-1, 1)))
      playerArr.push(new Player(width/2 - Math.ceil(totalPlayer/4)*gridSize, placeVar, sideVar))
      break;
  }
}

function visitPlayer(){
  print('Visiting')
}









class Grid{
  constructor(x,y){
    this.x=x
    this.y=y
  }
  draw_grid(){
    rect(this.x*gridSize,this.y*gridSize, gridSize,gridSize)
  }
}


class Player{
  constructor(x,y, side){
    this.x=x
    this.y=y
    switch(side){
      case 0:
        this.side='Left'
        break

      case 1:
        this.side='Up'
        break

      case 2:
        this.side='Right'
        break

      case 3:
        this.side='Down'
        break
    }
    this.id=playerArr.length
    this.test=side
  }

  draw_player(){
    push()
      fill("purple")
      strokeWeight(1)
      rect(this.x,this.y, gridSize,gridSize)
    pop()
  }

  mouse_over(){
    if(mouseX>this.x&&mouseX<this.x+gridSize && mouseY>this.y&&mouseY<this.y+gridSize){
      return true
    }else{
      return false
    }
  }

  mouse_pressed(){
    // rect(this.x,this.y,200,300)
    playerCard=new PlayerCard(this.x,this.y,this.id)

    playerCard.draw_card()
    playerCard.draw_x()
  }
}


class PlayerCard{
  constructor(x,y,pId){
    this.x=x
    this.y=y
    this.w=200
    this.h=300
    this.pId=pId
    
    if(this.x+this.w>width){
      this.x=this.x-this.w
    }
    if(this.y+this.h>height){
      this.y=this.y-this.h
    }

    this.visitBtn= new Button(this.x+15,this.y+this.h-65, this.w-30,50, 190,190,190, visitPlayer, 'Visit')
  }

  draw_card(){    
    rect(this.x,this.y,this.w,this.h)
    push()
      fill(0)
      textAlign(CENTER, CENTER)
      textSize(30)
      strokeWeight(3)
      text('Player '+(this.pId+1),this.x+this.w/2,this.y+this.h/2)
    pop()
  }

  draw_x(){
    push()
      fill(255,0,0)
      rect(this.x+(this.w-25),this.y, 25,25)
      strokeWeight(3)
      stroke(170,0,0)
      fill(170,0,0)
      textSize(20)
      textAlign(CENTER, CENTER)
      text('X',(this.x+(this.w-25))+25/2,this.y+28/2)
    pop()
  }

  over_x(){
    if(mouseX>this.x+(this.w-25)&&mouseX<this.x+this.w && mouseY>this.y&&mouseY<this.y+25){
      setup()
      for(let i=0; i<playerArr.length; i++){
        playerArr[i].draw_player()
      }
    }
  }
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

    this.text=text

  }

  draw_button(){
    push()
      fill(this.r,this.g,this.b)
      strokeWeight(1.5)
      textAlign(CENTER, CENTER)
      rect(this.x,this.y,this.w,this.h)
      fill("black")
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

      this.func(index)
  }
}