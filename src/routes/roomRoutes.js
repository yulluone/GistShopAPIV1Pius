const express = require("express");
const roomController = require("../controllers/rooms");
const roomRouter = express.Router();


const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
	allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

let upload = multer({ storage, fileFilter });


roomRouter.route("/").get(roomController.getRoomsAllRooms);

roomRouter.route("/:userId").post(
	upload.any("productImages"),
	roomController.createRoom);

roomRouter
	.route("/rooms/:roomId")
	.get(roomController.getRoomById)
	.put(
		upload.any("productImages"),
		roomController.updateRoomById)
	.delete(roomController.deleteRoomById);
	
roomRouter
	.route("/search/:name")
	.get(
		roomController.searchForRoom
	)
	

roomRouter.route("/get/all/:userId").get(roomController.getRoomsByUserId);

roomRouter.route("/get/all/shops/:shopId").get(roomController.getRoomsByShopId);

roomRouter.route("/user/add/:roomId").put(roomController.addUserToRoom);

roomRouter.route("/user/remove/:roomId").put(roomController.removeUserFromRoom);

roomRouter.route("/speaker/remove/:roomId").put(roomController.removeSpeakerRoom);

roomRouter.route("/host/remove/:roomId").put(roomController.removeHostRoom);

roomRouter.route("/audience/remove/:roomId").put(roomController.removeUserFromAudienceRoom);

roomRouter.route("/raisedhans/remove/:roomId").put(roomController.removeRaisedHandRoom);



module.exports = roomRouter;
