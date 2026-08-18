import { link, text } from "./blocks";
import type { ContentSection } from "./types";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  relatedGuides: string[];
  relatedProducts: string[];
  sections: ContentSection[];
};

export const guides: Guide[] = [
  {
    slug: "qu-est-ce-que-le-matcha",
    title: "Qu'est-ce que le matcha ?",
    description:
      "Origines, culture japonaise et différences entre matcha cérémonie et matcha culinaire. Tout comprendre sur cette poudre de thé vert.",
    readingTime: "6 min",
    publishedAt: "2026-01-15",
    updatedAt: "2026-08-16",
    keywords: [
      "matcha",
      "thé vert japonais",
      "matcha cérémonie",
      "origine matcha",
    ],
    relatedGuides: [
      "preparer-le-matcha",
      "conservation-matcha",
      "bienfaits-matcha",
      "matcha-bio",
      "comment-choisir-son-matcha",
      "recettes-matcha-cuisine",
    ],
    relatedProducts: ["matcha-ceremonie", "matcha-culinaire"],
    sections: [
      {
        heading: "Une poudre de thé vert millénaire",
        content: [
          text(
            "Le matcha est une poudre fine obtenue à partir de feuilles de théier ombragées, broyées à la pierre. Contrairement au thé infusé, on consomme la feuille entière, ce qui concentre les nutriments et la caféine."
          ),
        ],
      },
      {
        heading: "Cérémonie ou cuisine ?",
        content: [
          text("Le "),
          link("/produits/matcha-ceremonie", "matcha de cérémonie"),
          text(
            " (ceremonial grade) est récolté au printemps, plus doux et umami. Le "
          ),
          link("/produits/matcha-culinaire", "matcha culinaire"),
          text(
            " (culinary grade) est plus robuste, idéal pour les lattes, smoothies et pâtisseries. Pour des idées concrètes en cuisine, consultez nos "
          ),
          link(
            "/guide/recettes-matcha-cuisine",
            "recettes au matcha"
          ),
          text("."),
        ],
      },
      {
        heading: "Comment reconnaître un bon matcha",
        content: [
          text(
            "Couleur vert émeraude vif, odeur herbacée fraîche, texture fine sans grains. Un matcha jaunâtre ou amer indique souvent une qualité inférieure ou une mauvaise conservation — voir notre guide sur la "
          ),
          link("/guide/conservation-matcha", "conservation du matcha"),
          text(". Pour la dégustation, consultez notre guide "),
          link("/guide/preparer-le-matcha", "comment préparer le matcha"),
          text(". Pour un conseil d'achat complet, consultez notre guide "),
          link(
            "/guide/comment-choisir-son-matcha",
            "comment choisir son matcha"
          ),
          text("."),
        ],
      },
      {
        heading: "Matcha bio : une alternative responsable",
        content: [
          text(
            "Le label bio garantit une culture sans pesticides de synthèse et un cahier des charges strict. Cela ne remplace pas les critères de qualité gustative — couleur, finesse, origine — mais rassure sur les pratiques agricoles. Pour tout comprendre sur la certification et les différences avec le matcha conventionnel, lisez notre guide "
          ),
          link("/guide/matcha-bio", "matcha bio"),
          text("."),
        ],
      },
    ],
  },
  {
    slug: "preparer-le-matcha",
    title: "Comment préparer le matcha",
    description:
      "Méthode traditionnelle au chasen, matcha latte et erreurs courantes. Le guide complet pour une tasse parfaite.",
    readingTime: "5 min",
    publishedAt: "2026-01-20",
    updatedAt: "2026-08-18",
    keywords: ["préparer matcha", "chasen", "matcha latte", "recette matcha"],
    relatedGuides: [
      "qu-est-ce-que-le-matcha",
      "recette-matcha-latte",
      "conservation-matcha",
      "bienfaits-matcha",
    ],
    relatedProducts: ["matcha-ceremonie", "matcha-latte"],
    sections: [
      {
        heading: "La méthode traditionnelle",
        content: [
          text("Tamisez 1 à 2 g de "),
          link("/produits/matcha-ceremonie", "matcha de cérémonie"),
          text(
            " dans un bol (chawan). Ajoutez 70 ml d'eau à 75–80 °C — jamais bouillante. Fouettez en M avec un chasen pendant 20 secondes jusqu'à obtenir une mousse fine."
          ),
        ],
      },
      {
        heading: "Le matcha latte maison",
        content: [
          text(
            "Préparez d'abord le matcha concentré (2 g + 30 ml d'eau chaude) avec un "
          ),
          link("/produits/matcha-latte", "blend matcha latte"),
          text(
            ". Versez sur 200 ml de lait végétal chauffé (avoine ou amande). Ajoutez un filet de miel si souhaité. Pour une recette détaillée avec dosages, variantes chaudes et iced, consultez notre "
          ),
          link("/guide/recette-matcha-latte", "recette matcha latte"),
          text("."),
        ],
      },
      {
        heading: "Les erreurs à éviter",
        content: [
          text(
            "Eau trop chaude (amer), matcha non tamisé (grumeaux), conservation inadéquate (oxydation). Pour tout savoir sur le stockage — récipient, frigo, durée de vie — consultez notre guide "
          ),
          link("/guide/conservation-matcha", "conservation du matcha"),
          text(
            ". Pour en savoir plus sur les différences de qualité, lisez "
          ),
          link("/guide/qu-est-ce-que-le-matcha", "qu'est-ce que le matcha"),
          text("."),
        ],
      },
    ],
  },
  {
    slug: "recette-matcha-latte",
    title: "Recette matcha latte maison",
    description:
      "Recette simple de matcha latte : dosages, lait végétal, mousse parfaite. Version chaude et iced, avec ou sans sucre.",
    readingTime: "6 min",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
    keywords: [
      "recette matcha latte",
      "matcha latte maison",
      "matcha latte",
      "latte matcha",
    ],
    relatedGuides: [
      "preparer-le-matcha",
      "comment-choisir-son-matcha",
      "bienfaits-matcha",
    ],
    relatedProducts: ["matcha-latte"],
    sections: [
      {
        heading: "Ingrédients et dosages",
        content: [
          text(
            "Pour un matcha latte classique, prévoyez 2 g de matcha (environ 1 cuillère à café rase), 30 ml d'eau chaude (75–80 °C), 200 ml de lait végétal ou entier et un sucrant optionnel (miel, sirop d'érable ou sucre de coco). Un "
          ),
          link("/produits/matcha-latte", "blend matcha latte"),
          text(
            " est formulé pour ce ratio : mousse épaisse et équilibre sucré-umami sans ajout de sucre. Tamisez toujours le matcha avant utilisation pour éviter les grumeaux."
          ),
        ],
      },
      {
        heading: "Recette chaude pas à pas",
        content: [
          text(
            "1. Tamisez 2 g de matcha dans un bol ou un shaker. 2. Ajoutez 30 ml d'eau à 75–80 °C et fouettez en M avec un chasen pendant 15 secondes, ou secouez vigoureusement dans un shaker 30 secondes. 3. Chauffez 200 ml de lait (sans le faire bouillir) — avoine pour la crème, amande pour la légèreté, lait entier pour plus de richesse. 4. Versez le matcha concentré dans une tasse, ajoutez le lait chaud et mélangez. 5. Sucrez à votre goût. Pour les bases de préparation, consultez aussi notre guide "
          ),
          link("/guide/preparer-le-matcha", "comment préparer le matcha"),
          text("."),
        ],
      },
      {
        heading: "Version iced (matcha latte glacé)",
        content: [
          text(
            "Préparez le matcha concentré comme pour la version chaude, mais avec 30 ml d'eau tiède (pas bouillante). Remplissez un grand verre de glaçons, versez le matcha, puis ajoutez 200 ml de lait froid — avoine ou amande fonctionnent très bien. Secouez ou remuez avant de boire. L'iced latte est idéal en été et met en valeur la couleur vert émeraude du matcha."
          ),
        ],
      },
      {
        heading: "Astuces pour une mousse parfaite",
        content: [
          text(
            "La température de l'eau est cruciale : au-delà de 80 °C, le matcha devient amer. Un fouet en bambou (chasen) crée une mousse fine et aérée ; un shaker ou un fouet électrique donne une mousse plus épaisse, idéale pour les lattes. Préparez le matcha concentré avant le lait : la poudre se dissout mieux dans une petite quantité d'eau chaude. Pour choisir le bon matcha selon votre usage, lisez notre guide "
          ),
          link(
            "/guide/comment-choisir-son-matcha",
            "comment choisir son matcha"
          ),
          text("."),
        ],
      },
      {
        heading: "Erreurs courantes à éviter",
        content: [
          text(
            "Grumeaux : le matcha non tamisé ou mal fouetté laisse des amas dans la tasse — tamisez systématiquement et fouettez vigoureusement. Matcha amer : eau trop chaude ou surdosage — respectez 2 g pour 30 ml d'eau et ne dépassez pas 80 °C. Mousse qui retombe : lait trop froid ou matcha trop dilué — concentrez d'abord le matcha, puis incorporez le lait. Pour les bienfaits nutritionnels du matcha au quotidien, consultez notre guide sur les "
          ),
          link("/guide/bienfaits-matcha", "bienfaits du matcha"),
          text("."),
        ],
      },
    ],
  },
  {
    slug: "bienfaits-matcha",
    title: "Les bienfaits du matcha",
    description:
      "Antioxydants, L-théanine, énergie durable : ce que dit la science sur le matcha et comment en profiter au quotidien.",
    readingTime: "7 min",
    publishedAt: "2026-02-01",
    updatedAt: "2026-08-16",
    keywords: [
      "bienfaits matcha",
      "antioxydants",
      "L-théanine",
      "énergie matcha",
    ],
    relatedGuides: ["qu-est-ce-que-le-matcha", "preparer-le-matcha", "matcha-bio"],
    relatedProducts: ["matcha-ceremonie", "matcha-latte"],
    sections: [
      {
        heading: "Riche en antioxydants",
        content: [
          text(
            "Le matcha contient des catéchines, notamment l'EGCG, aux propriétés antioxydantes reconnues. En consommant la feuille entière, l'apport est supérieur à celui d'un thé vert infusé."
          ),
        ],
      },
      {
        heading: "Énergie calme grâce à la L-théanine",
        content: [
          text(
            "La L-théanine modère l'effet de la caféine : concentration sans nervosité. C'est ce qui distingue le matcha du café pour beaucoup de consommateurs. La méthode de préparation influence aussi le ressenti — voir "
          ),
          link("/guide/preparer-le-matcha", "comment préparer le matcha"),
          text("."),
        ],
      },
      {
        heading: "Combien en boire ?",
        content: [
          text(
            "Une à deux tasses par jour suffisent pour la plupart des adultes. Pour la dégustation quotidienne, privilégiez un "
          ),
          link("/produits/matcha-ceremonie", "matcha de cérémonie"),
          text(
            " de qualité. Évitez le matcha en fin de journée si vous êtes sensible à la caféine (environ 30–70 mg par tasse)."
          ),
        ],
      },
      {
        heading: "Et le matcha bio ?",
        content: [
          text(
            "Le label bio concerne les pratiques agricoles — absence de pesticides de synthèse, respect des sols — et non la concentration en nutriments. Un matcha bio n'est pas automatiquement plus riche en antioxydants qu'un matcha conventionnel de qualité. Pour comprendre ce que recouvre cette certification, consultez notre guide sur le "
          ),
          link("/guide/matcha-bio", "matcha bio"),
          text("."),
        ],
      },
    ],
  },
  {
    slug: "matcha-bio",
    title: "Matcha bio : quoi choisir ?",
    description:
      "Matcha bio ou conventionnel ? Labels, goût, prix et impact : tout ce qu'il faut savoir pour choisir votre poudre de thé vert en confiance.",
    readingTime: "5 min",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    keywords: ["matcha bio", "thé vert bio", "matcha biologique"],
    relatedGuides: ["qu-est-ce-que-le-matcha", "preparer-le-matcha"],
    relatedProducts: ["matcha-ceremonie"],
    sections: [
      {
        heading: "Qu'est-ce que le matcha bio ?",
        content: [
          text(
            "Un matcha bio est issu d'une culture certifiée selon le règlement européen sur l'agriculture biologique (label AB en France). Concrètement, cela signifie : pas de pesticides de synthèse, pas d'engrais chimiques, et un contrôle annuel par un organisme certificateur indépendant. Le "
          ),
          link("/guide/qu-est-ce-que-le-matcha", "matcha"),
          text(
            " reste la même poudre de thé vert — feuilles ombragées, broyées à la pierre — mais les pratiques culturales respectent un cahier des charges strict."
          ),
        ],
      },
      {
        heading: "Matcha bio vs matcha conventionnel",
        content: [
          text(
            "Goût : les différences sont subtiles et dépendent surtout de l'origine et du grade, pas uniquement du label. Un bon matcha conventionnel de première récolte peut être plus délicat qu'un matcha bio de qualité moyenne. Prix : le bio coûte souvent 20 à 40 % plus cher, en raison des rendements plus faibles et des contrôles. Impact : le bio limite les résidus de pesticides et favorise la biodiversité des sols, un argument pertinent pour les consommateurs soucieux de l'environnement."
          ),
        ],
      },
      {
        heading: "Comment choisir un matcha bio de qualité",
        content: [
          text(
            "Vérifiez la présence du logo AB ou d'une certification reconnue (JAS au Japon, USDA aux États-Unis). Fiez-vous aussi aux critères visuels : vert émeraude intense, poudre fine, odeur herbacée fraîche. Pour la dégustation, un "
          ),
          link("/produits/matcha-ceremonie", "matcha de cérémonie"),
          text(
            " bio de première récolte offre le meilleur équilibre. Apprenez à le préparer correctement avec notre guide "
          ),
          link("/guide/preparer-le-matcha", "comment préparer le matcha"),
          text(
            " — la température de l'eau et le fouettage influencent autant le résultat que la certification."
          ),
        ],
      },
    ],
  },
  {
    slug: "comment-choisir-son-matcha",
    title: "Comment choisir son matcha ?",
    description:
      "Couleur, grade, budget et labels : nos critères pour choisir un matcha selon votre usage — dégustation, latte ou cuisine.",
    readingTime: "6 min",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    keywords: [
      "choisir matcha",
      "quel matcha acheter",
      "matcha qualité",
      "grade matcha",
    ],
    relatedGuides: [
      "qu-est-ce-que-le-matcha",
      "preparer-le-matcha",
      "matcha-bio",
      "recettes-matcha-cuisine",
    ],
    relatedProducts: [
      "matcha-ceremonie",
      "matcha-culinaire",
      "matcha-latte",
    ],
    sections: [
      {
        heading: "Les critères de qualité à vérifier",
        content: [
          text(
            "Avant le prix ou le packaging, trois signaux visuels et gustatifs orientent un bon choix. La couleur doit être vert émeraude intense — un matcha jaunâtre ou brun indique souvent une qualité inférieure ou une oxydation. L'origine compte : Uji, Nishio et Kagoshima produisent des matcha reconnus, mais un bon terroir ne remplace pas un grade adapté à votre usage. Enfin, le grade (cérémonie, culinaire, latte) détermine le profil gustatif et le prix. Pour les bases, commencez par comprendre "
          ),
          link("/guide/qu-est-ce-que-le-matcha", "qu'est-ce que le matcha"),
          text("."),
        ],
      },
      {
        heading: "Quel budget selon votre usage",
        content: [
          text(
            "Pour la dégustation pure en bol traditionnel, investissez dans un matcha de cérémonie de première récolte — comptez 25 à 40 € pour 30 g. Pour les lattes quotidiens, un "
          ),
          link("/produits/matcha-latte", "blend matcha latte"),
          text(
            " offre un meilleur rapport qualité-prix (environ 20 à 30 € pour 50 g). Pour la cuisine — gâteaux, glaces, smoothies — le "
          ),
          link("/produits/matcha-culinaire", "matcha culinaire"),
          text(
            " est le choix économique (15 à 25 € pour 100 g). N'achetez pas du matcha de cérémonie pour la pâtisserie : vous diluez un produit premium sans en tirer les nuances. Pour des recettes pas à pas — gâteau, cookies, glace — consultez notre guide "
          ),
          link(
            "/guide/recettes-matcha-cuisine",
            "recettes au matcha"
          ),
          text(". Apprenez la préparation adaptée dans notre guide "),
          link("/guide/preparer-le-matcha", "comment préparer le matcha"),
          text("."),
        ],
      },
      {
        heading: "Labels et certifications : ce qu'ils garantissent",
        content: [
          text(
            "Le label bio (AB en France) certifie l'absence de pesticides de synthèse et un cahier des charges agricole strict — utile pour la cuisine et les lattes quotidiens. L'origine Japon n'est pas une certification officielle, mais un indicateur de tradition et de savoir-faire ; vérifiez toujours la région précise (Uji, Nishio, Kagoshima). Aucun label ne remplace vos propres critères visuels : couleur, finesse de la poudre, odeur herbacée fraîche. Pour le bio en détail, lisez notre guide "
          ),
          link("/guide/matcha-bio", "matcha bio"),
          text(
            ". Méfiez-vous des promesses marketing (« superfood », « détox ») : un bon matcha se juge à la tasse, pas au packaging."
          ),
        ],
      },
      {
        heading: "Comparer les trois grades de matcha",
        content: [
          text(
            "Cérémonie : première récolte, doux et umami, idéal pour la dégustation pure — voir notre "
          ),
          link("/produits/matcha-ceremonie", "matcha de cérémonie Uji"),
          text(
            ". Culinaire : plus robuste et amer, parfait pour la cuisine et les smoothies — voir le "
          ),
          link("/produits/matcha-culinaire", "matcha culinaire bio"),
          text(
            ". Latte : mélange optimisé pour une mousse crémeuse avec du lait — voir le "
          ),
          link("/produits/matcha-latte", "matcha latte blend"),
          text(
            ". En résumé : cérémonie pour la pureté, culinaire pour l'économie en cuisine, latte pour le café quotidien. Choisissez selon votre rituel, pas selon un classement externe."
          ),
        ],
      },
    ],
  },
  {
    slug: "recettes-matcha-cuisine",
    title: "Recettes au matcha : cuisine et pâtisserie",
    description:
      "Gâteau, cookies, glace, smoothie : nos recettes faciles au matcha. Quel grade utiliser, dosages et astuces pour un goût équilibré.",
    readingTime: "8 min",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-18",
    keywords: [
      "recette matcha",
      "gâteau matcha",
      "pâtisserie matcha",
      "matcha cuisine",
      "cookies matcha",
    ],
    relatedGuides: [
      "qu-est-ce-que-le-matcha",
      "preparer-le-matcha",
      "comment-choisir-son-matcha",
      "conservation-matcha",
    ],
    relatedProducts: ["matcha-culinaire"],
    sections: [
      {
        heading: "Pourquoi du matcha culinaire en cuisine ?",
        content: [
          text(
            "En pâtisserie et en cuisine salée, le matcha doit tenir face aux autres ingrédients — beurre, sucre, lait, farine — sans disparaître ni devenir trop amer. Le "
          ),
          link("/produits/matcha-culinaire", "matcha culinaire"),
          text(
            " est conçu pour cela : profil plus robuste, prix plus doux par portion que le matcha de cérémonie. Réserver le "
          ),
          link("/produits/matcha-ceremonie", "matcha de cérémonie"),
          text(
            " à la dégustation pure : ses notes umami fines se perdent dans un gâteau ou un smoothie. Pour comprendre la différence entre les grades, lisez "
          ),
          link("/guide/qu-est-ce-que-le-matcha", "qu'est-ce que le matcha"),
          text(" et notre guide "),
          link(
            "/guide/comment-choisir-son-matcha",
            "comment choisir son matcha"
          ),
          text("."),
        ],
      },
      {
        heading: "Dosages type : combien de matcha par portion ?",
        content: [
          text(
            "Une cuillère à café rase correspond à environ 2 g de matcha. Pour un smoothie ou un latte glacé : 2 g (1 c. à café) pour 250 ml de liquide. Cookies : 4 à 6 g pour 12 biscuits. Gâteau marbré : 8 à 10 g pour un cake de 6 parts. Glace maison : 5 à 8 g pour 500 ml de base crème. Commencez toujours par la dose minimale : le matcha s'intensifie en cuisson et au froid. Pour la boisson chaude traditionnelle, consultez "
          ),
          link("/guide/preparer-le-matcha", "comment préparer le matcha"),
          text("."),
        ],
      },
      {
        heading: "Smoothie matcha-banane",
        content: [
          text(
            "Tamisez 2 g de matcha culinaire dans un bol. Ajoutez 1 banane, 200 ml de lait d'amande froid et 1 c. à soupe de yaourt. Mixez 30 secondes jusqu'à une texture lisse. Le froid limite l'amertume ; ajoutez du miel si besoin. Idéal pour tester un nouveau sachet de "
          ),
          link("/produits/matcha-culinaire", "matcha culinaire"),
          text(" sans matériel de cérémonie."),
        ],
      },
      {
        heading: "Cookies matcha-chocolat",
        content: [
          text(
            "Mélangez 120 g de beurre mou, 80 g de sucre et 5 g de matcha tamisé. Incorporez 1 œuf, puis 180 g de farine et 80 g de pépites de chocolat. Formez des boules, enfournez 12 minutes à 170 °C. Le matcha colore la pâte d'un vert pastel ; ne prolongez pas la cuisson : une cookie trop dorée masque les arômes herbacés."
          ),
        ],
      },
      {
        heading: "Gâteau marbré au matcha",
        content: [
          text(
            "Préparez une base vanille classique (2 œufs, 100 g de sucre, 100 g de farine, 80 g de beurre). Divisez la pâte : tamisez 8 g de matcha dans une moitié avec 2 c. à soupe de lait. Versez les deux masses en alternance dans un moule, puis marbrez avec une fourchette. Cuisez 35 minutes à 165 °C. Un "
          ),
          link("/produits/matcha-culinaire", "matcha culinaire bio"),
          text(
            " offre un contraste visuel net entre le vert matcha et la vanille."
          ),
        ],
      },
      {
        heading: "Glace matcha maison",
        content: [
          text(
            "Fouettez 6 g de matcha tamisé dans 50 ml de lait chaud (pas bouillant) jusqu'à dissolution complète. Mélangez avec 250 ml de crème liquide, 80 g de sucre et 1 c. à soupe de miel. Réfrigérez 2 heures, puis turbinez ou placez au congélateur en remuant toutes les 30 minutes. La glace concentre le goût : réduisez le sucre si vous aimez un profil plus vert."
          ),
        ],
      },
      {
        heading: "Latte glacé matcha",
        content: [
          text(
            "Tamisez 2 g de matcha dans 30 ml d'eau tiède (75 °C), fouettez jusqu'à mousse. Versez sur 200 ml de lait froid et des glaçons. Variante café : ajoutez un expresso pour un dirty matcha latte. Pour la version chaude et crémeuse, suivez notre guide "
          ),
          link("/guide/preparer-le-matcha", "comment préparer le matcha"),
          text("."),
        ],
      },
      {
        heading: "Astuces pour un goût équilibré",
        content: [
          text(
            "Tamisez toujours le matcha avant incorporation : zéro grumeau, couleur homogène. Évitez la surchauffe : au-delà de 80 °C, les arômes deviennent amers — préférez l'eau tiède ou le froid en pâtisserie. Pour les préparations réfrigérées (glace, crème), le matcha s'intensifie après 24 h : dosez en conséquence. Conservez les pâtisseries au matcha dans une boîte hermétique 2 à 3 jours ; le vert s'oxydise vite à l'air. Pour le sachet d'origine, appliquez nos conseils de "
          ),
          link("/guide/conservation-matcha", "conservation du matcha"),
          text("."),
        ],
      },
      {
        heading: "Tableau récapitulatif : grade et usage",
        content: [
          text(
            "Cérémonie (1–2 g) : dégustation pure en bol, sans sucre ni lait — profil umami et doux. Culinaire (2–10 g) : smoothies, cookies, gâteaux, glaces, lattes — goût franc, bon rapport qualité-prix. Latte (2 g) : lattes quotidiens avec lait végétal, mousse optimisée. En cuisine, le culinaire est le choix par défaut ; le cérémonie ne se justifie que pour une finition décorative (saupoudrage léger sur un entremets)."
          ),
        ],
      },
    ],
  },
  {
    slug: "conservation-matcha",
    title: "Comment conserver le matcha",
    description:
      "Durée de vie après ouverture, récipient idéal, frigo ou pas : nos conseils pour stocker votre matcha et reconnaître qu'il est périmé.",
    readingTime: "4 min",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    keywords: [
      "conservation matcha",
      "conserver matcha",
      "matcha périmé",
      "stockage matcha",
    ],
    relatedGuides: ["preparer-le-matcha", "qu-est-ce-que-le-matcha"],
    relatedProducts: ["matcha-ceremonie"],
    sections: [
      {
        heading: "Durée de vie après ouverture",
        content: [
          text(
            "Un matcha de qualité conserve ses arômes pendant 3 à 4 semaines après ouverture, si le sachet est refermé rapidement et stocké correctement. Avant ouverture, la date limite indiquée par le producteur peut aller jusqu'à 12 à 18 mois — mais la poudre perd progressivement sa fraîcheur dès la fabrication. Pour tirer le meilleur parti d'un sachet frais, consultez notre guide sur "
          ),
          link("/guide/preparer-le-matcha", "comment préparer le matcha"),
          text("."),
        ],
      },
      {
        heading: "Les ennemis du matcha",
        content: [
          text(
            "Quatre facteurs accélèrent l'oxydation : la lumière (qui décolore la poudre), l'air (qui la sèche), la chaleur (qui dégrade les arômes) et l'humidité (qui peut provoquer des grumeaux). Le matcha est particulièrement sensible car la feuille est broyée : la surface exposée à l'oxygène est maximale. Rangez-le dans un endroit frais (15–20 °C), sombre et sec."
          ),
        ],
      },
      {
        heading: "Le récipient idéal",
        content: [
          text(
            "Optez pour un récipient opaque et hermétique — boîte métallique ou pot en verre foncé avec joint. Transférez le matcha du sachet d'origine dès l'ouverture pour limiter l'air résiduel. Évitez les contenants en plastique transparent ou les boîtes trop grandes : moins d'air dans le récipient, moins d'oxydation. Un "
          ),
          link("/produits/matcha-ceremonie", "matcha de cérémonie"),
          text(
            " de première récolte, plus fin et fragile, exige une conservation stricte pour garder son vert émeraude."
          ),
        ],
      },
      {
        heading: "Frigo ou pas ?",
        content: [
          text(
            "Le réfrigérateur prolonge la durée de vie si le récipient est parfaitement étanche — mais attention aux risques : condensation à l'ouverture, absorption d'odeurs alimentaires et variations de température. Pour la plupart des consommateurs, un placard frais et sombre suffit. Le frigo n'est utile que si vous stockez un sachet non ouvert longtemps ou un matcha rare en grande quantité."
          ),
        ],
      },
      {
        heading: "Signes qu'un matcha est périmé",
        content: [
          text(
            "Couleur jaunâtre ou olive terne, odeur fade ou rance, goût amer sans umami ni douceur — ces signes indiquent une oxydation avancée. La poudre peut aussi former des grumeaux irréductibles. Un matcha périmé n'est pas dangereux, mais il perd ses bienfaits gustatifs et nutritionnels. Pour comprendre ce qui fait la qualité d'un matcha frais, lisez "
          ),
          link("/guide/qu-est-ce-que-le-matcha", "qu'est-ce que le matcha"),
          text("."),
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
