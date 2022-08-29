import type {
  DataInteractive,DataOptions,MapTheme,BaloonOptions,BaloonTheme
} from './models/simple.models';
import {SvgMap } from './_privatemodule/svg';

import Base from './base';




export  class ClientSVGEditor extends Base {
  node: any;
  
  dataItems: DataInteractive[] = [];
 
  options: DataOptions = {
    title:'Sample Map',
    urlmap:'',
    interactiveLayer:'#interactive',
    isRemoveUnuseItem:false,
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
    },
       

  };
  
    baloonTheme: BaloonTheme = {
      colorBG: '#ffffff',
      colorTitle: '#ff0000',
      colorDescription: '#34f05a',
      isPositionFixed: true,
      top: 10,
      left: 20
  
  };

  nodeBallon: Baloon | null;

  constructor (node:any,dataItems: DataInteractive[], options:DataOptions,baloonTheme:BaloonTheme) {
    super()
    this.nodeBallon = null
    this.baloonTheme = baloonTheme
    this.node = node
    this.dataItems = dataItems
    console.log(this.options);
    console.log(options);

if(baloonTheme !== undefined){
  this.baloonTheme = baloonTheme
}


    if(options !== undefined){
    //this.options = options

    if(options.title !== undefined){
    this.options.title = options.title
    }
    if(options.urlmap !== undefined){
    this.options.urlmap = options.urlmap}
    if(options.interactiveLayer !== undefined){
    this.options.interactiveLayer = options.interactiveLayer}
    if(options.isRemoveUnuseItem !== undefined){
    this.options.isRemoveUnuseItem = options.isRemoveUnuseItem}
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
  
  this.node.innerHTML =  getSVGData;
  if(this.options.isRemoveUnuseItem){
  this.syncDataItemsVsInteractiveLayer();
  }
this.initInteractiveLayer();
this.clearInteractiveLayer();


//create object optionsBaloon type BaloonOptions
const optionsBaloon: BaloonOptions = {
  title: '',  
  description: '',
  image: '',
  baloonTheme: this.baloonTheme
};
//const getBaloon=  createBaloon(optionsBaloon);
this.nodeBallon =createBaloon(optionsBaloon);
console.log('getBaloon',this.nodeBallon);

  return true;
}

syncDataItemsVsInteractiveLayer(){
  const getInteractiveItems =[... this.node.querySelector(`${this.options.interactiveLayer}`).children];
  
  getInteractiveItems.forEach(item => {
//console.log('syncDataItemsVsInteractiveLayer item = ' , item.idmap);
    const isItemUse = this.dataItems.find((itemObjects) =>itemObjects.idmap === item.id)
    //const isItemUse = getInteractiveItems.find((itemObjects) =>itemObjects.id === item.idmap)
    
    console.log('syncDataItemsVsInteractiveLayer isItemUse = ' , isItemUse);
    if(isItemUse === undefined){
      console.log('syncDataItemsVsInteractiveLayer item = ' , item.id);
      this.deleteItem(item.id!);
    }


  });
}

deleteItem(id:string){
  console.log('deleteItem');
  console.log('deleteItem Dom NODE' , this.node);
  console.log('deleteItem id = ' , id);
  const item = this.node.querySelector(`${this.options.interactiveLayer}`).querySelector(`#${id}`);
  item?.remove();
}


initInteractiveLayer(){
  const interactiveLayer = this.node.querySelector(this.options.interactiveLayer);
  console.log('initInteractiveLayer = ', interactiveLayer);
interactiveLayer.addEventListener('mouseover', (e:any) => {
  console.log('mouseover', e.target.tagName);
this.onHover(e.target);
} );
interactiveLayer.addEventListener('mouseout', (e:any) => {
 // console.log('mouseout', e.target);
 if(e.target.tagName !== 'g'){
  e.target.style.fill = this.options.mapTheme!.colorItem;
  e.target.style.stroke = this.options.mapTheme!.colorBorderItem;
  e.target.style.strokeWidth = this.options.mapTheme!.widthBorderItem;
  e.target.style.opacity = this.options.mapTheme!.opacityItem;}
  this.nodeBallon!.hide();
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

onHover(ev:any){
  console.log('onhover event', ev);
  console.log('mouseover ID', ev.id);
  const getDataItem = this.dataItems.find(item => item.idmap === ev.id);
  console.log('getDataItem', getDataItem);
  if(ev.tagName !== 'g'){
  ev.style.fill = this.options.mapTheme!.colorHoverItem;
  ev.style.stroke = this.options.mapTheme!.colorBorderHoverItem;
  ev.style.strokeWidth = this.options.mapTheme!.widthBorderHoverItem;
  ev.style.opacity = this.options.mapTheme!.opacityHoverItem;
}
this.nodeBallon!.options.title = getDataItem?.title;
this.nodeBallon!.options.description = getDataItem?.description;

this.nodeBallon!.render();

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





export  class Baloon extends Base {

  options: BaloonOptions;
  themeBaloonOptions: BaloonTheme;
  baloonDom : HTMLElement | null;
  constructor (options:BaloonOptions) {
    super()

    this.options = options
    this.themeBaloonOptions = options.baloonTheme
    this.baloonDom = document.querySelector('#BaloonItem')
    //this.themeOptions.colorBG = options.colorBG
    if (options.title !== undefined) {
      options.title = options.title;
    }else{
      options.title = "TITLE"
    }
  }

  delete(){
   
    this.baloonDom?.remove()
  }


hide(){
  this.baloonDom!.style.display = 'none';
}

  render () {
    
    this.baloonDom!.innerHTML =`
      <div class="baloon" style="background-color: ${this.themeBaloonOptions.colorBG}">
        <div class="baloon-title" style="color:${this.themeBaloonOptions.colorTitle}">${this.options.title}</div>
        <div class="baloon-content" style="color:${this.themeBaloonOptions.colorDescription}">${this.options.description}</div>
      </div>
    `;
    this.baloonDom!.style.display = 'block';
    return true;
  }
}


const createBaloon = (options:BaloonOptions) => {
  console.log('createBaloon options = ',options);
  

  let baloon = new Baloon(options);
  console.log('createBaloon document IF baloon.baloonDom = ', baloon.baloonDom);
if(baloon.baloonDom !== null){

  
  baloon.delete();
  baloon.render();
}
else{

  const baloonDom = document.createElement('div');
  baloonDom.id = 'BaloonItem';
  baloonDom.style.position = 'fixed';
  baloonDom.style.top = baloon.themeBaloonOptions.isPositionFixed? baloon.themeBaloonOptions.top+'px': '0px';
  baloonDom.style.left = baloon.themeBaloonOptions.isPositionFixed? baloon.themeBaloonOptions.left+'px': '0px';  
  baloonDom.style.display = 'block';


  document.body.appendChild(baloonDom);
  baloon.baloonDom = document.querySelector('#BaloonItem');
  baloon.render();

}
console.log('createBaloon document = ', baloon.baloonDom);
  return baloon;
}