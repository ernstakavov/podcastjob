#!/usr/bin/env python3
"""Generate the 'Драконьи Пончики FM' audio podcast from the script."""
import os, subprocess, wave, struct, math
import numpy as np

SR = 22050
VOICES = "/tmp/voices"
WORK = "/tmp/pod_segments"
os.makedirs(WORK, exist_ok=True)

# ----------------------------------------------------------------------------
# Piper synthesis helpers
# ----------------------------------------------------------------------------
def piper(text, model, out):
    p = subprocess.run(
        ["python3", "-m", "piper", "-m", f"{VOICES}/{model}.onnx",
         "--length_scale", "1.0", "-f", out],
        input=text.encode("utf-8"),
        stdout=subprocess.DEVNULL, stderr=subprocess.PIPE,
    )
    if p.returncode != 0:
        raise RuntimeError(p.stderr.decode())

def read_wav(path):
    with wave.open(path, "rb") as w:
        n = w.getnframes()
        data = w.readframes(n)
        a = np.frombuffer(data, dtype=np.int16).astype(np.float32) / 32768.0
        if w.getnchannels() == 2:
            a = a.reshape(-1, 2).mean(axis=1)
    return a

def pitch_shift(a, factor):
    """Resample to shift pitch, then time-stretch back to keep tempo (crude)."""
    # change pitch by resampling
    idx = np.arange(0, len(a), factor)
    idx = idx[idx < len(a) - 1].astype(np.float32)
    lo = idx.astype(int)
    frac = idx - lo
    shifted = a[lo] * (1 - frac) + a[lo + 1] * frac
    return shifted.astype(np.float32)

def silence(ms):
    return np.zeros(int(SR * ms / 1000), dtype=np.float32)

# ----------------------------------------------------------------------------
# Jingle / SFX synthesis with numpy
# ----------------------------------------------------------------------------
def tone(freq, dur, vol=0.3, wave_t="sine", decay=True):
    t = np.linspace(0, dur, int(SR * dur), endpoint=False)
    if wave_t == "sine":
        s = np.sin(2 * np.pi * freq * t)
    elif wave_t == "square":
        s = np.sign(np.sin(2 * np.pi * freq * t))
    else:
        s = np.sin(2 * np.pi * freq * t)
    if decay:
        env = np.exp(-3.0 * t / dur)
    else:
        env = np.ones_like(t)
    # small attack to avoid clicks
    a = int(0.01 * SR)
    if a < len(env):
        env[:a] *= np.linspace(0, 1, a)
    return (s * env * vol).astype(np.float32)

def note(name, dur, vol=0.3):
    freqs = {"C5":523.25,"D5":587.33,"E5":659.25,"F5":698.46,"G5":783.99,
             "A5":880.00,"B5":987.77,"C6":1046.50,"G4":392.0,"C4":261.63,
             "E4":329.63}
    return tone(freqs[name], dur, vol)

def dragon_roar(dur=1.1, vol=0.32):
    """Low rumbling growl: filtered noise + low sweeping tone."""
    n = int(SR * dur)
    t = np.linspace(0, dur, n, endpoint=False)
    noise = np.random.randn(n).astype(np.float32)
    # simple low-pass via cumulative smoothing
    k = 60
    kernel = np.ones(k) / k
    noise = np.convolve(noise, kernel, mode="same")
    sweep = np.sin(2 * np.pi * (70 + 30 * np.sin(2 * np.pi * 3 * t)) * t)
    env = np.minimum(t / 0.1, 1.0) * np.exp(-1.5 * t / dur)
    sig = (0.7 * noise / (np.max(np.abs(noise)) + 1e-9) + 0.6 * sweep) * env
    return (sig * vol).astype(np.float32)

def bubbling(dur=0.9, vol=0.18):
    """Frying-oil bubbles: random short blips."""
    n = int(SR * dur)
    out = np.zeros(n, dtype=np.float32)
    t_pos = 0.0
    while t_pos < dur - 0.05:
        f = np.random.uniform(300, 900)
        d = np.random.uniform(0.02, 0.05)
        blip = tone(f, d, vol=np.random.uniform(0.4, 1.0))
        start = int(t_pos * SR)
        out[start:start + len(blip)] += blip[:max(0, n - start)]
        t_pos += np.random.uniform(0.015, 0.06)
    return (out * vol).astype(np.float32)

def fanfare_intro():
    """Cheerful ascending fanfare + dragon roar underneath + bubbling."""
    melody = np.concatenate([
        note("C5", 0.18, 0.32), note("E5", 0.18, 0.32),
        note("G5", 0.18, 0.32), note("C6", 0.42, 0.38),
    ])
    roar = dragon_roar(len(melody) / SR + 0.3)
    bub = bubbling(0.6, 0.14)
    base = np.zeros(max(len(melody), len(roar)), dtype=np.float32)
    base[:len(roar)] += roar
    base[:len(melody)] += melody
    return np.concatenate([bub, base, silence(120)])

def transition_sting():
    mel = np.concatenate([note("G5", 0.13, 0.30), note("C6", 0.22, 0.34)])
    bub = bubbling(0.35, 0.10)
    out = np.zeros(max(len(mel), len(bub)), dtype=np.float32)
    out[:len(bub)] += bub
    out[:len(mel)] += mel
    return np.concatenate([silence(80), out, silence(120)])

