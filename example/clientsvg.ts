import { ClientSVGEditor } from '../src/clientSVG'
import '../src/style.css'
import { DataInteractive } from '../src/models/simple.models'
import {
  dataShops2,
  dataShops,
  dataShops3,
  dataShops4Floor0,
  dataShops4Floor1,
  dataShops4Floor2,
  dataShops4Floor3,
  dataShops4Floor4,
  dataShops4Floor5,
  ExampleSVG,
} from './dataItems'

export function testmylib() {
  console.log('testmylib')
  const nodeMap = document.getElementById('map')
  //const nodeMap = document.getElementById('map44')
  const nodeMap2 = document.getElementById('map2')
  const nodeMap3 = document.getElementById('map3')
  const nodeMap4 = document.getElementById('map4')
  const nodeMap5 = document.getElementById('map5')
  //const nodeMap5 = undefined

  const baloonTheme = {
    colorBG: '#eeeeee',
    colorTitle: '#000000',
    colorDescription: '#000000',
    isPositionFixed: false,
    top: 0,
    left: 0,
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
      isMobileZoom: true,
    },
    baloonTheme
  )
  const startMap2 = map2.start()
  console.log(startMap2)
  const baloonTheme3 = {
    colorBG: '#eeeeee',
    colorTitle: '#000000',
    colorDescription: '#000000',
    isPositionFixed: false,
    top: 200,
    left: 90,
  }

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
      isCustomBalloon: true,
      nodeCustomBalloon: document.getElementById('cartoonballoon'),
      dataStructureCustomBalloon: {
        title: '.ctballoon__title',
        description: '.ctballoon__description',
      },
    },
    baloonTheme3
  )
  const startMap3 = map3.start()

  console.log(startMap3)
  // map1.insertSVG('./public/floor-1_1.svg');
  console.log('New Client map1 = ', map1)

  const map4 = new ClientSVGEditor(
    nodeMap4, // node - dom element to insert svg
    dataShops4Floor0, // dataItems - data to render
    {
      title: 'Этаж 0', // Head Title this map
      urlmap: './public/multy/grand-floor-0.svg', // Path to map svg
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
        widthBorderHoverItem: 2,
        widthBorderSelectItem: 2,
      },
      isCustomBalloon: false,
    },
    baloonTheme
  )

  const startMap4 = map4.start()

  const btnArray = document.querySelectorAll('.btn__map')
  btnArray.forEach((btn) => {
    console.log('btnArray = ', btn.id)
    btn.addEventListener('click', (e) => {
      const elementBtn = e.target as HTMLElement
      const pauseAnimMap = 800
      animateFade()
      console.log('e.target = ', elementBtn.id)
      switch (elementBtn.id) {
        case 'floor-0':
          console.log('FLOOR 0')
          console.log('map4 = ', map4)
          clearActive()
          elementBtn.classList.add('active')
          map4.options.urlmap = './public/multy/grand-floor-0.svg'
          map4.options.title = 'Этаж 0'
          map4.dataItems = dataShops4Floor0
          setTimeout(() => {
            map4.start()
          }, pauseAnimMap)

          break
        case 'floor-1':
          console.log('FLOOR 1')
          console.log('map4 = ', map4)
          clearActive()
          elementBtn.classList.add('active')
          map4.options.urlmap = './public/multy/grand-floor-1.svg'
          map4.options.title = 'Этаж 1'
          map4.dataItems = dataShops4Floor1
          setTimeout(() => {
            map4.start()
          }, pauseAnimMap)
          break
        case 'floor-2':
          console.log('FLOOR 2')
          clearActive()
          elementBtn.classList.add('active')
          map4.options.urlmap = './public/multy/grand-floor-2.svg'
          map4.options.title = 'Этаж 2'
          map4.dataItems = dataShops4Floor2
          setTimeout(() => {
            map4.start()
          }, pauseAnimMap)
          break
        case 'floor-3':
          console.log('FLOOR 3')
          clearActive()
          elementBtn.classList.add('active')
          map4.options.urlmap = './public/multy/grand-floor-3.svg'
          map4.options.title = 'Этаж 3'
          map4.dataItems = dataShops4Floor3
          setTimeout(() => {
            map4.start()
          }, pauseAnimMap)
          break
        case 'floor-4':
          console.log('FLOOR 4')
          clearActive()
          elementBtn.classList.add('active')
          map4.options.urlmap = './public/multy/grand-floor-4.svg'
          map4.options.title = 'Этаж 4'
          map4.dataItems = dataShops4Floor4
          setTimeout(() => {
            map4.start()
          }, pauseAnimMap)
          break
        case 'floor-5':
          console.log('FLOOR 5')
          clearActive()
          elementBtn.classList.add('active')
          map4.options.urlmap = './public/multy/grand-floor-5.svg'
          map4.options.title = 'Этаж 5'
          map4.dataItems = dataShops4Floor5
          setTimeout(() => {
            map4.start()
          }, pauseAnimMap)
          break

        default:
          break
      }
    })
  })

  function animateFade() {
    const classes = document.querySelector('#map4')?.classList

    classes?.toggle('fade-out')
    setTimeout(() => {
      classes?.toggle('fade-in')
      classes?.toggle('fade-out')
      setTimeout(() => {
        classes?.toggle('fade-in')
      }, 1000)
    }, 1000)
  }
  function clearActive() {
    btnArray.forEach((btn) => {
      btn.classList.remove('active')
    })
  }

  const map5 = new ClientSVGEditor(
    nodeMap5, // node - dom element to insert svg
    dataShops3, // dataItems - data to render
    {
      title: 'Load SVG from String', // Head Title this map
      stringSVG: ExampleSVG, // String SVG
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
        widthBorderHoverItem: 2,
        widthBorderSelectItem: 2,
      },
      isSVGFromSring: true,
    },
    baloonTheme
  )

  const startMap5 = map5.start()
  console.log('startMap5 = ', startMap5)
  const loadSVG = (url) => {
    console.log('loadSVG', url)
    console.log('startMap4 =', startMap4)
  }
  return loadSVG
}

function gotoURLClick(dataelement: any) {
  console.log('gotoURLClick element = ', dataelement)
  //const geturl = dataelement.getAttribute('data-url')

  window.open(dataelement.slug, '_self')
}
