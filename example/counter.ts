
import { ClientSVGEditor } from '../src/clientSVG'
import { DataInteractive } from '../src/models/simple.models'


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
  const dataShops: DataInteractive[] = [
    { id: '1', idmap:'item-0', title: 'Shop 1', slug: 'shop-1', description: 'Shop 1', image: 'https://via.placeholder.com/150', },
    { id: '2', idmap:'item-1', title: 'Shop 2', slug: 'shop-2', description: 'Shop 2', image: 'https://via.placeholder.com/150', },
    { id: '3', idmap:'item-2', title: 'Shop 3', slug: 'shop-3', description: 'Shop 3', image: 'https://via.placeholder.com/150', },
    { id: '4', idmap:'item-3', title: 'Shop 4', slug: 'shop-4', description: 'Shop 4', image: 'https://via.placeholder.com/150', },
    { id: '5', idmap:'item-4', title: 'Shop 5', slug: 'shop-5', description: 'Shop 5', image: 'https://via.placeholder.com/150', },
  ]
  const dom = new ClientSVGEditor('#map', dataShops, {title:'Пример карты',colorBG:'#ffffff',urlmap:'./public/floor-1_1.svg'});
  dom.start();
 // dom.insertSVG('./public/floor-1_1.svg');
  console.log('New Client = ',dom);
}