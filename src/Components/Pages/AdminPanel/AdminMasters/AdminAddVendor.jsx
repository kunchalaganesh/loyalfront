import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
import {
    a100,
    a104,
    a107,
    a108,
    a109,
    a110,
    a111,
    a112,
    a119,
    a120,
    a121,
    a122,
    a123,
    a124,
    a125,
    a126,
    a127,
    a128,
    a129,
    a130,
    a131,
    a132,
    a133,
    a149,
    a150,
    a151,
    a18,
    a35,
    a7,
    a95,
    a96,
    a97,
    a98,
    a99,
} from "../../../Api/RootApiPath";
import {useSelector} from "react-redux";
import {RiListUnordered, RiPlayListAddLine} from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";
import {allCountriesList} from "../../../Api/CountriesAllList";
import {allStateList} from "../../../Api/StateList";

export default function AdminAddVendor() {
    const [active, setActive] = useState("List");
    const [showError, setShowError] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [messageToShow, setMessageToShow] = useState("");
    const [loading, setLoading] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        VendorCode: "",
        VendorName: "",
        VendorPanNo: "",
        ContactNo: "",
        Email: "",
        Address: "",
        State: "",
        City: "",
        Country: "India",
        FirmName: "",
        FirmDetails: "",
        GSTNo: "",
        CGSTNo: "",
        VendorType: "",
        OnlineStatus: "Active",
        BalanceAmt: "0",
        FineSilver: "0",
        FineGold: "0",
        InwardNo: "0",
        AdvanceAmt: "0",
        InwardGold: "0",
        InwardSilver: "0",
        CustomerId: 0,
        AddToCustomer: false,
        OldEntry: false,
    });
    const [allCompaniesList, setAllCompaniesList] = useState([]);
    const [allBranchesList, setAllBranchesList] = useState([]);
    const [allDepartmentsList, setAllDepartmentsList] = useState([]);
    const [countryStates, setCountryStates] = useState([]);
    const [allRolesList, setAllRolesList] = useState([]);
    const [allCategoriesList, setAllCategoriesList] = useState([]);
    const [allProductsList, setAllProductsList] = useState([]);
    const allStates = useSelector((state) => state);
    const adminLoggedIn = allStates.reducer1;
    //   let Entryby_Staff_id = parseInt(adminLoggedIn);
    const clientCode = adminLoggedIn.ClientCode;
    const employeeCode = adminLoggedIn.EmployeeCode;
    const states = {
        US: ["California", "Texas", "Florida", "New York"],
        IN: allStateList,
    };
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    const fetchAllCategory = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a149, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllCategories(data);
            } else {
                setActive("addNew");
                document
                    .getElementById("addCategoryListTitle")
                    .classList.add("activeCategoryTitle");
                document
                    .getElementById("addCategoryListLogo")
                    .classList.add("activeCategoryLogo");
                document.getElementById("addCategoryListTitle").click();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCategory();
    }, []);
    const fetchAllCompanies = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a95, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllCompaniesList(data);
            } else {
                // alert("Please Add Company First");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCompanies();
    }, []);
    const fetchAllBranches = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a98, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllBranchesList(data);
            } else {
                // alert("Please Add Branch First");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchAllBranches();
    }, []);

    const fetchAllDepartments = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a104, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllDepartmentsList(data);
            } else {
                // alert("Please Add Department First");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllDepartments();
    }, []);
    const fetchAllRoles = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a107, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllRolesList(data);
            } else {
                // alert("Please Add Role First");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllRoles();
    }, []);
    const fetchAllCategoriesList = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a125, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllCategoriesList(data);
            } else {
                // alert("Please Add Category First");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCategoriesList();
    }, []);
    const fetchAllProductsList = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a128, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data.length > 0) {
                setAllProductsList(data);
            } else {
                // alert("Please Add Product First");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllProductsList();
        if (newCategory.Country == "India") {
            setCountryStates(states.IN);
        }
    }, []);
    const handleNewCategoryChange = (e) => {
        const {name, value} = e.target;

            if (name == "Country" && value == "India") {
                setCountryStates(states.IN);
                setNewCategory({ ...newCategory, Country: value, State: "" });
            } else if (name == "Country" && value == "United States") {
                setCountryStates(states.US);
                setNewCategory({ ...newCategory, Country: value, State: "" });
            } else {
                setNewCategory({ ...newCategory, [name]: value });
                setCountryStates([]);
            }
        if (name == "AddToCustomer") {
            if (!newCategory.OldEntry) {
                setNewCategory({
                    ...newCategory,
                    [name]: name === "VendorCode" ? !newCategory.OldEntry ? allCategories.length + 1 : newCategory.VendorCode : value
                })
            } else {
                setMessageType("error");
                setMessageToShow("Kindly Change it from Settings");
                setShowError(true);
            }
        } else {
            setNewCategory({
                ...newCategory,
                [name]: name === "VendorCode" ? !newCategory.OldEntry ? allCategories.length + 1 : newCategory.VendorCode : value
            })
        }
    };

    const addNewCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            ClientCode: clientCode,
            VendorCode: !newCategory.OldEntry ? String(allCategories.length + 1) : String(newCategory.VendorCode),
            VendorName: newCategory.VendorName,
            VendorPanNo: newCategory.VendorPanNo,
            ContactNo: newCategory.ContactNo,
            Email: newCategory.Email,
            Address: newCategory.Address,
            State: newCategory.State,
            City: newCategory.City,
            Country: newCategory.Country,
            FirmName: newCategory.FirmName,
            FirmDetails: newCategory.FirmDetails,
            GSTNo: newCategory.GSTNo,
            CGSTNo: newCategory.CGSTNo,
            VendorType: newCategory.VendorType,
            OnlineStatus: newCategory.OnlineStatus,
            BalanceAmt: newCategory.BalanceAmt,
            FineSilver: newCategory.FineSilver,
            FineGold: newCategory.FineGold,
            InwardNo: newCategory.InwardNo,
            AdvanceAmt: newCategory.AdvanceAmt,
            InwardGold: newCategory.InwardGold,
            InwardSilver: newCategory.InwardSilver,
            CustomerId: newCategory.CustomerId,
            AddToCustomer: newCategory.AddToCustomer === "true",

            ...(newCategory.OldEntry ? {Id: newCategory.Id} : {}),
        };
        try {
            const response = await fetch(
                !newCategory.OldEntry ? a151 : a150,
                // a96,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();
            fetchAllCategory();
            setActive("List");
            setNewCategory({
                VendorCode: !newCategory.OldEntry ? allCategories.length + 1 : newCategory.VendorCode,
                VendorName: "",
                VendorPanNo: "",
                ContactNo: "",
                Email: "",
                Address: "",
                State: "",
                City: "",
                Country: "India",
                FirmName: "",
                FirmDetails: "",
                GSTNo: "",
                CGSTNo: "",
                VendorType: "",
                OnlineStatus: "Active",
                BalanceAmt: "0",
                FineSilver: "0",
                FineGold: "0",
                InwardNo: "0",
                AdvanceAmt: "0",
                InwardGold: "0",
                InwardSilver: "0",
                CustomerId: 0,
                AddToCustomer: false,
                OldEntry: false,
            });
            if (data.message) {
                // alert(data.message);
                setMessageType("error");
                setMessageToShow(data.message);
                setShowError(true);
                setActive("AddNew");
            } else {
                setMessageType("success");
                setMessageToShow("Category Added Successfully");
                setShowError(true);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setShowError(false);
        }, 2000);
    }, [showError]);

    const handleEditData = (data) => {
        setNewCategory({...data, OldEntry: true});
        setActive("AddNew");
    };
    return (
        <div>
            <AdminHeading/>
            <div className="adminMainBodyBox">
                {showError ? (
                    <AlertMessage message={messageToShow} type={messageType}/>
                ) : null}
                <AdminBreadCrump
                    title={"Add Vendor"}
                    companyName={"Loyalstring"}
                    module={"Product Masters"}
                    page={"Vendor"}
                />
                <div className="adminAddCategoryMainBox">
                    <div className="adminAddCategoryInnerBox">
                        <div className="adminAddCategoryInnerBoxTitlesBox">
                            <div
                                onClick={() => {
                                    setActive("List");
                                }}
                                className={
                                    active === "List"
                                        ? "adminAddCategoryInnerBoxTitle"
                                        : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                                }
                            >
                                <div
                                    className={
                                        active === "List"
                                            ? "adminAddCategoryInnerBoxTitleLogo"
                                            : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                                    }
                                >
                                    {/* 01 */}
                                    <RiListUnordered/>
                                </div>
                                <p>All Vendors</p>
                            </div>

              <div
                id="addCategoryListTitle"
                onClick={() => setActive("AddNew")}
                className={
                  active === "AddNew"
                    ? "adminAddCategoryInnerBoxTitle"
                    : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                }
              >
                <div
                  id="addCategoryListLogo"
                  className={
                    active === "AddNew"
                      ? "adminAddCategoryInnerBoxTitleLogo"
                      : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                  }
                >
                  {/* 02 */}
                  <RiPlayListAddLine />
                </div>
                <p>Add Vendor</p>
              </div>
            </div>
            <div
              className={
                active === "List" ? "adminCategoryListMainBox" : "none"
              }
            >
              <table>
                <thead>
                  <tr>
                    <th>Edit</th>
                    <th>Sr.No</th>
                    <th>Vendor Code</th>
                    <th>Vendor Name</th>
                    <th>Firm Name</th>
                    <th>Firm Details</th>
                    <th>Contact No.</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Vendor Pan No.</th>
                    <th>GST No.</th>
                    <th>Vendor Type</th>
                    <th>Online Status</th>
                    <th>Balance Amt</th>
                    <th>Advance Amt.</th>
                    <th>Fine Silver</th>
                    <th>Fine Gold</th>
                    {/*<th>Inward No.</th>*/}
                    {/*<th>Inward Gold</th>*/}
                    {/*<th>Inward Silver</th>*/}
                  </tr>
                </thead>
                <tbody>
                  {allCategories.map((x, index) => (
                    <tr key={x.id}>
                      <td>
                        <button
                          className="adminAddCategoryEditButton"
                          // onClick={() => handleEditClick(x.id)}
                          onClick={() => handleEditData(x)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td>{x.VendorCode}</td>
                      <td>{x.VendorName}</td>
                      <td>{x.FirmName}</td>
                      <td>{x.FirmDetails}</td>
                      <td>{x.ContactNo}</td>
                      <td>{x.Email}</td>
                      <td>{x.Address}</td>
                      <td>{x.State}</td>
                      <td>{x.City}</td>
                      <td>{x.Country}</td>
                      <td>{x.VendorPanNo}</td>
                      <td>{x.GSTNo}</td>
                      <td>{x.VendorType}</td>
                      <td>{x.OnlineStatus}</td>
                      <td>{x.BalanceAmt}</td>
                      <td>{x.AdvanceAmt}</td>
                      <td>{x.FineSilver}</td>
                      <td>{x.FineGold}</td>
                      {/*<td>{x.InwardNo}</td>*/}
                      {/*<td>{x.InwardGold}</td>*/}
                      {/*<td>{x.InwardSilver}</td>*/}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={
                active !== "List" ? "adminCategoryAddCategoryMainBox" : "none"
              }
            >
              <h4
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                  id="adminInvoiceAddedCustomerEdit"
                  className="adminInvoiceAddTitles"
              >
                Vendor Details
              </h4>
              <form onSubmit={addNewCategory}>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>Vendor Code</label>
                  <input
                      name="VendorCode"
                      // value={
                      //   newCategory.VendorCode
                      //     ? newCategory.VendorCode
                      //     : allCategories.pop()[0].Id + 1
                      // }
                      value={
                        !newCategory.OldEntry ? allCategories.length + 1 : newCategory.VendorCode
                      }
                      // onChange={handleNewCategoryChange}
                      readOnly
                      type="text"

                      // required="required"
                  />

                  <label>
                    Vendor Name<sup>*</sup>
                  </label>
                  <input
                    name="VendorName"
                    value={newCategory.VendorName}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>
                    Firm Name<sup>*</sup>
                  </label>
                  <input
                      name="FirmName"
                      value={newCategory.FirmName}
                      onChange={handleNewCategoryChange}
                      type="text"
                      required="required"
                  />
                  <label>Firm Details</label>
                  <input
                      name="FirmDetails"
                      value={newCategory.FirmDetails}
                      onChange={handleNewCategoryChange}
                      type="text"
                      // required="required"
                  />

                  <label>
                    Contact No.<sup>*</sup>
                  </label>
                  <input
                    name="ContactNo"
                    value={newCategory.ContactNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />

                  <label>Email</label>
                  <input
                    name="Email"
                    value={newCategory.Email}
                    onChange={handleNewCategoryChange}
                    type="email"
                    // required="required"
                  />

                  <label>Address</label>
                  <input
                    name="Address"
                    value={newCategory.Address}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />
                    <label>
                        Country<sup>*</sup>
                    </label>
                    <select
                        name="Country"
                        required="required"
                        value={newCategory.Country}
                        onChange={handleNewCategoryChange}
                    >
                        {allCountriesList.map((x, y) => (
                            <option key={y} value={x}>
                                {x}
                            </option>
                        ))}
                    </select>
                  <label>
                    State<sup>*</sup>
                  </label>
                  <input
                    name="State"
                    value={newCategory.State}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                    list="statesList"
                  />
                    <datalist id="statesList">
                        {countryStates.map((x, index) => (
                            <option key={index} value={x}>
                                {x}
                            </option>
                        ))}
                    </datalist>

                  <label>City</label>
                  <input
                    name="City"
                    value={newCategory.City}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />


                  {/*<input*/}
                  {/*  name="Country"*/}
                  {/*  value={newCategory.Country}*/}
                  {/*  onChange={handleNewCategoryChange}*/}
                  {/*  type="text"*/}
                  {/*  required="required"*/}
                  {/*/>*/}


                  <label>Vendor Pan No.</label>
                  <input
                      name="VendorPanNo"
                      value={newCategory.VendorPanNo}
                      onChange={handleNewCategoryChange}
                      type="text"
                      // required="required"
                  />


                  <label>GST No.</label>
                  <input
                    name="GSTNo"
                    value={newCategory.GSTNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />
                </div>
                <h4
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                    id="adminInvoiceAddedCustomerEdit"
                    className="adminInvoiceAddTitles"
                >
                  Additional Details
                </h4>
                <div
                    style={{
                      gridTemplateColumns: "repeat(4,1fr)",
                      columnGap: "40px",
                    }}
                    className="adminCategoryAddCategoryInnerBox"
                    >


                  <label>
                    Vendor Type<sup>*</sup>
                  </label>
                  <select
                    name="VendorType"
                    value={newCategory.VendorType}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>
                    <option value={"Party"}>Party</option>
                    <option value={"Karigar"}>Karigar</option>
                  </select>

                  <label>Online Status</label>
                  <input
                    name="OnlineStatus"
                    value={newCategory.OnlineStatus}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />

                  <label>Balance Amt.</label>
                  <input
                    name="BalanceAmt"
                    value={newCategory.BalanceAmt}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />
                  <label>Advance Amt.</label>
                  <input
                      name="AdvanceAmt"
                      value={newCategory.AdvanceAmt}
                      onChange={handleNewCategoryChange}
                      type="text"
                      // required="required"
                  />
                  <label>Fine Gold</label>
                  <input
                      name="FineGold"
                      value={newCategory.FineGold}
                      onChange={handleNewCategoryChange}
                      type="text"
                      // required="required"
                  />
                  <label>Fine Silver</label>
                  <input
                    name="FineSilver"
                    value={newCategory.FineSilver}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />



                  {/*<label>Inward No.</label>*/}
                  {/*<input*/}
                  {/*  name="InwardNo"*/}
                  {/*  value={newCategory.InwardNo}*/}
                  {/*  onChange={handleNewCategoryChange}*/}
                  {/*  type="text"*/}
                  {/*  // required="required"*/}
                  {/*/>*/}



                  {/*<label>Inward Gold</label>*/}
                  {/*<input*/}
                  {/*  name="InwardGold"*/}
                  {/*  value={newCategory.InwardGold}*/}
                  {/*  onChange={handleNewCategoryChange}*/}
                  {/*  type="text"*/}
                  {/*  // required="required"*/}
                  {/*/>*/}

                  {/*<label>Inward Silver</label>*/}
                  {/*<input*/}
                  {/*  name="InwardSilver"*/}
                  {/*  value={newCategory.InwardSilver}*/}
                  {/*  onChange={handleNewCategoryChange}*/}
                  {/*  type="text"*/}
                  {/*  // required="required"*/}
                  {/*/>*/}
                  <label>Add To Customer</label>
                  <select
                    name="AddToCustomer"
                    value={newCategory.AddToCustomer}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={false}>NO</option>
                    <option value={true}>YES</option>
                  </select>
                </div>
                {!loading ? <button type="submit">Submit</button> : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
