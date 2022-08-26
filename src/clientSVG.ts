import type {
  DataInteractive,DataOptions,MapTheme
} from './models/simple.models';
import {SvgMap } from './_privatemodule/svg';

import Base from './base';




export  class DomSVG2 extends Base {
  node: any;
  type: any;
  options: DataOptions;

  constructor (node:any, options:DataOptions) {
    super()
    this.node = node
    this.type = node.nodeName
    this.options = options
    options.colorBG = options.colorBG
    if (options.title !== undefined) {
      options.title = options.title;
    }else{
      options.title = "TITLE"
    }
  }
}
export  class ClientSVGEditor extends Base {
  node: any;
  dataItems: DataInteractive[] = [];
  options: DataOptions = {
    title:'Sample Map',
    urlmap:'',
    interactiveLayer:'#interactive',
    mapTheme:{
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
    }

  };

  constructor (node:any,dataItems: DataInteractive[], options:DataOptions) {
    super()
    this.node = node
    this.dataItems = dataItems
    console.log(this.options);
    console.log(options);
    if(options !== undefined){
    //this.options = options

    if(options.title !== undefined){
    this.options.title = options.title
    }
    if(options.urlmap !== undefined){
    this.options.urlmap = options.urlmap}
    if(options.interactiveLayer !== undefined){
    this.options.interactiveLayer = options.interactiveLayer}
    if(options.mapTheme !== undefined){
      if(options.mapTheme.colorBG !== undefined){
        this.options.mapTheme!.colorBG = options.mapTheme.colorBG}
      if(options.mapTheme.colorItem !== undefined){
        this.options.mapTheme!.colorItem = options.mapTheme.colorItem}
      if(options.mapTheme.colorHoverItem !== undefined){
        this.options.mapTheme!.colorHoverItem = options.mapTheme.colorHoverItem}
      if(options.mapTheme.colorSelectItem !== undefined){
        this.options.mapTheme!.colorSelectItem = options.mapTheme.colorSelectItem}
      if(options.mapTheme.opacityItem !== undefined){
        this.options.mapTheme!.opacityItem = options.mapTheme.opacityItem}
      if(options.mapTheme.opacityHoverItem !== undefined){
        this.options.mapTheme!.opacityHoverItem = options.mapTheme.opacityHoverItem}
      if(options.mapTheme.opacitySelectItem !== undefined){
        this.options.mapTheme!.opacitySelectItem = options.mapTheme.opacitySelectItem}
      if(options.mapTheme.colorBorderItem !== undefined){
        this.options.mapTheme!.colorBorderItem = options.mapTheme.colorBorderItem}
      if(options.mapTheme.colorBorderHoverItem !== undefined){
        this.options.mapTheme!.colorBorderHoverItem = options.mapTheme.colorBorderHoverItem}
      if(options.mapTheme.colorBorderSelectItem !== undefined){
        this.options.mapTheme!.colorBorderSelectItem = options.mapTheme.colorBorderSelectItem}
      if(options.mapTheme.isBorderItem !== undefined){
        this.options.mapTheme!.isBorderItem = options.mapTheme.isBorderItem}
      if(options.mapTheme.isBorderHoverItem !== undefined){
        this.options.mapTheme!.isBorderHoverItem = options.mapTheme.isBorderHoverItem}
      if(options.mapTheme.isBorderSelectItem !== undefined){
        this.options.mapTheme!.isBorderSelectItem = options.mapTheme.isBorderSelectItem}
      if(options.mapTheme.widthBorderItem !== undefined){
        this.options.mapTheme!.widthBorderItem = options.mapTheme.widthBorderItem}
      if(options.mapTheme.widthBorderHoverItem !== undefined){
        this.options.mapTheme!.widthBorderHoverItem = options.mapTheme.widthBorderHoverItem}
      if(options.mapTheme.widthBorderSelectItem !== undefined){
        this.options.mapTheme!.widthBorderSelectItem = options.mapTheme.widthBorderSelectItem}


    }
    }



  }
test(){
  console.log('test');
  return true;
}

