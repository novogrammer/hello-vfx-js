import './style.scss'

import { shaders, VFX } from '@vfx-js/core';
import { domReady, getComputedOpacity } from './_dom_utils';
import { createOpacityPass } from './effects/opacity-pass';


function setupVfxJs() {
  const vfx = new VFX();


  const addHalftoneWithOpacity=(element:HTMLElement,zIndex:number)=>{
    const imageElement = element.querySelector<HTMLElement>('img')!;
    vfx.add(imageElement, {
      shader: [
        {
          frag: shaders.rgbShift,
        },
        createOpacityPass(() => getComputedOpacity(element)),
      ],
      overflow:100,
      zIndex,
    });
  };

  // addHalftoneWithOpacity(document.querySelector<HTMLElement>('.p-home-section-hero__human')!,1);





  {
    const heroTitleElement = document.querySelector<HTMLElement>('.p-home-section-hero__title')!;
    const heroTitleImageElement = document.querySelector<HTMLElement>('.p-home-section-hero__title-image')!;
    vfx.add(heroTitleImageElement, {
      shader: [
        {
          frag: shaders.sinewave,
        },
        createOpacityPass(() => getComputedOpacity(heroTitleElement)),
      ],
      overflow:100,
      zIndex: 2,
    });
  }


  addHalftoneWithOpacity(document.querySelector<HTMLElement>('.p-home-section-hero__badge')!,3);


  addHalftoneWithOpacity(document.querySelector<HTMLElement>('.p-home-section-hero__date')!,3);

  addHalftoneWithOpacity(document.querySelector<HTMLElement>('.p-home-section-hero__balloon--01')!,3);
  addHalftoneWithOpacity(document.querySelector<HTMLElement>('.p-home-section-hero__balloon--02')!,3);
  addHalftoneWithOpacity(document.querySelector<HTMLElement>('.p-home-section-hero__balloon--03')!,3);
  addHalftoneWithOpacity(document.querySelector<HTMLElement>('.p-home-section-hero__balloon--04')!,3);


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
