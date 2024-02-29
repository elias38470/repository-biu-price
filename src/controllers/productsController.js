const fs = require('fs');
const path = require('path');
const crypto = require('crypto')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { allProductos: products })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		//id = +req.params.id // el signo "+" hace que se convierta de string a number(funciona como el parseINT)
		const id = req.params.id
		const productDetail = products.find((prod) => prod.id == id)

		res.render('detail', { productDetail })
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		if (req.file) {
			const nuevoProducto = {
				id: crypto.randomUUID(),
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				category: req.body.category,
				description: req.body.description,
				image: req.file.filename,
			}

			products.push(nuevoProducto);
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));//se sobreescribe en archivo de datos 
			res.redirect('/products')
		}else{
			res.render('product-create-form')
		}
	},

	// Update - Form to edit
	edit: (req, res) => {

		const id = req.params.id

		const productActualizar = products.find((prod) => prod.id == id)


		res.render('product-edit-form', { productActualizar }) // poner productoActualizar es lo mismo q poner productoActualizar:productoActualizar
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic

		const productoActualizado = req.body;

		let index = products.indexOf(productoActualizado.id == req.params.id);

		for (let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.id) {
				index = i;
			}
		}
		products[index] = productoActualizado;
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));//se sobreescribe en archivo de datos 
		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic

		let index = -1
		for (let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.id) {
				index = i
			}
		}

		products.splice(index, 1)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));//se sobreescribe en archivo de datos 
		res.redirect('/products')


	}
};

module.exports = controller;