# Auditoría SENIOR — Universidad Privada UNO (Subsede Cochabamba)

**Fecha:** 2026-08-15 · **Commit:** `5997a80` · **Stack:** Astro 7.1.3 (static) + React 19 + Tailwind 4 + pnpm 10
**Alcance:** SEO técnico, rendimiento / Core Web Vitals, accesibilidad, higiene de repo, CI/CD y plan de despliegue de coste mínimo.

---

## 0. Veredicto ejecutivo

El sitio está **bien construido a nivel de código** (Astro static, i18n nativo, componentes limpios, build en 1.9 s) pero **no está listo para producción** por tres razones, en orden de gravedad:

| # | Problema | Impacto |
|---|---|---|
| 1 | **El `<h1>` de la home se renderiza vacío en el HTML** | Googlebot no ve el titular principal. Pérdida directa de ranking. |
| 2 | **8.35 MB de imágenes en la home**, con originales de 5705×3803 px sin redimensionar | LCP estimado > 6 s en 4G. Reprobado en Core Web Vitals. |
| 3 | **Cero infraestructura SEO**: sin `site`, canonical, sitemap, robots.txt, hreflang, Open Graph ni datos estructurados | El sitio es prácticamente invisible para buscadores y no se puede compartir en redes. |

Añadido: **202 MB de `dist/`** (104 MB de PDFs + 73 MB de vídeo) y un **`.git` de 272 MB** con binarios versionados, lo que condiciona por completo la elección de hosting y encarece cualquier pipeline de CI.

Puntuación estimada Lighthouse móvil actual: **SEO ~70 / Performance ~30–40**. Alcanzable tras las correcciones P0+P1: **SEO 100 / Performance 90+**.

---

## 1. SEO técnico

### 1.1 Bloqueantes (P0)

#### 1.1.1 `<h1>` vacío en el HTML servido — el fallo más grave

`src/components/Hero.tsx:113` renderiza el titular con un efecto máquina de escribir cuyo estado inicial es `''`:

```tsx
const [typedTitle, setTypedTitle] = useState('');   // Hero.tsx:35
...
<h1 aria-label={t.title}>
  <span aria-hidden="true">{typedTitle}</span>      // Hero.tsx:114
```

HTML realmente generado en `dist/index.html`:

```html
<h1 class="..." aria-label="Formamos profesionales que transforman Bolivia">
  <span aria-hidden="true"></span><span aria-hidden="true" class="...animate-pulse..."></span>
</h1>
```

**El `<h1>` está literalmente vacío.** `aria-label` sirve a lectores de pantalla, **no** es una señal de indexación: Google no lo usa como contenido del encabezado. Se está desperdiciando la etiqueta de mayor peso semántico de la página principal.

**Corrección:** inicializar el estado con el texto completo y animarlo solo tras la hidratación, o —mejor— renderizar el texto real y superponer la animación:

```tsx
const [typedTitle, setTypedTitle] = useState(t.title);   // SSR emite el título completo
const [hydrated, setHydrated] = useState(false);
useEffect(() => { setHydrated(true); setTypedTitle(''); /* ...arranca la animación... */ }, [t.title]);
```

Alternativa más robusta y sin CLS: mover el `<h1>` a `index.astro` como HTML estático y dejar que el componente React anime solo un `<span>` decorativo hermano.

> El mismo patrón afecta al párrafo rotatorio (`Hero.tsx:118`), aunque ahí el impacto es menor porque es `aria-hidden` y no es un encabezado.

#### 1.1.2 Falta `site` en `astro.config.mjs`

Sin `site` definido, Astro no puede generar URLs absolutas: no hay canonical, ni sitemap, ni OG bien formados.

```js
export default defineConfig({
  site: 'https://www.uno.edu.bo',   // ← el dominio real de producción
  ...
});
```

#### 1.1.3 Sin sitemap.xml ni robots.txt

No existen `public/robots.txt` ni integración `@astrojs/sitemap`. Son 14 páginas estáticas (7 ES + 7 PT) que Google tiene que descubrir solo por enlaces internos.

```bash
pnpm add @astrojs/sitemap
```

```js
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://www.uno.edu.bo',
  integrations: [react(), sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-BO', pt: 'pt-BR' } } })],
});
```

`public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://www.uno.edu.bo/sitemap-index.xml
```

#### 1.1.4 Sin `<link rel="canonical">`

