# Nippon Heritage - SEO, Admin et Supabase

## Resume d'architecture

- Site public statique conserve a l'identique visuellement.
- SEO technique gere dans les fichiers HTML, `robots.txt`, `sitemap.xml` et JSON-LD.
- Administration separee sous `/admin` et `/admin/login`.
- Authentification admin via Supabase Auth.
- Acces aux donnees admin via fonctions Vercel `api/admin/*`.
- Catalogue public dynamique via `api/public/motorcycles`, avec repli automatique sur les cartes HTML existantes si Supabase n'est pas configure.

## Variables d'environnement

Definir sur Vercel :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL=https://www.nipponheritage.fr`
- `GOOGLE_SITE_VERIFICATION` si verification Search Console par meta tag souhaitee

## Mise en place Supabase

1. Creer un projet Supabase.
2. Executer la migration `supabase/migrations/20260428193000_init.sql`.
3. Creer un utilisateur admin dans `Authentication > Users`.
4. Inserer son profil dans `public.admin_profiles` avec le meme `id` que `auth.users.id`.

Exemple SQL manuel apres creation de l'utilisateur :

```sql
insert into public.admin_profiles (id, email, role)
values ('UUID_UTILISATEUR', 'admin@exemple.fr', 'admin');
```

## Comportement du catalogue public

- Sans configuration Supabase : les cartes HTML actuelles restent affichees.
- Avec Supabase configure : les motos `published` remplacent les cartes statiques tout en gardant le meme design.

## Routes importantes

- `/`
- `/merci.html`
- `/sitemap.xml`
- `/robots.txt`
- `/admin`
- `/admin/login`

## Verification Google

Le projet prevoit la variable `GOOGLE_SITE_VERIFICATION`. Sur cette architecture statique, la valeur est injectee au chargement par JavaScript si elle est definie. Pour une verification 100 % immediate sans JS, vous pouvez aussi ajouter le fichier HTML de verification fourni par Google a la racine du projet.
