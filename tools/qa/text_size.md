# Text size and on-screen reading (OCR): method

Model: claude-opus-5-5.

These two checks need an OCR engine, which the Python standard library does not have, so there is no script here yet. Until one is written and calibrated, both rows in `video-qa` §1 are NOT CHECKED unless a person does them by hand as described below, and NOT CHECKED is never a pass.

## What the checks are

1. **Text size.** Every word a viewer must read (claim-bearing labels, values the narrator names, captions printed on props, UI text that carries the point) has letters at least 30 px tall at 1080p, measured as cap height (the height of a capital letter or a digit, not the line box). A call to action needs more; set its floor in the brief.
2. **On-screen reading.** Read the frame twice a second (2 fps), list every word on screen with its time, and diff that list against the storyboard's `> on-screen` lines and the data table. A word on screen that the storyboard does not have, or a storyboard word that never appears, is a finding.

## How to run them (when an OCR engine is installed)

Tesseract is the usual free engine (`brew install tesseract`, or a Python wrapper in `tools/tts/.venv`). The steps:

1. Extract frames at 2 fps at full 1080p: `ffmpeg -i <video> -vf fps=2 /tmp/ocr/f_%05d.png`. Delete them afterwards (disk is tight).
2. Run OCR per frame with word boxes: `tesseract f_00001.png - tsv` gives each word with `left top width height conf`.
3. Keep words with confidence 60 or more. For each, the box height is close to cap height for capitals and digits; for lower-case words the box includes ascenders and descenders, so take the height of words with a capital or digit as the measure, or scale lower-case boxes by 0.7.
4. Text size FAIL: any kept word under 30 px tall that the storyboard marks as something the viewer must read. Words the storyboard marks as texture (a page of a document behind a highlighted line) are listed, not failed.
5. On-screen reading: normalise case and punctuation, merge words seen in neighbouring frames into one entry with a start and end time, and diff the list against the storyboard's on-screen text with `difflib`, the way `spoken_words.py` diffs speech.

## Calibrate before trusting

Before the first use, run it on a frame with known text at known sizes (render one test card in Remotion with the same word at 20, 30 and 40 px cap height) and on a frame with no text. It must find the 30 and 40 px words, flag the 20 px one, and report nothing on the empty frame. Write the result in the QA report. OCR misses small, low-contrast or stylised text, so a word OCR cannot read at all is itself a legibility finding, not a pass.

## By hand, until then

Take the frames `video-qa` §2 lists, open each at full size, and measure the cap height of the smallest must-read word with any image viewer's selection tool. Record the frame, the word and the height in the report.
