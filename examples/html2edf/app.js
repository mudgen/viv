/* eslint-disable no-unexpected-multiline */
// @ts-check
import { elementConstructors } from '../../src/viv.js';
import { examples } from "./examples.js";
//const { h1: { text: h1t }, div, h1, h2, span, button, textarea, pre, code } = elementConstructors;

const { svg, path, title, body, div, h1, h2, button } = elementConstructors;

// @ts-ignore
const CodeMirror = window.CodeMirror;


let exampleIndex = 0;
// eslint-disable-next-line no-unused-vars
function showExample(e) {
  codeMirror.setValue(examples[exampleIndex]);
  exampleIndex++;
  if (exampleIndex == examples.length) {
    exampleIndex = 0;
  }
}

function copyScript(e) {
  const text = displayCodeMirror.getValue();
  navigator.clipboard.writeText(text);
  e.currentTarget.blur();
}

function clearText() {
  codeMirror.setValue("");
  return false;
}


//let h = h1`#header p-5 text-2xl text-indigo-900 font-medium cursor-pointer`.onclick`${clearText}`("hello world");

const app =
  body`bg-indigo-100`(
    div`flex flex-col h-screen`(
      h1`#header p-5 text-2xl text-indigo-900 font-medium cursor-pointer`.onclick(clearText)
        ("Convert HTML to Lscript"),
      div`flex-1 bg-indigo-200 text-center px-2 pb-2 m-2 grid gap-2 grid-cols-2 text-white rounded-md`(
        div`flex flex-col`(
          div`flex items-center`(
            div`flex flex-1 justify-start`(
              button`px-1 border border-transparent text-sm font-medium rounded text-gray-50 bg-indigo-400 hover:bg-indigo-300 focus:outline-none focus:border-indigo-400 focus:shadow-outline-indigo active:bg-indigo-500`(
                { "type": 'button', onclick: showExample },
                'Insert Example')),
            h2`mb-1 text-xl text-indigo-900 font-medium`("Type or paste HTML"),
            div`flex-1`),
          div.id`htmlEditor`.class`h-full rounded-md shadow-inner text-left`()),
        div`flex flex-col`(
          div`flex items-center justify-center`(
            div`flex justify-center items-center`(
              h2`mb-1 text-xl text-indigo-900 font-medium`("Copy Lscript"),
              button`ml-2 text-indigo-500 hover:text-indigo-800`.onclick(copyScript)(
                svg`w-6 h-6 fill-current`.xmlns`http://www.w3.org/2000/svg`.viewBox`0 0 20 20`(
                  title("Copy"),
                  path.d`M6 6V2c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h4zm2 0h4a2 2 0 0 1 2 2v4h4V2H8v4zM2 8v10h10V8H2z`)))),
          div.id`jsEditor`.class`h-full rounded-md shadow-inner text-left`()),
      )))


//document.getElementById("root").replaceWith(app);
document.body = app;

const codeMirror = CodeMirror(document.getElementById("htmlEditor"), { mode: "xml", htmlMode: true, placeholder: "Type or paste HTML..." });
const displayCodeMirror = CodeMirror(document.getElementById("jsEditor"), { mode: "javascript", addModeClass: true });

const MAX_SIZE = 125;
let output = []

function out(o, indent) {
  indent += 2;
  let lineSize = indent;
  let needsComma = false;

  output.push(o.tagName);
  lineSize += o.tagName.length;

  for (const [index, attr] of o.attrs.entries()) {
    if (index > 0 && lineSize + attr.length > MAX_SIZE) {
      output.push(`\n${" ".repeat(indent)}`);
      lineSize = indent;
    }
    output.push(attr);
    lineSize += attr.length
  }
  if (o.children.length > 0) {
    output.push("(");
    lineSize += 1;
  }

  if (o.hasMultipleChildren) {
    for (const child of o.children) {
      if (needsComma) {
        output.push(",");
        needsComma = false;
      }
      output.push(`\n${" ".repeat(indent)}`);
      if (typeof child === "string") {
        output.push(`"${child}"`);
        needsComma = true;
      }
      else if (child.nodeType) {
        output.push("/* ");
        output.push(child.nodeValue)
        output.push("*/")
      }
      else {
        out(child, indent);
        needsComma = true;
      }
    }
  }
  else if (o.children.length === 1) {
    let child = o.children[0];
    if (typeof child === "string") {
      if (o.attrs.length > 0 && lineSize + child.length + 4 > MAX_SIZE) {
        output.push(`\n${" ".repeat(indent)}`);
      }
      output.push(`"${child}"`);
    }
    else if (child.nodeType) {
      output.push(`\n${" ".repeat(indent)}`);
      output.push("/* ");
      output.push(child.nodeValue)
      output.push("*/")
    }
    else {
      if (lineSize + child.size + 2 > MAX_SIZE) {
        output.push(`\n${" ".repeat(indent)}`);
        out(child, indent)
      }
      else {
        out(child, indent)
      }
    }
  }
  if (o.children.length > 0) {
    output.push(")");
  }
}

