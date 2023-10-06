
import { useEffect, useState } from 'react';
import './App.css';
import Alert from './Components/Alert';
import List from './Components/List';

const getItemsFromLocal = () => {
  let getItems = localStorage.getItem('list');
  if (getItems) {
    return (getItems=JSON.parse(getItems))
  }
  else {
    return []
  }
}

function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState(getItemsFromLocal())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" })
  useEffect(() => {
   localStorage.setItem("list", JSON.stringify(list))
  },[list])
  const handelSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showalert(true, "danger", "Please enter value")
    }
    else if (name && isEditing) {
      setList(
        list.map(item => {
          if (item.id === editId) {
            return { ...item, title: name }
          }
          return item
        })
      );
      setName("")
      setEditId(null)
      setIsEditing(false)
      showalert(true, "success", "value changed")
    }
    else {
      showalert(true, "success", "item added to list")
      let newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName("")
    };
  }
  const showalert = (show = false, type = "",msg = "") => {
    setAlert({show,type,msg})
     };
  const removedItem = (id) => {
    showalert(true, "danger", "Item Removed ");
    setList(list.filter(item => item.id !== id));
     };
  const editItem = (id) => {
    const editItem = list.find(item => item.id === id);
    setIsEditing(true)
    setEditId(id)
    setName(editItem.title)
     };
  const clearList = () => {
    showalert(true, "warning", "Items Removed ");
    setList([])
   };
    return (
      <section className="section-center">
        <form onSubmit={handelSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showalert} list={list} />
          )}
          <h3 style={{ marginBottom: "1.5rem", alignItems: "center",display:"flex" ,justifyContent:"center"}}>
            ToDo List
          </h3>
          <div className="mb-3 form">
            <input
              className="form-control"
              type="text"
              placeholder="e.g. workOut"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button className="btn btn-success m-1">
              {isEditing ? "Edit" : "Add"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <List list={list} removedItem={removedItem} editItem={editItem} />
            <button className="mt-3 text-white btn btn-warning d-flex justify-content-center w-100 align-items-center" onClick={clearList}>
              Clear All
            </button>
          </div>
        )}
      </section>
    );
  }

export default App;
