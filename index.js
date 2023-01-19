const Nil = 'Nil'


function Node(left, key, depth, right) {

	return {
		left, 
		key, 
		depth, 
		right,
	}
}


function leaf(key) {
	return Node(Nil, key, 1, Nil)
}


function key(node) {
	return node.key 
}


function depth(node) {
	
	return (node === Nil || node === undefined) 
		? 0 
		: node.depth
}


function after(node) {

	return node.left
		? after(node.left)
		: node
}


function insert(node, tree) {

	return (tree === Nil) && node 
		|| (key(node) < tree.key) && balance(update(Node(insert(node, tree.left), tree.key, tree.depth, tree.right)))
		|| (key(node) > tree.key) && balance(update(Node(tree.left, tree.key, tree.depth, insert(node, tree.right))))
		|| tree
}


function remove(key, tree) {

	return (tree === Nil) && Nil
		|| (key < tree.key) && balance(update(Node(remove(key, tree.left), tree.key, tree.depth, tree.right)))
		|| (key > tree.key) && balance(update(Node(tree.left, tree.key, tree.depth, remove(key, tree.right))))
		|| remove1(tree)
}


function remove1(node) {

	return ((node.left === Nil) && (node.right === Nil)) && Nil
		|| ((node.left !== Nil) && (node.right === Nil)) && node.left
		|| ((node.right !== Nil) && (node.left === Nil)) && node.right
		|| ((node.left !== Nil) && (node.right !== Nil)) && remove2(node)
}


function remove2(node) {

	let k = key(after(node.right))
	return update(Node(node.left, k, node.depth, remove(k, node.right)))
}


function balance(node) {

	let wn = weight(node)
	let wl = weight(node.left)
	let wr = weight(node.right)
	
	return ((wn === 2) && (wl > 0)) && rotateRight(node)
		|| ((wn === -2) && (wr < 0)) && rotateLeft(node)
		|| ((wn === 2) && (wl === -1)) && rotateRight(Node(rotateLeft(node.left), node.key, node.depth, node.right))
		|| ((wn === -2) && (wr === 1)) && rotateLeft(Node(node.left, node.key, node.depth, rotateRight(node.right)))
		|| node
}


function weight(node) {

	return depth(node.left) - depth(node.right)
}


function rotateRight(node) {

	return update(Node(node.left.left, node.left.key, node.left.depth, update(Node(node.left.right, node.key, node.depth, node.right))))
}


function rotateLeft(node) {

	return update(Node(update(Node(node.left, node.key, node.depth, node.right.left)), node.right.key, node.right.depth, node.right.right))
}


function update(node) {
	let d = 1 + Math.max(depth(node.left), depth(node.right))

	return Node(node.left, node.key, d, node.right)
}


module.exports = {
  Node,
  Nil,
  leaf,
  insert,
  remove,
  update,
}
