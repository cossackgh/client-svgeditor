import type {
  DataInteractive,
  DataOptions,
  MapTheme,
  BaloonOptions,
  BaloonTheme,
} from './models/simple.models'
import { SvgMap } from './_privatemodule/svg'

import Base from './base'

export class ClientSVGEditor extends Base {
  node: any
  dataItems: DataInteractive[] = []
  options: DataOptions = {
    title: '',
    urlmap: '',
    interactiveLayer: '#interactive',
    isRemoveUnuseItem: false,
    funcClick: this.onClick,
    funcParams: {},
    mapTheme: {
      colorBG: '#ffffff',
      colorItem: '#ff0000',
      colorHoverItem: '#34f05a',
      colorSelectItem: '#0000ff',
      opacityItem: 0.4,
      opacityHoverItem: 1,
      opacitySelectItem: 1,
      colorBorderItem: '#000000',
      colorBorderHoverItem: '#ffffff',
      colorBorderSelectItem: '#ffffff',
      isBorderItem: true,
      isBorderHoverItem: true,
      isBorderSelectItem: true,
      widthBorderItem: 2,
      widthBorderHoverItem: 2,
      widthBorderSelectItem: 2,
    },
  }

  baloonTheme: BaloonTheme = {
    colorBG: '#ffffff',
    colorTitle: '#ff0000',
    colorDescription: '#34f05a',
    isPositionFixed: true,
    top: 10,
    left: 20,
  }

  nodeBallon: Baloon | null

  constructor(
    node: any,
    dataItems: DataInteractive[],
    options: DataOptions,

    baloonTheme: BaloonTheme
  ) {
    super()
    this.nodeBallon = null
    this.baloonTheme = baloonTheme
    this.node = node
    this.dataItems = dataItems

    if (baloonTheme !== undefined) {
      this.baloonTheme = baloonTheme
    }

    if (options !== undefined) {
      //this.options = options

      if (options.title !== undefined) {
        this.options.title = options.title
      }
      if (options.urlmap !== undefined) {
        this.options.urlmap = options.urlmap
      }
      if (options.interactiveLayer !== undefined) {
        this.options.interactiveLayer = options.interactiveLayer
      }
      if (options.isRemoveUnuseItem !== undefined) {
        this.options.isRemoveUnuseItem = options.isRemoveUnuseItem
      }
      if (options.funcClick !== undefined) {
        this.options.funcClick = options.funcClick
      }
      if (options.funcParams !== undefined) {
        this.options.funcParams = options.funcParams
      }
      if (options.mapTheme !== undefined) {
        if (options.mapTheme.colorBG !== undefined) {
          this.options.mapTheme!.colorBG = options.mapTheme.colorBG
        }
        if (options.mapTheme.colorItem !== undefined) {
          this.options.mapTheme!.colorItem = options.mapTheme.colorItem
        }
        if (options.mapTheme.colorHoverItem !== undefined) {
          this.options.mapTheme!.colorHoverItem =
            options.mapTheme.colorHoverItem
        }
        if (options.mapTheme.colorSelectItem !== undefined) {
          this.options.mapTheme!.colorSelectItem =
            options.mapTheme.colorSelectItem
        }
        if (options.mapTheme.opacityItem !== undefined) {
          this.options.mapTheme!.opacityItem = options.mapTheme.opacityItem
        }
        if (options.mapTheme.opacityHoverItem !== undefined) {
          this.options.mapTheme!.opacityHoverItem =
            options.mapTheme.opacityHoverItem
        }
        if (options.mapTheme.opacitySelectItem !== undefined) {
          this.options.mapTheme!.opacitySelectItem =
            options.mapTheme.opacitySelectItem
        }
        if (options.mapTheme.colorBorderItem !== undefined) {
          this.options.mapTheme!.colorBorderItem =
            options.mapTheme.colorBorderItem
        }
        if (options.mapTheme.colorBorderHoverItem !== undefined) {
          this.options.mapTheme!.colorBorderHoverItem =
            options.mapTheme.colorBorderHoverItem
        }
        if (options.mapTheme.colorBorderSelectItem !== undefined) {
          this.options.mapTheme!.colorBorderSelectItem =
            options.mapTheme.colorBorderSelectItem
        }
        if (options.mapTheme.isBorderItem !== undefined) {
          this.options.mapTheme!.isBorderItem = options.mapTheme.isBorderItem
        }
        if (options.mapTheme.isBorderHoverItem !== undefined) {
          this.options.mapTheme!.isBorderHoverItem =
            options.mapTheme.isBorderHoverItem
        }
        if (options.mapTheme.isBorderSelectItem !== undefined) {
          this.options.mapTheme!.isBorderSelectItem =
            options.mapTheme.isBorderSelectItem
        }
        if (options.mapTheme.widthBorderItem !== undefined) {
          this.options.mapTheme!.widthBorderItem =
            options.mapTheme.widthBorderItem
        }
        if (options.mapTheme.widthBorderHoverItem !== undefined) {
          this.options.mapTheme!.widthBorderHoverItem =
            options.mapTheme.widthBorderHoverItem
        }
        if (options.mapTheme.widthBorderSelectItem !== undefined) {
          this.options.mapTheme!.widthBorderSelectItem =
            options.mapTheme.widthBorderSelectItem
        }
      }
    }
  }
  test() {
    return true
  }

