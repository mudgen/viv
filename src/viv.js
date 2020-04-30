

function vivValue(o, arg, position) {
  if (["string", "function"].includes(typeof arg)) {
    o.children.push(arg);
    return true;
  }
  else if (Array.isArray(arg)) {
    throw Error(`Argument number ${position} can't be an array.`);
  }
  else if (typeof arg == "object") {
    if (arg.tag) {
      o.children.push(arg);
      return true;
    }
  }
  else if (arg === null) {
    return true;
  }
  return false;
}

function idOrClass(o, arg) {
  let isIdOrClass = false;
  if (typeof arg == "string") {
    arg = arg.trim().split(/[\s\.]+/);
    if (arg[0].startsWith("#")) {
      o.id = arg.shift().slice(1);
      isIdOrClass = true;
    }
    if (arg.length > 0) {
      o.class = arg.join(" ");
      isIdOrClass = true;
    }
  }
  return isIdOrClass;
}

function attrsOrVivValue(o, arg, position) {
  let isAttrsOrVivValue = false;
  if (vivValue(o, arg, position)) {
    isAttrsOrVivValue = true;
  }
  else if (typeof arg == "object") {
    Object.assign(o, arg)
    isAttrsOrVivValue = true;
  }
  return isAttrsOrVivValue;
}

function el(tag) {
  return (...args) => {
    const o = Object.create(null);
    o.tag = tag;
    o.children = [];
    if (args.length === 0) {
      return o;
    }
    else if (args.length === 1) {
      if (!attrsOrVivValue(o, args[0], 0)) {
        throw Error("First argument is invalid.");
      }
      return o;
    }
    else if (args.length === 2) {
      if (idOrClass(o, args[0])) {
        if (!attrsOrVivValue(o, args[1], 1)) {
          throw Error("First argument is invalid.");
        }
      }
      else {
        if (!attrsOrVivValue(o, args[0], 0)) {
          throw Error("First argument is invalid.");
        }
        if (!vivValue(o, args[1], 1)) {
          throw Error("Second argument is invalid.");
        }
      }
      return o;
    }

    let offset = 0;
    if (idOrClass(o, args[0])) {
      if (!attrsOrVivValue(o, args[1], 1)) {
        throw Error("Second argument is invalid.");
      }
      offset = 2;
      args.splice(0, 2);
    }
    else {
      if (!attrsOrVivValue(o, args[0], 0)) {
        throw Error("First argument is invalid.");
      }
      args.shift();
      offset = 1;
    }
    for (const [index, arg] of args.entries()) {
      if (!vivValue(o, arg, index + offset)) {
        throw Error(`Argument ${index + offset} is invalid.`);
      }
    }
    return o;
  }
}

export function createDOMConstructors(...args) {
  return args.reduce((acc, value) => {
    acc[value] = el(value)
    return acc;
  }, {})
}


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
        newChildrenCache.set(child.key, {
          tag: child.tag,
          position: index
        });
        const childCache = childrenCache.get(child.key);
        if (childCache && childCache.tag === child.tag) {
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
    else if (typeof result == "object" && result.tag) {
      const cachedNodeInfo = vivUpdateCache.get(update);
      if (!cachedNodeInfo) {
        cachedNode = generateDOM(result);
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

// Convert json to DOM and return a DocumentFragment of it.
export function generateDOM(rootVivValue) {
  const fragment = document.createDocumentFragment();
  fragment.vivNode = null;
  const stack = Array.isArray(rootVivValue) ?
    [[fragment, rootVivValue]] :
    [[fragment, [rootVivValue]]];

  while (stack.length > 0) {
    const [parentElm, vivValues] = stack.pop();
    for (const [index, vivValue] of vivValues.entries()) {
      if (typeof vivValue == "function") {
        const update = addUpdateFunction(parentElm, vivValue, parentElm.vivNode)
        update();
        vivValues[index] = update;
        continue;
      }
      if (typeof vivValue == "string") {
        parentElm.append(document.createTextNode(vivValue));
        continue;
      }
      if (typeof vivValue != "object" || !vivValue.tag) {
        throw Error("Not a valid vivValue.");
      }
      const elm = document.createElement(vivValue.tag);
      elm.vivNode = vivValue;
      for (const key in vivValue) {
        if (typeof vivValue[key] == "object") {
          vivValue[key]["parent"] = vivValue;
        }
        if (key.startsWith("on")) {
          elm[key] = vivValue[key];
          continue;
        }

        switch (key) {
          case "tag":
            break;
          case "class":
            if (typeof vivValue.class == "string") {
              elm.setAttribute("class", vivValue.class);
            }
            else if (typeof vivValue.class == "object") {
              const elmClasses = Object.keys(vivValue.class)
                .filter((className) => vivValue.class[className]);
              elm.setAttribute("class", elmClasses.join(" "));
            }
            break;
          case "children":
            if (Array.isArray(vivValue.children)
              && vivValue.children.length > 0) {
              stack.push([elm, vivValue.children]);
            }
            break;

          default:
            elm.setAttribute(key, vivValue[key]);
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
        parentElm.append(elm);
      }
      vivValue.update = (...args) => {
        let func = null;
        for (const child of vivValue.children) {
          if (typeof child == "function") {
            func = child;
            break;
          }
        }
        if (func) {
          func.apply(vivValue, args);
        }
      }
      vivValue.updates = (...args) => {
        for (const [index, child] of vivValue.children.entries()) {
          if (typeof child == "function") {
            if (args.length == 0) {
              func.apply(vivValue);
            }
            else {
              func.apply(vivValue, args[index]);
            }
          }
        }
      }
    }
  }
  return fragment;
}
