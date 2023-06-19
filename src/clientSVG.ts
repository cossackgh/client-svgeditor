import type {
  DataInteractive,
  DataOptions,
  //MapTheme,
  BalloonOptions,
  CastomBalloonOptions,
  BalloonTheme,
} from './models/simple.models'
//import { SvgMap } from './_privatemodule/svg'
//import PinchZoom from './pinch-zoom.min.js'
import Base from './base'
//import { doc } from 'prettier'
import { visitFunctionBody } from 'typescript'

export class ClientSVGEditor extends Base {
  node: any
  dataItems: DataInteractive[] = []
  options: DataOptions | any = {
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

  balloonTheme: BalloonTheme = {
    colorBG: '#ffffff',
    colorTitle: '#ff0000',
    colorDescription: '#34f05a',
    isPositionFixed: true,
    top: 10,
    left: 20,
  }

  nodeBallon: Balloon | any
  customNodeBallon!: HTMLElement | any
  isMobile: boolean | undefined

  static evCache: any[]
  static prevDiff = -1
  static scrollEvent: any
  static selectItem: any
  currentZoom = 1

  constructor(
    node: unknown,
    dataItems: DataInteractive[],
    options: DataOptions,
    // isMobile: boolean,
    balloonTheme: BalloonTheme
  ) {
    console.log('Input NODE = ', node)
    super()
    this.nodeBallon = null
    this.customNodeBallon = null
    this.balloonTheme = balloonTheme
    this.node = node
    this.dataItems = dataItems

    if (balloonTheme !== undefined) {
      this.balloonTheme = balloonTheme
    }
    if (options !== undefined) {
      //this.options = options
      this.options.title = options?.title ?? this.options.title
      this.options.urlmap = options?.urlmap ?? this.options.urlmap
      this.options.stringSVG = options?.stringSVG ?? this.options.stringSVG
      this.options.interactiveLayer =
        options?.interactiveLayer ?? this.options.interactiveLayer
      this.options.isRemoveUnuseItem =
        options?.isRemoveUnuseItem ?? this.options.isRemoveUnuseItem
      this.options.isHoverEnable =
        options?.isHoverEnable ?? this.options.isHoverEnable
      this.options.funcClick = options?.funcClick ?? this.options.funcClick
      this.options.funcParams = options?.funcParams ?? this.options.funcParams
      this.options.isCustomBalloon =
        options?.isCustomBalloon ?? this.options.isCustomBalloon
      this.options.nodeCustomBalloon =
        options?.nodeCustomBalloon ?? this.options.nodeCustomBalloon
      this.options.dataStructureCustomBalloon =
        options?.dataStructureCustomBalloon ??
        this.options.dataStructureCustomBalloon
      this.options.isMobileZoom =
        options?.isMobileZoom ?? this.options.isMobileZoom
      this.options.isSVGFromSring =
        options?.isSVGFromSring ?? this.options.isSVGFromSring

      if (options.mapTheme !== undefined) {
        this.options.mapTheme.colorBG =
          options?.mapTheme?.colorBG ?? this.options.mapTheme.colorBG
        this.options.mapTheme.colorItem =
          options?.mapTheme?.colorItem ?? this.options.mapTheme.colorItem
        this.options.mapTheme.colorHoverItem =
          options?.mapTheme?.colorHoverItem ??
          this.options.mapTheme.colorHoverItem
        this.options.mapTheme.colorSelectItem =
          options?.mapTheme?.colorSelectItem ??
          this.options.mapTheme.colorSelectItem
        this.options.mapTheme.opacityItem =
          options?.mapTheme?.opacityItem ?? this.options.mapTheme.opacityItem
        this.options.mapTheme.opacityHoverItem =
          options?.mapTheme?.opacityHoverItem ??
          this.options.mapTheme.opacityHoverItem
        this.options.mapTheme.opacitySelectItem =
          options?.mapTheme?.opacitySelectItem ??
          this.options.mapTheme.opacitySelectItem
        this.options.mapTheme.colorBorderItem =
          options?.mapTheme?.colorBorderItem ??
          this.options.mapTheme.colorBorderItem
        this.options.mapTheme.colorBorderHoverItem =
          options?.mapTheme?.colorBorderHoverItem ??
          this.options.mapTheme.colorBorderHoverItem
        this.options.mapTheme.colorBorderSelectItem =
          options?.mapTheme?.colorBorderSelectItem ??
          this.options.mapTheme.colorBorderSelectItem
        this.options.mapTheme.isBorderItem =
          options?.mapTheme?.isBorderItem ?? this.options.mapTheme.isBorderItem
        this.options.mapTheme.isBorderHoverItem =
          options?.mapTheme?.isBorderHoverItem ??
          this.options.mapTheme.isBorderHoverItem
        this.options.mapTheme.isBorderSelectItem =
          options?.mapTheme?.isBorderSelectItem
        this.options.mapTheme.widthBorderItem =
          options?.mapTheme?.widthBorderItem ??
          this.options.mapTheme.widthBorderItem
        this.options.mapTheme.widthBorderHoverItem =
          options?.mapTheme?.widthBorderHoverItem ??
          this.options.mapTheme.widthBorderHoverItem
        this.options.mapTheme.widthBorderSelectItem =
          options?.mapTheme?.widthBorderSelectItem ??
          this.options.mapTheme.widthBorderSelectItem
      }
    }
    console.log('     #### options = ', options)
    console.log('this #### options = ', this.options)
  }
  static test() {
    return true
  }

  start() {
    if (this.node === null || this.node === undefined) return
    this.isMobile = isMobile()
    ClientSVGEditor.evCache = []
    console.log('START  = ', this.options?.title)
    //  console.log('isMobile = ', this.isMobile)
    console.log('this.options.urlmap  = ', this.options.urlmap)
    console.log('this.options.isSVGFromSring  = ', this.options.isSVGFromSring)

    if (this.options.urlmap !== '' && this.options.urlmap !== undefined) {
      this.insertSVG(this.options.urlmap)
    } else if (this.options.isSVGFromSring) {
      this.insertSVGFromString(this.options.stringSVG)
    }
    console.log('isCastomBalloon', this.options.isCustomBalloon)
    if (this.options.isCustomBalloon) {
      console.log('isCastomBalloon', this.options.isCustomBalloon)
      const customBalloon = this.options.nodeCustomBalloon

      customBalloon.style.display = 'none'
      customBalloon.style.zIndex = '999999'
      customBalloon.style.position = 'fixed'
    }

    this.node.style.backgroundColor = this.options.mapTheme.colorBG
    this.node.style.overflow = 'auto'
    //console.log('this.options.isMobileZoom', this.options.isMobileZoom)
    if (this.isMobile) {
      if (this.options.isMobileZoom) {
        this.initZoom()
      }
      this.initMobileBalloon()
    }
    //create object optionsBalloon type BalloonOptions
    const optionsBalloon: BalloonOptions = {
      balloonTheme: this.balloonTheme,
    }
    //const getBalloon=  createBalloon(optionsBalloon);

    if (this.options.isCustomBalloon) {
      //this.customNodeBallon = this.customNodeBallon
      if (!this.isMobile) {
        this.nodeBallon = createCustomBalloon(
          optionsBalloon,
          this.options.nodeCustomBalloon
        )
      }
    } else {
      if (!this.isMobile) {
        this.nodeBallon = createBalloon(optionsBalloon)
      }
    }
    this.nodeBallon.hide()
    /*     document.body.addEventListener('click', (e) => {
      this.nodeBallon!.hide()
    }) */

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
    const svg = this.node.querySelector('svg')
    console.log('this.node', svg)
    svg.style = ''
    svg.style.width = '100%'
    svg.style.height = '100%'

    if (this.options.title !== '') {
      const titleDom = document.createElement('div')
      //titleDom.style.position = 'fixed'

      titleDom.setAttribute('class', 'svgmap-title')
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
    //create object optionsBalloon type BalloonOptions
    const optionsBalloon: BalloonOptions = {
      balloonTheme: this.balloonTheme,
    }
    //const getBalloon=  createBalloon(optionsBalloon);

    if (this.options.isCustomBalloon) {
      //this.customNodeBallon = this.customNodeBallon
      if (!this.isMobile) {
        this.nodeBallon = createCustomBalloon(
          optionsBalloon,
          this.options.nodeCustomBalloon
        )
      }
    } else {
      if (!this.isMobile) {
        this.nodeBallon = createBalloon(optionsBalloon)
      }
    }

    if (this.options.title !== '') {
      const titleDom = document.createElement('div')
      //titleDom.style.position = 'fixed'

      titleDom.setAttribute('class', 'svgmap-title')
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
        client.deleteItem(item.id)
      }
    })
  }

