const Course = require('../../models/course');


exports.createNewCourse = async (req , res , next) => {
   
    
      try {
        await new Course(req.body).save();
        res.status(201).json({
            status: "succes",
            msg: "اطلاعات دوره جدید ثبت شد"
        })
      } catch (err) {
          res.status(400).json({
              status: "failed",
              msg: "دوره جدید ایجاد نشد",
              err
          })
      }
       


}