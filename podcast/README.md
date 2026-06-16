# Драконьи Пончики FM — аудиоподкаст

Аудиоверсия сценария `dragonchiki_ponchiki_podcast.txt`.

- **`dragonchiki_ponchiki_podcast.mp3`** — готовый подкаст (~2:27).
- **`generate_podcast.py`** — скрипт генерации.

## Голоса

Синтез речи — офлайн через [Piper TTS](https://github.com/rhasspy/piper)
(нейросетевые голоса, русский язык):

| Роль | Голос |
|------|-------|
| Глазурий (ведущий) | `ru_RU-dmitri-medium` |
| Посыпка (соведущая) | `ru_RU-irina-medium` |
| Диктор / станционные отбивки | `dmitri`, понижённый по тону |

Джинглы, драконий рёв, бульканье масла во фритюре и «довольное чавканье»
на финале синтезированы программно (numpy), переходы и мастеринг — `ffmpeg`
(`loudnorm` до −16 LUFS).

## Как пересобрать

```bash
pip install piper-tts
apt-get install -y ffmpeg
# модели ru_RU-dmitri-medium.onnx(.json) и ru_RU-irina-medium.onnx(.json)
# положить в /tmp/voices/ как dmitri.* и irina.*
python3 generate_podcast.py
```
