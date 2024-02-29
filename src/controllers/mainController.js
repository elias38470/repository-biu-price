const fs = require('fs'); //modulo nativo que permite trabajar con archivos fileSystem
const path = require('path');//modulo para formar los path (rutas)

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const product = require('../data/productsDataBase.json')// express atomaticamente pasa un archivo json a javascrip(objeto literal)

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic

		const visitedProducts = products.filter((producto) => producto.category == "visited")
		const ofertaProducts = products.filter((producto) => producto.category == "in-sale")

		console.log(visitedProducts)
		res.render('index', {
			productosVisitados: visitedProducts,
			productosOferta: ofertaProducts
		})

	},
	search: (req, res) => {
		// Do the magic

		const buscado = req.query.keywords;// keywords es el nombre del input

		const productosBuscados = products.filter((producto) => producto.name.toLowerCase().includes(buscado.toLowerCase()));

		console.log(productosBuscados)
		res.render('results', {
			productosBuscados: productosBuscados,
			busqueda: buscado
		});
	},
};

module.exports = controller;
