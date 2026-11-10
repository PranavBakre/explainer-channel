"""Shared pieces for the hand-edited Lottie shots: shape builders, the stock laptop scene, the server, layer order.

Shapes and layers listed first draw on top.
"""
import copy, math

FPS, W, H = 30, 1920, 1080
OP = 9999
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


X0, Y0, SC = 120, 120, 200
FIELD = (X0 + 253.25 * 2, Y0 + 168 * 2)
SX, SY = 1580, 640


def laptop_scene(laptop, pw_keys, email='you@mail.com'):
    """The stock login-laptop art with the OTP step removed; pw_keys is [(frame, text)] for the password field."""
    lap = copy.deepcopy(laptop)
    lap['layers'] = [l for l in lap['layers'] if l['nm'] not in ('Enter OTP', 'OTP message', 'User', 'user matt')]
    # Pieces of the removed code step baked into the background art: asterisks and a ghost shield.
    drop = {'star1', 'star2', 'star3', 'protection shield', 'protection  shield lock hole'}
    for l in lap['layers']:
        if l['ty'] == 4:
            l['shapes'] = [prune(g, drop) for g in l['shapes'] if g.get('nm') not in drop]
    for l in lap['layers']:
        l['op'] = 9999
        if l['ty'] == 5:
            l['t']['a'] = []
            d = l['t']['d']['k'][0]['s']
            d['f'] = 'Inter-Bold'
            if l['nm'] == 'username@gmail.com':
                d['t'] = email
                l['ks']['p']['k'][1] -= 2
            else:
                d['fc'] = rgb(AMBER)[:3]
                d['s'] = 10
                l['ks']['p']['k'][1] = 165.2
                l['t']['d']['k'] = [{'s': {**d, 't': t}, 't': f} for f, t in pw_keys]
    return lap


def typing(pw, t0, step=4):
    return [(0, '')] + [(t0 + step * i, pw[:i]) for i in range(1, len(pw) + 1)]


def server(label='THE SITE', blink=230):
    units = []
    for k, y in enumerate((-140, -20, 100)):
        leds = [group([ellipse(16, 16), fill(c, anim([(t, 100), (t + 6, 25), (t + 12, 100)]) if on else static(100))], p=(x, y))
                for x, c, on, t in ((-70, GREEN, True, blink + 7 * k), (-40, ORANGE, True, blink + 6 + 5 * k), (80, LIGHT, False, 0))]
        bars = [group([rect(60, 8, 4), fill(LIGHT)], p=(30, y + dy)) for dy in (-14, 0, 14)]
        units += bars + leds + [group([rect(240, 100, 14), fill(INK)], p=(0, y))]
    return [layer('server', [group(units)] + [group([rect(280, 420, 22), fill(SLATE)])], (SX, SY)),
            layer('server shadow', [group([ellipse(380, 46), fill(LIGHT)])], (SX, SY + 235)),
            text('server label', [(0, label)], (SX, SY - 250), 30, SLATE)]


def pill(nm, value, t0, t1, p, w=230, h=64, size=30, color=AMBER, bg=PAPER, border=None, grow=8):
    """A rounded value pill that pops in at t0 and fades by t1; returns (container, text) layers."""
    o = fade((t0, 0), (t0 + 6, 100), (t1 - 4, 100), (t1, 0))
    shapes = ([group([rect(w, h, h / 2), stroke(border, 4)])] if border else []) + [group([rect(w, h, h / 2), fill(bg)])]
    box = layer(nm, shapes, p, o=o, s=pop(t0, t0 + grow))
    return box, text(nm + ' text', [(0, value)], (0, size / 3), size, color, parent=box['ind'], o=o)


