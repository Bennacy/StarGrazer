class Button{
  constructor(x, y, w, h, r, g, b, func, text,array){
    this.x=x
    this.y=y
	this.textX = x
	this.textY = y
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
    this.active
	//this.array =  array
	/* let allPlayers
	loadJSON('/getPlayerList/:playerId',(dataReceived)=>
	{
		allPlayers = dataReceived
		//console.log(allPlayers)
	}) */
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

  onClickSearch()
  {
	let searchPlayer = createInput('enter a username')
	let allPlayers
	let pName
	let friend 
	
	searchPlayer.position(this.x-width/10,this.y + height / 10)
	
	function addPlayer()
	{
		loadJSON('/getPlayerName/'+playerId,(nameReceived)=>
		{
			pName = nameReceived
			console.log(pName)
			loadJSON('/getPlayerList/'+playerId,(pNamesReceived)=>
			{
				allPlayers = pNamesReceived
				
				console.log(pName[0].name)
				for (let p=0; p<allPlayers.length; p++)
				{
					if (searchPlayer.value() == allPlayers[p].name)
					{
						console.log("totsugeki")
						friend = {
							"requestFrom": pName[0].name,
							"requestTo": searchPlayer.value(),
							"accepted": false,
						}
						httpPost('/sendFriendReq/','json',friend,(dataReceived)=>
						{
							
						}) 
					} 
				}		
			})
		})
	}
	searchPlayer.input(addPlayer);
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




