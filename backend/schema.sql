create table if not exists temas_actuales (
    id integer,
    nombre varchar(100),
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES boliches (id)
);


create table if not exists boliches (
    id integer not null AUTO_INCREMENT,
    nombre varchar(100) not null,
    latitud varchar(100) not null,
    longitud varchar(100) not null,
    PRIMARY KEY (id)
);

