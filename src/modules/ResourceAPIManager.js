

export default {
  getAllItems: (items, userId) => {
    const fetchString =(userId?`?userId=${userId}`:"")
    return fetch(`http://localhost:5002/${items}${fetchString}`)
      .then(r => r.json())
  },
  getAdmins: ()=>{
    return fetch(`http://localhost:5002/users/?isAdmin=true`)
    .then(r => r.json())
  },
  getSingleItem: (items, id) => {
    return fetch(`http://localhost:5002/${items}/${id}`)
      .then(r => r.json())
  },
  deleteItem: (items, id) => {
    return fetch(`http://localhost:5002/${items}/${id}`, {
      method: "DELETE"
    })
  },
  addNewItem(items, newItem) {
    return fetch(`http://localhost:5002/${items}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    }).then(data => data.json())
  },
  editItem(items, editedItem) {
    return fetch(`http://localhost:5002/${items}/${editedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedItem)
    }).then(data => data.json());
  },
  patchItem(items, id, patchItem) {
    return fetch(`http://localhost:5002/${items}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patchItem)
    }).then(data => data.json());
  }


}