   start()  {
  console.log('Start Dom push version 0.0.2');
  console.log('Start Dom NODE' , this.node);
  console.log('Start Dom attributes = ' , this.options);
  if(this.options.title !== ''){
    console.log('Start Dom title = ' , this.options.title);
  }
  if(this.options.urlmap !== ''){
    console.log('Start Dom urlmap = ' , this.options.urlmap);
    console.log('Start Dom urlmap = ' , this.node);
    this.insertSVG(this.options.urlmap!);
    
  }
  return true;
}
async insertSVG(itemSVG:string){
  this.node.innerHTML =  '';
  console.log('insertSVG');
  console.log('insertSVG Dom NODE' , this.node);
  console.log('itemSVG' , itemSVG);
  const getSVGData = await loadSVGFile(itemSVG);
  //console.log('Start Dom urlmap getSVGData  = ' , getSVGData);
  this.node.innerHTML =  getSVGData;
this.initInteractiveLayer();
this.clearInteractiveLayer();
  return true;
}


initInteractiveLayer(){
  const interactiveLayer = this.node.querySelector(this.options.interactiveLayer);
  console.log('initInteractiveLayer = ', interactiveLayer);
interactiveLayer.addEventListener('mouseover', (e:any) => {
  console.log('mouseover', e.target.tagName);
  console.log('mouseover ID', e.target.id);
  const getDataItem = this.dataItems.find(item => item.idmap === e.target.id);
  console.log('getDataItem', getDataItem);
  if(e.target.tagName !== 'g'){
  e.target.style.fill = this.options.mapTheme!.colorHoverItem;
  e.target.style.stroke = this.options.mapTheme!.colorBorderHoverItem;
  e.target.style.strokeWidth = this.options.mapTheme!.widthBorderHoverItem;
  e.target.style.opacity = this.options.mapTheme!.opacityHoverItem;
}
} );
interactiveLayer.addEventListener('mouseout', (e:any) => {
 // console.log('mouseout', e.target);
 if(e.target.tagName !== 'g'){
  e.target.style.fill = this.options.mapTheme!.colorItem;
  e.target.style.stroke = this.options.mapTheme!.colorBorderItem;
  e.target.style.strokeWidth = this.options.mapTheme!.widthBorderItem;
  e.target.style.opacity = this.options.mapTheme!.opacityItem;}

} );
interactiveLayer.addEventListener('click', (e:any) => {
  console.log('click', e.target.id);
  if(e.target.tagName !== 'g'){
  e.target.style.fill = this.options.mapTheme!.colorSelectItem;
  e.target.style.stroke = this.options.mapTheme!.colorBorderSelectItem;
  e.target.style.strokeWidth = this.options.mapTheme!.widthBorderSelectItem;
  e.target.style.opacity = this.options.mapTheme!.opacitySelectItem;
  }
} );
}


clearInteractiveLayer(){
  const interactiveLayer = [...this.node.querySelector(this.options.interactiveLayer).children];
  console.log('clearInteractiveLayer = ', interactiveLayer);
  interactiveLayer.forEach((element: { style: {
    opacity: number | undefined; fill: string | undefined; stroke: string | undefined; strokeWidth: number | undefined; 
}; }) => {
    element.style.fill = this.options.mapTheme!.colorItem;
    element.style.stroke = this.options.mapTheme!.colorBorderItem;
    element.style.strokeWidth = this.options.mapTheme!.widthBorderItem;
    element.style.opacity = this.options.mapTheme!.opacityItem;
  } );
    
  
}

  // Add given element at a position
  add (element:any, i: number) {
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

const  loadSVGFile = async (url:string) => {
  console.log('loadTextFromFile url = ',url);
  const data = fetch(url)
  .then(response => response.text())
  .then(text => {
    console.log('text = ',text);
    return text;
  }).catch(error => {
    console.log('error = ',error);
    return error;
  });
  return data;
}

