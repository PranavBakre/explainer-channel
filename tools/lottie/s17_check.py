"""The real Pwned Passwords prefix request and a local suffix comparison."""
import hashlib, json, pathlib, sys
from lot import *
from timing import beat_timing


def build(laptop):
    steps, duration = beat_timing('S17_02', 'S17_03')
    returned = steps[1]
    digest = hashlib.sha1(b'mango@123').hexdigest().upper()
    prefix, suffix = digest[:5], digest[5:]
    rows = pathlib.Path(__file__).with_name('s17-F14D5.txt').read_text().splitlines()
    own = next(row for row in rows if row.startswith(suffix + ':'))
    lap = laptop_scene(laptop, [(0, 'mango@123')])
    layers = server('HAVE I BEEN PWNED', blink=190)
    layers[-1]['t']['d']['k'][0]['s']['s'] = 28
    for item in layers:
        item['ks']['o'] = fade((0, 100), (returned - 10, 100), (returned + 8, 0))
    header = layer('local hash paper', [group([rect(800, 230, 18), stroke(LIGHT, 3)]), group([rect(800, 230, 18), fill(PAPER)])], (540, 150))
    layers += [header, text('device label', [(0, 'YOUR DEVICE · SHA-1')], (0, -70), 24, SLATE, parent=header['ind']), text('hash prefix', [(0, prefix)], (0, -20), 26, BLUE, parent=header['ind']), text('full hash first half', [(0, digest[:20])], (0, 30), 26, INK, parent=header['ind']), text('full hash second half', [(0, digest[20:])], (0, 70), 26, INK, parent=header['ind'])]
    request = connection([920, 310], [1410, 450], [160, -180], [-170, -180], 110, 145)
    request[0]['ks']['o'] = fade((0, 100), (returned - 10, 100), (returned + 10, 0))
    request[1]['ks']['o'] = fade((143, 0), (146, 100), (returned - 10, 100), (returned + 10, 0))
    layers += request
    layers += pill('sent prefix', prefix, 146, returned - 15, (1140, 260), w=190, h=60, size=26, color=BLUE, border=BLUE)
    layers.append(text('request label', [(0, 'Only these five characters leave')], (1280, 170), 24, BLUE, o=fade((130, 0), (145, 100), (returned - 15, 100), (returned, 0))))
    o = fade((returned, 0), (returned + 12, 100))
    panel = layer('range response', [group([rect(850, 360, 18), stroke(LIGHT, 3)]), group([rect(850, 360, 18), fill(PAPER)])], (1390, 370), o=o)
    layers += [panel, text('response title', [(0, 'Selected returned suffixes : count')], (0, -125), 24, SLATE, parent=panel['ind'], o=o)]
    for i, row in enumerate(rows[:3] + [own]):
        y = -60 + i * 58
        ro = o if i < 3 else fade((returned + 95, 0), (returned + 110, 100))
        if i == 3:
            panel['shapes'].insert(0, group([rect(800, 50, 8), fill(GREEN, fade((returned + 95, 0), (returned + 110, 16)))], p=(0, y - 10)))
        layers.append(text('suffix row ' + str(i), [(0, row)], (0, y), 26, GREEN if i == 3 else INK, parent=panel['ind'], o=ro))
    layers += connection([1370, 620], [1085, 830], [-130, 160], [130, 160], returned + 30, returned + 65)
    layers += pill('local suffix', suffix, returned + 60, duration + 20, (640, 830), w=850, h=60, size=26, color=INK, border=GREEN)
    layers.append(text('local match label', [(0, 'Match found on your device')], (640, 730 + 26 / 3), 26, GREEN, o=fade((returned + 110, 0), (returned + 125, 100))))
    layers.append(layer('local label paper', [group([rect(800, 70, 18), fill(PAPER)])], (640, 730), o=fade((returned + 110, 0), (returned + 125, 100))))
    data = compose('S17 prefix-only password check', duration, lap, layers)
    precomp = next(item for item in data['layers'] if item['nm'] == 'laptop scene')
    precomp['ks']['p'] = static([120, 280, 0])
    precomp['ks']['s'] = static([170, 170, 100])
    return data


if __name__ == '__main__':
    src, out = sys.argv[1:]
    json.dump(build(json.load(open(src))), open(out, 'w'))
