"""Build the S03 reuse shot: one leaked pair, tried on two other sites' login forms, both open.

Usage: python3 tools/lottie/s03_reuse.py <laptop.json> <out.json>
"""
import json, sys
from lot import *

OP = 240
PW, EMAIL = 'mango@123', 'you@mail.com'
CARD = (1020, 122)


def stolen_card():
    """The pair lifted off the leaked table, as a small paper card above the two forms."""
    o = fade((0, 0), (14, 100))
    w, h = 380, 150
    x, y = CARD
    out = [text('stolen title', [(0, 'stolen from the grocery app')], (x, y - h / 2 + 26), 18, '#7A7A72', o=o),
           text('stolen email', [(0, EMAIL)], (x - w / 2 + 24, y - 6), 22, INK, font='Inter-Bold', j=0, o=o),
           text('stolen pw', [(0, PW)], (x - w / 2 + 24, y + 34), 26, AMBER, font='Inter-Bold', j=0, o=o)]
    return [out[0], out[1], out[2],
            layer('stolen card', [group([rect(w, h, 12), stroke(LIGHT, 3)]), group([rect(w, h, 12), fill('#FFFFFF')])], CARD, o=o, s=pop(0, 14))]


def tick(nm, x, y, t, label):
    """A green disc with a check, plus 'signed in' under it."""
    mark = layer(nm, [group([path([[-14, 0], [-4, 11], [16, -11]]), stroke('#FFFFFF', 7), trim(anim([(t + 6, 0), (t + 16, 100)]))]),
                       group([ellipse(58, 58), fill(GREEN)])], (x, y), o=fade((t, 0), (t + 6, 100)), s=pop(t, t + 10))
    o = fade((t + 8, 0), (t + 18, 100))
    return [mark, text(nm + ' label', [(0, label)], (x, y + 46), 22, GREEN, o=o)]


def site_panel(x, y):
    """A drawn login form for the second site: title, two fields, then its own tick."""
    w, h = 520, 380
    left = x - w / 2 + 40
    fw = w - 80
    lo = fade((0, 0), (12, 100))
    oe = fade((144, 0), (152, 100))
    op = fade((150, 0), (158, 100))
    out = list(tick('site two tick', x, y + 240, 166, 'signed in'))
    out += [text('site two title', [(0, 'a second site')], (x, y - h / 2 - 26), 20, SLATE, o=lo),
            text('site two email', [(0, EMAIL)], (x, y - 62), 20, INK, font='Inter-Bold', o=oe),
            text('site two pw', [(0, PW)], (x, y + 28), 20, AMBER, font='Inter-Bold', o=op)]
    for k, label in enumerate(('email', 'password')):
        out += [text('site two %s label' % label, [(0, label)], (left, y - 108 + 90 * k), 16, '#7A7A72', j=0, o=lo),
                layer('site two %s field' % label, [group([rect(fw, 54, 27), stroke(LIGHT, 3)]), group([rect(fw, 54, 27), fill('#EFEEE9')])], (x, y - 70 + 90 * k), o=lo)]
    out.append(layer('site two', [group([rect(w, h, 16), stroke(LIGHT, 3)]), group([rect(w, h, 16), fill('#FFFFFF')])], (x, y), o=lo))
    return out


def fly(nm, t0, start, end, out_t, in_t, t1):
    """A pill that rides an arc from the stolen card into a login field, then gives way to the typed value."""
    box, label = pill(nm, PW, t0, t1, (0, 0), w=200, h=56, size=26, border=AMBER)
    p = anim([(t0, list(start)), (t0 + 12, list(start)), (t0 + 34, list(end))], spatial=True)
    p['k'][1]['to'], p['k'][1]['ti'] = out_t + [0], in_t + [0]
    box['ks']['p'] = p
    return [box, label]


def build(laptop):
    keys = [(0, '')] + [(56 + 2 * i, PW[:i]) for i in range(1, len(PW) + 1)]
    lap = laptop_scene(laptop, keys, EMAIL)
    layers = [text('site one title', [(0, 'another site')], (FIELD[0], 118), 20, SLATE)]
    layers += tick('site one tick', FIELD[0], 566, 78, 'signed in')
    layers += site_panel(1500, 560)
    layers += stolen_card()
    layers += fly('replay one', 18, (980, 200), (760, 432), [-170, -30], [120, -150], 58)
    layers += fly('replay two', 100, (1060, 200), (1440, 596), [170, -20], [-130, -150], 140)
    layers += connection((980, 200), (760, 432), [-170, -30], [120, -150], 18, 40)
    layers += connection((1060, 200), (1440, 596), [170, -20], [-130, -150], 100, 122)
    return compose('S03 reuse', OP, lap, layers)


if __name__ == '__main__':
    src, out = sys.argv[1:]
    json.dump(build(json.load(open(src))), open(out, 'w'))
    print('wrote', out)
