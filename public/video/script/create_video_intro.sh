#!/bin/bash
# optimize-videos.sh
# mkdir -p out

cd ../original

for f in *.mp4; do
  name="${f%.*}"
  echo "Procesando: $name"

  # 1) Video completo — va en el modal -an elimina el audio
  ffmpeg -i "$f" -vf "scale=-2:1080" \
    -c:v libx264 -crf 26 -preset slow -profile:v high -pix_fmt yuv420p \
    -movflags +faststart "../optimized/complete/${name}.mp4"

  # 2) Preview loop — va en la tarjeta
  ffmpeg -i "$f" -ss 00:00:02 -t 6 -vf "scale=-2:480" \
    -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p \
    -movflags +faststart -an "../optimized/loop/${name}-preview.mp4"

  # 3) Poster
  ffmpeg -i "$f" -ss 00:00:01 -vframes 1 \
    -vf "scale=-2:1080" -q:v 3 "../optimized/poster/${name}.jpg"
done

echo "Listo."