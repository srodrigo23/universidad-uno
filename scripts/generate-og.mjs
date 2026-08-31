/**
 * Genera las imágenes Open Graph (1200×630) en `public/og/`.
 *
 *   node scripts/generate-og.mjs
 *
 * Se ejecuta a mano: solo hay que volver a lanzarlo si cambian las fotos de
 * origen o el logo. Las imágenes resultantes se versionan en el repo.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(root, 'public/og');
const LOGO = path.join(
  root,
  'public/logo/LogotipoOriginalVersiones/LogotipoNegativoCompleto.png',
);

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_HEIGHT = 132;
const MARGIN = 64;

/**
 * Velo azul de marca: la foto se ve, y el degradado inferior crea la banda
 * oscura sobre la que se apoya el logo con contraste suficiente.
 */
const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="veil" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%"   stop-color="#222a52" stop-opacity="0.95"/>
      <stop offset="38%"  stop-color="#222a52" stop-opacity="0.62"/>
      <stop offset="100%" stop-color="#21366f" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#veil)"/>
  <rect x="0" y="${HEIGHT - 10}" width="${WIDTH}" height="10" fill="#029efb"/>
</svg>`);

const targets = [
  { name: 'default', src: 'src/assets/images/estudiantes/estudiantes-biblioteca.webp' },
  { name: 'enfermeria', src: 'src/assets/images/enfermeria/enf-enseniando-ecografia.webp' },
  { name: 'medicina', src: 'src/assets/images/medicina/med-un-medico.webp' },
  { name: 'fisioterapia-kinesiologia', src: 'src/assets/images/fisio/fisio-dos-estudiantes.webp' },
  { name: 'derecho', src: 'src/assets/images/derecho/derecho-juicio.webp' },
  { name: 'administracion-empresas', src: 'src/assets/images/admin/admin-laboratorio-de-comp.webp' },
];

const logo = await sharp(LOGO)
  .trim()
  .resize({ height: LOGO_HEIGHT })
  .png()
  .toBuffer();

await mkdir(OUT_DIR, { recursive: true });

for (const { name, src } of targets) {
  const base = await sharp(path.join(root, src))
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' })
    .toBuffer();

  const out = path.join(OUT_DIR, `${name}.jpg`);
  const info = await sharp(base)
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: logo, top: HEIGHT - LOGO_HEIGHT - MARGIN, left: MARGIN },
    ])
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(out);

  console.log(`${path.relative(root, out)}  ${Math.round(info.size / 1024)} KB`);
}
