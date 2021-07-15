SELECT * FROM stargrazer.resource;
SELECT * FROM stargrazer.mission;
SELECT * FROM stargrazer.mission_state;
select * from stargrazer.module;
select * from stargrazer.galaxy;



# ^	Template tables for resources and missions ^
SELECT * FROM stargrazer.player;
SELECT * FROM stargrazer.player_galaxy;
SELECT * FROM stargrazer.player_friends;
SELECT * FROM stargrazer.player_resource;
SELECT * FROM stargrazer.player_mission;
select * from stargrazer.player_module;
SELECT * FROM stargrazer.player_mission where playerId=1 and state!=3;
# ^ Shows created entities ^


delete from player; ALTER TABLE player AUTO_INCREMENT = 0;
delete from player_galaxy; ALTER TABLE player_galaxy AUTO_INCREMENT = 0;
delete from player_friends; ALTER TABLE player_friends AUTO_INCREMENT = 0;
delete from player_resource; ALTER TABLE player_resource AUTO_INCREMENT = 0;
delete from player_mission; ALTER TABLE player_mission AUTO_INCREMENT = 0;
delete from player_module; ALTER TABLE player_module AUTO_INCREMENT = 0;
delete from galaxy; ALTER TABLE galaxy AUTO_INCREMENT = 0;
# ^ Resets entity tables ^


# <!> never DELETE FROM template tables, pain in the ass <!>