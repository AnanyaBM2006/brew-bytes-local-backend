import { useEffect, useState } from "react";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "../services/itemService";

import { getCategories } from "../services/categoryService";

function MenuItems() {

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [itemName, setItemName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [editId, setEditId] = useState("");
  const [editItemName, setEditItemName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadItems();
    loadCategories();
  }, []);

  async function loadItems() {

    const result = await getItems();

    if(result.success){

      setItems(result.items);

    }

  }

  async function loadCategories(){

    const result = await getCategories();

    if(result.success){

      setCategories(result.categories);

    }

  }

  async function handleAdd(e){

    e.preventDefault();

    const formData=new FormData();

    formData.append("item_name",itemName);
    formData.append("category_id",categoryId);
    formData.append("price",price);

    if(image){

      formData.append("image",image);

    }

    const result=await addItem(formData);

    setMessage(result.message);

    if(result.success){

      setItemName("");
      setCategoryId("");
      setPrice("");
      setImage(null);

      loadItems();

      document.getElementById("closeAddItem").click();

    }

  }

  function openEdit(item){

    setEditId(item.item_id);

    setEditItemName(item.item_name);

    setEditCategoryId(item.category_id);

    setEditPrice(item.price);

    setCurrentImage(item.image_path);

  }
    async function handleUpdate(e){

    e.preventDefault();

    const formData = new FormData();

    formData.append("item_id", editId);
    formData.append("item_name", editItemName);
    formData.append("category_id", editCategoryId);
    formData.append("price", editPrice);
    formData.append("current_image", currentImage);

    if(editImage){
      formData.append("image", editImage);
    }

    const result = await updateItem(formData);

    setMessage(result.message);

    if(result.success){

      loadItems();

      document.getElementById("closeEditItem").click();

    }

  }

  async function handleDelete(id){

    if(!window.confirm("Delete this item?")){
      return;
    }

    const result = await deleteItem(id);

    setMessage(result.message);

    if(result.success){
      loadItems();
    }

  }

  return(

    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Menu Items</h2>

        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addItemModal"
        >
          + Add Item
        </button>

      </div>

      {message &&

        <div className="alert alert-info">

          {message}

        </div>

      }

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-hover">

            <thead className="table-dark">

              <tr>

                <th>Image</th>

                <th>Item Name</th>

                <th>Category</th>

                <th>Price</th>

                <th width="180">

                  Action

                </th>

              </tr>

            </thead>

            <tbody>

              {items.map((item)=>(

                <tr key={item.item_id}>

                  <td>

                    {item.image_path ? (

                      <img
                       src={`https://v2cafe-mysore.infinityfreeapp.com/${item.image_path}`}
                        width="60"
                        height="60"
                        style={{
                          objectFit:"cover",
                          borderRadius:"8px"
                        }}
                      />

                    ):("No Image")}

                  </td>

                  <td>{item.item_name}</td>

                  <td>{item.category_name}</td>

                  <td>₹ {item.price}</td>

                  <td>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={()=>openEdit(item)}
                      data-bs-toggle="modal"
                      data-bs-target="#editItemModal"
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={()=>handleDelete(item.item_id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

              {items.length===0 &&

                <tr>

                  <td
                    colSpan="5"
                    className="text-center"
                  >

                    No Items Found

                  </td>

                </tr>

              }

            </tbody>

          </table>

        </div>

      </div>
            {/* Add Item Modal */}

      <div className="modal fade" id="addItemModal" tabIndex="-1">

        <div className="modal-dialog">

          <div className="modal-content">

            <form onSubmit={handleAdd}>

              <div className="modal-header">

                <h5 className="modal-title">
                  Add Menu Item
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>

              </div>

              <div className="modal-body">

                <div className="mb-3">

                  <label>Item Name</label>

                  <input
                    type="text"
                    className="form-control"
                    value={itemName}
                    onChange={(e)=>setItemName(e.target.value)}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>Category</label>

                  <select
                    className="form-select"
                    value={categoryId}
                    onChange={(e)=>setCategoryId(e.target.value)}
                    required
                  >

                    <option value="">
                      Select Category
                    </option>

                    {categories.map(category=>(

                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>

                    ))}

                  </select>

                </div>

                <div className="mb-3">

                  <label>Price</label>

                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>Image</label>

                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e)=>setImage(e.target.files[0])}
                  />

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="closeAddItem"
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Save
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

      {/* Edit Item Modal */}

      <div className="modal fade" id="editItemModal" tabIndex="-1">

        <div className="modal-dialog">

          <div className="modal-content">

            <form onSubmit={handleUpdate}>

              <div className="modal-header">

                <h5 className="modal-title">
                  Edit Menu Item
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>

              </div>

              <div className="modal-body">

                <div className="mb-3">

                  <label>Item Name</label>

                  <input
                    type="text"
                    className="form-control"
                    value={editItemName}
                    onChange={(e)=>setEditItemName(e.target.value)}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>Category</label>

                  <select
                    className="form-select"
                    value={editCategoryId}
                    onChange={(e)=>setEditCategoryId(e.target.value)}
                    required
                  >

                    {categories.map(category=>(

                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>

                    ))}

                  </select>

                </div>

                <div className="mb-3">

                  <label>Price</label>

                  <input
                    type="number"
                    className="form-control"
                    value={editPrice}
                    onChange={(e)=>setEditPrice(e.target.value)}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>Change Image</label>

                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e)=>setEditImage(e.target.files[0])}
                  />

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="closeEditItem"
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Update
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default MenuItems;