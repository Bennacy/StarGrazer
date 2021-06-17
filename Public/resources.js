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
					drawR()
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
  
  
    draw_resource(x,y){
      push()
        fill(0);
    
        let rType= this.resType
        loadJSON('/getResourceNames/'+rType, (dataReceived)=>{
          fill("black")
          this.resourceName= dataReceived[0].resourceName
          if(this.resType==4 || this.resType==2){
            let av= this.currAmount-this.inUse
            text(this.resourceName+': '+this.currAmount+'/'+this.maxAmount, x, y-10)
            text("Available: "+av, x, y+10)
          }
          else if(this.resType==3){
            text(this.resourceName+': '+this.currAmount+'/'+this.maxAmount, x, y)
          }else if(this.resType==1){
            text(this.resourceName+': '+this.currAmount, x, y)
          }
        });
      pop()
    }
}


