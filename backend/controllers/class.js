const classModel = require('../models/class');
const studentModel = require('../models/student');

module.exports = {
    create: function(req, res, next) {
        classModel.create({
            ClassName: req.body.ClassName, ClassCode: req.body.ClassCode, Owner: req.body.Owner},
            function(err, result) {
                if(err) {
                    next(err);
                } else {
                    res.json({
                        status: "success", message: "Class Added Successfully", data: null
                    })
                }
            }
        )
    },
    getAll: function(req, res, next) {
        let classList = [];
        classModel.find({"Owner":req.params.id}, function(err, classes) {
            if(err) {
                next(err);
            } else {
                for(let i of classes) {
                    classList.push({id: i.id, classname: i.ClassName, classcode: i.ClassCode, owner: i.Owner})
                }
                res.json(/*{status: "success", message: "Classes Found!!", data: {classes: classList}}*/classes)
            }
        })
    },
    getName: function(req, res, next) {
        classModel.findById(req.params.id, function(err, className) {
            if(err) {
                next(err);
            } else {
                res.json(className);
            }
        })
    },
    getStudents: function (req, res, next) { 
        let studentList = [];
        studentModel.find({"ClassId":req.params.id}, function(err, students) {
            if(err) {
                next(err);
            } else {
                for(let i of students) {
                    studentList.push({id: i.id, name: i.Name, usn: i.Usn, marks: i.Marks, attendance: i.Attendance, classid: i.ClassId})
                }
                res.json(/*{status: "success", message: "Students Found!!", data: {class: studentList}}*/students)
            }
        })
    },
    getOneStudent: function (req, res, next) {
        studentModel.findById(req.params.id, function(err, studentInfo) {
            if(err) {
                next(err)
            }
            else {
                res.json(/*{status: "success", message: "Student Found!", data: { student : studentInfo}}*/studentInfo)
            }
        })
    },
    addStudent: function(req, res, next) {
        studentModel.create({
            Name: req.body.Name, Usn: req.body.Usn, Marks: req.body.Marks, Attendance: req.body.Attendance, ClassId: req.body.ClassId},
            function(err, result) {
                if(err) {
                    next(err);
                } else {
                    res.json({
                        status: "success", message: "Student Added Successfully", data: null
                    })
                }
            }
        )
    },
    editStudent : function(req, res, next) {
        studentModel.findByIdAndUpdate(req.params.id, {
            Name: req.body.Name, Usn: req.body.Usn, Marks: req.body.Marks, Attendance: req.body.Attendance, ClassId: req.body.ClassId}, 
            function(err, studentInfo) {
                if(err) {
                    next(err);
                } else {
                    res.json({status: "success", message: "Student Updated Successfully!!", data: null})
                }
            }
        )
    },
    deleteStudent: function(req, res, next) {
        studentModel.findByIdAndRemove(req.params.id, function(err, studentInfo) {
            if(err) {
                next(err)
            } else {
                res.json({status: "success", message: "Student Deleted Successfully!!", data: null})
            }
        })
    },
    viewDetail: function(req, res, next) {
        const request = req.params.code.split(',');
        classModel.findOne({"ClassCode":request[0]}, function(err, info) {
            if(err) {
                next(err);
            }
            else if(info) {
                //const id = info.id;
                //res.json(id);
                studentModel.findOne({"ClassId": info.id, "Usn": request[1]}, function(error, studentInfo) {
                    if(error) {
                        next(error);
                    }
                    else if(studentInfo) {
                        res.json({"status":"success", "data": studentInfo, "classname": info.ClassName});
                    }
                    else {
                        res.json({"status":"fail"})
                    }
                })
            } else {
                res.json({"status":"fail"})
            }
        })
    }
}