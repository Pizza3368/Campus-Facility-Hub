const express = require('express');
const middlewares = require('../backendMiddlewares/middleware');
const userService = require('../backendServices/userService');
const router = express.Router();

router.use(middlewares.checkDBConnection);

router.post("/registerUser", async (req, res) => {
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const streetName = req.body.address.streetName;
    const province = req.body.address.province;
    const city = req.body.address.city;
    const postalCode = req.body.address.postalCode;
    const sin = req.body.sin;
    const userType = req.body.userType;

    if (userType === "other") {
        const isInserted = await userService.insertOtherUser(firstName, lastName, streetName, city, province, postalCode, sin);
        if (isInserted) {
            res.status(200).json({
                message: "User registration successful."
            });
        }
        else {
            res.status(500).json({
                message: "User registration failed."
            });
        }
    }
})

module.exports = router;