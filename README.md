# Simple Client for SVG Editor

This is a simple client for the create a SVG interactive map or schemes. It is based on SVG files with a specific structure.
In SVG files, you can define a group of elements with a specific ID. For default use interactive layer (group in SVG) Id named => "interactive". 
But you can use any other name. Нou must specify this name in the configuration file (For example - "interactiveLayer: 'MyInteractiveLayer'"). See "Set up Client" section.
## Install
``` npm install svgeditor-simple-client```
## Demo
Use case of this library is to create a  [simple interactive map](http://svgedit.za-vod.ru/example/). 
 
## Use Client
```javascript
import { ClientSVGEditor } from 'svgeditor-simple-client'
```
## OR Use Client for vanilla js
**Download last releases version library**
for example https://github.com/cossackgh/client-svgeditor/releases/download/v0.1.0-beta/svgeditor-simple-client-0.1.0.tgz
unpack it. Find ```/umd``` folder. Copy ```svgeditor-simple-client.js``` to your JS folder end copy ```main.css``` to your CSS folder.
Add to your HTML file


```html
<link rel="stylesheet"  href="./css/main.css" />
    ................
<script src="./js/svgeditor-simple-client.js"></script>
```
## Set up Client

```javascript

   const nodeMap = document.getElementById('map'); // Get Node where you insert SVG map
      const baloonTheme = {
        colorBG: '#eeeeee', // Baloon background color
        colorTitle: '#000000', // Baloon title color
        colorDescription: '#000000', // Baloon description color
        isPositionFixed: false, // Baloon position fixed
        top: 0, // Baloon top position
        left: 0, // Baloon left position
      }
      const dataShops = [
      {
        id: '0',
        idmap: 'item-01',
        title: 'Bruen - Kessler',
        slug: '/bruen-kessler',
        description: 'Sample text description for this item',
        image: 'https://loremflickr.com/128/128/abstract?73275',
      },
       ...
      ];

      const map = new ClientSVGEditor(
        nodeMap, // node - dom element to insert svg
        dataShops, // dataItems - data to render in Baloon when hover on Item
        {
          title: 'Sample map', // Head Title this map
          urlmap: './public/Shelkovsky-float-0.svg', // Path to map svg
          stringSVG: '', // String SVG map if isSVGFromSring => true
          interactiveLayer: '#interactive', // Layer for interactive items in SVG map. Default: #interactive
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
              isCustomBalloon: false, // Is you use custom baloon?
              nodeCustomBalloon: null, // Node HTMLElement for custom baloon
              dataStructureCustomBalloon: null, // Data structure for custom baloon
              isMobileZoom: false, // Is turn on zoom swipe on mobile?
              isSVGFromSring: false, // Is load SVG from string? 
        },
        baloonTheme // Theme for defaul baloon
      )

      map.start(); // Start map
```
### Sample custom select single item

```javascript
      map.clearInteractiveLayer() // Clear interactive layer if you use select single item before next select
      // You can change default options for map
      map.options!.mapTheme!.colorSelectItem = '#ff0000' // Set color for select item if you  need
      map.options!.mapTheme!.opacitySelectItem = 1 // Set opacity for select item if you  need
      map.options!.mapTheme!.widthBorderSelectItem = 2 // Set width border for select item if you  need
      
      map.selectItem('Shape-2-01') // Select item by id item in SVG map
```
### Sample custom multyselect items. 

```javascript
...
const dataArraySelect = [
  'Shape-2-04',
  'Shape-2-06',
  'Shape-2-29',
  'Shape-2-14',
  'Shape-2-21',
  'Shape-2-08',
  'Shape-2-27',
  'Shape-2-20',
  'Shape-2-31',
  'Shape-2-56',
  'Shape-2-22',
  'Shape-2-23',
  'Shape-2-24',
  'Shape-2-89',
  'Shape-2-26',
]

      map.clearInteractiveLayer() // Clear interactive layer if you use select single item before next select
      // You can change default options for map
      map.options.mapTheme.colorSelectItem = '#ff400с' // Set color for select item if you  need
      map.options.mapTheme.widthBorderSelectItem = 1.1 // Set width border for select item if you  need
      map.options.mapTheme.opacitySelectItem = 1 // Set opacity for select item if you  need
      map.options.mapTheme.widthBorderSelectItem = 2 // Set width border for select item if you  need

      map.multySelectItem(dataArraySelect) // Select group items by array id items in SVG map
      
```
## Example custom function click on item

```javascript
      function gotoURLClick(dataelement) { // Sample callback function when you click on active item on map
        window.open(dataelement.slug, '_self')
      }
```