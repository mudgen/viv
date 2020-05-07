/* eslint-disable no-unused-vars */
import { elementConstructors } from '../../src/viv.js';
const { div, h1, h2, span, button, textarea, pre, code } = elementConstructors;
const CodeMirror = window.CodeMirror;


const codeProps = {
  contentEditable: true,
  autocorrect: "off",
  autocapitalize: "off",
  spellcheck: "false",
  style: "background-color: #2D2D2D;",
}

let editorCode;
let displayCode;

const app =
  div("flex flex-col h-screen",
    h1("#header p-5 text-2xl text-indigo-900 font-medium", 'Convert HTML to Enhanced DOM Functions (EDF)'),
    div("flex-1 bg-indigo-200 text-center px-2 pb-2 m-2 grid gap-2 grid-cols-2 text-white rounded-md",
      div("flex flex-col",
        div("flex items-center",
          div("flex flex-1 justify-start",
            button("px-1 border border-transparent text-sm font-medium rounded text-gray-50 bg-indigo-400 hover:bg-indigo-300 focus:outline-none focus:border-indigo-400 focus:shadow-outline-indigo active:bg-indigo-500 transition ease-in-out duration-150",
              { "type": 'button' },
              'Insert Random Example')),
          h2("mb-1 text-xl text-indigo-900 font-medium", 'Type or paste HTML'),
          div("flex-1")),
        editorCode =
        div("h-full rounded-md shadow-inner text-left")),
      div("flex flex-col",
        h2("mb-1 text-xl text-indigo-900 font-medium", 'Copy Enhanced DOM Functions (EDF)'),
        displayCode =
        div("h-full rounded-md shadow-inner text-left")),

    ))


document.getElementById("root").replaceWith(app);


const codeMirror = CodeMirror(editorCode, { autofocus: true, mode: "xml", htmlMode: true });
const displayCodeMirror = CodeMirror(displayCode, { autofocus: true, mode: "javascript" });


function getFirstValidChild(element) {
  for (const child of element.childNodes) {
    if (child.nodeType == Node.TEXT_NODE) {
      if (/\S/.test(child.nodeValue)) {
        return child
      }
    }
    if (child.nodeType === Node.ELEMENT_NODE) {
      return child;
    }
  }
  return null;
}


let output = []
function parse(element, indent) {
  indent += 2;
  const firstChild = getFirstValidChild(element);
  let indentFirstChild = true;
  if (element.tagName) {
    output.push(element.tagName.toLowerCase());
  }
  else {
    output.push("div");
  }
  const attrs = {};
  for (const a of element.attributes) {
    attrs[a.name] = a.value;
  }
  const classes = [];
  if (attrs.id) {
    classes.push("#" + attrs.id);
    delete attrs.id;
  }
  if (attrs.class) {
    classes.push(attrs.class);
    delete attrs.class;
  }
  const attrsLength = Object.keys(attrs).length;
  if (classes.length > 0) {
    output.push(`("${classes.join(" ")}"`);
    if (firstChild || attrsLength > 0) {
      output.push(',');
    }
  }
  else {
    if (firstChild && attrsLength === 0 && firstChild.nodeType == Node.TEXT_NODE) {
      output.push(`.text(`)
      indentFirstChild = false;
    }
    else {
      output.push(`(`)
    }
  }
  if (attrsLength > 0) {
    let attrsResult = [];
    attrsResult.push('{');
    for (const key in attrs) {
      attrsResult.push(`"${key}":'${attrs[key]}', `)
    }
    const last = attrsResult.pop();
    attrsResult.push(last.slice(0, -2))
    attrsResult.push('}')
    attrsResult = attrsResult.join("");

    //const attrsResult = JSON.stringify(attrs);
    if (classes.length > 0) {
      output.push(`\n${" ".repeat(indent)}`);
    }
    output.push(attrsResult);
    if (firstChild) {
      output.push(',');
    }
  }
  if (firstChild) {
    for (const child of element.childNodes) {
      if (child.nodeType == Node.COMMENT_NODE) {
        output.push(`\n${" ".repeat(indent)}`);
        output.push("/* ");
        output.push(child.nodeValue)
        output.push("*/")
      }
      if (child.nodeType == Node.TEXT_NODE) {
        let value = child.nodeValue;
        if (/\S/.test(value)) {
          value = value.replace(/\s+/g, ' ');
          if (firstChild != child || indentFirstChild) {
            output.push(`\n${" ".repeat(indent)}`);
          }
          output.push(`'${value}',`);
        }
        else {
          //output.push(value);
        }
      }
      else if (child.nodeType == Node.ELEMENT_NODE) {
        output.push(`\n${" ".repeat(indent)}`);
        parse(child, indent)
        output.push(",");
      }
    }
    let lastChild = output.pop();
    if (lastChild.endsWith(",")) {
      lastChild = lastChild.slice(0, -1);
    }
    output.push(lastChild);
  }
  output.push(`)`);
  if (classes.length > 0) {
    indent -= 2;
  }
}

let parser = new DOMParser();

codeMirror.on("changes", function (codeMirror, changes) {
  output = [];
  let doc = parser.parseFromString(codeMirror.getValue(), "text/html");
  for (const child of doc.body.children) {
    parse(child, 0);
    output.push("\n")
  }
  const stringOutput = output.join("");
  displayCodeMirror.setValue(stringOutput);
})

