import React, { useRef,useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));
export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[students,setStudents]=useState([])
    const[students1,setStudents1]=useState([])

     const classes = useStyles();
     const get_id = useRef(null);
  const handleClick=(e)=>{
    e.preventDefault()
    const student={name,address}
    console.log(student)
    fetch("http://localhost:8080/student/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)

  }).then(()=>{
    console.log("New Student added")  
  })
}

useEffect(()=>{
  fetch("http://localhost:8080/student/getAll")
  .then(res=>res.json())
  .then((result)=>{
    console.log(result);
    setStudents(result);
  }
)
},[])
/*const handleFilter=(id)=>
{
  const value = axios(`http://localhost:8080/student/getById/${id}`).then(res=>res.json()).then((result1)=>{
    console.log(result1);
    setStudents(result1);
  })
}*/
async function getDataById() {
  const id = get_id.current.value;
  console.log(id)

  
  fetch(`http://localhost:8080/student/getById/${id}`)
  .then(res1=>res1.json())
  .then((result1)=>{
    console.log(result1);
    setStudents1([result1]);
  }
)

}
  return (   
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Student</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Submit
</Button>
    </form>
   
    </Paper>
    <h1>Students</h1>

    <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Address:{student.address}

        </Paper>
      ))
}


    </Paper>

    <Paper>
<input type="text" ref={get_id} className="form-control ml-2" placeholder="Id" />
      <Paper className="input-group-append">
        <button className="btn btn-sm btn-primary" onClick={getDataById}>Get by Id</button>
      </Paper>

 
      {students1.map(student=>(
    <Paper key={student.id}>
     Id:{student.id}<br/>
     Name:{student.name}<br/>
     Address:{student.address}

    </Paper>
  ))}

</Paper>

    </Container>


  );
}
