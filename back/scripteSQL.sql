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
DROP TABLE IF EXISTS CONTINENT CASCADE;
DROP TABLE IF EXISTS DESCRIPTION CASCADE;

DROP TABLE IF EXISTS report_prix_ins CASCADE;
DROP TABLE IF EXISTS report_prix_ass CASCADE;
DROP TABLE IF EXISTS report_diabetique CASCADE;
DROP TABLE IF EXISTS report_deces CASCADE;

DROP TABLE IF EXISTS UTILISATEURSWANTADD CASCADE;

DROP TABLE IF EXISTS MODIFURL CASCADE;
DROP TABLE IF EXISTS MODIFTEXT CASCADE;


-- Création des tables
CREATE TABLE GROUPES (
    Id SERIAL PRIMARY KEY,
    Groupe VARCHAR(255)
);

CREATE TABLE UTILISATEURS (
    User_Id SERIAL PRIMARY KEY,
    First_Name VARCHAR(255),
    Last_Name VARCHAR(255),
    Mail VARCHAR(255),
    Date_Created TIMESTAMP,
    Password VARCHAR(255),
    Group_Id INTEGER REFERENCES GROUPES(Id)
);

CREATE TABLE MOTS_DE_PASSE_UTILISATEURS(
    Id SERIAL PRIMARY KEY,
    User_Id INTEGER REFERENCES UTILISATEURS(User_Id) ON DELETE CASCADE,
    Date_Created TIMESTAMP,
    Password VARCHAR(255)
);

