#!/bin/bash
# optimize-videos.sh
# Genera los derivados que consume el sitio desde video-src/original
# hacia public/video/optimized. Ejecutar desde video-src/script.

# Los originales vienen con letterbox de 96px arriba y abajo (contenido real
# 1920x888). Sin recortarlo, object-cover deja las barras visibles en la tarjeta.
CROP="crop=1920:888:0:96"

cd ../original

for f in *.mp4; do
  name="${f%.*}"
  echo "Procesando: $name"

  # 1) Video completo — va en el modal. Conserva el audio del original
  ffmpeg -i "$f" -vf "$CROP" \
    -c:v libx264 -crf 26 -preset slow -profile:v high -pix_fmt yuv420p \
    -c:a aac -b:a 128k \
    -movflags +faststart "../../public/video/optimized/complete/${name}.mp4"

  # 2) Preview loop — va en la tarjeta. -an lo deja mudo: sin eso iOS bloquea el autoplay
  ffmpeg -i "$f" -ss 00:00:02 -t 6 -vf "$CROP,scale=-2:480" \
    -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p \
    -movflags +faststart -an "../../public/video/optimized/loop/${name}-preview.mp4"

  # 3) Poster
  ffmpeg -i "$f" -ss 00:00:01 -vframes 1 \
    -vf "$CROP" -q:v 3 "../../public/video/optimized/poster/${name}.jpg"
done

echo "Listo."
