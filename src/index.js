import Tree from "./tree";

const randomArray = (size) => {
    return Array.from({length: size}, () => Math.floor(Math.random() * 100));
}

const unbalanceTree = (tree, size) => {
    for (let i = 0; i < size; i++) {
        const randomNumber = Math.floor(Math.random() * (1000 - 101) + 101);
        tree.insert(randomNumber);
    }
}

const driver = new Tree(randomArray(10));
driver.prettyPrint();
console.log('Is balanced?', driver.isBalanced());
console.log('Level Order:', driver.levelOrder());
console.log('Preorder:', driver.preOrder());
console.log('Inorder:', driver.inOrder());
console.log('Postorder:', driver.postOrder());

unbalanceTree(driver, 10);

driver.prettyPrint();
console.log('Is balanced?', driver.isBalanced());
driver.reBalance();
console.log('Balancing Tree...');
driver.prettyPrint();
console.log('Is balanced?', driver.isBalanced());
console.log('Level Order:', driver.levelOrder());
console.log('Preorder:', driver.preOrder());
console.log('Inorder:', driver.inOrder());
console.log('Postorder:', driver.postOrder());