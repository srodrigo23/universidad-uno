// Código.gs — Apps Script vinculado a la hoja de preinscripciones

const HOJA = 'Preinscripciones';
const CAMPOS = ['nombres', 'apellidos', 'prefijo', 'celular', 'correo', 'carrera'];

function doPost(e) {
  // Un lock evita que dos envíos simultáneos calculen la misma fila y se pisen.
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);

    const datos = JSON.parse(e.postData.contents);

    // Honeypot: campo oculto que un humano nunca rellena. Si viene lleno, es un bot.
    // Se responde 200 a propósito para no darle señal de que fue detectado.
    if (datos.website) return json({ ok: true });

    const faltan = CAMPOS.filter((campo) => !String(datos[campo] || '').trim());
    if (faltan.length) return json({ ok: false, error: 'faltan campos', faltan });

    const hoja = obtenerHoja();
    hoja.appendRow([
      new Date(),
      datos.nombres,
      datos.apellidos,
      // Comilla simple: fuerza texto y evita que Sheets se coma el "+" o el cero inicial.
      "'" + datos.prefijo + ' ' + datos.celular,
      datos.correo,
      datos.carrera,
      datos.idioma || '',
      datos.origen || '',
    ]);

    return json({ ok: true });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

/** Para comprobar desde el navegador que la implementación responde. */
function doGet() {
  return json({ ok: true, servicio: 'preinscripciones' });
}

function obtenerHoja() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(HOJA);

  if (!hoja) {
    hoja = libro.insertSheet(HOJA);
  }

  if (hoja.getLastRow() === 0) {
    hoja
      .appendRow(['Fecha', 'Nombres', 'Apellidos', 'Celular', 'Correo', 'Carrera', 'Idioma', 'Origen'])
      .setFrozenRows(1);
  }

  return hoja;
}

function json(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
