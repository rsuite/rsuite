export default function innerText(node) {

  if (window.navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
    return node.innerContent;
  }
  return node.innerText;
}
