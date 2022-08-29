



/**
 * @description
 * Класс для отображения карты на клиенте
 * 
 */
export interface DataInteractive {
  id?: string;
  idmap?:string; 
  title?: string; 
  slug?: string; 
  description?: string; 
  image?: string;

}

/**
 * @description DataOptions Интерфейс для отображения карты на клиенте
 * @title {string} Заголовок 
 * @colorBG {string} Цвет фона карты
 * @urlmap {string} Путь к файлу карты
 * @interactiveLayer {string} 
 * @description {string} 
 * @image  {string}
 * @isRemoveUnuseItem {boolean}
 * @mapTheme {MapTheme}
 */
export interface DataOptions {
   title?: string;
   colorBG?:string;
   urlmap?: string;
   interactiveLayer?: string;
   description?: string;
   image?: string;
   isRemoveUnuseItem?:boolean;
   mapTheme?: MapTheme;

}


/**
 * This is the description of the interface @BaloonOptions 
 * @title {string} title - This is the title of the interface
 * @description {string} description - This is the description of the interface
 * @image {string} image - This is the image of the interface
 * @baloonTheme  {BaloonTheme}
 */
export interface BaloonOptions {
   title?: string;
   description?: string;
   image?: string;
   baloonTheme: BaloonTheme;
}


/**
 * This is the description of the interface @BaloonTheme 
 * @colorBG {string} colorBG - This is the colorBG of the Baloon
 * @colorTitle {string} colorTitle - This is the colorTitle of the Baloon
 * @colorDescription {string} colorDescription - This is the colorDescription of the Baloon
 * @isPositionFixed {boolean} isPositionFixed - This is the use of the Baloon fixed position
 * @top {number}  top - This is the top positon of the Baloon
 * @left {number} left - This is the left position of the Baloon
 */
export interface BaloonTheme {
  colorBG?:string;
  colorTitle?:string;
  colorDescription?:string;
  isPositionFixed?:boolean;
  top?:number;
  left?:number;

}
export interface MapTheme {
  colorBG?: string,
  colorItem?: string,
  colorHoverItem?: string,
  colorSelectItem?: string,
  opacityItem?: number,
  opacityHoverItem?: number,
  opacitySelectItem?: number,
  colorBorderItem?: string,
  colorBorderHoverItem?: string,
  colorBorderSelectItem?: string,
  isBorderItem?: boolean,
  isBorderHoverItem?: boolean,
  isBorderSelectItem?: boolean,
  widthBorderItem?: number,
  widthBorderHoverItem?: number,
  widthBorderSelectItem?: number,

}
