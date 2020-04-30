import { generateDOM, createDOMConstructors } from "../../src/viv.js";

const { div } = createDOMConstructors("div")

const app =
  div("max-w-7xl mx-auto sm:px-6 lg:px-8",
    "Awesome!");

console.log(app)


document.getElementById("root").replaceWith(generateDOM(app));