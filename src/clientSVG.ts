import type {
  DataInteractive,
  DataOptions,
  //MapTheme,
  BaloonOptions,
  CastomBalloonOptions,
  BaloonTheme,
} from './models/simple.models'
//import { SvgMap } from './_privatemodule/svg'
//import PinchZoom from './pinch-zoom.min.js'
import Base from './base'
import { doc } from 'prettier'
import { visitFunctionBody } from 'typescript'

export class ClientSVGEditor extends Base {
  node: any
  dataItems: DataInteractive[] = []
  options: DataOptions = {
    title: '',
    urlmap: '',
    stringSVG: '',
    interactiveLayer: '#interactive',
    isRemoveUnuseItem: false,
    isHoverEnable: true,
    funcClick: this.localClick,
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
    isCustomBalloon: false,
    nodeCustomBalloon: null,
    dataStructureCustomBalloon: null,
    isMobileZoom: false,
    isSVGFromSring: false,
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
  customNodeBallon!: HTMLElement | null
  isMobile: boolean | undefined

  static evCache: any[] | undefined
  static prevDiff: number = -1
  currentZoom: number = 1

  constructor(
    node: any,
    dataItems: DataInteractive[],
    options: DataOptions,
    // isMobile: boolean,
    baloonTheme: BaloonTheme
  ) {
    console.log('Input NODE = ', node)
    super()
    this.nodeBallon = null
    this.customNodeBallon = null
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
      if (options.stringSVG !== undefined) {
        this.options.stringSVG = options.stringSVG
      }
      if (options.interactiveLayer !== undefined) {
        this.options.interactiveLayer = options.interactiveLayer
      }
      if (options.isRemoveUnuseItem !== undefined) {
        this.options.isRemoveUnuseItem = options.isRemoveUnuseItem
      }
      if (options.isHoverEnable !== undefined) {
        this.options.isHoverEnable = options.isHoverEnable
      }
      if (options.funcClick !== undefined) {
        this.options.funcClick = options.funcClick
      }
      if (options.funcParams !== undefined) {
        this.options.funcParams = options.funcParams
      }
      if (options.isCustomBalloon !== undefined) {
        this.options.isCustomBalloon = options.isCustomBalloon
      }
      if (options.nodeCustomBalloon !== undefined) {
        this.options.nodeCustomBalloon = options.nodeCustomBalloon
      }
      if (options.dataStructureCustomBalloon !== undefined) {
        this.options.dataStructureCustomBalloon =
          options.dataStructureCustomBalloon
      }
      if (options.isMobileZoom !== undefined) {
        this.options.isMobileZoom = options.isMobileZoom
      }
      if (options.isSVGFromSring !== undefined) {
        this.options.isSVGFromSring = options.isSVGFromSring
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
  static test() {
    return true
  }

  start() {
    if (this.node === null || this.node === undefined) return
    this.isMobile = isMobile()
    ClientSVGEditor.evCache = []
    console.log('START  = ', this.options.title)
    //  console.log('isMobile = ', this.isMobile)

    if (this.options.urlmap !== '') {
      this.insertSVG(this.options.urlmap!)
    } else if (this.options.isSVGFromSring) {
      this.insertSVGFromString(this.options.stringSVG!)
    }
    console.log('isCastomBalloon', this.options.isCustomBalloon)
    if (this.options.isCustomBalloon) {
      console.log('isCastomBalloon', this.options.isCustomBalloon)
      const customBalloon = this.options.nodeCustomBalloon!

      customBalloon!.style.display = 'none'
      customBalloon!.style.zIndex = '999999'
      customBalloon!.style.position = 'fixed'
    }

    this.node.style.backgroundColor = this.options.mapTheme!.colorBG
    this.node.style.overflow = 'auto'
    document.body.addEventListener('click', (e) => {
      this.nodeBallon!.hide()
    })

    return true
  }

  async insertSVG(itemSVG: string) {
    this.node.innerHTML = ''

    const getSVGData = await loadSVGFile(itemSVG)

    this.node.innerHTML = getSVGData
    if (this.options.isRemoveUnuseItem) {
      ClientSVGEditor.syncDataItemsVsInteractiveLayer(this)
    }
    console.log('HOVER ENABLE = ', this.options.isHoverEnable)
    if (this.options.isHoverEnable) {
      this.initInteractiveLayer()
    }
    this.clearInteractiveLayer()
    const svg = this.node.querySelector('svg')!
    console.log('this.node', svg)
    svg.style = ''
    svg.style.width = '100%'
    svg.style.height = '100%'
    //console.log('this.options.isMobileZoom', this.options.isMobileZoom)
    if (this.isMobile) {
      if (this.options.isMobileZoom) {
        this.initZoom()
      }
      this.initMobileBalloon()
    }
    //create object optionsBaloon type BaloonOptions
    const optionsBaloon: BaloonOptions = {
      baloonTheme: this.baloonTheme,
    }
    //const getBaloon=  createBaloon(optionsBaloon);

    if (this.options.isCustomBalloon) {
      //this.customNodeBallon = this.customNodeBallon
      if (!this.isMobile) {
        this.nodeBallon = createCustomBaloon(
          optionsBaloon,
          this.options.nodeCustomBalloon!
        )
      }
    } else {
      if (!this.isMobile) {
        this.nodeBallon = createBaloon(optionsBaloon)
      }
    }

    if (this.options.title !== '') {
      const titleDom = document.createElement('div')
      //titleDom.style.position = 'fixed'

     
      titleDom.setAttribute('class','svgmap-title')
      titleDom.style.display = 'block'

      titleDom.innerHTML = `<h1>${this.options.title}</h1>`
      this.node.insertBefore(titleDom, this.node.firstChild)
      //this.node.appendChild(titleDom)
    }
    return true
  }
  insertSVGFromString(stringSVG: string) {
    this.node.innerHTML = ''

    this.node.innerHTML = stringSVG
    if (this.options.isRemoveUnuseItem) {
      ClientSVGEditor.syncDataItemsVsInteractiveLayer(this)
    }
    if (this.options.isHoverEnable) {
      this.initInteractiveLayer()
    }
    this.clearInteractiveLayer()
    console.log('this.options.isMobileZoom', this.options.isMobileZoom)
    if (this.isMobile) {
      if (this.options.isMobileZoom) {
        this.initZoom()
      }
      this.initMobileBalloon()
    }
    //create object optionsBaloon type BaloonOptions
    const optionsBaloon: BaloonOptions = {
      baloonTheme: this.baloonTheme,
    }
    //const getBaloon=  createBaloon(optionsBaloon);

    if (this.options.isCustomBalloon) {
      //this.customNodeBallon = this.customNodeBallon
      if (!this.isMobile) {
        this.nodeBallon = createCustomBaloon(
          optionsBaloon,
          this.options.nodeCustomBalloon!
        )
      }
    } else {
      if (!this.isMobile) {
        this.nodeBallon = createBaloon(optionsBaloon)
      }
    }

    if (this.options.title !== '') {
      const titleDom = document.createElement('div')
      //titleDom.style.position = 'fixed'

      titleDom.setAttribute('class','svgmap-title')
      titleDom.style.display = 'block'

      titleDom.innerHTML = `<h1>${this.options.title}</h1>`
      this.node.insertBefore(titleDom, this.node.firstChild)
      //this.node.appendChild(titleDom)
    }
    return true
  }

  static syncDataItemsVsInteractiveLayer(client: any) {
    const getInteractiveItems = [
      ...client.node.querySelector(`${client.options.interactiveLayer}`)
        .children,
    ]

    getInteractiveItems.forEach((item) => {
      //console.log('syncDataItemsVsInteractiveLayer item = ' , item.idmap);
      const isItemUse = client.dataItems.find(
        (itemObjects: { idmap: string }) => itemObjects.idmap === item.id
      )
      //const isItemUse = getInteractiveItems.find((itemObjects) =>itemObjects.id === item.idmap)

      // console.log('syncDataItemsVsInteractiveLayer isItemUse = ', isItemUse)
      if (isItemUse === undefined) {
        client.deleteItem(item.id!)
      }
    })
  }

  deleteItem(id: string) {
    const item = this.node
      .querySelector(`${this.options.interactiveLayer}`)
      .querySelector(`#${id}`)
    item?.remove()
  }
  getPositionScroll(element: HTMLElement = this.node) {
    const scrollX = element.getBoundingClientRect().left
    const scrollY = element.getBoundingClientRect().top

/*     console.log('element', this.node)
    console.log('scrollX', scrollX)
    console.log('scrollY', scrollY) */
    return { scrollX, scrollY }
  }

  selectItem(id: string) {
    const item = this.node
      .querySelector(`${this.options.interactiveLayer}`)
      .querySelector(`#${id}`)
    console.log('item', item)
    console.log('item X', item.getBoundingClientRect())
    item.style.fill = this.options.mapTheme!.colorSelectItem
    item.style.stroke = this.options.mapTheme!.colorBorderSelectItem
    item.style.strokeWidth = this.options.mapTheme!.widthBorderSelectItem
    item.style.opacity = this.options.mapTheme!.opacitySelectItem
    const getDataItem = this.dataItems.find((item) => item.idmap === id)
    if (!this.isMobile) {
      if (this.options.isCustomBalloon) {
        if (getDataItem !== undefined) {
          if (getDataItem?.description !== undefined) {
            this.nodeBallon!.customRender(
              {
                title: getDataItem?.title,
                description: getDataItem?.description,
              },
              this.options.dataStructureCustomBalloon
            )
          } else {
            this.nodeBallon!.customRender(
              {
                title: getDataItem?.title,
                description: '',
              },
              this.options.dataStructureCustomBalloon
            )
          }
        }
      } else {
        if (getDataItem !== undefined) {
          if (getDataItem?.description !== undefined) {
            this.nodeBallon!.render({
              title: getDataItem?.title,
              description: getDataItem?.description,
            })
          } else {
            this.nodeBallon!.render({
              title: getDataItem?.title,
              description: '',
            })
          }
        } else {
          this.nodeBallon!.render({
            title: 'Info not found',
            description: 'Info not found',
          })
        }
      }
    }
    handleMousemove(
      item.getBoundingClientRect(),
      this.nodeBallon,
      this.options.isCustomBalloon!
    )

    document.addEventListener('scroll', (e: any) => {
      console.log('scroll', e)
      this.getPositionScroll(item)
      handleMousemove(
        item.getBoundingClientRect(),
        this.nodeBallon,
        this.options.isCustomBalloon!
      )
      //this.nodeBallon!.hide()
    })
  }

  showBalloonS(id: string) {
    const item = this.node
      .querySelector(`${this.options.interactiveLayer}`)
      .querySelector(`#${id}`)
    /*     const itemData = this.dataItems.find(
      (itemObjects: { idmap: string }) => itemObjects.idmap === id
    )
    if (itemData !== undefined) {
      if (this.isMobile) {
        this.nodeBallon?.showBalloon(itemData)
      } else {
        this.nodeBallon?.showBalloon(itemData, item)
      }
    } */
  }

  initInteractiveLayer() {
    const interactiveLayer = this.node.querySelector(
      this.options.interactiveLayer
    )
    /*     console.log('initInteractiveLayer = ', interactiveLayer)
    console.log('initInteractiveLayer = ', [...interactiveLayer.children]) */
    if (!this.isMobile) {
      interactiveLayer.addEventListener('mousemove', (e: any) => {
        console.log('mousemove', e.x, e.y)
        handleMousemove(e, this.nodeBallon, this.options.isCustomBalloon!)

        //  throttle(handleMousemove(e,this.nodeBallon), 11200)
      })
    }

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
          if (!this.isMobile) {
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
              console.log('click', event.target.id)
              if (event.target.tagName !== 'g') {
                this.selectItem(event.target.id)
                /*                 event.target.style.fill = this.options.mapTheme!.colorSelectItem
                event.target.style.stroke =
                  this.options.mapTheme!.colorBorderSelectItem
                event.target.style.strokeWidth =
                  this.options.mapTheme!.widthBorderSelectItem
                event.target.style.opacity =
                  this.options.mapTheme!.opacitySelectItem */
              }
              this.onClick(
                this.options.funcClick,
                this.dataItems.find((item) => item.idmap === event.target.id)
              )
            })
          } else {
            item.addEventListener('click', (event: any) => {
              //  console.log('click', event.target.id)
              /*               if (event.target.tagName !== 'g') {
                event.target.style.fill = this.options.mapTheme!.colorSelectItem
                event.target.style.stroke =
                  this.options.mapTheme!.colorBorderSelectItem
                event.target.style.strokeWidth =
                  this.options.mapTheme!.widthBorderSelectItem
                event.target.style.opacity =
                  this.options.mapTheme!.opacitySelectItem
              } */
              if (event.target.tagName !== 'g') {
                this.clearInteractiveLayer()
              }
              this.onClickMobile(
                this.options.funcClick,
                this.dataItems.find((item) => item.idmap === event.target.id)
              )
            })
          }
        } else {
          if (!this.isMobile) {
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
          }
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
    console.log(`params =`, params)
    console.log(`func =`, func)
    func(params)
  }

  localClick(params: any) {
    console.log(`params =`, params)
    if (params.slug !== '' || params.slug !== undefined) {
      window.open(params.slug, '_self')
    }
  }

  // get function for mobile pointerevent  for zoom effect

  initZoom() {
    const el = this.node
    /*     const optionsZoom = {
      minZoom: 1,
      maxZoom: 3,
      zoomSpeed: 0.1,
      zoomStep: 0.1,
    }
    let pz = new PinchZoom(el, optionsZoom)
    pz.enable() */

    el!.onpointerdown = this.pointerdownHandler.bind(this)
    el!.onpointermove = this.pointermoveHandler.bind(this)
    console.log(this.isMobile)
    //     el!.onpointerup = pointerupHandler;
    el!.onpointercancel = this.pointerupHandler.bind(this)
    el!.onpointerout = this.pointerupHandler.bind(this)
    el!.onpointerleave = this.pointerupHandler.bind(this)
  }

  pointerdownHandler(ev: any) {
    // The pointerdown event signals the start of a touch interaction.
    // This event is cached to support 2-finger gestures
    console.log('pointerDown', ev)
    console.log('mob  == ', ClientSVGEditor.evCache)

    ClientSVGEditor.evCache!.push(ev)
  }

  pointermoveHandler(ev: any) {
    // This function implements a 2-pointer horizontal pinch/zoom gesture.
    //
    // If the distance between the two pointers has increased (zoom in),
    // the target element's background is changed to "pink" and if the
    // distance is decreasing (zoom out), the color is changed to "lightblue".
    //
    // This function sets the target element's border to "dashed" to visually
    // indicate the pointer's target received a move event.
    console.log('pointerMove', ev)
    //ev.target.style.border = 'dashed'
    //const diffArrMove = [];

    // Find this event in the cache and update its record with this event
    const index = ClientSVGEditor.evCache!.findIndex(
      (cachedEv: any) => cachedEv.pointerId === ev.pointerId
    )
    ClientSVGEditor.evCache![index] = ev

    // If two pointers are down, check for pinch gestures
    if (ClientSVGEditor.evCache!.length === 2) {
      // Calculate the distance between the two pointers
      const curDiff = Math.abs(
        ClientSVGEditor.evCache![0].clientX -
          ClientSVGEditor.evCache![1].clientX
      )

      if (ClientSVGEditor.prevDiff > 0) {
        if (curDiff > ClientSVGEditor.prevDiff) {
          // The distance between the two pointers has increased
          // Увеличение
          this.currentZoom = this.currentZoom + Math.floor(curDiff / 10) / 200
          console.log('Pinch moving OUT -> Zoom in', this.currentZoom)
        }
        if (this.currentZoom > 5) {
          this.currentZoom = 5
        }
        console.log('this.currentZoom = ', this.currentZoom)
        //ev.target.style.background = 'pink'
      }
      if (curDiff < ClientSVGEditor.prevDiff) {
        // The distance between the two pointers has decreased
        //Уменьшение
        console.log('Pinch moving IN -> Zoom out', this.currentZoom)
        //ev.target.style.background = 'lightblue'
        this.currentZoom = this.currentZoom - Math.floor(curDiff / 10) / 200
        if (this.currentZoom < 0.5) {
          this.currentZoom = 0.5
        }
      }
      // Cache the distance for the next move event
      ClientSVGEditor.prevDiff = curDiff
      this.node!.firstChild.style.transform = `scale(${this.currentZoom})` //  scale(1.5)
      this.node!.firstChild.style.transformOrigin = 'center'
    } else {
      console.log('Pan moving')
      const curDiffX = Math.abs(ev.clientX)
      const curDiffY = Math.abs(ev.clientY)
      console.log('curDiffX = ', curDiffX, '   ||  curDiffY = ', curDiffY)
    }
  }

  pointerupHandler(ev: any) {
    console.log(ev.type, ev)
    // Remove this pointer from the cache and reset the target's
    // background and border
    //this.removeEvent(ev)

    const index = ClientSVGEditor.evCache!.findIndex(
      (cachedEv: any) => cachedEv.pointerId === ev.pointerId
    )
    ClientSVGEditor.evCache!.splice(index, 1)

    //ev.target.style.background = "white";
    //ev.target.style.border = "1px solid black";

    // If the number of pointers down is less than two then reset diff tracker
    if (ClientSVGEditor.evCache!.length < 2) {
      //this.prevDiff = -1
      //  this.currentZoom = Math.floor(this.prevDiff / 10) / 10
      console.log('this.currentZoom = ', this.currentZoom)
    }
  }
  removeEvent(ev: any) {
    // Remove this event from the target's cache
    const index = ClientSVGEditor.evCache!.findIndex(
      (cachedEv: any) => cachedEv.pointerId === ev.pointerId
    )
    ClientSVGEditor.evCache!.splice(index, 1)
  }

  initMobileBalloon = () => {
    const interactiveLayer = this.node.querySelector(
      this.options.interactiveLayer
    )
    interactiveLayer.addEventListener('click', (e: any) => {
      console.log('click', e.target.id)
      e.stopPropagation()
      /* if (e.target.tagName !== 'g') {
      this.onClickMobile(
        this.options.funcClick,
        this.dataItems.find((item) => item.idmap === e.target.id)
      )
    } */
    })

    if (document.querySelector('#BaloonMobile') === null) {
      const baloonMobile = document.createElement('div')
      baloonMobile.style.position = 'fixed'
      baloonMobile.style.bottom = '0px'
      baloonMobile.style.left = '0px'
      baloonMobile.style.height = '100px'
      baloonMobile.style.width = '100%'

      baloonMobile.id = 'BaloonMobile'
      baloonMobile.style.display = 'none'
      baloonMobile.style.zIndex = '999999'
      document.body.appendChild(baloonMobile)
      baloonMobile.innerHTML = `
    <div  style="background-color: ${this.baloonTheme.colorBG}; border-radius: 10px 10px 0 0; box-shadow: 0 0 10px rgba(0,0,0,0.5); width: 100%; height: 100%;">
    <div id="balloonItemMobile">
    </div>
    </div>`

      // add event listener click over #interactiveLayer
      document.body.addEventListener('click', (e) => {
        if (e.target !== baloonMobile) {
          // console.log('click', e.target)
          baloonMobile!.style.display = 'none'
        }
      })
    }
  }

  onClickMobile(func: any, params: any) {
    console.log(`onClickMobile params =`, params)
    const balloonMobileRoot = document.getElementById('BaloonMobile')
    balloonMobileRoot!.style.display = 'block'
    const balloonItem = document.getElementById('balloonItemMobile')
    console.log(`onClickMobile params =`, balloonItem)
    balloonItem!.innerHTML = `
    <div style="display:flex;flex-direction: column;">
    <div style="padding:4px;    text-align: center; font-size:1.2em;font-weight:600;">
    ${params.title}
    </div>
    <div style="padding:4px;display:flex;justify-content: space-between;align-items: center;">
<div>
    ${params.description}
    </div>
    <a href="${params.slug}" target="_self" style="padding:4px;">
      <button  style="height: 40px;" >Посмотреть</button>
    </a>
    </div>

    </div>
    `

    //func(params)
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
    if (!this.isMobile) {
      if (this.options.isCustomBalloon) {
        if (getDataItem !== undefined) {
          if (getDataItem?.description !== undefined) {
            this.nodeBallon!.customRender(
              {
                title: getDataItem?.title,
                description: getDataItem?.description,
              },
              this.options.dataStructureCustomBalloon
            )
          } else {
            this.nodeBallon!.customRender(
              {
                title: getDataItem?.title,
                description: '',
              },
              this.options.dataStructureCustomBalloon
            )
          }
        }
      } else {
        if (getDataItem !== undefined) {
          if (getDataItem?.description !== undefined) {
            this.nodeBallon!.render({
              title: getDataItem?.title,
              description: getDataItem?.description,
            })
          } else {
            this.nodeBallon!.render({
              title: getDataItem?.title,
              description: '',
            })
          }
        } else {
          this.nodeBallon!.render({
            title: 'Info not found',
            description: 'Info not found',
          })
        }
      }
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
  static add(client: any, element: any, i: number) {
    //element = makeInstance(element)

    if (i == null) {
      client.node.appendChild(element.node)
    } else if (element.node !== client.node.childNodes[i]) {
      client.node.insertBefore(element.node, client.node.childNodes[i])
    }

    return client
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
  themeBaloonOptions: BaloonTheme | null
  baloonDom: HTMLElement | null
  constructor(options: BaloonOptions | null, domBalloon: HTMLElement | null) {
    super()
    if (options !== null) {
      this.themeBaloonOptions = options!.baloonTheme
    } else {
      this.themeBaloonOptions = null
    }
    if (domBalloon !== null) {
      this.baloonDom = domBalloon
    } else {
      this.baloonDom = document.querySelector('#BaloonItem')
    }
  }

  delete() {
    this.baloonDom?.remove()
  }

  hide() {
    this.baloonDom!.style.display = 'none'
  }
  show() {
    this.baloonDom!.style.display = 'block'
  }

  render(dataRender: any) {
    //  console.log('dataRender = ', dataRender)
    this.baloonDom!.innerHTML = `
    <div style="display:block; position:relative">
      <div class="baloon" style="background-color: ${
        this.themeBaloonOptions?.colorBG
      };position: absolute;bottom: 0;left: 0;">

        <div class="baloon-title" style="color:${
          this.themeBaloonOptions?.colorTitle
        }">${dataRender.title}</div>
        <div class="baloon-content" style="color:${
          this.themeBaloonOptions?.colorDescription
        }; display: ${dataRender.description !== '' ? 'block' : 'none'}">${
      dataRender.description
    }</div>
    <div class="box45" style="background-color: ${
      this.themeBaloonOptions?.colorBG
    }"></div>
      </div>
      </div>
    `
    this.baloonDom!.style.display = 'block'
    return true
  }
  customRender(dataRender: any, structureCustomRender: any) {
    /*     console.log('custom Render dataRender = ', dataRender)
    console.log('custom Render options = ', this.themeBaloonOptions)
    console.log('custom Render structureCustomRender = ', structureCustomRender) */
    const titleDom = this.baloonDom!.querySelector(structureCustomRender.title)
    const descriptionDom = this.baloonDom!.querySelector(
      structureCustomRender.description
    )
    titleDom.innerHTML = dataRender.title
    descriptionDom.innerHTML = dataRender.description
    return true
  }
}

const createBaloon = (options: BaloonOptions) => {
  //  console.log('createBaloon options = ', options)

  let baloon = new Baloon(options, null)

  //  console.log('createBaloon document IF baloon.baloonDom = ', baloon.baloonDom)
  if (baloon.baloonDom !== null) {
    // baloon.delete();
    //baloon.render({title: 'TITLE', description: 'DESCRIPTION'});
  } else {
    if (baloon.themeBaloonOptions?.isPositionFixed) {
      const baloonDom = document.createElement('div')
      baloonDom.style.position = 'fixed'
      baloonDom.style.top = baloon.themeBaloonOptions?.isPositionFixed
        ? baloon.themeBaloonOptions.top + 'px'
        : '0px'
      baloonDom.style.left = baloon.themeBaloonOptions?.isPositionFixed
        ? baloon.themeBaloonOptions.left + 'px'
        : '0px'

      baloonDom.id = 'BaloonItem'
      baloonDom.style.display = 'block'
      baloonDom.style.zIndex = '999999'
      document.body.appendChild(baloonDom)
    } else {
      const baloonDom = document.createElement('div')
      baloonDom.style.position = 'fixed'
      baloonDom.style.top = '0px'
      baloonDom.style.left = '0px'
      baloonDom.id = 'BaloonItem'
      baloonDom.style.display = 'block'
      baloonDom.style.zIndex = '999999'
      document.body.appendChild(baloonDom)
    }

    baloon.baloonDom = document.querySelector('#BaloonItem')
    //baloon.render({title: 'TITLE', description: 'DESCRIPTION'});
    baloon.hide()
  }
  //  console.log('createBaloon document = ', baloon.baloonDom)
  return baloon
}
const createCustomBaloon = (
  options: BaloonOptions | null,
  domBaloon: HTMLElement
) => {
  //  console.log('createBaloon options = ', options)

  let baloon = new Baloon(options, domBaloon)

  console.log('createBaloon document IF baloon.baloonDom = ', baloon.baloonDom)
  if (baloon.baloonDom !== null) {
    // baloon.delete();
    baloon.baloonDom.style.top = 0 + 'px'
    baloon.baloonDom.style.left = 0 + 'px'
  } else {
    baloon.baloonDom = domBaloon

    baloon.hide()
  }
  //  console.log('createBaloon document = ', baloon.baloonDom)
  return baloon
}

let handleMousemove = (
  position: { x: number; y: number },
  baloon: any,
  isCustomBalloon: boolean
) => {
  /*   console.log(`cursor ev =`, position);
  console.log(`cursor : X= ${position.x} px : Y= ${position.y} px\n`);*/
  // console.log(`cursor : baloon =`, baloon, ` \n`)
  baloon.show()
  const getWidthElement = isCustomBalloon
    ? baloon.baloonDom.offsetWidth
    : baloon.baloonDom.querySelector('.baloon').offsetWidth
  //  console.log(`cursor : baloon =`, getWidthElement, ` \n`)
  if (!baloon.themeBaloonOptions?.isPositionFixed) {
    baloon.baloonDom!.style.transform = `translate(${
      position.x - getWidthElement / 2 - baloon.themeBaloonOptions.left
    }px, ${position.y - 40 - baloon.themeBaloonOptions.top}px)`
  } else {
  }
}

// write function chek  mobile device

const isMobile = () => {
  let check = false
  ;((a) => {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true
  })(navigator.userAgent || navigator.vendor)
  return check
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
