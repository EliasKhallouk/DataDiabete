import csv
import sys

#--------------------------------------------------
#Utilité: vérifier si il y a une "bonne ligne" (une ligne avec au minimum les noms de pays ou année)
#Paramètres: le fichier csv que l'on doit lire
#Retour: Si il y a une bonne ligne, true et le numéro de la ligne, false sinon
def verifIfBonneLigne(fichier_csv):
   tableau = motClesToTab('motscles.txt')
   fichier = open(fichier_csv,"r")
   cr = csv.reader( fichier,delimiter=";")
   cpt = 0
   for row in cr:
      ln = ""
      ligne = [element.upper() for element in row]
      for i in range(len(ligne)):
         ln = ln + ligne[i]
      for i in tableau:
         chaine = i
         if chaine.upper() in ln.upper():
            fichier.close()
            return True, cpt
      cpt = cpt + 1
   fichier.close()
   return False

#--------------------------------------------------
#Utilité: Vérifier si le fichier est bien un CSV
#Paramètres: Le fichier donné par l'utilisateur
#Retour: True si c'est un CSV, False sinon
def verifIfCSV(fichier):
   verifCSV = fichier[-4:]
   if (verifCSV != '.csv'):
      return False
   return True

#--------------------------------------------------
#Utilité: Vérifier si le fichier est bien présent (normalement inutile dans le js)
#Paramètres: le fichier donné en paramètre par l'utilisateur
#Retour: True si on arrive à ouvrir le fichier, False si le fichier n'est pas trouvé ou qu'une erreur inconnue est détectée en général
def verifIfFichierExistant(fichier_csv):
   try:
      fichier = open(fichier_csv,"r")
      return True
   except FileNotFoundError:
      print(f"Le fichier {fichier_csv} n'a pas été trouvé.")
      return False
   except Exception as e:
      print(f"Une erreur imprévue s'est produite : {e}")
      return False

#--------------------------------------------------
#Utilité: Convertir les mots clés (nom de pays, année, morts...) provenant d'un txt en un tableau exploitable facilement
#Paramètres: Un fichier txt (modifiable par l'admin ?)
#Retour: Un tableau de String
def motClesToTab(fichier_txt):
   with open(fichier_txt, 'r') as fichier:
      lignes = fichier.readlines()
   tableau = []
   for ligne in lignes:
       tableau.append(ligne.strip())
   return tableau

#--------------------------------------------------
#Utilité: Récupérer la ligne n sous forme d'un tableau de String
#Paramètres: le fichier ajouté par l'utilisateur et le numéro de la ligne
#Retour: Le tableau
def ligneN(fichier_csv, n):
   fichier = open(fichier_csv,"r")
   cr = csv.reader( fichier,delimiter=";")
   cpt = 0
   for row in cr:
      if cpt == n:
         tableau = []
         ligne = [element for element in row]
         txt = ""
         car = (len(ligne[0]))
         for i in range(car):
            if ligne[0][i] != "," and ligne[0][i] != ";":
               if (ligne[0][i] != '"'):
                  txt = txt + ligne[0][i]
            else:
               tableau.append(txt)
               txt = ""
         tableau.append(txt)
         return tableau
      else:
         cpt = cpt + 1

#--------------------------------------------------
#Utilité: Chercher une colonne avec son nom
#Paramètres: le tableau (la ligne qui est sensée contenir les noms utiles) et le tableau de mots clés fait avec motClesToTab
#Retour: la ligne i si on trouve une bonne colonne, False sinon
def chercheNomColonne(tableau, tableaumotscles):
   for mot_cle in tableaumotscles:
      for i, colonne in enumerate(tableau):
         if mot_cle.upper() in colonne.upper():
            return i
   return False

#--------------------------------------------------
#Utilité: chercher les colonnes contenant des années
#Paramètres: la ligne ou l'on sait qu'il y a les années
#Retour: Le tableau correspondant aux index (obsolète après refactoring), le tableau contenant les années et l'index des années
def chercheAnnees(ligneAnnees):
   tabIndex = []
   tabIndexGlobal = []
   tabAnnees = []
   index = 0
   indexGlobal = 0
   for i in ligneAnnees:
      #print(i)
      if i.isnumeric() or (i.count('.') == 1 and i.replace('.', '').replace('-', '').isdigit()):
         tabAnnees.append(i)
         tabIndexGlobal.append(indexGlobal)
         tabIndex.append(index)
         index = index + 1
      indexGlobal = indexGlobal + 1
   return tabIndex, tabAnnees, tabIndexGlobal