  disposeClient() {
    this.nodeBallon = null
    this.node = null
    this.dataItems = []
    this.options = null
  }

  hideBalloon() {
    this.nodeBallon.hide()
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

  /*   static getPositionScroll(item: any) {
    throw new Error('Method not implemented.')
  }
 */

  multySelectItem(arrayId: string[]) {
    //remove event
    console.log('ClientSVGEditor.scrollEvent', ClientSVGEditor.scrollEvent)

    window.removeEventListener('scroll', this.myScrollOut)
    console.log(window)

    arrayId.forEach((id) => {
      const item = this.node
        .querySelector(`${this.options.interactiveLayer}`)
        .querySelector(`#${id}`)
      console.log('item', item)

      item.style.fill = this.options.mapTheme.colorSelectItem
      item.style.stroke = this.options.mapTheme.colorBorderSelectItem
      item.style.strokeWidth = this.options.mapTheme.widthBorderSelectItem
      item.style.opacity = this.options.mapTheme.opacitySelectItem
      item.style.fillOpacity = this.options.mapTheme.opacitySelectItem
    })
  }

  selectItem(id: string) {
    ClientSVGEditor.selectItem = this.node
      .querySelector(`${this.options?.interactiveLayer}`)
      .querySelector(`#${id}`)
    console.log('item', ClientSVGEditor.selectItem)
    console.log('item X', ClientSVGEditor.selectItem?.getBoundingClientRect())
    ClientSVGEditor.selectItem.style.fill =
      this.options.mapTheme.colorSelectItem
    ClientSVGEditor.selectItem.style.stroke =
      this.options.mapTheme.colorBorderSelectItem
    ClientSVGEditor.selectItem.style.strokeWidth =
      this.options.mapTheme.widthBorderSelectItem
    ClientSVGEditor.selectItem.style.opacity =
      this.options.mapTheme.opacitySelectItem
    ClientSVGEditor.selectItem.style.fillOpacity =
      this.options.mapTheme.opacitySelectItem
    const getDataItem = this.dataItems.find((item) => item.idmap === id)
    if (!this.isMobile) {
      if (this.options.isCustomBalloon) {
        if (getDataItem !== undefined) {
          if (getDataItem?.description !== undefined) {
            this.nodeBallon.customRender(
              {
                title: getDataItem?.title,
                description: getDataItem?.description,
              },
              this.options.dataStructureCustomBalloon
            )
          } else {
            this.nodeBallon.customRender(
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
            this.nodeBallon.render({
              title: getDataItem?.title,
              description: getDataItem?.description,
            })
          } else {
            this.nodeBallon.render({
              title: getDataItem?.title,
              description: '',
            })
          }
        } else {
          this.nodeBallon.render({
            title: 'Info not found',
            description: 'Info not found',
          })
        }
      }
    }
    handleMousemove(
      ClientSVGEditor.selectItem.getBoundingClientRect(),
      this.nodeBallon,
      this.options.isCustomBalloon
    )

    window.addEventListener('scroll', this.myScrollOut)

    console.log('ClientSVGEditor.scrollEvent ', ClientSVGEditor.scrollEvent)
  }

  myScrollOut = () => {
    console.log(`MyScrollOUT =`)
    handleMousemove(
      ClientSVGEditor.selectItem.getBoundingClientRect(),
      this.nodeBallon,
      this.options.isCustomBalloon
    )
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
        //console.log('mousemove', e.x, e.y)
        handleMousemove(e, this.nodeBallon, this.options.isCustomBalloon)

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
                this.nodeBallon.hide()
              }
            )

            item.addEventListener('click', (event: any) => {
              console.log('click', event.target.id)
              if (event.target.tagName !== 'g') {
                this.selectItem(event.target.id)
                /*                 event.target.style.fill = this.options.mapTheme.colorSelectItem
                event.target.style.stroke =
                  this.options.mapTheme.colorBorderSelectItem
                event.target.style.strokeWidth =
                  this.options.mapTheme.widthBorderSelectItem
                event.target.style.opacity =
                  this.options.mapTheme.opacitySelectItem */
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
                event.target.style.fill = this.options.mapTheme.colorSelectItem
                event.target.style.stroke =
                  this.options.mapTheme.colorBorderSelectItem
                event.target.style.strokeWidth =
                  this.options.mapTheme.widthBorderSelectItem
                event.target.style.opacity =
                  this.options.mapTheme.opacitySelectItem
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
                this.nodeBallon.hide()
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

    el.onpointerdown = this.pointerdownHandler.bind(this)
    el.onpointermove = this.pointermoveHandler.bind(this)
    console.log(this.isMobile)
    //     el!.onpointerup = pointerupHandler;
    el.onpointercancel = this.pointerupHandler.bind(this)
    el.onpointerout = this.pointerupHandler.bind(this)
    el.onpointerleave = this.pointerupHandler.bind(this)
  }

  pointerdownHandler(ev: any) {
    // The pointerdown event signals the start of a touch interaction.
    // This event is cached to support 2-finger gestures
    console.log('pointerDown', ev)
    console.log('mob  == ', ClientSVGEditor.evCache)

    ClientSVGEditor.evCache.push(ev)
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
    const index = ClientSVGEditor.evCache.findIndex(
      (cachedEv: any) => cachedEv.pointerId === ev.pointerId
    )
    ClientSVGEditor.evCache[index] = ev

    // If two pointers are down, check for pinch gestures
    if (ClientSVGEditor.evCache.length === 2) {
      // Calculate the distance between the two pointers
      const curDiff = Math.abs(
        ClientSVGEditor.evCache[0].clientX - ClientSVGEditor.evCache[1].clientX
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
      this.node.firstChild.style.transform = `scale(${this.currentZoom})` //  scale(1.5)
      this.node.firstChild.style.transformOrigin = 'center'
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

    const index = ClientSVGEditor.evCache.findIndex(
      (cachedEv: any) => cachedEv.pointerId === ev.pointerId
    )
    ClientSVGEditor.evCache.splice(index, 1)

    //ev.target.style.background = "white";
    //ev.target.style.border = "1px solid black";

    // If the number of pointers down is less than two then reset diff tracker
    if (ClientSVGEditor.evCache.length < 2) {
      //this.prevDiff = -1
      //  this.currentZoom = Math.floor(this.prevDiff / 10) / 10
      console.log('this.currentZoom = ', this.currentZoom)
    }
  }
  removeEvent(ev: any) {
    // Remove this event from the target's cache
    const index = ClientSVGEditor.evCache.findIndex(
      (cachedEv: any) => cachedEv.pointerId === ev.pointerId
    )
    ClientSVGEditor.evCache.splice(index, 1)
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

    if (document.querySelector('#BalloonMobile') === null) {
      const baloonMobile = document.createElement('div')
      baloonMobile.style.position = 'fixed'
      baloonMobile.style.bottom = '0px'
      baloonMobile.style.left = '0px'
      baloonMobile.style.height = '100px'
      baloonMobile.style.width = '100%'

      baloonMobile.id = 'BalloonMobile'
      baloonMobile.style.display = 'none'
      baloonMobile.style.zIndex = '999999'
      document.body.appendChild(baloonMobile)
      baloonMobile.innerHTML = `
    <div  style="background-color: ${this.balloonTheme.colorBG}; border-radius: 10px 10px 0 0; box-shadow: 0 0 10px rgba(0,0,0,0.5); width: 100%; height: 100%;">
    <div id="balloonItemMobile">
    </div>
    </div>`

      // add event listener click over #interactiveLayer
      document.body.addEventListener('click', (e) => {
        if (e.target !== baloonMobile) {
          // console.log('click', e.target)
          baloonMobile.style.display = 'none'
        }
      })
    }
  }

  onClickMobile(func: any, params: any) {
    //console.log(`onClickMobile params =`, params)
    const balloonMobileRoot = document.getElementById('BalloonMobile')
    if (balloonMobileRoot !== null) {
      balloonMobileRoot.style.display = 'block'
    }

    const balloonItem = document.getElementById('balloonItemMobile')
    //console.log(`onClickMobile params =`, balloonItem)
    if (balloonItem !== null) {
      balloonItem.innerHTML = `
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
    }
    //func(params)
  }
  onHover(ev: any) {
    /*   console.log('onhover event', ev);
  console.log('mouseover ID', ev.id);
  console.log('mouseover tagName', ev.tagName); */
    const getDataItem = this.dataItems.find((item) => item.idmap === ev.id)
    //  console.log('getDataItem', getDataItem)

    ev.style.fill = this.options.mapTheme.colorHoverItem
    if (this.options.mapTheme.isBorderHoverItem) {
      ev.style.stroke = this.options.mapTheme.colorBorderHoverItem
      ev.style.strokeWidth = this.options.mapTheme.widthBorderHoverItem
    }

    ev.style.opacity = this.options.mapTheme.opacityHoverItem
    if (!this.isMobile) {
      if (this.options.isCustomBalloon) {
        if (getDataItem !== undefined) {
          if (getDataItem?.description !== undefined) {
            this.nodeBallon.customRender(
              {
                title: getDataItem?.title,
                description: getDataItem?.description,
              },
              this.options.dataStructureCustomBalloon
            )
          } else {
            this.nodeBallon.customRender(
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
            this.nodeBallon.render({
              title: getDataItem?.title,
              description: getDataItem?.description,
            })
          } else {
            this.nodeBallon.render({
              title: getDataItem?.title,
              description: '',
            })
          }
        } else {
          this.nodeBallon.render({
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
        this.nodeBallon.render({
          title: getDataItem?.title,
          description: getDataItem?.description,
        })
      } else {
        this.nodeBallon.render({ title: getDataItem?.title, description: '' })
      }
    } else {
      this.nodeBallon.render({
        title: 'Info not found',
        description: 'Info not found',
      })
    }
  }

  clearInteractiveLayer() {
    console.log(
      'this.options.interactiveLayer = ',
      this.options.interactiveLayer
    )
    const interactiveLayer = [
      ...this.node.querySelector(this.options.interactiveLayer).children,
    ]
    console.log('clearInteractiveLayer = ', interactiveLayer)
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
        element.style.fill = this.options.mapTheme.colorItem
        if (this.options.mapTheme.isBorderItem) {
          element.style.stroke = this.options.mapTheme.colorBorderItem
          element.style.strokeWidth = this.options.mapTheme.widthBorderItem
        }
        if (element.tagName !== 'g') {
          element.style.opacity = this.options.mapTheme.opacityItem
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
  console.log('loadTextFromFile url = ', url)
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

export class Balloon extends Base {
  themeBalloonOptions: BalloonTheme | null
  balloonDom: HTMLElement | any
  constructor(options: BalloonOptions | null, domBalloon: HTMLElement | null) {
    super()
    if (options !== null) {
      this.themeBalloonOptions = options!.balloonTheme
    } else {
      this.themeBalloonOptions = null
    }
    if (domBalloon !== null) {
      this.balloonDom = domBalloon
    } else {
      this.balloonDom = document.querySelector('#BalloonItem')
    }
  }

  delete() {
    this.balloonDom?.remove()
  }

  hide() {
    this.balloonDom.style.display = 'none'
  }
  show() {
    this.balloonDom.style.display = 'block'
  }

  render(dataRender: any) {
    //  console.log('dataRender = ', dataRender)
    this.balloonDom!.innerHTML = `
    <div style="display:block; position:relative">
      <div class="balloon" style="background-color: ${
        this.themeBalloonOptions?.colorBG
      };position: absolute;bottom: 0;left: 0;">

        <div class="balloon-title" style="color:${
          this.themeBalloonOptions?.colorTitle
        }">${dataRender.title}</div>
        <div class="balloon-content" style="color:${
          this.themeBalloonOptions?.colorDescription
        }; display: ${dataRender.description !== '' ? 'block' : 'none'}">${
      dataRender.description
    }</div>
    <div class="box45" style="background-color: ${
      this.themeBalloonOptions?.colorBG
    }"></div>
      </div>
      </div>
    `
    this.balloonDom.style.display = 'block'
    return true
  }
  customRender(dataRender: any, structureCustomRender: any) {
    /*     console.log('custom Render dataRender = ', dataRender)
    console.log('custom Render options = ', this.themeBalloonOptions)
    console.log('custom Render structureCustomRender = ', structureCustomRender) */
    const titleDom = this.balloonDom.querySelector(structureCustomRender.title)
    const descriptionDom = this.balloonDom.querySelector(
      structureCustomRender.description
    )
    titleDom.innerHTML = dataRender.title
    descriptionDom.innerHTML = dataRender.description
    return true
  }
}

const createBalloon = (options: BalloonOptions) => {
  //  console.log('createBalloon options = ', options)

  const baloon = new Balloon(options, null)

  //  console.log('createBalloon document IF baloon.balloonDom = ', baloon.balloonDom)
  if (baloon.balloonDom !== null) {
    // baloon.delete();
    //baloon.render({title: 'TITLE', description: 'DESCRIPTION'});
  } else {
    if (baloon.themeBalloonOptions?.isPositionFixed) {
      const balloonDom = document.createElement('div')
      balloonDom.style.position = 'fixed'
      balloonDom.style.top = baloon.themeBalloonOptions?.isPositionFixed
        ? baloon.themeBalloonOptions.top + 'px'
        : '0px'
      balloonDom.style.left = baloon.themeBalloonOptions?.isPositionFixed
        ? baloon.themeBalloonOptions.left + 'px'
        : '0px'

      balloonDom.id = 'BalloonItem'
      balloonDom.style.display = 'block'
      balloonDom.style.zIndex = '999999'
      document.body.appendChild(balloonDom)
    } else {
      const balloonDom = document.createElement('div')
      balloonDom.style.position = 'fixed'
      balloonDom.style.top = '0px'
      balloonDom.style.left = '0px'
      balloonDom.id = 'BalloonItem'
      balloonDom.style.display = 'block'
      balloonDom.style.zIndex = '999999'
      document.body.appendChild(balloonDom)
    }

    baloon.balloonDom = document.querySelector('#BalloonItem')
    //baloon.render({title: 'TITLE', description: 'DESCRIPTION'});
    baloon.hide()
  }
  //  console.log('createBalloon document = ', baloon.balloonDom)
  return baloon
}
const createCustomBalloon = (
  options: BalloonOptions | null,
  domBalloon: HTMLElement
) => {
  //  console.log('createBalloon options = ', options)

  const baloon = new Balloon(options, domBalloon)

  console.log(
    'createBalloon document IF baloon.balloonDom = ',
    baloon.balloonDom
  )
  if (baloon.balloonDom !== null) {
    // baloon.delete();
    baloon.balloonDom.style.top = 0 + 'px'
    baloon.balloonDom.style.left = 0 + 'px'
  } else {
    baloon.balloonDom = domBalloon

    baloon.hide()
  }
  //  console.log('createBalloon document = ', baloon.balloonDom)
  return baloon
}

const handleMousemove = (
  position: { x: number; y: number },
  baloon: any,
  isCustomBalloon: boolean
) => {
  /*   console.log(`cursor ev =`, position);
  console.log(`cursor : X= ${position.x} px : Y= ${position.y} px\n`);*/
  // console.log(`cursor : baloon =`, baloon, ` \n`)
  baloon.show()
  const getWidthElement = isCustomBalloon
    ? baloon.balloonDom.offsetWidth
    : baloon.balloonDom.querySelector('.balloon').offsetWidth
  //  console.log(`cursor : baloon =`, getWidthElement, ` \n`)
  if (!baloon.themeBalloonOptions?.isPositionFixed) {
    baloon.balloonDom.style.transform = `translate(${
      position.x - getWidthElement / 2 - baloon.themeBalloonOptions.left
    }px, ${position.y - 40 - baloon.themeBalloonOptions.top}px)`
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
/* const throttle = (func: any, wait: number) => {
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
} */
