"""A password manager fills a generated example password on the existing laptop."""
import json, sys
from lot import *
from timing import beat_timing

PASSWORD = 'v7!Qm2#Lr9@Tx4$Np8&Z'


def build(laptop):
    steps, duration = beat_timing('S18_04', 'S18_05')
    at = steps[1]
    lap = laptop_scene(laptop, [(0, ''), (at + 65, '•' * len(PASSWORD))])
    layers = server()
    layers[-1]['t']['d']['k'][0]['s']['s'] = 28
    layers[-1]['ks']['o'] = fade((at - 5, 100), (at + 5, 0))
    layers += pill('unique password', 'Long · unique to this account', 40, at - 8, (1400, 260), w=600, h=60, size=26, color=INK, border=GREEN)
    o = fade((at, 0), (at + 12, 100))
    box = layer('password manager', [group([rect(760, 270, 22), stroke(LIGHT, 3)]), group([rect(760, 270, 22), fill(PAPER)])], (1400, 250), o=o)
    layers += [box, text('manager title', [(0, 'Password manager')], (0, -58), 28, SLATE, parent=box['ind'], o=o), text('generated password', [(0, PASSWORD)], (0, 15), 26, INK, parent=box['ind'], o=o), text('autofill action', [(0, 'Fill this account')], (0, 85), 26, GREEN, parent=box['ind'], o=o)]
    layers += connection([1040, 340], [FIELD[0] + 130, FIELD[1] - 12], [-140, -80], [160, -40], at + 28, at + 62)
    layers += pill('filled', 'Unique password filled', at + 70, duration + 20, (1400, 470), w=470, h=60, size=26, color=PAPER, bg=GREEN)
    return compose('S18 password manager autofill', duration, lap, layers)


if __name__ == '__main__':
    src, out = sys.argv[1:]
    json.dump(build(json.load(open(src))), open(out, 'w'))
