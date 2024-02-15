import React, { useState } from 'react'
import "./styles/style.css"

function Table() {



 const [data, setData] = useState([{
  title:'title1',
  description:'description',
  owner:'owner',
  status:'status',
  startDate:'12-12-12',
  endDate:'12-12-12',
  priority:'low',
  comment:'comment'
 },
 {
  title:'title2',
  description:'description',
  owner:'owner',
  status:'status',
  startDate:'12-12-12',
  endDate:'12-12-12',
  priority:'critical',
  comment:'comment'
 }]);

 

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

  //  const handleDelete = (title) =>{
  //   const newfields  = data.filter((filter)=> filter.title !== title);
  //   setData(newfields)
  //  }


  
   const handleDuplicate =(title)=>{

    const findRow = data.find((find)=>find.title === title);
          const singlerow= {
            title:findRow.title,
            description:findRow.description,
            owner:findRow.owner,
            status:findRow.status,
            startDate:findRow.startDate,
            endDate:findRow.endDate,
            priority:findRow.priority,
            comment:findRow.comment
            }
setData(prevArray => [...prevArray, singlerow])
   }


const handleEdit = (e, title) => {
  const propertyName = e.target.name;
  const propertyValue = e.target.value;

  // Find the object in the data array
  const updatedData = data.map(item => {
    if (item.title === title) {
      // Create a new object with the updated property
      return { ...item, [propertyName]: propertyValue };
    }
    return item;
  });



  // Update the state with the new array
  setData(updatedData);

  // Log the updated data after the state has been updated
  // console.log(updatedData);
  // console.log(updatedData1);


  // Since data is updated asynchronously, logging data immediately will not reflect the updated state
  console.log(data);
};





  // console.log(data)
   const accessSelectValue = (e,title)=>{
    const demo = data.find((find)=>find.title===title)
    demo.status = e.target.value;
    setData(data)
    // console.log(data)
   }



   const prioritySelectValue = (e,title)=>{
    const demo = data.find((find)=>find.title===title)
    demo.priority = e.target.value;
    setData(data)
    console.log(data)
   }



   

   

  return (
    <>
    <div className="container">
       <div className="table">
        <div className="field-row  page-row">
          <div className="row-option"><i className="lni lni-more-alt"></i></div>
          <div className='field-name column-field'>Title</div>
          <div className='field-name'>Description</div>
          <div className='field-name'>Owner</div>
          <div className='field-name'>Due-Date</div>
          <div className='field-name'>Start-Date</div>
          <div className='field-name'>Priority</div>
          <div className='field-name'>Status</div>
          <div className='field-name'>Comment</div>
        </div>
        {data.map((data)=>
        <div className="field-row  page-row"key={data.title}>
          <div className="row-option" onClick={()=>handleDuplicate(data.title)}><i className="lni lni-more-alt"></i></div>

          {/* <div className='field-name row-data'> */}
          <input type='text' className='field-name row-data edit-value' name='title' onChange={(e) =>  handleEdit(e,data.title)} defaultValue={data.title}/>
          {/* </div> */}

          {/* <div className='field-name row-data'> */}
            <input type='text' className='field-name row-data edit-value' name='description' onChange={(e) =>  handleEdit(e,data.title)} defaultValue={data.description}/>
          {/* </div> */}

          {/* <div className='field-name row-data'> */}
            <input type='text' className='field-name row-data edit-value' name='owner' onChange={(e) =>  handleEdit(e,data.title)} defaultValue={data.owner}/>
          {/* </div> */}
        

          {/* <div  className='field-name row-data'> */}
          <input type='text' className='field-name row-data edit-value' name='startDate' onChange={(e) =>  handleEdit(e,data.title)} defaultValue={data.startDate}/>
          {/* </div> */}
          <input type='text' className='field-name row-data edit-value' name='endDate' onChange={(e) =>  handleEdit(e,data.title)} defaultValue={data.endDate} />
          
          {/* <div className='field-name row-data'> */}
          <input type='text' className='field-name row-data edit-value' name='priority' onChange={(e) =>  handleEdit(e,data.title)} defaultValue={data.priority} />
         
          <div className='field-name row-data'>
            <select name="status" id="" onChange={(e)=>prioritySelectValue(e, data.title)}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="critical">critical</option>
            </select>
          </div>

         
          {/* </div> */}

          <div className='field-name row-data'>
            <select name="status" id="" onChange={(e)=>accessSelectValue(e, data.title)}>
              <option value="todo">todo</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
            </select>
          </div>
          
          <div className='field-name row-data'  >
          <input type='text' className='field-name row-data edit-value' name='comment' onChange={(e) =>  handleEdit(e,data.comment)} defaultValue={data.comment} />

          
          </div>
          
        </div>)
        } 
       </div>
       <button onClick={ addRow}>Add Row</button>

    </div>
      
    
    </>
  )
}

export default Table