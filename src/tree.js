class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(this.getArray(array));
    }

    getArray(array) {
        return this.mergeSort([...new Set(array)]);
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;

        const midPoint = Math.floor((start + end) / 2);
        const node = new Node(array[midPoint]);
        node.left = this.buildTree(array, start, midPoint - 1);
        node.right = this.buildTree(array, midPoint + 1, end);

        return node;
    }

    insert(value, root = this.root) {

        if (!this.root) return this.root = new Node(value);

        if (!root) return root = new Node(value);

        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }

        return root;
    }

    delete(value, root = this.root) {
        if (!root) return null;

        if (value < root.data) {
            root.left = this.delete(value, root.left);
            return root;
        } else if (value > root.data) {
            root.right = this.delete(value, root.right);
            return root;
        }

        if (!root.left) {
            return root.right;
        } else if (!root.right) {
            return root.left;
        } else {
            let parentNode = root;
            let successorNode = root.right;

            while (successorNode.left) {
                parentNode = successorNode;
                successorNode = successorNode.left;
            }

            if (parentNode !== root) {
                parentNode.left = successorNode.right;
            } else {
                parentNode.right = successorNode.right;
            }
            
            root.data = successorNode.data;

            return root;
        }
    }

    find(value, root = this.root) {
        if (!root) return false;

        if (value < root.data) {
            return this.find(value, root.left);
        } else if (value > root.data) {
            return this.find(value, root.right)
        }

        return true;
    }

    mergeSort(array) {
        if (array.length <= 1) return array;

        const midPoint = Math.round(array.length / 2);
        const leftHalf = this.mergeSort(array.slice(0, midPoint));
        const rightHalf = this.mergeSort(array.slice(midPoint));

        return this.sort(leftHalf, rightHalf);
    }

    sort(leftHalf, rightHalf) {
        const array = [];

        while (leftHalf.length > 0 && rightHalf.length > 0) {
            if (leftHalf[0] < rightHalf[0]) {
                array.push(leftHalf.shift());
            } else {
                array.push(rightHalf.shift());
            }
        }

        return array.concat(leftHalf, rightHalf);
    }

    levelOrder(callback, array = [], queue = [this.root]) {
        if (!this.root || !queue.length) return;

        const shiftedNode = queue.shift();

        if (callback) {
            callback(shiftedNode);
        } else {
            array.push(shiftedNode.data);
        }

        if (shiftedNode.left) queue.push(shiftedNode.left);
        if (shiftedNode.right) queue.push(shiftedNode.right);

        this.levelOrder(callback, array, queue);
        
        return array;
    }

    inOrder(callback, node = this.root, array = []) {
        if (!node) return;

        this.inOrder(callback, node.left, array);

        if (callback) {
            callback(node);
        } else {
            array.push(node.data);
        }

        this.inOrder(callback, node.right, array);
        
        return array;
    }

    preOrder(callback, node = this.root, array = []) {
        if (!node) return;

        if (callback) {
            callback(node);
        } else {
            array.push(node.data);
        }
        
        this.preOrder(callback, node.left, array);
        this.preOrder(callback, node.right, array);

        return array;
    }

    postOrder(callback, node = this.root, array = []) {
        if (!node) return;

        this.postOrder(callback, node.left, array);
        this.postOrder(callback, node.right, array);

        if (callback) {
            callback(node);
        } else {
            array.push(node.data);
        }

        return array;
    }

    height(node = this.root) {
        if (!node) return -1;
        
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(value, node = this.root) {
        if (!this.find(value)) return;

        let count = 0;

        if (value < node.data) {
            count = this.depth(value, node.left) + 1;
        } else if (value > node.data) {
            count = this.depth(value, node.right) + 1;
        }

        return count;
    }

    isBalanced(node = this.root) {
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.abs(leftHeight - rightHeight) <= 1;
    }

    reBalance() {
        if (!this.isBalanced()) this.root = this.buildTree(this.mergeSort(this.levelOrder()))
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