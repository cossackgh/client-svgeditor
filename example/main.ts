import './style.css'
import { testmylib } from './clientsvg'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p class="read-the-docs">
      Example Interactive SVG map
    </p>
  </div>
`

const startIndex = testmylib()
console.log(startIndex)
