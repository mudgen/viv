// @ts-check

function isObject(arg) {
  return Object.prototype.toString.call(arg) == "[object Object]";
}

function isVivElement(arg) {
  return isObject(arg) && arg.vivTag;
}

function exists(o, prop) {
  return prop in o || typeof o[prop] != "undefined";
}


function idOrClass(o, arg) {
  if (typeof arg === "string") {
    arg = arg.trim().split(/[\s.]+/);
    if (arg[0].startsWith("#")) {
      o.attrs.id = arg.shift().slice(1);
    }
    if (arg.length > 0) {
      o.attrs.class = arg.join(" ");
    }
    return true;
  }
  else if (arg === null) {
    return true;
  }
  return false;
}

function vivElementConstructor(tag, ...args) {
  const o = Object.create(null);
  o.vivTag = tag;
  o.attrs = {};
  o.children = [];
  if (args.length === 0) {
    return o;
  }
  if (idOrClass(o, args[0])) {
    args.shift();
  }
  for (const arg of args) {
    if (isObject(arg)) {
      if (arg.vivTag) {
        o.children.push(arg);
      }
      else {
        Object.assign(o.attrs, arg)
      }
    }
    else if (Array.isArray(arg)) {
      o.children.push.apply(o.children, arg);
    }
    else if (arg === null) {
      continue;
    }
    else {
      o.children.push(arg);
    }
  }
  return o;
}

/**
 * Creates specific vivElement constructors.
 * @param {string} tag 
 */
function vivElementConstructorFactory(tag) {
  return new Proxy(vivElementConstructor, {
    apply(target, thisArg, args) {
      return target.apply(null, [tag, ...args]);
    },
    get(target, property) {
      if (exists(target, property)) {
        return target[property];
      }
      else if (property === "text") {
        target[property] = (...args) => vivElementConstructor(tag, null, args)
        return target[property];
      }
    }
  })
}

export const vivElementConstructors = new Proxy(Object.create(null), {
  get: function (target, prop, receiver) {
    if (exists(target, prop)) {
      return target[prop];
    }
    if (typeof prop !== "string") {
      throw Error("Must be strings.")
    }
    target[prop] = vivElementConstructorFactory(prop);
    return target[prop];
  }
});

console.log("tesing here");
console.log(vivElementConstructors.something);
console.log("tesing here1");

// cache function info
const vivUpdateCache = new WeakMap();
// implment handling null values;
function addUpdateFunction(parentElm, func, currentThis) {
  return function update(...args) {
    const result = func.apply(currentThis, args);
    if (typeof result == "string") {
      const cachedNodeInfo = vivUpdateCache.get(update);
      if (!cachedNodeInfo) {
        const cachedNode = document.createTextNode(result);
        vivUpdateCache.set(update, [parentElm.childNodes.length, cachedNode]);
        parentElm.append(cachedNode);
      }
      else {
        //if(cachedNode.nodeType != Node.TEXT_NODE)
        let [position, cachedNode] = cachedNodeInfo;
        if (cachedNode.nodeType != Node.TEXT_NODE) {
          const cachedNode = document.createTextNode(result);
          vivUpdateCache.set(update, [position, cachedNode]);
          parentElm.replaceChild(cachedNode, parentElm.childNodes[position]);
        }
        else if (result !== cachedNode.textContent) {
          cachedNode.textContent = result;
        }
      }
      return;
    }
    else if (Array.isArray(result)) {
      const childrenCache = vivUpdateCache.get(update) || new Map();
      const newChildrenCache = new Map();
      const children = Array.from(parentElm.children);
      const root = document.createDocumentFragment();
      for (const [index, child] of result.entries()) {
        newChildrenCache.set(child.attrs.key, {
          vivTag: child.vivTag,
          position: index
        });
        const childCache = childrenCache.get(child.attrs.key);
        if (childCache && childCache.vivTag === child.vivTag) {
          root.append(children[childCache.position]);
        }
        else {
          root.append(generateDOM(child));
        }
      }
      while (parentElm.firstElementChild) {
        parentElm.removeChild(parentElm.firstElementChild);
      }
      parentElm.append(root);
      vivUpdateCache.set(update, newChildrenCache);
    }
    else if (isVivElement(result)) {
      const cachedNodeInfo = vivUpdateCache.get(update);
      if (!cachedNodeInfo) {
        const cachedNode = generateDOM(result);
        vivUpdateCache.set(update, [parentElm.childNodes.length, cachedNode]);
        parentElm.append(cachedNode);
      }
      else {
        let [position, cachedNode] = cachedNodeInfo;
        cachedNode = generateDOM(result);
        vivUpdateCache.set(update, [position, cachedNode]);
        parentElm.replaceChild(cachedNode, parentElm.childNodes[position]);
      }
    }
  }
}

