class Module {

  constructor(i, j, x, y, side, moduleType, del) {
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
    this.moduleType=moduleType;
    this.deleted = del;
  }

  draw_Module() {

    switch(this.moduleType){
      case 0: // Empty Space
        this.r=219
        this.g=219
        this.b=219
        break
      
      case 1: // Money Production
        this.r=255
        this.g=228
        this.b=41
        break
      
      case 2: // Crew Capacity
        this.r=197
        this.g=97
        this.b=0
        break
      
      case 3: // Material Capacity
        this.r=61
        this.g=60
        this.b=214
        break
      
      case 4: // Ship Capacity
        this.r=26
        this.g=87
        this.b=7
        break
      
      case 5: // Ship Construction
        this.r=179
        this.g=156
        this.b=0
        break
      
      case 6: // Communications Relay
        this.r=0
        this.g=255
        this.b=110
        break
      
      case 7: // Research Station
        this.r=158
        this.g=56
        this.b=255
        break
      
      case 8: // Mission Control
        this.r=71
        this.g=196
        this.b=255
        break
      
      case 9: // Probe Constructor
        this.r=73
        this.g=97
        this.b=72
        break
      
      case 10: // Connectors
        this.r=100
        this.g=100
        this.b=100
        break
      
      case 11: // Starter Module
        this.r=87
        this.g=9
        this.b=9
        break
    }

    if(this.deleted==0){
      fill(this.r,this.g,this.b)
      square(this.posX, this.posY, this.sd);
    }else{
      fill(219,219,219)
      square(this.posX, this.posY, this.sd);
    }
  } 

  is_over(mousex,mousey){
    if(mousex>this.posX && mousex<this.posX+this.sd && mousey>this.posY && mousey<this.posY+this.sd){
      return true;
    }else{
      return false;
    }
    
  }
  
}