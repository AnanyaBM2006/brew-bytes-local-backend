import { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

function Categories() {
  const [categories, setCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const result = await getCategories();

    if (result.success) {
      setCategories(result.categories);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();

    const result = await addCategory(
      categoryName,
      description
    );

    setMessage(result.message);

    if (result.success) {
      setCategoryName("");
      setDescription("");

      loadCategories();

      document.getElementById("closeAddModal").click();
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const result = await updateCategory(
      editId,
      editCategoryName,
      editDescription
    );

    setMessage(result.message);

    if (result.success) {
      loadCategories();

      document.getElementById("closeEditModal").click();
    }
  }

  async function handleDelete(id) {

    if (!window.confirm("Delete this category?"))
      return;

    const result = await deleteCategory(id);

    setMessage(result.message);

    if (result.success) {
      loadCategories();
    }

  }

  function openEdit(category) {

    setEditId(category.category_id);

    setEditCategoryName(category.category_name);

    setEditDescription(category.description);

  }

  return (

    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Categories</h2>

        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          + Add Category
        </button>

      </div>

      {message && (

        <div className="alert alert-info">

          {message}

        </div>

      )}

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-hover">

            <thead className="table-dark">

              <tr>

                <th>Category Name</th>

                <th>Description</th>

                <th width="180">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {categories.map((category) => (

                <tr key={category.category_id}>

                  <td>
                    {category.category_name}
                  </td>

                  <td>
                    {category.description}
                  </td>

                  <td>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => openEdit(category)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(category.category_id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}
                            {categories.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">
                    No Categories Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Add Category Modal */}

      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
      >

        <div className="modal-dialog">

          <div className="modal-content">

            <form onSubmit={handleAdd}>

              <div className="modal-header">

                <h5 className="modal-title">
                  Add Category
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>

              </div>

              <div className="modal-body">

                <div className="mb-3">

                  <label className="form-label">
                    Category Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={categoryName}
                    onChange={(e) =>
                      setCategoryName(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                  ></textarea>

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="closeAddModal"
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
            {/* Edit Category Modal */}

      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
      >

        <div className="modal-dialog">

          <div className="modal-content">

            <form onSubmit={handleUpdate}>

              <div className="modal-header">

                <h5 className="modal-title">
                  Edit Category
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>

              </div>

              <div className="modal-body">

                <div className="mb-3">

                  <label className="form-label">
                    Category Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={editCategoryName}
                    onChange={(e) =>
                      setEditCategoryName(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    value={editDescription}
                    onChange={(e) =>
                      setEditDescription(e.target.value)
                    }
                  ></textarea>

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="closeEditModal"
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

export default Categories;