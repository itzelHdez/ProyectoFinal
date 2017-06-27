CREATE DATABASE DB_Journey;
/*-------Users------------------------------------------- */
CREATE TABLE Users (
    fName VARCHAR(50) NOT NULL,
    lName VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    passwrd VARCHAR(50) NOT NULL,
   	email VARCHAR(30) NOT NULL,
    birthday VARCHAR(30) NOT NULL, 
    country VARCHAR(30) NOT NULL
);

INSERT INTO Users(fName,lName,username,passwrd, email,birthday,country)
VALUES  ('Itzel', 'Hernandez',"itzel","itzel",'itzel@gmail.com',"10/10/1995","Mexico"),
		('Karla', 'Beltran',"karla","karla",'karla@gmail.com',"29/04/1993","Mexico"),
        ('Efren', 'Perez',"efren","efren",'efren@gmail.com',"10/01/1994","Colombia");

/*-------users_eventos---(Tabla intermedia)---------------------------------------- */
CREATE TABLE users_eventos (
    username_e VARCHAR(50) NOT NULL,
    eventName_e VARCHAR(50) NOT NULL
);
INSERT INTO users_eventos(username_e,eventName_e)
VALUES  ("itzel","Cerro de la Silla"),
        ("karla","Cerro de la Silla"),
		("efren","Buceo arrecifes");

/*-------Eventos------------------------------------------- */
CREATE TABLE Eventos (
    eventName VARCHAR(50) NOT NULL PRIMARY KEY,
    eventCat VARCHAR(50) NOT NULL,
    eDate VARCHAR(20) NOT NULL,
    eHour VARCHAR(20) NOT NULL,
    maxUsers INT NOT NULL,
    minUsers INT NOT NULL,
   	equipment VARCHAR(1000) NOT NULL,
    description VARCHAR(2000) NOT NULL,
    latitude VARCHAR(50) NOT NULL,
    longitude VARCHAR(50) NOT NULL
);

INSERT INTO Eventos(eventName,eventCat,eDate,eHour,maxUsers,minUsers,equipment,description,latitude,longitude)
VALUES  ('Cerro de la Silla', 'Hiking', '20/07/2017','7:00', 10, 2,'none','Subir el cerro de la silla y disfrutar de la hermosa vista','25.632579','-100.234716'),
		('Buceo arrecifes', 'Buceo','18/08/2017','10:00', 8, 4,'tanque de gas, goggles','Bucear en los arrecifes mas bellos de Cancún','21.152707','-86.809671');   

/*-------Comments------------------------------------------- */
CREATE TABLE Comments (
    id_comment INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
   	ucomment VARCHAR(2000) NOT NULL  
);

INSERT INTO Comments(username, ucomment)
VALUES  ('itzel', 'Es una excelente aplicacion para conocer amigos'),
		('karla','Me encanta conocer nuevos lugares en la naturaleza'),
		('efren','La aplicacion funciona de manera excelente'); 

/*-------Query------------------------------------------- */
SELECT eventName_e FROM users_eventos WHERE username=$id_user; 



