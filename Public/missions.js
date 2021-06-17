class Mission{
  constructor(id, missionResource, reward, duration, successChance, missionType, state, x, y, w, h){
      this.id=id
      this.x=x
      this.y=y
      this.w=w
      this.h=h
      this.missionResource= missionResource
      this.reward= reward
      this.duration= duration
      this.successChance= successChance
      this.failTime= 0
      this.missionType= missionType
      this.state=state
      this.button
      if(this.missionResource==3){
          this.reward= int(1.2*this.reward)
      }
  }

  draw_mission(){
    loadJSON('/getResourceNames/'+this.missionResource, (dataReceived)=>{
      push()
        if(this.state==1){
          fill("black")
        }else if(this.state==2 || this.state==6){
          fill("blue")
        }else if(this.state==5){
          fill("green")
        }else if(this.state==4){
          fill("red")
        }
        text('Resource: '+ this.missionResource+' Type: '+this.missionType, this.x,this.y-10)
        text('Resource: '+dataReceived[0].resourceName+'; Reward: '+this.reward+'; Duration: '+this.duration+' minutes; Chance of success: '+this.successChance+'%', this.x, this.y)
      pop()
    });
  }

  start_mission(index){
		if(mission[index].state==1 && resource[3].currAmount-resource[3].inUse<=0){
			push()
				fill("red")
				textSize(15)
				textAlign(CENTER,BOTTOM)
				text("No available ships",mission[index].x,mission[index].y-17.5)
			pop()

			setTimeout(function(){
				clearScreen()
				background(250)
				drawR()
				refreshM()
			},1000)
		}

    if(mission[index].state==1 && resource[3].currAmount-resource[3].inUse>0){

      changeAvailableShips("decrease",1)
      let roll=random(100,0)
      // console.log(roll)
      let missionTime=0
      let failing=false
      mission[index].failTime=int(random(mission[index].duration/2, mission[index].duration/3))

      if(roll<=mission[index].successChance){
        missionTime=mission[index].duration
      }else{
        missionTime=mission[index].failTime
        failing=true
      }

      let dataToSend={
        "playerId": playerId,
        "mission": mission[index],
        "day":day(),
        "hour":hour(),
        "minute":minute(),
        "time":missionTime,
        "inUse": resource[3].inUse
      }
    
      httpPost('/startMission','JSON',dataToSend,(dataReceived)=>{
        if(failing==false){
          mission[index].state=2
          missionButton[index].text= 'Ongoing'
					if(gameState==3){
	          refreshM()
					}

          setTimeout(function(){
						missionButton[index].text='Collect'
            mission[index].state=5
  
            if(gameState==3){
							refreshM()
						}
          }, missionTime*1000*timeScale)
        }
        else{
          mission[index].state=6
          missionButton[index].text= 'Ongoing'
          if(gameState==3){
	          refreshM()
					}

          setTimeout(function(){
						missionButton[index].text='Mission Failed'
            mission[index].state=4
  
            if(gameState==3){
							refreshM()
						}
          },missionTime*1000*timeScale)
        }


        if(gameState==3){
					refreshM()
				}
      })
    }
    else if(mission[index].state==5){
      missionButton[index].text='Collect'
            
      missionButton[index].func=function(){
        changeAvailableShips("increase",1)

				let dataToSend={
					"playerId":playerId,
					"inUse":resource[3].inUse,
					"resourceType":resource[3].resType
				}
				httpPost('/updateInUse','JSON',dataToSend,(dataReceived)=>{
					resource[mission[index].missionResource-1].change_value(1,mission[index].reward)
					discardMission(mission[index].missionResource, mission[index].missionType)
				})
      }
    }
		else if(mission[index].state==4){
        missionButton[index].text='Mission Failed'
        
        missionButton[index].func=function(){
          resource[3].change_value(-1,1)
					changeAvailableShips("increase",1)

					let dataToSend={
						"playerId":playerId,
						"inUse":resource[3].inUse,
						"resourceType":resource[3].resType
					}
					httpPost('/updateInUse','JSON',dataToSend,(dataReceived)=>{

						discardMission(mission[index].missionResource, mission[index].missionType)
					})
        }
			}
  }
}




