-- Suppression des tables
DROP TABLE IF EXISTS DROITS_DE_MENUS CASCADE;
DROP TABLE IF EXISTS ELEMENTS_DE_MENU CASCADE;
DROP TABLE IF EXISTS MENUS CASCADE;
DROP TABLE IF EXISTS DROITS_DE_GROUPES CASCADE;
DROP TABLE IF EXISTS DROITS CASCADE;
DROP TABLE IF EXISTS JOURNAUX_UTILISATEURS CASCADE;
DROP TABLE IF EXISTS MOTS_DE_PASSE_UTILISATEURS CASCADE;
DROP TABLE IF EXISTS UTILISATEURS CASCADE;
DROP TABLE IF EXISTS GROUPES CASCADE;

DROP TABLE IF EXISTS TRANCHE_AGE CASCADE;
DROP TABLE IF EXISTS SEXE CASCADE;
DROP TABLE IF EXISTS PAYS CASCADE;
DROP TABLE IF EXISTS DESCRIPTION CASCADE;

DROP TABLE IF EXISTS report_prix_ins CASCADE;
DROP TABLE IF EXISTS report_prix_ass CASCADE;
DROP TABLE IF EXISTS report_diabetique CASCADE;
DROP TABLE IF EXISTS report_deces CASCADE;



-- Création des tables
CREATE TABLE GROUPES (
                         Id SERIAL PRIMARY KEY,
                         Groupe VARCHAR(255)
);

CREATE TABLE UTILISATEURS (
                              User_Id SERIAL PRIMARY KEY,
                              First_Name VARCHAR(255),
                              Last_Name VARCHAR(255),
                              Date_Created TIMESTAMP,
                              Password VARCHAR(255),
                              Group_Id INTEGER REFERENCES GROUPES(Id)
);

CREATE TABLE MOTS_DE_PASSE_UTILISATEURS(
                                           Id SERIAL PRIMARY KEY,
                                           User_Id INTEGER REFERENCES UTILISATEURS(User_Id),
                                           Date_Created TIMESTAMP,
                                           Password VARCHAR(255)
);

CREATE TABLE JOURNAUX_UTILISATEURS(
                                      Id SERIAL PRIMARY KEY,
                                      User_Id INTEGER REFERENCES UTILISATEURS(User_Id),
                                      Date_Time TIMESTAMP,
                                      Event VARCHAR(255)
);

CREATE TABLE DROITS(
                       Id SERIAL PRIMARY KEY,
                       Right_Name VARCHAR(255)
);

CREATE TABLE DROITS_DE_GROUPES(
                                  Id SERIAL PRIMARY KEY,
                                  Group_Id INTEGER REFERENCES GROUPES(Id),
                                  Right_Id INTEGER REFERENCES DROITS(Id)
);

CREATE TABLE MENUS(
                      Id SERIAL PRIMARY KEY,
                      Nom_Menu VARCHAR(255) NOT NULL,
                      Ordre_Affichage INTEGER NOT NULL
);

CREATE TABLE ELEMENTS_DE_MENU(
                                 Id SERIAL PRIMARY KEY,
                                 Nom_Element VARCHAR(255) NOT NULL,
                                 Lien VARCHAR(255),
                                 Menu_Id INTEGER REFERENCES MENUS(Id) ON DELETE CASCADE,
                                 Ordre_Affichage INTEGER NOT NULL
);

CREATE TABLE DROITS_DE_MENUS(
                                Id SERIAL PRIMARY KEY,
                                Group_Id INTEGER NOT NULL REFERENCES GROUPES(Id),
                                Menu_Id INTEGER REFERENCES MENUS(Id) ON DELETE CASCADE,
                                Element_Id INTEGER REFERENCES ELEMENTS_DE_MENU(Id)
);


CREATE TABLE IF NOT EXISTS DESCRIPTION(
                                          Id_Description SERIAL PRIMARY KEY,
                                          Description TEXT
);

CREATE TABLE IF NOT EXISTS PAYS(
                                   Id_Pays SERIAL PRIMARY KEY,
                                   Libelle_Pays VARCHAR(255) NOT NULL,
    ISO_Pays_Num INTEGER,
    ISO_Pays_Car VARCHAR(255)
    );