Ninguna de las 14 páginas declara canónica. Con dos idiomas, rutas con y sin barra final, y un futuro `www` vs apex, esto genera duplicados casi con seguridad.

#### 1.1.5 Sin `hreflang` — el i18n está a medias

`astro.config.mjs` declara `locales: ['es','pt']` y existen `/pt/*` para todas las rutas, pero **el `<head>` no emite un solo `rel="alternate"`**. Google trata ES y PT como páginas independientes sin relación, y el sitio en portugués compite contra el español en lugar de complementarlo.

Todos los datos necesarios ya están en `Layout.astro` (`switchHref`), así que la corrección es de tres líneas.

#### 1.1.6 Sin Open Graph ni Twitter Cards

Cero etiquetas `og:*` / `twitter:*`. Cada enlace compartido por WhatsApp (canal principal de captación de este sitio, dados los tres botones flotantes de WhatsApp) o Facebook se ve como un enlace pelado, sin imagen ni descripción. Para una landing de captación de matrículas esto es una pérdida de conversión directa y medible.

#### 1.1.7 Sin datos estructurados (JSON-LD)

Es una universidad con dirección física, teléfonos, redes sociales y cinco programas académicos, y no emite ni un `schema.org`. Se está renunciando a rich results y a Knowledge Panel gratis. Los datos ya están en el código (`Footer.tsx:18-30`, `Ubicacion.tsx:6`).

**Corrección consolidada — un solo componente `src/components/SeoHead.astro`:**

```astro
---
interface Props { locale: 'es'|'pt'; title: string; description: string; switchHref: string; image?: string; }
const { locale, title, description, switchHref, image = '/og-default.jpg' } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site);
const alternate  = new URL(switchHref, Astro.site);
const ogImage    = new URL(image, Astro.site);
---
<link rel="canonical" href={canonical} />
<link rel="alternate" hreflang={locale === 'es' ? 'pt-BR' : 'es-BO'} href={alternate} />
<link rel="alternate" hreflang={locale === 'es' ? 'es-BO' : 'pt-BR'} href={canonical} />
<link rel="alternate" hreflang="x-default" href={new URL('/', Astro.site)} />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="Universidad Privada UNO · Subsede Cochabamba" />
<meta property="og:locale" content={locale === 'es' ? 'es_BO' : 'pt_BR'} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
<meta name="theme-color" content="#0b3d68" />
```

Y el JSON-LD, solo en la home:

```json
{
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "name": "Universidad Privada UNO · Subsede Cochabamba",
  "url": "https://www.uno.edu.bo/",
  "logo": "https://www.uno.edu.bo/logo/LogotipoOriginalVersiones/recortado/LogotipoOriginalCompleto.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Junín entre J. de la Reza y Calle La Paz",
    "addressLocality": "Cochabamba",
    "addressCountry": "BO"
  },
  "telephone": "+591 64849322",
  "sameAs": [
    "https://www.facebook.com/UNOCBBA",
    "https://www.instagram.com/unocochabamba/",
    "https://www.tiktok.com/@universidadunocbba"
  ]
}
```

Añadir además `ItemList` de carreras en la home y `EducationalOccupationalProgram` en cada `/carreras/[slug]` — los campos (`nombre`, `resumen`, `campoLaboral`, `competencias`) ya existen en `src/data/careers.ts`.

También conviene un `FAQPage` en la sección de preguntas frecuentes (`src/components/Faq.tsx`), que es de los pocos rich results que Google todavía muestra con generosidad.

### 1.2 Importantes (P1)

