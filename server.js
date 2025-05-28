const express=require('express')
const app=express();
const port=3000
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
});
app.post('/submit-form',(req,res)=>{
    const {name,email,course,age}=req.body;
    const errors=[];
    if(!name || name.trim().length<3 || name.trim().length>30){
        errors.push('Name must be between 3 and 30');
    }
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !emailRegex.test(email)){
        errors.push('valid email is required');
    }
    if(!course || course.trim().length<3 || course.trim().length>20){
        errors.push('course must be between 3 and 20');
    }
    const ageNum=Number(age);
    if(!age || isNaN(ageNum) || ageNum<10 || ageNum< 100){
        errors.push('age must be between 3 and 30');
    }
    if(errors.length>0){
        res.status(400).send(`<h3>Errors:</h3>
            <ul>${errors.map(e=>`<li>${e}</li>`).join('')}</ul>
            <a href="/index.html">GO BACK</a>`)
    }
    else{
        res.send(`<h2>Student Registered Successfully!</h2>
            <p><strong>Name:</strong>${name}</p>
            <p><strong>Email:</strong>${email}</p>
            <p><strong>Course:</strong>${course}</p>
            <p><strong>Age:</strong>${age}</p>
            <a href="/index.html">Register anthor student</a>`);
    }
})
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
})