#--------------------------------------------------
#Utilité: Convertir un pays en ISO exploitable, peu importe ce que l'on donne (nom anglais, nom francais, iso numérique...)
#Paramètres: le csv contenant les pays, le pays à chercher, le tableau contenant le pays,l'index ou se trouve le pays
#Retour: si on trouve une correspondance via le nom anglais ou francais (plus simple), renvoyer True, si no trouve via in, renvoyer True aussi, False si on ne trouve rien
def convertirPays(pays_csv, pays, tab_fichier, tabN):
   fichier = open(pays_csv,"r")
   cr = csv.reader( fichier,delimiter=";")
   fichier_pays = open('PAYS.csv',"r")
   for row in cr:
      ligne = [element for element in row]
      car = (len(ligne[0]))
      txt = ""
      tableau = []
      for i in range(car):
         if ligne[0][i] != "," and ligne[0][i] != ";":
            if (ligne[0][i] != '"'):
               txt = txt + ligne[0][i]
         else:
            tableau.append(txt)
            txt = ""
      tableau.append(txt)
      if (pays == tableau[1] or pays == tableau[2] or pays.upper() in tableau[3]):
         return tableau[0]
   j = 0
   for ligne2 in fichier_pays:
      if j > 0:
         tab_pays = (ligneN('PAYS.csv', j))
         for k in range(len(tab_pays)):
            if (tab_fichier[tabN[0]].upper() in tab_pays[k].upper()):
               return j
      j = j + 1

   return False

#--------------------------------------------------
#Utilité: Savoir si element est un nombre ou non, en prenant en compte les "", '' et les séparateurs décimaux . ou ,
#Paramètres: l'element à tester
#Retour: True si c'est un nombre, False sinon
def est_nombre(element):
   element = element.replace("'", '').replace('"', '')
   return element.replace('.', '').replace('-', '').isdigit() or element.replace(',', '').replace('-', '').isdigit()

#--------------------------------------------------
#Utilité: Calculer le multiplicateur de modification
#Paramètres: la nouvelle donnee et la ligne contenant les donnees deja presentes
#Retour: Le multiplicateur ou None si on divise pas 0
def calculModification(donnees, ligne_existante):
    with open('report_deces.csv', 'r', newline='') as fichier_mort:
        reader = csv.reader(fichier_mort)
        lignes = list(reader)
    ligne_existante = ligne_existante - 1
    try:
        return (float(lignes[ligne_existante][2]) / float(donnees[2]))
    except ZeroDivisionError:
        #print("La moyenne de A et B est zéro.")
        return None

#--------------------------------------------------
#Utilité: Verifier si les données sont déjà presentes
#Paramètres: les donnees à moyenneModificationer
#Retour: Le numéro de la ligne si on trouve une correspondance, False en cas d'erreur et True si on ne trouve aucune correspondance
def donneesDejaPresentes(donnees):
    try:
        with open('report_deces.csv', "r", newline='', encoding='utf-8') as fichier:
            cr = csv.reader(fichier, delimiter=",")  # Modifier le délimiteur si nécessaire
            donnees_str = ",".join(map(str, donnees[:2]))
            for numero_ligne, ligne in enumerate(cr, start=1):
                ligne_str = ",".join(map(str, ligne[:2]))
                if ligne_str == donnees_str:
                    return numero_ligne
    except FileNotFoundError:
        print("Le fichier 'report_deces.csv' n'a pas été trouvé.")
        return False
    except Exception as e:
        print(f"Une exception s'est produite : {str(e)}")
        return False
    return True

