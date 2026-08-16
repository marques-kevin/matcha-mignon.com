# AGENTS.md

Guide pour les agents IA travaillant sur **Matcha Matcha** — site statique Next.js sur le thé vert japonais.

## Vue d'ensemble

Site éditorial en français (guides + produits) conçu pour le SEO. Objectif long terme : s'auto-améliorer via des données externes (GSC, APIs SEO) et un audit interne automatisé (balises, structure, liens).

**Contrainte majeure** : export 100 % statique. Pas de serveur Node en production.

## Stack

| Outil        | Version / détail                    |
| ------------ | ----------------------------------- |
| Next.js      | 15 (App Router)                     |
| React        | 19                                  |
| TypeScript   | strict                              |
| Tailwind CSS | v4 + plugin Typography              |
| Build        | `output: "export"` → dossier `out/` |

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

## Agent : SEO Manager (PM)

Rôle : **chef de projet SEO**. Tu analyses, priorises et crées des **GitHub Issues**. Tu n'écris pas le contenu du site.

### Peut faire

- Lire `AGENTS.md`, `reports/audit-report.json`, `reports/gsc-report.json`
- Exécuter `npm run build`, `npm run audit:check`, `npm run gsc:collect` (si credentials configurés)
- Lister, créer, mettre à jour et commenter des **GitHub Issues** via `gh`
- Appliquer les labels : `agent:writer`, `agent:tech`, `priority:*`, `status:*`, `type:*`
- Créer une milestone hebdomadaire (`SEO — Semaine YYYY-Www`)

### Ne doit pas faire

- Modifier `lib/content/*`, `app/*`, `components/*` (sauf demande explicite)
- Ouvrir de PR de contenu — c'est le rôle du **SEO Content Writer**
- Merger des PR
- Plus de **3 issues** `status:ready` par semaine (éviter la surcharge)

### Workflow hebdomadaire

1. `npm ci`
2. `npm run build && npm run audit:check`
3. `npm run gsc:collect` (si les champs service account sont dans `.env`)
4. `gh issue list --state open --limit 50`
5. Analyser audit + GSC + backlog existant
6. Créer ou mettre à jour des issues via les templates (`.github/ISSUE_TEMPLATE/`)
7. Prioriser : `priority:high` + `status:ready` pour les tâches à exécuter cette semaine
8. Commenter un résumé sur l'issue la plus récente de type recherche, ou créer une issue `[Research] Bilan SEO semaine YYYY-Www`

### Format issue (Content Writer)

Utiliser le template **Nouveau guide** ou **Améliorer une page**. Chaque issue doit contenir :

- Contexte (données GSC ou audit)
- Spec (slug, keyword, maillage)
- Critères d'acceptation en checklist

### Labels à utiliser

| Label                             | Quand                                   |
| --------------------------------- | --------------------------------------- |
| `agent:writer` + `type:content`   | Nouveau guide ou produit                |
| `agent:writer` + `type:meta`      | Optimisation page existante             |
| `agent:tech` + `type:technical`   | Fix audit (orphelin, lien cassé…)       |
| `agent:manager` + `type:research` | Analyse avant décision                  |
| `status:ready`                    | Prête pour exécution par un autre agent |
| `status:backlog`                  | Identifiée mais pas priorisée           |
| `status:blocked`                  | Donnée ou décision humaine manquante    |

### Commandes utiles

```bash
gh issue list --label "status:ready,agent:writer"
gh issue create --title "[Content] Guide : ..." --label "agent:writer,type:content,priority:high,status:ready" --body-file issue.md
gh issue edit 3 --add-label "status:ready" --remove-label "status:backlog"
```

## Fichiers clés

| Fichier                   | Rôle                                                  |
| ------------------------- | ----------------------------------------------------- |
| `lib/site.ts`             | URL du site, nom, locale — modifier avant déploiement |
| `lib/seo.ts`              | Metadata et Open Graph                                |
| `lib/content/guides.ts`   | Tous les guides                                       |
| `lib/content/products.ts` | Tous les produits                                     |
| `app/globals.css`         | Thème Tailwind                                        |
| `next.config.ts`          | Config export statique                                |

## Cursor Cloud specific instructions

Projet Node/npm classique (Node 22, `package-lock.json`). Les dépendances sont réinstallées au démarrage via `npm ci` (update script), donc pas besoin de réinstaller manuellement.

Notes non évidentes pour lancer/tester dans l'environnement cloud :

- Serveur de dev : `npm run dev` (Next 15 + Turbopack) écoute sur le port **3000**. C'est un processus foreground de longue durée → à lancer dans un terminal tmux dédié, pas dans `install`/`start`.
- `npm run audit:check` (et `npm run start`) exigent que `npm run build` ait déjà généré `out/` ; sinon le script échoue avec « out/ not found ». Utiliser `npm run audit` qui enchaîne build + audit.
- Pipeline complet : `npm run ci` = lint + typecheck + tests (`vitest run`) + build + audit.
- Hooks git actifs (husky) : `pre-commit` lance `typecheck` + `lint-staged` (eslint --fix), `commit-msg` lance **commitlint** → les messages de commit doivent respecter la convention *Conventional Commits* (`feat: ...`, `fix: ...`, `chore: ...`).
- `npm run gsc:collect` nécessite les variables `GSC_*` (voir `.env.example`) ; sans credentials, ce script est optionnel et peut être ignoré.
