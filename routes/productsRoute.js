import  express  from "express";
const  router=express.Router()
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middilewares/authMiddileware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, updateProductController } from "../controllers/productController.js";

router.post('/create-product',requireSignIn,isAdmin,  formidable(),createProductController)
router.get('/get-allproducts',getProductController)
router.get('/get-product/:slug',getSingleProductController)
router.put('/update-product/:id',updateProductController)
router.delete('/delete-product/:id',deleteProductController)



export default router