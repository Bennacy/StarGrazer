let side = 52;
let deleted = 0;
let moduleType=0;
let probeBuildBar

let moneyToCollect
let mapGridSize
let mapSize
let gLevel
let totalPlayers
let missionSelect=2


let testImg
let font
let nullImg
let crewImg
let matImg
let moneyImg
let shipImg
let mapImg
let buildImg
let starsImg

let music
let clickSound



let displayArea={}
let researchText=''
let researchPoints
let playersResearching
let researchTCycle=0
let researchTCycleFunc=function(){}
let researchPointsFunc=function(){}
let galaxyResearchCount=[]

let timeScale=1 //speed(in seconds) at which things occur=> 1: one second; 60: one minute   ->!If switched here should be switched on the server side to match!<-

// Arrays initialization
let resource= [];
let mission= [];
let tempMission= [];
let missionButton= [];
let modules=[];
let moduleCost=[]
let crewCost=[]
let moduleName=[]
let placedModule=[]
let maxPlace=[]
let moduleBuildButton=[]
let arrtiles = [];
let playerMapArr=[];
let moduleImg=[]
let buildProbeB;

let playerId;
let galaxyId
let playerCard=''
let cv;
let mainSceneEnable = false;
let visiting
let resourceType;
let currentAmount;
let maxAmount;
let currMCost
let currCCost
let inUse;
let errMsg;
let registering
let firstLoad= true
let mainLoop= true
let visitedB=false
let pressing=false
let canCollect=false
let drawBar=false
let gridEnable=false;
let erasing= false;
let clearedErase=false
let buildingShip=false
let reloadMissions=false
let refreshM=false
let buildingProbe=false;
let probeBuilt=false;
let researching=false;
let updateR=false
let isFound=false
let shipBar=0

// Button initialization
let loginBtn
let registerBtn
let signupBtn
let registerBackBtn
let missionScreenB
let buildScreenB
let buildShipB
let collectMB
let profileButton
let logoffButton
let mapBtn
let advanceBtn


// Input initialization
let nameInput
let passInput
let suNameInput
let suPassInput

// Timers initialization (In seconds)
let mainLoopTimer= 60

let moneyTimer
let loopCounter= 0
let gameState=0




function preload(){
  for(let i=1; i<=10; i++){
    let modType=i
    loadJSON('/getMCost/'+modType,(dataReceived)=>{ // Old name, returns everything on the module table from the database
      moduleCost[i]=dataReceived[0].matCost
      moduleName[i]=dataReceived[0].moduleName
      maxPlace[i]=dataReceived[0].maxPlace
			crewCost[i]=dataReceived[0].crewCost
    })
  }

	loadJSON('/getResearching',(dataReceived)=>{

		for(let i=0; i<dataReceived.length; i++){
			galaxyResearchCount[i]={
				"researchingPlayers":dataReceived[i].researching,
				"galaxyId":dataReceived[i].galaxyId,
				"isFound":dataReceived[i].isFound,
				"currPoints":dataReceived[i].currPoints
			}
		}

		print(galaxyResearchCount)
	})

  crewImg= loadImage('Assets/Images/crew.png')
  shipImg= loadImage('Assets/Images/ship.png')
  matImg= loadImage('Assets/Images/mats.png')
  moneyImg= loadImage('Assets/Images/money.png')
  mapImg= loadImage('Assets/Images/map.png')
  buildImg= loadImage('Assets/Images/build.png')
  testImg= loadImage('Assets/Images/galaxy1.jpg')
  starsImg=loadImage('Assets/Images/starsBG.jpg')

  moduleImg[3]= loadImage('Assets/Images/Modules/matStorage.png')
  moduleImg[4]= loadImage('Assets/Images/Modules/hangar.png')
  moduleImg[6]= loadImage('Assets/Images/Modules/signal-tower.png')
  moduleImg[7]= loadImage('Assets/Images/Modules/radar.png')
  
  music = loadSound('Assets/Audio/bensound-slowmotion.mp3');
  clickSound = loadSound('Assets/Audio/multimedia_button_click.mp3')

  font= loadFont('Assets/Fonts/AstroSpace-eZ2Bg.ttf')
}

function setup(){
  cv = createCanvas(windowWidth, windowHeight);
  cv.position((windowWidth * 0.5) - width / 2, (windowHeight * 0.5) - height / 2);
  
  displayArea={
    'topY': height/15*2,
    'bottomY': height-100,
    'height':(height-100)-(height/15*2),

    'leftX':width/100,
    'rightX':99*width/100,
    'width': 98*width/100,
		'offsetX':'',
		'offsetY':''
  }

  errMsg={
    'active':false,
    'text':'',
    'x':'',
    'y':'',
    'w':'',
    'h':''
  }
  timer()
  testImg.resize(width,height)
  starsImg.resize(width,height)

  // music.setVolume(0.3);
  // music.play();
}


function draw() {
  switch(gameState){
    case 0: // Initial log-in screen
    loginScene()
    noLoop()
    break
  }
}


function main_scene_setup(){
  nameInput.remove();
  passInput.remove();
  loginBtn.remove();
  signupBtn.remove();
	moneyTimer=0
	moneyToCollect=0

	researchTCycle=0
	clearInterval(researchTCycleFunc)

	researchTCycleFunc= setInterval(function(){
		if(researchTCycle==4)
			researchTCycle=-1
		researchTCycle++
	},500)

  loadJSON('/getPlaced/'+playerId,(dataReceived)=>{ // Get a list of how many modules of each type are built
    for(let i=0; i<dataReceived.length; i++){
      placedModule[i]=dataReceived[i].COUNT
    }

    setTimeout(drawR(),20) // Ensures that the resources are drawn last
  })

	setInterval(function(){ // For every "minute" the player is active on the page and they have at least one money production module, money to collect increases
		if(placedModule[0]>0)
			moneyTimer++
	},1000*timeScale)

  logoffButton= new Button(width/2-width/20,height/2-height/20, width/10,height/10, 0,171,255, logOff, 'Log Off',15,1)
	collectMB= new Button(width/2-75,displayArea.topY, 150,50, 250,208,44, collectMoney, 'Collect Money',13,3)
  
  missionScreenB= new Button(width-215, height-90, 200, 75, 0,171,255, mission_Scene, "Missions",25,2)
  buildScreenB= new Button(15, height-90, 200, 75, 0,171,255, building_Scene, "Modules",25,2)
  
  profileButton= new Button(15,height/17, 200, height/15, 0,171,255, playerProfile, 'Profile',25,2)
  mapBtn = new Button(width - 200 - 15, height/17, 200, height/15, 0,171,255, map_scene, "Map",25,2);
  
  buildShipB= new Button(width/2-75, height/2+150, 150, 50, 0,200,230, buildShip, 'Build Ship\nCost:1000',20,1)
  buildProbeB= new Button((width/2+width/3) + 50,	height/3,	175,75,	140,200,230,	buildProbe,	'Build Probe\nCost:5000',20,1)
	advanceBtn= new Button(width/2,  displayArea.bottomY-15,  200,height-displayArea.bottomY,  230,20,35, advanceGalaxy, 'Launch Probe', 40, 1)
  
  selectCrew= new Button(50,displayArea.topY, 200,displayArea.height/2, 0,125,150, selectMission, 'Crew\nMissions',25, 4,1)
  selectMat= new Button(50,displayArea.topY+displayArea.height/2, 200,displayArea.height/2, 0,150,175, selectMission, 'Material\nMissions',25, 4,3)

	setTimeout(function(){
		if(placedModule[6]>0){
			researching=true
		}

		for(let i=0; i<galaxyResearchCount.length; i++){
			if(galaxyResearchCount[i].galaxyId==galaxyId){
				researchPoints=galaxyResearchCount[i].currPoints
				playersResearching=galaxyResearchCount[i].researchingPlayers
				isFound=galaxyResearchCount[i].isFound
				clearInterval(researchPointsFunc)

				if(playersResearching>0){
					researchPointsFunc=setInterval(function(){
						researchPoints+=(100*playersResearching)

						if(researchPoints>=100000){
							print('done')
							isFound=1
							clearInterval(researchPointsFunc)
						}
					},1000*timeScale)
				}
			}
		}

		create_Grid(playerId)
	},500)


  visiting=false
  mainLoop= true
  gameState= 1
  drawnMission=[]
  loop()
}


