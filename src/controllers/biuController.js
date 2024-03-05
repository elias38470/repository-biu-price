const fs = require('fs'); //modulo nativo que permite trabajar con archivos fileSystem
const path = require('path');//modulo para formar los path (rutas)

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const product = require('../data/productsDataBase.json')// express atomaticamente pasa un archivo json a javascrip(objeto literal)

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    home: (req,res)=>{
        res.render('biuPage')
    }
}

module.exports = controller;