#--------------------------------------------------
#TODO
#Utilité: 
#Paramètres: 
#Retour:
def ratio(nouvellesDonnees, a = 1, b = 1):
   fichier = open('report_population.csv',"r")
   cr = csv.reader( fichier,delimiter=";")
   for row in cr:
      ligne = [element for element in row]
      car = (len(ligne[0]))
      txt = ""
      tableau = []
      for i in range(car):
         if ligne[0][i] != "," and ligne[0][i] != ";":
            if (ligne[0][i] != '"'):
               txt = txt + ligne[0][i]
         else:
            tableau.append(txt)
            txt = ""
      tableau.append(txt)
      print(tableau)
      if nouvellesDonnees[0] == tableau[0]:
         nouvellesDonnees[2] = (float(nouvellesDonnees[2]) * a) * float(tableau[2]) / b
         #return nouvellesDonnees[2]
   #return False

#--------------------------------------------------
#Utilité: Calculer les données si il y a une colonne contenant les morts et une contenant l'année correspondante
#Paramètres: la ligne n contenant les noms de colonnes, le fichier csv et les différents index
#Retour: Les divers parametres a afficher à l'utilisateur
def calculDonneesSiMort(n, fichier_csv, tabN):
   ajoutDonnees = 0
   modificationDonnees = 0
   maxModification = 0.0
   totalModification = 0
   moyenneModification = 0
   fichier = open(fichier_csv,"r")
   fichier_mort = open('report_deces.csv', 'a', newline='')
   write = csv.writer(fichier_mort)
   i = 0
   for ligne in fichier:
      if i > n:
         tab = (ligneN(fichier_csv, i))
         #print(tab[0])
         pays = convertirPays('PAYS.csv', tab[tabN[0]])
         if pays != False and str(pays).isnumeric():
            nouvellesDonnees = [pays, tab[tabN[1]], tab[tabN[2]], 1]
            if donneesDejaPresentes(nouvellesDonnees) == True:
               ajoutDonnees = ajoutDonnees + 1
            else:
               nouvelleModif = calculModification(nouvellesDonnees, donneesDejaPresentes(nouvellesDonnees))
               if nouvelleModif != 1.0:
                  moyenneModification = moyenneModification + round(nouvelleModif, 2)
                  modificationDonnees = modificationDonnees + 1
                  if (nouvelleModif != None and abs(1 - nouvelleModif) > abs(1 - maxModification)):
                     maxModification = round(nouvelleModif, 2)
      i = i + 1
   if (modificationDonnees > 0):
      moyenneModification = round(moyenneModification / modificationDonnees, 2)
   #print("Nombre de nouvelles donnees: ", ajoutDonnees)
   #print("Nombre de modifications: ", modificationDonnees)
   #print("Multiplicateur maximal: x", maxModification)
   #print("Moyenne des multiplicateurs: x", moyenneModification)
   fichier.close()
   fichier_mort.close()
   return (ajoutDonnees, modificationDonnees, maxModification, moyenneModification)

