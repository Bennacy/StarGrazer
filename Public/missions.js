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





