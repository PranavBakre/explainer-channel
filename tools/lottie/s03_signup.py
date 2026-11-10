"""Build the S03 sign-up shot: you type mango@123, the app saves it as typed in its users table, then a login compares plain text.

Usage: python3 tools/lottie/s03_signup.py <laptop.json> <out.json>
"""
import json, sys
from lot import *

OP = 560
SIGNUP, SAVE, LOGIN = 0, 174, 386
ROWS = [('asha@mail.com', 'sunshine1'), ('ravi@mail.com', '123456'), ('you@mail.com', 'mango@123')]
TY = 215


def users_table(t_you):
    """The app's users table above the server; the last row (yours) appears at t_you."""
    o = fade((SAVE + 30, 0), (SAVE + 40, 100), (LOGIN - 10, 100), (LOGIN, 0))
    box = layer('table', [group([rect(540, 220, 14), stroke(LIGHT, 3)]), group([rect(540, 220, 14), fill(PAPER)])], (SX, TY), o=o)
    out = [box, text('table title', [(0, 'users')], (SX - 270, TY - 128), 22, SLATE, j=0, o=o)]
    cols = [('email', -245), ('password', 35)]
    for k, (nm, x) in enumerate(cols):
        t = SAVE + 90 + 40 * k
        band = layer(nm + ' band', [group([rect(236 if k else 280, 206, 8), fill(AMBER if k else BLUE, 14)])], (144 if k else -115, 0), parent=box['ind'],
                     o=fade((t, 0), (t + 6, 100), (t + 30, 100), (t + 38, 0)))
        out += [band, text(nm + ' head', [(0, nm)], (x, -75), 18, '#7A7A72', j=0, parent=box['ind'], o=o)]
    for k, (email, pw) in enumerate(ROWS):
        y = -27 + 50 * k
        ro = o if k < 2 else fade((t_you, 0), (t_you + 6, 100), (LOGIN - 10, 100), (LOGIN, 0))
        out += [text('row %d email' % k, [(0, email)], (-245, y + 8), 24, INK, j=0, parent=box['ind'], o=ro),
                text('row %d pw' % k, [(0, pw)], (35, y + 8), 24, AMBER, j=0, parent=box['ind'], o=ro)]
    return out


def flight(nm, t0, start, end, out_t, in_t):
    """The typed password lifts out of the field and rides the arc to the server, as typed."""
    card, card_text = pill(nm, 'mango@123', t0, t0 + 50, (0, 0), border=AMBER)
    p = anim([(t0, list(FIELD)), (t0 + 12, start), (t0 + 46, end)], spatial=True)
    p['k'][1]['to'], p['k'][1]['ti'] = out_t + [0], in_t + [0]
    card['ks']['p'] = p
    return [card, card_text]


def build(laptop):
    pw = 'mango@123'
    keys = typing(pw, 40) + [(SAVE + 2, '•' * len(pw)), (LOGIN, '')] + [(k + LOGIN - 34, t) for k, t in typing(pw, 40, 3)[1:]] + [(LOGIN + 36, '•' * len(pw))]
    lap = laptop_scene(laptop, keys)
    start, end = [FIELD[0] + 300, FIELD[1] - 70], [1400, 560]
    out_t, in_t = [180, -230], [-160, -190]
    layers = server(blink=SAVE + 60)
    arc = path([start, end], ins=[[0, 0], in_t], outs=[out_t, [0, 0]])
    layers.append(layer('tunnel', [group([arc, stroke(SLATE, 6, dash=14), trim(anim([(SAVE, 0), (SAVE + 22, 100)]))])], (0, 0)))
    head = path([[end[0] - 26, end[1] - 30], end, [end[0] - 34, end[1] + 4]])
    layers.append(layer('tunnel head', [group([head, stroke(SLATE, 6)])], (0, 0), o=fade((SAVE + 20, 0), (SAVE + 23, 100))))
    layers += flight('signup card', SAVE, start, end, out_t, in_t)
    layers += users_table(SAVE + 50)
    layers += flight('login card', LOGIN + 34, start, end, out_t, in_t)
    layers += compare([('typed', 'typed at login', pw, True, AMBER), ('saved', 'saved password', pw, False, AMBER)], LOGIN + 82, LOGIN + 122)
    return compose('S03 sign-up', OP, lap, layers)


if __name__ == '__main__':
    src, out = sys.argv[1:]
    json.dump(build(json.load(open(src))), open(out, 'w'))
    print('wrote', out)