- **`public/site.webmanifest` sin personalizar.** Dice `"name": "MyWebSite"` y `"short_name": "MySite"` — plantilla de RealFaviconGenerator sin tocar, publicada. Corregir a nombre real, `theme_color` de marca y `start_url: "/"`.
- **Meta description duplicada en portugués.** Comprobar que `src/i18n/pt.json` tiene descripción propia y no una traducción literal que canibalice.
- **`meta name="generator" content="Astro v7.1.3"`** — fingerprinting innecesario. Quitar (`<meta name="generator">` no aporta SEO).
- **Falta `<meta name="robots" content="index,follow,max-image-preview:large">`.** Sin `max-image-preview:large` Google muestra miniaturas pequeñas en resultados; para un sitio tan visual es relevante.
- **Sin breadcrumbs** en `/carreras/[slug]`. Hay un enlace "volver" (`backHref="/#carreras"`, `[slug].astro:41`) pero sin `BreadcrumbList` estructurado.
- **El `alt` de las tarjetas de carrera es solo el nombre** (`CareerCard.tsx:65` → `alt={nombre}`). Poco descriptivo; usar `alt={`Estudiantes de ${nombre} en la Universidad Privada UNO Cochabamba`}`.
- **PDFs indexables sin control.** 104 MB de PDFs en `public/pdf/` que Google indexará y que competirán con las páginas HTML. Decidir: o `X-Robots-Tag: noindex` por cabecera, o dejarlos indexar deliberadamente. Hoy es un accidente, no una decisión.
- **Sin página 404 personalizada** (`src/pages/404.astro`). El host servirá su propio 404 genérico.

### 1.3 Menores (P2)

- Sin `lang` alternativo en el conmutador de idioma del `Header` (`hreflang` en el `<a>`).
- Sin `rel="noopener noreferrer"` completo en enlaces externos (`Footer.tsx:65,77` usan solo `noopener`; correcto técnicamente en navegadores modernos, pero conviene homogeneizar).
- El iframe de Google Maps (`Ubicacion.tsx:24`) carga un tercero pesado; ya tiene `loading="lazy"`, bien. Considerar sustituirlo por una imagen estática con enlace, que ahorra ~700 KB y varias conexiones de terceros.

---

## 2. Rendimiento y Core Web Vitals

### 2.1 El JS está bien; las imágenes son el desastre

Medido sobre el build real:

| Recurso | Sin comprimir | gzip |
|---|---|---|
| HTML home | 88 KB | **16 KB** |
| JS inicial (11 módulos) | 246 KB | **81 KB** |
| CSS | 40 KB | **7 KB** |
| **Imágenes home** | **8.35 MB** | — (ya comprimidas) |

**104 KB de código vs 8.35 MB de imágenes.** El presupuesto de rendimiento se lo comen enteramente los assets visuales. Cualquier optimización de JS antes de arreglar las imágenes es tiempo perdido.

### 2.2 LCP: 3.81 MB por encima del pliegue, sin `srcset`

El carrusel del hero (`HeroCarousel.tsx:34`) monta **los cinco slides a la vez**, con `<img>` nativo, sin `loading`, sin `fetchpriority`, sin `srcset` y sin `width`/`height`:

```tsx
<img src={slide.src} alt="" className="h-full w-full ... object-cover ..." />
```

Peso real servido:

```
 728 KB  estudiantes-biblioteca.webp
 713 KB  estudiantes-libro-biblioteca.webp
 822 KB  med-todos.webp
 559 KB  enf-estudiandes-uno.webp
1076 KB  admin-todos-uno.webp
────────
3.81 MB  solo el hero, todo eager
```

Y las dimensiones reales de esos archivos:

| Archivo | Píxeles |
|---|---|
| `estudiantes-biblioteca.webp` | **5705 × 3803** |
| `admin-todos-uno.webp` | **5685 × 3790** |
| `fisio-area-fisio.webp` | **5890 × 3927** |

Se están sirviendo fotos de **22 megapíxeles** a móviles de 390 px de ancho. **No se está usando `astro:assets` en ningún sitio** (`grep '<Image'` → 0 resultados): las imágenes se importan como módulos y se pasan como `src` crudo a un `<img>` de React, así que Astro las copia con hash pero **no las redimensiona ni genera variantes**.

**Impacto estimado:** LCP de 6–9 s en 4G móvil. Reprobado.

**Corrección — es la acción de mayor retorno de toda la auditoría.** Dos caminos:

**(a) Pre-procesar los originales** (más simple, funciona con `<img>` de React). Generar variantes en build con `sharp`, o simplemente reducir los originales a ≤ 2560 px de ancho y calidad 78. Solo esto lleva el hero de 3.81 MB a ~450 KB.

**(b) Usar `astro:assets` correctamente** — pasar las imágenes ya procesadas desde el `.astro` al componente React como props:

```astro
---
import { getImage } from 'astro:assets';
import slide1 from '../assets/images/estudiantes/estudiantes-biblioteca.webp';

const heroSlides = await Promise.all([slide1, ...].map(async (img) => ({
  sm: (await getImage({ src: img, width: 768,  format: 'webp', quality: 72 })).src,
  md: (await getImage({ src: img, width: 1440, format: 'webp', quality: 75 })).src,
  lg: (await getImage({ src: img, width: 2560, format: 'webp', quality: 78 })).src,
})));
---
<Hero slides={heroSlides} client:visible />
```

