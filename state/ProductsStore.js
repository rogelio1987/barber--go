import { types } from 'mobx-state-tree'

const Price = types.model({
	$numberDecimal: types.string,
})
const Product = types.model({
	__v: types.number,
	_id: types.string,
	name: types.string,
	description: types.string,
	picture: types.string,
	category: types.string,
	storeCategory: types.string,
	price: Price,
	updatedAt: types.string,
	createdAt: types.string,
	qty: types.number,
})

export default ProductsStore = types
	.model({
		products: types.array(Product),
		selectedProduct: types.string,
	})
	.actions((self) => {
		return {
			addProduct(product) {
				let id = product._id
				let p = self.products
				let productToAddAlreadyInList = p.filter((x) => x._id == id)
				if (productToAddAlreadyInList.length > 0) {
					this.addQty(productToAddAlreadyInList[0])
				} else {
					product.qty = 1
					self.products.push(product)
				}

				console.log(self.products)
			},
			removeProduct(product) {
				let id = product._id
				let productsList = self.products.filter((x) => x._id !== id)
				self.products = productsList
			},
			selectProduct(id) {
				self.selectedProduct = id
			},
			addQty(product) {
				let id = product._id
				let p = self.products.filter((x) => x._id == id)
				p[0].qty += 1
			},
			removeQty(product) {
				let id = product._id
				let p = self.products.filter((x) => x._id == id)
				p[0].qty -= 1
				if (p[0].qty == 0) {
					console.log('zero')
					this.removeProduct(p[0])
				}
			},
		}
	})
	.views((self) => {
		return {
			get productCount() {
				return String(self.products.length)
			},
		}
	})
