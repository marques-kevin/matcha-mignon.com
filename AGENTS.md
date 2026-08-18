# AGENTS.md

Guide pour les agents IA travaillant sur **Matcha Mignon** — site statique Next.js sur le thé vert japonais.

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
npm run dev              # Développement local (port 3000)
npm run build            # Build statique → out/
npm run start            # Prévisualise out/ avec serve
npm run lint             # ESLint
npm run generate:guides  # Régénère lib/content/guides/index.ts (pré-hook de dev/build)
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
    guides/             # Un fichier TS par guide (`<slug>.ts`)
      types.ts          # Type `Guide`
      index.ts          # Généré — ne pas éditer
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

- Guides : un fichier par article dans `lib/content/guides/<slug>.ts` (`export const guide`)
- Produits : `lib/content/products.ts`
- Chaque entrée a : `slug`, `title`, `description`, `keywords`, liens relatifs
- Slugs en kebab-case français (`preparer-le-matcha`) — pour un guide, le nom de fichier **est** le slug

## Ajouter une page

### Nouveau guide

1. Créer `lib/content/guides/<slug>.ts` avec `export const guide: Guide` (le slug doit matcher le nom de fichier)
2. Ne **pas** éditer d'index / barrel : le dossier est la source de vérité (`npm run generate:guides` tourne tout seul avant `dev` / `build` / `typecheck`)
3. Renseigner `relatedGuides` et `relatedProducts` pour le maillage interne
4. La route `/guide/[slug]` est générée automatiquement via `generateStaticParams`
5. Mettre à jour les liens du footer (`components/Footer.tsx`) si page importante

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

### Politique `status:ready` (défaut)

**Par défaut**, chaque issue exécutable (`agent:writer` ou `agent:tech`) est créée avec `status:ready` + `priority:high` ou `priority:medium` — le webhook lance Writer/Tech sans action humaine.

**Exception — laisser en `status:backlog`** (ne pas ajouter `status:ready`) si l'impact projet est trop grand :

| Situation                     | Exemple                                                                                  |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| Refonte transversale          | Restructurer `lib/seo.ts`, layout global, template title sur toutes les pages            |
| Scope multi-fichiers critique | > 5 fichiers hors `lib/content/`, ou changement `app/` + `components/` + contenu         |
| Risque de régression élevé    | Migration routing, sitemap, changement de structure URL                                  |
| Spec incomplète               | Donnée GSC manquante, décision éditoriale ou produit non tranchée                        |
| Dépendance externe            | Credentials, choix humain, validation business                                           |

Pour une issue en backlog à fort impact, documenter dans le body **pourquoi** elle n'est pas `ready` et **quand** la promouvoir.

Issues **Research** (`agent:manager`) : toujours `status:backlog` — jamais `status:ready`.

### Workflow hebdomadaire

1. `npm ci`
2. `npm run build && npm run audit:check`
3. `npm run gsc:collect` (si les champs service account sont dans `.env`)
4. `gh issue list --state open --limit 50`
5. Analyser audit + GSC + backlog existant
6. Créer ou mettre à jour des issues via les templates (`.github/ISSUE_TEMPLATE/`)
7. Labelliser chaque issue exécutable :
   - **Défaut** : `status:ready` + `agent:writer` ou `agent:tech` + `priority:*`
   - **Si impact trop grand** : `status:backlog` (voir politique ci-dessus)
8. Commenter un résumé sur l'issue la plus récente de type recherche, ou créer une issue `[Research] Bilan SEO semaine YYYY-Www`

### Format issue (Content Writer)

Utiliser le template **Nouveau guide** ou **Améliorer une page**. Chaque issue doit contenir :

- Contexte (données GSC ou audit)
- Spec (slug, keyword, maillage)
- Critères d'acceptation en checklist

### Labels à utiliser

| Label                             | Quand                                                   |
| --------------------------------- | ------------------------------------------------------- |
| `agent:writer` + `type:content`   | Nouveau guide ou produit                                |
| `agent:writer` + `type:meta`      | Optimisation page existante                             |
| `agent:tech` + `type:technical`   | Fix audit (orphelin, lien cassé…)                       |
| `agent:manager` + `type:research` | Analyse avant décision                                  |
| `status:ready`                    | **Défaut** pour issues Writer/Tech exécutable (webhook) |
| `status:backlog`                  | Spec incomplète, impact trop grand, décision humaine, ou issues Research |
| `status:blocked`                  | Donnée ou décision humaine manquante                    |

### Commandes utiles