function main_Scene() {
    gameState=1
    moduleType=0
    gridEnable=false
    side= 48
    create_Grid(playerId)
    drawR()
}


function logOff(){
  clearScreen()
	researching=false
  gameState=0
}


function collectMoney(){
	loadJSON('/getEffect/'+1,(dataReceived)=>{ // This money increases up to a maximum of 10 "minutes" after which it stays consistant, and can be collected at most every 3 "minutes"
		multiplier=dataReceived[0].effect
		if(moneyTimer>10){
			moneyTimer=10
		}

		moneyToCollect=moneyTimer*multiplier*placedModule[0]
		moneyTimer=0

		resource[0].change_value(1,moneyToCollect)
		collectMB.text=('+'+moneyToCollect)

		setTimeout(function(){collectMB.text='Collect Money'},1000)
	})
}


function keyPressed(){
  if(gameState>0){
    switch(keyCode){
      case 49: // 1 => Sets Money to max
				if(keyIsDown(32))
        	resource[0].change_value(1,int(resource[0].maxAmount))
        break
      
      case 50: // 2 => Sets Crew to max
				if(keyIsDown(32))
      	resource[1].change_value(1,int(resource[1].maxAmount))
      break
    
      case 51: // 3 => Sets Materials to max
				if(keyIsDown(32))
      	resource[2].change_value(1,int(resource[2].maxAmount))
      break

      case 52: // 4 => Sets Ships to max
				if(keyIsDown(32))
        	resource[3].change_value(1,int(resource[3].maxAmount))
        break

			case 53: // 5 => Sets Ships to 0 (testing build ship button)
				if(keyIsDown(32))
					resource[3].change_value(-1,3)
				break
      
      case 81: // q => Testing player galaxy level
				if(keyIsDown(32))
					advanceGalaxy()
        break
    }
  }
  switch(gameState){
    case 0:
      if(keyCode==RETURN && registering==false) // Log-in inputs
        do_Login()
        
      if(keyCode==RETURN && registering==true)  // Register inputs
        do_Register()
      break
    
    case 1:
      switch(keyCode){
        case 82: // R -> Refresh screen
          loadJSON('/printFound/'+galaxyId,(dataReceived)=>{
            print(dataReceived)
          })
          break
      }
      break

    case 2:
      switch(keyCode){
        case 46: // DEL -> Delete modules on click
          if (erasing == false){
            erasing= true
          }
          else if (erasing == true){
            erasing= false
            clearedErase=false
          }
          break

      }
      break

    case 3:
      switch(keyCode){
        
      }
  }
}


function mouseReleased(){
  if(gameState==3){
		for(let i=0; i<mission.length; i++){
			if(missionSelect==2 && i<3){
				if(mission[i].button.pressed){
					mission[i].button.mouse_released(i)
				}
			}else if(missionSelect==3 && i>2){
				if(mission[i].button.pressed){
					mission[i].button.mouse_released(i)
				}
			}
    }

    if(selectCrew.pressed)
      selectCrew.mouse_released(2)

    if(selectMat.pressed)
      selectMat.mouse_released(3)

		if(buildShipB.pressed){
			buildShipB.mouse_released()
		}
  }

  if(gameState==4){
    if(logoffButton.pressed)
      logoffButton.mouse_released()
  }

  if(gameState==2){
    for(let i=0; i<moduleBuildButton.length; i++){
      if(moduleBuildButton[i].pressed){
        moduleBuildButton[i].mouse_released(i+1)
      }
    }
  }

  if(gameState==5){
		for(let i=0; i<playerMapArr.length; i++){
			if(playerMapArr[i].pressed){
				playerMapArr[i].mouse_released()
			}
			if(playerCard!=''){
        if(playerCard.visitBtn){
          if(playerCard.visitBtn.pressed){
            playerCard.visitBtn.mouse_released(playerCard.pId) //visit player with that id
				  }
				}

				playerCard.over_x()
			}
		}
	}

	if(gameState==1){
		if(placedModule[8]>0 && buildProbeB.pressed){
			buildProbeB.mouse_released()
		}
		if(isFound==1 && probeBuilt==1 && advanceBtn.pressed){
			advanceBtn.mouse_released()
		}
	}


  if(gameState>0){  
		
		if(mapBtn.pressed){
			mapBtn.mouse_released('')
		}

		if(profileButton.pressed){
			profileButton.mouse_released()
		}

		if(gameState<4){

			if(collectMB.pressed){
				collectMB.mouse_released()
			}

			if(missionScreenB.pressed){
				missionScreenB.mouse_released('')
			}
			
			if(buildScreenB.pressed){
				buildScreenB.mouse_released('')
			}
    }
  }
}


