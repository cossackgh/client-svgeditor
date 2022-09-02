import { ClientSVGEditor } from '../src/clientSVG'
import '../src/style.css'
import { DataInteractive } from '../src/models/simple.models'
import { dataShops2, dataShops, dataShops3 } from './dataItems'

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
  console.log('testmylib')
  const nodeMap = document.getElementById('map')
  const nodeMap2 = document.getElementById('map2')
  const nodeMap3 = document.getElementById('map3')

  const baloonTheme = {
    colorBG: '#eeeeee',
    colorTitle: '#000000',
    colorDescription: '#000000',
    isPositionFixed: false,
    top: 100,
    left: 200,
  }

  const map1 = new ClientSVGEditor(
    nodeMap, // node - dom element to insert svg
    dataShops2, // dataItems - data to render
    {
      title: 'Пример карты', // Head Title this map
      urlmap: './public/Shelkovsky-float-0.svg', // Path to map svg
      isRemoveUnuseItem: false, // Remove unuse item from map?
      funcClick: gotoURLClick, // Function for click on item
      funcParams: 'https://www.google.com', // Params for function click on item
      mapTheme: {
        // Theme for map
        colorBG: '#ffdd3d', // Background color this map
        colorItem: '#aaa', // Fill Color for item
        colorHoverItem: '#9e3232', // Fill Color for item on hover
        colorSelectItem: '#0000ff', // Fill Color for item on select
        opacityItem: 0.0, // Opacity for item
        opacityHoverItem: 0.3, // Opacity for item on hover
        opacitySelectItem: 1, // Opacity for item on select
        colorBorderItem: '#000000', // Border color for item
        colorBorderHoverItem: '#ffffff', // Border color for item on hover
        colorBorderSelectItem: '#ffffff', // Border color for item on select
        isBorderItem: false, // Is set Border for item
        isBorderHoverItem: false, // Is set Border for item on hover
        isBorderSelectItem: false, // Is set Border for item on select
        widthBorderItem: 2, // Width for border item
        widthBorderHoverItem: 2, // Width for border item on hover
        widthBorderSelectItem: 2, // Width for border item on select
      },
    },
    baloonTheme
  )

  const startMap = map1.start()
  console.log(startMap)

  const map2 = new ClientSVGEditor(
    nodeMap2, // node - dom element to insert svg
    dataShops, // dataItems - data to render
    {
      // title: 'Пример карты 2', // Head Title this map
      urlmap: './public/floor-1_1-adaptive.svg', // Path to map svg
      isRemoveUnuseItem: true, // Remove unuse item from map?
      funcClick: gotoURLClick, // Function for click on item
      funcParams: 'https://www.google.com', // Params for function click on item
      mapTheme: {
        // Theme for map
        colorBG: '#ffffff', // Background color this map
        colorItem: '#a55', // Fill Color for item
        colorHoverItem: '#9e3232', // Fill Color for item on hover
        colorSelectItem: '#0000ff', // Fill Color for item on select
        opacityItem: 0.7, // Opacity for item
        opacityHoverItem: 0.3, // Opacity for item on hover
        opacitySelectItem: 1, // Opacity for item on select
        colorBorderItem: '#000000', // Border color for item
        colorBorderHoverItem: '#ffffff', // Border color for item on hover
        colorBorderSelectItem: '#ffffff', // Border color for item on select
        isBorderItem: true, // Is set Border for item
        isBorderHoverItem: false, // Is set Border for item on hover
        isBorderSelectItem: false, // Is set Border for item on select
        widthBorderItem: 2, // Width for border item
        widthBorderHoverItem: 2, // Width for border item on hover
        widthBorderSelectItem: 2, // Width for border item on select
      },
    },
    baloonTheme
  )
  const startMap2 = map2.start()
  console.log(startMap2)

  const map3 = new ClientSVGEditor(
    nodeMap3, // node - dom element to insert svg
    dataShops3, // dataItems - data to render
    {
      title: 'Пример плана квартиры', // Head Title this map
      urlmap: './public/plan-house-1.svg', // Path to map svg
      isRemoveUnuseItem: true, // Remove unuse item from map?
      funcClick: gotoURLClick, // Function for click on item
      funcParams: 'https://www.google.com', // Params for function click on item
      mapTheme: {
        colorBG: '#ffffff',
        colorItem: '#a55',
        colorHoverItem: '#9e3232',
        colorSelectItem: '#0000ff',
        opacityItem: 0.1,
        opacityHoverItem: 0.6,
        opacitySelectItem: 1,
        colorBorderItem: '#000000',
        colorBorderHoverItem: '#ffff00',
        colorBorderSelectItem: '#ffffff',
        isBorderItem: true,
        isBorderHoverItem: true,
        isBorderSelectItem: false,
        widthBorderItem: 2,
        widthBorderHoverItem: 12,
        widthBorderSelectItem: 2,
      },
    },
    baloonTheme
  )
  const startMap3 = map3.start()
  console.log(startMap3)
  // map1.insertSVG('./public/floor-1_1.svg');
  console.log('New Client map1 = ', map1)
}

function gotoURLClick(dataelement: any) {
  console.log('gotoURLClick element = ', dataelement)
  //const geturl = dataelement.getAttribute('data-url')

  window.open(dataelement.slug, '_self')
}
