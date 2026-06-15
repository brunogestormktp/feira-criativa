#!/usr/bin/env bash
set -euo pipefail

SRC="${1:-/Users/bruno/Downloads/FOTOS SITE FEIRA JURERE}"
DEST="${2:-/Users/bruno/clientes_convidados/clientes/05_feira_criativa_jurere/website/midia/fotos_iphone_webp}"
MAX_SIZE="${MAX_SIZE:-1800x1800>}"
QUALITY="${QUALITY:-78}"

if ! command -v magick >/dev/null 2>&1; then
  echo "❌ ImageMagick não encontrado. Instale com: brew install imagemagick"
  exit 1
fi

if [[ ! -d "$SRC" ]]; then
  echo "❌ Pasta de origem não encontrada: $SRC"
  exit 1
fi

mkdir -p "$DEST"
MANIFEST="$DEST/manifest.csv"
TMP_LIST="$(mktemp)"

find "$SRC" -maxdepth 1 -type f \( \
  -iname '*.heic' -o -iname '*.heif' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \
\) -print0 > "$TMP_LIST"

TOTAL="$(tr -cd '\0' < "$TMP_LIST" | wc -c | tr -d ' ')"
if [[ "$TOTAL" == "0" ]]; then
  echo "❌ Nenhuma imagem compatível encontrada em: $SRC"
  rm -f "$TMP_LIST"
  exit 1
fi

printf 'arquivo_original,arquivo_webp\n' > "$MANIFEST"

i=0
while IFS= read -r -d '' file; do
  i=$((i + 1))
  out_name="$(printf 'feira-jurere-%03d.webp' "$i")"
  out_path="$DEST/$out_name"
  base_name="$(basename "$file")"

  echo "🔄 [$i/$TOTAL] convertendo $base_name → $out_name"
  magick "$file" -auto-orient -resize "$MAX_SIZE" -strip -quality "$QUALITY" -define webp:method=6 "$out_path"
  printf '"%s","%s"\n' "$base_name" "$out_name" >> "$MANIFEST"
done < "$TMP_LIST"

rm -f "$TMP_LIST"

ORIGINAL_BYTES="$(find "$SRC" -maxdepth 1 -type f \( \
  -iname '*.heic' -o -iname '*.heif' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \
\) -print0 | xargs -0 stat -f '%z' | awk '{s+=$1} END {print s+0}')"
WEBP_BYTES="$(find "$DEST" -maxdepth 1 -type f -iname '*.webp' -print0 | xargs -0 stat -f '%z' | awk '{s+=$1} END {print s+0}')"

echo "✅ Conversão concluída."
echo "Origem preservada: $SRC"
echo "Destino: $DEST"
echo "Manifesto: $MANIFEST"
echo "Arquivos convertidos: $TOTAL"
echo "Peso original aproximado: $(awk -v b="$ORIGINAL_BYTES" 'BEGIN {printf "%.1f MB", b/1024/1024}')"
echo "Peso webp aproximado: $(awk -v b="$WEBP_BYTES" 'BEGIN {printf "%.1f MB", b/1024/1024}')"