function mousePressed(){

  if(gameState==3){
    for(let i=0; i<mission.length; i++){
			if(missionSelect==2 && i<3){
				if(mission[i].button.mouse_over()){
					mission[i].button.mouse_pressed(i)
				}
			}else if(missionSelect==3 && i>2){
				if(mission[i].button.mouse_over()){
					mission[i].button.mouse_pressed(i)
				}
			}
    }

    if(selectCrew.mouse_over())
      selectCrew.mouse_pressed()

    if(selectMat.mouse_over())
      selectMat.mouse_pressed()

		if(buildShipB.mouse_over()){
			buildShipB.mouse_pressed()
		}
  }

  if(gameState==4){
    if(logoffButton.mouse_over())
      logoffButton.mouse_pressed()
  }

  if(gameState==2){
    for(let i=0; i<moduleBuildButton.length; i++){
      if(moduleBuildButton[i].mouse_over()){
        moduleBuildButton[i].mouse_pressed()
      }
    }
  }

	if(gameState==5){
		for(let i=0; i<playerMapArr.length; i++){
			if(playerMapArr[i].mouse_over() && playerCard==''){
				playerMapArr[i].mouse_pressed()
			}
			if(playerCard!=''){
        if(playerCard.visitBtn){
          if(playerCard.visitBtn.mouse_over()){
            playerCard.visitBtn.mouse_pressed(playerCard.pId) //visit player with that id
				  }
				}

				playerCard.over_x()
			}
		}
	}

	if(gameState==1){
		if(placedModule[8]>0 && buildProbeB.mouse_over()){
			buildProbeB.mouse_pressed()
		}
		if(isFound==1 && probeBuilt==1 && advanceBtn.mouse_over()){
			advanceBtn.mouse_pressed()
		}
	}

  if(gameState>0){  
		
		if(mapBtn.mouse_over() && placedModule[5]>0){
			mapBtn.mouse_pressed('')
		}

		if(profileButton.mouse_over()){
			profileButton.mouse_pressed()
		}

		if(gameState<4){

			if(collectMB.mouse_over() && canCollect==true){
				collectMB.mouse_pressed()
			}

			if(missionScreenB.mouse_over() && placedModule[7]>0){
				missionScreenB.mouse_pressed('')
			}
			
			if(buildScreenB.mouse_over()){
				buildScreenB.mouse_pressed('')
			}
			
			if(gridEnable==true && erasing == false){
				
				for (let i = 0; i < arrtiles.length; i++) {
					for (let j = 0; j < arrtiles[i].length; j++) {

						if(arrtiles[i][j].is_over(mouseX,mouseY) && (arrtiles[i][j].moduleType==0 || arrtiles[i][j].deleted==1)){ // Test if mouse is over grid
							
							// console.log('id: ',moduleType,'\nplaced: ',placedModule[moduleType-1],'\nmax: ',maxPlace[moduleType])

							if(placedModule[moduleType-1]<maxPlace[moduleType]){ // Check if not at limit of placed modules
							
								if(currMCost<=resource[2].currAmount && currCCost<=resource[1].currAmount-resource[1].inUse){ // If has enough materials and available crew
									if(i<18 && j<10){ // Bug that would't allow players to place modules on edges, bad fix
										if((arrtiles[i+1][j].moduleType!=0 && arrtiles[i+1][j].deleted==0) || (arrtiles[i-1][j].moduleType!=0 && arrtiles[i-1][j].deleted==0) ||
										(arrtiles[i][j+1].moduleType!=0 && arrtiles[i][j+1].deleted==0) || (arrtiles[i][j-1].moduleType!=0 && arrtiles[i][j-1].deleted==0)){ // If connected to other modules

											arrtiles[i][j].moduleType=moduleType;
											arrtiles[i][j].deleted=0;
											resource[2].change_value(-1,currMCost)
											resource[1].change_inUse(1,currCCost)
											
											let dataToSend={
												"moduleType":moduleType,
												"x":i,
												"y":j,
												"playerId":playerId,
                        "gLevel":gLevel,
												"deleted":deleted
											}

											httpPost('/insertModule',"json",dataToSend,(dataReceived)=>{
												placedModule[moduleType-1]++

												if(moduleType==2 ||moduleType==3 || moduleType==4){ // If one of the three capacity upgrades
													let dataToSend={
														"playerId":playerId,
														"building":moduleType,
														"oldMax":resource[moduleType-1].maxAmount,
														"resource":moduleType,
														"op":1
													}
													httpPost('/updateMaxCap','JSON',dataToSend,(dataReceived)=>{
														loadJSON('/getEffect/'+moduleType,(dataReceived)=>{

															resource[moduleType-1].maxAmount+=dataReceived[0].effect
															drawR()
														})
													})
												}else if (moduleType == 7){ // on placing a research station

                          researching = true
                          // getResearch()
                          let dataToSend={
                            "playerId": playerId,
                            "galaxyId": galaxyId,
														"state":1
                          }
                          httpPost('/updateResearching','JSON',dataToSend,(dataReceived)=>{

                          })
                        }else if (moduleType == 8){ // on placing a probe

													probeBuilt=1
                          let dataToSend={
                            "playerId": playerId,
                            "galaxyId": galaxyId,
														"state":1
                          }
                          httpPost('/updateProbe','JSON',dataToSend,(dataReceived)=>{

                          })
                        }
											});
											draw_Grid()
											
										}else{
											push()
												fill("crimson")
												textSize(30)
												textAlign(CENTER, TOP)
												text("Modules must be connected",width/2,height/2-5.5*side)
												setTimeout(function(){
													if(gameState==2){
														clearScreen()
														background(220)
														drawR()
														draw_Grid();
													}
												},2000)
											pop()
											break
										}
									}else{ // Modules from the edges or the screen, still bad fix, not testing if connected
										arrtiles[i][j].moduleType=moduleType;
										arrtiles[i][j].deleted=0;
										resource[1].change_inUse(1,currCCost)
										
										let dataToSend={
											"moduleType":moduleType,
                      "gLevel":gLevel,
											"x":i,
											"y":j,
											"playerId":playerId,
											"deleted":deleted
										}

										httpPost('/insertModule',"json",dataToSend,(dataReceived)=>{
											placedModule[moduleType-1]++
											if(moduleType==2 ||moduleType==3 || moduleType==4){
												let dataToSend={
													"playerId":playerId,
													"building":moduleType,
													"oldMax":resource[moduleType-1].maxAmount,
													"resource":moduleType,
													"op":1
												}
												httpPost('/updateMaxCap','JSON',dataToSend,(dataReceived)=>{
													loadJSON('/getEffect/'+moduleType,(dataReceived)=>{

														resource[moduleType-1].maxAmount+=dataReceived[0].effect
														drawR()
													})
												})
											}else if (moduleType == 7){ // on placing a research station

												researching = true
												// getResearch()
												let dataToSend={
													"playerId": playerId,
													"galaxyId": galaxyId,
													"state":1
												}
												httpPost('/updateResearching','JSON',dataToSend,(dataReceived)=>{

												})
											}else if (moduleType == 8){ // on placing a probe

												probeBuilt=1
												let dataToSend={
													"playerId": playerId,
													"galaxyId": galaxyId,
													"state":1
												}
												httpPost('/updateProbe','JSON',dataToSend,(dataReceived)=>{

												})
											}
										});
										draw_Grid()
										console.log(arrtiles[i][j])
									}
								}else
								if(currMCost>resource[2].currAmount){
									push()
										fill("crimson")
										textSize(30)
										textAlign(CENTER, TOP)
										text("Not enough materials!",width/2,height/2-5.5*side)
										setTimeout(function(){
											if(gameState==2){
												clearScreen()
												background(220)
												drawR()
												draw_Grid();
											}
										},2000)
									pop()
									break
								}else
								if(currCCost>resource[1].currAmount-resource[1].inUse){
									push()
										fill("crimson")
										textSize(30)
										textAlign(CENTER, TOP)
										text("Not enough available crew!",width/2,height/2-5.5*side)
										setTimeout(function(){
											if(gameState==2){
												clearScreen()
												background(220)
												drawR()
												draw_Grid();
											}
										},2000)
									pop()
									break
								}

								draw_Grid();
								break;

							}else{
								push()
								fill("crimson")
								textSize(30)
								textAlign(CENTER, TOP)
								text("Max module limit reached",width/2,height/2-5.5*side)
								setTimeout(function(){
									if(gameState==2){
										clearScreen()
										background(220)
										drawR()
										draw_Grid();
									}
								},2000)
							pop()
							break;
							}
						}else if(arrtiles[i][j].is_over(mouseX,mouseY)==true && arrtiles[i][j].deleted==0){
							push()
								fill("crimson")
								textSize(30)
								textAlign(CENTER, TOP)
								text("There is already a building in that spot",width/2,height/2-5.5*side)
								setTimeout(function(){
									if(gameState==2){
										clearScreen()
										background(220)
										drawR()
										draw_Grid();
									}
								},2000)
							pop()
							break;
						}
						}
					}
				}
			}
			if (erasing== true){
				for (let i = 0; i < arrtiles.length; i++) {
					for (let j = 0; j < arrtiles[i].length; j++) {
						
						if(arrtiles[i][j].is_over(mouseX,mouseY) && arrtiles[i][j].moduleType> 0 && arrtiles[i][j].deleted == 0){

							if(arrtiles[i][j].moduleType== 11){ // Trying to delete the middle module
								push()
									fill("crimson")
									textSize(30)
									textAlign(CENTER, TOP)
									text("The starting module cannot be destroyed",width/2,height/2-5.5*side)
									setTimeout(function(){
										if(gameState==2){
												clearScreen()
												background(220)
												drawR()
												draw_Grid();
											}
									},2000)
								pop()
							}else{
								arrtiles[i][j].deleted=1
								resource[1].change_inUse(-1,crewCost[arrtiles[i][j].moduleType]) // Set the crewmembers used by module back to available

								let moduleId
								let moduleInfo={
									"posX" :arrtiles[i][j].i,
									"posY" :arrtiles[i][j].j,
									"playerId" :playerId,
									"deleted" :0
								}
								httpPost('/getModuleId','json',moduleInfo,(modId)=>{
									moduleId=modId[0].moduleId; 
									placedModule[(arrtiles[i][j].moduleType)-1]--
									
									erase_Module(moduleId)

									if(arrtiles[i][j].moduleType==2 || arrtiles[i][j].moduleType==3 || arrtiles[i][j].moduleType==4){
										let dataToSend={
											"playerId":playerId,
											"building":arrtiles[i][j].moduleType,
											"oldMax":resource[arrtiles[i][j].moduleType-1].maxAmount,
											"resource":arrtiles[i][j].moduleType,
											"op":-1
										}

										
										httpPost('/updateMaxCap','JSON',dataToSend,(dataReceived)=>{
											loadJSON('/getEffect/'+arrtiles[i][j].moduleType,(dataReceived)=>{

												resource[(arrtiles[i][j].moduleType)-1].maxAmount-=dataReceived[0].effect
												drawR()
											})
										})
									}else if (arrtiles[i][j].moduleType == 7){ // on placing a research station

										researching = false
										// getResearch()
										let dataToSend={
											"playerId": playerId,
											"galaxyId": galaxyId,
											"state":0
										}
										httpPost('/updateResearching','JSON',dataToSend,(dataReceived)=>{

										})
									}else if (moduleType == 9){ // on placing a probe

										probeBuilt=0
										let dataToSend={
											"playerId": playerId,
											"galaxyId": galaxyId,
											"state":0
										}
										httpPost('/updateProbe','JSON',dataToSend,(dataReceived)=>{

										})
									}
									// else if(arrtiles[i][j].moduleType==1){
										
									//   loadJSON('/getEffect/'+arrtiles[i][j].moduleType,(dataReceived)=>{
									//     let dataToSend={
									//       "playerId":playerId,
									//       "effect":dataReceived[0].effect,
									//       "first":firstMoneyProd,
									//       "op":-1
									//     }
											
									//     httpPost('/updateMProd','JSON',dataToSend,(dataReceived)=>{
												
									//     })
									//   })
									// }
								})

								loop()
								draw_Grid()
								break
							}
						}
					}
				}
			}
		}
}


