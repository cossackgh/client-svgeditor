export interface DataInteractive {
  id?: string;idmap?:string; title?: string; slug?: string; description?: string; image?: string; 
 
}
export interface DataOptions {
   title?: string;colorBG?:string; urlmap?: string; interactiveLayer?: string, description?: string; mapTheme?: MapTheme;
 
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