Y en `HeroCarousel.tsx`:

```tsx
<img
  src={slide.lg}
  srcSet={`${slide.sm} 768w, ${slide.md} 1440w, ${slide.lg} 2560w`}
  sizes="100vw"
  width={2560} height={1440}
  loading={i === 0 ? 'eager' : 'lazy'}
  fetchPriority={i === 0 ? 'high' : 'low'}
  decoding={i === 0 ? 'sync' : 'async'}
  alt=""
/>
```

Añadir además en `Layout.astro` un `<link rel="preload" as="image" imagesrcset="..." fetchpriority="high">` para el primer slide.

**Ahorro estimado: 8.35 MB → ~900 KB en la home (-89 %).**

### 2.3 `client:visible` en el Hero es un error de altura de render

`index.astro:28` monta el Hero con `client:visible`. El Hero **está siempre en el viewport inicial**, así que `client:visible` no ahorra nada: dispara igual al cargar, pero añade la latencia del `IntersectionObserver` y del chunk diferido. Combinado con el `<h1>` que solo aparece tras hidratar, el usuario ve un hero sin titular durante los primeros cientos de milisegundos.

Con el `<h1>` corregido (§1.1.1) esto deja de importar para SEO, pero para LCP conviene: `client:load` en el Hero, o mejor, mover lo estático a `.astro` y dejar solo la animación en React.

### 2.4 CLS: el `<h1>` que crece

El titular se escribe carácter a carácter dentro de un contenedor sin altura reservada (`Hero.tsx:113`), y el párrafo rotatorio mitiga parcialmente con `min-h-14` (`Hero.tsx:118`) pero el `<h1>` no tiene equivalente. En móvil, al pasar de 1 a 2 líneas, todo el bloque inferior se desplaza. **CLS penalizado.**

Corrección: `min-h-[2.4em] sm:min-h-[2.6em]` en el `<h1>`, o renderizar el texto completo (§1.1.1), que elimina el problema de raíz.

### 2.5 Fuentes: render-blocking desde un tercero

`Layout.astro:48-51` carga Montserrat + Poppins desde Google Fonts con un `<link rel="stylesheet">` **bloqueante**, con dos `preconnect` que ayudan pero no eliminan el salto de dominio. Son 9 pesos (`300;400;500;600` + `600;800;900`), probablemente más de los que se usan.

**Corrección:** autoalojar con `@fontsource-variable/montserrat` y `@fontsource/poppins`, o directamente con `astro:fonts` (nativo en Astro 5+). Elimina 2 conexiones DNS/TLS, el bloqueo de render y una dependencia externa de terceros (relevante también por GDPR/privacidad). Ahorro típico: 300–500 ms de FCP.

### 2.6 Vídeo: `preload="metadata"` × 5 en la home

`CareerCard.tsx:73` usa `preload="metadata"` en los previews de las cinco carreras. Cinco peticiones adicionales antes de cualquier interacción. Los previews pesan 587–795 KB cada uno.

**Corrección:** `preload="none"` y cargar el `src` solo en `onMouseEnter` (el estado `showPreview` ya existe en `CareerCard.tsx:68` — basta con no emitir el atributo `src` hasta que sea `true`). `VideoModal.tsx:78` ya usa `preload="none"` correctamente.

### 2.7 Cabeceras de caché (dependen del host, hoy sin definir)

No hay `_headers`, `vercel.json`, ni `nginx.conf`. Sin esto, todo se sirve con la caché por defecto del host. Los assets de `/_astro/` llevan hash en el nombre y **deben** servirse inmutables:

