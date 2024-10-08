import React, {useEffect, useState} from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import {TbCircleNumber1} from "react-icons/tb";
import {
    a100,
    a104,
    a107,
    a108,
    a109,
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

export default function AdminAddRoles() {
    const [active, setActive] = useState("List");
    const [showError, setShowError] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [messageToShow, setMessageToShow] = useState("");
    const [loading, setLoading] = useState(false);

    const [allCategories, setAllCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        Department: "",
        Role: "",
        Description: "",
        OldEntry: false,
    });
    const [allCompaniesList, setAllCompaniesList] = useState([]);
    const [allDepartmentsList, setAllDepartmentsList] = useState([]);
    const allStates = useSelector((state) => state);
    const adminLoggedIn = allStates.reducer1;
    //   let Entryby_Staff_id = parseInt(adminLoggedIn);
    const clientCode = adminLoggedIn.ClientCode;

    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    const fetchAllCategory = async () => {
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
        console.log(data, "data,");
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
        console.log(data, "data,");
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
        console.log(data, "data,");
        try {
            if (data.length > 0) {
                setAllDepartmentsList(data);
            } else {
                // alert("Please Add Company First");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchAllDepartments();
    }, []);
    console.log(allCategories, "allCategories");
    console.log(allCompaniesList, "allCompaniesList");
    console.log(allDepartmentsList, "allDepartmentsList");

    const handleNewCategoryChange = (e) => {
        const {name, value} = e.target;
        // Update the edited data in the state
        setNewCategory({...newCategory, [name]: value});
    };
    console.log(newCategory, "newCategory");
    console.log(newCategory, "newCategory");

    const addNewCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            ClientCode: clientCode,
            DepartmentId: newCategory.Department,
            Role: newCategory.Role,
            Description: newCategory.Description,
            ...(newCategory.OldEntry ? {Id: newCategory.Id} : {}),
        };
        console.log(formData, "formData to send");
        try {
            const response = await fetch(
                !newCategory.OldEntry ? a109 : a108,
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
                Department: "",
                Role: "",
                Description: "",
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
                setMessageToShow("Role Added Successfully");
                setShowError(true);
            }
            setLoading(false);
            console.log(data);
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
        setNewCategory({...data,Department: data.DepartmentId, OldEntry: true});
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
                    title={"Add Roles"}
                    companyName={"Loyalstring"}
                    module={"User Masters"}
                    page={"Roles"}
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
                                <p>All Roles</p>
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
                                    <RiPlayListAddLine/>
                                </div>
                                <p>Add Role</p>
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
                                    <th>Department</th>
                                    <th>Role</th>
                                    <th>Description</th>
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
                                        <td>{x.DeptName}</td>
                                        <td>{x.Role}</td>
                                        <td>{x.Description}</td>
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
                            <p>Add New Role</p>
                            <form onSubmit={addNewCategory}>
                                <div
                                    style={{
                                        gridTemplateColumns: "repeat(4,1fr)",
                                        columnGap: "40px",
                                        minHeight: "50px",
                                    }}
                                    className="adminCategoryAddCategoryInnerBox"
                                >
                                    <label>
                                        Department <sup>*</sup>
                                    </label>
                                    <select
                                        name="Department"
                                        value={newCategory.Department}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required="required"
                                    >
                                        <option value={""}>Select an option</option>
                                        {allDepartmentsList.map((x) => {
                                            return (
                                                <>
                                                    <option value={x.Id}>{x.DeptName}</option>
                                                </>
                                            );
                                        })}
                                    </select>
                                    {/* <input
                    name="CompId"
                    value={newCategory.CompId}
                    onChange={handleNewCategoryChange}
                    type="text"
                  /> */}

                                    <label>
                                        Role <sup>*</sup>
                                    </label>
                                    <input
                                        name="Role"
                                        value={newCategory.Role}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required="required"
                                    />

                                    <label>Description</label>
                                    <input
                                        name="Description"
                                        value={newCategory.Description}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
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
