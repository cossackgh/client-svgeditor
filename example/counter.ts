
import { ClientSVGEditor } from '../src/clientSVG'
import   '../src/style.css'
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
  const nodeMap = document.getElementById('map')
  const dataShops: DataInteractive[] = [
    { id: '1', idmap:'item-0', title: 'Shop 1', slug: 'shop-1', description: 'Description Shop 1', image: 'https://via.placeholder.com/150', },
    { id: '2', idmap:'item-1', title: 'Shop 2', slug: 'shop-2', description: 'Description Shop 2', image: 'https://via.placeholder.com/150', },
    { id: '3', idmap:'item-2', title: 'Shop 3', slug: 'shop-3', description: 'Description Shop 3', image: 'https://via.placeholder.com/150', },
    { id: '4', idmap:'item-3', title: 'Shop 4', slug: 'shop-4', description: 'Description Shop 4', image: 'https://via.placeholder.com/150', },
    { id: '5', idmap:'item-4', title: 'Shop 5', slug: 'shop-5', description: 'Description Shop 5', image: 'https://via.placeholder.com/150', },
    { id: '6', idmap:'item-532', title: 'Shop 532', slug: 'shop-532', description: 'Description Shop 532', image: 'https://via.placeholder.com/150', },
  ]

  const 
    baloonTheme = {
                  colorBG: '#ffffff',
                  colorTitle:'#000000',
                  colorDescription:'#000000',  
                  isPositionFixed:true,
                  top:310,
                  left:310
  
  };
  

  const dom = new ClientSVGEditor(
    nodeMap, // node - dom element to insert svg
    dataShops,     // dataItems - data to render
    {
      title:'Пример карты', // Заголовок карты
      colorBG:'#ffffff',// Цвет фона карты
      urlmap:'./public/floor-1_1.svg',// Путь к файлу карты
      isRemoveUnuseItem:true,// Удалять ли неиспользуемые элементы карты
    },
    baloonTheme
    );
  const startMap =dom.start();
  console.log(startMap);
 // dom.insertSVG('./public/floor-1_1.svg');
  console.log('New Client = ',dom);
}