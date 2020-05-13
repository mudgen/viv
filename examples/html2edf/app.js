/* eslint-disable no-unused-vars */
import { elementConstructors } from '../../src/viv.js';
import { examples } from "./examples.js";
//const { h1: { text: h1t }, div, h1, h2, span, button, textarea, pre, code } = elementConstructors;

const { div, h1, h1t, h2, span, button, textarea, pre, code } = elementConstructors;

const CodeMirror = window.CodeMirror;

//console.log(h1t("cool!"))
const codeProps = {
  contentEditable: true,
  autocorrect: "off",
  autocapitalize: "off",
  spellcheck: "false",
  style: "background-color: #2D2D2D;",
}

let editorCode;
let displayCode;

let exampleIndex = 0;
let target;
function showExample(e) {
  console.log(`clicked!!`);
  console.log(e);
  console.log(e.target == target);
  target = e.target;
  codeMirror.setValue(examples[exampleIndex]);
  exampleIndex++;
  if (exampleIndex == examples.length) {
    exampleIndex = 0;
  }
}

const app =
  div`flex flex-col h-screen`(
    h1`#header p-5 text-2xl text-indigo-900 font-medium`("Convert HTML to Lscript"),
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
        h2`mb-1 text-xl text-indigo-900 font-medium`("Copy Lscript"),
        div.id`jsEditor`.class`h-full rounded-md shadow-inner text-left`()),

    ))


document.getElementById("root").replaceWith(app);

const codeMirror = CodeMirror(document.getElementById("htmlEditor"), { autofocus: true, mode: "xml", htmlMode: true });
const displayCodeMirror = CodeMirror(document.getElementById("jsEditor"), { autofocus: true, mode: "javascript", addModeClass: true });

const MAX_SIZE = 125;
let output = []

function out(o, indent) {
  indent += 2;
  let lineSize = indent;
  let nextOutput;
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
        out(child, indent, false);
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

codeMirror.on("changes", function (codeMirror, changes) {
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