```bash
gh issue list --label "status:ready"
gh issue list --label "status:ready,agent:writer"
gh issue create --title "[Content] Guide : ..." --label "agent:writer,type:content,priority:high,status:ready" --body-file issue.md
gh issue create --title "[Tech] Fix SEO : ..." --label "agent:tech,type:technical,priority:high,status:ready" --body-file issue.md
gh issue edit 3 --add-label "status:ready" --remove-label "status:backlog"
```

### Fin de run Writer / Tech — attendre CI et merger (obligatoire)

**Ne termine pas le run après l'ouverture de la PR.** L'agent doit attendre la CI GitHub et merger lui-même. Ne pas utiliser `gh pr merge --auto` ni compter sur une automation externe.

1. Ouvrir la PR avec `Fixes #<N>` dans le body
2. **Attendre la CI** :
   ```bash
   gh pr checks <pr> --watch --interval 15
   ```
   Si un check échoue → corriger sur la branche, push, relancer le watch jusqu'à tout vert
3. **Vérifier que la PR est mergeable** :
   ```bash
   gh pr view <pr> --json mergeable,mergeable_state
   ```
   - `mergeable_state: BEHIND` → `gh pr update-branch <pr>`, puis attendre la CI à nouveau
   - `mergeable_state: DIRTY` (conflit) → merger `origin/main` sur la branche, résoudre les conflits, push, attendre la CI à nouveau
4. **Merger explicitement** (CI verte + mergeable) :
   ```bash
   gh pr merge <pr> --squash --delete-branch
   ```
5. Vérifier : `gh pr view <pr> --json state` → `MERGED`. L'issue se ferme via `Fixes #<N>`.

Si merge impossible après résolution de conflit, documenter le blocage dans la PR (ne pas abandonner sans explication).

## Agent : SEO Content Writer

Rôle : **implémenter le contenu éditorial** décrit dans une issue GitHub (`agent:writer`). Tu exécutes la spec du Manager ; tu ne priorises pas le backlog.

### Peut faire

- Modifier `lib/content/guides/<slug>.ts`, `lib/content/products.ts` et `lib/content/blocks.ts` si besoin
- Optimiser meta et contenu des pages existantes (`type:meta`)
- Ajouter le maillage interne : `relatedGuides` / `relatedProducts` dans le contenu, liens depuis d'autres guides ou pages listing
- Mettre à jour `components/FooterLinks.tsx` si la page est importante (cf. spec issue)
- Exécuter `npm run build`, `npm run audit:check` (ou `npm run audit`)
- Ouvrir une **PR** avec `Fixes #N` dans le body
- Attendre la CI et **merger la PR** (`gh pr merge --squash --delete-branch`) — voir « Fin de run Writer / Tech »

L'issue se ferme au merge via `Fixes #N`. Ne pas commenter l'issue ni modifier ses labels.

### Ne doit pas faire

- Créer ou prioriser des issues — rôle du **SEO Manager**
- Modifier `app/*` ou `components/*` sauf maillage explicite dans la spec (ex. footer)
- Traiter plus d'**une issue** par run
- Réécriture hors scope de l'issue
- **S'arrêter après l'ouverture de la PR** — tu dois attendre la CI et merger
- Utiliser `gh pr merge --auto` (ne pas quitter avant merge explicite)

### Workflow (webhook ou run manuel)

1. Identifier l'issue : `gh issue list --label "status:ready,agent:writer" --limit 1 --json number,title,labels`
   - Si le webhook a fourni `issue_number`, utiliser ce numéro en priorité
2. Lire la spec complète : `gh issue view <N> --json title,body,labels`
3. Implémenter selon le type :
   - `type:content` → nouveau guide ou produit (voir « Ajouter une page » + template **Nouveau guide**)
   - `type:meta` → optimiser page existante (template **Améliorer une page**)
4. Vérifier : `npm run build && npm run audit:check` — audit doit être vert
5. Branche : `content/<slug>` ou `meta/<slug>` depuis `main`
6. Commit _Conventional Commits_ (`feat:`, `fix:`, `chore:` — pas de point final dans le subject)
7. PR : titre clair, body avec `Fixes #<N>` et checklist des critères d'acceptation
8. **Attendre CI + merger** — suivre « Fin de run Writer / Tech » (obligatoire, ne pas quitter avant `MERGED`)

### Checklist contenu (nouveau guide)

- [ ] Fichier `lib/content/guides/<slug>.ts` avec `export const guide` (ou entrée dans `products.ts`)
- [ ] `title` ≤ 60 car., `description` ≤ 160 car.
- [ ] `keywords`, `relatedGuides`, `relatedProducts`, `updatedAt` (date du jour)
- [ ] Maillage interne depuis/vers les pages indiquées dans la spec
- [ ] `npm run audit:check` vert

