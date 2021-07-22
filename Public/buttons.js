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
		console.log(scale)
			switch(this.mod)
			{
				case 1:
				this.img=moduleImg[5]
				break
					
				case 2:
				this.img=moduleImg[4]
				break
					
				case 3:
				this.img=moduleImg[3]
				break
					
				case 4:
				this.img=moduleImg[2]
				break
					
				case 5:
				this.img=moduleImg[1]
				break
					
				case 6:
				this.img=moduleImg[6]
				break
					
				case 7:
				this.img=moduleImg[7]
				break
					
				case 8:
				this.img=moduleImg[8]
				break
					
				case 9:
				this.img=moduleImg[9]
				break
					
				case 10:
				this.img=moduleImg[10]
				break
			}
			if (scale == true)
			{
		  		this.img.resize(64,64)
		  		//this.img.tint("white")
		  		console.log(this.img)
				scale = false
				console.log(scale)
			}
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
	  tint(this.r+200, this.g, this.b-100, 200)
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
		  tint(0,100,225)
		  image(this.img,this.x,this.y)
		}
		if (gameState == 2 && this.bType == 5)
		{
		  textAlign(LEFT,CENTER)
		  fill(0,150,250)
		  rect(this.x + this.w - this.w/4.5,this.y,width/35,height/17.5,15)
		  fill("white")
		  tint(0,100,225)
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


