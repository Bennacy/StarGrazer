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
	
	searchPlayer.position(this.x-width/10,this.y + height / 10) 
	//searchPlayer.input(addPlayer);
	
	loadJSON('/getPlayerList/:playerId',(dataReceived)=>
	{
		allPlayers = dataReceived
		//if searchPlayer.input == data
		//searchPlayer.input(addPlayer);
		/* if (mouseX > this.x + width/9)
		{
			for (let f = 0; f < allPlayers.length; f++)
			{
				text(allPlayers[f].name,this.textX,this.textY + 25 * f)
			}
		}	 */
	}) 
  }
  addPlayer()
  {
	  
  }
  mouseWheeling(event){
	  //if(this.textY>this.y-height/6)
	  //{
		console.log(event.delta)
		this.textY += event.delta;
	  //}
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




