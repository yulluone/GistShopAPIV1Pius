const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const value = {
	type: String,
	required: true,
};

const billingSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		street: value,
		zipCode: value,
	},
	{ timestamps: true, autoIndex: true, autoCreate: true }
);

const billingModel = model("billing", billingSchema);
module.exports = billingModel;