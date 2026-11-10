"""Build the S15 login shot as one Lottie: the stock laptop scene, edited, plus drawn connection, server and compare.

Shapes and layers listed first draw on top.

Usage: python3 tools/lottie/s15_login.py <laptop.json> <out.json>
"""
import copy, json, sys

FPS, W, H, OP = 30, 1920, 1080, 330
INK, SLATE, ORANGE, BLUE = '#0D161D', '#283D47', '#FF7B30', '#066AC9'
LIGHT, PAPER, AMBER, GREEN = '#DAD9D1', '#F3F2EE', '#E59A00', '#2FB37A'
HASH = '81c68634…221efff1'


def rgb(h, a=1):
    return [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)] + [a]


def static(v):
    return {'a': 0, 'k': v}


def anim(keys, spatial=False):
    """keys: [(frame, value)], eased in-out; holds after the last key."""
    out = []
    for i, (t, v) in enumerate(keys):
        k = {'t': t, 's': (list(v) + [0] if spatial and len(v) == 2 else v) if isinstance(v, list) else [v]}
        if i < len(keys) - 1:
            n = 1 if spatial else len(k['s'])
            ease_o, ease_i = ([0.33] * n, [0] * n), ([0.67] * n, [1] * n)
            k['o'] = {'x': 0.33 if spatial else ease_o[0], 'y': 0 if spatial else ease_o[1]}
            k['i'] = {'x': 0.67 if spatial else ease_i[0], 'y': 1 if spatial else ease_i[1]}
            if spatial:
                k['to'], k['ti'] = [0, 0, 0], [0, 0, 0]
        out.append(k)
    return {'a': 1, 'k': out}


def tr(p=(0, 0), s=100, o=100, r=0):
    return {'ty': 'tr', 'p': static(list(p)), 'a': static([0, 0]), 's': static([s, s]), 'r': static(r), 'o': static(o)}


def fill(c, o=100):
    return {'ty': 'fl', 'c': static(rgb(c)), 'o': static(o) if not isinstance(o, dict) else o, 'r': 1}


def stroke(c, w, dash=None, cap=2):
    s = {'ty': 'st', 'c': static(rgb(c)), 'o': static(100), 'w': static(w), 'lc': cap, 'lj': 2}
    if dash:
        s['d'] = [{'n': 'd', 'nm': 'dash', 'v': static(dash)}, {'n': 'g', 'nm': 'gap', 'v': static(dash)}, {'n': 'o', 'nm': 'offset', 'v': static(0)}]
    return s


def rect(w, h, r, p=(0, 0)):
    return {'ty': 'rc', 'p': static(list(p)), 's': static([w, h]), 'r': static(r), 'd': 1}


def ellipse(w, h, p=(0, 0)):
    return {'ty': 'el', 'p': static(list(p)), 's': static([w, h]), 'd': 1}


def path(pts, closed=False, ins=None, outs=None):
    n = len(pts)
    return {'ty': 'sh', 'd': 1, 'ks': static({'c': closed, 'v': pts, 'i': ins or [[0, 0]] * n, 'o': outs or [[0, 0]] * n})}


def trim(e):
    return {'ty': 'tm', 's': static(0), 'e': e, 'o': static(0), 'm': 1}


def group(items, **kw):
    return {'ty': 'gr', 'it': items + [tr(**kw)]}


_ind = [100]


def layer(nm, shapes, p, o=100, s=100, ip=0, op=OP, parent=None):
    _ind[0] += 1
    L = {'ddd': 0, 'ind': _ind[0], 'ty': 4, 'nm': nm, 'sr': 1, 'ao': 0, 'ip': ip, 'op': op, 'st': 0, 'bm': 0,
         'ks': {'o': o if isinstance(o, dict) else static(o), 'r': static(0),
                'p': p if isinstance(p, dict) else static(list(p) + [0]), 'a': static([0, 0, 0]),
                's': s if isinstance(s, dict) else static([s, s, 100])},
         'shapes': shapes}
    if parent:
        L['parent'] = parent
    return L


def text(nm, keys, p, size, color, font='Inter-Bold', j=2, o=100, ip=0, op=OP, parent=None):
    _ind[0] += 1
    L = {'ddd': 0, 'ind': _ind[0], 'ty': 5, 'nm': nm, 'sr': 1, 'ao': 0, 'ip': ip, 'op': op, 'st': 0, 'bm': 0,
         'ks': {'o': o if isinstance(o, dict) else static(o), 'r': static(0), 'p': static(list(p) + [0]), 'a': static([0, 0, 0]), 's': static([100, 100, 100])},
         't': {'d': {'k': [{'s': {'s': size, 'f': font, 't': t, 'j': j, 'tr': 0, 'lh': size * 1.2, 'ls': 0, 'fc': rgb(color)[:3]}, 't': f} for f, t in keys]},
               'p': {}, 'm': {'g': 1, 'a': static([0, 0])}, 'a': []}}
    if parent:
        L['parent'] = parent
    return L