function timer(){
  setInterval(function(){
    
    switch(gameState){
      
      case 1:
				let researchBar={
					'rectX': width/2- width/10,
					'rectY': displayArea.bottomY+20,
					'rectW': width/2.5,
					'rectH': height/15
				}
				if(updateR==true){
					updateR=false
					loadJSON('/getResearching',(dataReceived)=>{

						for(let i=0; i<dataReceived.length; i++){
							galaxyResearchCount[i]={
								"researchingPlayers":dataReceived[i].researching,
								"galaxyId":dataReceived[i].galaxyId,
								"isFound":dataReceived[i].isFound,
								"currPoints":dataReceived[i].currPoints
							}
						}
						
						for(let i=0; i<galaxyResearchCount.length; i++){
							if(galaxyResearchCount[i].galaxyId==galaxyId){
								researchPoints=galaxyResearchCount[i].currPoints
								playersResearching=galaxyResearchCount[i].researchingPlayers
								isFound=galaxyResearchCount[i].isFound
								clearInterval(researchPointsFunc)
				
								if(playersResearching>0){
									researchPointsFunc=setInterval(function(){
										researchPoints+=(100*playersResearching)

										if(researchPoints>=100000){
											print('done')
											isFound=1
											clearInterval(researchPointsFunc)
										}
									},1000*timeScale)
								}
							}
						}
					})
				}

        image(starsImg,0,0)

        if(visiting==true){
          mapBtn.textS=20
          mapBtn.text='Back to Base'
        }
        else{
          mapBtn.textS=25
          mapBtn.text='Map'
        
					profileButton.text='Profile'
					buildScreenB.text='Modules'
					missionScreenB.text='Missions'

					if(isFound==0){
						switch(researchTCycle){
							case 0:
								researchText='Researching'
								break
							case 1:
								researchText='Researching.'
								break
							case 2:
								researchText='Researching..'
								break
							case 3:
								researchText='Researching...'
								break
							case 4:
								researchText='Researching'
								break
						}
					}else{
						researchText='Destination Found!'
					}

					if(researching==true){
						push()

						fill(255)
							stroke(0)
							strokeWeight(10)
							if(isFound==0){
								if(researchPoints>500){
									let resBar=map(researchPoints, 0,100000, 0,researchBar.rectW)
									rect(researchBar.rectX,	researchBar.rectY,	resBar,	researchBar.rectH,	20)
								}

								noFill()
								stroke(255)
								strokeWeight(5)
								rect(researchBar.rectX,researchBar.rectY,researchBar.rectW,researchBar.rectH,20)
							}else{
								if(isFound==1 && probeBuilt==1){
									advanceBtn.mouse_over()
									advanceBtn.draw_button()
								}
							}

							textAlign(RIGHT,CENTER)
							noStroke()
							fill(255)
							textSize(30)
							text(researchText,	researchBar.rectX - width/5- 15,	researchBar.rectY,	width/5,	researchBar.rectH)
						pop()
					}

					if(placedModule[8]>0){
						buildProbeB.mouse_over()
						buildProbeB.draw_button()
					}

					if(buildingProbe==true){
						push()
						fill(buildProbeB.origR-40, buildProbeB.origG-40, buildProbeB.origB-40)
						probeBuildBar++
						let w=map(probeBuildBar, 0,5000/15, 0,buildProbeB.w,true)
						rect(buildProbeB.x,	buildProbeB.y + buildProbeB.h + 5,	w,	buildProbeB.h/3,25)
						pop()
					}
				}
				
        draw_Grid()
        break

      case 2:
        image(starsImg,0,0)
        
        profileButton.text='Profile'
        mapBtn.text='Map'
        buildScreenB.text='Back'
        missionScreenB.text='Missions'

        if(erasing==true){
          push()
            fill("red")
            textSize(30)
            textAlign(CENTER, TOP)
            text("Erasing",width/2,height/2+6.5*side)
          pop()
        }

        for(let i=0; i<moduleBuildButton.length; i++){
          moduleBuildButton[i].mouse_over()
          moduleBuildButton[i].draw_button()
        }

        draw_Grid()
        break

      case 3:
        image(starsImg,0,0)
        
        profileButton.text='Profile'
        
        mapBtn.text='Map'
        buildScreenB.text='Modules'
        missionScreenB.text='Back'

        let missionBG={
          'x':width/2-width/3,
          'y':displayArea.topY,
          'w':2*((width/2+width/3)-(width/2-width/3))/3,
          'h':displayArea.height/3
        }

        selectCrew.x=missionBG.x-selectCrew.w
        selectMat.x=missionBG.x-selectMat.w

        push()
          for(let rY=0,i=0; rY<3; rY++,i++){
            
            fill(0,190,235,125)
            rect(missionBG.x, missionBG.y +rY*missionBG.h, missionBG.w, missionBG.h,0,50,50,0)
          }
        pop()

				if(refreshM==true){
					for(let i=0;i<mission.length;i++){
						if(i<3){
							mission[i].x=missionBG.x
							mission[i].y=missionBG.y+ i*(missionBG.h)
							mission[i].w=missionBG.w
							mission[i].h=missionBG.h
						}else{
							mission[i].x=missionBG.x
							mission[i].y=missionBG.y+ (i-3)*(missionBG.h)
							mission[i].w=missionBG.w
							mission[i].h=missionBG.h
						}
						mission[i].button= new Button(mission[i].x + mission[i].w - mission[i].w/10, mission[i].y, mission[i].w/2.5, mission[i].h, 0,150,195, missionFunction, i, 35,1)
						switch(mission[i].state){
							case 1:
								mission[i].button.text= 'Start\nMission'
								break
								
							case 2:
							case 6:
								mission[i].button.text= 'Ongoing'
								break
	
							case 4:
								mission[i].button.text= 'Failed'
								mission[i].button.origR=244
								mission[i].button.origG=7
								mission[i].button.origB=7
								break
	
							case 5:
								mission[i].button.text= 'Complete'
								mission[i].button.origR=47
								mission[i].button.origG=153
								mission[i].button.origB=8
								break
						}
					}
					refreshM=false
				}

				if(refreshM==false){
					if(missionSelect==2){
						for(let i=0; i<3; i++){
							mission[i].draw_mission()
							mission[i].button.mouse_over()
							mission[i].button.draw_button()
						}
					}else{
						for(let i=3; i<6; i++){
							mission[i].draw_mission()
							mission[i].button.mouse_over()
							mission[i].button.draw_button()
						}
					}
				}

        let freeSpace= missionBG.x + missionBG.w + missionBG.h
        
        push()
          textSize(30)
          textAlign(CENTER,CENTER)
          textFont(font)
          fill(100,170,235)
          if(resource[3].currAmount-resource[3].inUse==1){
            text('There is '+(resource[3].currAmount-resource[3].inUse)+'\navailable Ship', freeSpace, displayArea.topY, width - freeSpace, displayArea.height/2)
          }else{
            text('There are '+(resource[3].currAmount-resource[3].inUse)+'\navailable Ships', freeSpace, displayArea.topY, width - freeSpace, displayArea.height/2)
          }
        pop()


        buildShipB.w=(width-freeSpace)/2
        buildShipB.h=buildShipB.w/2

        buildShipB.y=displayArea.topY + displayArea.height/2
        buildShipB.x=freeSpace + (width-freeSpace)/2 - buildShipB.w/2

        if(placedModule[4]==0 || resource[3].currAmount==resource[3].maxAmount){ // If there are no ship constructors, or the ships array is full, darkens button
          buildShipB.r=180
          buildShipB.g=180
          buildShipB.b=180
          buildShipB.func= function(){
            if(resource[3].currAmount>=resource[3].maxAmount){

              errMsg.text='Hangar bay already full'
                            
            }else if(placedModule[4]==0){

              errMsg.text='No ship\nconstructors placed'

            }
            errMsg.active=true
            errMsg.x=freeSpace
            errMsg.y=buildShipB.y+buildShipB.h
            errMsg.w=width-freeSpace
            errMsg.h=buildShipB.h
            setTimeout(function(){errMsg.active=false},1500)
          }
        }else{
          buildShipB.r=240
          buildShipB.g=240
          buildShipB.b=240
          buildShipB.mouse_over()
          buildShipB.func=buildShip
        }

        buildShipB.draw_button()
        

        if(drawBar==true){
      		let multiplier= placedModule[4]
          shipBar+=buildShipB.w/((1000*5*timeScale/multiplier)/15)
          rect(buildShipB.x, buildShipB.y+buildShipB.h+5, shipBar, 10,10)
        }


        selectCrew.mouse_over()
        selectCrew.draw_button()

        selectMat.mouse_over()
        selectMat.draw_button()

        break

      case 4:
        image(starsImg,0,0)
        
        profileButton.text='Back'
        mapBtn.text='Map'
        buildScreenB.text='Modules'
        missionScreenB.text='Missions'
        
        logoffButton.mouse_over()
        logoffButton.draw_button()
        break

      case 5:
        profileButton.text='Profile'
        mapBtn.text='Back'
        buildScreenB.text='Modules'
        missionScreenB.text='Missions'
        
        drawMap()
        if(playerCard!=''){
          playerCard.draw_card()
          if(playerCard.visitBtn){
            playerCard.visitBtn.mouse_over()
            playerCard.visitBtn.draw_button()
          }
        }
        break
    }
    
    if(gameState>0){
      drawR()
      if(placedModule[5]>0){
        mapBtn.mouse_over()
        mapBtn.draw_button()
      }

      profileButton.mouse_over()
      profileButton.draw_button()

      if(gameState<4 && visiting==false){
        if(gameState<3 && placedModule[0]>0){
          if(moneyTimer>2){
            collectMB.func=collectMoney
            collectMB.mouse_over()
            collectMB.draw_button()
            canCollect=true
          }else{ // Money not available to collect, darken button with no function
            canCollect=false
            collectMB.r=150
            collectMB.g=150
            collectMB.b=150
            collectMB.func=function(){}
            collectMB.draw_button()
          }
        }
        if(placedModule[7]>0){
          missionScreenB.mouse_over()
          missionScreenB.draw_button()
        }

        buildScreenB.mouse_over()
        buildScreenB.draw_button()

      }
    }


    if(errMsg.active==true){
      push()
        textFont(font)
        textAlign(CENTER,CENTER)
        fill("red")
        textSize(20)
        text(errMsg.text, errMsg.x,errMsg.y,errMsg.w,errMsg.h)
      pop()
    }

  },15)
}

