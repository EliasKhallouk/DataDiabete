DROP TABLE IF EXISTS DROITS_DE_MENU, ELEMENTS_DE_MENU, MENUS, DROITS_DE_GROUPES, DROITS, MOTS_DE_PASSE_UTILISATEURS, UTILISATEURS, GROUPES, TRANCHE_AGE, SEXE, PAYS, DESCRIPTION CASCADE;
DROP TABLE IF EXISTS report_prix_ins, report_prix_ass, report_diabetique, report_deces CASCADE;

CREATE TABLE GROUPES (
  Id_Groupe SERIAL PRIMARY KEY,
  Libelle_Groupe VARCHAR(255)
);

CREATE TABLE UTILISATEURS (
  Id_User SERIAL PRIMARY KEY
  Nom VARCHAR(255),
  Prenom VARCHAR(255),
  email VARCHAR(255),
  Password VARCHAR(255),
  Date_Creation TIMESTAMP,
  Id_Groupe INTEGER REFERENCES GROUPES(Id_groupe)
);

CREATE TABLE MOTS_DE_PASSE_UTILISATEURS (
  Id_mdp SERIAL PRIMARY KEY,
  Id_User INTEGER REFERENCES UTILISATEURS(Id_User),
  Date_Created TIMESTAMP,
  Password VARCHAR(255)
);

CREATE TABLE DROITS (
  Id_droit SERIAL PRIMARY KEY,
  Libbelle_droit VARCHAR(255)
);

CREATE TABLE DROITS_DE_GROUPES (
  Id SERIAL PRIMARY KEY,
  Id_Groupe INTEGER REFERENCES GROUPES(Id_Groupe),
  Id_droit INTEGER REFERENCES DROITS(Id_droit)
);

CREATE TABLE MENUS (
  Id_Menu SERIAL PRIMARY KEY,
  Nom_Menu VARCHAR(255) NOT NULL,
  Ordre_Affichage INTEGER NOT NULL
);

CREATE TABLE ELEMENTS_DE_MENU (
  Id_element SERIAL PRIMARY KEY,
  Nom_Menu VARCHAR(255) NOT NULL,
  Ordre_Affichage INTEGER NOT NULL,
  Lien VARCHAR(255),
  Id_Menu INTEGER REFERENCES MENUS(Id_Menu) ON DELETE CASCADE
);

CREATE TABLE DROITS_DE_MENU (
  Id SERIAL PRIMARY KEY,
  Id_Groupe INTEGER REFERENCES GROUPES(Id_Groupe) ON DELETE CASCADE,
  Id_Menu INTEGER REFERENCES MENUS(Id_Menu) ON DELETE CASCADE,
  Id_element INTEGER REFERENCES ELEMENTS_DE_MENU(Id_element) ON DELETE CASCADE
);

CREATE TABLE DESCRIPTION(
  Id_Description SERIAL PRIMARY KEY,
  Description TEXT
);

CREATE TABLE PAYS(
  Id_Payx SERIAL PRIMARY KEY,
  Libelle_Pays VARCHAR(255),
  Nbr_Habitants INTEGER,
  ISO_Pays_Num INTEGER,
  ISO_Pays_Car VARCHAR(255),
);

CREATE TABLE SEXE(
  Code_Sexe SERIAL PRIMARY KEY,
  Libelle_Sexe VARCHAR(255)
);

CREATE TABLE TRANCHE_AGE(
  Id_Tranche SERIAL PRIMARY KEY,
  Age_Mini INTEGER NOT NULL,
  Age_Maxi INTEGER NOT NULL
);

CREATE TABLE report_deces(
  Id_Pays INTEGER REFERENCES PAYS(Id_Pays) PRIMARY KEY,
  Annee DATE PRIMARY KEY,
  Nbr_Morts INTEGER
);

CREATE TABLE report_diabetique(
  Id_Pays INTEGER REFERENCES PAYS(Id_Pays) PRIMARY KEY,
  Code_Sexe INTEGER REFERENCES SEXE(Code_Sexe) PRIMARY KEY,
  Id_Tranche INTEGER REFERENCES TRANCHE_AGE(Id_Tranche) PRIMARY KEY,
  Annee DATE,
  Nbr_Diabetique INTEGER
);

CREATE TABLE report_population(
  Id_Pays INTEGER REFERENCES PAYS(Id_Pays) PRIMARY KEY,
  Annee DATE PRIMARY KEY,
  Nbr_Habitants INTEGER
);

CREATE TABLE report_prix_ass(
  Id_Pays INTEGER REFERENCES PAYS(Id_Pays) PRIMARY KEY,
  Annee DATE PRIMARY KEY,
  Prix_Assurance DECIMAL(15, 2)
);

CREATE TABLE report_prix_ins(
  Id_Pays REFERENCES PAYS(Id_Pays) PRIMARY KEY,
  Annee DATE PRIMARY KEY,
  Prix_Insuline DECIMAL(15, 2)
);