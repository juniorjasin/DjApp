INSERT INTO temas (nombre, album_art_url)
VALUES ("Criminal - Natti Natasha & Ozuna", "http://akamai-b.cdn.cddbp.net/cds/2.0/cover/D174/8057/3477/5D14_medium_front.jpg?cid=1452299036");

INSERT INTO temas (nombre, album_art_url)
VALUES ("Mayores - Becky G Feat. Bad Bunny", "http://akamai-b.cdn.cddbp.net/cds/2.0/cover/4D7C/CF81/1EB8/4D2F_medium_front.jpg?cid=1452299036");

INSERT INTO temas (nombre, album_art_url)
VALUES ("Mi Gente - J Balvin", "");

INSERT INTO temas (nombre, album_art_url)
VALUES ("Me Reh�so - Danny Ocean", "http://akamai-b.cdn.cddbp.net/cds/2.0/cover/20A5/1FD0/E756/04C0_medium_front.jpg?cid=1452299036");

INSERT INTO temas (nombre, album_art_url)
VALUES ("Bailame - Nacho", "http://akamai-b.cdn.cddbp.net/cds/2.0/cover/4ADF/B16A/9BE2/F5E6_medium_front.jpg?cid=1452299036");

INSERT INTO temas (nombre, album_art_url)
VALUES ("3 A.M.", "http://akamai-b.cdn.cddbp.net/cds/2.0/cover/AD23/7D13/3A9D/5B47_medium_front.jpg?cid=1452299036");


INSERT INTO boliches (id, nombre, latitud, longitud, id_tema_actual)
VALUES (1, "Get Me",  "-31.337332", "-64.256521", null);

INSERT INTO boliches (id, nombre, latitud, longitud, id_tema_actual)
VALUES (2, "Cuba INC",  "-32.337332", "-65.256521", null);

INSERT INTO boliches (id, nombre, latitud, longitud, id_tema_actual)
VALUES (3, "Felipa",  "-33.337332", "-66.256521", null);

INSERT INTO boliches (id, nombre, latitud, longitud, id_tema_actual)
VALUES (4, "Jet Lag",  "-34.337332", "-67.256521", null);

INSERT INTO boliches (id, nombre, latitud, longitud, id_tema_actual)
VALUES (5, "Distrikt",  "-35.337332", "-68.256521", null);



INSERT INTO likes (id_boliche, id_tema, tipo_like)
VALUES (1, 1, "like");

INSERT INTO likes (id_boliche, id_tema, tipo_like)
VALUES (1, 1, "not-like");

INSERT INTO likes (id_boliche, id_tema, tipo_like)
VALUES (1, 1, "like");




INSERT INTO temas_boliches (id_boliche, id_tema)
VALUES (1, 1);

INSERT INTO temas_boliches (id_boliche, id_tema)
VALUES (1, 1);

INSERT INTO temas_boliches (id_boliche, id_tema)
VALUES (1, 1);




INSERT INTO temas_propuestos (id, nombre)
VALUES (1, "tema1");

INSERT INTO temas_propuestos (id, nombre)
VALUES (2, "tema2");

INSERT INTO temas_propuestos (id, nombre)
VALUES (3, "tema3");




INSERT INTO votos_propuestas (id_boliche, id_tema)
VALUES (1, 1);

INSERT INTO votos_propuestas (id_boliche, id_tema)
VALUES (1, 2);

INSERT INTO votos_propuestas (id_boliche, id_tema)
VALUES (1, 3);

INSERT INTO votos_propuestas (id_boliche, id_tema)
VALUES (2, 1);

INSERT INTO votos_propuestas (id_boliche, id_tema)
VALUES (3, 1);