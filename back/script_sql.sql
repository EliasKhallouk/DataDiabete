-- Désactivation temporaire des contraintes de clé étrangère
SET foreign_key_checks = 0;

-- Suppression des données dans les tables référencées
DROP TABLE IF EXISTS report_diabetique;
DROP TABLE IF EXISTS report_population;
DROP TABLE IF EXISTS report_prix_ass;
DROP TABLE IF EXISTS report_prix_ins;
DROP TABLE IF EXISTS report_deces;

-- Suppression des tables
DROP TABLE IF EXISTS TRANCHE_AGE, SEXE, PAYS, DESCRIPTION;

-- Réactivation des contraintes de clé étrangère
SET foreign_key_checks = 1;

CREATE TABLE DESCRIPTION(
   id_description INT AUTO_INCREMENT,
   description TEXT,
   PRIMARY KEY(id_description)
);

CREATE TABLE PAYS(
   id_pays INT AUTO_INCREMENT,
   libelle_pays VARCHAR(50) NOT NULL,
   nbr_habitants INT,
   ISO_pays_num INT NOT NULL,
   ISO_pays_car VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_pays)
);

CREATE TABLE SEXE(
   code_sexe INT AUTO_INCREMENT,
   libelle_sexe VARCHAR(50),
   PRIMARY KEY(code_sexe)
);

CREATE TABLE TRANCHE_AGE(
   id_tranche INT AUTO_INCREMENT,
   age_mini INT NOT NULL,
   age_maxi INT NOT NULL,
   PRIMARY KEY(id_tranche)
);

CREATE TABLE report_deces(
   id_pays INT,
   annee DATE,
   nbr_morts INT,
   PRIMARY KEY(id_pays, annee),
   FOREIGN KEY(id_pays) REFERENCES PAYS(id_pays)
);

CREATE TABLE report_diabetique(
   id_pays INT,
   code_sexe INT,
   id_tranche INT,
   annee DATE,
   nbr_diabetique INT,
   PRIMARY KEY(id_pays, code_sexe, id_tranche, annee),
   FOREIGN KEY(id_pays) REFERENCES PAYS(id_pays),
   FOREIGN KEY(code_sexe) REFERENCES SEXE(code_sexe),
   FOREIGN KEY(id_tranche) REFERENCES TRANCHE_AGE(id_tranche)
);

CREATE TABLE report_population(
   id_pays INT,
   annee DATE,
   nbr_habitants INT,
   PRIMARY KEY(id_pays, annee),
   FOREIGN KEY(id_pays) REFERENCES PAYS(id_pays)
);

CREATE TABLE report_prix_ass(
   id_pays INT,
   annee DATE,
   prix_assurance DECIMAL(15,2),
   PRIMARY KEY(id_pays, annee),
   FOREIGN KEY(id_pays) REFERENCES PAYS(id_pays)
);

CREATE TABLE report_prix_ins(
   id_pays INT,
   annee DATE,
   prix_insuline DECIMAL(15,2),
   PRIMARY KEY(id_pays, annee),
   FOREIGN KEY(id_pays) REFERENCES PAYS(id_pays)
);

-- Insertion dans la table DESCRIPTION
INSERT INTO DESCRIPTION (description) VALUES
  ('Description 1'),
  ('Description 2'),
  ('Description 3');

-- Insertion dans la table PAYS
INSERT INTO PAYS (libelle_pays, nbr_habitants, ISO_pays_num, ISO_pays_car) VALUES
  ('Pays 1', 1000000, 1, 'ISO1'),
  ('Pays 2', 2000000, 2, 'ISO2'),
  ('Pays 3', 3000000, 3, 'ISO3');

-- Insertion dans la table SEXE
INSERT INTO SEXE (libelle_sexe) VALUES
  ('Masculin'),
  ('Féminin'),
  ('Autre');

-- Insertion dans la table TRANCHE_AGE
INSERT INTO TRANCHE_AGE (age_mini, age_maxi) VALUES
  (0, 18),
  (19, 30),
  (31, 50);

-- Insertion dans la table report_deces
INSERT INTO report_deces (id_pays, annee, nbr_morts) VALUES
  (1, '2022-01-01', 100),
  (2, '2022-01-01', 150),
  (3, '2022-01-01', 200);

-- Insertion dans la table report_diabetique
INSERT INTO report_diabetique (id_pays, code_sexe, id_tranche, annee, nbr_diabetique) VALUES
  (1, 1, 1, '2022-01-01', 50),
  (2, 2, 2, '2022-01-01', 75),
  (3, 1, 3, '2022-01-01', 100);

-- Insertion dans la table report_population
INSERT INTO report_population (id_pays, annee, nbr_habitants) VALUES
  (1, '2022-01-01', 1000000),
  (2, '2022-01-01', 2000000),
  (3, '2022-01-01', 3000000);

-- Insertion dans la table report_prix_ass
INSERT INTO report_prix_ass (id_pays, annee, prix_assurance) VALUES
  (1, '2022-01-01', 500.00),
  (2, '2022-01-01', 600.00),
  (3, '2022-01-01', 700.00);

-- Insertion dans la table report_prix_ins
INSERT INTO report_prix_ins (id_pays, annee, prix_insuline) VALUES
  (1, '2022-01-01', 50.00),
  (2, '2022-01-01', 60.00),
  (3, '2022-01-01', 70.00);
