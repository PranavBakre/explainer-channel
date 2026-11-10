"""Build the S15 login shot as one Lottie: the stock laptop scene, edited, plus drawn connection, server and compare.

Usage: python3 tools/lottie/s15_login.py <laptop.json> <out.json>
"""
import json, sys
from lot import *

OP = 330


def build(laptop):
    pw = 'mango@123'
    lap = laptop_scene(laptop, typing(pw, 24) + [(140, '•' * len(pw))])
    start, mid, end = [FIELD[0] + 300, FIELD[1] - 70], [1110, 330], [1400, 560]
    layers = server()

    # Encrypted connection: a dashed arc that draws itself in.
    out_t, in_t = [180, -230], [-160, -190]
    layers += connection(start, end, out_t, in_t, 140, 162)
    layers.append(text('https', [(0, 'encrypted (HTTPS)')], (mid[0] - 20, mid[1] - 80), 28, BLUE, o=fade((158, 0), (166, 100))))

    # The typed password lifts out of the field and is locked into a capsule.
    card, card_text = pill('pw card', pw, 138, 162, (0, 0), border=AMBER)
    card['ks']['p'] = anim([(138, list(FIELD)), (150, start)], spatial=True)
    layers += [card, card_text]
    lock = [group([path([[-14, -2], [-14, -16], [0, -26], [14, -16], [14, -2]], ins=[[0, 0], [0, 8], [-8, 0], [0, -8], [0, 0]], outs=[[0, 0], [0, -8], [8, 0], [0, 8], [0, 0]]), stroke('#FFFFFF', 5)]),
            group([rect(40, 30, 6, (0, 10)), fill('#FFFFFF')])]
    capsule_p = anim([(150, start), (168, start), (200, end)], spatial=True)
    # Travel along the drawn arc: the moving key's spatial tangents are the arc's bezier handles.
    capsule_p['k'][1]['to'], capsule_p['k'][1]['ti'] = out_t + [0], in_t + [0]
    cap_o = fade((152, 0), (160, 100), (204, 100), (212, 0))
    cap = layer('capsule', [group(lock, p=(-62, 2)), group([rect(200, 70, 35), fill(SLATE)])], (0, 0), o=cap_o, s=pop(152, 160))
    cap['ks']['p'] = capsule_p
    layers += [cap, text('capsule dots', [(0, '•' * len(pw))], (28, 9), 26, '#FFFFFF', parent=cap['ind'], o=cap_o)]

    # At the server the capsule opens: the site sees the password, then hashes it and compares.
    layers += pill('seen', pw, 206, 240, (SX, SY - 330), w=290, h=70, size=32, border=AMBER)
    layers.append(text('seen label', [(0, 'the site sees your password')], (SX, SY - 400), 26, INK, o=fade((210, 0), (216, 100), (232, 100), (240, 0))))
    layers += compare([('typed', 'hashed at login', HASH, True), ('stored', 'stored hash', HASH, False)], 242, 282)
    return compose('S15 login', OP, lap, layers)


if __name__ == '__main__':
    src, out = sys.argv[1:]
    json.dump(build(json.load(open(src))), open(out, 'w'))
    print('wrote', out)
