class Resources{

  constructor(x, y, size, resourceType, currentAmount, maxAmount, inUse){
  
    this.x = x;
    this.y = y;
    this.sz = size;
    this.resType = resourceType;
    this.currAmount = currentAmount;
    this.maxAmount = maxAmount;
    this.inUse = inUse;
    this.resourceName
    this.resourceButton
    this.img

    switch(this.resType){
      case 1:
        this.img=moneyImg
        break
      
      case 2:
        this.img=crewImg
        break
      
      case 3:
        this.img=matImg
        break
      
      case 4:
        this.img=shipImg
        break
    }
    this.img.resize(0,height/15-height/60)
  }
  
  
  draw_resource(x,y,w,h){
    push()
      textAlign(CENTER,CENTER)
      textSize(17)
      textFont(font)
      fill(255,255,255)
      if(this.resType==1){
        text(this.currAmount, x, y, w, h)
      }else{
        text(this.currAmount+'/'+this.maxAmount, x, y, w, h)
      }
	  fill(0, 100, 255,100)
	  rect(x, y, w, h)
	  fill(0, 100, 200,200)
	  rect(x+width/100,y+height/200, width/35,height/17.5)
      image(this.img,x+width/80,y+height/120)
    pop()
  }
  
  change_value(op, value){      
    if(op==1){
      if(this.currAmount<this.maxAmount){
        if (value<1)
          this.currAmount+=1
        else
          this.currAmount+=value
          
        if(this.currAmount>this.maxAmount)
        this.currAmount=this.maxAmount
      }
      else if(this.currAmount>this.maxAmount)
        this.currAmount=this.maxAmount

        let dataToSend={
          "playerId": playerId,
          "resourceType": this.resType,
          "newValue": this.currAmount
        }
        httpPost('/updateResourceValues', 'json', dataToSend, (dataReceived)=>{
          
          drawR()
        })

    }else if(op==-1){
      if(this.currAmount-value>=0){
        this.currAmount-=value
      }
      let dataToSend={
        "playerId": playerId,
        "resourceType": this.resType,
        "newValue": this.currAmount
      }
      httpPost('/updateResourceValues', 'json', dataToSend, (dataReceived)=>{
      
        drawR()
      })
    }
  }

  change_inUse(op, value){      
    if(op==1){
      if(this.currAmount-(this.inUse+value)>0){
          this.inUse+=value
      }

      let dataToSend={
        "playerId": playerId,
        "resourceType": this.resType,
        "inUse":this.inUse
      }
      httpPost('/updateInUse', 'json', dataToSend, (dataReceived)=>{
        
      })

  }else if(op==-1){
      this.inUse-=value
      console.log(value)

      let dataToSend={
        "playerId": playerId,
        "resourceType": this.resType,
        "inUse":this.inUse
      }
      httpPost('/updateInUse', 'json', dataToSend, (dataReceived)=>{
        drawR()
      })
    }
  }
}