function camelCase(hyphenText) {
  return hyphenText.split("-")
    .map((text, index) => {
      if (index == 0) {
        return text;
      }
      else {
        text.charAt(0).toUpperCase() + text.slice(1)
      }
    })
    .join("")
}


function traverse(element) {
  const o = Object.create(null);
  const tagName = (element.tagName || "div").toLowerCase();
  o.tagName = tagName;
  let classes = "";
  o.attrs = [];
  for (const a of element.attributes) {
    if (a.name === "id") {
      classes = `#${a.value} ${classes}`;
    }
    else if (a.name === "class") {
      classes += a.value;
    }
    else {
      let name = a.name;
      if (name.indexOf('-') > -1) {
        name = camelCase(name);
      }
      o.attrs.push(`.${name}\`${a.value}\``);
    }
  }
  if (classes.length > 0) {
    o.attrs.unshift(`\`${classes.replace(/\s+/g, ' ')}\``)
  }

  o.children = [];
  o.numRealChildren = 0;
  for (const childNode of element.childNodes) {
    if (childNode.nodeType == Node.COMMENT_NODE) {
      o.children.push(childNode);
    }
    else if (childNode.nodeType == Node.TEXT_NODE) {
      let value = childNode.nodeValue;
      if (/\S/.test(value)) {
        value = value.replace(/\s+/g, ' ');
        o.children.push(value);
        o.numRealChildren++;
      }
    }
    else if (childNode.nodeType == Node.ELEMENT_NODE) {
      o.children.push(traverse(childNode));
      o.numRealChildren++;
    }
  }
  o.hasMultipleChildren = false;

  o.size = o.attrs.join("").length + tagName.length;
  if (o.numRealChildren > 0) {
    // () around the tag name:
    o.size += 2
  }

  if (o.children.length > 1) {
    o.hasMultipleChildren = true;
  }
  else if (o.children.length === 1) {
    let child = o.children[0];
    if (typeof child === "string") {
      o.size += child.length;
      // plus quotes on string
      o.size += 2;
    }
    else if (!child.nodeType) {
      o.hasMultipleChildren = child.hasMultipleChildren;
      o.size += child.size;
    }
  }
  return o;
}

let parser = new DOMParser();

codeMirror.on("changes", function (codeMirror) {
  output = [];
  let needsNewLine = false;
  let doc = parser.parseFromString(codeMirror.getValue(), "text/html");
  for (const child of doc.childNodes) {
    if (needsNewLine) {
      output.push("\n");
      needsNewLine = false;
    }
    if (child.nodeType == Node.COMMENT_NODE) {
      output.push("/* ");
      output.push(child.nodeValue)
      output.push("*/")
      needsNewLine = true;
    }
  }
  for (const child of doc.body.childNodes) {
    if (needsNewLine) {
      output.push("\n");
      needsNewLine = false;
    }
    if (child.nodeType == Node.COMMENT_NODE) {
      output.push("/* ");
      output.push(child.nodeValue)
      output.push("*/")
      needsNewLine = true;
    }
    else if (child.nodeType == Node.ELEMENT_NODE) {
      //parse(child, null, 0);
      //output.push("\n")      
      out(traverse(child), 0);
      needsNewLine = true;
    }

  }
  const stringOutput = output.join("");
  displayCodeMirror.setValue(stringOutput);
})

//<div>test<div>I know</div></div>