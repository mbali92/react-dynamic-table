import React, { useEffect, useState } from 'react'
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
//    Thabang 
// 1. create states 
  const [hiddenFields, setHiddenFields] = useState({
    priority: true,
    comment: true
  });

  const [showDropdown, setShowDropdown] = useState(false);
// end

// 2. create functions to toggles fields visibility and dropdown menu states

  // toggle visibility of the field
  const toggleFieldVisibility = (field) => {
    setHiddenFields(prevState => ({ ...prevState, [field]: !prevState[field] }));
  };
  // toggles the dropdown state
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  // toggles the selected field and hides the dropdown
  const handleDropdownSelection = (field) => {
    toggleFieldVisibility(field);
    toggleDropdown();
  };
// end
 useEffect(()=>{
    console.log(data)
 },[data])

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
        
    {/* table fields */}
          <div className="field-row  page-row">
          <div className="row-option"><i className="lni lni-more-alt"></i></div>
          <div className='field-name column-field'>Title</div>
          <div className='field-name'>Description</div>
          <div className='field-name'>Owner</div>
          <div className='field-name'>Status</div>
          <div className='field-name'>Start-Date</div>
          <div className='field-name'>Due-Date</div>
           {/* hidden fields */}
            {!hiddenFields.priority && <div className='field-name'>Priority</div>}
            {!hiddenFields.comment && <div className='field-name'>Comment</div>}
	    {/* icon to toggle the hidden fields dropdown menu */}
	    <div className="row-option" onClick={toggleDropdown}><i className="lni lni-more-alt"></i></div>
          
        </div>
             {/* table rows */}
        {data.map((data,index)=>
        <div className="field-row  page-row"key={data.title}>
          <div className="row-option" ><i className="lni lni-more-alt"></i></div>
          <div className='field-name row-data edit-value'  contentEditable onInput={(e)=>handleEdit(e,data.title,"title")} ><h6>{data.title}</h6></div>
          <div className='field-name row-data edit-value'  contentEditable onInput={(e)=>handleEdit(e,data.title,"description")} ><h6>{data.description}</h6></div>
          <div className='field-name row-data edit-value'  contentEditable onInput={(e)=>handleEdit(e,data.title,"owner")} ><h6>{data.owner}</h6></div>
            		
            {/* dropdown selection */}
                      <div className='field-name row-data'>
            <select name="status" id="" onChange={(e)=>handleData(e, index)}>
              <option id="todo" value="todo">todo</option>
              <option id="progress" value="in progress">in progress</option>
              <option id="done" value="done">done</option>
            </select>
          </div>

          <input type='date' className='field-name row-data edit-value' name='startDate' onChange={(e) =>  handleData(e,index)} defaultValue={data.startDate} />
          <input type='date' className='field-name row-data edit-value' name='endDate' onChange={(e) =>  handleData(e,index)} defaultValue={data.endDate} />
  
          {/* hidden priority field rows */}
	      {!hiddenFields.priority &&
          <div className='field-name row-data'>
          <select name="priority" id="select"  onChange={(e)=>handleData(e, index)}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="critical">critical</option>
            </select>
         </div>
}      
          {/* hidden comment field rows */}
              {!hiddenFields.comment && 
                <div className='field-name row-data edit-value'  contentEditable onInput={(e)=>handleEdit(e,data.title,"comment")}><h6>{data.comment}</h6></div> 
}
            </div>
          ))}
        </div>

	{/* dropdown menu which shows and toggles the individual hidden fields */}
        {showDropdown &&
          <div className="dropdown-menu">
            <ul>
              {Object.keys(hiddenFields).map(field => (
                <li key={field} onClick={() => handleDropdownSelection(field)}>{hiddenFields[field] ? `+ ${field}` : `- ${field}`}</li>
              ))}
            </ul>
          </div>
        }

        <button onClick={addRow}>Add Row</button>
        <br />
	{/* button to toggle the hidden fields dropdown menu */}
        {/* <button onClick={toggleDropdown}><i className="lni lni-more-alt"></i></button> */}

      </div>
    </>
  )
}

export default Table;