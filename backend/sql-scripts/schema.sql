drop table votos_propuestas;
drop table temas_propuestos;
drop table temas_boliches;
drop table likes;
drop table boliches;
drop table temas;


create table if not exists temas (
    id              integer                                                         not null        AUTO_INCREMENT,
    nombre          varchar(100)    CHARACTER SET utf8 COLLATE utf8_general_ci      not null,
    album_art_url   varchar(400)    CHARACTER SET utf8 COLLATE utf8_general_ci      null,
    color           varchar(20)                                                     null,
    PRIMARY KEY (id)
);


create table if not exists boliches (
    id                  integer         not null AUTO_INCREMENT,
    nombre              varchar(100)    CHARACTER SET utf8 COLLATE utf8_general_ci      not null,
    longitud            varchar(100)    CHARACTER SET utf8 COLLATE utf8_general_ci      not null,
    latitud             varchar(100)    CHARACTER SET utf8 COLLATE utf8_general_ci      not null,
    id_tema_actual      integer         null,
    PRIMARY KEY (id),
    FOREIGN KEY (id_tema_actual) REFERENCES temas (id)
);


create table if not exists likes (
    id                          integer     not null    AUTO_INCREMENT,
    id_boliche                  integer     not null,
    id_tema                     integer     not null, 
    fecha_hora                  timestamp   not null,
    tipo_like                   varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci  CHECK (tipo_like IN ('like','not-like')),
    PRIMARY KEY (id),
    FOREIGN KEY (id_tema) REFERENCES temas (id),
    FOREIGN KEY (id_boliche) REFERENCES boliches (id)
);

create table if not exists temas_boliches (
    id                          integer     not null    AUTO_INCREMENT,
    id_boliche                  integer     not null,
    id_tema                     integer     not null,
    fecha_hora                  timestamp   not null,
    PRIMARY KEY (id),
    FOREIGN KEY (id_tema) REFERENCES temas (id),
    FOREIGN KEY (id_boliche) REFERENCES boliches (id)
);

create table if not exists temas_propuestos (
    id                          integer     not null    AUTO_INCREMENT,
    nombre                      varchar(100)    CHARACTER SET utf8 COLLATE utf8_general_ci      not null,
    PRIMARY KEY (id)
);

create table if not exists votos_propuestas (
    id                          integer     not null    AUTO_INCREMENT,
    id_boliche                  integer     not null,
    id_tema                     integer     not null, 
    fecha_hora                  timestamp   not null,
    PRIMARY KEY (id),
    FOREIGN KEY (id_tema) REFERENCES temas (id),
    FOREIGN KEY (id_boliche) REFERENCES boliches (id)
);
