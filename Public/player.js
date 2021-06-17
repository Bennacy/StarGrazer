class Player{

    constructor(x,y,width,height){
		
    this.x = x;
    this.y = y;
	this.wi = width;
	this.he = height;
	
    }
	player_draw()
	{
		let playerName
		
		loadJSON('/getPlayerName/'+playerId,(dataReceived)=>
		{
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
		})
	}
}