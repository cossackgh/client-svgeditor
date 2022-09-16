# Simple Client for SVG Editor
## Install
``` npm install svgeditor-simple-client```

## Use Client
```javascript
import { ClientSVGEditor } from 'svgeditor-simple-client'
```
## OR Use Client from vanilla js
```html
<link rel="stylesheet"  href="./css/style.css" />
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
          title: 'Пример карты', // Head Title this map
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

      const startMap = map.start(); // Start map

      function gotoURLClick(dataelement) { // Sample callback function when you click on active item on map
        window.open(dataelement.slug, '_self')
      }
```