function startMission(){

}

function clearScreen(){
  clear()
}




// v Scene transitions v // =================================================================================================================================================================================================================================
{

  function building_Scene(){
    if(gameState!=2){ // If on the main screen or the missions screen
      changeScene()
      gameState=2
      side= 48

      let buttonWidth=200
      let buttonHeight=75
      
      for(let i=0; i<10; i++){
        let cArray=moduleColor(i+1)

        if(i<5){
          moduleBuildButton[i]= new Button (25, height/2-((buttonHeight+25)*(-i+2)), buttonWidth, buttonHeight, cArray[0],cArray[1],cArray[2], place_module, (moduleName[i+1]+'\nMaterial cost: '+moduleCost[i+1]+'\nCrew requirement: '+crewCost[i+1]),12,1)
        }else{
          moduleBuildButton[i]= new Button (width-buttonWidth-25, height/2-((buttonHeight+25)*(-i+7)), buttonWidth, buttonHeight, cArray[0],cArray[1],cArray[2], place_module, (moduleName[i+1]+'\nMaterial cost: '+moduleCost[i+1]+'\nCrew requirement: '+crewCost[i+1]),12,1)
        }
      }

      create_Grid(playerId)

      setTimeout(function(){
        push()
          fill("red")
          textSize(15)
          textAlign(CENTER, TOP)
          text("Press 'delete' to toggle erasing mode",width/2,height/2-5.5*side)
        pop()
      },75)


    }else if(gameState==2){ // Return to main screen
      changeScene()
      gameState=1
      main_Scene()
    }
  }


  function buildShip(){

    let missionBG={
      'x':width/2-width/3,
      'y':displayArea.topY,
      'w':2*((width/2+width/3)-(width/2-width/3))/3,
      'h':displayArea.height/3
    }
    if(buildingShip==false && resource[0].currAmount>=1000){
      let multiplier= placedModule[4]
      resource[0].change_value(-1,1000)
      buildingShip=true
      drawBar=true

      setTimeout(function(){
        resource[3].change_value(1,1)
        buildingShip=false
        drawBar=false
        shipBar=0
      },(1000*5*timeScale)/multiplier)


    }else if(buildingShip== true){
      errMsg.text="Another ship is already under construction"

      errMsg.active=true
      errMsg.x=missionBG.x + missionBG.w + missionBG.h
      errMsg.y=buildShipB.y+buildShipB.h
      errMsg.w=width-missionBG.x + missionBG.w + missionBG.h
      errMsg.h=buildShipB.h
      setTimeout(function(){errMsg.active=false},1500)

    }else if(resource[0].currAmount<1000){
      errMsg.text="Not enough money to buy a new ship"
      
      errMsg.active=true
      errMsg.x=width/2-width/3 + 2*((width/2+width/3)-(width/2-width/3))/3 + displayArea.height/3
      errMsg.y=buildShipB.y+buildShipB.h
      errMsg.w=width-width/2-width/3 + 2*((width/2+width/3)-(width/2-width/3))/3 + displayArea.height/3
      errMsg.h=buildShipB.h
      setTimeout(function(){errMsg.active=false},1500)
    }
  }


  
  function buildProbe(){

    if(resource[0].currAmount>=5000 && probeBuilt==0 && buildingProbe==false){

      resource[0].change_value(-1,5000)
			probeBuildBar=0
			buildingProbe=true

			setTimeout(function(){
				buildingProbe=false
				probeBuilt=1
			}, 5000)
    //   let bar=0
    //   let drawBar=setInterval(function(){
    //     bar+=buildProbeB.w/((1000*5*timeScale)/100)
    //     rect(buildProbeB.x, buildProbeB.y+buildProbeB.h, bar, 10)
    //   },100)
    

    //   setTimeout(function(){
    //     buildingProbe=false
    //     probeBuilt=true
    //     updateProbe()
    //     clearInterval(drawBar)
    //     refreshM()
    //   },(1000*5*timeScale)) 

    // }else if(buildingProbe== true){
    //   push()
    //     fill("red")
    //     textSize(15)
    //     textAlign(CENTER, TOP)
    //     text("The probe is already under construction",buildProbeB.x+buildProbeB.w/2,buildProbeB.y+buildProbeB.h+5)
    //   pop()
    //   setTimeout(function(){
    //     refreshM()
    //   },1500)
    // }else if(resource[0].currAmount<5000){
    //   push()
    //     fill("red")
    //     textSize(15)
    //     textAlign(CENTER, TOP)
    //     text("Not enough money to buy a probe",buildProbeB.x+buildProbeB.w/2,buildProbeB.y+buildProbeB.h+5)
    //   pop()
    //   setTimeout(function(){
    //     refreshM()
    //   },1500)
    // }else if (probeBuilt==true){
    //   push()
    //     fill("red")
    //     textSize(15)
    //     textAlign(CENTER, TOP)
    //     text("There is no place to go",buildProbeB.x+buildProbeB.w/2,buildProbeB.y+buildProbeB.h+5)
    //   pop()
    //   setTimeout(function(){
    //   refreshM()
    //   },1500)
    }
  }


  function mission_Scene(){
    if(gameState!=3){
      changeScene()
      gameState=3

    }else if(gameState==3){
      changeScene()
      gameState=1
    }
  }


  function map_scene(){
    if(gameState!=5){
      changeScene()
      gameState = 5;
      drawMap()
      
    } else if(gameState == 5){
      clearScreen();
      gameState=1
      main_Scene()
    }
  }


  function changeScene(){
    gridEnable=false
    errMsg.active=false
    erasing=false
    refreshM=true
		updateR=true
    playerCard=''
  }


  function drawR(){
      fill(255)
      let squareCounter= 1;

      let initX= (width/2) - (width/3)
      let endX= (width/2) + width/3
      let length= (endX-initX)/4
      let boxY=height/17

      for(let i = initX; squareCounter <= 4; i += length){ //boxes where the resources are displayed
        squareCounter++;
        push()
        strokeWeight(1)
        stroke(0)
        rect(i, boxY, length, height/15);
        pop()
      }
      
      textAlign(CENTER, CENTER)

      for(let i = 0, x=initX; i< resource.length; i++){

        resource[i].draw_resource(x, boxY, length, height/15);
        x+=length
      }
  }


  function loginScene() {
    registering= false
    background(220);
    nameInput = createInput('');
    nameInput.position(windowWidth/2 - nameInput.size().width/2, windowHeight/2.5 - nameInput.size().height);
    passInput = createInput('');
    passInput.position(windowWidth/2 - passInput.size().width/2, windowHeight/2.5 + passInput.size().height);
    loginBtn = createButton('Login');
    loginBtn.position(passInput.position().x, passInput.position().y+passInput.size().height*1.5);
    loginBtn.mousePressed(do_Login);
    signupBtn = createButton('Sign up');
    signupBtn.position(passInput.position().x+passInput.size().width-signupBtn.size().width, passInput.position().y+passInput.size().height*1.5);
    signupBtn.mousePressed(do_Register);
  }


  function do_Register(){

    if (registering==false){ // If moved from Log-in page to Register page
      registering= true
      background(220)

      nameInput.remove();
      passInput.remove();
      loginBtn.remove();
      signupBtn.remove();
    
      suNameInput = createInput('');
      suNameInput.position(windowWidth/2 - suNameInput.size().width/2, windowHeight/2.5 - suNameInput.size().height);
      suPassInput = createInput('');
      suPassInput.position(windowWidth/2 - suPassInput.size().width/2, windowHeight/2.5 + suPassInput.size().height);
    
      registerBtn = createButton('Register');
      registerBtn.position(suPassInput.position().x+suPassInput.size().width-registerBtn.size().width, suPassInput.position().y+suPassInput.size().height*1.55);
      registerBtn.mousePressed(do_Register);

      registerBackBtn= createButton('Back')
      registerBackBtn.position(suPassInput.position().x, suPassInput.position().y+suPassInput.size().height*1.5)
      registerBackBtn.mousePressed(function(){
        suNameInput.remove();
        suPassInput.remove();
        registerBtn.remove();
        registerBackBtn.remove();
        loginScene()
      })

      
    }else{ // If on Register page and clicking to register
      let newUsername = suNameInput.value();
      let newPassword = suPassInput.value();
      let player

      if (newUsername !='' && newPassword !=''){
        player = {
          "username": newUsername,
          "password": newPassword
        }

        httpPost('/register', 'json', player, (dataReceived) => {

          if (dataReceived[0]== "Existing"){ // Trying to register with an existing username
            clearScreen()
            push()
              fill("crimson")
              textAlign(CENTER, CENTER)
              text("Username taken", suNameInput.position().x+ suNameInput.size().width/2, suNameInput.position().y+suNameInput.size().height*1.5)
              suNameInput.value('')
              suPassInput.value('')
            pop()
          }else{ // Successful register
            playerId = dataReceived[0].playerId;
            suNameInput.remove();
            suPassInput.remove();
            registerBtn.remove();
            registerBackBtn.remove()

            setTimeout(function(){ // on register, wait a bit before loading
              for(let j=2; j<4; j++){ // j: Mission resource (Crew, Materials)
                  for (let i=1; i<4; i++){ // i: Mission length (Short, Medium, Long)
                  createMission(j,i)
                  }
              }
          
              loadResource()
              getPlayerMap()
              main_scene_setup()
              getProbe()
              // getResearch()
            },500)
          }
        });
      }else{
        if(newUsername ==''){
          clearScreen()
          background(220)

          push()
            stroke("red")
            strokeWeight(3)
            noFill()
            rect(suNameInput.position().x, suNameInput.position().y, suNameInput.size().width, suNameInput.size().height)
          pop()
        }else{
          clearScreen()
          background(220)

          push()
            stroke("red")
            strokeWeight(3)
            noFill()
            rect(suPassInput.position().x, suPassInput.position().y, suPassInput.size().width, suPassInput.size().height)
          pop()
        }
      }
    }
  }


  function do_Login() {

    let username = nameInput.value();
    let password = passInput.value();

    let player = {
      "username": username,
      "password": password
    }

    httpPost('/login','json', player, (dataReceived) => {

      if (dataReceived.length==0 || dataReceived==false){ // No match in the database
        push()
          fill("crimson")
          textAlign(CENTER, CENTER)
          text("Incorrect username or password", nameInput.position().x+ nameInput.size().width/2, nameInput.position().y+nameInput.size().height*1.5)
          passInput.value('')
        pop()
      }
      else{
        playerId = dataReceived[0].playerId;
        getMission()
        loadResource()
        getPlayerMap()
        getProbe()
        // getResearch()

        main_scene_setup()
      }
    });
  }

  function playerProfile(){
    if(gameState!=4){
      changeScene()
      gameState = 4;
    }
    else if(gameState==4){
      create_Grid(playerId)
      changeScene()
      gameState=1
    }
  }


  function loadResource(){
    loadJSON('/getResources/'+playerId, (dataReceived)=>{
      for(let i = 0; i < dataReceived.length; i++){
        let rType=dataReceived[i].ResourceType
        let maxAmount=dataReceived[i].MaxAmount
        let currAmount=dataReceived[i].CurrentAmount
        let inUse=dataReceived[i].inUse

        resource[i] = new Resources ((width/4)+(i*width/6), (height/10), 10, rType, currAmount, maxAmount, inUse)
        loadJSON('/getResourceNames/'+rType, (dataReceived)=>{
          resource[i].resourceName= dataReceived[0].resourceName
        });

      }
      main_Scene()
    });
  }

}


