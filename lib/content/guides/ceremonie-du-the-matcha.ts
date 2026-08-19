import { image, link, text } from "../blocks";
import type { Guide } from "./types";

export const guide: Guide = {
  slug: "ceremonie-du-the-matcha",
  title: "La cérémonie du thé matcha (chanoyu)",
  description:
    "Histoire, étapes et philosophie de la cérémonie du thé japonaise. Comment vivre une expérience chanoyu à la maison.",
  readingTime: "7 min",
  publishedAt: "2026-08-19",
  updatedAt: "2026-08-19",
  keywords: [
    "cérémonie du thé matcha",
    "chanoyu",
    "matcha cérémonie",
    "cérémonie du thé japonaise",
  ],
  relatedGuides: ["preparer-le-matcha", "accessoires-matcha"],
  relatedProducts: [],
  // CC BY-SA 4.0 Wikimedia: public/guides/ceremonie-du-the-matcha/ceremonie-the-japonaise-temae.attribution.txt
  cover: image(
    "/guides/ceremonie-du-the-matcha/ceremonie-the-japonaise-temae.jpg",
    "Cérémonie du thé matcha (chanoyu) : hôte en kimono préparant le matcha au chasen sous une ombrelle rouge",
    1280,
    960,
    "Temae en jardin : le matcha se prépare devant les invités, dans un geste lent et précis."
  ),
  sections: [
    {
      heading: "Origines et philosophie wabi-sabi",
      content: [
        text(
          "La cérémonie du thé matcha, ou chanoyu (茶の湯, « eau chaude du thé »), est le rituel japonais de préparation et de service du matcha. On parle aussi de chadō ou sadō — la Voie du thé. Le geste prend forme entre le XIIᵉ et le XVIᵉ siècle : des moines zen rapportent le thé en poudre de Chine, puis Sen no Rikyū (1522–1591) lui donne son esthétique wabi-sabi — beauté de la simplicité, du bol imparfait, de l'instant présent."
        ),
        text(
          " Le wabi-sabi n'est pas un style déco. Dans le salon de thé, il se traduit par un espace modeste, des ustensiles choisis pour la saison, et une attention à ce qui est unique dans cette rencontre : cet hôte, ces invités, ce bol, ce jour. Le matcha servi est la même poudre de thé vert ombragée, consommée entière plutôt qu'infusée."
        ),
      ],
    },
    {
      heading: "Les quatre principes : harmonie, respect, pureté, tranquillité",
      content: [
        text(
          "Les écoles de thé résument l'esprit du chanoyu en quatre caractères — wa, kei, sei, jaku. L'harmonie (wa) relie l'hôte, les invités, les saisons et les objets : rien n'est forcé. Le respect (kei) se montre dans la salutation, la façon de recevoir le bol à deux mains, le soin porté à chaque ustensile. La pureté (sei) n'est pas seulement l'eau claire et le chasen rincé : c'est aussi un esprit débarrassé de l'agitation. La tranquillité (jaku) vient en dernier, comme un silence qui s'installe une fois les trois premiers vécus."
        ),
        text(
          " Ces principes ne demandent pas un tatami ni un kimono. Ils demandent de ralentir : chauffer l'eau sans la faire bouillir, tamiser la poudre, fouetter jusqu'à une mousse fine, puis boire sans écran. C'est déjà une cérémonie du thé matcha, même réduite à une tasse."
        ),
      ],
    },
    {
      heading: "Déroulement simplifié : hôte et invités",
      content: [
        text(
          "Dans une cérémonie formelle, l'hôte (teishu) prépare le thé devant les invités (kyaku). Le cœur du rituel s'appelle temae : une suite de gestes appris — nettoyer le bol (chawan), doser la poudre à la cuillère bambou (chashaku), fouetter au "
        ),
        link("/guide/accessoires-matcha", "fouet matcha"),
        text(
          " (chasen), présenter le bol. Deux consistances existent : l'usucha, thé léger et mousseux du quotidien, et le koicha, thé épais réservé aux rencontres plus solennelles. Les invités reçoivent souvent une sucrerie (wagashi) avant le bol, pour équilibrer l'amertume."
        ),
        text(
          " Le déroulé, simplifié : accueil et salutations ; les invités s'installent ; l'hôte chauffe l'eau, rince le chasen, tamise le matcha ; il fouette et tend le bol ; l'invité tourne légèrement le chawan, boit, admire le bol, puis le rend. Chaque école (Urasenke, Omotesenke, Mushakōjisenke…) précise les détails. L'essentiel, pour un premier contact, reste l'attention partagée — pas la perfection du geste."
        ),
      ],
    },
    {
      heading: "Vivre une cérémonie du thé matcha à la maison",
      content: [
        text(
          "Inutile de reconstituer un chashitsu. Un coin calme, un bol assez large, un chasen et un matcha de cérémonie suffisent. Tamisez 1 à 2 g, versez 70 ml d'eau à 75–80 °C, fouettez en M pendant une vingtaine de secondes. Le pas à pas — dosages, température, erreurs — est dans notre guide "
        ),
        link("/guide/preparer-le-matcha", "comment préparer le matcha"),
        text(
          ". Pour le fouet, le nombre de dents et l'entretien du bambou, voyez "
        ),
        link("/guide/accessoires-matcha", "quel fouet matcha choisir"),
        text(
          ". À la maison, gardez l'esprit plus que l'étiquette : un wagashi ou un carré de chocolat avant la tasse, le téléphone dans une autre pièce, et le temps de regarder la mousse avant de boire. C'est déjà du chanoyu."
        ),
      ],
    },
  ],
};
