import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { AiOutlineLeft, AiOutlineRight, AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import AddModalComponent from "./AddModalComponent";

const baseURL = "http://localhost:4000/product";

const Tabledata = () => {
  const [tableData, setTableData] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [editProductId, setEditProductId] = useState(0);
  // const [itemPerPage, setitemPerPage] = useState();
  const [pageCount, setpageCount] = useState(0);

  function openModal() {
    setOpenAddModal(true);
  }

  function closeModal() {
    setOpenAddModal(false);
  }

  function editModal(e) {
    setOpenAddModal(true);
    setIsEdit(true);
    setEditProductId(e);
  }
  function viewModal(e) {
    setOpenAddModal(true);
    setIsView(true);
  }
  function addItems() {
    setOpenAddModal(true);
    setIsEdit(false);
  }
  const limit = 3;
  useEffect(() => {
    axios.get(`${baseURL}?page=${1}`).then((response) => {
      setTableData(response.data.data);
      const totalCountNum = response.data.totalCount[0].total;
      setpageCount(Math.ceil(totalCountNum / limit));
      console.log(tableData);
    });
  }, []);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    await axios.get(`${baseURL}?page=${currentPage}`).then((response) => {
      setTableData(response.data.data);
    });
  };

  if (!tableData) return null;

  return (
    <div className="pb_20 tableDataContainer">
      <div>
        <button type="button" className="btn add_btn" onClick={addItems}>
          Add
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Sold</th>
            <th>Sold Count</th>
            <th>Stock Count</th>
            <th>Product Type</th>
            <th>Product Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.length &&
            tableData.map((data, index) => {
              //   console.log(index);
              return (
                <tr key={data.product_id}>
                  <td>{data.product_id}</td>
                  <td>{data.product_id}</td>
                  <td>{data.product_name}</td>
                  <td>{data.is_available === 1 ? "yes" : "No"}</td>
                  <td>{data.sold_count}</td>
                  <td>{data.available_count}</td>
                  <td>{data.product_type_name}</td>
                  <td>
                    <img width={100} src={data.product_img} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary edit_btn"
                      onClick={() => editModal(data.product_id)}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary view_btn"
                      onClick={() => { viewModal(data.product_id) }}
                    >
                      <GrFormView />
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary delete_btn"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={<AiOutlineLeft />}
        nextLabel={<AiOutlineRight />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      {openAddModal && (
        <AddModalComponent
          handleOpen={openModal}
          handleClose={closeModal}
          headerText={isEdit ? "Edit Items" : "Add Items"}
          isEdit={isEdit}
          editProductId={editProductId}
        />
      )}
    </div>
  );
};

export default Tabledata;
//http://localhost:4000/product/productTypeList
