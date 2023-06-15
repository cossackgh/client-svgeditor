import './style.css'
import { testmylib } from './clientsvg'
const app = document.querySelector<HTMLDivElement>('#app')
if (app !== null) {
  app.innerHTML = `
    <div>
      <p class="read-the-docs">
        Example Interactive SVG map
      </p>
      <p class="read-the-docs">
        Based on <a href="https://github.com/cossackgh/client-svgeditor" target="_blank">client-svgeditor</a>
      </p>
    </div>
  `
}
const startIndex = testmylib()
console.log(startIndex)
