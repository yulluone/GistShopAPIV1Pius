const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const decode = require("../shared/base64");

const value = {
	type: String,
	required: [true, "This field is required"],
};

const productSchema = new Schema(
	{
		name: value,
		price: {
			type: Number,
			required: "Price field is required",
		},
		quantity: {
			type: Number,
			min: 0,
			required: true,
		},
		images: 
			{
				type: Array,
			},
		
		description: 
			{
				type: String,
			},
		shopId: {
			type: mongoose.Types.ObjectId,
			required: true,
         ref: "shop"
		},
		ownerId: {
			type: Schema.Types.ObjectId,
			required: true,
         ref: "user"
		},
	},
	{ timestamps: true, autoIndex: true, autoCreate: true }
);

productSchema.pre("save", function (next) {
	//store in folder
	decode(this.images, this._id);
	const product = this;
	const images = product.images.map(
		(img) => `${Date.now()}_${this._id}.png`
	);
	this.images = images;
	next();
});

productSchema.pre("findOneAndUpdate", function (next) {
	const product = this;
	
	console.log(this._update)

	if (this._update.$push != null) {
		decode(this._update.$push.images, this._conditions._id);
		const images = product._update.$push.images.map(
			(img) =>
			`${Date.now()}_${this._conditions._id}.png`
			);
		this._update.$push.images = images;
	}else if (this._update.$set.images != null) {
		decode(this._update.$set.images, this._conditions._id);
		const images = product._update.$set.images.map(
			(img) =>
				`${Date.now()}_${this._conditions._id}.png`
		);
		this._update.$set.images = images;
	}

	next();
});

const products = model("product", productSchema);

module.exports = products;
