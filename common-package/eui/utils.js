export function isIterable(object) {
    return typeof object[Symbol.iterator] == 'function'
}
  
export function dfsTraverse(rootNode, callback) {
    const stack = [rootNode]
    while (stack.length > 0) {
        let node = stack.pop()
        callback(node)
        if (node.children) {
            stack.push(...node.children)
        }
    }
}