class Mission{
  constructor(mI, id, missionResource, reward, duration, successChance, missionType, state, startD, startH, startM){
		this.mI=mI
		this.id=id
		this.x
		this.y
		this.w
		this.h
		this.missionResource= missionResource
		this.reward= reward
		this.duration= duration
		this.successChance= successChance
		this.failTime= 0
		this.missionType= missionType
		this.state=state
		this.button
		this.drawn=false
		this.button

		this.timePassed
		this.timeRemaining
		
		this.startDay=startD
		this.startHour=startH
		this.StartMin=startM

		if(this.missionResource==3){
				this.reward= int(1.2*this.reward)
		}
		
		let sId=this.id
		if(this.state==2){
			this.timePassed=minute()-this.StartMin + (hour()-this.startHour)*60 + (day()-this.startDay)*24*60
			this.timeRemaining=(this.duration - this.timePassed)

			if(this.timeRemaining>0){ // if there is still time until the mission is done
				setTimeout(function(){
					for(let i=0; i<mission.length; i++){
						if(mission[i].id==sId){
							mission[i].state=5
						}
					}
				},this.timeRemaining*1000*timeScale)
			}else{ // if the mission is complete but wasnt updated
				setTimeout(function(){
					for(let i=0; i<mission.length; i++){
						if(mission[i].id==sId){
							mission[i].state=5
						}
					}
				},250)
			}
		}else if(this.state==6){ // if there is still time until the mission is failed
			this.timePassed=minute()-this.StartMin + (hour()-this.startHour)*60 + (day()-this.startDay)*24*60
			this.timeRemaining=(this.failTime - this.timePassed)

			if(this.timeRemaining>0){
				setTimeout(function(){
					for(let i=0; i<mission.length; i++){
						if(mission[i].id==sId){
							mission[i].state=4
						}
					}
				},this.failTime*1000*timeScale) 
			}else{ // if the mission is failed but wasnt updated
				setTimeout(function(){
					for(let i=0; i<mission.length; i++){
						if(mission[i].id==sId){
							mission[i].state=4
						}
					}
				},250)
			}
		}
	}

  draw_mission(){
    let length

    if(this.missionType==1)
      length= 'Short'
    else if(this.missionType==2)
      length= 'Medium'
    else
      length= 'Long'
    
    push()
      textFont(font)

      textSize(30)
      textAlign(LEFT, TOP)
      fill(0)
      text('\t'+length+' Mission', this.x+this.w/20, this.y+this.h/10)


      textSize(20)
      textAlign(CENTER,BOTTOM)
      text('Reward: '+this.reward+'\tDuration: '+this.duration+' minutes\nChance of success: '+this.successChance+'%', this.x, this.y-this.h/20, this.w, this.h)
    pop()
  }
}



class Button{
  constructor(x, y, w, h, r, g, b, func, text,textS, bType, cSide,modType){
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
    this.mod = modType
	this.img
    this.text=text
    this.textS=textS
    this.cSide=cSide
	
	if (gameState == 2)
	{
			switch(this.mod)
			{
				case 1:
				this.img=shipImg
				break
				
				case 2:
				this.img=shipImg
				break
				
				case 3:
				this.img=matImg
				break
				
				case 4:
				this.img=crewImg
				break
				
				case 5:
				this.img=moneyImg
				break
				
				case 6:
				this.img=commRelay
				break
				
				case 7:
				this.img=techStation
				break
				
				case 8:
				this.img=missionCtrl
				break
				
				case 9:
				this.img=probeConst
				break
				
				case 10:
				this.img=baseConn
				break
			}
		this.img.resize(0,height/15-height/60)
		console.log(this.img)
	}
	
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
        this.highlight2=0

        break

      case 2:
        this.clickDepth=5
        this.strkWeight=3
        this.clickStroke=0
        this.stkDiff=30

        this.upL=35
        this.upR=5
        this.dnL=5
        this.dnR=35

        this.highlight1=10
        this.highlight2=30
        break

      case 3:
        this.clickDepth=2
        this.strkWeight=3
        this.clickStroke=1
        this.stkDiff=20

        this.upL=10000
        this.upR=10000
        this.dnL=10000
        this.dnR=10000

        this.highlight1=-15
        this.highlight2=10
        break

      case 4:
        this.clickDepth=3
        this.strkWeight=5
        this.clickStroke=1
        this.stkDiff=20
		
	  case 5:
        this.clickDepth=2
        this.strkWeight=2
        this.clickStroke=0
        this.stkDiff=-255

        this.upL=10
        this.upR=10
        this.dnL=10
        this.dnR=10

        this.highlight1=-10
        this.highlight2=0
		break;

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

          default:
              this.upL=50
              this.upR=5
              this.dnL=5
              this.dnR=5

        }