// v Mission start v // ====================================================================================================================================================================================================================================
{

  function discardMission(resource, length){
    let dataToSend={
      "playerId":playerId,
      "resource":resource,
      "length":length
    }
    httpPost('/discardMission','JSON',dataToSend,(dataReceived)=>{
      createMission(resource, length)
    })
  }


  function createMission(resource, length){
    let dataToSend={
      "playerId":playerId,
      "resource":resource,
      "length":length
    }
    httpPost('/createMission','JSON',dataToSend,dataReceived=>{
      getMission()
    })
  }


  function selectMission(selection){
    
    if(missionSelect!=selection){
      if(selection==2){
        selectCrew.origR=0
        selectCrew.origG=125
        selectCrew.origB=150

        selectMat.origR=0
        selectMat.origG=150
        selectMat.origB=175
      }else{
        selectMat.origR=0
        selectMat.origG=125
        selectMat.origB=150

        selectCrew.origR=0
        selectCrew.origG=150
        selectCrew.origB=175
      }

      for(let i=0; i<mission.length; i++){
        mission[i].drawn=false
      }

      missionSelect=selection
			refreshM=true
    }
  }


  function getMission(){
    loadJSON('/getMission/'+playerId, (dataReceived)=>{
			mission=[]
			tempMission=[]

      for(let i=0; i<dataReceived.length; i++){
        tempMission[i]= new Mission(i, dataReceived[i].missionId, dataReceived[i].resourceType, dataReceived[i].reward, dataReceived[i].duration, dataReceived[i].successChance, dataReceived[i].missionType, dataReceived[i].state, dataReceived[i].startDay, dataReceived[i].startHour, dataReceived[i].startMin)
      }
			
			sortMission()
    })
  }


	function missionFunction(index){
		switch(mission[index].state){
			case 1:
				if(resource[3].currAmount-resource[3].inUse>0){
					changeAvailableShips("decrease",1)
					let roll=random(100,0)
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
						mission[index].startMin=minute()
						mission[index].startHour=hour()
						mission[index].startDay=day()

						if(failing==false){ // If mission  will succeed
							mission[index].state=2

							setTimeout(function(){
									mission[index].state=5

									refreshM=true
							}, missionTime*1000*timeScale)
						}
						else{ // If mission  will fail
							mission[index].state=6

							setTimeout(function(){
									mission[index].state=4
									
									refreshM=true
							},missionTime*1000*timeScale)
						}
						refreshM=true
					})
				}
				break
			
			case 4:
				discardMission(mission[index].missionResource, mission[index].missionType)
				changeAvailableShips('increase',1)
				resource[3].change_value(-1,1)
				break

			case 5:
				changeAvailableShips('increase',1)
				resource[mission[index].missionResource-1].change_value(1,mission[index].reward)
				discardMission(mission[index].missionResource, mission[index].missionType)
				break
		}
	}


  function swap(arr, xp, yp)
  {
      let temp = arr[xp];
      arr[xp] = arr[yp];
      arr[yp] = temp;
  }


  function sortMission(){
		let i
		let j
		
		for (j = 0; j < 2; j++){
			if (tempMission[j].missionType > tempMission[j+1].missionType){
				swap(tempMission,j,j+1);
				j=-1
			}
		}
		for (j = 3; j < 5; j++){
			if (tempMission[j].missionType > tempMission[j+1].missionType){
				swap(tempMission,j,j+1);
				j=-1
			}
		}
		for (i = 0; i > tempMission.length-1; i++){
			if (tempMission[i].missionResource > tempMission[i+1].missionResource){
				swap(tempMission,i,i+1);
				i=-1
			}
		}
		let mCounter=0

		for(let k=0; k<tempMission.length; k++){
			if(tempMission[k].missionResource%2==0){
				mission[mCounter]=tempMission[k]
				mCounter++
			}
		}
		for(let k=0; k<tempMission.length; k++){
			if(tempMission[k].missionResource%2!=0){
				mission[mCounter]=tempMission[k]
				mCounter++
			}
		}
		print('---------\ni want to die\n---------')
		refreshM=true
	}


  function changeAvailableShips(op, value){
    let available=0
    
    available= resource[3].currAmount-resource[3].inUse

    if(op=="increase"){
      resource[3].inUse-=value
    }
    if(op=="decrease"){
      if(available-value <= resource[3].currAmount){
        resource[3].inUse+=value
      }
    }
  }


  function getProbe(){
    loadJSON('/getProbe/'+playerId,(dataReceived)=>{
      print(dataReceived)
      probeBuilt = dataReceived[0].probe
    });
  }


  function updateProbe(){
    let dataToSend={
      "playerId": playerId
    }
    httpPost('/updateProbe','json',dataToSend,(dataReceived)=>{
    })
  }


  // function getResearch(){
  //   loadJSON('/getResearch',(dataReceived)=>{
    
  //   });
  // }


}


