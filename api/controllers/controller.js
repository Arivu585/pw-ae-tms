const path = require('path');
const model = require(path.join(__dirname, '..', 'models', 'model'));
const multer = require("multer");
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Admin Login Start
const adminLogin = (req, res) => {
    let mail = req.body.mail
    let pass = req.body.pass 
    let time=Number(60*60*24);
    model.adminLoginDB(mail, pass).then((data) => {
        if(data.length == 1){
            response = {
                "status": true,
                "aid":data.at(0).aid,
                "aname":data.at(0).aname,
                "token": jwt.sign({ "mail": req.body.mail,"pass":req.body.pass }, process.env.JWT_SECRET,{ expiresIn:time }),
            }
        }else{
            response = {
                "status":false,
                "message":'Invalid Login Details',
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}
//Admin Login End
//---------------------------------------------------------------------------------
//Packages Start
const showAllPackages = (req, res) => {
    model.getAllPackages().then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const showLimitPackages = (req, res) => {
    let limit=Number(req.params["limit"]);
    model.getLimitPackages(limit).then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const showSinglePackage = (req, res) => {
    id = req.params["id"]
    model.getSinglePackage(id).then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const addPackage = (req, res) => {

    req.fileName = "Package"
    const storage = multer.diskStorage({
        destination: './public/images/package/',
        filename: function (req, file, cb) {
            fname = req.fileName
            cb(null, fname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage,
        limits: { fileSize: 10000000 } // 10MB file size limit
    }).single("image");


    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Please send file' });
        }
        let name = req.body.name
        let type = req.body.type
        let location = req.body.location
        let price = req.body.price
        let feature = req.body.feature
        let descp = req.body.descp
        let image = req.file.filename

        model.addPackageDB(name, type, location, price, feature, descp, image).then((data) => {
            response = {
                "status": true,
                "msg": "Package Added Successfully",
                "lastInsertID": data,
            }
            res.json(response);
        }).catch(err => {
            response = {
                "status": false,
                "error": "DB server not response query error",
            }
            res.json(response);
        });
    });

}

const editPackage = (req, res) => {

    req.fileName = "Package"
    const storage = multer.diskStorage({
        destination: './public/images/package/',
        filename: function (req, file, cb) {
            fname = req.fileName
            cb(null, fname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage,
        limits: { fileSize: 10000000 } // 10MB file size limit
    }).single("image");
    
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        if (!req.file) {
            image =""
        }else{
            image = req.file.filename
        }
        let id = req.params["id"]
        let name = req.body.name
        let type = req.body.type
        let location = req.body.location
        let price = req.body.price
        let feature = req.body.feature
        let descp = req.body.descp

        model.editPackageDB(id, name, type, location, price, feature, descp, image).then((data) => {
            if (data.affectedRows == 1) {
                response = {
                    "status": true,
                    "msg": "Package Edited Successfully",
                }
            } else {
                response = {
                    "status": false,
                    "error": "Record Not Found",
                }
            }
            res.json(response);
        }).catch(err => {
            response = {
                "status": false,
                "error": "DB server not response query error",
            }
            res.json(response);
        })
    });
}

const deletePackage = (req, res) => {
    id = req.params["id"]
    model.deletePackageDB(id).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Package Deleted Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}
//Packages End
//---------------------------------------------------------------------------------
//Pages Start
const showAllPages = (req, res) => {
    model.getAllPages().then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const showSinglePage = (req, res) => {
    id = req.params["id"]
    model.getSinglePage(id).then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const showPageType = (req, res) => {
    let ptype = req.params["type"]
    model.getPageType(ptype).then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const addPage = (req, res) => {

    req.fileName = "Page"
    const storage = multer.diskStorage({
        destination: './public/images/page/',
        filename: function (req, file, cb) {
            fname = req.fileName
            cb(null, fname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage,
        limits: { fileSize: 10000000 } // 10MB file size limit
    }).single("image");


    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Please send file' });
        }
        let type = req.body.type
        let content = req.body.content
        let image = req.file.filename

        model.addPageDB( type, content, image).then((data) => {
            response = {
                "status": true,
                "msg": "Page Added Successfully",
                "lastInsertID": data,
            }
            res.json(response);
        }).catch(err => {
            response = {
                "status": false,
                "error": "DB server not response query error",
            }
            res.json(response);
        });
    });

}

const editPage = (req, res) => {

    req.fileName = "Page"
    const storage = multer.diskStorage({
        destination: './public/images/page/',
        filename: function (req, file, cb) {
            fname = req.fileName
            cb(null, fname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage,
        limits: { fileSize: 10000000 } // 10MB file size limit
    }).single("image");
    
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        if (!req.file) {
            image =""
        }else{
            image = req.file.filename
        }
        let id = req.params["id"]
        let type = req.body.type
        let content = req.body.content
        
        
        model.editPageDB(id, type, content, image).then((data) => {
            if (data.affectedRows == 1) {
                response = {
                    "status": true,
                    "msg": "Page Edited Successfully",
                }
            } else {
                response = {
                    "status": false,
                    "error": "Record Not Found",
                }
            }
            res.json(response);
        }).catch(err => {
            console.error(err);
            response = {
                "status": false,
                "error": "DB server not response query error",
            }
            res.json(response);
        })
    });
}

const deletePage = (req, res) => {
    id = req.params["id"]
    model.deletePageDB(id).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Page Deleted Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}
//Pages End
//---------------------------------------------------------------------------------
//User Login Start
const userLogin = (req, res) => {
    let mail = req.body.mail
    let pass = req.body.pass
    model.userLoginDB(mail, pass).then((data) => {
        if(data.length == 1){
            response = {
                "status": true,
                "uid":data.at(0).uid,
                "uname":data.at(0).uname,
                "token": jwt.sign({ "mail": req.body.mail,"pass":req.body.pass }, process.env.JWT_SECRET,{ expiresIn:"24h" }),
            }
        }else{
            response = {
                "status":false,
                "message":'Invalid Login Details',
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}
//User Login End
//---------------------------------------------------------------------------------
//User Start
const showAllUsers = (req, res) => {
    model.getAllUsers().then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const showSingleUser = (req, res) => {
    id = req.params["id"]
    model.getSingleUser(id).then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const addUser = (req, res) => {
    let name = req.body.name
    let pass = req.body.pass
    let mail = req.body.mail
    let contact = req.body.contact
    model.addUserDB(name, pass, mail, contact).then((data) => {
        response = {
            "status": true,
            "msg": "User Added Successfully",
            "lastInsertID": data,
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const editUser = (req, res) => {
    let id = req.params["id"]
    let name = req.body.name
    let pass = req.body.pass
    let mail = req.body.mail
    let contact = req.body.contact
    model.editUserDB(id, name, pass, mail, contact).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "User Edited Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    })
}

const deleteUser = (req, res) => {
    id = req.params["id"]
    model.deleteUserDB(id).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "User Deleted Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}
//User End
//---------------------------------------------------------------------------------
//Booking Start
const showAllBookings = (req, res) => {
    model.getAllBookings().then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const showSingleBooking = (req, res) => {
    id = req.params["id"]
    model.getSingleBooking(id).then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const addBooking = (req, res) => {
    let pkid = req.body.pkid
    let uid = req.body.uid
    let fdate = req.body.fdate
    let tdate = req.body.tdate
    let remarks = req.body.remarks
    model.addBookingDB(pkid, uid, fdate, tdate, remarks).then((data) => {
        response = {
            "status": true,
            "msg": "Booking Added Successfully",
            "lastInsertID": data,
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const editBooking = (req, res) => {
    let id = req.params["id"]
    let pkid = req.body.pkid
    let uid = req.body.uid
    let fdate = req.body.fdate
    let tdate = req.body.tdate
    let remarks = req.body.remarks
    model.editBookingDB(id, pkid, uid, fdate, tdate, remarks).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Booking Edited Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    })
}

const deleteBooking = (req, res) => {
    id = req.params["id"]
    model.deleteBookingDB(id).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Booking Deleted Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}
//Booking End
//---------------------------------------------------------------------------------
//Enquiry Start
const showAllEnquiry = (req, res) => {
    model.getAllEnquiry().then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const showSingleEnquiry = (req, res) => {
    id = req.params["id"]
    model.getSingleEnquiry(id).then((data) => {
        if (data == '') {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        } else {
            response = {
                "status": true,
                "data": data,
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const addEnquiry = (req, res) => {
    let uid = req.body.uid
    let subject = req.body.subject
    let content = req.body.content
    let date = req.body.date
    model.addEnquiryDB( uid, subject, content, date).then((data) => {
        response = {
            "status": true,
            "msg": "Enquiry Added Successfully",
            "lastInsertID": data,
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}

const editEnquiry = (req, res) => {
    let id = req.params["id"]
    let uid = req.body.uid
    let subject = req.body.subject
    let content = req.body.content
    let date = req.body.date
    model.editEnquiryDB(id, uid, subject, content, date).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Enquiry Edited Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    })
}

const deleteEnquiry = (req, res) => {
    id = req.params["id"]
    model.deleteEnquiryDB(id).then((data) => {
        if (data.affectedRows == 1) {
            response = {
                "status": true,
                "msg": "Enquiry Deleted Successfully",
            }
        } else {
            response = {
                "status": false,
                "error": "Record Not Found",
            }
        }
        res.json(response);
    }).catch(err => {
        response = {
            "status": false,
            "error": "DB server not response query error",
        }
        res.json(response);
    });
}
//Enquiry End
//---------------------------------------------------------------------------------

module.exports = {

    adminLogin,
    userLogin,

    showAllPackages,
    showLimitPackages,
    showSinglePackage,
    addPackage,
    editPackage,
    deletePackage,

    showAllPages,
    showSinglePage,
    showPageType,
    addPage,
    editPage,
    deletePage,

    showAllUsers,
    showSingleUser,
    addUser,
    editUser,
    deleteUser,

    showAllBookings,
    showSingleBooking,
    addBooking,
    editBooking,
    deleteBooking,

    showAllEnquiry,
    showSingleEnquiry,
    addEnquiry,
    editEnquiry,
    deleteEnquiry,

}