```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/video/*
  Cache-Control: public, max-age=2592000

/pdf/*
  Cache-Control: public, max-age=604800

/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

---

## 3. Accesibilidad

Bastante decente en general, con tres puntos concretos:

1. **`<h1>` vacío visualmente accesible solo por `aria-label`** (`Hero.tsx:113`). Funciona para lectores de pantalla, pero es frágil: si falla el JS, el usuario vidente no ve titular alguno. El texto real en el DOM lo resuelve todo a la vez.
2. **`alt=""` en los slides del hero** (`HeroCarousel.tsx:36`) — correcto, son decorativos. Igual en `TestimonioCard.tsx:44` con `aria-hidden="true"`. Bien resuelto.
3. **Contraste**: `text-white/85` sobre imágenes fotográficas (`Hero.tsx:118`) puede caer por debajo de 4.5:1 según el slide. Hay un velo con `mix-blend-overlay` (`Hero.tsx:103`) que ayuda, pero conviene verificar con las cinco imágenes reales.
4. **`prefers-reduced-motion` no está contemplado.** Hay animación de tecleo, zoom continuo del hero (`animate-hero-zoom`), carrusel con autoplay, `Reveal` con motion en todas las secciones y pulsos de cursor. Para usuarios con sensibilidad vestibular esto es agresivo. Añadir en `global.css`:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
   Y respetar el flag en `Reveal.tsx` y en el autoplay de Embla.

---

## 4. Higiene de repositorio y CI/CD

### 4.1 Binarios versionados en Git — 272 MB de `.git`

```
.git         272 MB
public/pdf   104 MB   (5 PDFs, el mayor de 29 MB)
public/video  73 MB   (5 completos + 5 previews)
dist/        202 MB
```

Los PDFs y vídeos están **trackeados en Git** (`.gitignore` tiene `# *.pdf` comentado). Cada revisión de un PDF de 29 MB añade 29 MB permanentes al historial. Consecuencias directas en CI/CD:

- **Cada job de CI clona 272 MB.** Con `fetch-depth: 1` se mitiga, pero el checkout sigue siendo lento y sujeto a límites de repositorio del proveedor Git.
- El repo crecerá sin techo cada vez que Marketing actualice una malla curricular.
- GitHub avisa a partir de 1 GB y bloquea archivos individuales de más de 100 MB.

**Recomendación (por orden de preferencia):**

1. **Sacar vídeos y PDFs del repo por completo** y servirlos desde almacenamiento de objetos (DigitalOcean Spaces / Cloudflare R2). Es además lo que resuelve el problema de hosting (§5).
2. Si deben permanecer en el repo: **Git LFS** (`git lfs track "*.pdf" "*.mp4"`), asumiendo el coste de LFS del proveedor.
3. En cualquier caso: **descomentar `*.pdf` en `.gitignore`** solo después de haber migrado, nunca antes.

> Limpiar el historial existente requiere `git filter-repo` y un force-push. Es viable (proyecto de un solo colaborador, `rodres101`), pero coordinarlo. Si no se limpia, los 272 MB se arrastran para siempre.

### 4.2 Los PDFs pesan 15–29 MB cada uno

```
29.2 MB  derecho.pdf
28.6 MB  fisioterapia-kinesiologia.pdf
21.1 MB  administracion-empresas.pdf
15.5 MB  enfermeria.pdf
10.6 MB  medicina.pdf
 4.3 MB  RES-MIN-MAY-2025.pdf
```

Son mallas curriculares. **Un PDF de malla curricular no debería pesar más de 1–2 MB.** Casi con seguridad contienen imágenes a 300 dpi sin submuestrear. Con Ghostscript:

```bash
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/ebook \
   -dDownsampleColorImages=true -dColorImageResolution=150 \
   -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=derecho-opt.pdf derecho.pdf
```

Reducción esperada: **104 MB → 8–12 MB (-90 %)**. Esto por sí solo hace viable el hosting gratuito (§5.2). Verificar legibilidad tras comprimir.

### 4.3 No existe pipeline de CI/CD

`ls .github` → no existe. Hoy el despliegue es manual. Para un sitio de captación de matrículas mantenido por un freelance, esto significa:

- Nada impide desplegar un build roto.
- No hay entornos de preview para que el cliente revise antes de publicar.
- No hay verificación de que `pnpm build` pase antes de fusionar.
- No hay control de regresiones de rendimiento (crítico, dado el estado actual).

**Pipeline mínimo recomendado** — `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  pull_request:
  push: { branches: [master] }

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 1 }          # evita clonar 272 MB de historial
      - uses: pnpm/action-setup@v4
        with: { version: 10.34.5 }
      - uses: actions/setup-node@v4
        with:
          node-version: '22.12.0'          # coincide con engines de package.json
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec astro check          # typecheck de .astro + TS
      - run: pnpm build
      - uses: actions/upload-artifact@v4
        with: { name: dist, path: dist/, retention-days: 5 }
```

