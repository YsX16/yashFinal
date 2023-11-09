const express = require("express")

const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile ,getAllUsers, getSingleUser, updateUserRole, deleteUser, sendVerifyEmail, EmailVerification } = require("../controllers/userController")
const { isAuthenticatedUser,IsVerifiedUser, authorizeRoles } = require("../middleware/auth")


const router = express.Router()

router.route("/register").post(registerUser )


router.route("/login").post(loginUser)


router.route("/password/forgot").post(forgotPassword)



router.route("/logout").get(logout)

router.route("/verify/:token").post(EmailVerification)

router.route("/Verification" ).post(sendVerifyEmail)

router.route("/password/reset/:token").put(resetPassword)


router.route("/me").get( isAuthenticatedUser ,getUserDetails)


router.route("/password/update").put(isAuthenticatedUser,  IsVerifiedUser,updatePassword )


router.route("/me/update").put(isAuthenticatedUser, IsVerifiedUser, updateProfile )


router.route("/admin/users").get( isAuthenticatedUser , IsVerifiedUser, authorizeRoles("admin"), getAllUsers)


router.route("/admin/user/:id")
.get( isAuthenticatedUser ,authorizeRoles("admin"), IsVerifiedUser, getSingleUser)
.put( isAuthenticatedUser ,authorizeRoles("admin"), IsVerifiedUser, updateUserRole)
.delete( isAuthenticatedUser ,authorizeRoles("admin"), IsVerifiedUser, deleteUser)


// router.route("/me").get( isAuthenticatedUser ,getUserDetails)
// router.route("/me").get( isAuthenticatedUser ,getUserDetails)

module.exports = router
