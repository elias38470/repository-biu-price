// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer')//multer
const path = require('path')


//************* variable para usar multer*******/
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/images/products'))
    },
    filename: function(req,file,cb){
        console.log(file)
        const newFilename = 'product-'+Date.now()+ path.extname(file.originalname)
        cb(null,newFilename)
    }
})

const upload = multer ({ storage : storage})


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 


/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', upload.single('productImage') ,productsController.store); 




/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
