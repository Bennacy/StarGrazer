class PlayerCard{
    constructor(x,y,pSize,pId,gLevel){
      this.x=x
      this.y=y
      this.w=200
      this.h=300
      this.pSize=pSize
      this.xSize=25
      this.pId=pId
      this.gLevel=gLevel
      this.lineX1=this.x+this.pSize/2
      this.lineX2
      this.lineY1=this.y+this.pSize/2
      this.lineY2
  
      this.playerInfo
      
      loadJSON('/getUserInfo/'+this.pId,(dataReceived)=>{
        this.playerInfo=dataReceived.name
      })
      
      if(this.x+this.w+200>width){
        this.x-=this.w
        this.x-=200
  
        this.lineX2= this.x+this.w-5
      }else{
        this.x+=200
  
        this.lineX2= this.x+5
      }
      if(this.y+this.h+50>height){
        this.y-=this.h
        this.y-=50
        
        if(this.y<displayArea.topY){
          this.y=displayArea.topY
        }
        this.lineY2= this.y+this.h-5
  
      }else{
        this.y+=50
  
        if(this.y+this.h>displayArea.bottomY){
          this.y=displayArea.bottomY-this.h
        }
  
        this.lineY2= this.y+5
      }
  
      this.vstCard={
        'x':this.x+15,
        'y':this.y+this.h-65,
        'w':this.w-30,
        'h':50
      }
      this.frdCard={
        'x':this.x+15,
        'y':this.y+this.h-130,
        'w':this.w-30,
        'h':50
      }
  
      if(playerId!=this.pId){
        this.visitBtn= new Button(this.vstCard.x,this.vstCard.y, this.vstCard.w,this.vstCard.h, 0,130,255, visitPlayer, 'Visit',15,3)
        this.friendBtn= new Button(this.frdCard.x,this.frdCard.y, this.frdCard.w,this.frdCard.h, 0,130,255, sendRequest, 'Add friend',15,3)
      }
    }
  
    draw_card(){
        push()
          strokeWeight(6)
          stroke(255,0,0,100)
          line(this.lineX1,this.lineY1,this.lineX2,this.lineY2)
          strokeWeight(2)
          stroke(255,0,0,200)
          line(this.lineX1,this.lineY1,this.lineX2,this.lineY2)
  
          stroke(0)
          strokeWeight(1)
          //friend add background
          fill(0, 100, 255,100)
          rect(this.x,this.y,this.w,this.h,25)
  
          fill(0, 100, 255,150)
          rect(this.x,this.y, this.w-this.xSize, this.xSize,25,0,0,0)
  
          fill(255, 255, 255)
          textAlign(CENTER,CENTER)
          textSize(20)
          text(this.playerInfo,this.x,this.y, this.w-this.xSize, this.xSize)
          pop()
      
          push()
          fill(255,0,0)
          rect(this.x+(this.w-this.xSize),this.y, this.xSize,this.xSize,0,25,0,0)
          strokeWeight(3)
          stroke(170,0,0)
          fill("red")
          textSize(20)
          textAlign(CENTER, CENTER)
          text('X',(this.x+(this.w-this.xSize))+this.xSize/2,this.y+28/2)
        pop()
    }
  
    over_x(){
      if(mouseX>this.x+(this.w-this.xSize)&&mouseX<this.x+this.w && mouseY>this.y&&mouseY<this.y+this.xSize){
        playerCard=''
      }
    }
  }
  
  
  
  
  
class Player{
    constructor(x,y,id,active,size,offsetX,offsetY){
      this.i=x
      this.j=y
      this.id=id
      this.active=active
      this.size=size
      this.x=this.i*size
      this.y=this.j*size
      this.offsetX=offsetX
      this.offsetY=offsetY
  
      this.x+=this.offsetX
      this.y+=this.offsetY
    }
  
    draw_player(){
      push()
        //
        if(this.active==1){
          noStroke()
          fill(210,0,0,50)
          circle(this.x+this.size/2, this.y+this.size/2, this.size)
          fill(210,0,0,100)
          circle(this.x+this.size/2, this.y+this.size/2, this.size-5)
          fill(210,0,0)
          circle(this.x+this.size/2, this.y+this.size/2, this.size-10)
        }else{
          noStroke()
          fill(100,100,100,50)
          circle(this.x+this.size/2, this.y+this.size/2, this.size)
          fill(100,100,100,100)
          circle(this.x+this.size/2, this.y+this.size/2, this.size-5)
          fill(100,100,100)
          circle(this.x+this.size/2, this.y+this.size/2, this.size-10)
        }
      pop()
    }
  
    mouse_over(){
      if(mouseX>this.x&&mouseX<this.x+this.size && mouseY>this.y&&mouseY<this.y+this.size){
        return true
      }else{
        return false
      }
    }
  
    mouse_pressed(){
  
      playerCard=new PlayerCard(this.x,this.y,this.size,this.id)
  
      playerCard.draw_card()
    }
}