def munch_outro():
    """довольное чавканье -> a couple soft munch thumps + descending happy notes."""
    n = int(SR * 0.5)
    munch = np.zeros(n, dtype=np.float32)
    for c in (0.05, 0.20, 0.34):
        f = 140
        d = 0.09
        blip = tone(f, d, vol=0.5, wave_t="sine")
        # add noise burst
        nb = (np.random.randn(len(blip)).astype(np.float32)
              * np.exp(-8 * np.linspace(0, d, len(blip))) * 0.25)
        s = int(c * SR)
        seg = (blip + nb)
        munch[s:s + len(seg)] += seg[:max(0, n - s)]
    melody = np.concatenate([
        note("C6", 0.16, 0.30), note("G5", 0.16, 0.30),
        note("E5", 0.16, 0.30), note("C5", 0.34, 0.34),
    ])
    return np.concatenate([munch * 0.4, silence(60), melody, silence(150)])

# ----------------------------------------------------------------------------
# Script: (kind, text)  kind in {glaz, pos, announce}
# ----------------------------------------------------------------------------
SCRIPT = [
    ("JINGLE_INTRO", None),
    ("announce", "Радио Драконьи Пончики FM. Самая румяная частота в небесах!"),
    ("glaz", "Доброе утро, тесто и пламя! С вами Драконьи Пончики — "
             "единственный подкаст, где выпечка дышит огнём, а глазурь "
             "предсказывает будущее. Меня зовут Глазурий, и я уже три минуты "
             "как не остыл."),
    ("pos",  "А я Посыпка, и я рассыпалась по всей студии от восторга. "
             "Сегодня в выпуске: прогноз погоды, гороскоп и одна очень личная "
             "драма про пончик, который не захотел, чтобы его ели."),
    ("glaz", "Душераздирающе. Но сначала — погода!"),
    ("STING", None),
    ("announce", "Прогноз погоды для драгончиков-пончиков."),
    ("pos",  "Синоптики обещают: с утра по всей пекарне умеренный сахарный "
             "туман, видимость — до ближайшей тарелки. К полудню ожидается "
             "тёплый поток из духовки, температура поднимется до приятных ста "
             "восьмидесяти градусов — идеально, чтобы подрумяниться, но не "
             "подгореть."),
    ("glaz", "Ветер юго-восточный, доносит запах корицы. Драгончикам с "
             "начинкой рекомендуем держать крылья сложенными — возможны "
             "порывы кондитерского крема."),
    ("pos",  "К вечеру — лёгкие осадки в виде сахарной пудры, местами "
             "переходящие в шоколадную крошку. Не забудьте салфетку! "
             "Атмосферное давление повышенное, особенно у тех, кого "
             "вот-вот съедят."),
    ("glaz", "Завтра без изменений: тепло, сладко, опасно вкусно."),
    ("STING", None),
    ("announce", "Гороскоп для всех знаков теста."),
    ("pos",  "Звёзды сегодня в форме звёздочек из посыпки, так что слушайте "
             "внимательно."),
    ("glaz", "Глазированные — день удачи! Кто-то ласково тронет вас пальцем. "
             "Не пугайтесь, это любовь."),
    ("pos",  "Огнедышащие — сдерживайте эмоции, иначе подпалите соседа по "
             "противню. Медитация и стакан молока помогут."),
    ("glaz", "С повидлом — внутри вас зреет нечто прекрасное. Буквально. "
             "Откройтесь миру, но аккуратно — можете протечь."),
    ("pos",  "Чешуйчатые с сахаром — ваша блестящая натура сегодня привлечёт "
             "внимание. Возможна короткая, но яркая карьера на витрине."),
    ("glaz", "Пышки без дырки — не сравнивайте себя с другими. Ваша "
             "целостность — это сила."),
    ("pos",  "Драгончики-малыши — впереди приключение размером с целую "
             "тарелку. Будьте смелы, но не падайте со стола."),
    ("STING", None),
    ("glaz", "На этом всё. Берегите глазурь, дышите огнём с умом."),
    ("pos",  "И помните — каждый пончик внутри немного дракон. Пока-пока!"),
    ("JINGLE_OUTRO", None),
]

VOICE_MODEL = {"glaz": "dmitri", "pos": "irina", "announce": "dmitri"}

def render():
    pieces = []
    seg_i = 0
    for kind, text in SCRIPT:
        if kind == "JINGLE_INTRO":
            pieces.append(fanfare_intro()); pieces.append(silence(250)); continue
        if kind == "JINGLE_OUTRO":
            pieces.append(silence(150)); pieces.append(munch_outro()); continue
        if kind == "STING":
            pieces.append(transition_sting()); continue
        model = VOICE_MODEL[kind]
        wavp = f"{WORK}/seg_{seg_i:02d}.wav"
        piper(text, model, wavp)
        a = read_wav(wavp)
        if kind == "announce":
            a = pitch_shift(a, 1.14)   # lower pitch -> booming radio announcer
            a *= 1.05
        pieces.append(a)
        # natural gap; longer pause after announcer headers
        pieces.append(silence(550 if kind == "announce" else 350))
        seg_i += 1
        print(f"  rendered {kind:9s} seg{seg_i}: {len(a)/SR:5.1f}s")
    full = np.concatenate(pieces)
    # normalize
    peak = np.max(np.abs(full))
    if peak > 0:
        full = full / peak * 0.95
    # write master wav
    pcm = (full * 32767).astype(np.int16)
    master = "/tmp/podcast_master.wav"
    with wave.open(master, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(f"master: {len(full)/SR:.1f}s -> {master}")
    return master

if __name__ == "__main__":
    print("Rendering segments...")
    master = render()
    out_mp3 = "/tmp/dragonchiki_ponchiki_podcast.mp3"
    subprocess.run(
        ["ffmpeg", "-y", "-i", master,
         "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
         "-codec:a", "libmp3lame", "-q:a", "3", out_mp3],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    print("MP3 ready:", out_mp3)
