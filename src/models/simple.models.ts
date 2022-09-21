/**
 * @description
 * Interface for simple model Items  @DataInteractive
 * @id {string} ID of the item
 * @idmap {string} Id item on the map
 * @title {string} Title of the item
 * @slug {string;} Slug of the item
 * @description {string} Description of the item
 * @image {string}  Image url of the item
 */
export interface DataInteractive {
  id?: string
  idmap?: string
  title?: string
  slug?: string
  description?: string
  image?: string
}

/**
 * @description
 * This is the description of the interface @DataOptions
 * @title {string} Заголовок
 * @colorBG {string} Цвет фона карты
 * @urlmap {string} Путь к файлу карты
 * @interactiveLayer {string}
 * @description {string}
 * @image  {string}
 * @isRemoveUnuseItem {boolean}
 * @funcClick {function}
 * @funcParams {any}
 * @mapTheme {MapTheme}
 */
export interface DataOptions {
  title?: string
  colorBG?: string
  urlmap?: string
  stringSVG?: string
  interactiveLayer?: string
  description?: string
  image?: string
  isRemoveUnuseItem?: boolean
  isHoverEnable?: boolean
  funcClick?: Function
  funcParams?: any
  mapTheme?: MapTheme
  isCustomBalloon?: boolean
  nodeCustomBalloon?: HTMLElement | null
  dataStructureCustomBalloon?: CastomBalloonOptions | null
  isMobileZoom?: boolean | null
  isSVGFromSring?: boolean | null
}

/**
 * @description
 * This is the description of the interface @BalloonOptions
 * @title {string} title - This is the title of the interface
 * @description {string} description - This is the description of the interface
 * @image {string} image - This is the image of the interface
 * @balloonTheme  {BalloonTheme}
 */
export interface BalloonOptions {
  title?: string
  description?: string
  image?: string
  balloonTheme: BalloonTheme
}

/**
 * @description
 * This is the description of the interface @CastomBalloonOptions
 * @title {string} title - This is the title of the interface
 * @description {string} description - This is the description of the interface
 */
export interface CastomBalloonOptions {
  title?: string
  description?: string
}

/**
 * @description
 * This is the description of the interface @BalloonTheme
 * @colorBG {string} colorBG - This is the colorBG of the Balloon
 * @colorTitle {string} colorTitle - This is the colorTitle of the Balloon
 * @colorDescription {string} colorDescription - This is the colorDescription of the Balloon
 * @isPositionFixed {boolean} isPositionFixed - This is the use of the Balloon fixed position
 * @top {number}  top - This is the top positon of the Balloon
 * @left {number} left - This is the left position of the Balloon
 */
export interface BalloonTheme {
  colorBG?: string
  colorTitle?: string
  colorDescription?: string
  isPositionFixed?: boolean
  top?: number
  left?: number
}

/**
 * @description
 * This is the description of the interface @MapTheme
 * @colorBG {string} colorBG - This is the colorBG of the Map
 * @colorItem {string} colorItem - This is the colorItem of the Map
 * @colorHoverItem {string} colorHoverItem - This is the colorHoverItem of the Map
 * @colorSelectItem {string} colorSelectItem - This is the colorSelectItem of the Map
 * @opacityItem {number} opacityItem - This is the opacityItem of the Map
 * @opacityHoverItem {number} opacityHoverItem - This is the opacityHoverItem of the Map
 * @opacitySelectItem {number} opacitySelectItem - This is the opacitySelectItem of the Map
 * @colorBorderItem {string} colorBorderItem - This is the colorBorderItem of the Map
 * @colorBorderHoverItem {string} colorBorderHoverItem - This is the colorBorderHoverItem of the Map
 * @colorBorderSelectItem {string} colorBorderSelectItem - This is the colorBorderSelectItem of the Map
 * @isBorderItem {boolean} isBorderItem - This is the use of the borderItem of the Map
 * @isBorderHoverItem {boolean} isBorderHoverItem - This is the use of the borderHoverItem of the Map
 * @isBorderSelectItem {boolean} isBorderSelectItem - This is the use of the borderSelectItem of the Map
 * @widthBorderItem {number} widthBorderItem - This is the widthBorderItem of the Map
 * @widthBorderHoverItem {number} widthBorderHoverItem - This is the widthBorderHoverItem of the Map
 * @widthBorderSelectItem {number} widthBorderSelectItem - This is the widthBorderSelectItem of the Map
 *
 */
export interface MapTheme {
  colorBG?: string
  colorItem?: string
  colorHoverItem?: string
  colorSelectItem?: string
  opacityItem?: number
  opacityHoverItem?: number
  opacitySelectItem?: number
  colorBorderItem?: string
  colorBorderHoverItem?: string
  colorBorderSelectItem?: string
  isBorderItem?: boolean
  isBorderHoverItem?: boolean
  isBorderSelectItem?: boolean
  widthBorderItem?: number
  widthBorderHoverItem?: number
  widthBorderSelectItem?: number
}