// v Building/Grid start v // ===============================================================================================================================================================================================================================
{

  function create_Grid(id){

    let x=0;
    let y=0;
    let COL=19;
    let ROW =11;

    for (let i = 0; i < COL; i++) {
      arrtiles[i] = [];

      if(i==0){
        //starting point in width
        x= (width/2) - (COL*side/2);
      }else{
        x=x+side;
      }

      for (let j = 0; j < ROW; j++) {

        //starting point in height
        if(j==0){
          y=(height/2) - (ROW*side/2) + side;
        }else{
          y=y+side;
        }

        arrtiles[i][j] = new Module(i,j,x,y, side, 0, 0, gLevel);
      }
    }

    loadJSON('/getModule/'+id,(dataReceived)=>{

      module = dataReceived;
      
      for(let i=0;i<module.length;i++){
        arrtiles[module[i].posX][module[i].posY].moduleType = module[i].moduleType;

        arrtiles[module[i].posX][module[i].posY].deleted = module[i].deleted;

        if(module[i].gLevel!=gLevel && module[i].moduleType!=11)
        arrtiles[module[i].posX][module[i].posY].moduleType = 0;


      }
      draw_Grid();
    })
  }


  function draw_Grid(){
    for (let i = 0; i < arrtiles.length; i++) {

      for (let j = 0; j < arrtiles[i].length; j++) {
        if(gameState==2){
          if(arrtiles[i][j].gLevel==gLevel || arrtiles[i][j].moduleType==11)
            arrtiles[i][j].draw_Module()
        }else{
          push()
            noStroke()
            if((arrtiles[i][j].moduleType!=0 && arrtiles[i][j].deleted==0 && arrtiles[i][j].gLevel==gLevel) || arrtiles[i][j].moduleType==11)
              arrtiles[i][j].draw_Module()
          pop()
        }
      }
    }
  }


  function erase_Module(moduleId){

    let dataToSend={
      "moduleId":moduleId,
    }

    httpPost('/delModule',"json",dataToSend,(dataReceived)=>{
      draw_Grid()
  
    });
  }


  function getMCost(modType){
    loadJSON('/getMCost/'+modType,(dataReceived)=>{
      currMCost=dataReceived[0].matCost
      return dataReceived[0].matCost
    })
  }


  function place_module(index){
    gridEnable=true
    erasing=false
    moduleType=index
    currCCost=crewCost[index]
    currMCost=moduleCost[index]
  }


  function moduleColor(moduleType){ // Modules and their buttons have the same color
    let colorArray=[]
    
    let r
    let g
    let b
    switch(moduleType){
      case 0: // Empty Space
        r=219
        g=219
        b=219
        break
      
      case 1: // Money Production
        r=255
        g=228
        b=41
        break
      
      case 2: // Crew Capacity
        r=197
        g=97
        b=0
        break
      
      case 3: // Material Capacity
        r=61
        g=60
        b=214
        break
      
      case 4: // Ship Capacity
        r=26
        g=87
        b=7
        break
      
      case 5: // Ship Construction
        r=179
        g=156
        b=0
        break
      
      case 6: // Communications Relay
        r=0
        g=255
        b=110
        break
      
      case 7: // Research Station
        r=158
        g=56
        b=255
        break
      
      case 8: // Mission Control
        r=71
        g=196
        b=255
        break
      
      case 9: // Probe Constructor
        r=73
        g=97
        b=72
        break
      
      case 10: // Connectors
        r=100
        g=100
        b=100
        break
      
      case 11: // Starter Module
        r=87
        g=9
        b=9
        break
    }
    colorArray[0]=r
    colorArray[1]=g
    colorArray[2]=b
    return colorArray
  }
}