CREATE TABLE JOURNAUX_UTILISATEURS(
    Id SERIAL PRIMARY KEY,
    User_Id INTEGER REFERENCES UTILISATEURS(User_Id) ON DELETE CASCADE,
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


CREATE TABLE IF NOT EXISTS CONTINENT(
    Id_Continent SERIAL PRIMARY KEY,
    Libelle_continent_en VARCHAR(255) NOT NULL,
    Libelle_continent_fr VARCHAR(255) NOT NULL,
    ISO VARCHAR(4)
);

CREATE TABLE IF NOT EXISTS PAYS(
    Id_Pays SERIAL PRIMARY KEY,
    Libelle_pays_en VARCHAR(255) NOT NULL,
    Libelle_pays_fr VARCHAR(255) NOT NULL,
    ISO_pays_num INTEGER,
    ISO_pays_car1 VARCHAR(255),
    ISO_pays_car2 VARCHAR(255),
    Développement_non_oui BOOLEAN,
    Continent_id INTEGER REFERENCES CONTINENT(Id_Continent)
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
    Annee INTEGER,
    Nbr_Morts DECIMAL(20, 2),
    PRIMARY KEY (Id_Pays,Annee)
);


CREATE TABLE IF NOT EXISTS report_diabetique(
    Id_Pays INTEGER REFERENCES PAYS(Id_Pays),
    Annee INTEGER,
    Nbr_Diabetique NUMERIC(20, 2),
    Code_Sexe INTEGER REFERENCES SEXE(Code_Sexe),
    PRIMARY KEY (Id_Pays, Annee, Nbr_Diabetique, Code_Sexe)
);

CREATE TABLE IF NOT EXISTS report_prix_ass(
    Id_Pays INTEGER REFERENCES PAYS(Id_Pays),
    Annee INTEGER,
    Prix_Assurance DECIMAL(15, 2),
    PRIMARY KEY (Id_Pays, Annee)
);

CREATE TABLE IF NOT EXISTS report_prix_ins(
    Id_Pays INTEGER REFERENCES PAYS(Id_Pays),
    Annee INTEGER,
    Prix_Insuline DECIMAL(15, 2),
    PRIMARY KEY (Id_Pays, Annee)
);

CREATE TABLE IF NOT EXISTS report_population(
    Id_Pays INTEGER REFERENCES  PAYS(Id_Pays),
    Annee INTEGER,
    Nbr_Habitants INTEGER,
    Nbr_Ajout INTEGER,
    PRIMARY KEY(Id_Pays, Annee)
);

CREATE TABLE IF NOT EXISTS UTILISATEURSWANTADD(
    id_user_want_add SERIAL PRIMARY KEY,
    id_user_add INTEGER
);

CREATE TABLE IF NOT EXISTS MODIFURL(
    id_url SERIAL PRIMARY KEY,
    chemin VARCHAR(255),
    id_user_add INTEGER
);

CREATE TABLE IF NOT EXISTS MODIFTEXT (
    id_text SERIAL PRIMARY KEY,
    text_accueil VARCHAR(20000),
    id_user_add INTEGER
);

-- COPY report_deces FROM 'Python/report_deces.csv' WITH CSV HEADER;
-- COPY report_population FROM 'Python/report_population.csv' WITH CSV HEADER;

-- Déclaration des variables pour les chemins relatifs
/*DO $$
    DECLARE
        current_folder VARCHAR(255);
    BEGIN
        -- Construction du chemin relatif du dossier courant
        SELECT substring(pg_backend_current_query() from '.*from ''(.*)/[^/]+\.sql''') INTO current_folder;

        -- Utilisez EXECUTE pour construire dynamiquement la commande COPY
        EXECUTE 'COPY PAYS(Libelle_pays_en, Libelle_pays_fr, ISO_pays_num, ISO_pays_car1, ISO_pays_car2) FROM ''' || current_folder || '/Python/PAYS.csv'' DELIMITER '','' CSV HEADER;';
    END;
$$;*/









INSERT INTO GROUPES (Groupe) VALUES ('Administrateurs');
INSERT INTO GROUPES (Groupe) VALUES ('Éditeurs');
INSERT INTO UTILISATEURS (First_Name, Last_Name, Mail, Date_Created, Password, Group_Id) VALUES ('Joseph', 'Azar', 'azarjoseph@gmail.com', NOW(), 'joseph123', 1);
INSERT INTO UTILISATEURS (First_Name, Last_Name, Mail, Date_Created, Password, Group_Id) VALUES ('Milvyne', 'Perrolet', 'milvyneperrolet@gmail.com', NOW(), 'milvyne123', 2);
INSERT INTO UTILISATEURS (First_Name, Last_Name, Mail, Date_Created, Password, Group_Id) VALUES ('Stephane', 'Domas', 'stephanedomas@gmail.com', CURRENT_TIMESTAMP, 'vuejs123', NULL);
INSERT INTO UTILISATEURS (First_Name, Last_Name, Mail, Date_Created, Password, Group_Id) VALUES ('Karine', 'Deschinkel', 'karinedeshinkel@gmail.com', CURRENT_TIMESTAMP, 'karine123', (SELECT Id FROM GROUPES WHERE Groupe = 'Visiteurs'));

INSERT INTO UTILISATEURS (First_Name, Last_Name, Mail, Date_Created, Password) VALUES ('Utilisateur', 'Anonyme', 'anonyme@gmail.com', NOW(), 'anonyme123');


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
INSERT INTO DROITS_DE_GROUPES (Group_Id, Right_Id) VALUES (2, 2); -- Éditeurs can readv
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
-- INSERT INTO PAYS (Libelle_Pays, ISO_Pays_Num, ISO_Pays_Car) VALUES ('France', 250, 'FR');
-- INSERT INTO PAYS (Libelle_Pays, ISO_Pays_Num, ISO_Pays_Car) VALUES ('Canada', 124, 'CA');

    --DEUX SOLUTIONS POSSIBLE:
        -- LIGNE A ENTRER DANS LE TERMINAL :
            --\copy PAYS(Libelle_pays_en, Libelle_pays_fr, ISO_pays_num, ISO_pays_car1, ISO_pays_car2) FROM 'Python/PAYS.csv' WITH DELIMITER ',' CSV HEADER
        -- LIGNE A LAISSER DANS LE CODE MAIS METTRE LE CHEMINS ABSOLUE :
COPY PAYS(Libelle_pays_en, Libelle_pays_fr, ISO_pays_num, ISO_pays_car1, ISO_pays_car2, Développement_non_oui, Continent_id) FROM '/home/userdepinfo/A2/SAE/DataDiabete/back/Python/PAYS.csv' DELIMITER ',' CSV HEADER;
COPY CONTINENT(Libelle_continent_en, Libelle_continent_fr, ISO) FROM '/home/userdepinfo/A2/SAE/DataDiabete/back/Python/CONTINENT.csv' DELIMITER ',' CSV HEADER;


--COPY PAYS FROM 'PAYS.csv' WITH CSV DELIMITER ',' SKIP 1;
/*LOAD DATA INFILE 'PAYS.csv'
INTO TABLE PAYS
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;*/

-- Insertions pour la table SEXE
INSERT INTO SEXE (code_sexe,Libelle_Sexe) VALUES (1,'Homme');
INSERT INTO SEXE (code_sexe,Libelle_Sexe) VALUES (0,'Femme');

-- Insertions pour la table TRANCHE_AGE
INSERT INTO TRANCHE_AGE (Age_Mini, Age_Maxi) VALUES (0, 17);
INSERT INTO TRANCHE_AGE (Age_Mini, Age_Maxi) VALUES (18, 64);
INSERT INTO TRANCHE_AGE (Age_Mini, Age_Maxi) VALUES (65, 99);

-- Insertions pour la table report_deces
    --DEUX SOLUTIONS POSSIBLE:
        -- LIGNE A ENTRER DANS LE TERMINAL :
            --\copy report_deces(Id_Pays, Annee, Nbr_Morts)  FROM 'Python/report_deces.csv' WITH CSV HEADER;
        -- LIGNE A LAISSER DANS LE CODE MAIS METTRE LE CHEMINS ABSOLUE :
            COPY report_deces(Id_Pays, Annee, Nbr_Morts)  FROM '/home/userdepinfo/A2/SAE/DataDiabete/back/Python/report_deces.csv' WITH CSV HEADER;


-- Insertions pour la table report_diabetique
    --DEUX SOLUTIONS POSSIBLE:
        -- LIGNE A ENTRER DANS LE TERMINAL :
            --\copy report_diabetique(Id_Pays, Annee, Nbr_Diabetique,Code_Sexe)  FROM 'Python/report_diabetique.csv' WITH CSV HEADER;
        -- LIGNE A LAISSER DANS LE CODE MAIS METTRE LE CHEMINS ABSOLUE :
            COPY report_diabetique(Id_Pays, Annee, Nbr_Diabetique,Code_Sexe)  FROM '/home/userdepinfo/A2/SAE/DataDiabete/back/Python/report_diabetique.csv' WITH CSV HEADER;


-- Insertions pour la table report_prix_ass
-- INSERT INTO report_prix_ass (Id_Pays, Annee, Prix_Assurance) VALUES (1, 2022, 5000.50);
-- INSERT INTO report_prix_ass (Id_Pays, Annee, Prix_Assurance) VALUES (2, 2022, 4500.75);

-- Insertions pour la table report_prix_ins
-- INSERT INTO report_prix_ins (Id_Pays, Annee, Prix_Insuline) VALUES (1, 2022, 100.25);
--- INSERT INTO report_prix_ins (Id_Pays, Annee, Prix_Insuline) VALUES (2, 2022, 80.50);

-- Insertions pour la table MODIFURL
INSERT INTO MODIFURL VALUES (1, '/front/src/assets/carte2.jpg',1);
INSERT INTO MODIFURL VALUES (2, '/front/src/assets/diagramme.png',1);
INSERT INTO MODIFURL VALUES (3, '/front/src/assets/histogramme.jpg',1);

-- Insertions pour la table MODIFTEXT
INSERT INTO MODIFTEXT VALUES (1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',1);




CREATE OR REPLACE FUNCTION prevent_last_admin_delete()
RETURNS TRIGGER AS $$
DECLARE
    admin_count INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO admin_count
    FROM UTILISATEURS
    WHERE Group_Id = OLD.Group_Id AND User_Id <> OLD.User_Id AND User_Id IN (
        SELECT u.User_Id
        FROM UTILISATEURS u
        JOIN DROITS_DE_GROUPES dg ON u.Group_Id = dg.Group_Id
        JOIN DROITS d ON dg.Right_Id = d.Id
        WHERE d.Right_Name = 'Créer'
    );

    IF admin_count = 0 THEN
        RAISE EXCEPTION 'Impossible de supprimer le dernier admin du groupe';
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_last_admin
BEFORE DELETE ON UTILISATEURS
FOR EACH ROW
EXECUTE FUNCTION prevent_last_admin_delete();
