import React, { useEffect, useState } from 'react'
import './Todo.css'
import Swal from 'sweetalert2';


// getting the localstorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist")

  if (lists) {
    return JSON.parse(lists)
  } else {
    return [];
  }
}

const Todo = () => {

  const [inputdata, setInputData] = useState("")
  const [items, setItems] = useState(getLocalData())
  const [isEditItem, setIsEditItem] = useState("")
  const [toggleButton, setToggleButton] = useState(false)

  // adding the items function
  // var swal;
  const addItem = () => {
    if (!inputdata) {
     
        Swal.fire(
          
          'Enter your List First?',
          
        )
      
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata }
          }
          return curElem;
        })
      )

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      }
      setItems([...items, myNewInputData])
      setInputData("")
    }
  }

  // editing the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    })
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  }

  // deleting items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems)
  }

  // removing all the items
  const removeAll = () => {
    setItems([]);
  }

  // adding localstorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items])

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <h2 className='texthead'>TO-DO-LIST APP</h2>
          <figure>
            <img src="to-do-list-apps.png" alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div id="swal"></div>
          <div className='addItems'>
            
            <input type="text" placeholder='Add Item'
              className='form-control' value={inputdata} onChange={(event) => setInputData(event.target.value)} />
            {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) :
              (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
            }

          </div>
          {/* show our items */}
          <div className='showItems'>
            {items.map((curElem) => {
              return (
                <div className='eachItem' key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className='todo-btn'>
                    <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              )
            })}
          </div>

          {/* remove all buttons */}
          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
              <span>Delete List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo