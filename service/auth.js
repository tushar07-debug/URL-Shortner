// const jwt = require("jsonwebtoken")
// const secret = "Tushar$123@$";

// function setUser (user){
//     return jwt.sign(
//         {
//             _id:user._id,
//             email:user.email,
//         },
//         secret
//     );
// }

// function getUser(token) {
//     if(!token) return null;
//     return jwt.verify(token,secret)
// }

// module.exports = {
//     setUser, getUser
// }
const jwt = require("jsonwebtoken");
const secret = "Tushar$123@$";

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        secret
    );
}

function getUser(token) {
    if (!token) {
        console.log("No token provided");
        return null;
    }
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return null;
    }
}

module.exports = {
    setUser, getUser
};
