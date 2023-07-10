export default function listenClic(e, containerEl, callback) {
  let { target } = e;

  while (target && target !== containerEl && target !== document.body) {
    target = target.parentNode;
  }

  if (target && target !== containerEl) {
    callback();
  }
}
