INSERT INTO temas (id, nombre)
VALUES (1, "tema1");

INSERT INTO temas (id, nombre)
VALUES (2, "tema2");

INSERT INTO temas (id, nombre)
VALUES (3, "tema3");



INSERT INTO boliches (id, nombre, latitud, longitud, id_tema_actual)
VALUES (1, "boliche1",  "-31.337332", "-64.256521", null);

INSERT INTO boliches (id, nombre, latitud, longitud, id_tema_actual)
VALUES (2, "boliche2",  "-32.337332", "-65.256521", null);

INSERT INTO boliches (id, nombre, latitud, longitud, id_tema_actual)
VALUES (3, "boliche3",  "-33.337332", "-66.256521", null);



INSERT INTO likes (id_boliche, id_tema, tipo_like)
VALUES (1, 1, "like");

INSERT INTO likes (id_boliche, id_tema, tipo_like)
VALUES (1, 1, "not-like");

INSERT INTO likes (id_boliche, id_tema, tipo_like)
VALUES (1, 1, "like");


INSERT INTO temas_boliches (id_boliche, id_tema)
VALUES (1, 2);

INSERT INTO temas_boliches (id_boliche, id_tema)
VALUES (1, 1);

INSERT INTO temas_boliches (id_boliche, id_tema)
VALUES (1, 1);