#!/bin/zsh
# Usage: ./gallery-stills.sh <outDir>  — one still at 70% of every gallery shot, tiled into sheet.jpg
set -e
OUT=$1; rm -rf $OUT
N=$(python3 -c "import json;print(len(json.load(open('src/gallery.json'))))")
F=$(python3 -c "print(' '.join(str(i*150+105) for i in range($N)))")
node stills.mjs gallery $OUT ${=F} > /tmp/gallery-stills.log 2>&1 || { grep -vE '^\s+at ' /tmp/gallery-stills.log | tail -5; exit 1; }
cd $OUT; i=0; for f in $(ls f*.jpeg | sort -t f -k2 -n); do i=$((i+1)); mv $f $(printf "s%03d.jpeg" $i); done
ffmpeg -y -v error -i s%03d.jpeg -vf "scale=640:-1,tile=3x$(( (N+2)/3 ))" -frames:v 1 sheet.jpg
