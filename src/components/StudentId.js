import React, { useRef, useState } from 'react';




export default function StudentDetails() {
    
  const get_id = useRef(null);
    
     
  const [students, setStudents] = useState([]);


     async function getDataById() {
        const id = get_id.current.value;
        console.log(id)
    
        
        fetch(`http://localhost:8080/student/getById/${id}`)
        .then(res=>res.json())
        .then((result)=>{
          console.log(result);
          setStudents(result);
        }
      )
      
     }
    





console.log(students)
  return (
    <div>
    <input type="text" ref={get_id} className="form-control ml-2" placeholder="Id" />
          <div className="input-group-append">
            <button className="btn btn-sm btn-primary" onClick={getDataById}>Get by Id</button>
          </div>
    
     
          {students.map(student=>(
        <div  key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Address:{student.address}

        </div>
      ))}
  
  </div>
    
  );
}