def compare(rows, t0, tick_at, hx=SX - 60):
    """Two chips stacked above the server, each 'label · value', then a green tick; rows = [(nm, label, value, dark[, colour])]."""
    out = []
    for k, (nm, lab, val, dark, *col) in enumerate(rows):
        t, y = t0 + 20 * k, SY - 430 + 75 * k
        bg, fg = (INK, '#FFFFFF') if dark else (PAPER, INK)
        o = fade((t, 0), (t + 8, 100))
        chip = layer(nm, ([] if dark else [group([rect(470, 60, 12), stroke(LIGHT, 3)])]) + [group([rect(470, 60, 12), fill(bg)])], (hx, y), o=o, s=pop(t))
        out += [chip, text(nm + ' value', [(0, val)], (75, 10), 26, col[0] if col else fg, parent=chip['ind'], o=o),
                text(nm + ' label', [(0, lab)], (-215, 8), 20, '#A4B0AA' if dark else '#7A7A72', j=0, parent=chip['ind'], o=o)]
    out.append(layer('match', [group([path([[-16, 0], [-4, 12], [18, -12]]), stroke('#FFFFFF', 7), trim(anim([(tick_at + 8, 0), (tick_at + 18, 100)]))]),
                               group([ellipse(64, 64), fill(GREEN)])], (hx + 290, SY - 392), o=fade((tick_at, 0), (tick_at + 6, 100)), s=pop(tick_at, tick_at + 10)))
    return out


def compose(name, op, lap, layers, under=('server', 'tunnel', 'tunnel head'), bottom=('server shadow',)):
    """Order layers over the laptop precomp: `under` sits just above it, `bottom` below it."""
    precomp = {'ddd': 0, 'ind': 1, 'ty': 0, 'nm': 'laptop scene', 'refId': 'laptop', 'sr': 1, 'ao': 0, 'ip': 0, 'op': op, 'st': 0, 'bm': 0, 'w': lap['w'], 'h': lap['h'],
               'ks': {'o': static(100), 'r': static(0), 'p': static([X0, Y0, 0]), 'a': static([0, 0, 0]), 's': static([SC, SC, 100])}}
    ordered = ([l for l in layers if l['nm'] not in under + bottom] + [l for l in layers if l['nm'] in under] + [precomp]
               + [l for l in layers if l['nm'] in bottom])
    # A parented layer must sit above its parent, or the parent's fill hides it.
    for child in [l for l in ordered if 'parent' in l]:
        ordered.remove(child)
        ordered.insert(next(i for i, l in enumerate(ordered) if l['ind'] == child['parent']), child)
    return {'v': '5.7.0', 'fr': FPS, 'ip': 0, 'op': op, 'w': W, 'h': H, 'nm': name, 'ddd': 0,
            'assets': [{'id': 'laptop', 'w': lap['w'], 'h': lap['h'], 'layers': lap['layers']}],
            'fonts': {'list': [{'fName': 'Inter-Bold', 'fFamily': 'Inter', 'fStyle': 'Bold', 'ascent': 72.7}]},
            'layers': ordered}


def connection(start, end, out_t, in_t, t0, t1, head=34):
    """A dashed bezier from start to end that draws in over t0..t1, finished by a filled arrowhead aimed along the curve's end."""
    dx, dy = -in_t[0], -in_t[1]
    n = math.hypot(dx, dy)
    ux, uy = dx / n, dy / n
    base = [end[0] - ux * head, end[1] - uy * head]
    wing = head * 0.55
    tri = path([list(end), [base[0] - uy * wing, base[1] + ux * wing], [base[0] + uy * wing, base[1] - ux * wing]], closed=True)
    # Scale the tangents so the shortened curve keeps the same shape, then size the dashes so a full dash starts and ends the line.
    k = 1 - head / math.hypot(end[0] - start[0], end[1] - start[1])
    o, i = [v * k for v in out_t], [v * k for v in in_t]
    pts = [start, [start[0] + o[0], start[1] + o[1]], [base[0] + i[0], base[1] + i[1]], base]
    L, prev = 0, start
    for s in range(1, 201):
        t = s / 200
        p = [(1 - t) ** 3 * pts[0][j] + 3 * (1 - t) ** 2 * t * pts[1][j] + 3 * (1 - t) * t ** 2 * pts[2][j] + t ** 3 * pts[3][j] for j in (0, 1)]
        L, prev = L + math.hypot(p[0] - prev[0], p[1] - prev[1]), p
    line = stroke(SLATE, 6, dash=L / (2 * round((L / 14 + 1) / 2) - 1))
    arc = path([start, base], ins=[[0, 0], i], outs=[o, [0, 0]])
    return [layer('tunnel', [group([arc, line, trim(anim([(t0, 0), (t1, 100)]))])], (0, 0)),
            layer('tunnel head', [group([tri, fill(SLATE)])], (0, 0), o=fade((t1 - 2, 0), (t1 + 1, 100)), s=100)]
