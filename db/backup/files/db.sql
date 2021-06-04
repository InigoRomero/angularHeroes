CREATE TABLE IF NOT EXISTS heroes(
    idHeroe integer AUTO_INCREMENT PRIMARY KEY,
    name CHAR(30) NOT NULL,
    weapon CHAR(50),
    city CHAR(30),
    description CHAR(255)
);

CREATE TABLE IF NOT EXISTS villain(
    idVillain integer AUTO_INCREMENT PRIMARY KEY,
    name CHAR(30) NOT NULL,
    weapon CHAR(50),
    idHeroe int,
    description CHAR(255),
    CONSTRAINT FK_idHeroe FOREIGN KEY (idHeroe)
    REFERENCES heroes(idHeroe)
);

INSERT INTO heroes(name, weapon, city , description)
    VALUES('Iron man', 'Iron nuclear armor', 'Madrid', 'A millionaire businessman builds an armored suit and uses it to fight crime and terrorism.');

INSERT INTO heroes(name, weapon, city , description)
    VALUES('Thor', 'hummer', 'Asgard', 'semi god comes from another world to have a good time');

INSERT INTO villain(name, weapon, description, idHeroe)
    VALUES('Hackerman', 'her laptop', ' a super hacker trained to hack Iron man', 1);

INSERT INTO villain(name, weapon, description, idHeroe)
    VALUES('Loki', 'magic', 'thors brother', 2);