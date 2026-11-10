#!/bin/zsh
# Usage: tools/render.sh <composition> <out.mp4> [remotion args...] — one render at a time across all worktrees (16 GB machine).
set -e
LOCK=/tmp/explainer-render.lock
until mkdir $LOCK 2>/dev/null; do sleep 3; done
trap 'rmdir $LOCK' EXIT
cd ${0:A:h}/../video
npx remotion render src/index.ts $1 ${2:A} --concurrency=4 --gl=angle --log=error ${@:3}
