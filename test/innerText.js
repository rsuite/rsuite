export default function innerText(node) {

  if (window.navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
    console.log('1', node.innerContent);
    return node.innerContent;
  }
  console.log('2');
  return node.innerText;
}
