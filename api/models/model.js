const { json } = require('express');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tourism_ae'
});

con.connect((err) => {
    if (err) throw err;
    console.log("DB Connected");
}); 
//---------------------------------------------------------------------------------
//Admin Login Start
const adminLoginDB = (mail, pass) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_admin where amail=(?) and apass=(?)", [mail,pass], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}
//Admin Login End
//---------------------------------------------------------------------------------
//Packages Start
const getAllPackages = () => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_packages", (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const getLimitPackages = (limit) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_packages limit ?", [limit], (err, result) => {
            if (err) {
                console.log(err)
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const getSinglePackage = (id) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_packages where pkid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const addPackageDB = (name, type, location, price, feature, descp, image) => {
    return new Promise((resolve, reject) => {
        con.query("insert into tbl_packages (name, type, location, price, feature, descp, image) values (?,?,?,?,?,?,?)", [name, type, location, price, feature, descp, image], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result.insertId);
            
        });
    });
}

const editPackageDB = (id, name, type, location, price, feature, descp, image) => {
    if(image == ""){
        return new Promise((resolve, reject) => {
            con.query("update tbl_packages set name=(?),type=(?),location=(?),price=(?),feature=(?),descp=(?) where pkid=(?)", [name, type, location, price, feature, descp, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }else{
        return new Promise((resolve, reject) => {
            con.query("update tbl_packages set name=(?),type=(?),location=(?),price=(?),feature=(?),descp=(?),image=(?) where pkid=(?)", [name, type, location, price, feature, descp, image, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }
}

const deletePackageDB = (id) => {
    return new Promise((resolve, reject) => {
        con.query("delete from tbl_packages where pkid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}
//Packages End
//---------------------------------------------------------------------------------
//Pages Start
const getAllPages = () => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_pages", (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const getSinglePage = (id) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_pages where pgid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const getPageType = (type) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_pages where type=(?)", [type], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const addPageDB = (type, content, image) => {
    return new Promise((resolve, reject) => {
        con.query("insert into tbl_pages ( type, content, image) values (?,?,?)", [ type, content, image], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result.insertId);
        });
    });
}

const editPageDB = (id,  type, content, image) => {

    if(image == ""){
        return new Promise((resolve, reject) => {
            con.query("update tbl_pages set type=(?), content=(?) where pgid=(?)", [ type, content, id], (err, result) => {
                if (err) {
                    console.log(err)
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }else{
        return new Promise((resolve, reject) => {
            con.query("update tbl_pages set type=(?), content=(?), image=(?) where pgid=(?)", [ type, content, image, id], (err, result) => {
                if (err) {
                    console.log(err)
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }
}

const deletePageDB = (id) => {
    return new Promise((resolve, reject) => {
        con.query("delete from tbl_pages where pgid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}
//Pages End
//---------------------------------------------------------------------------------
//User Login Start
const   userLoginDB = (mail, pass) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_user where mail=(?) and pass=(?)", [mail,pass], (err, result) => {
            if (err) {
                return reject(err); 
            }
            return resolve(result);
        });
    });
}
//User Login End
//---------------------------------------------------------------------------------
//User Start
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_user", (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const getSingleUser = (id) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_user where uid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
            
        });
    });
}

const addUserDB = (name, pass, mail, contact) => {
    return new Promise((resolve, reject) => {
        con.query("insert into tbl_user (uname, pass, mail, contact) values (?,?,?,?)", [name, pass, mail, contact], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result.insertId);
        });
    });
}

const editUserDB = (id, name, pass, mail, contact) => {
    return new Promise((resolve, reject) => {
        con.query("update tbl_user set uname=(?),pass=(?),mail=(?),contact=(?) where uid=(?)", [name, pass, mail, contact, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const deleteUserDB = (id) => {
    return new Promise((resolve, reject) => {
        con.query("delete from tbl_user where uid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}
//User End
//---------------------------------------------------------------------------------
//Booking Start
const getAllBookings = () => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_booking bk inner join tbl_packages pk on bk.pkid=pk.pkid inner join tbl_user u on bk.uid=u.uid", (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const getSingleBooking = (id) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_booking bk inner join tbl_packages pk on bk.pkid=pk.pkid inner join tbl_user u on bk.uid=u.uid where bkid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
            
        });
    });
}

const addBookingDB = (pkid, uid, fdate, tdate, remarks) => {
    return new Promise((resolve, reject) => {
        con.query("insert into tbl_booking (pkid, uid, fdate, tdate, remarks) values (?,?,?,?,?)", [pkid, uid, fdate, tdate, remarks], (err, result) => {
            if (err) {
                console.log(err)
                return reject(err);
            }
            return resolve(result.insertId);
        });
    });
}

const editBookingDB = (id, pkid, uid, fdate, tdate, remarks) => {
    return new Promise((resolve, reject) => {
        con.query("update tbl_booking set pkid=(?),uid=(?),fdate=(?),tdate=(?),remarks=(?) where bkid=(?)", [pkid, uid, fdate, tdate, remarks, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const deleteBookingDB = (id) => {
    return new Promise((resolve, reject) => {
        con.query("delete from tbl_booking where bkid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}
//Booking End
//---------------------------------------------------------------------------------
//Enquiry Start
const getAllEnquiry = () => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_enquiry eq inner join tbl_user u on eq.uid=u.uid", (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const getSingleEnquiry = (id) => {
    return new Promise((resolve, reject) => {
        con.query("select * from tbl_enquiry eq inner join tbl_user u on eq.uid=u.uid where eqid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
            
        });
    });
}

const addEnquiryDB = ( uid, subject, content, date) => {
    return new Promise((resolve, reject) => {
        con.query("insert into tbl_enquiry ( uid, subject, content, date) values (?,?,?,?)", [ uid, subject, content, date], (err, result) => {
            if (err) {
                console.log(err)
                return reject(err);
            }
            return resolve(result.insertId);
        });
    });
}

const editEnquiryDB = (id, uid, subject, content, date) => {
    return new Promise((resolve, reject) => {
        con.query("update tbl_enquiry set uid=(?),subject=(?),content=(?),date=(?) where eqid=(?)", [uid, subject, content, date, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

const deleteEnquiryDB = (id) => {
    return new Promise((resolve, reject) => {
        con.query("delete from tbl_enquiry where eqid=(?)", [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}
//Enquiry End
//---------------------------------------------------------------------------------


module.exports = {
    adminLoginDB,
    userLoginDB,

    getAllPackages,
    getLimitPackages,
    getSinglePackage,
    addPackageDB,
    editPackageDB,
    deletePackageDB,

    getAllPages,
    getSinglePage,
    getPageType,
    addPageDB,
    editPageDB,
    deletePageDB,

    getAllUsers,
    getSingleUser,
    addUserDB,
    editUserDB,
    deleteUserDB,

    getAllBookings,
    getSingleBooking,
    addBookingDB,
    editBookingDB,
    deleteBookingDB,

    getAllEnquiry,
    getSingleEnquiry,
    addEnquiryDB,
    editEnquiryDB,
    deleteEnquiryDB,
}