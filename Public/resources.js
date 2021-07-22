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
	  this.img.resize(32,32)
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

