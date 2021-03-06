create table if not exists temas (
    id integer,
    nombre varchar(100),
    PRIMARY KEY (id)
);


create table if not exists boliches (
    id                  integer     not null AUTO_INCREMENT,
    nombre              varchar(100) not null,
    latitud             varchar(100) not null,
    longitud            varchar(100) not null,
    id_tema_actual      integer      null,
    PRIMARY KEY (id),
    FOREIGN KEY (id_tema_actual) REFERENCES temas (id)
);


create table if not exists likes (
    id                          integer     not null    AUTO_INCREMENT,
    id_boliche                  integer     not null,
    id_tema                     integer     not null, 
    fecha_hora                  timestamp   not null,
    tipo_like                   varchar(8)  CHECK (tipo_like IN ('like','not-like')),
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


SELECT * FROM  (SELECT id_tema FROM temas_boliches WHERE id_boliche = 1 ORDER BY id DESC LIMIT 1) as q JOIN temas ON q.id_tema = temas.id
