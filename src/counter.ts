
import { ClientSVGEditor } from './clientSVG'


export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}
export function testmylib() {
  console.log('testmylib');
  const dom = new ClientSVGEditor('#map', {colorBG:'#fff'});
  console.log(dom);
}