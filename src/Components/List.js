import React from 'react'

export default function List({ list, removedItem, editItem }) {
  return (
      <div className='container'>
          {list.map(item => {
              const {id, title}=item
              return (
                <ul className="list-group list-group-flush" key={id}>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    {title}
                    <div style={{ float: "right" }}>
                      <button className="edit-btn" onClick={() => editItem(id)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => removedItem(id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </li>
                </ul>
              );
          })}
    </div>
  )
}