#--------------------------------------------------
#Utilité: Calculer les données si chaque années correspondant a une colonne
#Paramètres: la ligne n contenant les noms de colonnes, le fichier csv et les différents index, les retour de chercheAnnees et la ligne correspondant aux noms
#Retour: Les divers parametres a afficher à l'utilisateur
def calculDonneesSiAnnees(n, fichier_csv, tabN, tabIndex, tabIndexGlobal, tabAnnees, ligne1):
   ajoutDonnees = 0
   modificationDonnees = 0
   maxModification = 0.0
   totalModification = 0
   moyenneModification = 0
   fichier_mort = open(fichier_csv,"r")
   fichier_mort_writer = open('report_deces.csv', 'a', newline='')
   write = csv.writer(fichier_mort_writer)
   fichier_pays = open('PAYS.csv',"r")
   i = 0
   for ligne1 in fichier_mort:
      if i > n:
         tab_fichier = (ligneN(fichier_csv, i))
         #print(tab_fichier[tabN[0]])
         pays = convertirPays('PAYS.csv', tab_fichier[tabN[0]], tab_fichier, tabN)
         if pays != False and str(pays).isnumeric():
            for j in range(len(tabIndex)):
               if est_nombre(tab_fichier[tabIndexGlobal[j]]):
                  nouvellesDonnees = [pays,tabAnnees[tabIndex[j]],tab_fichier[tabIndexGlobal[j]],1]
                  #TODO Ratio à implémenter plus tard (si j'y parviens)
                  #a = True
                  #if (a == True):
                  #   nouvellesDonnees = ratio(nouvellesDonnees, 1, 100)
                  #print(nouvellesDonnees)
                  if donneesDejaPresentes(nouvellesDonnees) == True:
                     #write.writerow(nouvellesDonnees)
                     ajoutDonnees = ajoutDonnees + 1
                  else:
                     nouvelleModif = calculModification(nouvellesDonnees, donneesDejaPresentes(nouvellesDonnees))
                     if nouvelleModif != 1.0 and nouvelleModif != None:
                        moyenneModification = moyenneModification + round(nouvelleModif, 2)
                        modificationDonnees = modificationDonnees + 1
                        #print(donneesDejaPresentes(nouvellesDonnees))
                        #print(calculModification(nouvellesDonnees, donneesDejaPresentes(nouvellesDonnees)))
                        if (abs(1 - nouvelleModif) > abs(1 - maxModification)):
                           #print(nouvellesDonnees)
                           #print(nouvellesDonnees)
                           maxModification = round(nouvelleModif, 2)
      i = i + 1
      fichier_pays.seek(0)
   if (modificationDonnees > 0):
      moyenneModification = round(moyenneModification / modificationDonnees, 2)
   #print("Nombre de nouvelles donnees: ", ajoutDonnees)
   #print("Nombre de modifications: ", modificationDonnees)
   #print("Multiplicateur maximal: x", maxModification)
   #print("Moyenne des multiplicateurs: x", moyenneModification)
   fichier_mort.close()
   fichier_mort_writer.close()
   fichier_pays.close()
   return (ajoutDonnees, modificationDonnees, maxModification, moyenneModification)

#--------------------------------------------------
#Utilité: Vérifier que le fichier est conforme et calculer les ajouts et les modifications
#Paramètres: /
#Retour: False si le fichier est mauvais, True sinon (avec les divers stats à afficher)
def prmg():
   if len(sys.argv) < 2:
      print("Pas d'argument")
      return False
   fichier = sys.argv[1]
   #Verifier si le fichier est bien un fichier csv
   if verifIfCSV(fichier) == False:
      print("Pas un csv")
      return False
   #Verifier si le fichier existe
   if verifIfFichierExistant(fichier) == False:
      return False
   #Verifier que le fichier a une "bonne ligne", si il en a une on la récupère
   moyenneModificationVerifIfBonneLigne, nLigne1 = verifIfBonneLigne(fichier)
   if moyenneModificationVerifIfBonneLigne == False:
      print("Pas de ligne utilisable")
      return False
   #On récupère la ligne des noms
   tab = (ligneN(fichier, nLigne1))
   #on cherche les colonnes précises pour les pays et pour les annees 
   motscles_pays = motClesToTab('motscles_pays.txt')
   nColonnePays = chercheNomColonne(tab, motscles_pays)
   motscles_annees = motClesToTab('motscles_annees.txt')
   nColonneAnnees = chercheNomColonne(tab, motscles_annees)
   #Intégrer les fonctions de calcul ?
   if (nColonneAnnees != False):
      #On récupère chaque années dans un pays
      motscles_mort = motClesToTab('motscles_mort.txt')
      nColonneMort = chercheNomColonne(tab, motscles_mort)
      tabColonnes = [nColonnePays, nColonneAnnees, nColonneMort]
      return True, calculDonneesSiMort(nLigne1, fichier, tabColonnes)
   else:
      tabIndex, tabAnnees, tabIndexGlobal = chercheAnnees(tab)
      tabColonnes = [nColonnePays]
      return True, calculDonneesSiAnnees(nLigne1, fichier, tabColonnes, tabIndex, tabIndexGlobal, tabAnnees, tab)

#ajoutDonnees --> Le nombre de données que le fichier ajouterait
#modificationDonnees --> Le nombre de modification que le fichier apporterait (si il y a une correspondance parfaite, n'incrémente pas)
#maxModification --> Le multiplicateur maximal entre deux valeurs (la valeur maximale de nouvelleDonnee/donneesDejaPresentes)
#moyenneModification --> La moyenne des multiplicateurs

print(prmg())