def pop(t0, t1=None):
    t1 = t1 or t0 + 8
    return anim([(t0, [0, 0, 100]), (t1, [100, 100, 100])])


def fade(*keys):
    return anim([(t, v) for t, v in keys])


def prune(g, drop):
    if g.get('ty') == 'gr':
        g['it'] = [prune(x, drop) for x in g['it'] if x.get('nm') not in drop]
        if g.get('nm') == 'lock iron rod':
            # The source animates the padlock open, which contradicts "encrypted"; hold it shut.
            t = next(x for x in g['it'] if x.get('ty') == 'tr')
            t['r'] = static(t['r']['k'][0]['s'][0])
    return g


def build(laptop):
    lap = copy.deepcopy(laptop)
    lap['layers'] = [l for l in lap['layers'] if l['nm'] not in ('Enter OTP', 'OTP message', 'User', 'user matt')]
    # Pieces of the removed code step baked into the background art: asterisks and a ghost shield.
    drop = {'star1', 'star2', 'star3', 'protection shield', 'protection  shield lock hole'}
    for l in lap['layers']:
        if l['ty'] == 4:
            l['shapes'] = [prune(g, drop) for g in l['shapes'] if g.get('nm') not in drop]
    pw = 'mango@123'
    for l in lap['layers']:
        l['op'] = 9999
        if l['ty'] == 5:
            l['t']['a'] = []
            d = l['t']['d']['k'][0]['s']
            d['f'] = 'Inter-Bold'
            if l['nm'] == 'username@gmail.com':
                d['t'] = 'you@mail.com'
                l['ks']['p']['k'][1] -= 2
            else:
                d['fc'] = rgb(AMBER)[:3]
                d['s'] = 12
                l['ks']['p']['k'][1] = 167.2
                l['t']['d']['k'] = ([{'s': {**d, 't': ''}, 't': 0}] + [{'s': {**d, 't': pw[:i]}, 't': 24 + 4 * i} for i in range(1, len(pw) + 1)]
                                    + [{'s': {**d, 't': '•' * len(pw)}, 't': 140}])
    X0, Y0, SC = 120, 120, 200
    field = (X0 + 253.25 * 2, Y0 + 168 * 2)
    start, mid, end = [field[0] + 300, field[1] - 70], [1110, 330], [1400, 560]
    sx, sy = 1580, 640

    layers = []
    # Server rack, flat style matching the illustration's palette.
    units = []
    for k, y in enumerate((-140, -20, 100)):
        leds = [group([ellipse(16, 16), fill(c, anim([(t, 100), (t + 6, 25), (t + 12, 100)]) if blink else static(100))], p=(x, y))
                for x, c, blink, t in ((-70, GREEN, True, 230 + 7 * k), (-40, ORANGE, True, 236 + 5 * k), (80, LIGHT, False, 0))]
        bars = [group([rect(60, 8, 4), fill(LIGHT)], p=(30, y + dy)) for dy in (-14, 0, 14)]
        units += bars + leds + [group([rect(240, 100, 14), fill(INK)], p=(0, y))]
    layers.append(layer('server', [group(units)] + [group([rect(280, 420, 22), fill(SLATE)])], (sx, sy)))
    layers.append(layer('server shadow', [group([ellipse(380, 46), fill(LIGHT)])], (sx, sy + 235)))
    layers.append(text('server label', [(0, 'THE SITE')], (sx, sy - 250), 30, SLATE))

    # Encrypted connection: a dashed arc that draws itself in.
    out_t, in_t = [180, -230], [-160, -190]
    arc = path([start, end], ins=[[0, 0], in_t], outs=[out_t, [0, 0]])
    layers.append(layer('tunnel', [group([arc, stroke(SLATE, 6, dash=14), trim(anim([(140, 0), (162, 100)]))])], (0, 0)))
    head = path([[end[0] - 26, end[1] - 30], end, [end[0] - 34, end[1] + 4]])
    layers.append(layer('tunnel head', [group([head, stroke(SLATE, 6)])], (0, 0), o=fade((160, 0), (163, 100))))
    layers.append(text('https', [(0, 'encrypted (HTTPS)')], (mid[0] - 20, mid[1] - 80), 28, BLUE, o=fade((158, 0), (166, 100))))

    # The typed password lifts out of the field and is locked into a capsule.
    lock = [group([path([[-14, -2], [-14, -16], [0, -26], [14, -16], [14, -2]], ins=[[0, 0], [0, 8], [-8, 0], [0, -8], [0, 0]], outs=[[0, 0], [0, -8], [8, 0], [0, 8], [0, 0]]), stroke('#FFFFFF', 5)]),
            group([rect(40, 30, 6, (0, 10)), fill('#FFFFFF')])]
    capsule_p = anim([(150, start), (168, start), (200, end)], spatial=True)
    # Travel along the drawn arc: the moving key's spatial tangents are the arc's bezier handles.
    capsule_p['k'][1]['to'], capsule_p['k'][1]['ti'] = out_t + [0], in_t + [0]
    card_o = [(138, 0), (144, 100), (158, 100), (162, 0)]
    card = layer('pw card', [group([rect(230, 64, 32), stroke(AMBER, 4)]), group([rect(230, 64, 32), fill(PAPER)])], (0, 0),
                 o=fade(*card_o), s=pop(138))
    card['ks']['p'] = anim([(138, list(field)), (150, start)], spatial=True)
    layers.append(card)
    layers.append(text('pw card text', [(0, pw)], (0, 10), 30, AMBER, parent=card['ind'], o=fade(*card_o)))
    cap_o = [(152, 0), (160, 100), (204, 100), (212, 0)]
    cap = layer('capsule', [group(lock, p=(-62, 2)), group([rect(200, 70, 35), fill(SLATE)])], (0, 0), o=fade(*cap_o), s=pop(152, 160))
    cap['ks']['p'] = capsule_p
    layers.append(cap)
    layers.append(text('capsule dots', [(0, '•' * 9)], (28, 12), 26, '#FFFFFF', parent=cap['ind'], o=fade(*cap_o)))

    # At the server the capsule opens: the site sees the password, then hashes it and compares.
    seen_o = [(206, 0), (212, 100), (232, 100), (240, 0)]
    seen = layer('seen', [group([rect(290, 70, 35), stroke(AMBER, 4)]), group([rect(290, 70, 35), fill(PAPER)])], (sx, sy - 330), o=fade(*seen_o), s=pop(206, 214))
    layers.append(seen)
    layers.append(text('seen text', [(0, pw)], (0, 11), 32, AMBER, parent=seen['ind'], o=fade(*seen_o)))
    layers.append(text('seen label', [(0, 'the site sees your password')], (sx, sy - 400), 26, INK, o=fade((210, 0), (216, 100), (232, 100), (240, 0))))
    hx = sx - 60
    for nm, y, lab, t0, bg, fg in (('typed', sy - 430, 'hashed at login', 242, INK, '#FFFFFF'), ('stored', sy - 355, 'stored hash', 262, PAPER, INK)):
        chip = layer(nm, ([] if bg == INK else [group([rect(470, 60, 12), stroke(LIGHT, 3)])]) + [group([rect(470, 60, 12), fill(bg)])], (hx, y), o=fade((t0, 0), (t0 + 8, 100)), s=pop(t0))
        layers.append(chip)
        layers.append(text(nm + ' hex', [(0, HASH)], (75, 10), 26, fg, parent=chip['ind'], o=fade((t0, 0), (t0 + 8, 100))))
        layers.append(text(nm + ' label', [(0, lab)], (-215, 9), 20, '#A4B0AA' if bg == INK else '#7A7A72', j=0, parent=chip['ind'], o=fade((t0, 0), (t0 + 8, 100))))
    tick = layer('match', [group([path([[-16, 0], [-4, 12], [18, -12]]), stroke('#FFFFFF', 7), trim(anim([(290, 0), (300, 100)]))]), group([ellipse(64, 64), fill(GREEN)])],
                 (hx + 290, sy - 392), o=fade((282, 0), (288, 100)), s=pop(282, 292))
    layers.append(tick)

    precomp = {'ddd': 0, 'ind': 1, 'ty': 0, 'nm': 'laptop scene', 'refId': 'laptop', 'sr': 1, 'ao': 0, 'ip': 0, 'op': OP, 'st': 0, 'bm': 0, 'w': lap['w'], 'h': lap['h'],
               'ks': {'o': static(100), 'r': static(0), 'p': static([X0, Y0, 0]), 'a': static([0, 0, 0]), 's': static([SC, SC, 100])}}
    # Lottie draws the first layer on top.
    ordered = [l for l in layers if l['nm'] not in ('server', 'server shadow', 'tunnel')] + [l for l in layers if l['nm'] in ('server', 'tunnel')] + [precomp] + [l for l in layers if l['nm'] == 'server shadow']
    # A parented layer must sit above its parent, or the parent's fill hides it.
    for child in [l for l in ordered if 'parent' in l]:
        ordered.remove(child)
        ordered.insert(next(i for i, l in enumerate(ordered) if l['ind'] == child['parent']), child)
    return {'v': '5.7.0', 'fr': FPS, 'ip': 0, 'op': OP, 'w': W, 'h': H, 'nm': 'S15 login', 'ddd': 0,
            'assets': [{'id': 'laptop', 'w': lap['w'], 'h': lap['h'], 'layers': lap['layers']}],
            'fonts': {'list': [{'fName': 'Inter-Bold', 'fFamily': 'Inter', 'fStyle': 'Bold', 'ascent': 72.7}]},
            'layers': ordered}


if __name__ == '__main__':
    src, out = sys.argv[1:]
    json.dump(build(json.load(open(src))), open(out, 'w'))
    print('wrote', out)