**Añadir presupuesto de rendimiento** (para que el problema de las imágenes no reaparezca) — `.github/workflows/lighthouse.yml` con `treosh/lighthouse-ci-action` y `budget.json`:

```json
[{
  "path": "/*",
  "resourceSizes": [
    { "resourceType": "image",  "budget": 1200 },
    { "resourceType": "script", "budget": 250  },
    { "resourceType": "total",  "budget": 2000 }
  ]
}]
```

Con eso, cualquier PR que vuelva a meter una foto de 22 MP falla en CI. Es la única defensa real y automática contra la regresión.

### 4.4 Otras observaciones de CI/CD

- **`engines: node >=22.12.0`** está declarado en `package.json` pero no hay `.nvmrc` ni `.node-version`. Añadir uno para que el host (DO, Cloudflare, Netlify) elija la versión correcta automáticamente.
- **`pnpm-workspace.yaml` existe con un solo paquete** — overhead innecesario salvo que se planee un monorepo.
- **`@vercel/analytics` está en dependencias y activo en `Layout.astro:9,54`**, pero el adaptador de Vercel está comentado en `astro.config.mjs:8,25-30`. **Si no se despliega en Vercel, el script de analytics carga y falla silenciosamente** (llama a `/_vercel/insights/script.js`, que devolverá 404). Es peso muerto y una petición fallida en cada carga. **Decidir: o se despliega en Vercel, o se quita `@vercel/analytics` y se sustituye por Plausible/Umami/GA4.**
- **Sin `astro check` en el flujo** pese a tener TypeScript configurado.
- **`.DS_Store` presente en `public/` y `src/assets/`** aunque está en `.gitignore` — verificar que no se hayan colado en el historial (`git ls-files | grep DS_Store`).
- **`video-src/` en el repo** con `original/` y `bin/` ignorados: buena decisión, bien resuelto.
- **Sin `.env.example`** — no parece haber secretos hoy (sitio 100 % estático, formularios sin backend visible), pero conviene documentarlo cuando el formulario de preinscripción (`PreinscripcionCta.tsx`) tenga destino real.

---

## 5. Despliegue: opciones más baratas

### 5.1 El condicionante: 202 MB de `dist/` y el ancho de banda

Antes de elegir host hay que entender el consumo real. Con el sitio **tal como está hoy**:

- Una visita a la home descarga ~8.5 MB.
- Una descarga de la malla de Derecho: 29 MB.
- 1000 visitas/mes con un 10 % de descargas de PDF ≈ **8.5 GB + 2.5 GB ≈ 11 GB/mes**.

Con las optimizaciones de §2.2 y §4.2:

- Home: ~1 MB. PDF: ~2 MB.
- Las mismas 1000 visitas ≈ **1.2 GB/mes**. Diez veces menos.

**Esto cambia por completo qué hosting es viable.** Optimizar primero no es solo cuestión de SEO: es lo que decide si el sitio cuesta 0 $ o 15 $/mes.

### 5.2 Comparativa

| Opción | Coste/mes | Ancho de banda | Veredicto |
|---|---|---|---|
| **Cloudflare Pages + R2** | **$0** | **Ilimitado** (Pages) + egress gratis (R2) | **Recomendada.** La más barata que existe, sin trampas. |
| **DO App Platform (static)** | $0 (hasta 3 apps) | **1 GiB/mes**, luego $0.02/GiB | Trampa: 1 GiB se agota en ~120 visitas actuales. |
| **DO App Platform + Spaces** | **$5** | 1 TB en Spaces + CDN incluido | **Recomendada si el cliente exige DigitalOcean.** |
| **DO Droplet + nginx** | $4–6 | 500 GB–1 TB | Solo si hace falta backend. Añade mantenimiento. |
| Netlify / Vercel free | $0 | 100 GB/mes | Válido, pero el ToS de Vercel prohíbe servir vídeo en el plan Hobby. |

### 5.3 Recomendada: Cloudflare Pages + R2 — **$0/mes**

Cloudflare Pages no limita el ancho de banda en el plan gratuito. Dos advertencias importantes que condicionan la arquitectura:

