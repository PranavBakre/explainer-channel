#!/bin/sh
# Usage: make_pad.sh <seconds> <out.wav> — slow two-chord ambient pad for the music bed.
set -e
D=$1; OUT=$2
EXPR="0.10*sin(2*PI*110*t)*(0.55+0.45*sin(2*PI*t/32))+0.07*sin(2*PI*164.81*t)*(0.55+0.45*sin(2*PI*t/32))+0.06*sin(2*PI*130.81*t)*(0.55-0.45*sin(2*PI*t/32))+0.05*sin(2*PI*196*t)*(0.55-0.45*sin(2*PI*t/32))+0.03*sin(2*PI*329.63*t)*(0.5+0.5*sin(2*PI*t/11))"
ffmpeg -v error -y -f lavfi -i "aevalsrc=exprs='$EXPR':s=48000:d=$D" -f lavfi -i "anoisesrc=d=$D:c=brown:a=0.02" \
  -filter_complex "[0][1]amix=inputs=2:normalize=0,lowpass=f=1200,aecho=0.8:0.7:120|240:0.35|0.2,afade=t=in:d=4,afade=t=out:st=$(echo "$D - 5" | bc):d=5,aformat=sample_rates=48000:channel_layouts=stereo" "$OUT"
