# Script to create all the current tables

create database stargrazer;

use stargrazer;

create table player(
	playerId int not null auto_increment,
    name text,
    pass text,
    mapX int,
    mapY int,
    gLevel int,
    research bool,
    probe bool,
    music int,
    sound int,
    primary key (playerId)
);


create table player_resource(
	Id int not null auto_increment,
    PlayerId int not null,
    CurrentAmount int,
    MaxAmount int,
    ResourceType int,
    inUse int,
    primary key (Id)
);

create table resource(
	resourceId int not null auto_increment,
    resourceName text,
    primary key (resourceId)
);

create table mission(
	id int not null auto_increment,
    maxTime int not null,
    minTime int not null,
    maxReward int not null,
    minReward int not null,
    minChance int not null,
    primary key(id)
);

create table player_mission(
	missionId int not null auto_increment,
    playerId int not null,
    resourceType int,
    reward int,
    duration int,
    successChance int,
    failTime int,
    missionType int,
    state int,
    startDay int,
    startHour int,
    startMin int,
    primary key (missionId)
);

create table player_galaxy(
	p_gId int not null auto_increment,
    galaxyId int,
    playerId int,
    active bool,
    pX int,
    pY int,
    primary key(p_gId)
);

create table mission_state(
	missionStateId int not null auto_increment,
    stateName text,
    primary key(missionStateId)
);

create table galaxy(
	galaxyId int not null auto_increment,
    gLevel int,
    squareCycle int,
    totalPlayers int,
    currPlayers int,
    mapSize int,
    researching int,
    isFound bool,
    totalPoints int,
    currPoints int,
    primary key (galaxyId)
);

CREATE TABLE player_friends(
	requestId INT NOT NULL AUTO_INCREMENT,
	requestFrom TEXT NOT NULL,
	requestTo TEXT NOT NULL ,
	accepted int DEFAULT 0, 
	PRIMARY KEY (requestId)
);

create table player_module(
	moduleId int not null auto_increment,
    PlayerId int not null,
    posX int,
    posY int,
    moduleType int,
    deleted int,
    gLevel int,
	primary key (moduleId)
);

create table module(
	moduleId int not null auto_increment,
    moduleName text,
    matCost int,
    crewCost int,
    effect int,
    maxPlace int,
    primary key (moduleId)
);


#Insert the values to the template tables
insert into mission_state (stateName) VALUES ("Displayed");
insert into mission_state (stateName) VALUES ("Active");
insert into mission_state (stateName) VALUES ("Discarded");
insert into mission_state (stateName) VALUES ("Failed");
insert into mission_state (stateName) VALUES ("Completed");
insert into mission_state (stateName) VALUES ("toFail");


insert into mission (maxTime, minTime, maxReward, minReward, minChance) VALUES (15, 5, 250, 100, 80);
insert into mission (maxTime, minTime, maxReward, minReward, minChance) VALUES (30, 15, 500, 250, 65);
insert into mission (maxTime, minTime, maxReward, minReward, minChance) VALUES (60, 30, 1000, 500, 50);


insert into resource (resourceName) VALUES ("Money");
insert into resource (resourceName) VALUES ("Crew");
insert into resource (resourceName) VALUES ("Materials");
insert into resource (resourceName) VALUES ("Ships");


insert into module (moduleName,matCost,crewCost,effect,maxPlace) VALUES ("Money Production",50,25,50,10);
insert into module (moduleName,matCost,crewCost,effect,maxPlace) VALUES ("Crew Capacity",500,30,250,5);
insert into module (moduleName,matCost,crewCost,effect,maxPlace) VALUES ("Materials Capacity",300,50,500,5);
insert into module (moduleName,matCost,crewCost,effect,maxPlace) VALUES ("Ships Capacity",500,50,1,3);
insert into module (moduleName,matCost,crewCost,effect,maxPlace) VALUES ("Ship Constructor",150,75,1,5);
insert into module (moduleName,matCost,crewCost,effect,maxPlace) VALUES ("Communications Relay",250,115,null,1);
insert into module (moduleName,matCost,crewCost,effect,maxPlace) VALUES ("Research Station",1000,175,null,1);
insert into module (moduleName,matCost,crewCost,effect,maxPlace) VALUES ("Mission Control",100,15,null,1);
insert into module (moduleName,matCost,crewCost,effect,maxPlace) VALUES ("Probe Constructor",2000,200,null,1);