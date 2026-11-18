// Local Kokoro-82M voice-over generation — no network, no explainroo CLI.
//
// Uses the model weights the explainroo installer downloaded to
// ~/.cache/explainroo/models and the kokoro-js runtime that ships inside the
// explainroo package. Run with the runtime resolvable, e.g.:
//
//   node scripts/tts.mjs scripts/vo-script.json public/audio/vo
//
// then post-process (broadcast chain) with:
//
//   ffmpeg -i raw.wav -af "highpass=f=85,equalizer=f=260:t=q:w=1.2:g=-1.5,
//     equalizer=f=3100:t=q:w=1.3:g=1.8,
//     acompressor=threshold=0.09:ratio=3:attack=6:release=140:makeup=2,
//     loudnorm=I=-19:TP=-3.0:LRA=7" -ar 24000 -ac 1 -c:a pcm_s16le out.wav
//
// spec: [{ id, text, voice?, speed? }, ...] -> <outdir>/<id>.wav (24 kHz)
import { mkdirSync, readFileSync } from 'fs';
import { env as hfEnv } from '@huggingface/transformers';
import { KokoroTTS } from 'kokoro-js';

hfEnv.localModelPath = `${process.env.HOME}/.cache/explainroo/models`;
hfEnv.allowRemoteModels = false;

const [specPath, outDir] = process.argv.slice(2);
if (!specPath || !outDir) {
  console.error('usage: node tts.mjs <spec.json> <outdir>');
  process.exit(1);
}
const spec = JSON.parse(readFileSync(specPath, 'utf8'));

const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', {
  dtype: 'fp32',
  device: 'cpu',
});
mkdirSync(outDir, { recursive: true });

for (const item of spec) {
  const audio = await tts.generate(item.text, {
    voice: item.voice || 'af_heart',
    speed: item.speed || 1.0,
  });
  const out = `${outDir}/${item.id}.wav`;
  await audio.save(out);
  console.log(`${item.id} ${(audio.audio.length / audio.sampling_rate).toFixed(2)}s -> ${out}`);
}
