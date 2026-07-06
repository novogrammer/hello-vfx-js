import type { Effect, EffectContext } from '@vfx-js/core';

const FRAG_OPACITY = `#version 300 es
precision highp float;
in vec2 uvContent;
out vec4 outColor;

uniform sampler2D src;
uniform vec4 srcRectUv;
uniform float opacity;

void main() {
    vec4 c = texture(src, srcRectUv.xy + uvContent * srcRectUv.zw);
    outColor = c * opacity;
}
`;

export type OpacityEffectParams = {
  opacity: number;
};

const DEFAULT_PARAMS: OpacityEffectParams = {
  opacity: 1,
};

export class OpacityEffect implements Effect {
  params: OpacityEffectParams;

  constructor(initial: Partial<OpacityEffectParams> = {}) {
    this.params = { ...DEFAULT_PARAMS, ...initial };
  }

  setParams(updates: Partial<OpacityEffectParams>): void {
    Object.assign(this.params, updates);
  }

  render(ctx: EffectContext): void {
    const opacity = Math.min(1, Math.max(0, this.params.opacity));

    ctx.draw({
      frag: FRAG_OPACITY,
      uniforms: {
        src: ctx.src,
        opacity,
      },
      target: ctx.target,
    });
  }
}
