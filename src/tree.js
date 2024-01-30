class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(this.sortArray(array));
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;

        const midPoint = Math.floor((start + end) / 2);
        const node = new Node(array[midPoint]);
        node.left = this.buildTree(array, start, midPoint - 1);
        node.right = this.buildTree(array, midPoint + 1, end);

        return node;
    }

    insert(value, node = this.root) {
        if (!node) return new Node(value);

        if (value < node.data) {
            node.left = this.insert(value, node.left);
        } else if (value > node.data) {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    delete(value, node = this.root) {
        if (!node) return null;

        if (value < node.data) {
            node.left = this.delete(value, node.left);
            return node;
        } else if (value > node.data) {
            node.right = this.delete(value, node.right);
            return node;
        }

        if (!node.left) {
            return node.right;
        } else if (!node.right) {
            return node.left;
        } else {
            let successorNode = node.right
    
            while (successorNode.left) {
                successorNode = successorNode.left
            }
    
            node.data = successorNode.data;
            node.right = this.delete(successorNode.data, node.right);
    
            return node;
        }
    }

    find(value, node = this.root) {
        if (!node) return false;

        if (value < node.data) {
            return this.find(value, node.left);
        } else if (value > node.data) {
            return this.find(value, node.right);
        }

        return node;
    }

    levelOrder(callback, array = [], queue = [this.root]) {
        if (!queue.length) return;

        const shiftedNode = queue.shift();

        if (callback) {
            callback(shiftedNode);
        } else {
            array.push(shiftedNode.data);
        }
        
        
        if (shiftedNode.left) queue.push(shiftedNode.left);
        if (shiftedNode.right) queue.push(shiftedNode.right);

        this.levelOrder(callback, array, queue);

        if (!callback) return array;
    }

    preOrder(callback, array = [], node = this.root) {
        if (!node) return;

        if (callback) {
            callback(node);
        } else {
            array.push(node.data);
        }
        this.preOrder(callback, array, node.left);
        this.preOrder(callback, array, node.right);
        
        if (!callback) return array;
    }

    inOrder(callback, array = [], node = this.root) {
        if (!node) return;

        this.inOrder(callback, array, node.left)
        if (callback) {
            callback(node);
        } else {
            array.push(node.data);
        }
        this.inOrder(callback, array, node.right)

        if (!callback) return array;
    }

    postOrder(callback, array = [], node = this.root) {
        if (!node) return;

        this.postOrder(callback, array, node.left);
        this.postOrder(callback, array, node.right);
        if (callback) {
            callback(node);
        } else {
            array.push(node.data);
        }

        if (!callback) return array;
    }

    height(node = this.root) {
        if (!node) return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    heightForNode(value) {
        return this.height(this.find(value));
    }

    depth(value, node = this.root, depth = 0) {
        if (!this.find(value)) return null;

        if (value < node.data) {
            return this.depth(value, node.left, depth += 1);
        } else if (value > node.data) {
            return this.depth(value, node.right, depth += 1);
        }

        return depth;
    }

    isBalanced(node = this.root) {
        if (!node) return false;

        const leftTree = this.height(node.left);
        const rightTree = this.height(node.right);

        return Math.abs(leftTree - rightTree) <= 1;
    }

    reBalance() {
        if (!this.isBalanced()) this.root = this.buildTree(this.sortArray(this.inOrder()))
    }

    sortArray(array) {
        return [... new Set(array)].sort((a, b) => a - b);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
}