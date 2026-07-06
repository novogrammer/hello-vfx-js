import './style.scss'

import { VFX } from '@vfx-js/core';
import { BloomEffect, PixelateEffect } from '@vfx-js/effects';
import { domReady } from './_dom_utils';


domReady(()=>{


  const vfx = new VFX();

  const heroTitleImageElement = document.querySelector<HTMLElement>('.p-home-section-hero__title-image')!;
  const pixcelateEffect = new PixelateEffect({ size: 10 });
  const bloomEffect = new BloomEffect({ intensity: 5 });
  vfx.add(heroTitleImageElement, {
    effect: [pixcelateEffect, bloomEffect],
  });
  setInterval(()=>{
    pixcelateEffect.setParams({
      size:Math.round(window.innerWidth / 100),
    });
    // bloomEffect.setParams({
    //   pad:Math.round(window.innerWidth / 100),
    // });
  },100);

  // const heroElement = document.querySelector<HTMLElement>('.p-home-section-hero')!;
  // vfx.add(heroElement, {
  //   shader: "halftone",
  // });
  // setInterval(()=>{
  //   vfx.update(heroElement);
  // },100);

})

