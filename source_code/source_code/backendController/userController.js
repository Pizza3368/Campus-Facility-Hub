const express = require('express');
const middlewares = require('../backendMiddlewares/middleware');
const userService = require('../backendServices/userService');
const router = express.Router();

/* Ensure database is connected every time a request is made.*/
router.use(middlewares.checkDBConnection);

router.post("/registerUser", async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const streetName = req.body.address.streetName;
    const province = req.body.address.province;
    const city = req.body.address.city;
    const postalCode = req.body.address.postalCode;
    const sin = req.body.sin;
    const userType = req.body.userType;

    /* register as other user.*/
    if (userType === "other") {
        const isInserted = await userService.insertOtherUser(firstName, lastName, streetName, city, province, postalCode, sin);
        if (isInserted.success === true) {
            res.status(200).json({
                message: "User registration successful.",
                userId: isInserted.userID
            });
        }
        else {
            res.status(500).json({
                message: "User registration failed."
            });
        }
    }

    /* register as manager.*/
    else if (userType === "manager") {
        const workExperience = req.body.workExperience;
        const isInserted = await userService.insertManager(firstName, lastName, streetName, city, province, postalCode, workExperience, sin);
        if (isInserted.success === true) {
            res.status(200).json({
                message: "Manager registration successful",
                userId: isInserted.userID
            });
        }else {
            res.status(500).json({
                message: "Manager registration failed."
            })
        }
    }

    /* register as staff memeber.*/
    else if (userType === "staff") {
        const role = req.body.role;
        const isInserted = await userService.insertStaffMember(firstName, lastName, streetName, city, province, postalCode, role, sin);
        if (isInserted.success === true) {
            res.status(200).json({
                message: "Staff Member registration successful",
                userId: isInserted.userID
            });
        }
        else {
            res.status(500).json({
                message: "Staff Member registration failed",
            });
        }
    }

    /* register as event organizer */
    else if (userType === "organizer") {
        const organizerLevel = req.body.organizerLevel;
        const isInserted = await userService.insertEventOrganizer(firstName, lastName, streetName, city, province, postalCode, organizerLevel, sin);
        if (isInserted.success === true) {
            res.status(200).json({
                message: "Event organizer registration successful.",
                userId: isInserted.userID
            })
        }
        else {
            res.status(500).json({
                message: "Event organizer registration failed."
            })
        }
    }

    else {
        res.status(500).json({
            message: "User is not a valid user type."
        })
    }
});

router.post("/loginUser", async (req, res) => {
    const firstName = req.body.firstName;
    const sin = req.body.sin;
    const result = await userService.getUserBySinAndFirstName(firstName, sin);
    if (result.success === true) {
        res.status(200).json({
            user: result.data
        });
    }
    else {
        res.status(500).json({
            message: "User does not exist"
        })
    }
    
});

module.exports = router;