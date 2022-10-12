const Joi=require('joi')
const express=require('express')
const port=8090
const app=express()
const courses=[
    {id:1, name:"java"},
    {id:2, name:"python"},
    {id:3, name:"web dev"},
]
app.get('/',(req,res)=>{
    res.send('HELLO RECOVERO')
})
app.get('/api/courses',(req,res)=>{
    res.send(courses)
})
app.post('/api/courses',(req,res)=>{
    const {error}= validateCourse(req.body);
    if(error)
        return  res.status(400).send(error.details[0].message)
   
    
    
  const course={
                id:courses.length +1,
                name:req.body.name
            };
            courses.push(course);
            res.send(course)
})
app.put('/api/courses/:id',(req,res)=>{
    const  course= courses.find(c=>c.id===parseInt(req.params.id))
    if(!course)
    return res.status(404).send("The course with given id was not found")
    
     const {error}= validateCourse(req.body);
   if(error)
   return res.status(400).send(error.details[0].message)
    
   
   course.name=req.body.name;
   res.send(course)

})
function validateCourse(course){
    const schema={
        name:Joi.string().min(3).required()
    };
   return Joi.validate(course,schema);

}
app.delete('/api/courses/:id',(req,res)=>{
    const  course= courses.find(c=>c.id===parseInt(req.params.id))
    if(!course)
   return  res.status(404).send("The course with given id was not found")
    const index=courses.indexOf(course)
    course.splice(index,1)
    res.send(course)

})










app.get('/api/courses/id:',(req,res)=>{
         const  course= courses.find(c=>c.id===parseInt(req.params.id))
         if(!course)
         res.status(404).send("The course with given id was not found")
         res.send(course)
})
app.listen(port,function(err){
    if(err){
    console.log("Error in running server")
    }
    console.log("Yup! My express server is running on port",port)
})