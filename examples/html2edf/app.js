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
function showExample(e) {
  codeMirror.setValue(examples[exampleIndex]);
  exampleIndex++;
  if (exampleIndex == examples.length) {
    exampleIndex = 0;
  }
}
/*
const t =
  div.class("flex flex-col h-screen",
    h1.class("#header p-5 text-2xl text-indigo-900 font-medium", 'Convert HTML to Enhanced DOM Functions (EDF)'),
    div.class("flex-1 bg-indigo-200 text-center px-2 pb-2 m-2 grid gap-2 grid-cols-2 text-white rounded-md",
      div.class("flex flex-col",
        div.class("flex items-center",
          div.class("flex flex-1 justify-start",
            button.class("px-1 border border-transparent text-sm font-medium rounded text-gray-50 bg-indigo-400 hover:bg-indigo-300 focus:outline-none focus:border-indigo-400 focus:shadow-outline-indigo active:bg-indigo-500 transition ease-in-out duration-150",
              { "type": 'button', onclick: showExample },
              'Insert Example')),
          h2.class("mb-1 text-xl text-indigo-900 font-medium", 'Type or paste HTML'),
          div.class("flex-1")),
        editorCode =
        div.class("h-full rounded-md shadow-inner text-left")),
      div.class("flex flex-col",
        h2.class("mb-1 text-xl text-indigo-900 font-medium", 'Copy Enhanced DOM Functions (EDF)'),
        displayCode =
        div.class("h-full rounded-md shadow-inner text-left")),


        const t =
        div.c("flex flex-col h-screen",
          h1.c("#header p-5 text-2xl text-indigo-900 font-medium", 'Convert HTML to Enhanced DOM Functions (EDF)'),
          div.c("flex-1 bg-indigo-200 text-center px-2 pb-2 m-2 grid gap-2 grid-cols-2 text-white rounded-md",
            div.c("flex flex-col",
              div.c("flex items-center",
                div.c("flex flex-1 justify-start",
                  button.class("px-1 border border-transparent text-sm font-medium rounded text-gray-50 bg-indigo-400 hover:bg-indigo-300 focus:outline-none focus:border-indigo-400 focus:shadow-outline-indigo active:bg-indigo-500 transition ease-in-out duration-150",
                    { "type": 'button', onclick: showExample },
                    'Insert Example')),
                h2.class("mb-1 text-xl text-indigo-900 font-medium", 'Type or paste HTML'),
                div.class("flex-1")),
              editorCode =
              div.class("h-full rounded-md shadow-inner text-left")),
            div.class("flex flex-col",
              h2.class("mb-1 text-xl text-indigo-900 font-medium", 'Copy Enhanced DOM Functions (EDF)'),
              displayCode =
              div.class("h-full rounded-md shadow-inner text-left")),
*/


