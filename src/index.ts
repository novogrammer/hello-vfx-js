import './style.scss'

import { VFX } from '@vfx-js/core';
import { BloomEffect, PixelateEffect } from '@vfx-js/effects';
import { domReady } from './_dom_utils';


domReady(()=>{
  const heroElement = document.querySelector<HTMLElement>('.p-home-section-hero__title-image')!;


  const vfx = new VFX();

  vfx.add(heroElement, {
    effect: [new PixelateEffect({ size: 10 }), new BloomEffect({ intensity: 5 })],
  });

})

