/* eslint-disable no-unused-vars */
import { generateDOM, createDOMConstructors } from "../../src/viv.js";


const { div, h1, span } = createDOMConstructors("div", "h1", "span");

const app = "test";
console.log("coeeodddl, I love this man.");
document.getElementById("root").replaceWith(generateDOM(app));


// const app2 =
// {
//   div0: "h-screen flex overflow-hidden bg-gray-100",
//   body: [{
//     div0: "md:hidden",
//     body: [{
//       div0: "fixed inset-0 flex z-40",
//       body: ["something"],
//     }],
//     div1: "flex",
//     body: "great"
//   }
// }

// const app2 =
// {
//   class: "h-screen flex overflow-hidden bg-gray-100",
//   div: [{
//     div0: "md:hidden",
//     body: [{
//       div0: "fixed inset-0 flex z-40",
//       body: ["something"],
//     }],
//     div1: "flex",
//     body: "great"
//   }
// }
const app3 = {
  class: "h-screen flex overflow-hidden bg-gray-100",
  div: [{
    class: "md:hidden",
    div: [{
      class: "fixed inset-0 flex z-40"

    }
  },


}

div("h-screen flex overflow-hidden bg-gray-100",
  div("md:hidden",
    div("fixed inset-0 flex z-40",
      div("fixed inset-0",
        div("", "absolute inset-0 bg-gray-600 opacity-75")),
      div("relative flex-1 flex flex-col max-w-xs w-full bg-gray-800"))

  ))

  < div class="h-screen flex overflow-hidden bg-gray-100" >
    <div class="md:hidden">
      <div class="fixed inset-0 flex z-40">
        <div class="fixed inset-0">
          <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
          <div class="absolute top-0 right-0 -mr-14 p-1">
            <button class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600" aria-label="Close sidebar">
              <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex-shrink-0 flex items-center px-4">
              <img class="h-8 w-auto" src="/img/logos/workflow-logo-on-dark.svg" alt="Workflow" />
            </div>
