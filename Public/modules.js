class Module {

  constructor(i, j, x, y, side, moduleType, del, gLevel){
    //indexes of 2Darray
    this.i=i;
    this.j=j;
    //canvas positions
    this.posX = x;
    this.posY = y;
    this.sd = side;
    this.r
    this.g
    this.b
    this.alpha
    this.moduleType=moduleType;
    this.deleted = del;
    this.gLevel=gLevel
  }

  draw_Module() {

    switch(this.moduleType){
      case 0: // Empty Space
        this.r=219
        this.g=219
        this.b=219
        this.alpha=125
        break
      
      case 1: // Money Production
      this.r=219
      this.g=219
      this.b=219
      this.alpha=125
        break
      
      case 2: // Crew Capacity
      this.r=219
      this.g=219
      this.b=219
      this.alpha=125
        break
      
      case 3: // Material Capacity
      this.r=219
      this.g=219
      this.b=219
      this.alpha=125
        break
      
      case 4: // Ship Capacity
      this.r=219
      this.g=219
      this.b=219
      this.alpha=125
        break
      
      case 5: // Ship Construction
      this.r=219
      this.g=219
      this.b=219
      this.alpha=125
        break
      
      case 6: // Communications Relay
      this.r=219
      this.g=219
      this.b=219
      this.alpha=125
        break
      
      case 7: // Research Station
      this.r=219
      this.g=219
      this.b=219
      this.alpha=125
        break
      
      case 8: // Mission Control
      this.r=219
      this.g=219
      this.b=219
      this.alpha=125
        break
      
      case 9: // Probe Constructor
      this.r=219
      this.g=219
      this.b=219
      this.alpha=125
        break
      
      case 10: // Connectors
      this.r=219
      this.g=219
      this.b=219
      this.alpha=125
        break
      
      case 11: // Starter Module
      this.r=219
      this.g=219
      this.b=219
      this.alpha=125
        break
    }
	push()
    if(gameState==2)
      stroke(200)
    else
      noStroke()

    if(this.deleted==0 && this.moduleType!=0){
      fill(this.r,this.g,this.b,this.alpha)
      square(this.posX, this.posY, this.sd,5);
    }else{
      fill(219,219,219,125)
      square(this.posX, this.posY, this.sd);
    }
    
    if(typeof(moduleImg[this.moduleType])!= 'undefined' && this.deleted==0){
      moduleImg[this.moduleType].resize(side-4,0)
      image(moduleImg[this.moduleType], this.posX+2,this.posY+2)
    }
	pop()
  } 

  is_over(mousex,mousey){
    if(mousex>this.posX && mousex<this.posX+this.sd && mousey>this.posY && mousey<this.posY+this.sd){
      return true;
    }else{
      return false;
    }
    
  }
  
}