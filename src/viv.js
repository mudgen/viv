// @ts-check

function isObject(arg) {
  return Object.prototype.toString.call(arg) == "[object Object]";
}

function exists(o, prop) {
  return prop in o || typeof o[prop] != "undefined";
}


// cache function info
const vivUpdateCache = new WeakMap();
// implment handling null values;
function addUpdateFunction(element, func) {
  return function update(...args) {
    let result = func.apply(element, args);
    if (Array.isArray(result)) {
      const childrenCache = vivUpdateCache.get(update) || new Map();
      const newChildrenCache = new Map();
      const children = Array.from(element.children);
      const root = document.createDocumentFragment();
      for (const [index, child] of result.entries()) {
        let childCache = null;
        if (child instanceof Element && child.viv.key) {
          newChildrenCache.set(child.viv.key, {
            tagName: child.tagName,
            position: index
          });
          childCache = childrenCache.get(child.viv.key);
        }
        if (childCache && childCache.tagName === child.tagName) {
          root.append(children[childCache.position]);
        }
        else {
          if (child instanceof Element) {
            root.append(child);
          }
          else if (typeof child == "string") {
            root.append(document.createTextNode(child));
          }
          else {
            root.append(document.createTextNode(String(child)));
          }
        }
      }
      while (element.firstElementChild) {
        element.removeChild(element.firstElementChild);
      }
      element.append(root);
      vivUpdateCache.set(update, newChildrenCache);
    }
    else {
      if (typeof result === "string") {
        result = document.createTextNode(result);
      }
      const cachedNode = vivUpdateCache.get(update);
      vivUpdateCache.set(update, result);
      if (!cachedNode) {
        element.append(result);
      }
      else {
        element.replaceChild(result, cachedNode);
      }
    }
  }
}


/**
 * @param {Element} element
 * @param {{ [x: string]: any; }} props
 */
function assignProperties(element, props) {
  for (const key in props) {
    let value = props[key];
    if (key === "key") {
      element.viv.key = value;
    }
    else if (typeof value === "string") {
      if (key === "class") {
        value = value.trim().split(/[\s.]+/);
        if (value.length == 0) {
          continue;
        }
        if (value[0].startsWith("#")) {
          element.setAttribute("id", value.shift().slice(1))
        }
        if (value.length > 0) {
          element.setAttribute("class", value.join(" "))
        }
      }
      else {
        console.log(element);
        console.log(key)
        console.log(value)
        console.log("--")
        element.setAttribute(key, value)
      }
    }
    else {
      element[key] = value;
    }
  }
}



function addChild(element, child) {
  if (Array.isArray(child)) {
    for (const grandChild of child) {
      addChild(element, grandChild);
    }
  }
  else if (child instanceof Element) {
    element.append(child);
  }
  else if (isObject(child)) {
    assignProperties(element, child)
  }
  else if (typeof child == "function") {
    if (child.isProxy) {
      addChild(element, child());
    }
    else {
      const update = addUpdateFunction(element, child)
      update();
      if (child.name) {
        element.viv.childFunctions[child.name] = update
      }
      else {
        const length = Object.keys(element.viv.childFunctions)
          .filter((value) => typeof value === "number").length;
        element.viv.childFunctions[length] = update
      }
    }
  }
  else if (typeof child == "string") {
    element.append(document.createTextNode(child));
  }
  else if (child === null) {
    return;
  }
  else {
    element.append(document.createTextNode(String(child)));
  }
}



/**
 * @param {string} tagName
 * @param {any[]} args
 */
function constructElement(tagName, ...args) {

  tagName = tagName.toLowerCase();
  const element = ["svg", "path", "title"].includes(tagName) ?
    document.createElementNS("http://www.w3.org/2000/svg", tagName) :
    document.createElement(tagName.toLowerCase());
  const vivObject = Object.create(null);
  element.viv = vivObject;
  vivObject.childFunctions = {};
  for (const arg of args) {
    addChild(element, arg)
  }
  return element;
}

/*
For attribute replace hyphins with camel case.  my-option becomes myOption.
Make HTML, HEAD and BODY functions automatically replace the existing ones in the document (brilliant!)
Special style tag.

img("something").src("something").alt("mytext")

img`something`.src('interestinglinkurl').alt`how do you know?`("my text");

img.src`interestinglinkurl`.alt`how do you know?`("my text");

<img src="interestinglinkurl" alt="howdoyou now?"> something </img>

*/




/*

  li(a.href`grey-text text-lighten-3`("#!", "Link 1")),
  li(a.href`grey-text text-lighten-3`("#!", "Link 2")),
  li(a.href`grey-text text-lighten-3`("#!", "Link 3")),
  li(a.href`grey-text text-lighten-3`("#!", "Link 4")))))),

  li(a`grey-text text-lighten-3`.href`#!`("Link 1")),
  li(a`grey-text text-lighten-3`.href`#!`("Link 2")),
  li(a`grey-text text-lighten-3`.href`#!`("Link 3")),
  li(a`grey-text text-lighten-3`.href`#!`("Link 4"))))))
   
  li(a`grey-text text-lighten-3`({href:"#1"}, "Link 1")),
  li(a`grey-text text-lighten-3`({href:"#1"}, "Link 2")),
  li(a`grey-text text-lighten-3`({href:"#1"}, "Link 3")),
  li(a`grey-text text-lighten-3`({href:"#1"}, "Link 4"))))))
     
  <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
  <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
  <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
  <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>


  <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
  <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
  <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
  <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>


   li(a`grey-text text-lighten-3`.href`#!`("Link 1")),
   li(a`grey-text text-lighten-3`.href`#!`("Link 2")),
   li(a`grey-text text-lighten-3`.href`#!`("Link 3")),
   li(a`grey-text text-lighten-3`.href`#!`("Link 4"))))))
  */

// img`something`.src('interestinglinkurl').alt`how do you know?`("my text");

//img.src`interestinglinkurl`.alt`myimage`;

function joinStringsAndArgs(args) {
  const [strings, ...templateArgs] = args;
  const result = [];
  for (const [index, s] of strings.entries()) {
    result.push(s);
    result.push(templateArgs[index])
  }
  return result.join("");
}

/**
 * Creates specific vivElement constructors.
 * @param {string} tag
 * @param {string} prop
 * @param {{ [x: string]: any; }} props
 */
function elementConstructor(tag, prop, props) {
  const proxy = new Proxy(constructElement, {
    apply(target, thisArg, args) {
      if (args.length > 0 && Array.isArray(args[0])
        && Object.isFrozen(args[0])) {
        let propsCopy = Object.assign({}, props);
        propsCopy[prop || "class"] = joinStringsAndArgs(args);
        prop = "";
        return elementConstructor(tag, "", propsCopy);
      }
      else if (prop) {
        let propsCopy = Object.assign({}, props);
        propsCopy[prop || "class"] = args[0];
        prop = "";
        return elementConstructor(tag, "", propsCopy);
      }
      else {
        return target.apply(null, [tag, props, ...args]);
      }
    },
    get(target, property) {
      if (exists(target, property)) {
        return target[property];
      }
      else if (typeof property === "string") {
        let propsCopy = Object.assign({}, props);
        return elementConstructor(tag, property, propsCopy);
      }
    }
  })
  proxy.isProxy = true;
  return proxy;
}


export const elementConstructors = new Proxy(Object.create(null), {
  get: function (target, prop) {
    if (exists(target, prop)) {
      return target[prop];
    }
    if (typeof prop !== "string") {
      throw Error("Must be strings.")
    }
    target[prop] = elementConstructor(prop, "", {});
    return target[prop];
  }
});



