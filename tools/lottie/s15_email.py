"""An incoming email exposes the forgotten password, in the established laptop palette."""
import json, sys
from lot import *
from timing import beat_timing


def build(laptop):
    _, duration = beat_timing('S15_03')
    lap = laptop_scene(laptop, [(0, '')])
    layers = server()
    layers[-1]['t']['d']['k'][0]['s']['s'] = 28
    layers[-1]['ks']['o'] = fade((0, 100), (50, 0))
    arc = connection([1450, 420], [1030, 300], [-100, -200], [140, -160], 12, 38)
    arc[0]['ks']['o'] = fade((0, 100), (50, 100), (64, 0))
    arc[1]['ks']['o'] = fade((36, 0), (39, 100), (50, 100), (64, 0))
    layers += arc
    envelope = layer('incoming email', [group([path([[-80, -45], [0, 15], [80, -45]]), stroke(PAPER, 6)]), group([rect(170, 110, 12), fill(BLUE)])], (1300, 250), o=fade((10, 0), (20, 100), (65, 100), (76, 0)))
    envelope['ks']['p'] = anim([(12, [1450, 420]), (48, [1030, 300])], spatial=True)
    layers.append(envelope)
    o = fade((50, 0), (64, 100))
    box = layer('email paper', [group([rect(760, 330, 22), stroke(LIGHT, 3)]), group([rect(760, 330, 22), fill(PAPER)])], (1420, 300), o=o)
    box['shapes'].insert(0, group([rect(470, 60, 12), fill('#FCE4E0')], p=(0, 65)))
    layers += [box, text('email subject', [(0, 'Your forgotten password')], (0, -68), 28, INK, parent=box['ind'], o=o), text('email recipient', [(0, 'To: you@mail.com')], (0, -9), 26, SLATE, parent=box['ind'], o=o), text('exposed password', [(0, 'mango@123')], (0, 65 + 26 / 3), 26, '#C0463A', parent=box['ind'], o=o)]
    layers += pill('warning sign', 'Warning sign: recoverable password', 100, duration + 20, (1420, 550), w=650, h=60, size=26, color=PAPER, bg='#C0463A')
    return compose('S15 recoverable password email', duration, lap, layers)


if __name__ == '__main__':
    src, out = sys.argv[1:]
    json.dump(build(json.load(open(src))), open(out, 'w'))