  start() {
    if (this.options.urlmap !== '') {
      this.insertSVG(this.options.urlmap!)
    }

    this.node.style.backgroundColor = this.options.mapTheme!.colorBG
    return true
  }
  async insertSVG(itemSVG: string) {
    this.node.innerHTML = ''

    const getSVGData = await loadSVGFile(itemSVG)

    this.node.innerHTML = getSVGData
    if (this.options.isRemoveUnuseItem) {
      this.syncDataItemsVsInteractiveLayer()
    }
    this.initInteractiveLayer()
    this.clearInteractiveLayer()

    //create object optionsBaloon type BaloonOptions
    const optionsBaloon: BaloonOptions = {
      baloonTheme: this.baloonTheme,
    }
    //const getBaloon=  createBaloon(optionsBaloon);
    this.nodeBallon = createBaloon(optionsBaloon)

    if (this.options.title !== '') {
      const titleDom = document.createElement('div')
      //titleDom.style.position = 'fixed'

      titleDom.id = 'mapTitle'
      titleDom.style.display = 'block'

      titleDom.innerHTML = `<h1>${this.options.title}</h1>`
      this.node.insertBefore(titleDom, this.node.firstChild)
      //this.node.appendChild(titleDom)
    }
    return true
  }

  syncDataItemsVsInteractiveLayer() {
    const getInteractiveItems = [
      ...this.node.querySelector(`${this.options.interactiveLayer}`).children,
    ]

    getInteractiveItems.forEach((item) => {
      //console.log('syncDataItemsVsInteractiveLayer item = ' , item.idmap);
      const isItemUse = this.dataItems.find(
        (itemObjects) => itemObjects.idmap === item.id
      )
      //const isItemUse = getInteractiveItems.find((itemObjects) =>itemObjects.id === item.idmap)

      // console.log('syncDataItemsVsInteractiveLayer isItemUse = ', isItemUse)
      if (isItemUse === undefined) {
        this.deleteItem(item.id!)
      }
    })
  }

  deleteItem(id: string) {
    const item = this.node
      .querySelector(`${this.options.interactiveLayer}`)
      .querySelector(`#${id}`)
    item?.remove()
  }