1. **Límite de 25 MiB por archivo.** Los PDFs de 29.2 MB y 28.6 MB **serán rechazados en el deploy tal como están hoy**. Comprimirlos (§4.2) resuelve esto, y de todos modos hay que hacerlo.
2. **Servir vídeo desde Pages roza el ToS de Cloudflare** (sección 2.8: contenido no-HTML desproporcionado). Los 73 MB de vídeo deben ir a **R2** (10 GB de almacenamiento gratis, **egress $0**) o a Cloudflare Stream.

**Arquitectura:** HTML/CSS/JS/imágenes en Pages · vídeos y PDFs en R2 con dominio propio (`media.uno.edu.bo`).

**Pasos:**

```bash
# 1. Optimizar PDFs e imágenes primero (§4.2, §2.2)

# 2. Sacar media del repo
git rm -r --cached public/video public/pdf
printf '\npublic/video/\npublic/pdf/\n' >> .gitignore

# 3. Subir a R2 (rclone o wrangler)
npx wrangler r2 bucket create uno-media
npx wrangler r2 object put uno-media/pdf/derecho.pdf --file=./pdf-opt/derecho.pdf
# ...o rclone sync ./media uno-r2:uno-media

# 4. En el panel de R2: Settings → Public access → conectar dominio media.uno.edu.bo
```

Luego, en el código, reemplazar rutas locales por la variable de entorno:

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://www.uno.edu.bo',
  vite: { define: { 'import.meta.env.PUBLIC_MEDIA_URL': JSON.stringify(process.env.PUBLIC_MEDIA_URL ?? '') } },
});
```

```tsx
const MEDIA = import.meta.env.PUBLIC_MEDIA_URL || '';
mallaHref={`${MEDIA}/pdf/vaucher/${career.slug}.pdf`}
```

**Conectar el despliegue** (dos vías):

- **Vía panel (más simple):** Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → seleccionar el repo. Build command: `pnpm build`. Output directory: `dist`. Variable de entorno: `NODE_VERSION=22.12.0`. Cada push a `master` despliega; cada PR genera una **URL de preview** automática para que el cliente revise.
- **Vía GitHub Actions** (más control, permite encadenar el presupuesto Lighthouse):

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push: { branches: [master] }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 1 }
      - uses: pnpm/action-setup@v4
        with: { version: 10.34.5 }
      - uses: actions/setup-node@v4
        with: { node-version: '22.12.0', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
        env:
          PUBLIC_MEDIA_URL: https://media.uno.edu.bo
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=universidad-uno
```

Añadir `public/_headers` con las cabeceras de caché de §2.7 — Cloudflare Pages lo respeta de forma nativa.

**Coste total: $0/mes.** Dominio aparte (~$12–15/año para un `.edu.bo` o `.com`).

### 5.4 Si el cliente exige DigitalOcean — **$5/mes**

DO App Platform tiene tier gratuito para sitios estáticos (hasta 3 apps), **pero con solo 1 GiB de transferencia saliente al mes por app**, y $0.02/GiB después. Con el sitio actual (8.5 MB/visita), 1 GiB se agota en **~120 visitas**. Incluso optimizado (~1 MB/visita) son ~1000 visitas/mes. Para una landing de captación en temporada de matrículas, insuficiente.

**Arquitectura viable en DO:**

| Componente | Servicio | Coste |
|---|---|---|
| Sitio estático (HTML/CSS/JS/img) | App Platform, tier estático | **$0** |
| Vídeos + PDFs | **Spaces** (250 GiB almacenamiento + **1 TB transferencia**, CDN incluido) | **$5.00** |
| Transferencia extra | $0.01/GB por encima de 1 TB | ~$0 |
| **Total** | | **$5/mes** |

Es la misma arquitectura que §5.3, sustituyendo Pages→App Platform y R2→Spaces. Spaces incluye CDN de borde sin coste adicional y 1 TB de transferencia, que cubre de sobra este caso.

**Pasos:**

1. **Crear el Space:**
   `Panel DO → Spaces Object Storage → Create → región NYC3 o SFO3 → nombre uno-media → Enable CDN`.
2. **Subir media** con `s3cmd` o `rclone` (Spaces es compatible con S3):
   ```bash
   rclone sync ./public/video do-spaces:uno-media/video --header-upload "Cache-Control: public, max-age=2592000"
   rclone sync ./pdf-opt   do-spaces:uno-media/pdf   --header-upload "Cache-Control: public, max-age=604800"
   ```
   Marcar los objetos como públicos y, en `Settings → CDN`, asociar el subdominio `media.uno.edu.bo`.