CREATE TABLE IF NOT EXISTS SEXE(
                                   Code_Sexe SERIAL PRIMARY KEY,
                                   Libelle_Sexe VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS TRANCHE_AGE(
                                          Id_Tranche SERIAL PRIMARY KEY,
                                          Age_Mini INTEGER NOT NULL,
                                          Age_Maxi INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS report_deces(
    Id_Pays INTEGER REFERENCES PAYS(Id_Pays),
    Annee DATE,
    Nbr_Morts INTEGER,
    PRIMARY KEY (Id_Pays, Annee)
    );


CREATE TABLE IF NOT EXISTS report_diabetique(
    Id_Pays INTEGER REFERENCES PAYS(Id_Pays),
    Code_Sexe INTEGER REFERENCES SEXE(Code_Sexe),
    Id_Tranche INTEGER REFERENCES TRANCHE_AGE(Id_Tranche),
    Annee DATE,
    Nbr_Diabetique INTEGER,
    PRIMARY KEY (Id_Pays, Code_Sexe, Id_Tranche, Annee)
    );

CREATE TABLE IF NOT EXISTS report_prix_ass(
    Id_Pays INTEGER REFERENCES PAYS(Id_Pays),
    Annee DATE,
    Prix_Assurance DECIMAL(15, 2),
    PRIMARY KEY (Id_Pays, Annee)
    );

CREATE TABLE IF NOT EXISTS report_prix_ins(
    Id_Pays INTEGER REFERENCES PAYS(Id_Pays),
    Annee DATE,
    Prix_Insuline DECIMAL(15, 2),
    PRIMARY KEY (Id_Pays, Annee)
    );



INSERT INTO GROUPES (Groupe) VALUES ('Administrateurs');
INSERT INTO GROUPES (Groupe) VALUES ('Éditeurs');
INSERT INTO GROUPES (Groupe) VALUES ('Visiteurs');
INSERT INTO GROUPES (Groupe) VALUES ('Externe');
INSERT INTO UTILISATEURS (First_Name, Last_Name, Date_Created, Password, Group_Id) VALUES ('Joseph', 'Azar', NOW(), 'joseph123', 1);
INSERT INTO UTILISATEURS (First_Name, Last_Name, Date_Created, Password, Group_Id) VALUES ('Milvyne', 'Perrolet', NOW(), 'milvyne123', 2);
INSERT INTO UTILISATEURS (First_Name, Last_Name, Date_Created, Password, Group_Id) VALUES ('Stephane', 'Domas', CURRENT_TIMESTAMP, 'vuejs123', NULL);
INSERT INTO UTILISATEURS (First_Name, Last_Name, Date_Created, Password, Group_Id) VALUES ('Karine', 'Deschinkel', CURRENT_TIMESTAMP, 'karine123', (SELECT Id FROM GROUPES WHERE Groupe = 'Visiteurs'));

INSERT INTO UTILISATEURS (First_Name, Last_Name, Date_Created, Password) VALUES ('Utilisateur', 'Anonyme', NOW(), 'anonyme123');


INSERT INTO MOTS_DE_PASSE_UTILISATEURS (User_Id, Date_Created, Password) VALUES (1, NOW(), 'josephSecurePass');
INSERT INTO MOTS_DE_PASSE_UTILISATEURS (User_Id, Date_Created, Password) VALUES (2, NOW(), 'milvyneSecurePass');
INSERT INTO MOTS_DE_PASSE_UTILISATEURS (User_Id, Date_Created, Password) VALUES (3, NOW(), 'anonymeSecurePass');

INSERT INTO DROITS (Right_name) VALUES ('Créer');
INSERT INTO DROITS (Right_name) VALUES ('Lire');
INSERT INTO DROITS (Right_name) VALUES ('Mettre à jour');
INSERT INTO DROITS (Right_name) VALUES ('Supprimer');


INSERT INTO DROITS_DE_GROUPES (Group_Id, Right_Id) VALUES (1, 1);
INSERT INTO DROITS_DE_GROUPES (Group_Id, Right_Id) VALUES (1, 2);
INSERT INTO DROITS_DE_GROUPES (Group_Id, Right_Id) VALUES (1, 3);
INSERT INTO DROITS_DE_GROUPES (Group_Id, Right_Id) VALUES (1, 4); -- Admins can do everything
INSERT INTO DROITS_DE_GROUPES (Group_Id, Right_Id) VALUES (2, 2); -- Éditeurs can read
INSERT INTO DROITS_DE_GROUPES (Group_Id, Right_Id) VALUES (2, 3); -- Éditeurs can update

INSERT INTO JOURNAUX_UTILISATEURS (User_Id, Date_Time, Event) VALUES (1, NOW(), 'Connexion réussie');
INSERT INTO JOURNAUX_UTILISATEURS (User_Id, Date_Time, Event) VALUES (2, NOW(), 'Connexion échouée');

INSERT INTO MENUS (Nom_Menu, Ordre_Affichage) VALUES ('Menu Principal', 1);
INSERT INTO MENUS (Nom_Menu, Ordre_Affichage) VALUES ('Paramètres', 2);

INSERT INTO ELEMENTS_DE_MENU (Nom_Element, Lien, Menu_Id, Ordre_Affichage) VALUES ('Accueil', '/accueil', 1, 1);
INSERT INTO ELEMENTS_DE_MENU (Nom_Element, Lien, Menu_Id, Ordre_Affichage) VALUES ('Contact', '/contact', 1, 2);

INSERT INTO ELEMENTS_DE_MENU (Nom_Element, Lien, Menu_Id, Ordre_Affichage) VALUES ('Compte', '/compte', 2, 1);

INSERT INTO DROITS_DE_MENUS (Group_Id, Menu_Id, Element_Id) VALUES (1, 1, 1);
INSERT INTO DROITS_DE_MENUS (Group_Id, Menu_Id, Element_Id) VALUES (1, 1, 2);
INSERT INTO DROITS_DE_MENUS (Group_Id, Menu_Id, Element_Id) VALUES (1, 2, 3);

INSERT INTO DROITS_DE_MENUS (Group_Id, Menu_Id, Element_Id) VALUES (2, 1, 1);


INSERT INTO MOTS_DE_PASSE_UTILISATEURS (User_Id, Date_Created, Password) VALUES (1, '2022-01-10 10:00:00', 'josephOldPass1');
INSERT INTO MOTS_DE_PASSE_UTILISATEURS (User_Id, Date_Created, Password) VALUES (1, '2022-06-15 10:00:00', 'josephOldPass2');
INSERT INTO MOTS_DE_PASSE_UTILISATEURS (User_Id, Date_Created, Password) VALUES (2, '2022-03-22 10:00:00', 'milvyneOldPass1');
INSERT INTO MOTS_DE_PASSE_UTILISATEURS (User_Id, Date_Created, Password) VALUES (2, '2022-08-30 10:00:00', 'milvyneOldPass2');

INSERT INTO JOURNAUX_UTILISATEURS (User_Id, Date_Time, Event) VALUES (1, '2022-01-10 10:15:00', 'Changement de mot de passe');
INSERT INTO JOURNAUX_UTILISATEURS (User_Id, Date_Time, Event) VALUES (1, '2022-05-12 09:00:00', 'Connexion réussie');
INSERT INTO JOURNAUX_UTILISATEURS (User_Id, Date_Time, Event) VALUES (1, '2022-06-15 11:00:00', 'Changement de mot de passe');
INSERT INTO JOURNAUX_UTILISATEURS (User_Id, Date_Time, Event) VALUES (1, '2022-12-25 18:30:00', 'Connexion réussie');

INSERT INTO JOURNAUX_UTILISATEURS (User_Id, Date_Time, Event) VALUES (2, '2022-03-22 14:20:00', 'Changement de mot de passe');
INSERT INTO JOURNAUX_UTILISATEURS (User_Id, Date_Time, Event) VALUES (2, '2022-07-08 10:45:00', 'Tentative de connexion échouée');
INSERT INTO JOURNAUX_UTILISATEURS (User_Id, Date_Time, Event) VALUES (2, '2022-08-30 16:00:00', 'Changement de mot de passe');
INSERT INTO JOURNAUX_UTILISATEURS (User_Id, Date_Time, Event) VALUES (2, '2022-09-15 10:00:00', 'Connexion réussie');
INSERT INTO JOURNAUX_UTILISATEURS (User_Id, Date_Time, Event) VALUES (3, '2022-11-05 20:30:00', 'Tentative de connexion échouée');


-- Insertions pour la table DESCRIPTION
INSERT INTO DESCRIPTION (Description) VALUES ('Description 1');
INSERT INTO DESCRIPTION (Description) VALUES ('Description 2');

-- Insertions pour la table PAYS
INSERT INTO PAYS (Libelle_Pays, ISO_Pays_Num, ISO_Pays_Car) VALUES ('France', 250, 'FR');
INSERT INTO PAYS (Libelle_Pays, ISO_Pays_Num, ISO_Pays_Car) VALUES ('Canada', 124, 'CA');

-- Insertions pour la table SEXE
INSERT INTO SEXE (Libelle_Sexe) VALUES ('Homme');
INSERT INTO SEXE (Libelle_Sexe) VALUES ('Femme');

-- Insertions pour la table TRANCHE_AGE
INSERT INTO TRANCHE_AGE (Age_Mini, Age_Maxi) VALUES (0, 17);
INSERT INTO TRANCHE_AGE (Age_Mini, Age_Maxi) VALUES (18, 64);
INSERT INTO TRANCHE_AGE (Age_Mini, Age_Maxi) VALUES (65, 99);

-- Insertions pour la table report_deces
INSERT INTO report_deces (Id_Pays, Annee, Nbr_Morts) VALUES (1, '2022-01-01', 100);
INSERT INTO report_deces (Id_Pays, Annee, Nbr_Morts) VALUES (2, '2022-01-01', 50);

-- Insertions pour la table report_diabetique
INSERT INTO report_diabetique (Id_Pays, Code_Sexe, Id_Tranche, Annee, Nbr_Diabetique) VALUES (1, 1, 1, '2022-01-01', 200);
INSERT INTO report_diabetique (Id_Pays, Code_Sexe, Id_Tranche, Annee, Nbr_Diabetique) VALUES (2, 2, 2, '2022-01-01', 100);

-- Insertions pour la table report_prix_ass
INSERT INTO report_prix_ass (Id_Pays, Annee, Prix_Assurance) VALUES (1, '2022-01-01', 5000.50);
INSERT INTO report_prix_ass (Id_Pays, Annee, Prix_Assurance) VALUES (2, '2022-01-01', 4500.75);

-- Insertions pour la table report_prix_ins
INSERT INTO report_prix_ins (Id_Pays, Annee, Prix_Insuline) VALUES (1, '2022-01-01', 100.25);
INSERT INTO report_prix_ins (Id_Pays, Annee, Prix_Insuline) VALUES (2, '2022-01-01', 80.50);
