
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
    { id: '5', idmap:'item-4', title: 'Shop 5', slug: 'shop-5', description: 'Example description about Shop . This shop is shoes stoe top level brends', image: 'https://via.placeholder.com/150', },
    { id: '6', idmap:'item-532', title: 'Shop 532', slug: 'shop-532', description: 'Description Shop 532', image: 'https://via.placeholder.com/150', },
    { id: '7', idmap:'item-6', title: 'Shop 6', slug: 'shop-6', description: 'Description Shop 6', image: 'https://via.placeholder.com/150', },
    { id: '8', idmap:'item-7', title: 'Shop 7', slug: 'shop-7', description: 'Description Shop 7', image: 'https://via.placeholder.com/150', },
    { id: '9', idmap:'item-8', title: 'Shop 8', slug: 'shop-8', description: 'Description Shop 8', image: 'https://via.placeholder.com/150', },
  ]

  const 
    baloonTheme = {
                  colorBG: '#ffff32',
                  colorTitle:'#000000',
                  colorDescription:'#000000',  
                  isPositionFixed:true,
                  top:0,
                  left:0
  
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