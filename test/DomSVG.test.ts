import { ClientSVGEditor } from '../src/index'

/* test('add', () => {
  expect(new DomSVG(5).add(new DomSVG(6)).val()).toBe(11)
}) */

test('start', () => {
  expect(new ClientSVGEditor('#svgmap',[],{},{}).test()).toBe(true)
})

