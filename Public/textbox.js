class textBox{

    constructor(x,y,width,height){
		
    this.x = x;
    this.y = y;
	this.wi = width;
	this.he = height;
	
    }
	playerDraw()
	{
		let playerName
		
		loadJSON('/getPlayerName/'+playerId,(dataReceived)=>
		{
			push()
			//player profile
			playerName = dataReceived
			fill("black")
			rectMode(CENTER)
			textAlign(CENTER,CENTER)
			rect(this.x,this.y,this.wi,this.he)
			//image placeholder
			//rect(this.x ,this.y + this.he * 2.5, this.wi * 2,this.he * 5)
			rectMode(CORNER)
			fill("white")
			text(playerName[0].name,this.x,this.y)
			pop()
		})
	}
	friendsContainer()
	{
		//friends
		fill("black")
		//friends container
		fill(0,0,150)
		rect(this.x, this.y + height / 10,this.wi,this.he)
	}
}