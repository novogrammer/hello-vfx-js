import type { VFXPass } from '@vfx-js/core';

type ValueOrGetter<T> = T | (() => T);

const FRAG_RGB_SHIFT = `
precision highp float;

uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform bool autoCrop;
uniform sampler2D src;

uniform float amplitude;
uniform float frequency;
uniform float speed;
uniform float threshold;
uniform float channelOffset;
uniform float duration;

out vec4 outColor;

vec4 readTex(sampler2D tex, vec2 uv) {
  if (autoCrop &&
      (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0)) {
    return vec4(0.0);
  }
  return texture(tex, uv);
}

float noiseWave(float y, float t) {
  float n = (
    sin(y * 0.07 + t * 8.0 + sin(y * 0.5 + t * 10.0)) +
    sin(y * 0.7 + t * 2.0 + sin(y * 0.3 + t * 8.0)) * 0.7 +
    sin(y * 1.1 + t * 2.8) * 0.4
  );

  n += sin(y * 124.0 + t * 100.7) *
       sin(y * 877.0 - t * 38.8) * 0.3;

  return n;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - offset) / resolution;
  vec2 uvR = uv;
  vec2 uvG = uv;
  vec2 uvB = uv;

  float t = mod(time * speed, max(duration, 0.0001));
  float y = uv.y * frequency;
  float shift = noiseWave(y, t);
  float amplitudeUv = amplitude / resolution.x;

  if (abs(shift) > threshold) {
    uvR.x += shift * amplitudeUv;
    uvG.x += noiseWave(y, t + channelOffset) * amplitudeUv;
    uvB.x += noiseWave(y, t + channelOffset * 2.0) * amplitudeUv;
  }

  vec4 colorR = readTex(src, uvR);
  vec4 colorG = readTex(src, uvG);
  vec4 colorB = readTex(src, uvB);

  outColor = vec4(
    colorR.r,
    colorG.g,
    colorB.b,
    smoothstep(0.0, 1.0, colorR.a + colorG.a + colorB.a)
  );
}
`;

export type RgbShiftPassParams = {
  amplitude?: ValueOrGetter<number>;
  frequency?: ValueOrGetter<number>;
  speed?: ValueOrGetter<number>;
  threshold?: ValueOrGetter<number>;
  channelOffset?: ValueOrGetter<number>;
  duration?: ValueOrGetter<number>;
};

export function createRgbShiftPass({
  amplitude = 10,
  frequency = 1,
  speed = 1,
  threshold = 1,
  channelOffset = 10,
  duration = 30,
}: RgbShiftPassParams = {}): VFXPass {
  return {
    frag: FRAG_RGB_SHIFT,
    uniforms: {
      amplitude,
      frequency,
      speed,
      threshold,
      channelOffset,
      duration,
    },
  };
}
