import type {
  DataInteractive,
} from './models/simple.models';
import {SvgMap } from './_privatemodule/svg';
import Base from './base';




export  class DomSVG2 extends Base {
  node: any;
  type: any;
  attrs: any;

  constructor (node:any, attrs:any) {
    super()
    this.node = node
    this.type = node.nodeName
    this.attrs = attrs
    attrs.colorBG = attrs.colorBG
    if (attrs.title !== undefined) {
      attrs.title = attrs.title;
    }else{
      attrs.title = "TITLE"
    }
  }
}
export  class DomSVG extends Base {
  node: any;
  type: any;
  attrs: any;

  constructor (node:any, attrs:any) {
    super()
    this.node = node
    this.type = node.nodeName
    this.attrs = attrs
    attrs.colorBG = attrs.colorBG
    if (attrs.title !== undefined) {
      attrs.title = attrs.title;
    }else{
      attrs.title = "TITLE"
    }
  }


start(){
  console.log('Start Dom');
  console.log('Start Dom NODE' , this.node);
  console.log('Start Dom attributes = ' , this.attrs);
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