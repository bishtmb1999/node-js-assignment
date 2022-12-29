const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")

const Authentication = require('../middleware/auth').Authentication


// USER's APIs ->
router.post("/user", userController.createUser)
router.post("/login", userController.userLogin)



//if api is invalid OR wrong URL
router.all("*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you request is not available"
    })
})


module.exports = router