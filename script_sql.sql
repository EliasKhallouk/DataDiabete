DROP TABLE IF EXISTS report_prix_ins, report_prix_ass, report_diabetique, report_deces;
DROP TABLE IF EXISTS TRANCHE_AGE, SEXE, PAYS, DESCRIPTION;


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