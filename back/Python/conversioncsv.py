import csv

def cherchePremiereLigne(fichier_csv, tableau):
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
            return cpt
      cpt = cpt + 1
   fichier.close()
   return False

def motClesToTab(fichier_txt):
   with open(fichier_txt, 'r') as fichier:
      lignes = fichier.readlines()
   tableau = []

   for ligne in lignes:
       tableau.append(ligne.strip())

   return tableau

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


def chercheNomColonne(tableau, tableaumotscles):
    for mot_cle in tableaumotscles:
        for i, colonne in enumerate(tableau):
            if mot_cle.upper() in colonne.upper():
                return i

    return False


def donneesDejaPresentes(fichier_csv, donnees):
    try:
        # Ouvrir le fichier CSV en mode lecture
        with open(fichier_csv, "r", newline='', encoding='utf-8') as fichier:
            # Créer un lecteur CSV
            cr = csv.reader(fichier, delimiter=";")

            # Convertir les deux premiers éléments des données en une chaîne pour la comparaison
            donnees_str = ",".join(donnees[:2])

            # Parcourir chaque ligne du fichier
            for numero_ligne, ligne in enumerate(cr, start=1):
                # Convertir les deux premiers éléments de la ligne en une chaîne pour la comparaison
                ligne_str = ",".join(ligne[:2])

                # Vérifier si les deux premiers éléments des données sont présents au début de la ligne

                #print(ligne_str, " ----- ", donnees_str)

                if ligne_str.startswith(donnees_str):
                    #print(f"Les données sont déjà présentes dans le fichier à la ligne {numero_ligne}.")
                    return numero_ligne

    except FileNotFoundError:
        #print("Le fichier CSV spécifié n'a pas été trouvé.")
        return False

    except Exception as e:
        #print(f"Une erreur s'est produite : {e}")
        return False

    return True


def convertirPays(pays_csv, pays):
   fichier = open(pays_csv,"r")
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
      if (pays == tableau[1] or pays == tableau[2] or pays.upper() in tableau[3]):
         return tableau[0]

def modifierDonnees(fichier_mort_csv, donnees, ligne_existante):
    # Lire le fichier existant
    with open(fichier_mort_csv, 'r', newline='') as fichier_mort:
        reader = csv.reader(fichier_mort)
        lignes = list(reader)


    ligne_existante = ligne_existante - 1

    moyenne = (float(lignes[ligne_existante][2]) / float(lignes[ligne_existante][3]) + float(donnees[2])) / (float(lignes[ligne_existante][3]) + 1)
    lignes[ligne_existante][2] = str(moyenne)
    lignes[ligne_existante][3] = str(int(lignes[ligne_existante][3]) + 1)

    with open(fichier_mort_csv, 'w', newline='') as fichier_mort:
        writer = csv.writer(fichier_mort)
        writer.writerows(lignes)

def pourcentageDonnee(nouvellesDonnees):
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

      if (nouvellesDonnees[0] == tableau[0] and nouvellesDonnees[1] == tableau[1] ):
         nouvellesDonnees[2] = float(nouvellesDonnees[2]) * float(tableau[2]) / 100
         return nouvellesDonnees[2]
   return False

def ecrireDonneesSiMort(n, fichier_csv, fichier_mort_csv, tabN):
   fichier = open(fichier_csv,"r")
   fichier_mort = open(fichier_mort_csv, 'a', newline='')
   write = csv.writer(fichier_mort)

   i = 0

   for ligne in fichier:
      if i > n:
         tab = (ligneN(fichier_csv, i))
         #print(tab[0])
         pays = convertirPays('PAYS.csv', tab[tabN[0]])
         if pays != None:
            nouvellesDonnees = [pays, tab[tabN[1]], tab[tabN[2]], 1]

            #print(pays, "-----", tab[tabN[1]], "-----", tab[tabN[2]])
            #print(donneesDejaPresentes(fichier_mort_csv, nouvellesDonnees))
            if donneesDejaPresentes(fichier_mort_csv, nouvellesDonnees) == True:
               write.writerow(nouvellesDonnees)
            else:
               modifierDonnees(fichier_mort_csv, nouvellesDonnees, donneesDejaPresentes(fichier_mort_csv, nouvellesDonnees))
      i = i + 1

   fichier.close()
   fichier_mort.close()

def ecrireDonneesSiAnnee(n, fichier_csv, fichier_mort_csv, tabN, tabIndex, tabAnnees, ligne1):
   fichier = open(fichier_csv,"r")
   fichier_mort = open(fichier_mort_csv, 'a', newline='')
   write = csv.writer(fichier_mort)

   i = 0

   for ligne in fichier:
      if i > n:
         tab = (ligneN(fichier_csv, i))
         #print(tab[0])
         pays = convertirPays('PAYS.csv', tab[tabN[0]])
         if pays != None:
            for j in range(len(tabIndex)):
               if (tab[tabIndex[j]].replace('.', '').isdigit() or (tab[tabIndex[j]].count('.') == 1 and tab[tabIndex[j]].replace('.', '').replace('-', '').isdigit())):
                  nouvellesDonnees = [pays, ligne1[tabIndex[j]], tab[tabIndex[j]], 1]

                  a = False

                  if (a == True):
                     nouvellesDonnees[2] = pourcentageDonnee(nouvellesDonnees)

                  if donneesDejaPresentes(fichier_mort_csv, nouvellesDonnees) == True:
                     write.writerow(nouvellesDonnees)
                  else:
                     a = 0
                     modifierDonnees(fichier_mort_csv, nouvellesDonnees, donneesDejaPresentes(fichier_mort_csv, nouvellesDonnees))
      i = i + 1

   fichier.close()
   fichier_mort.close()

def chercheAnnees(ligneAnnees):
    tabIndex = []
    tabAnnees = []
    index = 0
    for i in ligneAnnees:
        if i.isnumeric() or (i.count('.') == 1 and i.replace('.', '').replace('-', '').isdigit()):
            tabAnnees.append(i)
            tabIndex.append(index)
        index += 1

    return tabIndex, tabAnnees


fichier = 'fichier2.csv'
#On récupère les mots clés de base que l'on stock dans un tableau
motscles = motClesToTab('motscles.txt')
#On recherche la ligne qui correspond aux noms de colonnes via les mots clés
nLigne1 = cherchePremiereLigne(fichier, motscles)
#id on trouve une ligne qui y correspond
if (cherchePremiereLigne != False):
   #on récupère la ligne des noms
   tab = (ligneN(fichier, nLigne1))
   #on cherche le nom du pays
   motscles_pays = motClesToTab('motscles_pays.txt')
   nColonnePays = chercheNomColonne(tab, motscles_pays)
   motscles_annees = motClesToTab('motscles_annees.txt')
   nColonneAnnees = chercheNomColonne(tab, motscles_annees)
   if (nColonneAnnees != False):
      motscles_mort = motClesToTab('motscles_mort.txt')
      nColonneMort = chercheNomColonne(tab, motscles_mort)
      tabColonnes = [nColonnePays, nColonneAnnees, nColonneMort]
      ecrireDonneesSiMort(nLigne1, fichier, 'report_deces.csv', tabColonnes)
   else:
      tabIndex, tabAnnees = chercheAnnees(tab)
      tabColonnes = [nColonnePays]
      ecrireDonneesSiAnnee(nLigne1, fichier, 'report_deces.csv', tabColonnes, tabIndex, tabAnnees, tab)
#Colonne du pays récupéré, à voir maintenant pour les morts