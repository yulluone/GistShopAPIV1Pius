const express = require("express");
const shopRouter = express.Router();
const shopController = require("../controllers/shop");
const productController = require("../controllers/products");

const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
	allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

let upload = multer({ storage, fileFilter });

shopRouter
	.route("/:userId")
   .get(shopController.getAllShopsByUserId)
	.post(upload.single("image"), shopController.createShop);

shopRouter
	.route("/:userId/:shopId")
	.get(shopController.getShopById)
	.put(upload.single("image"), shopController.updateShopById)
	.delete(shopController.deleteShopById)
	// product-routes
	.post(upload.any("image"), productController.addProductToShop);

shopRouter
	.route("/:userId/:shopId/:productId")
	.get(productController.getProductById)
	.put(upload.any("image"), productController.updateProductById)
	.delete(productController.deleteProductById);

module.exports = shopRouter;
