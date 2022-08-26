import './style.css'
import { setupCounter,testmylib } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p class="read-the-docs">
      Example Interactive SVG map
    </p>
  </div>
`
testmylib();

