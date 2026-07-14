import type { VFXPass } from '@vfx-js/core';

type ValueOrGetter<T> = T | (() => T);

const FRAG_SINEWAVE = `
precision highp float;

uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform bool autoCrop;
uniform sampler2D src;

uniform float amplitude;
uniform float frequency;
uniform float speed;
uniform float phase;
uniform float blur;

out vec4 outColor;

vec4 readTex(sampler2D tex, vec2 uv) {
  if (autoCrop &&
      (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0)) {
    return vec4(0.0);
  }
  return texture(tex, uv);
}

vec4 draw(vec2 uv) {
  vec2 uvR = uv;
  vec2 uvG = uv;
  vec2 uvB = uv;

  float amplitudeUv = amplitude / resolution.x;
  float wave = uv.y * frequency + time * speed;

  uvR.x += sin(wave) * amplitudeUv;
  uvG.x += sin(wave + phase) * amplitudeUv;
  uvB.x += sin(wave + phase * 2.0) * amplitudeUv;

  vec4 colorR = readTex(src, uvR);
  vec4 colorG = readTex(src, uvG);
  vec4 colorB = readTex(src, uvB);

  return vec4(
    colorR.r,
    colorG.g,
    colorB.b,
    colorR.a + colorG.a + colorB.a
  );
}

void main() {
  vec2 uv = (gl_FragCoord.xy - offset) / resolution;
  vec2 dx = vec2(blur, 0.0) / resolution.x;
  outColor = (draw(uv) * 2.0 + draw(uv + dx) + draw(uv - dx)) / 4.0;
}
`;

export type SinewavePassParams = {
  amplitude?: ValueOrGetter<number>;
  frequency?: ValueOrGetter<number>;
  speed?: ValueOrGetter<number>;
  phase?: ValueOrGetter<number>;
  blur?: ValueOrGetter<number>;
};

export function createSinewavePass({
  amplitude = 20,
  frequency = 7,
  speed = 3,
  phase = 0.4,
  blur = 2,
}: SinewavePassParams = {}): VFXPass {
  return {
    frag: FRAG_SINEWAVE,
    uniforms: {
      amplitude,
      frequency,
      speed,
      phase,
      blur,
    },
  };
}
