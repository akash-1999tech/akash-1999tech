import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import baseProductURL from "./constant";
import { useFormik } from "formik";

// var index = require("../public/index.html");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    padding: "0px",
  },
};
const headerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 20px 10px",
  border: "1px solid lightgray",
};
const validate = (values) => {
  console.log(values, "-------------------------------------");
  const reg = new RegExp('^[0-9]+$');
  const errors = {};
  if (!values.productName) {
    errors.productName = "This is a required field";
  }
  if (!values.sellCount) {
    errors.sellCount = "This is a required field";
  }
  else if (!reg.test(values.sellCount)) {
    errors.sellCount = "only numbers";

  }
  if (!values.stockCount) {
    errors.stockCount = "This is a required field";
  }
  else if (!reg.test(values.stockCount)) {
    errors.stockCount = "only numbers";

  }
  if (!values.productType) {
    errors.productType = "This is a required field";
  }
  if (!values.soldCount) {
    errors.soldCount = "This is a required field";
  }

  return errors;
};

Modal.setAppElement("#root");

// const baseURL2 = "http://localhost:4000/product/productTypeList";

const AddModalComponent = (props) => {
  const [productTypeInput, setProductTypeInput] = useState(null);
  const [editProductModal, setEditProductModal] = useState(null);
  //   const [currentRadioValue, setCurrentRadioValue] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [prdtName, setPrdtName] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isSold, setIsSold] = useState();
  const [isSoldCount, setIsSoldCount] = useState();
  const [isStockCount, setIsStockCount] = useState();
  const [isSoldRadio, setIsSoldRadio] = useState();
  const [isProductType, setIsProductType] = useState([]);
  const [editProductImage, setEditProductImage] = useState();
  const [imageErrorMsg, setimageErrorMsg] = useState("");
  const [imageSize, setimageSize] = useState("");

  const changeHandler = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
    setimageSize(event.target.files[0].size);
    setIsFilePicked(true);
  };

  const handleRadioChange = (e) => {
    setIsSold(e.target.value);
  };

  const handleProductType = (e) => {
    setIsProductType(e.target.value);
  };

  const productTypeList = () => {
    axios.get(baseProductURL + "product/productTypeList").then((res) => {
      setProductTypeInput(res.data.data);
    });
  };
  const productTypeById = () => {
    axios.get(baseProductURL + "product/" + props.editProductId).then((res) => {
      setEditProductModal(res.data.data);
      setPrdtName(res.data.data[0].product_name);
      setIsSold(res.data.data[0].is_available);
      setIsProductType(res.data.data[0].product_type_name);
      setEditProductImage(res.data.data[0].product_img);
      setIsSoldCount(res.data.data[0].sold_count);
      setIsStockCount(res.data.data[0].available_count);
    });
  };
  const reg_1 = new RegExp('^[0-9]+$');

  useEffect(() => {
    productTypeList();
    if (props.isEdit) {
      productTypeById();
    }
  }, []);



  const formik = useFormik({
    initialValues: {
      productName: prdtName ? prdtName : "",
      sellCount: isSoldCount ? isSoldCount : "",
      stockCount: isStockCount ? isStockCount : "",
      productType: isProductType ? isProductType : "",
      soldCount: isSold ? isSold : "",
    },
    validate,
    onSubmit: () => {
      console.log(selectedFile, "----selectedFile-----------");
      if (!selectedFile) {
        setimageErrorMsg("This is required field")
      } else {
        alert("bvb");
      }
    },
  });
  console.log(prdtName, isSoldCount, isStockCount, isProductType, isSold);
  console.log(formik.values.productName, formik.values.sellCount, formik.values.stockCount, formik.values.productType, formik.values.soldCount);


  useEffect(() => {
    var sizeInMB = (imageSize / (1024 * 1024)).toFixed(2);
    if (sizeInMB > 1) {
      setimageErrorMsg("File Should be less than 1MB")
    }
    else {
      setimageErrorMsg("")
    }

  }, [selectedFile])



  if (!productTypeInput) return null;
  return (
    <div>
      <Modal
        isOpen={props.handleOpen}
        onRequestClose={props.handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="card-header" style={headerStyles}>
          <h2 style={{ marginTop: "0px", marginBottom: "0px" }}>
            {props.headerText}
          </h2>
          <button onClick={props.handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            {props.isEdit ? (
              <div>
                <p>
                  Product Id : <b>{props.editProductId}</b>
                </p>
              </div>
            ) : null}
            <div className="row">
              <div className="form_group col-6">
                <label>Product Name</label>
                <input
                  name="productName"
                  placeholder="ProductName"
                  value={formik.values.productName}
                  onChange={
                    formik.handleChange
                  }
                />
                {formik.touched.productName &&
                  formik.errors.productName ?
                  (
                    <div className="error">{formik.errors.productName}</div>
                  ) : null}
              </div>
              <div className="form_group col-6">
                <label>Product Type</label>
                <select
                  name="productType"
                  value={formik.values.productType
                  }
                  onChange={
                    formik.handleChange
                  }
                >
                  <option value="Select the type">Select the type </option>
                  {productTypeInput &&
                    productTypeInput.length &&
                    productTypeInput.map((data2) => {
                      return (
                        <option value={data2.product_type_name}>
                          {data2.product_type_name}
                        </option>
                      );
                    })}
                </select>
                {formik.touched.productType &&
                  formik.errors.productType ? (
                  <div className="error">{formik.errors.productType}</div>
                ) : null}
              </div>
              <div className="form_group col-6">
                <label>Sell Count</label>
                <input
                  name="sellCount"
                  placeholder="sellCount"
                  value={props.isEdit ? isSoldCount : formik.values.sellCount}
                  onChange={
                    formik.handleChange
                  }
                  onKeyPress={() => {
                    if (!reg_1.test(formik.values.sellCount)) {
                      document.querySelector(".error_1").innerHTML = "only numbers";
                    }
                  }}
                />
                {formik.touched.sellCount &&
                  formik.errors.sellCount ? (
                  <div className="error error_1">{formik.errors.sellCount}</div>
                ) : null}
              </div>
              <div className="form_group col-6">
                <label>Stock Count</label>
                <input
                  name="stockCount"
                  placeholder="stockCount"
                  value={props.isEdit ? isStockCount : formik.values.stockCount}
                  onChange={
                    formik.handleChange
                  }
                  onKeyPress={() => {
                    if (!reg_1.test(formik.values.stockCount)) {
                      document.querySelector(".error_2").innerHTML = "only numbers";
                    }
                  }}
                />
                {formik.touched.stockCount &&
                  formik.errors.stockCount ? (
                  <div className="error error_2">{formik.errors.stockCount}</div>
                ) : null}
              </div>
              <div className="col-6 mb_16">
                <label>Sold</label>
                <div className="file_upload">
                  <div>
                    <input
                      id="radio-item-1"
                      name="soldCount"
                      type="radio"
                      value={1}
                      onChange={formik.handleChange
                      }
                      checked={
                        props.isEdit
                          ? isSold == "1"
                          : formik.values.soldCount == "1"
                      }
                    />
                    <label htmlFor="radio-item-1">Yes</label>
                  </div>
                  <div className="ml_20">
                    <input
                      id="radio-item-2"
                      name="soldCount"
                      type="radio"
                      value={0}
                      onChange={formik.handleChange
                      }
                      checked={
                        props.isEdit
                          ? isSold == "0" :
                          formik.values.soldCount == "0"
                      }
                    />
                    <label htmlFor="radio-item-2">No</label>
                  </div>
                </div>
                {formik.touched.soldCount &&
                  formik.errors.soldCount &&
                  !props.isEdit ? (
                  <div className="error">{formik.errors.soldCount}</div>
                ) : null}
              </div>
              <div className="col-6 mb_16">
                <input
                  type="file"
                  name="fileUpload"
                  onChange={changeHandler}
                />
                {imageErrorMsg && <div className="error">{imageErrorMsg}</div>}
              </div>
              <div className="col-6 mb_16"></div>
              <div className="col-6 mb_16">
                <div className="text-center">
                  <img
                    className="edit_image"
                    src={
                      isFilePicked === true && !imageErrorMsg
                        ? URL.createObjectURL(selectedFile)
                        : editProductImage
                    }
                  />
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                type="button"
                className="btn delete_btn"
                onClick={props.handleClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn add_btn ml_20">
                {props.isEdit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddModalComponent;