  initInteractiveLayer() {
    const interactiveLayer = this.node.querySelector(
      this.options.interactiveLayer
    )
    /*     console.log('initInteractiveLayer = ', interactiveLayer)
    console.log('initInteractiveLayer = ', [...interactiveLayer.children]) */
    interactiveLayer.addEventListener('mousemove', (e: any) => {
      //  console.log('mousemove', e.target);
      handleMousemove(e, this.nodeBallon)
      //  throttle(handleMousemove(e,this.nodeBallon), 11200)
    })
    ;[...interactiveLayer.children].forEach(
      (item: {
        id: string
        tagName: string
        addEventListener: (
          arg0: string,
          arg1: {
            (event: any): void
            (event: { target: { tagName: string } }): void
            (event: any): void
          }
        ) => void
      }) => {
        if (item.tagName !== 'g') {
          item.addEventListener('mouseover', (event) => {
            this.onHover(event.target)
          })

          item.addEventListener(
            'mouseout',
            (event: { target: { tagName: string } }) => {
              if (event.target.tagName !== 'g') {
                this.clearInteractiveLayer()
              }
              this.nodeBallon!.hide()
            }
          )

          item.addEventListener('click', (event: any) => {
            //  console.log('click', event.target.id)
            if (event.target.tagName !== 'g') {
              event.target.style.fill = this.options.mapTheme!.colorSelectItem
              event.target.style.stroke =
                this.options.mapTheme!.colorBorderSelectItem
              event.target.style.strokeWidth =
                this.options.mapTheme!.widthBorderSelectItem
              event.target.style.opacity =
                this.options.mapTheme!.opacitySelectItem
            }
            this.onClick(
              this.options.funcClick,
              this.dataItems.find((item) => item.idmap === event.target.id)
            )
          })
        } else {
          item.addEventListener('mouseover', (event) => {
            //  console.log(item)
            this.onHoverGroup(item)
          })

          item.addEventListener(
            'mouseout',
            (event: { target: { tagName: string } }) => {
              if (event.target.tagName !== 'g') {
                this.clearInteractiveLayer()
              }
              this.nodeBallon!.hide()
            }
          )
          item.addEventListener('click', (event: any) => {
            //  console.log('click ev', item)
            //  console.log('click id', item.id)

            this.onClick(
              this.options.funcClick,
              this.dataItems.find((itemd) => itemd.idmap === item.id)
            )
          })
        }
      }
    )
  }
  onClick(func: any, params: any) {
    //  console.log(`params =`, params)
    func(params)
  }
  onHover(ev: any) {
    /*   console.log('onhover event', ev);
  console.log('mouseover ID', ev.id);
  console.log('mouseover tagName', ev.tagName); */
    const getDataItem = this.dataItems.find((item) => item.idmap === ev.id)
    //  console.log('getDataItem', getDataItem)

    ev.style.fill = this.options.mapTheme!.colorHoverItem
    if (this.options.mapTheme!.isBorderHoverItem) {
      ev.style.stroke = this.options.mapTheme!.colorBorderHoverItem
      ev.style.strokeWidth = this.options.mapTheme!.widthBorderHoverItem
    }

    ev.style.opacity = this.options.mapTheme!.opacityHoverItem

    if (getDataItem !== undefined) {
      if (getDataItem?.description !== undefined) {
        this.nodeBallon!.render({
          title: getDataItem?.title,
          description: getDataItem?.description,
        })
      } else {
        this.nodeBallon!.render({ title: getDataItem?.title, description: '' })
      }
    } else {
      this.nodeBallon!.render({
        title: 'Info not found',
        description: 'Info not found',
      })
    }
  }
  onHoverGroup(ev: any) {
    /*   console.log('onhover event', ev);
  console.log('mouseover ID', ev.id);
  console.log('mouseover tagName', ev.tagName);
  console.log('mouseover this.dataItems', this.dataItems); */
    const getDataItem = this.dataItems.find((item) => item.idmap === ev.id)
    //  console.log('getDataItem', getDataItem)

    if (getDataItem !== undefined) {
      if (getDataItem?.description !== undefined) {
        this.nodeBallon!.render({
          title: getDataItem?.title,
          description: getDataItem?.description,
        })
      } else {
        this.nodeBallon!.render({ title: getDataItem?.title, description: '' })
      }
    } else {
      this.nodeBallon!.render({
        title: 'Info not found',
        description: 'Info not found',
      })
    }
  }

  clearInteractiveLayer() {
    const interactiveLayer = [
      ...this.node.querySelector(this.options.interactiveLayer).children,
    ]
    //  console.log('clearInteractiveLayer = ', interactiveLayer)
    interactiveLayer.forEach(
      (element: {
        tagName: string
        style: {
          opacity: number | undefined
          fill: string | undefined
          stroke: string | undefined
          strokeWidth: number | undefined
        }
      }) => {
        element.style.fill = this.options.mapTheme!.colorItem
        if (this.options.mapTheme!.isBorderItem) {
          element.style.stroke = this.options.mapTheme!.colorBorderItem
          element.style.strokeWidth = this.options.mapTheme!.widthBorderItem
        }
        if (element.tagName !== 'g') {
          element.style.opacity = this.options.mapTheme!.opacityItem
        }
      }
    )
  }

