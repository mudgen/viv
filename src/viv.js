// cache children that can be updated
const vNodeCache = new WeakMap();



// Convert json to DOM and return a DocumentFragment of it.
export function generateDOM(json) {
  const fragment = document.createDocumentFragment();
  const stack = Array.isArray(json) ?
    [[fragment, json]] :
    [[fragment, [json]]];

  while (stack.length > 0) {
    const [parentElm, children] = stack.pop();
    for (const currentNode of children) {
      const elm = document.createElement(currentNode.tag);
      for (const key in currentNode) {
        if (typeof currentNode[key] == "object") {
          currentNode[key]["parent"] = currentNode;
        }
        switch (key) {
          case "tag":
            break;
          case "class":
            if (typeof currentNode.class == "string") {
              elm.setAttribute("class", currentNode.class);
            }
            else if (typeof currentNode.class == "object") {
              const elmClasses = Object.keys(currentNode.class)
                .filter((className) => currentNode.class[className]);
              elm.setAttribute("class", elmClasses.join(" "));
            }
            break;
          case "id":
            elm.setAttribute("id", currentNode.id);
            break;
          case "attrs":
            for (const attr_key in currentNode.attrs) {
              elm.setAttribute(attr_key, currentNode.attrs[attr_key]);
            }
            break;
          case "text":
            if (typeof currentNode.text == "function") {
              const updateFunction = (function (parentElm, func, currentThis) {
                return function (...args) {
                  const newText = func.apply(currentThis, args);
                  if (newText !== parentElm.textContent) {
                    parentElm.textContent = newText;
                  }
                };
              })(elm, currentNode.text, currentNode);
              updateFunction();
              currentNode.text = updateFunction;
              elm.Vnode = currentNode;
            }
            else {
              elm.append(currentNode.text);
            }
            break;
          case "children":
            if (typeof currentNode.children == "function") {
              const updateFunction = (function (parentElm, func, currentThis) {
                return function (...args) {
                  const newChildren = func.apply(currentThis, args);
                  const childrenCache = vNodeCache.get(parentElm) || new Map();
                  const newChildrenCache = new Map();
                  const children = Array.from(parentElm.children);
                  const root = document.createDocumentFragment();
                  for (const [index, child] of newChildren.entries()) {
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
                  vNodeCache.set(parentElm, newChildrenCache);
                };
              })(elm, currentNode.children, currentNode);
              updateFunction();
              currentNode.children = updateFunction;
              elm.Vnode = currentNode;
            }
            else if (Array.isArray(currentNode.children)) {
              stack.push([elm, currentNode.children]);
            }
            break;
          case "events":
            const parent = currentNode.events.parent;
            delete currentNode.events.parent;
            Object.assign(elm, currentNode.events);
            currentNode.parent = parent;
            break;
          case "style":
            const styles = Object.entries(currentNode.style)
              .reduce((cul, [styleName, styleValue]) => {
                cul.push(`${styleName}:${styleValue}`);
                return cul;
              }, []);
            elm.setAttribute("style", styles.join(";"));
            break;
        }
        parentElm.append(elm);
      }
    }
  }
  return fragment;
}
