# AGENTS.md

Guide pour les agents IA travaillant sur **Matcha Matcha** — site statique Next.js sur le thé vert japonais.

## Vue d'ensemble

Site éditorial en français (guides + produits) conçu pour le SEO. Objectif long terme : s'auto-améliorer via des données externes (GSC, APIs SEO) et un audit interne automatisé (balises, structure, liens).

**Contrainte majeure** : export 100 % statique. Pas de serveur Node en production.

## Stack

| Outil | Version / détail |
|-------|------------------|
| Next.js | 15 (App Router) |
| React | 19 |
| TypeScript | strict |
| Tailwind CSS | v4 + plugin Typography |
| Build | `output: "export"` → dossier `out/` |

## Commandes

```bash
npm run dev      # Développement local (port 3000)
npm run build    # Build statique → out/
npm run start    # Prévisualise out/ avec serve
npm run lint     # ESLint
```

## Structure du projet

```
app/                    # Pages Next.js (App Router)
  guide/[slug]/         # Articles guides
  produits/[slug]/      # Fiches produits
  sitemap.ts            # Sitemap XML
  robots.ts             # robots.txt
  globals.css           # Thème Tailwind (@theme, @utility)
components/             # Composants UI réutilisables
lib/
  site.ts               # Config globale (nom, URL, locale)
  seo.ts                # Helper buildMetadata()
  utils.ts              # Utilitaires (cn)
  content/
    guides.ts           # Données guides
    products.ts         # Données produits
public/                 # Assets statiques
out/                    # Build généré (ne pas éditer)
```

## Conventions de code

### Langue

- Contenu utilisateur : **français**
- Code (noms de variables, commentaires techniques) : **anglais**

### Styling

- **Uniquement Tailwind CSS** — pas de CSS custom hors `globals.css`
- Palette custom : `matcha-50` à `matcha-900`, `cream`
- Typographie article : composant `<Prose>` ou utilitaire `prose-matcha`
- Thème défini dans `app/globals.css` via `@theme`

### Composants

- Composants fonctionnels, pas de classes CSS modules
- Utiliser `cn()` de `lib/utils.ts` pour fusionner les classes
- Liens internes : toujours `<Link>` de `next/link`

### Contenu

- Guides et produits dans `lib/content/` (fichiers TypeScript, pas de CMS)
- Chaque entrée a : `slug`, `title`, `description`, `keywords`, liens relatifs
- Slugs en kebab-case français (`preparer-le-matcha`)

## Ajouter une page

### Nouveau guide

1. Ajouter l'entrée dans `lib/content/guides.ts`
2. Renseigner `relatedGuides` et `relatedProducts` pour le maillage interne
3. La route `/guide/[slug]` est générée automatiquement via `generateStaticParams`
4. Mettre à jour les liens du footer (`components/Footer.tsx`) si page importante

### Nouveau produit

1. Ajouter l'entrée dans `lib/content/products.ts`
2. Renseigner `relatedGuides` et `relatedProducts`
3. La route `/produits/[slug]` est générée automatiquement

## SEO — obligations

Chaque page **doit** avoir :

- `buildMetadata()` avec title, description, path, keywords
- URL canonique (géré par `buildMetadata`)
- JSON-LD adapté (Article, Product, BreadcrumbList)
- Fil d'Ariane (`<Breadcrumb>`)
- Un seul `<h1>` par page
- Liens internes vers contenu connexe (`<RelatedLinks>`)

Ne pas oublier de mettre à jour `updatedAt` lors de modifications de contenu.

## Interdictions (export statique)

Ne **pas** ajouter :

- API Routes (`app/api/`)
- Server Actions
- `getServerSideProps` / rendu dynamique serveur
- `next/image` optimisé (utiliser `unoptimized: true` ou `<img>`)
- Routes dynamiques sans `generateStaticParams`
- `headers()`, `cookies()`, `revalidate` dynamique

Les scripts d'audit, collecte SEO et génération de contenu tournent **en dehors** du build Next.js (ex. GitHub Actions, scripts Node locaux).

## Roadmap prévue

### Phase 1 — Audit interne local

Script qui vérifie :

- Présence title / description / canonical sur chaque page
- Structure H1/H2
- Pages orphelines (sans lien entrant)
- Liens cassés
- Cohérence sitemap vs pages existantes

### Phase 2 — Données externes

- Google Search Console API (gratuit) — performances réelles
- DataForSEO ou équivalent (pay-per-use) — keywords, SERP
- Pipeline cron : collecte → analyse → génération contenu → rebuild

## Principes de modification

1. **Minimiser le scope** — changements focalisés, pas de refacto non demandée
2. **Réutiliser l'existant** — `buildMetadata`, `Prose`, `GuideCard`, etc.
3. **Pas de over-engineering** — pas d'abstraction prématurée
4. **Pas de README** sauf demande explicite
5. **Pas de commit** sauf demande explicite

## Fichiers clés

| Fichier | Rôle |
|---------|------|
| `lib/site.ts` | URL du site, nom, locale — modifier avant déploiement |
| `lib/seo.ts` | Metadata et Open Graph |
| `lib/content/guides.ts` | Tous les guides |
| `lib/content/products.ts` | Tous les produits |
| `app/globals.css` | Thème Tailwind |
| `next.config.ts` | Config export statique |
