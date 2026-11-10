#!/bin/zsh
# Usage: tools/review/second-look.sh <video> <frame> [frame...] — full-size key frames to Codex with the shot checklist.
set -e
V=$1; shift
D=$(mktemp -d /tmp/second-look.XXXX)
imgs=()
for f in "$@"; do ffmpeg -v error -y -i $V -vf "select=eq(n\,$f)" -frames:v 1 $D/f$f.png; imgs+=($D/f$f.png); done
codex exec --skip-git-repo-check -C $D "You are reviewing ${#imgs} attached full-size frames (1920x1080) from one explainer animation shot, in order: $*. List every defect with the frame number and approximate pixel location: (1) text not centred in its container (field, pill, chip), (2) anything clipped, cut off or overlapping something it should not, (3) a label not next to the thing it names, or ambiguous, (4) inconsistent sizes for text with the same role, (5) anything else misaligned or unpolished. Ignore the stock illustration's own artwork details (person, furniture, plant, window outline). Be specific and terse. If a frame is clean, say so. Do not search the filesystem; the images are attached." --image ${(j:,:)imgs} 2>&1 | awk '/^codex$/{p=1;next} /^hook|^tokens used/{p=0} p' | grep -v 'Dumbledore memory\|memory rule'
rm -rf $D
