import React, { useState } from 'react';
import "./styles/style.css";

function Table() {
  const [data, setData] = useState([
    {
      title: 'title1',
      description: 'description',
      owner: 'owner',
      status: 'status',
      startDate: '12-12-12',
      endDate: '12-12-12',
      priority: 'low',
      comment: 'comment'
    },
    {
      title: 'title2',
      description: 'description',
      owner: 'owner',
      status: 'status',
      startDate: '12-12-12',
      endDate: '12-12-12',
      priority: 'critical',
      comment: 'comment'
    }
  ]);

//    Thabang 
// 1. create states 
  const [hiddenFields, setHiddenFields] = useState({
    priority: false,
    status: false,
    comment: false
  });

  const [showDropdown, setShowDropdown] = useState(false);
// end

  const addRow = () => {
    const singlerow = {
      title: '',
      description: '',
      owner: '',
      status: '',
      startDate: '',
      endDate: '',
      priority: '',
      comment: ''
    };
    setData(prevArray => [...prevArray, singlerow]);
  };

  const handleDuplicate = (title) => {
    const findRow = data.find(find => find.title === title);
    const singlerow = {
      title: findRow.title,
      description: findRow.description,
      owner: findRow.owner,
      status: findRow.status,
      startDate: findRow.startDate,
      endDate: findRow.endDate,
      priority: findRow.priority,
      comment: findRow.comment
    };
    setData(prevArray => [...prevArray, singlerow]);
  };

  const handleEdit = (e, title) => {
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    const updatedData = data.map(item => {
      if (item.title === title) {
        return { ...item, [propertyName]: propertyValue };
      }
      return item;
    });
    setData(updatedData);
  };

  const accessSelectValue = (e, title) => {
    const demo = data.find(find => find.title === title);
    demo.status = e.target.value;
    setData([...data]);
  };

  const prioritySelectValue = (e, title) => {
    const demo = data.find(find => find.title === title);
    demo.priority = e.target.value;
    setData([...data]);
  };

//    Thabang 
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

  return (
    <>
      <div className="container">
        <div className="table">
		{/* table fields */}
          <div className="field-row  page-row">
            <div className="row-option"><i className="lni lni-more-alt"></i></div>
            <div className='field-name column-field'>Title</div>
            <div className='field-name'>Description</div>
            <div className='field-name'>Owner</div>
            <div className='field-name'>Due-Date</div>
            <div className='field-name'>Start-Date</div>
	    {/* hidden fields */}
            {!hiddenFields.priority && <div className='field-name'>Priority</div>}
            {!hiddenFields.status && <div className='field-name'>Status</div>}
            {!hiddenFields.comment && <div className='field-name'>Comment</div>}
          </div>

	{/* tabble rows */}
          {data.map((data, index) => (
            <div className="field-row  page-row" key={index}>
              <div className="row-option" onClick={() => handleDuplicate(data.title)}><i className="lni lni-more-alt"></i></div>
              <input type='text' className='field-name row-data edit-value' name='title' onChange={(e) => handleEdit(e, data.title)} defaultValue={data.title} />
              <input type='text' className='field-name row-data edit-value' name='description' onChange={(e) => handleEdit(e, data.title)} defaultValue={data.description} />
              <input type='text' className='field-name row-data edit-value' name='owner' onChange={(e) => handleEdit(e, data.title)} defaultValue={data.owner} />
              <input type='text' className='field-name row-data edit-value' name='startDate' onChange={(e) => handleEdit(e, data.title)} defaultValue={data.startDate} />
              <input type='text' className='field-name row-data edit-value' name='endDate' onChange={(e) => handleEdit(e, data.title)} defaultValue={data.endDate} />
              {/* hidden priority field rows */}
	      {!hiddenFields.priority &&
              <div className='field-name row-data'>
                <select name="status" id="" onChange={(e) => prioritySelectValue(e, data.title)}>
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="critical">critical</option>
                </select>
              </div>
}
		{/* hidden status field rows */}
              {!hiddenFields.status && 
              <div className='field-name row-data'>
                <select name="status" id="" onChange={(e) => accessSelectValue(e, data.title)}>
                  <option value="todo">todo</option>
                  <option value="in progress">in progress</option>
                  <option value="done">done</option>
                </select>
              </div>
}
		{/* hidden comment fields rows */}
              {!hiddenFields.comment && <input type='text' className='field-name row-data edit-value' name='comment' onChange={(e) => handleEdit(e, data.title)} defaultValue={data.comment} />}
            </div>
          ))}
        </div>

	{/* dropdown menu which shows and toggles the individual hidden fields */}
        {showDropdown &&
          <div className="dropdown">
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
        <button onClick={toggleDropdown}><i className="lni lni-more-alt"></i></button>

      </div>
    </>
  )
}

export default Table;
