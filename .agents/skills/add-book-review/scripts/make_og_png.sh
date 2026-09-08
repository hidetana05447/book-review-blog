#!/bin/bash
# サムネイルSVGから、OGP/Twitterカード用の1200x630 PNGを生成する。
# SVGのままだとXなどのSNSでカード表示が不安定になるため、
# qlmanage でラスタライズ→sips でセンタークロップする2段階が必要。
#
# 使い方: images/thumbnails/ ディレクトリで実行する
#   ./make_og_png.sh <slug>
# 例: ./make_og_png.sh seiyoku
#   → seiyoku.svg を元に seiyoku-og.png を生成する

set -e

if [ -z "$1" ]; then
  echo "使い方: make_og_png.sh <slug>（例: make_og_png.sh seiyoku）"
  exit 1
fi

slug="$1"

if [ ! -f "$slug.svg" ]; then
  echo "エラー: $slug.svg が見つからない（images/thumbnails/ ディレクトリで実行しているか確認して）"
  exit 1
fi

qlmanage -t -s 1200 -o . "$slug.svg" >/dev/null 2>&1
sips -c 630 1200 "$slug.svg.png" --out "$slug-og.png" >/dev/null 2>&1
rm "$slug.svg.png"

echo "作成完了: $slug-og.png"
