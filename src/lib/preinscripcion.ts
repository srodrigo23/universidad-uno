/**
 * Endpoint del Apps Script vinculado a la hoja de preinscripciones.
 *
 * No es un secreto: cualquier `PUBLIC_*` de Astro se incrusta en el bundle, así
 * que la URL viaja al cliente igualmente. Se deja como constante para que el
 * formulario no dependa de una variable de entorno que, si falta en el host,
 * lo rompería en silencio. Al re-desplegar el script hay que crear una versión
 * nueva y actualizar esta URL.
 */
// const ENDPOINT =
//   'https://script.google.com/macros/s/AKfycbwIOoyv0QVaARUPU09J9M8Y78q2CUMvcZqyjLK84gKwogP7_hvbP2E6AhFRldIXBC4nPA/exec';

// const alternative = 'https://script.google.com/macros/s/AKfycbw9mKQbcQ4sk7zLrQmS1pG_IRHzvFN8UstPedkj2P8pIAkvuXpvLLm_PLU6Vt9BfMvi/exec'

const ENDPOINT_UNO = 'https://script.google.com/macros/s/AKfycbxOfERSX6fP8V_kOcehuUFxr6dpwy1gdGDd4w5nzOZVHN91CjMMNPraDVXvrgbtg0CzZQ/exec'

const TIMEOUT_MS = 15000;

export interface PreinscripcionPayload {
  nombres: string;
  apellidos: string;
  prefijo: string;
  celular: string;
  correo: string;
  carrera: string;
  /** Honeypot: si llega con valor, el script lo descarta como bot. */
  website?: string;
}

export async function enviarPreinscripcion(datos: PreinscripcionPayload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const respuesta = await fetch(ENDPOINT_UNO, {
      method: 'POST',
      // text/plain a propósito: con application/json el navegador manda un
      // preflight OPTIONS que Apps Script no responde y la petición muere en CORS.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        ...datos,
        idioma: document.documentElement.lang,
        origen: window.location.pathname,
      }),
      signal: controller.signal,
    });

    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

    const cuerpo = await respuesta.json();
    if (!cuerpo?.ok) throw new Error(cuerpo?.error ?? 'respuesta no válida');
  } finally {
    clearTimeout(timeout);
  }
}
