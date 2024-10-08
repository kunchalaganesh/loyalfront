import React, {useEffect, useRef, useState} from "react";
import * as xlsx from "xlsx";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import DownloadIcon from '@mui/icons-material/Download';
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
    a137,
    a138,
    a139,
    a18,
    a191,
    a192,
    a193,
    a35,
    a7,
    a95,
    a96,
    a97,
    a98,
    a99,
    postAdminadddiamondsizeweightrate,
} from "../../../Api/RootApiPath";
import {useSelector} from "react-redux";
import {RiListUnordered, RiPlayListAddLine} from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";
import {useNavigate} from "react-router-dom";
import {Box, Grid} from "@mui/material";

export default function AdminAddDiamondSizeWeightRate() {
    const navigate = useNavigate();
    const [excelData, setExcelData] = useState([]);
    const fileInputRef = useRef(null);
    const [active, setActive] = useState("List");
    const [showError, setShowError] = useState(false);
    const [messageType, setMessageType] = useState("");
    const [messageToShow, setMessageToShow] = useState("");
    const [editId, setEditId] = useState("");
    const [uploadCheck, setUploadCheck] = useState(false);
    const [diamondShapes, setDiamondShapes] = useState([]);
    const [diamondClarities, setDiamondClarities] = useState([]);
    const [diamondColors, setDiamondColors] = useState([]);
    const [diamondCuts, setDiamondCuts] = useState([]);
    const [settingTypes, setSettingTypes] = useState([]);
    const [defaultTemplateData, setDefaultTemplateData] = useState([]);

    const [loading, setLoading] = useState(false);

    const [allCategories, setAllCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        DiamondSize: "",
        Sleve: "",
        DiamondWeight: "",
        DiamondPurchaseRate: "",
        DiamondSellRate: "",
        DiamondMargin: "",
        CompanyId: 0,
        BranchId: 0,
        DiamondShape: "",
        DiamondClarity: "",
        DiamondColor: "",
        DiamondCut: "",
        SettingType: "",
        CounterId: 0,
        EmployeeId: 0,
        TemplateName: "",

        OldEntry: false,
    });

    const [allTableData, setAllTableData] = useState([]);
    const [resData, setResData] = useState("");
    const [allCompaniesList, setAllCompaniesList] = useState([]);
    const [allBranchesList, setAllBranchesList] = useState([]);
    const [allDepartmentsList, setAllDepartmentsList] = useState([]);
    const [allRolesList, setAllRolesList] = useState([]);
    const [allCategoriesList, setAllCategoriesList] = useState([]);
    const [allProductsList, setAllProductsList] = useState([]);
    const allStates = useSelector((state) => state);
    const [defaultTemplateId, setDefaultTemplateId] = useState("");
    const adminLoggedIn = allStates.reducer1;
    //   let Entryby_Staff_id = parseInt(adminLoggedIn);
    const clientCode = adminLoggedIn.ClientCode;
    const employeeCode = adminLoggedIn.EmployeeCode;
    const companyId = adminLoggedIn.CompanyId;
    const branchId = adminLoggedIn.BranchId;
    const counterId = adminLoggedIn.CounterId;
    const employeeId = adminLoggedIn.EmployeeId;

    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    useEffect(() => {
        const fetchDiamondAttributes = async () => {
            const response = await fetch(
                "https://testing.loyalstring.co.in/api/ProductMaster/GetAllDiamondAttributes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ClientCode: clientCode,
                    }),
                }
            );
            const data = await response.json();
            const shapes = data.filter(
                (item) => item.DiamondAttribute === "DiamondShape"
            );
            const clarities = data.filter(
                (item) => item.DiamondAttribute === "DiamondClarity"
            );
            const colors = data.filter(
                (item) => item.DiamondAttribute === "DiamondColour"
            );
            const cuts = data.filter(
                (item) => item.DiamondAttribute === "DiamondCut"
            );
            const settings = data.filter(
                (item) => item.DiamondAttribute === "DiamondSettingType"
            );

            setDiamondShapes(shapes);
            setDiamondClarities(clarities);
            setDiamondColors(colors);
            setDiamondCuts(cuts);
            setSettingTypes(settings);
        };

        fetchDiamondAttributes();
    }, []);
    const fetchAllCategory = async () => {
        const formData = {
            ClientCode: clientCode,
        };
        const response = await fetch(a191, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwMzc1MDA4NTksImlzcyI6Ijk4Nzk4ODc2NzU3NjU2NjU0NjU0IiwiYXVkIjoiSW5mb0Bsb3lhbHN0cmluZy5jb20ifQ.nOtc537wlSYm_97ljruCyOcG7wjXOrNUtxZy206OfOQ",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        try {
            if (data) {
                setAllCategories(data);
            } else {
                setActive("addNew");
            }
            // else {
            //     setActive("addNew");
            //     document
            //         .getElementById("addCategoryListTitle")
            //         .classList.add("activeCategoryTitle");
            //     document
            //         .getElementById("addCategoryListLogo")
            //         .classList.add("activeCategoryLogo");
            //     document.getElementById("addCategoryListTitle").click();
            // }
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
                // alert("Please Add Departments First");
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
                // alert("Please Add Roles First");
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
    }, []);

    const handleNewCategoryChange = (e) => {
        const {name, value} = e.target;
        if (name === "DiamondMargin") {
            const diamondPurchaseRate = parseFloat(
                newCategory.DiamondPurchaseRate || 0
            );
            const diamondMargin = parseFloat(value || 0);
            const diamondSellRate = (
                diamondPurchaseRate *
                (1 + diamondMargin / 100)
            ).toFixed(2);

            setNewCategory({
                ...newCategory,
                [name]: value,
                DiamondSellRate: diamondSellRate,
            });
        } else if (name === "DiamondPurchaseRate") {
            const diamondPurchaseRate = parseFloat(value || 0);
            const diamondMargin = parseFloat(newCategory.DiamondMargin || 0);
            const diamondSellRate = (
                diamondPurchaseRate *
                (1 + diamondMargin / 100)
            ).toFixed(2);

            setNewCategory({
                ...newCategory,
                [name]: value,
                DiamondSellRate: diamondSellRate,
            });
        } else if (name === "DiamondSellRate") {
            const diamondSellRate = parseFloat(value || 0);
            const diamondPurchaseRate = parseFloat(
                newCategory.DiamondPurchaseRate || 0
            );

            if (diamondPurchaseRate !== 0) {
                const diamondMargin = (
                    (diamondSellRate / diamondPurchaseRate - 1) *
                    100
                ).toFixed(2);

                setNewCategory({
                    ...newCategory,
                    [name]: value,
                    DiamondMargin: diamondMargin,
                });
            } else {
                setNewCategory({
                    ...newCategory,
                    [name]: value,
                });
            }
        } else {
            setNewCategory({...newCategory, [name]: value});
        }
    };

    useEffect(() => {
        async function findNullData() {
            const payload = {
                ClientCode: clientCode,
            };
            const response = await fetch(
                "https://testing.loyalstring.co.in/api/ProductMaster/GetDiamondSizeWeightRateTemplate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwMzc1MDA4NTksImlzcyI6Ijk4Nzk4ODc2NzU3NjU2NjU0NjU0IiwiYXVkIjoiSW5mb0Bsb3lhbHN0cmluZy5jb20ifQ.nOtc537wlSYm_97ljruCyOcG7wjXOrNUtxZy206OfOQ",
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await response.json();
            const isNullData = data?.find((item) => item.TemplateName === "");
            if (isNullData) {
                setDefaultTemplateId(isNullData.Id);
            } else {
                setDefaultTemplateId("");
            }
        }

        if (!defaultTemplateId) {
            findNullData();
        }
    }, [defaultTemplateId]);

    async function fetchDefaultTemplate() {
        const payload = {
            Id: defaultTemplateId,
            ClientCode: clientCode,
        };
        const response = await fetch(
            "https://testing.loyalstring.co.in/api/ProductMaster/GetDiamondSizeWeightRateTemplate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwMzc1MDA4NTksImlzcyI6Ijk4Nzk4ODc2NzU3NjU2NjU0NjU0IiwiYXVkIjoiSW5mb0Bsb3lhbHN0cmluZy5jb20ifQ.nOtc537wlSYm_97ljruCyOcG7wjXOrNUtxZy206OfOQ",
                },
                body: JSON.stringify(payload),
            }
        );
        const data = await response.json();
        setDefaultTemplateData(data[0]?.DiamondSizeWeightRates);
    }

    useEffect(() => {
        if (defaultTemplateId) {
            fetchDefaultTemplate();
        }
    }, [defaultTemplateId]);

    const addNewCategory = async () => {
        setLoading(true);
        let arr = [];

        allTableData.map((item) => {
            arr.push({
                ClientCode: clientCode,
                DiamondSize: item.DiamondSize,
                DiamondShape: getShapeValue(null, item.DiamondShape),
                DiamondClarity: getDiamondClarity(null, item.DiamondClarity),
                DiamondColor: getDiamondColor(null, item.DiamondColor),
                DiamondCut: getDiamondCut(null, item.DiamondCut),
                SettingType: getSettingType(null, item.SettingType),
                Sleve: item.Sleve,
                DiamondWeight: item.DiamondWeight,
                DiamondPurchaseRate: item.DiamondPurchaseRate,
                DiamondSellRate: item.DiamondSellRate,
                DiamondMargin: String(item.DiamondMargin),
                CompanyId: companyId ? companyId : 0,
                BranchId: branchId ? branchId : 0,
                CounterId: counterId ? counterId : 0,
                EmployeeId: employeeId ? employeeId : 0,

                ...(item.OldEntry ? {Id: item.Id} : {}),
            });
        });

        try {
            if (defaultTemplateId && !newCategory.TemplateName) {
                const payload = {
                    Id: defaultTemplateId,
                    TemplateName: newCategory.TemplateName,
                    DiamondSizeWeightRates: editId
                        ? arr
                        : arr.concat(defaultTemplateData),
                    ClientCode: clientCode,
                };
                const response = await fetch(postAdminadddiamondsizeweightrate, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwMzc1MDA4NTksImlzcyI6Ijk4Nzk4ODc2NzU3NjU2NjU0NjU0IiwiYXVkIjoiSW5mb0Bsb3lhbHN0cmluZy5jb20ifQ.nOtc537wlSYm_97ljruCyOcG7wjXOrNUtxZy206OfOQ",
                    },
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                setResData(data);
                setEditId("");
                setDefaultTemplateId("");
            } else {
                if (editId) {
                    const payload = {
                        Id: editId,
                        TemplateName: newCategory.TemplateName,
                        DiamondSizeWeightRates: arr,
                        ClientCode: clientCode,
                    };
                    const response = await fetch(postAdminadddiamondsizeweightrate, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwMzc1MDA4NTksImlzcyI6Ijk4Nzk4ODc2NzU3NjU2NjU0NjU0IiwiYXVkIjoiSW5mb0Bsb3lhbHN0cmluZy5jb20ifQ.nOtc537wlSYm_97ljruCyOcG7wjXOrNUtxZy206OfOQ",
                        },
                        body: JSON.stringify(payload),
                    });
                    const data = await response.json();
                    setResData(data);
                    setEditId("");
                } else {
                    const payload = {
                        TemplateName: newCategory.TemplateName,
                        DiamondSizeWeightRates: arr,
                        ClientCode: clientCode,
                    };
                    const response = await fetch(postAdminadddiamondsizeweightrate, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwMzc1MDA4NTksImlzcyI6Ijk4Nzk4ODc2NzU3NjU2NjU0NjU0IiwiYXVkIjoiSW5mb0Bsb3lhbHN0cmluZy5jb20ifQ.nOtc537wlSYm_97ljruCyOcG7wjXOrNUtxZy206OfOQ",
                        },
                        body: JSON.stringify(payload),
                    });
                    const data = await response.json();
                    setResData(data);
                }
            }
            fetchAllCategory();
            setActive("List");
            setNewCategory({
                DiamondSize: "",
                Sleve: "",
                DiamondWeight: "",
                DiamondPurchaseRate: "",
                DiamondSellRate: "",
                DiamondMargin: "",
                DiamondShape: "",
                DiamondClarity: "",
                DiamondColor: "",
                DiamondCut: "",
                SettingType: "",
                CompanyId: 0,
                BranchId: 0,
                CounterId: 0,
                EmployeeId: 0,
                TemplateName: "",
                OldEntry: false,
            });
            if (resData.message) {
                // alert(data.message);
                setMessageType("error");
                setMessageToShow(resData.message);
                setShowError(true);
                setActive("AddNew");
            } else {
                setMessageType("success");
                setMessageToShow("Diamond Size/Weight/Rate Added Successfully");
                setShowError(true);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
        setDefaultTemplateId("");
    };
    useEffect(() => {
        setTimeout(() => {
            setShowError(false);
        }, 2000);
    }, [showError]);
    const handleTemplateDownload = (e, item) => {
        e.stopPropagation()
        const transformedData = item.DiamondSizeWeightRates.map((data, index) => {
                return {
                    Shape: getShapeValue(data.DiamondShape),
                    Clarity: getDiamondClarity(data.DiamondClarity),
                    Color: getDiamondColor(data.DiamondColor),
                    Cut: getDiamondCut(data.DiamondCut),
                    Setting: getSettingType(data.SettingType),
                    Size: data.DiamondSize,
                    Sleve: data.Sleve,
                    Weight: data.DiamondWeight,
                    'Purchase Rate': data.DiamondPurchaseRate,
                    Margin: data.DiamondMargin,
                    'Sell Rate': data.DiamondSellRate
                }
            }
        )
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(transformedData);
        xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        xlsx.writeFile(workbook, `${item.TemplateName ? item.TemplateName : "DefaultTemplate"}.xlsx`);
    };

    function getShapeValue(id, shape) {
        if (id) {
            const shapeValue = diamondShapes?.find((item) => item.Id == id);
            return id ? shapeValue?.DiamondValue : "";
        }
        if (shape) {
            const shapeValue = diamondShapes?.find(
                (item) => item.DiamondValue == shape
            );
            return shape ? shapeValue?.Id : "";
        }
    }

    function getDiamondClarity(id, clarity) {
        if (id) {
            const clarityValue = diamondClarities?.find((item) => item.Id == id);
            return id ? clarityValue?.DiamondValue : "";
        }
        if (clarity) {
            const clarityValue = diamondClarities?.find(
                (item) => item.DiamondValue == clarity
            );
            return clarity ? clarityValue?.Id : "";
        }
    }

    function getDiamondColor(id, color) {
        if (id) {
            const colorValue = diamondColors?.find((item) => item.Id == id);
            return id ? colorValue?.DiamondValue : "";
        }
        if (color) {
            const shapeValue = diamondColors?.find(
                (item) => item.DiamondValue == color
            );
            return color ? shapeValue?.Id : "";
        }
    }

    function getDiamondCut(id, cut) {
        if (id) {
            const cutValue = diamondCuts?.find((item) => item.Id == id);
            return id ? cutValue?.DiamondValue : "";
        }
        if (cut) {
            const cutValue = diamondCuts?.find((item) => item.DiamondValue == cut);
            return cut ? cutValue?.Id : "";
        }
    }

    function getSettingType(id, settingType) {
        if (id) {
            const settingTypeValue = settingTypes?.find((item) => item.Id == id);
            return id ? settingTypeValue?.DiamondValue : "";
        }
        if (settingType) {
            const shapeValue = settingTypes?.find(
                (item) => item.DiamondValue == settingType
            );
            return settingType ? shapeValue?.Id : "";
        }
    }

    const handleEditData = (data, index) => {
        const filteredData = allTableData.filter((item, ind) => ind !== index);
        setAllTableData(filteredData);
        setNewCategory({
            ...data,
            DiamondShape: getShapeValue(null, data.DiamondShape),
            DiamondClarity: getDiamondClarity(null, data.DiamondClarity),
            DiamondCut: getDiamondCut(null, data.DiamondCut),
            DiamondColor: getDiamondColor(null, data.DiamondColor),
            SettingType: getSettingType(null, data.SettingType),
            OldEntry: true,
        });
        setActive("AddNew");
    };

    const handleEditClick = async (e, item, index) => {
        e.stopPropagation();

        const updatedData = item.DiamondSizeWeightRates.map((rate) => ({
            ...rate,
            DiamondShape: getShapeValue(rate.DiamondShape),
            SettingType: getSettingType(rate.SettingType),
            DiamondCut: getDiamondCut(rate.DiamondCut),
            DiamondColor: getDiamondColor(rate.DiamondColor),
            DiamondClarity: getDiamondClarity(rate.DiamondClarity),
            TemplateName: item.TemplateName,
            mainId: item.Id,
        }));
        setAllTableData(updatedData);
        setActive("addNew");

        const payload = {
            id: item.Id,
            ClientCode: item.ClientCode,
        };
        setEditId(item.Id);
        try {
            setNewCategory({...newCategory, TemplateName: item.TemplateName});
        } catch (error) {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
        }
    };

    function handleAdd(e) {
        e.preventDefault()
        if (newCategory.DiamondSize !== "" && newCategory.DiamondWeight !== "" && newCategory.DiamondShape) {
            const stepFormData = {
                ClientCode: clientCode,
                DiamondSize: newCategory.DiamondSize,
                DiamondShape: getShapeValue(newCategory.DiamondShape),
                DiamondClarity: getDiamondClarity(newCategory.DiamondClarity),
                DiamondColor: getDiamondColor(newCategory.DiamondColor),
                DiamondCut: getDiamondCut(newCategory.DiamondCut),
                SettingType: getSettingType(newCategory.SettingType),
                TemplateName: newCategory.TemplateName,
                Sleve: newCategory.Sleve,
                DiamondWeight: newCategory.DiamondWeight,
                DiamondPurchaseRate: newCategory.DiamondPurchaseRate,
                DiamondSellRate: newCategory.DiamondSellRate,
                DiamondMargin: newCategory.DiamondMargin,
                CompanyId: companyId ? companyId : 0,
                BranchId: branchId ? branchId : 0,
                CounterId: counterId ? counterId : 0,
                EmployeeId: employeeId ? employeeId : 0,

                OldEntry: false,

                ...(newCategory.OldEntry ? {Id: newCategory.Id} : {}),
            };
            setAllTableData((list) => [
                ...list,
                {...stepFormData, TemplateName: newCategory.TemplateName},
            ]);
            setNewCategory({
                DiamondSize: "",
                Sleve: "",
                DiamondWeight: "",
                DiamondPurchaseRate: "",
                DiamondSellRate: "",
                DiamondMargin: "",
                DiamondShape: "",
                DiamondClarity: "",
                DiamondColor: "",
                DiamondCut: "",
                SettingType: "",
                CompanyId: 0,
                BranchId: 0,
                CounterId: 0,
                EmployeeId: 0,
                TemplateName: newCategory.TemplateName,
                OldEntry: false,
            });
        }
    }

    function handleDeleteData(index) {
        const filteredData = allTableData.filter((item, ind) => ind !== index);
        setAllTableData(filteredData);
    }

    const handleDeleteDatalist = async (e, x) => {
        e.stopPropagation();
        const payload = {
            Id: x.Id,
            ClientCode: clientCode,
        };

        try {
            const response = await fetch(
                "https://testing.loyalstring.co.in/api/ProductMaster/DeleteDiamondSizeWeightRateTemplate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
            const result = await response.json();
            // const updatedCategories = allCategories.filter((_, i) => i !== index);
            // setAllCategories(updatedCategories);
            fetchAllCategory();
            if (result.Message) {
                setMessageType("error");
                setMessageToShow(result.Message);
                setShowError(true);
            } else {
                setMessageType("success");
                setMessageToShow("Diamond Size/Weight/Rate Deleted Successfully");
                setShowError(true);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };
    const keyMapping = {
        Clarity: "DiamondClarity",
        Color: "DiamondColor",
        Cut: "DiamondCut",
        Margin: "DiamondMargin",
        PurchaseRate: "DiamondPurchaseRate",
        SellRate: "DiamondSellRate",
        Setting: "SettingType",
        Shape: "DiamondShape",
        Size: "DiamondSize",
        Sleve: "Sleve",
        Weight: "DiamondWeight",
    };
    const handleFileUpload = async (e) => {
        const fileInput = e.target;
        const file = fileInput.files[0];
        if (file) {
            const data = await file.arrayBuffer();
            const workbook = xlsx.read(data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = xlsx.utils.sheet_to_json(worksheet, {
                header: 1,
                defval: "",
            });

            const headers = jsonData[0];
            const rows = jsonData.slice(1);
            let uploadCheckLocal = false;

            const arrayOfObjects = rows.map((row) => {
                const obj = {};
                headers.forEach((header, index) => {
                    const newKey = keyMapping[header] || header;
                    let value = row[index];
                    if (newKey === "DiamondShape") {
                        if (value) {
                            const checkShape = diamondShapes.find(
                                (item) => item.DiamondValue === value.toUpperCase()
                            );
                            if (checkShape) {
                                value = value.toUpperCase();
                            } else {
                                uploadCheckLocal = true;
                            }
                        }
                    }
                    if (newKey === "DiamondClarity") {
                        if (value) {
                            const checkShape = diamondClarities.find(
                                (item) => item.DiamondValue == value.toUpperCase()
                            );
                            if (checkShape || value === "") {
                                value = value.toUpperCase();
                            } else {
                                uploadCheckLocal = true;
                            }
                        }
                    }
                    if (newKey === "DiamondColor") {
                        if (value) {
                            const checkShape = diamondColors.find(
                                (item) => item.DiamondValue === value.toUpperCase()
                            );
                            if (checkShape || value === "") {
                                value = value.toUpperCase();
                            } else {
                                uploadCheckLocal = true;
                            }
                        }
                    }
                    if (newKey === "DiamondCut") {
                        if (value) {
                            const checkShape = diamondCuts.find(
                                (item) => item.DiamondValue === value.toUpperCase()
                            );
                            if (checkShape || value === "") {
                                value = value.toUpperCase();
                            } else {
                                uploadCheckLocal = true;
                            }
                        }
                    }
                    if (newKey === "SettingType") {
                        if (value) {
                            const checkShape = settingTypes.find(
                                (item) => item.DiamondValue === value.toUpperCase()
                            );
                            if (checkShape || value === "") {
                                value = value.toUpperCase();
                            } else {
                                uploadCheckLocal = true;
                            }
                        }
                    }
                    if (
                        newKey === "Sleve" ||
                        newKey === "DiamondSellRate" ||
                        newKey === "DiamondPurchaseRate" ||
                        newKey === "DiamondWeight" ||
                        newKey === "DiamondSize" ||
                        newKey === "DiamondMargin"
                    ) {
                        value = value.toString();
                    }
                    obj[newKey] = value;
                });
                obj["TemplateName"] = newCategory.TemplateName;
                obj["OldEntry"] = false;
                obj["CompanyId"] = companyId ? companyId : 0;
                obj["BranchId"] = branchId ? branchId : 0;
                obj["CounterId"] = counterId ? counterId : 0;
                obj["EmployeeId"] = employeeId ? employeeId : 0;
                obj["ClientCode"] = clientCode;
                return obj;
            });

            setUploadCheck(uploadCheckLocal);

            if (uploadCheckLocal) {
                setMessageType("error");
                setMessageToShow("Shape/Clarity/Color/Cut/Setting Value is invalid");
                setShowError(true);
                setUploadCheck(false);
            } else {
                console.log("ARRAYOFOBJECT : ", arrayOfObjects);
                setAllTableData(arrayOfObjects);
            }

            fileInput.value = "";
        }
    };
    const handleImportClick = () => {
        if (newCategory.TemplateName) {
            fileInputRef.current.click();
        } else {
            setMessageType("error");
            setMessageToShow("Template name is mandatory when excel imported");
            setShowError(true);
        }
    };
    const handleDownload = () => {
        const sampleData = [
            {
                Shape: "Round",
                Clarity: "VVS1",
                Color: "E",
                Cut: "",
                Setting: "",
                Size: "",
                Sleve: "",
                Weight: "",
                PurchaseRate: "1000",
                Margin: "20",
                SellRate: "1800",
            },
        ];
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(sampleData);
        xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        xlsx.writeFile(workbook, "downloadSample.xlsx");
    };
    return (
        <div>
            <AdminHeading/>
            <div className="adminMainBodyBox">
                {showError ? (
                    <AlertMessage message={messageToShow} type={messageType}/>
                ) : null}
                <AdminBreadCrump
                    title={"Add Diamond Size/Weight/Rate"}
                    companyName={"Loyalstring"}
                    module={"Product Masters"}
                    page={"Diamond Size/Weight/Rate"}
                />
                <div className="adminAddCategoryMainBox">
                    <div className="adminAddCategoryInnerBox">
                        <div className="adminAddCategoryInnerBoxTitlesBox">
                            <div
                                onClick={() => {
                                    setActive("List");
                                    setAllTableData([]);
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
                                <p style={{textWrap: "wrap"}}>All Diamond Size/Weight/Rate</p>
                            </div>

                            <div
                                id="addCategoryListTitle"
                                onClick={() => {
                                    setActive("AddNew");
                                    setAllTableData([]);
                                    setNewCategory({
                                        DiamondSize: "",
                                        Sleve: "",
                                        DiamondWeight: "",
                                        DiamondPurchaseRate: "",
                                        DiamondSellRate: "",
                                        DiamondMargin: "",
                                        DiamondShape: "",
                                        DiamondClarity: "",
                                        DiamondColor: "",
                                        DiamondCut: "",
                                        SettingType: "",
                                        CompanyId: 0,
                                        BranchId: 0,
                                        CounterId: 0,
                                        EmployeeId: 0,
                                        TemplateName: "",
                                        OldEntry: false,
                                    });
                                }}
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
                                <p style={{textWrap: "wrap"}}>Add Diamond Size/Weight/Rate</p>
                            </div>
                        </div>
                        <div
                            className={
                                active === "List" ? "adminCategoryListMainBox" : "none"
                            }
                        >
                            <table
                                className={
                                    "table table-bordered text-center w-100 align-middle"
                                }
                                style={{marginTop: "40px"}}
                            >
                                <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Template Name</th>
                                    <th style={{textAlign: "right", paddingRight: "50px"}}>
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody className={"w-100"}>
                                {allCategories.map((x, index) => (
                                    <tr
                                        key={x.Id}
                                        style={{cursor: "pointer"}}
                                        onClick={() =>
                                            navigate(`/diamond_size_weight_rate_template/${x.Id}`)
                                        }
                                    >
                                        <td>{index + 1}</td>
                                        <td>
                                            {x.TemplateName === "" ? "Default" : x.TemplateName}
                                        </td>
                                        <td style={{
                                            textAlign: "right",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "right"
                                        }}>
                                            <div
                                                // className="adminAddCategoryEditButton"
                                                // onClick={(e) => handleDeleteDatalist(e, x)}
                                                onClick={(e) => handleTemplateDownload(e, x)} style={{
                                                cursor: "pointer",
                                                display: "inline-block",
                                                marginRight: "10px"
                                            }}
                                            >
                                                <DownloadIcon/>
                                            </div>
                                            <button
                                                className="adminAddCategoryEditButton"
                                                onClick={(e) => handleEditClick(e, x, index)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="adminAddCategoryEditButton"
                                                style={{
                                                    backgroundColor: "rgba(255, 0, 0, 0.3)",
                                                    marginLeft: "10px",
                                                    borderColor: "red",
                                                    color: "red",
                                                }}
                                                onClick={(e) => handleDeleteDatalist(e, x)}
                                            >
                                                Delete
                                            </button>
                                        </td>
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
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexWrap: "wrap"
                                }}
                            >
                                <p>Add New Diamond Size/Weight/Rate</p>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: {md: "0px",xs:"20px"}
                                    }}
                                >
                                    <label className={"me-2"}>Template Name :</label>
                                    <input
                                        name="TemplateName"
                                        value={newCategory.TemplateName}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        style={{marginLeft: "10px"}}
                                    />
                                </Box>
                            </div>
                            <form onSubmit={handleAdd}>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    '@media (max-width: 600px)': {
                                        flexDirection: 'column',
                                        alignItems: 'stretch',
                                    }
                                }}>
                                    <Box sx={{ flexBasis: { xs: '100%', sm: '48%', md: '19%' }, minWidth: { xs: '150px' } }}>
                                        <select
                                            name="DiamondShape"
                                            style={{width: "100%"}}
                                            value={newCategory.DiamondShape}
                                            onChange={handleNewCategoryChange}
                                            required={true}
                                        >
                                            <option value={""}>Select Diamond Shape</option>
                                            {diamondShapes.map((shape) => (
                                                <option key={shape.Id} value={shape.Id}>
                                                    {shape.DiamondValue}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                    <Box sx={{ flexBasis: { xs: '100%', sm: '48%', md: '19%' }, minWidth: { xs: '150px' } }}>
                                        <select
                                            name="DiamondClarity"
                                            value={newCategory.DiamondClarity}
                                            style={{width: "100%"}}
                                            onChange={handleNewCategoryChange}
                                        >
                                            <option value={""}>Select Diamond Clarity</option>
                                            {diamondClarities.map((clarity) => (
                                                <option key={clarity.Id} value={clarity.Id}>
                                                    {clarity.DiamondValue}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                    <Box sx={{ flexBasis: { xs: '100%', sm: '48%', md: '19%' }, minWidth: { xs: '150px' } }}>
                                        <select
                                            name="DiamondColor"
                                            value={newCategory.DiamondColor}
                                            style={{width: "100%"}}
                                            onChange={handleNewCategoryChange}
                                        >
                                            <option value={""}>Select Diamond Color</option>
                                            {diamondColors.map((colour) => (
                                                <option key={colour.Id} value={colour.Id}>
                                                    {colour.DiamondValue}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                    <Box sx={{ flexBasis: { xs: '100%', sm: '48%', md: '19%' }, minWidth: { xs: '150px' } }}>
                                        <select
                                            name="DiamondCut"
                                            value={newCategory.DiamondCut}
                                            style={{width: "100%"}}
                                            onChange={handleNewCategoryChange}
                                        >
                                            <option value={""}>Select Diamond Cut</option>

                                            {diamondCuts.map((cut) => (
                                                <option key={cut.Id} value={cut.Id}>
                                                    {cut.DiamondValue}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                    <Box sx={{ flexBasis: { xs: '100%', sm: '48%', md: '19%' }, minWidth: { xs: '150px' } }}>
                                        <select
                                            name="SettingType"
                                            value={newCategory.SettingType}
                                            style={{width: "100%"}}
                                            onChange={handleNewCategoryChange}
                                        >
                                            <option value={""}>Select Setting Type</option>
                                            {settingTypes.map((setting) => (
                                                <option key={setting.Id} value={setting.Id}>
                                                    {setting.DiamondValue}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                </Box>
                                <div
                                    style={{
                                        gridTemplateColumns: "repeat(4,1fr)",
                                        columnGap: "40px",
                                    }}
                                    className="adminCategoryAddCategoryInnerBox"
                                >
                                    <label>
                                        Diamond Size <sup>*</sup>
                                    </label>
                                    <input
                                        name="DiamondSize"
                                        value={newCategory.DiamondSize}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required={"required"}
                                    />

                                    <label>Sieve</label>
                                    <input
                                        name="Sleve"
                                        value={newCategory.Sleve}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                    <label>
                                        Diamond Weight <sup>*</sup>
                                    </label>
                                    <input
                                        name="DiamondWeight"
                                        value={newCategory.DiamondWeight}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                        required={"required"}
                                    />
                                    <label>
                                        Diamond Purchase Rate
                                    </label>
                                    <input
                                        name="DiamondPurchaseRate"
                                        value={newCategory.DiamondPurchaseRate}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                    <label>
                                        Diamond Margin
                                    </label>
                                    <input
                                        name="DiamondMargin"
                                        value={newCategory.DiamondMargin}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                    <label>
                                        Diamond Sell Rate
                                    </label>
                                    <input
                                        name="DiamondSellRate"
                                        value={newCategory.DiamondSellRate}
                                        onChange={handleNewCategoryChange}
                                        type="text"
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div>
                                        <button type={"submit"}>Add</button>
                                        <button
                                            onClick={addNewCategory}
                                            style={{marginLeft: "10px"}}
                                        >
                                            Submit
                                        </button>
                                    </div>

                                    <div>
                                        <input
                                            type="file"
                                            accept=".xlsx, .xls, .csv"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            style={{display: "none"}}
                                        />
                                        <button onClick={handleImportClick}>Import</button>
                                        <button
                                            onClick={handleDownload}
                                            style={{marginLeft: "10px"}}
                                        >
                                            Download Sample
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className={"adminCategoryListMainBox"}>
                                <table
                                    className={
                                        "table table-bordered text-center w-100 align-middle"
                                    }
                                >
                                    <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Template Name</th>
                                        <th>Dia. Shape</th>
                                        <th>Dia. Clarity</th>
                                        <th>Dia. Color</th>
                                        <th>Dia. Size</th>
                                        <th>Sieve</th>
                                        <th>Dia. Weight</th>
                                        <th>Dia. Purchase Rate</th>
                                        {/*<th>Diamond Margin</th>*/}
                                        <th>Dia.z Sell Rate</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {allTableData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {item.TemplateName == ""
                                                    ? "Default"
                                                    : item.TemplateName}
                                            </td>
                                            <td>{item.DiamondShape}</td>
                                            <td>{item.DiamondClarity}</td>
                                            <td>{item.DiamondColor}</td>
                                            <td>{item.DiamondSize}</td>
                                            <td>{item.Sleve}</td>
                                            <td>{item.DiamondWeight}</td>
                                            <td>{item.DiamondPurchaseRate}</td>
                                            {/*<td>{item.DiamondMargin}</td>*/}
                                            <td>{item.DiamondSellRate}</td>
                                            <td>
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "start",
                                                    alignItems: "center",
                                                    width: "180px"
                                                }}>
                                                    <button
                                                        className={"adminAddCategoryEditButton"}
                                                        style={{
                                                            margin: 0,
                                                            padding: "3px 10px",
                                                            // marginRight: "6px",
                                                            backgroundColor: "rgba(2, 168, 181,0.3)",
                                                            border: "1px solid #02A8B5",
                                                            color: "#02A8B5",
                                                            borderRadius: "2px",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => handleEditData(item, index)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="adminAddCategoryEditButton"
                                                        style={{
                                                            margin: 0,
                                                            padding: "3px 10px",
                                                            backgroundColor: "rgba(255, 0, 0, 0.3)",
                                                            marginLeft: "10px",
                                                            border: "1px solid red",
                                                            color: "red",
                                                            borderRadius: "2px",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => handleDeleteData(index)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