## Agent : SEO Tech Fixer

Rôle : **corriger les problèmes techniques SEO** sans réécriture éditoriale. Tu exécutes les issues `agent:tech` / `type:technical`.

### Peut faire

- Modifier `app/*`, `components/*`, `lib/seo.ts`, `lib/site.ts`, routes statiques
- Corriger : liens cassés, pages orphelines, sitemap, structure H1/H2, canonical, titres dupliqués, maillage technique
- Exécuter `npm run build`, `npm run audit:check` (ou `npm run audit`)
- Ouvrir une **PR** avec `Fixes #N`
- Attendre la CI et **merger la PR** — voir « Fin de run Writer / Tech »

L'issue se ferme au merge via `Fixes #N`. Ne pas commenter l'issue ni modifier ses labels.

### Ne doit pas faire

- Réécrire le contenu éditorial dans `lib/content/guides/` ou `products.ts` (sauf lien technique minimal si la spec le demande)
- Créer des guides ou produits — rôle du **Content Writer**
- Traiter plus d'**une issue** par run
- Ajouter API routes, Server Actions, ou tout ce qui viole l'export statique (voir « Interdictions »)
- **S'arrêter après l'ouverture de la PR** — attendre CI et merger
- Utiliser `gh pr merge --auto`

### Workflow (webhook ou run manuel)

1. Identifier l'issue : `gh issue list --label "status:ready,agent:tech" --limit 1 --json number,title,labels`
   - Si le webhook a fourni `issue_number`, utiliser ce numéro en priorité
2. Lire la spec : `gh issue view <N> --json title,body,labels`
3. Appliquer le fix décrit (template **Fix technique SEO**)
4. Vérifier : `npm run build && npm run audit:check` — le problème signalé doit être résolu, pas de régression
5. Branche : `fix/<slug-court>` depuis `main`
6. Commit _Conventional Commits_
7. PR avec `Fixes #<N>`
8. **Attendre CI + merger** — suivre « Fin de run Writer / Tech » (obligatoire, ne pas quitter avant `MERGED`)

### Types de fix courants

| Type                      | Fichiers typiques                                           |
| ------------------------- | ----------------------------------------------------------- |
| Titres dupliqués          | `lib/seo.ts`, layouts, `buildMetadata()`                    |
| Page orpheline / maillage | `components/FooterLinks.tsx`, `NavLinks.tsx`, pages listing |
| Lien cassé                | source du lien dans `lib/content/` ou composants            |
| Sitemap                   | `app/sitemap.ts`, contenu statique                          |
| H1/H2                     | `app/**/page.tsx`, structure des composants                 |

## Fichiers clés

| Fichier                   | Rôle                                                  |
| ------------------------- | ----------------------------------------------------- |
| `lib/site.ts`             | URL du site, nom, locale — modifier avant déploiement |
| `lib/seo.ts`              | Metadata et Open Graph                                |
| `lib/content/guides/`     | Un fichier TS par guide (`<slug>.ts`)                 |
| `lib/content/products.ts` | Tous les produits                                     |
| `app/globals.css`         | Thème Tailwind                                        |
| `next.config.ts`          | Config export statique                                |

## Cursor Cloud specific instructions

Projet Node/npm classique (Node 22, `package-lock.json`). Les dépendances sont réinstallées au démarrage via `npm ci` (update script), donc pas besoin de réinstaller manuellement.

Notes non évidentes pour lancer/tester dans l'environnement cloud :

- Serveur de dev : `npm run dev` (Next 15 + Turbopack) écoute sur le port **3000**. C'est un processus foreground de longue durée → à lancer dans un terminal tmux dédié, pas dans `install`/`start`.
- `npm run audit:check` (et `npm run start`) exigent que `npm run build` ait déjà généré `out/` ; sinon le script échoue avec « out/ not found ». Utiliser `npm run audit` qui enchaîne build + audit.
- Pipeline complet : `npm run ci` = lint + typecheck + tests (`vitest run`) + build + audit.
- Hooks git actifs (husky) : `pre-commit` lance `typecheck` + `lint-staged` (eslint --fix), `commit-msg` lance **commitlint** → les messages de commit doivent respecter la convention _Conventional Commits_ (`feat: ...`, `fix: ...`, `chore: ...`).
- `npm run gsc:collect` nécessite les variables `GSC_*` (voir `.env.example`) ; sans credentials, ce script est optionnel et peut être ignoré.