3. **Crear la App:**
   `Panel DO → Apps → Create App → GitHub → repo srodrigo23/universidad-uno → rama master`.
   DO autodetecta Astro. Verificar:
   - Type: **Static Site** (crítico — si detecta "Web Service" cobrará $5/mes de contenedor innecesariamente)
   - Build command: `pnpm build`
   - Output directory: `dist`
   - Env var: `PUBLIC_MEDIA_URL=https://media.uno.edu.bo`, `NODE_VERSION=22.12.0`
4. **Dominio:** `App → Settings → Domains → Add Domain`. DO gestiona el certificado TLS automáticamente (Let's Encrypt).
5. **Autodeploy:** activar "Autodeploy on push" — DO despliega en cada push a `master`.

> **Alternativa Droplet ($4–6/mes):** un Droplet básico con nginx sirviendo `dist/` y desplegado por `rsync` desde GitHub Actions. Sale igual de caro que App Platform+Spaces pero añade parcheo de SO, configuración de TLS, hardening y monitorización. **No lo recomiendo** para un sitio 100 % estático: es coste operativo puro sin beneficio.

### 5.5 Sobre `@vercel/analytics`

Decisión pendiente que afecta al despliegue: `Layout.astro:9,54` carga `@vercel/analytics`, que **solo funciona en Vercel**. En Cloudflare o DO generará un 404 en cada carga de página.

- Si se va a Cloudflare: usar **Cloudflare Web Analytics** (gratis, sin cookies, sin banner de consentimiento).
- Si se va a DO: **Plausible** (~$9/mes) o **Umami** autoalojado, o GA4 gratis.
- En cualquier caso: **quitar `@vercel/analytics` de `package.json` y de `Layout.astro`.**

---

## 6. Plan de trabajo priorizado

| Orden | Tarea | Esfuerzo | Impacto |
|---|---|---|---|
| **1** | Arreglar el `<h1>` vacío (`Hero.tsx:35,113`) | 15 min | **Crítico SEO** |
| **2** | Añadir `site` + `@astrojs/sitemap` + `robots.txt` | 30 min | **Crítico SEO** |
| **3** | Componente `SeoHead.astro`: canonical + hreflang + OG + Twitter | 1 h | **Crítico SEO** |
| **4** | Redimensionar imágenes a ≤2560 px + `srcset` + `fetchpriority` | 3 h | **Crítico LCP** (-89 % peso) |
| **5** | Comprimir PDFs con Ghostscript (104 MB → ~10 MB) | 1 h | **Crítico coste hosting** |
| **6** | JSON-LD: `CollegeOrUniversity` + `EducationalOccupationalProgram` + `FAQPage` | 1.5 h | Alto SEO |
| **7** | Sacar `public/video` y `public/pdf` a R2/Spaces | 2 h | Alto (coste + repo) |
| **8** | CI en GitHub Actions (`astro check` + `build` + Lighthouse budget) | 1.5 h | Alto (prevención) |
| **9** | Desplegar en Cloudflare Pages (o DO) con dominio y `_headers` | 1.5 h | Entrega |
| **10** | Autoalojar fuentes, quitar `@vercel/analytics`, corregir `site.webmanifest` | 1 h | Medio |
| **11** | `prefers-reduced-motion`, `404.astro`, `preload="none"` en previews de vídeo | 1 h | Medio |
| **12** | Limpiar el historial de Git con `git filter-repo` (272 MB → ~15 MB) | 1 h | Medio (CI) |

**Total estimado: ~16 horas.** Los puntos 1–5 (≈6 h) resuelven el 80 % del problema y son el mínimo innegociable antes de publicar.

---

## Fuentes

- [App Platform Pricing — DigitalOcean Documentation](https://docs.digitalocean.com/products/app-platform/details/pricing/)
- [App Platform Pricing — DigitalOcean](https://www.digitalocean.com/pricing/app-platform)
- [Spaces Pricing — DigitalOcean Documentation](https://docs.digitalocean.com/products/spaces/details/pricing/)
- [Spaces Details — DigitalOcean Documentation](https://docs.digitalocean.com/products/spaces/details/)
- [DigitalOcean Spaces — S3-Compatible Object Storage](https://www.digitalocean.com/products/spaces)