const app =
  div("flex flex-col h-screen",
    h1("#header p-5 text-2xl text-indigo-900 font-medium", 'Convert HTML to Enhanced DOM Functions (EDF)'),
    div("flex-1 bg-indigo-200 text-center px-2 pb-2 m-2 grid gap-2 grid-cols-2 text-white rounded-md",
      div("flex flex-col",
        div("flex items-center",
          div("flex flex-1 justify-start",
            button("px-1 border border-transparent text-sm font-medium rounded text-gray-50 bg-indigo-400 hover:bg-indigo-300 focus:outline-none focus:border-indigo-400 focus:shadow-outline-indigo active:bg-indigo-500 transition ease-in-out duration-150",
              { "type": 'button', onclick: showExample },
              'Insert Example')),
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

const MAX_SIZE = 125;
let output = []

function out(o, indent) {
  indent += 2;
  let lineSize = indent;
  let nextOutput;
  let needsComma = false;
  if (o.classes.length > 0) {
    if (o.leadProp.length > 0) {
      nextOutput = `${o.tagName}.${o.leadProp[0]}\`${o.classes}\`(`;
      output.push(nextOutput);
      lineSize += nextOutput.length;
      if (lineSize + o.leadProp[1].length + 4 > MAX_SIZE) {
        output.push(`\n${" ".repeat(indent)}`);
        lineSize = indent;
      }
      nextOutput = `"${o.leadProp[1]}"`;
      output.push(nextOutput);
      lineSize += nextOutput.length;
      needsComma = true;
    }
    else {
      nextOutput = `${o.tagName}\`${o.classes}\`(`;
      output.push(nextOutput);
      lineSize += nextOutput.length;
    }
  }
  else {
    if (o.leadProp.length > 0) {
      nextOutput = `${o.tagName}.${o.leadProp[0]}("${o.leadProp[1]}"`;
      output.push(nextOutput);
      lineSize += nextOutput.length;
      needsComma = true;
    }
    else {
      nextOutput = `${o.tagName}(`;
      output.push(nextOutput);
      lineSize += nextOutput.length;
      needsComma = false;
    }
  }

  if (o.attrs.length > 0) {
    if (!needsComma) {
      output.push(o.attrs);
      lineSize += o.attrs.length;
      needsComma = true;
    }
    else {
      if (lineSize + o.attrs.length + 1 > MAX_SIZE) {
        output.push(`,\n${" ".repeat(indent)}`);
        lineSize = indent;
      }
      else {
        output.push(", ")
        lineSize += 2;
      }
      output.push(o.attrs);
      lineSize += o.attrs.length;
      needsComma = true;
    }
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
      let besidesString = o.classes.length > 0 || o.attrs.length > 0 || o.leadProp.length > 0;
      if (besidesString && lineSize + child.length + 4 > MAX_SIZE) {
        if (needsComma) {
          output.push(",");
          needsComma = false;
        }
        output.push(`\n${" ".repeat(indent)}`);
      }
      if (needsComma) {
        output.push(", ");
        needsComma = false;
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
        if (needsComma) {
          output.push(",");
          needsComma = false;
        }
        output.push(`\n${" ".repeat(indent)}`);
        out(child, indent)
      }
      else {
        if (needsComma) {
          output.push(", ");
          needsComma = false;
        }
        out(child, indent)
      }
    }
  }
  output.push(")");
}

function traverse(element) {
  const o = Object.create(null);
  const tagName = (element.tagName || "div").toLowerCase();
  o.tagName = tagName;
  const classes = [];
  let leadProp = [];
  let attrs = [];
  for (const a of element.attributes) {
    if (a.name === "id") {
      classes.unshift("#" + a.value);
    }
    else if (a.name === "class") {
      classes.push(a.value);
    }
    else {
      if (a.name.toLowerCase() === "href"
        && tagName === "a") {
        leadProp = ["href", a.value];
      }
      else if (a.name.toLowerCase() === "src"
        && ["script", "img"].includes(tagName)) {
        leadProp = ["src", a.value]
      }
      else if (a.name.toLowerCase() === "for"
        && tagName === "label") {
        leadProp = ["for", a.value]
      }
      else if (a.name.indexOf('-') > -1) {
        attrs.push(`"${a.name}":'${a.value}'`);
      }
      else {
        attrs.push(`${a.name}:'${a.value}'`);
      }
    }
  }
  o.attrs = "";
  if (attrs.length > 0) {
    o.attrs = `{${attrs.join(", ")}}`;
  }
  o.classes = "";
  if (classes.length > 0) {
    o.classes = classes.join(" ");
  }

  o.leadProp = leadProp;
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
  let leadPropLength = leadProp.join("").length;
  if (leadPropLength > 0) {
    // quots for value and the . for the property
    leadPropLength += 3;
  }
  o.size = o.classes.length + o.attrs.length + leadPropLength + tagName.length;
  // () around the tag name:
  o.size += 2
  if (o.classes.length === 0
    && (o.attrs.length > 0 || o.numRealChildren > 0 || leadPropLength > 0)) {
    // The v added to the tag
    o.size++;
  }
  else {
    // quotes for classes
    o.size += 2;
  }

  let itemCount = 0;
  if (o.attrs.length) {
    itemCount++;
  }
  if (o.numRealChildren > 0) {
    itemCount++;
  }
  if (leadPropLength > 0) {
    itemCount++;
  }
  if (o.classes.length > 0) {
    itemCount++;
  }
  // calculate commas and space:
  if (itemCount === 2) {
    o.size += 2;
  }
  else if (itemCount === 3) {
    o.size += 4;
  }
  else if (itemCount === 4) {
    o.size += 6;
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
      console.log(traverse(child))
      out(traverse(child), 0);
      needsNewLine = true;
    }

  }
  const stringOutput = output.join("");
  displayCodeMirror.setValue(stringOutput);
})

//<div>test<div>I know</div></div>