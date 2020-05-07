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

function idOrClass(element, arg) {
  if (typeof arg === "string") {
    arg = arg.trim().split(/[\s.]+/);
    if (arg[0].startsWith("#")) {
      element.setAttribute("id", arg.shift().slice(1))
    }
    if (arg.length > 0) {
      element.setAttribute("class", arg.join(" "))
    }
    return true;
  }
  else if (arg === null) {
    return true;
  }
  return false;
}

function assignProperties(element, props) {
  for (const key in props) {
    if (key === "key") {
      element.viv.key = key;
    }
    else if (typeof props[key] === "string") {
      element.setAttribute(key, props[key])
    }
    else {
      element[key] = props[key];
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



function constructElement(tag, ...args) {
  const element = document.createElement(tag);
  const vivObject = Object.create(null);
  element.viv = vivObject;
  vivObject.childFunctions = {};
  if (args.length === 0) {
    return element;
  }
  if (idOrClass(element, args[0])) {
    args.shift();
  }
  for (const arg of args) {
    addChild(element, arg)
  }
  return element;
}

/**
 * Creates specific vivElement constructors.
 * @param {string} tag 
 */
function elementConstructor(tag) {
  return new Proxy(constructElement, {
    apply(target, thisArg, args) {
      return target.apply(null, [tag, ...args]);
    },
    get(target, property) {
      if (exists(target, property)) {
        return target[property];
      }
      else if (property === "text") {
        target[property] = (...args) => constructElement(tag, null, ...args)
        return target[property];
      }
    }
  })
}

export const elementConstructors = new Proxy(Object.create(null), {
  get: function (target, prop) {
    if (exists(target, prop)) {
      return target[prop];
    }
    if (typeof prop !== "string") {
      throw Error("Must be strings.")
    }
    target[prop] = elementConstructor(prop);
    return target[prop];
  }
});