  // Add given element at a position
  add(element: any, i: number) {
    //element = makeInstance(element)

    if (i == null) {
      this.node.appendChild(element.node)
    } else if (element.node !== this.node.childNodes[i]) {
      this.node.insertBefore(element.node, this.node.childNodes[i])
    }

    return this
  }
}

// create function load text file from url

const loadSVGFile = async (url: string) => {
  //  console.log('loadTextFromFile url = ', url)
  const data = fetch(url)
    .then((response) => response.text())
    .then((text) => {
      //  console.log('text = ', text)
      return text
    })
    .catch((error) => {
      //  console.log('error = ', error)
      return error
    })
  return data
}

export class Baloon extends Base {
  themeBaloonOptions: BaloonTheme
  baloonDom: HTMLElement | null
  constructor(options: BaloonOptions) {
    super()

    this.themeBaloonOptions = options.baloonTheme
    this.baloonDom = document.querySelector('#BaloonItem')
  }

  delete() {
    this.baloonDom?.remove()
  }

  hide() {
    this.baloonDom!.style.display = 'none'
  }

  render(dataRender: any) {
    //  console.log('dataRender = ', dataRender)
    this.baloonDom!.innerHTML = `
    <div style="display:block; position:relative">
      <div class="baloon" style="background-color: ${
        this.themeBaloonOptions.colorBG
      };position: absolute;bottom: 0;left: 0;">
      
        <div class="baloon-title" style="color:${
          this.themeBaloonOptions.colorTitle
        }">${dataRender.title}</div>
        <div class="baloon-content" style="color:${
          this.themeBaloonOptions.colorDescription
        }; display: ${dataRender.description !== '' ? 'block' : 'none'}">${
      dataRender.description
    }</div>
    <div class="box45" style="background-color: ${
      this.themeBaloonOptions.colorBG
    }"></div>
      </div>
      </div>
    `
    this.baloonDom!.style.display = 'block'
    return true
  }
}

const createBaloon = (options: BaloonOptions) => {
  //  console.log('createBaloon options = ', options)

  let baloon = new Baloon(options)
  //  console.log('createBaloon document IF baloon.baloonDom = ', baloon.baloonDom)
  if (baloon.baloonDom !== null) {
    // baloon.delete();
    //baloon.render({title: 'TITLE', description: 'DESCRIPTION'});
  } else {
    if (baloon.themeBaloonOptions.isPositionFixed) {
      const baloonDom = document.createElement('div')
      baloonDom.style.position = 'fixed'
      baloonDom.style.top = baloon.themeBaloonOptions.isPositionFixed
        ? baloon.themeBaloonOptions.top + 'px'
        : '0px'
      baloonDom.style.left = baloon.themeBaloonOptions.isPositionFixed
        ? baloon.themeBaloonOptions.left + 'px'
        : '0px'

      baloonDom.id = 'BaloonItem'
      baloonDom.style.display = 'block'
      document.body.appendChild(baloonDom)
    } else {
      const baloonDom = document.createElement('div')
      baloonDom.style.position = 'fixed'
      baloonDom.style.top = '0px'
      baloonDom.style.left = '0px'
      baloonDom.id = 'BaloonItem'
      baloonDom.style.display = 'block'
      document.body.appendChild(baloonDom)
    }

    baloon.baloonDom = document.querySelector('#BaloonItem')
    //baloon.render({title: 'TITLE', description: 'DESCRIPTION'});
    baloon.hide()
  }
  //  console.log('createBaloon document = ', baloon.baloonDom)
  return baloon
}

let handleMousemove = (event: { x: any; y: any }, baloon: any) => {
  /*   console.log(`cursor ev =`, event);
  console.log(`cursor : X= ${event.x} px : Y= ${event.y} px\n`);*/

  const getWidthElement = baloon.baloonDom.querySelector('.baloon').offsetWidth
  //  console.log(`cursor : baloon =`, getWidthElement, ` \n`)
  if (!baloon.themeBaloonOptions.isPositionFixed) {
    baloon.baloonDom!.style.transform = `translate(${
      event.x - getWidthElement / 2
    }px, ${event.y - 40}px)`
  }
}

const throttle = (func: any, wait: number) => {
  //  console.log(`func =`, func)
  //  console.log(`wait =`, wait)
  let timeout: any
  return function executedFunction(this: any, ...args: any) {
    const context = this
    const later = () => {
      timeout = null
      func.apply(context, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
