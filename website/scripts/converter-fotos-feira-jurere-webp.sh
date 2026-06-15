#!/usr/bin/env bash
set -euo pipefail

SRC="${1:-/Users/bruno/clientes_convidados/clientes/05_feira_criativa_jurere/FOTOS SITE FEIRA JURERE}"
DST="${2:-/Users/bruno/clientes_convidados/clientes/05_feira_criativa_jurere/website/midia/fotos_feira_jurere_webp}"
MAX_DIMENSION="${MAX_DIMENSION:-1800}"
QUALITY="${QUALITY:-78}"

if ! command -v magick >/dev/null 2>&1; then
  echo "❌ ImageMagick não encontrado. Instale com: brew install imagemagick" >&2
  exit 1
fi

if [[ ! -d "$SRC" ]]; then
  echo "❌ Pasta de origem não encontrada: $SRC" >&2
  exit 1
fi

mkdir -p "$DST"
MANIFEST="$DST/manifest.csv"
printf 'arquivo_origem,arquivo_webp,tamanho_webp_bytes\n' > "$MANIFEST"

count=$(find "$SRC" -maxdepth 1 -type f \( \
  -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.heic' -o -iname '*.heif' \
\) | wc -l | tr -d ' ')

if [[ "$count" == "0" ]]; then
  echo "⚠️ Nenhuma imagem compatível encontrada em: $SRC"
  exit 0
fi

i=0
find "$SRC" -maxdepth 1 -type f \( \
  -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.heic' -o -iname '*.heif' \
\) -print0 | sort -z | while IFS= read -r -d '' file; do
  i=$((i + 1))
  base="$(basename "$file")"
  name="${base%.*}"
  safe="$(printf '%s' "$name" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')"
  [[ -n "$safe" ]] || safe="foto-$i"
  out="$DST/${safe}.webp"

  if [[ -e "$out" ]]; then
    out="$DST/${safe}-${i}.webp"
  fi

  echo "🔄 [$i/$count] convertendo $base → $(basename "$out")"
  magick "$file" -auto-orient -resize "${MAX_DIMENSION}x${MAX_DIMENSION}>" -strip -quality "$QUALITY" "$out"
  size="$(wc -c < "$out" | tr -d ' ')"
  printf '"%s","%s",%s\n' "$file" "$out" "$size" >> "$MANIFEST"
done

echo "✅ Conversão concluída: $DST"
echo "✅ Manifesto: $MANIFEST"