/**
 * Convert json to DOM and return a DocumentFragment of it.
 * @param {Object|Object[]} rootVivElement 
 */
export function generateDOM(rootVivElement) {
  const fragment = document.createDocumentFragment();
  if (!Array.isArray(rootVivElement)) {
    rootVivElement = [rootVivElement];
  }
  /** @type {[[DocumentFragment|Element & {vivElement: Object}, [Object]]]}  */
  const stack = [[fragment, rootVivElement]];
  while (stack.length > 0) {
    const [parentElm, vivValues] = stack.pop();
    for (const [index, vivValue] of vivValues.entries()) {
      if (typeof vivValue == "function") {
        const update = addUpdateFunction(parentElm, vivValue, parentElm.vivElement)
        update();
        vivValues[index] = update;
        continue;
      }
      else if (typeof vivValue == "string") {
        parentElm.append(document.createTextNode(vivValue));
        continue;
      }
      else if (!isVivElement(vivValue)) {
        parentElm.append(document.createTextNode(String(vivValue)));
        continue;
      }
      const elm = document.createElement(vivValue.vivTag);
      if (vivValue.children.length > 0) {
        stack.push([elm, vivValue.children])
      }
      for (const key in vivValue.attrs) {
        if (key.startsWith("on")) {
          elm[key] = vivValue.attrs[key];
          continue;
        }
        switch (key) {
          case "class":
            if (typeof vivValue.attrs.class == "string") {
              elm.setAttribute("class", vivValue.attrs.class);
            }
            else if (isObject(vivValue.attrs.class)) {
              const elmClasses = Object.keys(vivValue.attrs.class)
                .filter((className) => vivValue.attrs.class[className]);
              elm.setAttribute("class", elmClasses.join(" "));
            }
            break;
          case "key":
            continue;
          default:
            elm.setAttribute(key, vivValue.attrs[key]);
          /*
            case "style":
            const styles = Object.entries(currentNode.style)
              .reduce((cul, [styleName, styleValue]) => {
                cul.push(`${styleName}:${styleValue}`);
                return cul;
              }, []);
            elm.setAttribute("style", styles.join(";"));
            break;
            */
        }
      }
      elm.vivElement = vivValue;
      parentElm.append(elm);

      vivValue.update = (...args) => {
        for (const child of vivValue.children) {
          if (typeof child == "function") {
            child.apply(vivValue, args);
            break;
          }
        }
      }
      vivValue.updates = (...args) => {
        for (const [index, child] of vivValue.children.entries()) {
          if (typeof child == "function") {
            if (args.length == 0) {
              child.apply(vivValue);
            }
            else {
              child.apply(vivValue, args[index]);
            }
          }
        }
      }
      vivValue.updateAll = (...args) => {
        for (const [index, child] of vivValue.children.entries()) {
          if (typeof child == "function") {
            if (args.length == 0) {
              child.apply(vivValue);
            }
            else {
              child.apply(vivValue, args[index]);
            }
          }
          else if (isVivElement(child)) {
            child.updateAll.apply(child, args);
          }
        }
      }
    }
  }
  return fragment;
}
