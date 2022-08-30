
import { ClientSVGEditor } from '../src/clientSVG'
import   '../src/style.css'
import { DataInteractive } from '../src/models/simple.models'
import  {dataShops2,dataShops} from './dataItems'


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
  const nodeMap2 = document.getElementById('map2')

  const 
    baloonTheme = {
                  colorBG: '#eeeeee',
                  colorTitle:'#000000',
                  colorDescription:'#000000',  
                  isPositionFixed:false,
                  top:100,
                  left:200
  
  };
  

  const map1 = new ClientSVGEditor(
    nodeMap, // node - dom element to insert svg
    dataShops2,     // dataItems - data to render
    {
      title:'Пример карты', // Заголовок карты
      colorBG:'#ff0000',// Цвет фона карты
      urlmap:'./public/Shelkovsky-float-0.svg',// Путь к файлу карты
      isRemoveUnuseItem:false,// Удалять ли неиспользуемые элементы карты
      mapTheme:{  
        colorBG: '#ffdd3d',
        colorItem: '#aaa',
        colorHoverItem: '#9e3232',
        colorSelectItem: '#0000ff',
        opacityItem: 0.0,
        opacityHoverItem: 0.3,
        opacitySelectItem: 1,
        colorBorderItem: '#000000',
        colorBorderHoverItem: '#ffffff',
        colorBorderSelectItem: '#ffffff',
        isBorderItem: false,
        isBorderHoverItem: false,
        isBorderSelectItem: false,
        widthBorderItem: 2,
        widthBorderHoverItem: 2,
        widthBorderSelectItem: 2,
    }
    },
    baloonTheme
    );
  const startMap = map1.start();
  console.log(startMap);
  const map2 = new ClientSVGEditor(
    nodeMap2, // node - dom element to insert svg
    dataShops,     // dataItems - data to render
    {
      title:'Пример карты 2', // Заголовок карты
      
      urlmap:'./public/floor-1_1.svg',// Путь к файлу карты
      isRemoveUnuseItem:true,// Удалять ли неиспользуемые элементы карты
      mapTheme:{  
        colorBG: '#ffffff',
        colorItem: '#a55',
        colorHoverItem: '#9e3232',
        colorSelectItem: '#0000ff',
        opacityItem: 0.7,
        opacityHoverItem: 0.3,
        opacitySelectItem: 1,
        colorBorderItem: '#000000',
        colorBorderHoverItem: '#ffffff',
        colorBorderSelectItem: '#ffffff',
        isBorderItem: true,
        isBorderHoverItem: false,
        isBorderSelectItem: false,
        widthBorderItem: 2,
        widthBorderHoverItem: 2,
        widthBorderSelectItem: 2,
    }
    },
    baloonTheme
    );
  const startMap2 = map2.start();
  console.log(startMap2);
 // map1.insertSVG('./public/floor-1_1.svg');
  console.log('New Client map1 = ',map1);
}