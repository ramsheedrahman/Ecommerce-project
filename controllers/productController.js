import productSchema from "../model/productSchema.js";
import categoryschema from "../model/categoryschema.js";
import slugify from "slugify";
import fs from 'fs'
import mongoose from "mongoose";

export const createProductController = async (req, res) => {
    try {
      const { name, description, price, quantity,category, shipping } =
        req.fields;
      const { photo } = req.files;
      //alidation
       

      if (!name) {
        return res.status(500).send({ error: "Name is Required" });
    }
    if (!description) {
        return res.status(500).send({ error: "Description is Required" });
    }
    if (!price) {
        return res.status(500).send({ error: "Price is Required" });
    }
    if (!category) {
        return res.status(500).send({ error: "Category is Required" });
    }
    if (!quantity) {
        return res.status(500).send({ error: "Quantity is Required" });
    }
    
if(photo && photo.size > 1000000){
return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
}

  
      const products = new productSchema({ ...req.fields, slug: slugify(name) });
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
        console.log(products.photo.data);
        console.log(products.photo.contentType );
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Created Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in crearing product",
      });
    }
  };
  export const getProductController = async (req, res) => {
    try {
      const products = await Product
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        counTotal: products.length,
        message: "ALlProducts ",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting products",
        error: error.message,
      });
    }
  };
  export const getSingleProductController = async (req, res) => {
    try {
      const product = await Product
        .findOne({ slug: req.params.slug })
        .select("-photo")
        .populate("category");
      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single product",
        error,
      });
    }
  };
  export const productPhotoGetController=(req,res)=>{
     try {
      const product=productSchema.findById(req.params.id).select("photo")
      if(product.photo.data){
        res.set('Content-type',product.photo.contentType)
        return res.status(200).send(product.photo.data)
      }
     } catch (error) {
      return res.status(500).send({
        success:false,
        message:'Error in Get Photo',
        error
      })
     }
  }
  export const deleteProductController = async (req, res) => {
    try {
      await productModel.findByIdAndDelete(req.params.pid)
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };
  export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = await productModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  };
  