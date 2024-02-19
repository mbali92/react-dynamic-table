import React, { useEffect, useState } from 'react'
import "./styles/style.css"
import axios from 'axios';

function Table() {

  

 const [data, setData] = useState({});



 const allData = async () => {
  
  try {
    const newData = await axios.get('http://localhost:8080/getAllTask')
    console.log("succes")
    setData(newData.data);
    console.log("db data")
  } catch (error) {
    console.log(error)
  }

 }
//  useEffect(()=>{
//     console.log(data)
//  },[data])



   const addRow=()=>{
      const singlerow= {
            title:'',
            description:'',
            owner:'',
            status:'',
            startDate:'',
            endDate:'',
            priority:'',
            comment:''
      }
    setData(prevArray => [...prevArray, singlerow])

   }

   const handleDelete = (title) =>{
    const newfields  = data.filter((filter)=> filter.title !== title);
    setData(newfields)
   }


const handleEdit = (e, title,name) => {
  
  const propertyValue = e.target.innerText;
  const updatedData = data.map(item => {
    if (item.title === title) {
      
      return { ...item, [name]: propertyValue };
    }
    return item;
  });

  console.log(updatedData); 
 
};


const handleData=(e,index)  => {
  const name = e.target.name;
  const newValue = e.target.value;
  const dateObjects = [...data]
  dateObjects[index][name] = newValue;
  setData(dateObjects)
};

   

  return (

    <div className="container">
       <div className="table">
        <div className="field-row  page-row">
          <div className="row-option"><i className="lni lni-more-alt"></i></div>
          <div className='field-name column-field'>Title</div>
          <div className='field-name'>Description</div>
          <div className='field-name'>Owner</div>
          <div className='field-name'>Start-Date</div>
          <div className='field-name'>Due-Date</div>
          <div className='field-name'>Priority</div>
          <div className='field-name'>Status</div>
          <div className='field-name'>Comment</div>
          
        </div>
        {data.map((data,index)=>
        <div className="field-row  page-row"key={data.title}>
          <div className="row-option" ><i className="lni lni-more-alt"></i></div>
          <div className='field-name row-data edit-value'  contentEditable onInput={(e)=>handleEdit(e,data.title,"title")} ><h6>{data.title}</h6></div>
          <div className='field-name row-data edit-value'  contentEditable onInput={(e)=>handleEdit(e,data.title,"description")} ><h6>{data.description}</h6></div>
          <div className='field-name row-data edit-value'  contentEditable onInput={(e)=>handleEdit(e,data.title,"owner")} ><h6>{data.owner}</h6></div>
          <input type='date' className='field-name row-data edit-value' name='startDate' onChange={(e) =>  handleData(e,index)} defaultValue={data.startDate} />
          <input type='date' className='field-name row-data edit-value' name='endDate' onChange={(e) =>  handleData(e,index)} defaultValue={data.endDate} />
  
          <div className='field-name row-data'>
          <select name="priority" id="select"  onChange={(e)=>handleData(e, index)}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="critical">critical</option>
            </select>
         </div>
          <div className='field-name row-data'>
            <select name="status" id="" onChange={(e)=>handleData(e, index)}>
              <option id="todo" value="todo">todo</option>
              <option id="progress" value="in progress">in progress</option>
              <option id="done" value="done">done</option>
            </select>
          </div>
         
          <div className='field-name row-data edit-value'  contentEditable onInput={(e)=>handleEdit(e,data.title,"comment")}><h6>{data.comment}</h6></div>          
          
          




         
          {/* </div> */}

    
          
          
          
        </div>)
        } 
       </div>
       <button onClick={ ()=>allData()}>Add Row</button>

    </div>
      
    
   
  )
}

export default Table