        this.highlight1=10
        this.highlight2=25
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
      textSize(this.textS)
	  fill("black")
	  textAlign(CENTER, CENTER)
	  if (gameState == 2 && this.bType == 1)
	  {
		textAlign(RIGHT,CENTER)
		fill(0,150,250)
		rect(this.x,this.y,width/35,height/17.5,15)
		fill("white")
		image(this.img,this.x,this.y)
	  }
	  if (gameState == 2 && this.bType == 5)
	  {
		textAlign(LEFT,CENTER)
		fill(0,150,250)
		rect(this.x + this.w - this.w/4.5,this.y,width/35,height/17.5,15)
		fill("white")
		image(this.img,this.x + this.w - this.w/5,this.y)
	  }
      text(this.text, this.x, this.y, this.w, this.h)
    pop()
  }

  mouse_over(){
    if(mouseX>this.x&&mouseX<this.x+this.w && mouseY>this.y&&mouseY<this.y+this.h){
      if(this.pressed==false){
        this.r=this.origR-this.highlight1
        this.g=this.origG-this.highlight1
        this.b=this.origB-this.highlight1
      }
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
  }
  
  mouse_released(param1,param2){
    
    clickSound.play()
    this.func(param1,param2)
    this.pressed=false
    this.strkWeight=this.strkSave
    this.y-=this.clickDepth
  }
}





class Module {

  constructor(i, j, x, y, side, moduleType, del, gLevel){
    //indexes of 2Darray
    this.i=i;
    this.j=j;
    //canvas positions
    this.posX = x;
    this.posY = y;
    this.sd = side;
    this.r
    this.g
    this.b
    this.alpha
    this.moduleType=moduleType;
    this.deleted = del;
    this.gLevel=gLevel
  }

  draw_Module() {

    switch(this.moduleType){
      case 0: // Empty Space
        this.r=219
        this.g=219
        this.b=219
        this.alpha=125
        break
      
      case 1: // Money Production
        this.r=255
        this.g=228
        this.b=41
        this.alpha=255
        break
      
      case 2: // Crew Capacity
        this.r=197
        this.g=97
        this.b=0
        this.alpha=255
        break
      
      case 3: // Material Capacity
        this.r=61
        this.g=60
        this.b=214
        this.alpha=255
        break
      
      case 4: // Ship Capacity
        this.r=26
        this.g=87
        this.b=7
        this.alpha=255
        break
      
      case 5: // Ship Construction
        this.r=179
        this.g=156
        this.b=0
        this.alpha=255
        break
      
      case 6: // Communications Relay
        this.r=0
        this.g=255
        this.b=110
        this.alpha=255
        break
      
      case 7: // Research Station
        this.r=158
        this.g=56
        this.b=255
        this.alpha=255
        break
      
      case 8: // Mission Control
        this.r=71
        this.g=196
        this.b=255
        this.alpha=255
        break
      
      case 9: // Probe Constructor
        this.r=73
        this.g=97
        this.b=72
        this.alpha=255
        break
      
      case 10: // Connectors
        this.r=85
        this.g=85
        this.b=85
        this.alpha=255
        break
      
      case 11: // Starter Module
        this.r=87
        this.g=9
        this.b=9
        this.alpha=255
        break
    }
	push()
    if(gameState==2)
      stroke(200)
    else
      noStroke()

    if(this.deleted==0 && this.moduleType!=0){
      fill(this.r,this.g,this.b,this.alpha)
      square(this.posX, this.posY, this.sd,5);
    }else{
      fill(219,219,219,125)
      square(this.posX, this.posY, this.sd);
    }
    
    if(typeof(moduleImg[this.moduleType])!= 'undefined' && this.deleted==0){
      moduleImg[this.moduleType].resize(side-4,0)
      image(moduleImg[this.moduleType], this.posX+2,this.posY+2)
    }
	pop()
  } 

  is_over(mousex,mousey){
    if(mousex>this.posX && mousex<this.posX+this.sd && mousey>this.posY && mousey<this.posY+this.sd){
      return true;
    }else{
      return false;
    }
    
  }
  
}


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