// v Map/Visit start v // ==================================================================================================================================================================================================================================
{

  function visitPlayer(vId){

    visiting=true
    gameState=1
    mapBtn.func=function(){
      main_scene_setup()
      mapBtn.func=map_scene
    }
    side=48
    create_Grid(vId)
  }


  function getPlayerMap(){

    let dataToSend={
      'playerId':playerId
    }
    httpPost('/getGalaxy','json',dataToSend,(dataReceived)=>{

      galaxyId=dataReceived.gId
      totalPlayers=dataReceived.totalPlayers
      mapSize=dataReceived.mapSize
      gLevel=dataReceived.gLevel
      mapGridSize= Math.round(displayArea.height/mapSize)

      loadJSON('/getCoords/'+galaxyId,(dataReceived)=>{

        displayArea.offsetX=width/2-(mapSize/2*mapGridSize)
        displayArea.offsetY=displayArea.topY

        for(let i=0; i<dataReceived.length; i++){
          playerMapArr[i]= new Player(dataReceived[i].pX, dataReceived[i].pY, dataReceived[i].playerId, dataReceived[i].active, mapGridSize, displayArea.offsetX,displayArea.offsetY)
        }
      })
    })
  }

  function drawMap(){
    image(testImg,0,0)
    for(let i=0; i<playerMapArr.length; i++){
      playerMapArr[i].draw_player(displayArea)
    }
    drawR()
  }


  function advanceGalaxy(){
    gLevel++

    let dataToSend={
      "gLevel":gLevel,
      "playerId":playerId
    }

    httpPost('/advanceGalaxy','json',dataToSend,(dataReceived)=>{

      loadJSON('/getPlaced/'+playerId,(dataReceived)=>{ // Get a list of how many modules of each type are built
        placedModule=[]
        playerMapArr=[]
        for(let i=0; i<dataReceived.length; i++){
          placedModule[i]=dataReceived[i].COUNT
        }

				researching=false
        changeScene()
        getMission()
        loadResource()
        getPlayerMap()
        getProbe()

        main_Scene()
      })

    })
  }
}