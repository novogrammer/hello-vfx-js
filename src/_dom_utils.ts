export function domReady(onReady: () => void) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
}


export function getVwToPx() {
  const div = document.createElement('div');
  div.style.width = '100vw';
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  const width = div.offsetWidth;
  div.remove();
  return width / 100;

}