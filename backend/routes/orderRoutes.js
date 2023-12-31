const express = require("express")
const router = express.Router();


const {newOrder, getSingleOrder, myOrders, getAllOrders, deleteOrders, updateOrder, orderConformedMail} = require("../controllers/ordercontroller")

const { isAuthenticatedUser, IsVerifiedUser, authorizeRoles } = require("../middleware/auth")


router.route("/order/new").post( isAuthenticatedUser,IsVerifiedUser, newOrder)

router.route("/order/:id").get( isAuthenticatedUser,getSingleOrder)

router.route("/orders/me").get(isAuthenticatedUser, myOrders)

router.route("/orders/success").post( isAuthenticatedUser, orderConformedMail )

router.route("/admin/orders").get( isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id")
.put( isAuthenticatedUser, authorizeRoles("admin"), updateOrder )
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrders ) 



module.exports = router