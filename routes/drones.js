const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");

// require the Drone model here

router.get("/drones", (req, res, next) => {
	// Iteration #2: List the drones
	Drone.find()
		.then((dbDrones) => {
			console.log("THESE ARE THE DRONES", dbDrones);
			res.render("drones/list", { drones: dbDrones });
		})
		.catch((err) => {
			console.log("something went wrong", err);
			next(err);
		});
});

router.get("/drones/create", (req, res, next) => {
	res.render("drones/create-form");
});

router.post("/drones/create", (req, res, next) => {
	// Iteration #3: Add a new drone
	const { name, propellers, maxSpeed } = req.body;

	Drone.create({
		name,
		propellers,
		maxSpeed,
	})
		.then((createdDrone) => {
			console.log(createdDrone);
			res.redirect("/drones");
		})
		.catch((err) => {
			console.log("something went wrong", err);
			next(err);
		});
});

router.get("/drones/:id/edit", (req, res, next) => {
	// Iteration #4: Update the drone
	const droneId = req.params.id;

	Drone.findById(droneId)
		.then((drone) => {
			console.log(drone);
			res.render("drones/update-form", drone);
		})
		.catch((err) => {
			console.log("something went wrong", err);
			next(err);
		});
});

router.post("/drones/:id/edit", (req, res, next) => {
	// Iteration #4: Update the drone
	const droneId = req.params.id;
	const { name, propellers, maxSpeed } = req.body;

	Drone.findByIdAndUpdate(
		droneId,
		{ name, propellers, maxSpeed },
		{ new: true }
	)
		.then((updatedDrone) => {
			console.log(updatedDrone);
			res.redirect("/drones");
		})
		.catch((err) => {
			console.log("something went wrong", err);
			next(err);
		});
});

router.post("/drones/:id/delete", (req, res, next) => {
	// Iteration #5: Delete the drone
	const droneId = req.params.id;

	Drone.findByIdAndDelete(droneId)
		.then(() => {
			res.redirect("/drones");
		})
		.catch((err) => {
			console.log("something went wrong", err);
			next(err);
		});
});

module.exports = router;
