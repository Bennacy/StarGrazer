class Button{
  constructor(x, y, w, h, r, g, b, func, text,round){
    this.x=x
    this.y=y
	this.textX = x
	this.textY = y
    this.w=w
    this.h=h
	this.r=round
    this.func=func
    
    this.origR=r
    this.origG=g
    this.origB=b
    this.r=this.origR
    this.g=this.origG
    this.b=this.origB
	
    this.text=text
    this.active
  }
  draw_button(){
    push()
      fill(this.r,this.g,this.b)
      strokeWeight(1.5)
      textAlign(CENTER, CENTER)
      rect(this.x,this.y,this.w,this.h,15)
      fill("white")
      text(this.text, this.x+this.w/2, this.y+this.h/2)
    pop()
  }
  onClickSearch()
  {
	let search
	let allPlayers
	
	searchPlayer = createInput('enter a username')
	
	searchPlayer.position(this.x-width/10,this.y + height / 10)
	searchPlayer.size(width/10,height/40)
  }
  addPlayer()
	{
		let friend
		let pName
		let friendRequest
		let allPlayers
		loadJSON('/getPlayerName/'+playerId,(nameReceived)=>
		{
			pName = nameReceived
		
			loadJSON('/getFriendList',(reqReceived)=>
			{
				friendRequest = reqReceived
			
				loadJSON('/getPlayerList/'+playerId,(pNamesReceived)=>
				{
					allPlayers = pNamesReceived
						
					console.log(pName[0].name)
					for (let p=0; p<allPlayers.length; p++)
					{
						if (searchPlayer.value() == allPlayers[p].name)
						{
							//0 is default, 1 is true, 2 is false
							friend = {
								"requestFrom": pName[0].name,
								"requestTo": searchPlayer.value(),
								"accepted": "0",
							}
							httpPost('/sendFriendReq/','json',friend,(dataReceived)=>
							{
							
							}) 
						} 
					}		
				})
			})
		})
	}
	//display the list of pending requests
	displayRequest()
	{
		let pName
		let friendRequest
		
		loadJSON('/getPlayerName/'+playerId,(nameReceived)=>
		{
			pName = nameReceived
		
			loadJSON('/getFriendList',(reqReceived)=>
			{
				friendRequest = reqReceived
			
				for (let p=0; p<friendRequest.length; p++)
				{
					if(friendRequest[p].requestTo == pName[0].name && friendRequest[p].accepted == 0)
					{	
						//show my requests
						fill("white")
						text(friendRequest[p].requestFrom,this.x,this.y + (height/20 * p) + height/7)
					}
				}
			}) 
		})
	}
	//displays the list of players the user has added.
	allPlayers()
	{
		let pName
		let friendRequest
		loadJSON('/getPlayerName/'+playerId,(nameReceived)=>
		{
			pName = nameReceived
		
			loadJSON('/getFriendList',(reqReceived)=>
			{
				friendRequest = reqReceived
			
				for (let p=0; p<friendRequest.length;p++)
				{
					if (friendRequest[p].accepted == 1 && friendRequest[p].requestTo == pName[0].name)
					{	
						//show my friends
						fill("white")
						text(friendRequest[p].requestFrom,this.x,this.y + (height/10 * p) + height/7)
					}	
				}
			})
		}) 
	}
			
  mouseWheeling(event)
	{
	 /*  if(this.textY>this.y-height/6)
	  {
		console.log(event.delta)
		this.textY += event.delta;
	  } */
	}
  mouse_over(){
    if(mouseX>this.x&&mouseX<this.x+this.w && mouseY>this.y&&mouseY<this.y+this.h){
      this.r=this.origR+20
      this.g=this.origG+20
      this.b=this.origB+20
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

