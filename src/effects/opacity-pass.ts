import type { VFXPass } from '@vfx-js/core';

const FRAG_OPACITY = `
precision highp float;

uniform vec2 resolution;
uniform vec2 offset;
uniform sampler2D src;
uniform float opacity;

out vec4 outColor;

void main() {
  vec2 uv = (gl_FragCoord.xy - offset) / resolution;
  vec4 color = texture(src, uv);
  color.a *= clamp(opacity, 0.0, 1.0);
  outColor = color;
}
`;

export function createOpacityPass(opacity: number | (() => number)): VFXPass {
  return {
    frag: FRAG_OPACITY,
    uniforms: { opacity },
  };
}
