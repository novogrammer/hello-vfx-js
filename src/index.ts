import './style.scss'

import { VFX } from '@vfx-js/core';
import { BloomEffect, PixelateEffect } from '@vfx-js/effects';
import { domReady, getComputedOpacity } from './_dom_utils';
import { OpacityEffect } from './effects/opacity-effect';


function setupVfxJs() {
  const vfx = new VFX();


  const heroHumanImageElement = document.querySelector<HTMLElement>('.p-home-section-hero__human-image')!;

  vfx.add(heroHumanImageElement, {
    shader: "halftone",
    zIndex: 1,
  });
  setInterval(() => {
    vfx.update(heroHumanImageElement);
  }, 100);





  {
    const heroTitleElement = document.querySelector<HTMLElement>('.p-home-section-hero__title')!;
    const heroTitleImageElement = document.querySelector<HTMLElement>('.p-home-section-hero__title-image')!;
    const pixcelateEffect = new PixelateEffect({ size: 10 });
    const bloomEffect = new BloomEffect({ intensity: 5 });
    const opacityEffect = new OpacityEffect({ opacity: getComputedOpacity(heroTitleElement) });
    vfx.add(heroTitleImageElement, {
      effect: [pixcelateEffect, bloomEffect, opacityEffect],
      zIndex: 2,
    });
    setInterval(() => {
      pixcelateEffect.setParams({
        size: Math.round(window.innerWidth / 100),
      });
      console.log(getComputedOpacity(heroTitleElement));
      opacityEffect.setParams({
        opacity: getComputedOpacity(heroTitleElement),
      });
    }, 10);
  }

  document.querySelectorAll<HTMLElement>(".p-home-section-hero__balloon-image, .p-home-section-hero__badge-image, .p-home-section-hero__date-image").forEach((element) => {
    vfx.add(element, {
      shader: "halftone",
      zIndex: 3,
    });

  })


  // const heroElement = document.querySelector<HTMLElement>('.p-home-section-hero')!;
  // vfx.add(heroElement, {
  //   shader: "rgbShift",
  // });
  // setInterval(()=>{
  //   vfx.update(heroElement);
  // },100);

}

function setupVfxToggleLink(vfxJsEnabled: boolean) {
  const toggleLink = document.querySelector<HTMLAnchorElement>('.js-vfx-toggle');
  if (!toggleLink) {
    return;
  }

  const url = new URL(location.href);
  if (vfxJsEnabled) {
    url.searchParams.set('vfx-js', '0');
    toggleLink.textContent = 'vfx-jsをOFFにする';
  } else {
    url.searchParams.delete('vfx-js');
    toggleLink.textContent = 'vfx-jsをONにする';
  }

  toggleLink.href = url.toString();
}

domReady(() => {
  const params = new URLSearchParams(location.search);
  const vfxJsEnabled = params.get('vfx-js') !== '0';

  setupVfxToggleLink(vfxJsEnabled);

  if (vfxJsEnabled) {
    setupVfxJs();
  }
})
