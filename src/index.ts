import './style.scss'

import { VFX } from '@vfx-js/core';
import { BloomEffect, PixelateEffect } from '@vfx-js/effects';
import { domReady } from './_dom_utils';


domReady(()=>{


  const vfx = new VFX();


  const heroHumanImageElement = document.querySelector<HTMLElement>('.p-home-section-hero__human-image')!;
  vfx.add(heroHumanImageElement, {
    shader: "halftone",
    zIndex:1,
  });
  setInterval(()=>{
    vfx.update(heroHumanImageElement);
  },100);



  const heroTitleImageElement = document.querySelector<HTMLElement>('.p-home-section-hero__title-image')!;
  const pixcelateEffect = new PixelateEffect({ size: 10 });
  const bloomEffect = new BloomEffect({ intensity: 5 });
  vfx.add(heroTitleImageElement, {
    effect: [pixcelateEffect, bloomEffect],
    zIndex:2,
  });
  setInterval(()=>{
    pixcelateEffect.setParams({
      size:Math.round(window.innerWidth / 100),
    });
    // bloomEffect.setParams({
    //   pad:Math.round(window.innerWidth / 100),
    // });
  },100);

  document.querySelectorAll<HTMLElement>(".p-home-section-hero__balloon-image, .p-home-section-hero__badge-image, .p-home-section-hero__date-image").forEach((element)=>{
      vfx.add(element, {
        shader: "halftone",
        zIndex:3,
      });

  })


  // const heroElement = document.querySelector<HTMLElement>('.p-home-section-hero')!;
  // vfx.add(heroElement, {
  //   shader: "rgbShift",
  // });
  // setInterval(()=>{
  //   vfx.update(heroElement);
  // },100);

})

