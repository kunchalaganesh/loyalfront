import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AlertMessage from "../../../Other Functions/AlertMessage";
import { useSelector } from "react-redux";
import {
  a125,
  a128,
  a131,
  a134,
  a137,
  a146,
  a149,
  a152,
  a153,
  a16,
  a162,
  a163,
  a170,
  a175,
  a176,
  a177,
  a178,
  a18,
  a181,
  a191,
  a194,
  a198,
  a199,
  a20,
  a217,
  a22,
  a226,
  a24,
  a28,
  a30,
  a31,
  a33,
  a41,
  a43,
  a47,
  a55,
  a57,
  a71,
  a8,
  a90,
} from "../../../Api/RootApiPath";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineFileAdd } from "react-icons/ai";
import { BiSave, BiListUl } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import { IoIosAddCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { GenerateLabel } from "../../../Other Functions/GenerateLabel";
import { color } from "chart.js/helpers";
import DiamondEntryComponent from '../../../support/purchasesupport/Diamondpopup'

export default function AdminAddBulkStockNew() {
  const [diamondTemplateId, setDiamondTemplateId] = useState(null);
  const [qr, setQr] = useState("");
  const [productName, setProductName] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  //   const [categoryId, setCategoryId] = useState("");
  const [pieces, setPieces] = useState(1);
  const [huid, setHuid] = useState("");
  const [netWt, setNetWt] = useState(0);
  const [size, setSize] = useState(0);
  const [hallmark, setHallmark] = useState("");
  const [hallmarkAmount, setHallmarkAmount] = useState("0");
  const [grosswt, setGrosswt] = useState(0);
  const [purity, setPurity] = useState("");
  const [collection, setCollection] = useState("");
  const [occasion, setOccasion] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  // const [productTypeId, setProductTypeId] = useState("");
  const [partyTypeId, setPartyTypeId] = useState("");
  const [boxId, setBoxId] = useState(1);
  const [making_per_gram, setMaking_per_gram] = useState(0);
  const [making_Fixed_Amt, setMaking_Fixed_Amt] = useState(0);
  const [making_Percentage, setMaking_Percentage] = useState(0);
  const [making_Fixed_Wastage, setMaking_Fixed_Wastage] = useState(0);
  const [stoneWeight, setStoneWeight] = useState(0);
  const [clipWeight, setClipWeight] = useState(0);
  const [stoneAmount, setStoneAmount] = useState(0);
  const [weights, setWeights] = useState(0);
  const [featured, setFeatured] = useState("");
  const [productCode, setProductCode] = useState("");
  const [mrp, setMRP] = useState(0);
  const [itemCode, setItemCode] = useState("");
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [finePerc, setFinePerc] = useState("0");
  const [wastagePerc, setWastagePerc] = useState("0");
  const [fineWastagePerc, setFineWastagePerc] = useState("0");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [category, setCategory] = useState("");
  const [baseMetal, setBaseMetal] = useState("");
  const [productTypeData, setProductTypeData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [purityData, setPurityData] = useState([]);
  const [partyData, setPartyData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [collectionTypeData, setCollectionTypeData] = useState([]);
  const [allLabelledStockData, setAllLabelledStockData] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [parameter, setParameter] = useState("");
  const [formValue, setFormValue] = useState("");
  const [productType, setProductType] = useState("");
  const [productInEdit, setProductInEdit] = useState([]);
  const [productInEditImages, setProductInEditImages] = useState();
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [showImportPopup, setShowImportPopup] = useState(false);
  const [importFile, setImportFile] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingTop, setLoadingTop] = useState(true);
  // const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(true);

  const [goldAlert, setGoldAlert] = useState(false);
  const [barCodeAlert, setBarCodeAlert] = useState(false);
  const [importAlert, setImportAlert] = useState(false);
  const [isLooseDiamond, setIsLooseDiamond] = useState(false);
  const [firebaseData, setFirebaseData] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [rifdData, setRifdData] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [selectedItemCodes, setSelectedItemCodes] = useState([]);
  const [allItemCodesArray, setAllItemCodesArray] = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [showAllFields, setShowAllFields] = useState(false);
  const [stockType, setStockType] = useState("Labelled");
  const [branch, setBranch] = useState("Home");
  const [lotNumber, setLotNumber] = useState(0);
  const [packetNumber, setPacketNumber] = useState(0);

  // new logic for barcode and tid below
  const [barcodeNumbersArray, setBarcodeNumbersArray] = useState([]);
  const [piecesBox, setPiecesBox] = useState(false);
  const [productPiecesEditId, setProductPiecesEditId] = useState(0);
  const [halfInputs, setHalfInputs] = useState(true);
  const [allPurchaseItems, setAllPurchaseItems] = useState([]);
  const [allFilteredPurchaseItems, setAllFilteredPurchaseItems] = useState([]);
  const [allPacketNumbers, setAllPacketNumbers] = useState([]);
  // const [barcodeNumbersArray, setBarcodeNumbersArray] = useState([]);

  const [allSku, setAllSku] = useState([]);
  const [allSelectedSkuStones, setAllSelectedSkuStones] = useState([]);
  const [selectedSkuStones, setSelectedSkuStones] = useState([]);
  const [selectedweights, setSelectedweights] = useState([]);
  const [allSelectedSkuDiamonds, setAllSelectedSkuDiamonds] = useState([]);
  const [selectedSkuDiamonds, setSelectedSkuDiamonds] = useState([]);

  const [diamondSize, setDiamondSize] = useState("");
  const [diamondWeight, setDiamondWeight] = useState("0");
  const [diamondSleve, setDiamondSleve] = useState("0");
  const [diamondPurchaseRate, setDiamondPurchaseRate] = useState("0");
  const [diamondSellRate, setDiamondSellRate] = useState("0");
  const [diamondClarity, setDiamondClarity] = useState("");
  const [diamondColour, setDiamondColour] = useState("");
  const [diamondShape, setDiamondShape] = useState("");
  const [diamondCut, setDiamondCut] = useState("");
  const [diamondQty, setDiamondQty] = useState("");
  const [diamondTotalWeight, setDiamondTotalWeight] = useState("");
  const [diamondSettingType, setDiamondSettingType] = useState("");
  const [diamondCertificate, setDiamondCertificate] = useState("");
  const [diamondPieces, setDiamondPieces] = useState("1");
  const [diamondPurchaseAmount, setDiamondPurchaseAmount] = useState("0");
  const [diamondTotalAmount, setDiamondTotalAmount] = useState("0");
  const [diamondDescription, setDiamondDescription] = useState("");

  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [allDiamondSizeWeightRate, setAllDiamondSizeWeightRate] = useState([]);
  const [allDiamondAttributes, setAllDiamondAttributes] = useState([]);
  const [newStonesList, setNewStonesList] = useState([]);
  const [newDiamondsList, setNewDiamondsList] = useState([]);
  const [allStonesList, setAllStonesList] = useState([]);
  const [allDiamondsList, setAllDiamondsList] = useState([]);
  const [showAddStoneBox, setShowAddStoneBox] = useState(false);
  const [showAddDiamondBox, setShowAddDiamondBox] = useState(false);
  const [grossWithClip, setGrossWithClip] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [showDiamondBtn, setShowDiamondBtn] = useState(false);
  const [addStone, setAddStone] = useState({
    StoneName: "",
    StoneWeight: 0,
    StonePieces: 0,
    StoneRate: 0,
    StoneAmount: 0,
    Description: "",
    ClientCode: "",
    EmployeeCode: "",
    ProductId: 0,
  });
  const [addDiamond, setAddDiamond] = useState({
    DiamondName: "",
    DiamondWeight: 0,
    DiamondRate: 0,
    DiamondPieces: 0,
    DiamondClarity: "",
    DiamondColour: "",
    DiamondCut: "",
    DiamondShape: "",
    DiamondSize: 0,
    Certificate: "",
    SettingType: "",
    DiamondAmount: 0,
    DiamondPurchaseAmt: 0,
    Description: "",
  });

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const CompanyId = adminLoggedIn.CompanyId;
  const BranchId = adminLoggedIn.BranchId;
  const CounterId = adminLoggedIn.CounterId;
  const labelFormat = parseInt(adminLoggedIn.Clients.LabelFormat);

  const useWarnIfUnsavedChanges = (hasUnsavedChanges) => {
    const navigate = useNavigate();

    const customNavigate = useCallback(
      (to, options = {}) => {
        if (
          hasUnsavedChanges &&
          !window.confirm(
            "You have unsaved changes. Are you sure you want to leave?"
          )
        ) {
          // User does not confirm navigation, do nothing.
          return;
        }

        // No unsaved changes or user confirmed, proceed with navigation.
        navigate(to, options);
      },
      [hasUnsavedChanges, navigate]
    );

    return customNavigate;
  };
  const customNavigate = useWarnIfUnsavedChanges(hasUnsavedChanges);

  const handlePiecesChange = (value, idRcvd, close) => {
    const updatedProducts = addedProducts.map((product) => {
      if (product.id === idRcvd) {
        const arrayOfObjects = [];

        for (let i = 0; i < value; i++) {
          const object = {
            key: `value${i + 1}`,
          };
          arrayOfObjects.push(object);
        }

        setBarcodeNumbersArray(arrayOfObjects);
      }
    });
  };

  const closePiecesEditBox = () => {
    const updatedProducts = addedProducts.map((product) => {
      if (product.id === productPiecesEditId) {
        return {
          ...product,
          pieces: 1,
        };
      }
      return product;
    });
    setAddedProducts(updatedProducts);
    setPiecesBox(false);
  };
  const handleBarcodeNumberChange = (newValue, index) => {
    // Convert the barcode number to uppercase
    const uppercaseBarcodeNumber = newValue.toUpperCase();

    // Find a matching product in the rifdData array based on uppercaseBarcodeNumber
    const matchingProduct = rifdData.find(
      (item) => item.barcodeNumber === uppercaseBarcodeNumber
    );

    setBarcodeNumbersArray((prevBarcodeNumbersArray) => {
      const updatedArray = [...prevBarcodeNumbersArray];

      if (uppercaseBarcodeNumber.trim() === "") {
        // If barcode number is empty, update the array with an empty object
        updatedArray[index] = {};
      } else if (matchingProduct) {
        // If a matching product is found, update tid with the matching product's tid value
        const updatedItem = {
          [uppercaseBarcodeNumber]: matchingProduct.tid,
        };
        updatedArray[index] = updatedItem;
      } else {
        // If no matching product is found, set tid to an empty string
        const updatedItem = {
          [uppercaseBarcodeNumber]: "",
        };
        updatedArray[index] = updatedItem;
      }

      return updatedArray;
    });
  };
  let barcodeNumberString = "";
  let tidNumberString = "";
  const handleCheckTidValues = () => {
    // Check if all tid values are non-empty, unique, and do not include the word 'value'
    const uniqueTidValues = new Set(
      barcodeNumbersArray.map((item) => {
        const tidValue = Object.values(item)[0];
        return tidValue !== null &&
          tidValue !== "" &&
          !tidValue.toLowerCase().includes("value")
          ? tidValue
          : null;
      })
    );

    // Check if all barcode numbers are unique and do not include their key names
    const allBarcodeNumbersValid = barcodeNumbersArray.every((item) => {
      const barcodeNumber = Object.keys(item)[0];
      const tidValue = Object.values(item)[0];
      return (
        barcodeNumber !== tidValue &&
        !barcodeNumber.toLowerCase().includes("key")
      );
    });

    if (
      uniqueTidValues.size === barcodeNumbersArray.length &&
      allBarcodeNumbersValid
    ) {
      // Generate barcodeNumberString and tidNumberString
      const barcodeNumberString = Array.from(
        barcodeNumbersArray.map((item) => Object.keys(item)[0])
      ).join(","); // Join barcode numbers with commas
      const tidNumberString = Array.from(uniqueTidValues).join(","); // Join unique tid values with commas

      // Now you can use barcodeNumberString and tidNumberString as needed
      // console.log("barcodeNumberString:", barcodeNumberString);
      // console.log("tidNumberString:", tidNumberString);

      // Search for the product in addedProducts array with matching id and update barcodeNumber and tid
      const updatedProducts = addedProducts.map((product) => {
        if (product.id === productPiecesEditId) {
          return {
            ...product,
            barcodeNumber: barcodeNumberString,
            tid: tidNumberString,
          };
        }
        return product;
      });

      // Set the state with updated products
      setAddedProducts(updatedProducts);
      setPiecesBox(false);
    } else {
      if (uniqueTidValues.size !== barcodeNumbersArray.length) {
        alert(
          "Not all tid values are non-empty, unique, or contain the word 'value'."
        );
      }

      if (!allBarcodeNumbersValid) {
        alert("Invalid barcode numbers.");
      }
    }
  };

  // console.log("barcodeNumberString:", barcodeNumberString);
  // console.log("tidNumberString:", tidNumberString);
  // console.log("barcodeNumberString:", barcodeNumberString);
  // console.log("tidNumberString:", tidNumberString);
  useEffect(() => {
    if (!piecesBox) {
      setBarcodeNumbersArray([]);
    }
  }, [piecesBox]);
  // console.log(addedProducts, "addedProducts for barcode");
  // console.log(barcodeNumbersArray, "barcodeNumbersArray");
  // new logic for barcode and tid above

  let Entryby_Staff_id = parseInt(adminLoggedIn);

  const scrollToCenter = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // console.log("scroll");
  };
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a125, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) =>
        setCategoriesData(
          data?.filter((item) => item.CategoryName !== "DIAMOND")
        )
      );
  }, []);
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a128, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((x) => x.json())
      .then((y) => setProductTypeData(y));
  }, []);
  // console.log(productTypeData.category_id);

  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a134, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setPurityData(data));
    // console.log(purityData);
  }, []);
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a149, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setPartyData(data));
  }, []);
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a131, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setCollectionTypeData(data));
  }, []);
  // console.log(partyData);
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a137, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setBoxData(data));
  }, []);
  const fetchAllPurchaseItems = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a162, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllPurchaseItems(data);
      setAllFilteredPurchaseItems(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllPacketNumbers = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a226, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllPacketNumbers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPurchaseItems();
    fetchAllPacketNumbers();
  }, []);

  const fetchAllSku = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a163, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllSku(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllDiamondSizeWeightRate = async () => {
    const formData = { ClientCode: clientCode };
    try {
      const response = await fetch(a191, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllDiamondSizeWeightRate(data);
      // console.log(data, "AllVendorTounche");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllDiamondAttributes = async () => {
    const formData = { ClientCode: clientCode };
    try {
      const response = await fetch(a194, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllDiamondAttributes(data);
      // console.log(data, "AllVendorTounche");
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchAllLabelledStock() {
    setLoadingTop(true);
    const formData = { ClientCode: clientCode };
    try {
      const response = await fetch(a181, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      setAllLabelledStockData(data);
      setLoadingTop(false);
      // console.log(data, "AllVendorTounche");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllSku();
  }, []);
  useEffect(() => {
    fetchAllDiamondSizeWeightRate();
  }, []);

  useEffect(() => {
    fetchAllDiamondAttributes();
  }, []);

  useEffect(() => {
    fetchAllLabelledStock();
  }, []);

  let categoryId = parseInt(category);
  let categoryName = categoriesData.filter((x) => x.Id == parseInt(category))[0]
    ?.CategoryName;
  let productTypeId = parseInt(productType.split(",")[0]) || 0;
  let productTypeName = productType.split(",")[1];
  let collectionId = parseInt(collection.split(",")[0]) || 0;
  let collectionName = collection.split(",")[1];
  let purityId = parseInt(purity.split(",")[0]) || 0;
  let purityName = purity.split(",")[1];
  let partyId = parseInt(partyTypeId);
  let partyName = partyTypeId;
  let metalName = categoriesData.filter((x) => x.Id === parseInt(baseMetal))[0]
    ?.CategoryName;

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (5 > files.length > 0) {
      const newFiles = Array.from(files).slice(0, 5 - selectedFiles.length);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a175, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setRifdData(data));
    setLoadingAdd(true);
  }, []);

  // console.log(rifdData, "rifdData");

  // Skkhandre label below
  const openLabelInNew = async (products) => {
    const doc = new jsPDF({
      // format: [26, 12],
      format: [28, 13],
      orientation: "landscape",
    });

    const fontSize = 7;
    const imageHeight = 7;
    const imageWidth = 7;

    for (let i = 0; i < products.length; i++) {
      const {
        collection,
        grosswt,
        stoneWeight,
        netWt,
        stoneAmount,
        itemCode,
        purity,
        mrp,
        product_No,
        pieces,
        description,
        barcodeNumber,
      } = products[i];

      if (i > 0) {
        doc.addPage(); // Add a new page for each product after the first one
      }
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", "bold");
      // {
      //   collection.length > 20
      //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
      //     : doc.text(`${collection}`, 1, 3);
      // }

      if (mrp == 0 || mrp === "") {
        // doc.text(`${itemCode}`, 2, 3);
        doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 2, 3);
        doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 2, 6);
        doc.text(`N.Wt: ${parseFloat(netWt).toFixed(3)}`, 2, 9);
        // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
        // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
        doc.text(`Pcs:${pieces}`, 19, 11.5);
        // doc.text(`${product_No}`, 4, 11.5);
        doc.text(`${itemCode}`, 18, 6);
        doc.text(`${purity}`, 21, 3);
        doc.setFontSize(7);
        {
          barcodeNumber
            ? doc.text(`${barcodeNumber}`, 2, 11.5)
            : doc.text("", 2, 11.5);
        }
        // doc.setFontSize(5);
        // const maxLineLength = 27;
        // const descriptionLine1 = description.substring(0, maxLineLength);
        // const descriptionLine2 = description.substring(
        //   maxLineLength,
        //   maxLineLength * 2
        // );

        // doc.text(descriptionLine1, 4, 10);
        // doc.text(descriptionLine2, 4, 11.5);
      } else {
        doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 2, 3);
        doc.text(`MRP: ${parseFloat(mrp)}`, 2, 6);
        doc.text(`Pcs:${pieces}`, 19, 11.5);
        doc.text(`${itemCode}`, 18, 6);
        // doc.text(`${product_No}`, 4, 11.5);
        // doc.text(`${product_No}`, 4, 11.5);
        // doc.text(`${itemCode}`, 3, 3);
        doc.text(`${purity}`, 21, 3);
        {
          barcodeNumber
            ? doc.text(`${barcodeNumber}`, 2, 11.5)
            : doc.text("", 2, 11.5);
        }
      }

      try {
        // const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
        // doc.addImage(qrCodeDataUrl, "JPEG", 3, 3, imageWidth, imageHeight);
      } catch (error) {
        console.error(error);
      }
    }

    const pdfData = doc.output("datauristring");
    const newWindow = window.open();
    newWindow.document.write(
      `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
    );
  };

  // Soni label below
  // const openLabelInNew = async (products) => {
  //   const doc = new jsPDF({
  //     // format: [26, 12],
  //     format: [100, 13],
  //     orientation: "landscape",
  //   });

  //   const fontSize = 9;
  //   const imageHeight = 12;
  //   const imageWidth = 12;

  //   for (let i = 0; i < products.length; i++) {
  //     const {
  //       collection,
  //       grosswt,
  //       stoneWeight,
  //       netWt,
  //       stoneAmount,
  //       diamondWeight,
  //       itemCode,
  //       purity,
  //       mrp,
  //       product_No,
  //       pieces,
  //       description,
  //     } = products[i];

  //     if (i > 0) {
  //       doc.addPage(); // Add a new page for each product after the first one
  //     }

  //     doc.setFontSize(fontSize);
  //     // {
  //     //   collection.length > 20
  //     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
  //     //     : doc.text(`${collection}`, 1, 3);
  //     // }

  //     if (mrp == 0 || mrp === "") {
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 55, 3);
  //       doc.text(`N.Wt: ${parseFloat(netWt).toFixed(3)}`, 55, 6);
  //       // doc.text(`${purity}`, 30, 6);
  //       // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 12);
  //       // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 30, 12);
  //       doc.text(diamondWeight ? `Crt: ${diamondWeight}` : "Crt: ", 25, 3);
  //       doc.text(`Pcs:${pieces}`, 25, 6);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 25, 9);
  //       doc.setFontSize(5);
  //       const maxLineLength = 40;
  //       const descriptionLine1 = description.substring(0, maxLineLength);
  //       const descriptionLine2 = description.substring(
  //         maxLineLength,
  //         maxLineLength * 2
  //       );

  //       doc.text(descriptionLine1, 55, 9);
  //       doc.text(descriptionLine2, 55, 11.5);
  //     } else {
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 30, 6);
  //       doc.text(`MRP: ${parseFloat(mrp)}`, 11, 9);
  //       doc.text(`Pcs:${pieces}`, 30, 2);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${product_No}`, 4, 12);
  //       doc.text(`${itemCode}`, 4, 3);
  //       doc.text(`${purity}`, 30, 12);
  //     }

  //     try {
  //       const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
  //       doc.addImage(qrCodeDataUrl, "JPEG", 7, 1, imageWidth, imageHeight);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   const pdfData = doc.output("datauristring");
  //   const newWindow = window.open();
  //   newWindow.document.write(
  //     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  //   );
  // };

  // NDDarbar Label Below
  // const openLabelInNew = async (products) => {
  //   const doc = new jsPDF({
  //     format: [29, 12],
  //     orientation: "landscape",
  //   });

  //   const fontSize = 6;
  //   const imageHeight = 7;
  //   const imageWidth = 7;

  //   for (let i = 0; i < products.length; i++) {
  //     const {
  //       collection,
  //       grosswt,
  //       stoneWeight,
  //       stoneAmount,
  //       netWt,
  //       itemCode,
  //       purity,
  //       mrp,
  //       product_No,
  //       pieces,
  //       making_Fixed_Wastage,
  //       making_Percentage,
  //     } = products[i];

  //     // console.log("products", products);
  //     if (i > 0) {
  //       doc.addPage(); // Add a new page for each product after the first one
  //     }

  //     doc.setFontSize(fontSize);
  //     doc.setFont("helvetica", "bold");
  //     // {
  //     //   collection.length > 20
  //     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
  //     //     : doc.text(`${collection}`, 1, 3);
  //     // }

  //     if (mrp == 0 || mrp === "") {
  //       doc.text(`G.WT: ${parseFloat(grosswt).toFixed(3)}`, 3, 3);
  //       doc.text(`S.WT: ${parseFloat(stoneWeight).toFixed(3)}`, 3, 5.5);
  //       if (
  //         parseFloat(making_Percentage) !== 0 &&
  //         making_Percentage !== "" &&
  //         making_Fixed_Wastage !== 0 &&
  //         making_Fixed_Wastage !== ""
  //       ) {
  //         doc.text(
  //           `W.WT: ${(
  //             parseFloat(netWt) / parseFloat(making_Percentage) +
  //             parseFloat(making_Fixed_Wastage)
  //           ).toFixed(3)}`,
  //           3,
  //           7.5
  //         );
  //         doc.text(
  //           `N.WT: ${(
  //             parseFloat(netWt) +
  //             parseFloat(netWt / making_Percentage) +
  //             parseFloat(making_Fixed_Wastage)
  //           ).toFixed(3)}`,
  //           3,
  //           10
  //         );

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       } else if (
  //         parseFloat(making_Percentage) !== 0 &&
  //         making_Percentage !== ""
  //       ) {
  //         doc.text(
  //           `W.WT: ${(
  //             parseFloat(netWt) / parseFloat(making_Percentage)
  //           ).toFixed(3)}`,
  //           3,
  //           7.5
  //         );
  //         doc.text(
  //           `N.WT: ${(
  //             parseFloat(netWt) + parseFloat(netWt / making_Percentage)
  //           ).toFixed(3)}`,
  //           3,
  //           10
  //         );

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       } else if (making_Fixed_Wastage !== 0 && making_Fixed_Wastage !== "") {
  //         doc.text(
  //           `W.WT: ${parseFloat(making_Fixed_Wastage).toFixed(3)}`,
  //           3,
  //           7.5
  //         );
  //         doc.text(
  //           `N.WT: ${(
  //             parseFloat(making_Fixed_Wastage) + parseFloat(netWt)
  //           ).toFixed(3)}`,
  //           3,
  //           10
  //         );

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       } else {
  //         doc.text(`W.WT: N/A`, 3, 8);
  //         doc.text(`N.WT: ${netWt.toFixed(3)}`, 3, 10.5);

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       }
  //     } else {
  //       doc.text(`G.WT: ${grosswt.toFixed(3)}`, 3, 3);
  //       doc.text(`MRP: ${parseInt(mrp)}`, 3, 6);
  //       doc.text(`Pc:${pieces}`, 18, 9);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 18, 3);
  //       doc.text(`${purity}`, 18, 6);
  //     }
  //   }
  //   const pdfData = doc.output("datauristring");
  //   const newWindow = window.open();
  //   newWindow.document.write(
  //     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  //   );
  // };

  // Madan Label Below
  // const openLabelInNew = async (products) => {
  //   const doc = new jsPDF({
  //     // format: [26, 12],
  //     format: [28, 12],
  //     orientation: "landscape",
  //   });

  //   const fontSize = 6;
  //   const imageHeight = 7;
  //   const imageWidth = 7;

  //   for (let i = 0; i < products.length; i++) {
  //     const {
  //       collection,
  //       grosswt,
  //       stoneWeight,
  //       netWt,
  //       stoneAmount,
  //       itemCode,
  //       purity,
  //       mrp,
  //       product_No,
  //       pieces,
  //       description,
  //     } = products[i];

  //     if (i > 0) {
  //       doc.addPage(); // Add a new page for each product after the first one
  //     }

  //     doc.setFontSize(fontSize);
  //     // {
  //     //   collection.length > 20
  //     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
  //     //     : doc.text(`${collection}`, 1, 3);
  //     // }

  //     if (mrp == 0 || mrp === "") {
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 4, 4);
  //       doc.text(`N.Wt: ${parseFloat(netWt).toFixed(3)}`, 4, 6);
  //       doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
  //       doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
  //       doc.text(`Pcs:${pieces}`, 18, 2);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 4, 2);
  //       doc.text(`${purity}`, 22, 4);
  //       doc.setFontSize(5);
  //       const maxLineLength = 27;
  //       const descriptionLine1 = description.substring(0, maxLineLength);
  //       const descriptionLine2 = description.substring(
  //         maxLineLength,
  //         maxLineLength * 2
  //       );

  //       doc.text(descriptionLine1, 4, 10);
  //       doc.text(descriptionLine2, 4, 11.5);
  //     } else {
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 11, 5.5);
  //       doc.text(`MRP: ${parseFloat(mrp)}`, 11, 7.5);
  //       doc.text(`Pcs:${pieces}`, 18, 2);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 4, 3);
  //       doc.text(`${purity}`, 18, 11.5);
  //     }

  //     try {
  //       const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
  //       // doc.addImage(qrCodeDataUrl, "JPEG", 3, 3, imageWidth, imageHeight);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   const pdfData = doc.output("datauristring");
  //   const newWindow = window.open();
  //   newWindow.document.write(
  //     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  //   );
  // };

  // Soni New design
  // const openLabelInNew = async (products) => {
  //   const doc = new jsPDF({
  //     // format: [26, 12],
  //     format: [28, 12],
  //     orientation: "landscape",
  //   });

  //   const fontSize = 8;
  //   const imageHeight = 7;
  //   const imageWidth = 7;

  //   for (let i = 0; i < products.length; i++) {
  //     const {
  //       collection,
  //       grosswt,
  //       stoneWeight,
  //       netWt,
  //       stoneAmount,
  //       itemCode,
  //       purity,
  //       mrp,
  //       product_No,
  //       pieces,
  //       description,
  //     } = products[i];

  //     if (i > 0) {
  //       doc.addPage(); // Add a new page for each product after the first one
  //     }
  //     doc.setFontSize(fontSize);
  //     // {
  //     //   collection.length > 20
  //     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
  //     //     : doc.text(`${collection}`, 1, 3);
  //     // }

  //     if (mrp == 0 || mrp === "") {
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 3, 6);
  //       doc.text(`N.Wt: ${parseFloat(netWt).toFixed(3)}`, 3, 9);
  //       // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
  //       // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
  //       doc.text(`Pcs:${pieces}`, 18, 3);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 3, 3);
  //       doc.text(`${purity}`, 22, 6);
  //       doc.setFontSize(5);
  //       // const maxLineLength = 27;
  //       // const descriptionLine1 = description.substring(0, maxLineLength);
  //       // const descriptionLine2 = description.substring(
  //       //   maxLineLength,
  //       //   maxLineLength * 2
  //       // );

  //       // doc.text(descriptionLine1, 4, 10);
  //       // doc.text(descriptionLine2, 4, 11.5);
  //     } else {
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 3, 6);
  //       doc.text(`MRP: ${parseFloat(mrp)}`, 3, 9);
  //       doc.text(`Pcs:${pieces}`, 18, 3);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 3, 3);
  //       doc.text(`${purity}`, 18, 6);
  //     }

  //     try {
  //       // const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
  //       // doc.addImage(qrCodeDataUrl, "JPEG", 3, 3, imageWidth, imageHeight);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   const pdfData = doc.output("datauristring");
  //   const newWindow = window.open();
  //   newWindow.document.write(
  //     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  //   );
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let totalStoneAmount =
      selectedSkuStones.length > 0
        ? selectedSkuStones.reduce(
            (a, b) =>
              a +
              (
                parseFloat(b.StoneAmount) * parseFloat(selectedSku.Pieces)
              ).toFixed(2),
            0
          )
        : 0;
    setLoading(true);
    let formData = new FormData();

    formData.append("ProductTitle", productName);
    formData.append("CategoryId", categoryId);
    // formData.append("Category_Name", categoryName);
    formData.append("ProductId", parseInt(productTypeId));
    formData.append("DesignId", parseInt(collectionId));
    formData.append("VendorId", parseInt(partyId));
    formData.append("SupplierId", parseInt(partyId));
    // formData.append("Party_Details", partyName);
    // formData.append("purity", purityName);
    formData.append("PurityId", purityId);
    // formData.append("BoxId", parseInt(boxId));
    formData.append("MRP", parseFloat(mrp));
    formData.append("Quantity", parseInt(quantity));
    formData.append("GrossWt", `${parseFloat(grosswt).toFixed(3)}`);
    formData.append("ClipWeight", `${parseFloat(clipWeight).toFixed(3)}`);
    formData.append(
      "TotalStoneWeight",
      `${parseFloat(stoneWeight).toFixed(3)}`
    );
    formData.append(
      "TotalStoneAmount",
      `${parseFloat(stoneAmount).toFixed(2)}`
    );
    formData.append("NetWt", parseFloat(netWt).toFixed(3));
    // formData.append("Entryby_Staff_id", parseInt(Entryby_Staff_id));
    // formData.append("Product_No", partyName);
    formData.append("ProductCode", productCode);
    formData.append("MetalName", `${metalName}`);
    formData.append("MetalId", `${baseMetal}`);
    formData.append("Pieces", `${parseInt(pieces)}`);
    formData.append("HUIDCode", huid);
    formData.append("Size", size);
    // formData.append("Hallmark", hallmark);
    formData.append("HallmarkAmount", hallmarkAmount);
    formData.append("CollectionName", "");
    formData.append("OccassionName", "");
    formData.append("Gender", gender);
    formData.append("description", description);
    formData.append("MakingFixedAmt", making_Fixed_Amt);
    formData.append("MakingPerGram", making_per_gram);
    formData.append(
      "MakingPercentage",
      making_Percentage !== "" ? making_Percentage : "0"
    );
    formData.append("MakingFixedWastage", making_Fixed_Wastage);
    // formData.append("StoneAmount", stoneAmount);
    formData.append("Featured", featured);
    // formData.append("Itemtype", productTypeName);
    // formData.append("Product_type", productTypeName);
    formData.append("BranchName", branch);
    formData.append("SKU", selectedSkuName);
    formData.append("BlackBeads", "");
    formData.append("BoxName", "");
    formData.append("Colour", selectedSku ? selectedSku.Colour : "");
    formData.append("Status", "Active");
    formData.append("CuttingGrossWt", "0");
    formData.append("CuttingNetWt", "0");
    formData.append("HSNCode", "0");
    formData.append("LotNumber", `${lotNumber}`);
    formData.append("WarehouseId", 0);
    formData.append("Margin", "0");
    formData.append("OtherWeight", selectedSku ? selectedSku.OtherWeight : "0");
    formData.append("OfferPrice", "0");
    formData.append("PouchWeight", selectedSku ? selectedSku.PouchWeight : "0");
    formData.append("TagWeight", selectedSku ? selectedSku.TagWeight : "0");
    formData.append(
      "FindingWeight",
      selectedSku ? selectedSku.FindingWeight : "0"
    );
    formData.append(
      "LanyardWeight",
      selectedSku ? selectedSku.LanyardWeight : "0"
    );
    formData.append("Ranking", "0");
    formData.append("UpdatedFrom", "Web");
    formData.append("Width", "0");
    formData.append("Height", "0");
    formData.append("ClientCode", clientCode);
    formData.append("EmployeeCode", employeeCode ? employeeCode : "");
    formData.append("CompanyId", CompanyId ? CompanyId : 0);
    formData.append("BranchId", BranchId ? BranchId : 0);
    formData.append("CounterId", CounterId ? CounterId : 0);
    formData.append("EstimatedDays", "0");
    formData.append("MetalRate", "0");
    formData.append("PurchaseCost", "0");
    formData.append("Rating", "0");
    formData.append("TotalDiamondAmount", diamondTotalAmount);
    formData.append("TotalDiamondPieces", "0");
    formData.append("TotalDiamondWeight", diamondTotalWeight);
    formData.append("TotalStonePieces", "0");
    formData.append("ClipQuantity", clipWeight !== 0 ? "1" : "0");

    formData.append("DiamondSize", `${diamondSize}`);
    formData.append("DiamondWeight", `${diamondWeight}`);
    formData.append("DiamondPurchaseRate", `${diamondPurchaseRate}`);
    formData.append("DiamondSellRate", `${diamondSellRate}`);
    formData.append("DiamondClarity", `${diamondClarity}`);
    formData.append("DiamondColour", `${diamondColour}`);
    formData.append("DiamondShape", `${diamondShape}`);
    formData.append("DiamondCut", `${diamondCut}`);
    formData.append("DiamondSettingType", `${diamondSettingType}`);
    formData.append("DiamondCertificate", `${diamondCertificate}`);
    formData.append("DiamondPieces", `${diamondPieces}`);
    // formData.append("DiamondSleve", `${diamondSleve}`);
    formData.append("DiamondPurchaseAmount", `${diamondPurchaseAmount}`);
    formData.append("DiamondSellAmount", `${diamondTotalAmount}`);
    formData.append("DiamondDescription", `${diamondDescription}`);

    // formData.append("BarcodeNumber", "");
    // formData.append("Images", "");
    if (selectedSkuName !== "" || selectedSku.length > 0) {
      formData.append("Images", selectedSku.Images);
    } else if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        formData.append("Images", file);
      });
    } else {
      formData.append("Images", "");
      console.log(" No Images Selected");
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    // console.log(formData, "formData");

    // formData.append("ImageList1", "");
    // formData.append("ImageList2", "");
    // formData.append("ImageList3", "");
    // formData.append("ImageList4", "");
    // formData.append("ImageList5", "");

    try {
      const response = await fetch(a176, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(formData),
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        // Check if there is a selected stone object to add
        if (selectedSkuStones && Object.keys(selectedSkuStones).length > 0) {
          const updatedProducts = data.map((product) => {
            let SKUStoneItems = selectedSkuStones.SKUStoneItem;
            // Create a new object for each product to avoid mutating the original data directly
            return {
              ...product,
              Stones: [...product.Stones, ...SKUStoneItems], // Add the selected stone object to the Stones array of each product
            };
          });
          setAddedProducts(updatedProducts); // Update your state with the new products array
          // setAddedProducts(data); // Just set the data if no stone is selected
        } else {
          setAddedProducts(data); // Just set the data if no stone is selected
        }

        setLoading(false);
        // console.log("added", data);
        const allItemCodes = data.map((product) => ({
          ItemCode: product.ItemCode,
        }));
        setAllItemCodesArray(allItemCodes);
        setDeleteAll(true);
        setPartyTypeId("");
        setCategory("");
        setProductType("");
        setPurity("");
        setQuantity(1);
        setCollection("");
        setGrosswt(0);
        setNetWt(0);
        setGender("");
        setStoneWeight(0);
        setClipWeight(0);
        setMRP(0);
        setProductName("");
        setDescription("");
        setSelectedSku([]);
        setSelectedSkuName("");
        setHasUnsavedChanges(true);
        // setHasUnsavedChanges(false);
        // customNavigate("/adminhome");
        scrollToCenter("adminAddBulkStockAddedTitleStatement");
        // setData(data.data);
        // updateImages();
        // alert("added");
      } else {
        // Handle the error if the upload fails
        console.error("Failed to upload the files.");
      }
    } catch (error) {
      // Handle any network or fetch API errors
      console.error("An error occurred:", error);
    }
  };

  const handleCreateAddedProducts = (e) => {
    e.preventDefault();
    setReadOnly(true);
    let totalStoneAmount =
      selectedSkuStones && selectedSkuStones.length > 0
        ? selectedSkuStones.reduce(
            (a, b) =>
              a +
              (
                parseFloat(b.StoneAmount) * parseFloat(selectedSku.Pieces)
              ).toFixed(2),
            0
          )
        : 0;

    console.log("filter vali error ", allLabelledStockData);

    const totalCollectionItem =
      allLabelledStockData &&
      allLabelledStockData.filter((x) => x.DesignId == collectionId);

    const lastCollectionItem = totalCollectionItem.reduce(
      (max, item) => (item.Id > max.Id ? item : max),
      { Id: 0 }
    );

    let lastCollectionItemId = "";

    if (totalCollectionItem.length > 0) {
      lastCollectionItemId = lastCollectionItem.ItemCode;
    } else {
      const collectionTypeItem = collectionTypeData.filter(
        (x) => x.Id == parseInt(collectionId)
      )[0];

      if (collectionTypeItem) {
        lastCollectionItemId = collectionTypeItem.LabelCode;
      }
    }

    // const match = lastCollectionItemId.match(/(\D+)(\d*)$/);

    // let prefix = "ABC";
    // let number = 0;
    // if (match) {
    //   prefix = match[1]; // Non-numeric part
    //   number = match[2] ? parseInt(match[2]) : 0; // Numeric part or 0 if empty

    //   console.log("Prefix:", prefix); // "FTP"
    //   console.log("Number:", number); // "21"
    // }

    // const match = lastCollectionItemId.match(/^(\D+)(\d*)$/);

    // const match = lastCollectionItemId.match(/^(\D+)(\d+)$/);
    const match = lastCollectionItemId.match(/^(.+?)(\d+)$/);

    let prefix = "";
    let number = 0;

    const extractNumber = (str) => {
      // Regex to find the last sequence of digits at the end of the string
      const match = str.match(/(\d+)$/);
      return match ? parseInt(match[0], 10) : 0;
    };

    if (match) {
      prefix = match[1]; // Non-numeric part
      number = extractNumber(lastCollectionItemId);
    } else {
      // If no match, use the label as the prefix and start numbering from 1
      prefix = lastCollectionItemId;
      number = 0;
    }

    // const newItemCode = `${prefix}${String(number + 1).padStart(2, '0')}`;

    // console.log(lastCollectionItem, "lastCollectionItemCode");
    // console.log(lastCollectionItem, "lastCollectionItemCode");
    // console.log(lastCollectionItem, "lastCollectionItemCode");
    // console.log(selectedSku, "selectedSku");
    // console.log(Array.isArray(selectedSku), "Is selectedSku an array?");
    // console.log(
    //   selectedSku && selectedSku.length > 0,
    //   "selectedSku length check"
    // );
    // console.log(selectedSkuStones, "selectedSkuStones");

    let selectedSkuData =
      Array.isArray(selectedSku) && selectedSku.length > 0
        ? selectedSku[0]
        : selectedSku && typeof selectedSku === "object"
        ? selectedSku
        : {};
    let createdProduct = {
      ProductTitle: productName,
      CategoryId: categoryId,
      ProductId: parseInt(productTypeId),
      DesignId: parseInt(collectionId),
      VendorId: parseInt(partyId),
      SupplierId: parseInt(partyId),
      PurityId: purityId,
      MRP: `${parseFloat(mrp).toFixed(2)}`,
      Quantity: quantity,
      GrossWt: !grossWithClip
        ? `${parseFloat(grosswt).toFixed(3)}`
        : `${parseFloat(parseFloat(grosswt) - parseFloat(clipWeight)).toFixed(
            3
          )}`,
      ClipWeight: `${parseFloat(clipWeight).toFixed(3)}`,
      TotalStoneWeight: `${parseFloat(stoneWeight).toFixed(3)}`,
      TotalStoneAmount: `${parseFloat(stoneAmount).toFixed(2)}`,
      NetWt: `${parseFloat(netWt).toFixed(3)}`,
      ProductCode: productCode,
      MetalName: `${metalName}`,
      MetalId: `${baseMetal}`,
      Pieces: `${parseInt(pieces)}`,
      HUIDCode: huid,
      Size: `${size}`,
      HallmarkAmount: `${hallmarkAmount}`,
      CollectionName: "",
      OccassionName: "",
      Gender: gender,
      Description: description,
      MakingFixedAmt: `${making_Fixed_Amt}`,
      MakingPerGram: `${making_per_gram}`,
      MakingPercentage: making_Percentage !== "" ? `${making_Percentage}` : "0",
      MakingFixedWastage: `${making_Fixed_Wastage}`,
      Featured: featured,
      BranchName: branch,
      SKU: selectedSkuName,
      SKUId: selectedSkuData.Id || 0,
      BlackBeads: "",
      BoxName: "",
      Status: "Active",
      CuttingGrossWt: "0",
      CuttingNetWt: "0",
      HSNCode: "0",
      LotNumber: `${lotNumber}`,
      WarehouseId: 0,
      WeightCategory: weights,
      Margin: "0",
      OfferPrice: "0",
      Colour: selectedSkuData.Colour || "",
      OtherWeight: selectedSkuData.OtherWeight
        ? `${selectedSkuData.OtherWeight}`
        : "0",
      PouchWeight: selectedSkuData.PouchWeight
        ? `${selectedSkuData.PouchWeight}`
        : "0",
      TagWeight: selectedSkuData.TagWeight
        ? `${selectedSkuData.TagWeight}`
        : "0",
      FindingWeight: selectedSkuData.FindingWeight
        ? `${selectedSkuData.FindingWeight}`
        : "0",
      LanyardWeight: selectedSkuData.LanyardWeight
        ? `${selectedSkuData.LanyardWeight}`
        : "0",
      Ranking: "0",
      UpdatedFrom: "Web",
      Width: "0",
      Height: "0",
      ClientCode: clientCode,
      EmployeeCode: employeeCode ? employeeCode : "",
      CompanyId: CompanyId ? CompanyId : 0,
      BranchId: BranchId ? BranchId : 0,
      CounterId: CounterId ? CounterId : 0,
      EstimatedDays: "0",
      MetalRate: "0",
      PurchaseCost: "0",
      Rating: "0",
      TotalDiamondAmount: "0",
      TotalDiamondPieces: "0",
      TotalDiamondWeight: "0",
      TotalStonePieces: "0",
      ClipQuantity: clipWeight !== 0 ? "1" : "0",
      DiamondSize: `${diamondSize}`,
      DiamondWeight: `${diamondWeight}`,
      DiamondPurchaseRate: `${diamondPurchaseRate}`,
      DiamondSellRate: `${diamondSellRate}`,
      DiamondClarity: `${diamondClarity}`,
      DiamondColour: `${diamondColour}`,
      DiamondShape: `${diamondShape}`,
      DiamondCut: `${diamondCut}`,
      DiamondSettingType: `${diamondSettingType}`,
      DiamondCertificate: `${diamondCertificate}`,
      DiamondPieces: `${diamondPieces.toString()}`,
      DiamondPurchaseAmount: `${diamondPurchaseAmount}`,
      DiamondSellAmount: `${diamondTotalAmount}`,
      DiamondDescription: `${diamondDescription}`,
      DesignName: collectionName,
      PurityName: purityName,
      ProductName: productTypeName,
      TaxPercentage: "3",
      Stones: newStonesList,
      Diamonds: [],
      PacketId: packetNumber !== "" ? parseInt(packetNumber) : 0,
    };

    // const productList = Array.from(
    //   { length: createdProduct.Quantity },
    //   (_, i) => (
    //     {
    //     ...createdProduct,
    //     Quantity: "1",
    //     ItemCode: `${prefix}${number + i + 1}`,
    //     console.log(`${prefix}${number + i + 1}` , "checkingcode");
    //   }

    // )
    // );
    const productList = Array.from(
      { length: createdProduct.Quantity },
      (_, i) => {
        const newNumber = number + i + 1;
        const newItemCode = `${prefix}${newNumber}`;
        return {
          ...createdProduct,
          Quantity: "1",
          ItemCode: newItemCode,
        };
      }
    );

    if (
      selectedSkuStones &&
      selectedSkuStones.Id !== 0 &&
      Object.keys(selectedSkuStones).length > 0
    ) {
      const updatedProducts = productList.map((product) => {
        let SKUStoneItems = selectedSkuStones.SKUStoneItem;
        return {
          ...product,
          Stones: [...product.Stones, ...SKUStoneItems], // Add the selected stone object to the Stones array of each product
        };
      });
      setAddedProducts(updatedProducts); // Update your state with the new products array
    } else {
      setAddedProducts(productList); // Just set the data if no stone is selected
    }

    setLoading(false);

    const allItemCodes = productList.map((product) => ({
      ItemCode: product.ItemCode,
    }));
    setAllItemCodesArray(allItemCodes);
    setDeleteAll(true);
    setPartyTypeId("");
    setCategory("");
    setProductType("");
    setPurity("");
    setQuantity(1);
    setCollection("");
    setGrosswt(0);
    setNetWt(0);
    setGender("");
    setStoneWeight(0);
    setClipWeight(0);
    setMRP(0);
    setProductName("");
    setDescription("");
    // setSelectedSku([]);
    // setSelectedSkuName("");
    setHasUnsavedChanges(true);
    scrollToCenter("adminAddBulkStockAddedTitleStatement");
  };

  const handleSubmitUnlabelled = async (e) => {
    e.preventDefault();
    setReadOnly(true);
    setLoading(true);
    let formData = new FormData();

    formData.append("ProductTitle", productName);
    formData.append("HSNCode", "");
    formData.append("Description", description);
    formData.append("ProductCode", productCode);
    formData.append("MetalName", metalName);
    formData.append("CategoryId", categoryId);
    formData.append("ProductId", productTypeId);
    formData.append("DesignId", collectionId);
    formData.append("PurityId", purityId);
    formData.append("Colour", "");
    formData.append("TotalGrossWt", `${grosswt}`);
    formData.append("Size", `${size}`);
    formData.append("TotalNetWt", `${netWt}`);
    formData.append("CollectionName", "");
    formData.append("OccassionName", "");
    formData.append("ClipWeight", "0");
    formData.append("ClipQuantity", "0");
    formData.append("Gender", gender);
    formData.append("MakingFixedAmt", `${making_Fixed_Amt}`);
    formData.append("MakingPerGram", `${making_per_gram}`);
    formData.append("MakingFixedWastage", `${making_Fixed_Wastage}`);
    formData.append("MakingPercentage", `${making_Percentage}`);
    formData.append("TotalStoneWeight", `${stoneWeight}`);
    formData.append("TotalStoneAmount", `${stoneAmount}`);
    formData.append("TotalStonePieces", "");
    formData.append("TotalDiamondWeight", diamondTotalWeight);
    formData.append("TotalDiamondPieces", String(diamondPieces));
    formData.append("TotalDiamondAmount", diamondTotalAmount);
    formData.append("Featured", "");
    formData.append("Pieces", pieces);
    formData.append("HallmarkAmount", hallmarkAmount);
    formData.append("HUIDCode", huid);
    formData.append("MRP", `${mrp}`);
    formData.append("VendorId", partyId);
    formData.append("BoxId", boxId);
    formData.append("TIDNumber", "");
    formData.append("RFIDCode", "");
    formData.append("BlackBeads", "");
    formData.append("Height", "");
    formData.append("Width", "");
    formData.append("OrderedItemId", 0);
    formData.append("CuttingGrossWt", "0");
    formData.append("CuttingNetWt", "0");
    formData.append("MetalRate", "0");
    formData.append("LotNumber", `${lotNumber}`);
    formData.append("DeptId", 0);
    formData.append("PurchaseCost", "");
    formData.append("Margin", "");
    formData.append("BranchName", `${branch}`);
    formData.append("BoxName", "");
    formData.append("EstimatedDays", "0");
    formData.append("OfferPrice", "0");
    formData.append("Rating", "0");
    formData.append("SKU", selectedSkuName);
    formData.append("Ranking", "0");
    formData.append("CompanyId", CompanyId ? CompanyId : 0);
    formData.append("CounterId", CounterId ? CounterId : 0);
    formData.append("BranchId", BranchId ? BranchId : 0);
    formData.append("Status", "Active");
    formData.append("ClientCode", clientCode);
    formData.append("EmployeeCode", employeeCode ? employeeCode : "0");
    formData.append("UpdatedFrom", "Web");
    formData.append("SupplierId", partyId);
    formData.append("Quantity", quantity);
    formData.append("GroupCode", "0");
    formData.append("FinePercentage", `${finePerc}`);
    formData.append("WastagePercentage", `${wastagePerc}`);
    formData.append("FinePlusWastageWeight", `${fineWastagePerc}`);
    formData.append("Images", "");
    formData.append("MetalId", baseMetal);
    formData.append("WarehouseId", 0);

    formData.append("DiamondSize", `${diamondSize}`);
    formData.append("DiamondWeight", `${diamondWeight}`);
    formData.append("DiamondPurchaseRate", `${diamondPurchaseRate}`);
    formData.append("DiamondSellRate", `${diamondSellRate}`);
    formData.append("DiamondClarity", `${diamondClarity}`);
    formData.append("DiamondColour", `${diamondColour}`);
    formData.append("DiamondShape", `${diamondShape}`);
    formData.append("DiamondCut", `${diamondCut}`);
    formData.append("DiamondSettingType", `${diamondSettingType}`);
    formData.append("DiamondCertificate", `${diamondCertificate}`);
    formData.append("DiamondPieces", `${diamondPieces}`);
    formData.append("DiamondPurchaseAmount", `${diamondPurchaseAmount}`);
    formData.append("DiamondSellAmount", `${diamondTotalAmount}`);
    formData.append("DiamondDescription", `${diamondDescription}`);
    formData.append("PacketId", packetNumber !== "" ? packetNumber : 0);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(a198, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // console.log(data, "Unlabeldata");
      // console.log(data.data, "Unlabeldata");
      // console.log(data, "rcvd data 1st hit");
      if (!data.Message) {
        setAddedProducts([data]);
        // console.log("Inside Response");
        setLoading(false);
        // console.log("added", data);
        // const allItemCodes = data.data.map((product) => ({
        //   ItemCode: product.itemCode,
        // }));
        // setAllItemCodesArray(allItemCodes);
        setDeleteAll(true);
        setPartyTypeId("");
        setCategory("");
        setProductType("");
        setPurity("");
        setQuantity(1);
        setCollection("");
        setGrosswt(0);
        setNetWt(0);
        setClipWeight(0);
        setGender("");
        setStoneWeight(0);
        setMRP(0);
        setProductName("");
        setDescription("");
        setSelectedSku([]);
        setSelectedSkuName("");
        setHasUnsavedChanges(true);
        // setStockType("Labelled");
        scrollToCenter("adminAddBulkStockAddedTitleStatement");
        // setData(data.data);
        // updateImages();
        // alert("added");
      } else {
        // Handle the error if the upload fails
        console.error("Failed to upload the files.");
      }
    } catch (error) {
      // Handle any network or fetch API errors
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    // console.log("allItemCodesArray", allItemCodesArray);
  }, [allItemCodesArray]);

  // console.log("allItemCodesArray outside useEffect", allItemCodesArray);
  const handleInputChange = (e, index, property) => {
    const { value } = e.target;
    // Copy the addedProducts array to avoid direct state mutation
    const updatedProducts = [...addedProducts];

    const product = updatedProducts[index];

    // Parse properties to numbers or set them as 0 if the value is empty or invalid
    const grosswt =
      stockType === "Labelled"
        ? parseFloat(product.GrossWt) || 0
        : stockType === "Unlabelled"
        ? parseFloat(product.TotalGrossWt) || 0
        : 0;
    const stoneWeight = parseFloat(product.TotalStoneWeight) || 0;
    const netWt = parseFloat(product.NetWt) || 0;

    // Update the specific property in the product object
    let updatedProduct = { ...product, [property]: value };

    if (property === "RFIDCode") {
      // Convert the barcode number to uppercase before doing the comparison
      const barcodeValue = value.toUpperCase();
      updatedProduct.RFIDCode = barcodeValue; // Set the barcodeNumber property to uppercase

      // Find a matching product in the rifdData array
      const matchingProduct = rifdData.find(
        (item) => item.BarcodeNumber === barcodeValue
      );

      if (matchingProduct) {
        updatedProduct.TIDNumber = matchingProduct.TidValue;
      } else {
        // If no matching product found, set 'tid' to null or some default value
        updatedProduct.TIDNumber = null; // or any default value you want
        // setBarCodeAlert(true);
      }
    }

    // If 'grosswt' is changed, calculate 'netWt'
    if (property === "GrossWt" && !isNaN(value)) {
      updatedProduct.NetWt =
        parseFloat(value) -
          parseFloat(parseFloat(updatedProduct.ClipWeight)) -
          parseFloat(updatedProduct.TotalStoneWeight) >
        0
          ? (
              parseFloat(value) -
              parseFloat(updatedProduct.ClipWeight) -
              parseFloat(updatedProduct.TotalStoneWeight)
            ).toFixed(3)
          : (updatedProduct.GrossWt = value);
    }
    if (property === "TotalGrossWt" && !isNaN(value)) {
      updatedProduct.TotalNetWt =
        parseFloat(value) - parseFloat(updatedProduct.TotalStoneWeight) > 0
          ? (
              parseFloat(value) -
              parseFloat(updatedProduct.ClipWeight) -
              parseFloat(updatedProduct.TotalStoneWeight)
            ).toFixed(3)
          : (updatedProduct.TotalGrossWt = value);
    }

    // If 'stoneWeight' is changed, calculate 'netWt'
    if (property === "TotalStoneWeight" && !isNaN(value)) {
      updatedProduct.NetWt =
        parseFloat(updatedProduct.GrossWt) > value
          ? (updatedProduct.GrossWt - parseFloat(value)).toFixed(3)
          : ((updatedProduct.GrossWt = value),
            (updatedProduct.TotalStoneWeight = value),
            (updatedProduct.NetWt = 0));
    }
    if (property === "ClipWeight" && !isNaN(value)) {
      const clipWeight = parseFloat(value);
      if (grosswt > clipWeight) {
        // If gross weight is greater than the clip weight, update net weight
        updatedProduct.NetWt = parseFloat(
          grosswt - (stoneWeight + clipWeight)
        ).toFixed(3);
        updatedProduct.ClipWeight = clipWeight;
        updatedProduct.ClipQuantity = "1";
      } else {
        // If clip weight is greater or equal to the gross weight, adjust accordingly
        updatedProduct.GrossWt = parseFloat(clipWeight + stoneWeight).toFixed(
          3
        );
        updatedProduct.ClipWeight = clipWeight;
        updatedProduct.ClipQuantity = "1";
        updatedProduct.NetWt = 0; // Set net weight to 0 if conditions dictate
      }
    }

    // If 'netWt' is changed, calculate 'grosswt' and 'stoneWeight'
    if (property === "NetWt" && !isNaN(value)) {
      updatedProduct.GrossWt = (
        parseFloat(value) +
        parseFloat(updatedProduct.ClipWeight) +
        stoneWeight
      ).toFixed(3);
      updatedProduct.TotalStoneWeight = (
        grosswt -
        parseFloat(value) -
        parseFloat(updatedProduct.ClipWeight)
      ).toFixed(3);
    }
    if (property === "TotalNetWt" && !isNaN(value)) {
      updatedProduct.TotalGrossWt = (
        parseFloat(value) +
        stoneWeight +
        parseFloat(updatedProduct.ClipWeight)
      ).toFixed(3);
      updatedProduct.TotalStoneWeight = (grosswt - parseFloat(value)).toFixed(
        3
      );
    }
    if (property === "Pieces" && value > 1 && stockType === "Labelled") {
      setPiecesBox(true);
      setProductPiecesEditId(index);
      handlePiecesChange(value, index);
    }

    updatedProducts[index] = updatedProduct;

    setAddedProducts(updatedProducts);
  };

  // ... (rest of the code)

  const playTimer = () => {
    setTimeout(() => {
      setGoldAlert(false), setBarCodeAlert(false), setImportAlert(false);
    }, 2000);
  };

  function findClosestHigherDiamondWeight(
    data,
    inputWeight,
    inputShape,
    inputClarity,
    color,
    size,
    cut
  ) {
    // Convert inputWeight to a number
    const positiveInputWeight = parseFloat(inputWeight);
    console.log(
      "checking diamond inputes  ",
      inputWeight,
      inputShape,
      inputClarity,
      color,
      size,
      cut
    );

    if (!inputWeight || parseFloat(inputWeight) === 0) {
      return null;
    }

    // Filter and sort the weights
    const higherWeights = data
      .map((item) => {
        // Convert DiamondWeight to a positive number
        const positiveWeight = Math.abs(parseFloat(item.DiamondWeight));
        return {
          ...item,
          DiamondWeight: positiveWeight,
        };
      })
      // Filter weights greater than input weight
      .filter((item) => item.DiamondShape === inputShape)
      .filter((item) => item.DiamondClarity === inputClarity)
      .filter((item) => item.DiamondColor === color)
      .filter((item) => item.DiamondCut === cut);
    // .filter(item => item.DiamondWeight == positiveInputWeight)

    // .filter(item => item.DiamondWeight >= positiveInputWeight)  // Filter weights greater than or equal to input weight

    const sortedDiamonds = higherWeights.sort(
      (a, b) => a.DiamondWeight - b.DiamondWeight
    );

    // Initialize variable to hold the closest diamond found
    let closestDiamond = null;

    // Iterate through the sorted diamonds to find the exact match or the next higher weight
    for (let i = 0; i < sortedDiamonds.length; i++) {
      if (sortedDiamonds[i].DiamondWeight === positiveInputWeight) {
        // Exact match found
        closestDiamond = sortedDiamonds[i];
        break;
      } else if (sortedDiamonds[i].DiamondWeight > positiveInputWeight) {
        // Next higher weight found
        closestDiamond = sortedDiamonds[i];
        break;
      }
    }

    // If no exact or higher weight was found, return the closest diamond found or null
    return closestDiamond || null;
    // Sort in ascending order
    //     .sort((a, b) => a.DiamondWeight - b.DiamondWeight);
    // // Get the closest higher weight
    // return higherWeights.length > 0 ? higherWeights[0] : null;
  }

  function findClosestHigherDiamondWeight1(
    data,
    inputWeight,
    inputShape,
    inputClarity
  ) {
    // Convert inputWeight to a number
    const positiveInputWeight = parseFloat(inputWeight);

    // Filter and sort the weights
    const higherWeights = data
      .map((item) => {
        // Convert DiamondWeight to a positive number
        const positiveWeight = Math.abs(parseFloat(item.DiamondWeight));
        return {
          ...item,
          DiamondWeight: positiveWeight,
        };
      })
      // Filter weights greater than input weight
      .filter((item) => item.DiamondShape === inputShape)
      .filter((item) => item.DiamondClarity === inputClarity)
      .filter((item) => item.DiamondWeight == positiveInputWeight)
      // Sort in ascending order
      .sort((a, b) => a.DiamondWeight - b.DiamondWeight);
    // Get the closest higher weight
    return higherWeights.length > 0 ? higherWeights[0] : null;
  }

  const handleEditProducts = async () => {
    setLoading(true);
    setReadOnly(false);
    console.log(addedProducts, "save:label");

    try {
      // Validate 'grosswt' for all products
      const hasInvalidGrossWt = addedProducts.some(
        (product) =>
          (product.GrossWt === "" && product.CategoryId == 1) ||
          (parseFloat(product.GrossWt) === 0 && product.CategoryId == 1)
      );

      const hasMissingBarcodeAndTid = addedProducts.some((product) => {
        if (product.RFIDCode && product.RFIDCode.length !== 0) {
          // Barcode is not empty or null, so check if tid is missing
          return product.TIDNumber === null || product.TIDNumber === "";
        }
        // Barcode is either empty or null, so no need to check tid
        return false;
      });

      if (hasInvalidGrossWt) {
        setLoading(false);
        setGoldAlert(true);
        playTimer();
      } else if (hasMissingBarcodeAndTid) {
        setLoading(false);
        setBarCodeAlert(true);
        playTimer();
      } else {
        // Convert grosswt, stoneWeight, and netWt to strings before sending

        const updatedProductsString = addedProducts.map((product) => {
          // Calculate total stone weight
          let totalStoneWeight = 0;
          if (product.Stones.length > 0) {
            totalStoneWeight = product.Stones.reduce((a, b) => {
              const stoneWeight = parseFloat(b.StoneWeight);
              return a + stoneWeight;
            }, 0);
          }
          totalStoneWeight = parseFloat(totalStoneWeight).toFixed(3);

          return {
            ...product,
            GrossWt: !grossWithClip
              ? product.GrossWt.toString()
              : parseFloat(
                  parseFloat(product.GrossWt) - parseFloat(product.ClipWeight)
                )
                  .toFixed(3)
                  .toString(),
            TotalStoneWeight: totalStoneWeight,
            NetWt: product.NetWt.toString(),
            ClipWeight: product.ClipWeight.toString(),
          };
        });

        // const updatedProductsString = addedProducts.map((product) => ({
        //   ...product,
        //   GrossWt: !grossWithClip
        //     ? product.GrossWt.toString()
        //     : parseFloat(
        //         parseFloat(product.GrossWt) - parseFloat(product.ClipWeight)
        //       )
        //         .toFixed(3)
        //         .toString(),

        //         TotalStoneWeight: totalStoneWeight,
        //   TotalStoneWeight:
        //     product.Stones.length > 0
        //       ? product.Stones.reduce(
        //           (a, b) =>
        //             parseFloat(a + parseFloat(b.StoneWeight)).toFixed(3),
        //           0
        //         )
        //       : product.TotalStoneWeight.toString(),
        //   NetWt: product.NetWt.toString(),
        //   ClipWeight: product.ClipWeight.toString(),
        // }));

        let editProduct = false;
        if (updatedProductsString && updatedProductsString[0].Id) {
          editProduct = true;
        } else {
          editProduct = false;
        }
        console.log(
          "updatedProductsStringupdatedProductsString : ",
          updatedProductsString
        );

        // Send the updated products to the edit API endpoint
        // const transformedData = updatedProductsString.map((item,ind))
        // const response = await fetch(a177, {
        const response = await fetch(!editProduct ? a217 : a177, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductsString),
        });
        const rcvdData = await response.json();
        //       openLabelInNew(rcvdData.data);
        //       console.log("addedProducts", addedProducts);
        //       console.log("updatedProducts", updatedProducts);
        //       // setUpdatedProducts(rcvdData.data);
        //       setLoading(false);
        //     }
        //   } catch (error) {
        //     alert(error);
        //     console.error(error);
        //     setLoading(false);
        //   }
        // };
        if (rcvdData.Message) {
          setLoading(false);
          alert(rcvdData.Message); // Show error message
          const productsWithErrors = addedProducts.map((product) =>
            product.RFIDCode === rcvdData.errorBarcode
              ? { ...product, hasError: true }
              : product
          );
          setAddedProducts(productsWithErrors);
          // console.log("rcvdDataErrorAdded", addedProducts);
        } else {
          // openLabelInNew(rcvdData);
          GenerateLabel(rcvdData, labelFormat);
          setAddedProducts(rcvdData);
          fetchAllLabelledStock();
          setHasUnsavedChanges(false);
          // console.log("addedProducts", addedProducts);
          // console.log("updatedProducts", updatedProducts);
          setLoading(false);
        }
      }
    } catch (error) {
      alert(error);
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleEditProductsUnlabelled = async () => {
    setLoading(true);
    setReadOnly(false);
    try {
      const updatedProductsString = addedProducts.map((product) => ({
        ...product,
        TotalGrossWt: product.TotalGrossWt.toString(),
        TotalStoneWeight: product.TotalStoneWeight.toString(),
        TotalNetWt: product.TotalNetWt.toString(),
        MRP: product.MRP.toString(),
        Pieces: `${parseInt(product.pieces)}`,
      }));
      const updatedProductsString2 = updatedProductsString.map((product) => {
        // Filter out properties with null values
        const filteredProduct = Object.fromEntries(
          Object.entries(product).filter(([key, value]) => value !== null)
        );
        return filteredProduct;
      });
      const createFormData = (data) => {
        const formData = new FormData();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
          }
        }
        return formData;
      };

      // Assuming updatedProductsString2[0] contains the data you want to send
      const formData = createFormData(updatedProductsString2[0]);
      // Send the updated products to the edit API endpoint
      // const formData = new FormData();
      // formData.append("Data", updatedProductsString2)
      const response = await fetch(a199, {
        method: "POST",
        body: formData,
      });
      const rcvdData = await response.json();
      setHasUnsavedChanges(true);
      setStockType("Labelled");
      setAddedProducts([rcvdData]);
      setAddedProducts([]);
      alert("Unlabelled Stock Added");
      scrollToCenter("addBulkProductsBoxTop");
      //       openLabelInNew(rcvdData.data);
      //       console.log("addedProducts", addedProducts);
      //       console.log("updatedProducts", updatedProducts);
      //       // setUpdatedProducts(rcvdData.data);
      //       setLoading(false);
      //     }
      //   } catch (error) {
      //     alert(error);
      //     console.error(error);
      //     setLoading(false);
      //   }
      // };
      if (rcvdData.status === "error") {
        setLoading(false);
        alert(rcvdData.message); // Show error message
      } else {
        // console.log("updatedProducts", updatedProducts);
        setLoading(false);
      }
    } catch (error) {
      alert(error);
      console.error(error);
      setLoading(false);
    }
  };
  // console.log("2addedProducts", addedProducts);
  const filteredProducts = productTypeData.filter(
    (product) => product.CategoryId == baseMetal
  );
  const filteredCollection = collectionTypeData.filter(
    (product) => product.ProductId == productTypeId
  );
  const filteredPurity = purityData.filter(
    (product) => product.CategoryId == baseMetal
  );
  const filteredBoxes = boxData.filter(
    (product) => product.ProductId == productTypeId
  );

  const handleCheckboxChange = (productId, itemCode) => {
    let updatedCheckedProducts = [...checkedProducts];
    let updatedSelectedItemCodes = [...selectedItemCodes];

    if (updatedCheckedProducts.includes(productId)) {
      updatedCheckedProducts = updatedCheckedProducts.filter(
        (id) => id !== productId
      );
      updatedSelectedItemCodes = updatedSelectedItemCodes.filter(
        (code) => code !== itemCode
      );
    } else {
      updatedCheckedProducts.push(productId);
      updatedSelectedItemCodes.push(itemCode);
    }

    if (updatedCheckedProducts.length > 0) {
      setDeleteSelected(true);
    } else {
      setDeleteSelected(false);
    }

    setCheckedProducts(updatedCheckedProducts);
    setSelectedItemCodes(updatedSelectedItemCodes);
  };

  const selectedItems = selectedItemCodes.map((itemCode) => ({
    ItemCode: itemCode,
  }));

  // console.log("checkedProducts", checkedProducts);
  // console.log("selectedItemCodes", selectedItemCodes);
  // console.log("selectedItems", selectedItems);

  const deleteAllProducts = async (itemsToDelete) => {
    setReadOnly(false);
    const deletAllItemsList = itemsToDelete.map((x) => {
      return { ...x, ClientCode: clientCode };
    });
    // const deletAllItemsList = itemsToDelete.map(x => ({...x, ClientCode: clientCode}));

    try {
      const response = await fetch(a178, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deletAllItemsList),
      });

      const rcvdData = await response.json();
      // console.log("AllItemsDeleted", rcvdData);
      if (response.ok) {
        // Deletion was successful
        // console.log("Item deleted successfully:", response.message);
        // alert(rcvdData.message);
        setSelectedItemCodes([]);
        setCheckedProducts([]);
        scrollToCenter("addBulkProductsBoxTop");
        // You can show an alert or notification here
        // alert(data.message);
        if (itemsToDelete == allItemCodesArray) {
          setAddedProducts([]);
        } else {
          const updatedAddedProducts = addedProducts.filter((product) => {
            return !itemsToDelete.some(
              (item) => item.ItemCode === product.ItemCode
            );
          });
          setAddedProducts(updatedAddedProducts);
        }
        setDeleteAll(false);
        setDeleteSelected(false);
      } else {
        // Handle the case where deletion failed
        console.error("Failed to delete item:", response.message);

        // You can show an error message to the user
        alert("Failed to delete item: " + response.message);
      }
    } catch (error) {
      // Handle any network or fetch API errors
      console.error("An error occurred:", error);

      // Show an error message to the user
      // alert("An error occurred while deleting the item.");
    }
  };
  const showAllInputs = () => {
    setHalfInputs(!halfInputs);
    const allFields = document.getElementById("bulkStockAddProductDetailsBox");
    if (halfInputs) {
      allFields.classList.add("bulkStockAddProductDetailsBoxHalfHeight");
      allFields.classList.remove("bulkStockAddProductDetailsBoxFullHeight");
    } else {
      allFields.classList.remove("bulkStockAddProductDetailsBoxHalfHeight");
      allFields.classList.add("bulkStockAddProductDetailsBoxFullHeight");
    }
  };
  const [selectedSku, setSelectedSku] = useState([]);
  const [selectedSkuName, setSelectedSkuName] = useState("");
  const handleSkuInputChange = (e) => {
    const { value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setSelectedSkuName(uppercaseValue);
    let selectedSkuItem = [];
    selectedSkuItem = allSku.find((x) => x.StockKeepingUnit == uppercaseValue);
    setSelectedSku(selectedSkuItem);
  };

  useEffect(() => {
    if (selectedSkuName !== "" && selectedSku) {
      if (selectedSku.WeightCategories) {
        const parsedWeights = selectedSku.WeightCategories.split(",")
          .map(Number)
          .filter((num) => !isNaN(num)); // Ensures only valid numbers are included
        setSelectedweights(parsedWeights);
      } else {
        setSelectedweights([]);
      }

      setDescription(selectedSku.Description);
      setNetWt(selectedSku.NetWt);
      setBoxId(1);
      setPartyTypeId(selectedSku.VendorId);
      // categoryName = selectedSku.category;
      // productTypeName = selectedSku.productType;
      // collectionName = selectedSku.collection;
      // purityName = selectedSku.purity;
      setCategory(`${selectedSku.CategoryId}`);
      setBaseMetal(`${selectedSku.CategoryId}`);
      setProductType(`${selectedSku.ProductId},${selectedSku.ProductName}`);
      setCollection(`${selectedSku.DesignId},${selectedSku.DesignName}`);
      setPurity(`${selectedSku.PurityId},${selectedSku.PurityName}`);
      // categoryId = selectedSku.categoryId;
      // productTypeId = selectedSku.productTypeId;
      // purityId = selectedSku.purityId;
      // collectionId = selectedSku.collectionId;
      setSize(selectedSku.Size);
      setGrosswt(selectedSku.GrossWt);
      setPieces(selectedSku.Pieces);
      // setStoneWeight(
      //   parseFloat(selectedSku.TotalStoneWeight) *
      //     parseFloat(selectedSku.Pieces)
      // );
      setSelectedFiles(selectedSku.Images);
      // setSelectedFiles(selectedSku.images);
      setMaking_Percentage(selectedSku.MakingPercentage);
      setMaking_Fixed_Amt(selectedSku.MakingFixedAmt);
      setMaking_per_gram(selectedSku.MakingPerGram);
      setMaking_Fixed_Wastage(selectedSku.MakingFixedWastage);
      setMRP(selectedSku.MRP);
      setAllSelectedSkuStones(selectedSku.SKUStoneMain);
      setAllSelectedSkuDiamonds(selectedSku.Diamonds);
      if (
        selectedSku.ClipWeight == 0 ||
        selectedSku.ClipWeight == "0" ||
        selectedSku.ClipWeight == "0.00" ||
        selectedSku.ClipWeight == "0.000"
      ) {
        setClipWeight(selectedSku.ClipWeight);
        setGrossWithClip(false);
      } else {
        setClipWeight(selectedSku.ClipWeight);

        setGrossWithClip(true);
      }
      const allFilteredPurchaseItemsList = allPurchaseItems.filter(
        (x) => x.SKUId === selectedSku.Id
      );
      setAllFilteredPurchaseItems(allFilteredPurchaseItemsList);
    } else {
      setDeleteAll(true);
      // setPartyTypeId("");
      setCategory("");
      setBaseMetal("");
      setProductType("");
      setPurity("");
      setQuantity(1);
      setCollection("");
      setGrosswt(0);
      setNetWt(0);
      setClipWeight(0);
      setGender("");
      setStoneWeight(0);
      setMRP(0);
      setBoxId(1);
      setProductName("");
      setDescription("");
      setSelectedFiles([]);
      setAllFilteredPurchaseItems(allPurchaseItems);
      setGrossWithClip(false);
    }
  }, [selectedSku]);

  useEffect(() => {
    const allFilteredPurchaseItemsList = allPurchaseItems.filter(
      (x) => x.VendorId === parseInt(partyTypeId)
    );
    setAllFilteredPurchaseItems(allFilteredPurchaseItemsList);
  }, [partyTypeId]);

  const uploadExcelFile = async () => {
    if (importFile) {
      const formData = new FormData();
      formData.append("file", importFile);

      fetch(a90, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then((data) => ({
              status: response.status,
              data,
            }));
          } else {
            return response.text().then((text) => ({
              status: response.status,
              data: text,
            }));
          }
        })
        .then(({ status, data }) => {
          alert("Imported Data");
          setShowImportPopup(false);
          // Handle success response
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors
        });
    } else {
      alert("Please select a file.");
    }
  };

  const handleSelectedSkuStoneChange = (e) => {
    if (e.target.value !== "") {
      const selectedStone = allSelectedSkuStones.find(
        (stone) => stone.Id == e.target.value
      );
      setSelectedSkuStones(selectedStone);
      setStoneWeight(
        (
          parseFloat(selectedStone.StoneMainWeight) *
          parseFloat(selectedSku.Pieces)
        ).toFixed(3)
      );
      setNetWt(
        (
          parseFloat(grosswt) -
          parseFloat(selectedStone.StoneMainWeight) *
            parseFloat(selectedSku.Pieces)
        ).toFixed(3)
      );
      setStoneAmount(
        (
          parseFloat(selectedStone.StoneMainAmount) *
          parseFloat(selectedSku.Pieces)
        ).toFixed(2)
      );
    } else {
      setSelectedSkuStones({ Id: 0 });
    }
  };

  const handleSelectedweights = (e) => {
    const value = e.target.value;

    if (value !== "") {
      setWeights(parseFloat(value)); // Set the selected weight
    } else {
      setWeights(0); // Set to default if empty value is selected
    }
  };

  async function fetchAllStonesList() {
    const formData = { ClientCode: clientCode };
    try {
      const response = await fetch(a146, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllStonesList(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAllDiamondsList() {
    const formData = { ClientCode: clientCode };
    try {
      const response = await fetch(a153, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllDiamondsList(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAllStonesList();
    fetchAllDiamondsList();
  }, []);
  useEffect(() => {
    if (selectedSku) {
      setAllStonesList(selectedSku.SKUStoneMain);
    } else {
      fetchAllStonesList();
    }
  }, [selectedSku]);
  // const handleStoneChange = (index, property, value) => {
  //   const newStones = newStonesList;
  //   const selectedStone = allStonesList.find(
  //     (stone) => stone.StoneName === value
  //   );
  //   console.log(selectedStone, "selected Stone");
  //   console.log(selectedStone, "selected Stone");

  //   if (selectedStone) {
  //     newStones[index] = {
  //       ...newStones[index],
  //       StoneName: selectedStone.StoneName,
  //       StoneWeight: selectedStone.StoneWeight, // Assuming these fields exist in your stone objects
  //       StonePieces: selectedStone.StonePieces,
  //       StoneRate: selectedStone.StoneRate,
  //       StoneAmount: selectedStone.StoneAmount, // Calculate or pull this value as required
  //       Description: selectedStone.Description, // Assuming a description field exists
  //     };
  //   } else {
  //     newStones[index] = {
  //       ...newStones[index],
  //       [property]: value,
  //     };
  //   }

  //   return setNewStonesList(newStones);
  // };

  function getShapeValue(id, shape, parameter) {
    console.log("check input values ", id, "  ", shape, "  ", parameter);
    if (id) {
      const shapeValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == parameter)
        ?.find((item) => item.Id == id);
      return id ? shapeValue?.DiamondValue : "";
    }
    if (shape) {
      const shapeValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == parameter)
        ?.find((item) => item.DiamondValue == shape);
      return shape ? shapeValue?.Id : "";
    }
  }

  function getShapeValue1(id, shape) {
    if (id) {
      const shapeValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == "DiamondShape")
        ?.find((item) => item.Id == id);
      return id ? shapeValue?.DiamondValue : "";
    }
    if (shape) {
      const shapeValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == "DiamondShape")
        ?.find((item) => item.DiamondValue == shape);
      return shape ? shapeValue?.Id : "";
    }
  }

  function getDiamondClarity(id, clarity) {
    if (id) {
      const clarityValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == "DiamondClarity")
        ?.find((item) => item.Id == id);
      return id ? clarityValue?.DiamondValue : "";
    }
    if (clarity) {
      const clarityValue = allDiamondAttributes
        .filter((x) => x.DiamondAttribute == "DiamondClarity")
        ?.find((item) => item.DiamondValue == clarity);
      return clarity ? clarityValue?.Id : "";
    }
  }

  const [selectedStone, setSelectedStone] = useState(null);
  const handleStoneChange = (stoneIndex, field, value) => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product, index) => {
        if (index !== selectedProductIndex) return product;

        const updatedStones = product.Stones.map((stone, sIndex) => {
          if (sIndex !== stoneIndex) return stone;

          if (field === "StoneName") {
            const selectedStone = allStonesList.find(
              (stone) =>
                (stone.StoneName ? stone.StoneName : stone.StoneMainName) ===
                value
            );
            console.log(
              "selectedStoneselectedStone",
              selectedStone,
              allStonesList
            );
            if (selectedStone) {
              return {
                ...stone,
                StoneName: selectedStone.StoneName
                  ? selectedStone.StoneName
                  : selectedStone.StoneMainName,
                StoneWeight: selectedStone.StoneWeight
                  ? selectedStone.StoneWeight
                  : selectedStone.StoneMainWeight,
                StonePieces: selectedStone.StonePieces
                  ? selectedStone.StonePieces
                  : selectedStone.StoneMainPieces,
                StoneRate: selectedStone.StoneRate
                  ? selectedStone.StoneRate
                  : selectedStone.StoneMainRate,
                StoneAmount: selectedStone.StoneAmount
                  ? selectedStone.StoneAmount
                  : selectedStone.StoneMainAmount,
                Description: selectedStone.Description
                  ? selectedStone.Description
                  : selectedStone.StoneMainDescription,
              };
            }
          }
          return { ...stone, [field]: value };
        });

        const productPieces = parseFloat(product.Pieces || 0);

        const totalStoneWeight = updatedStones
          .reduce(
            (total, stone) =>
              total + parseFloat(stone.StoneWeight || 0) * productPieces,
            0
          )
          .toFixed(3);

        const totalStoneAmount = updatedStones
          .reduce(
            (total, stone) =>
              total + parseFloat(stone.StoneAmount || 0) * productPieces,
            0
          )
          .toFixed(2);
        const totalNetWt = parseFloat(
          parseFloat(product.GrossWt) - parseFloat(totalStoneWeight)
        ).toFixed(3);
        const totalStonePieces = (
          product.Stones.length * productPieces
        ).toString();

        return {
          ...product,
          Stones: updatedStones,
          TotalStoneWeight: totalStoneWeight,
          TotalStoneAmount: totalStoneAmount,
          TotalStonePieces: totalStonePieces,
          NetWt: totalNetWt,
        };
      })
    );
  };
  const handleDiamondChange = (diamondIndex, field, value) => {
    setAddedProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product, index) => {
        if (index !== selectedProductIndex) return product;

        const updatedDiamonds = product.Diamonds.map((diamond, sIndex) => {
          if (sIndex !== diamondIndex) return diamond;

          let updatedDiamond = { ...diamond, [field]: value };

          if (field === "DiamondSize") {
            const selectedDiamond = allDiamondSizeWeightRate.find(
              (diamond) => diamond.DiamondSize === value
            );
            if (selectedDiamond) {
              updatedDiamond = {
                ...diamond,
                ...selectedDiamond,
                DiamondSellAmount: "0",
                DiamondPurchaseAmount: "0",
                TotaldiamondWeight: "0",
                DiamondPieces: "0",
              };
            }
          } else if (field === "DiamondMargin") {
            const diamondPurchaseRate = parseFloat(
              diamond.DiamondPurchaseRate || 0
            );
            const diamondMargin = parseFloat(value || 0);
            const diamondSellRate = (
              diamondPurchaseRate *
              (1 + diamondMargin / 100)
            ).toFixed(2);

            updatedDiamond = {
              ...diamond,
              [field]: value,
              DiamondSellRate: diamondSellRate,
              DiamondSellAmount: "0",
              DiamondPurchaseAmount: "0",
              TotaldiamondWeight: "0",
              DiamondPieces: "0",
            };
          } else if (field === "DiamondPurchaseRate") {
            const diamondPurchaseRate = parseFloat(value || 0);
            const diamondMargin = parseFloat(diamond.DiamondMargin || 0);
            const diamondSellRate = (
              diamondPurchaseRate *
              (1 + diamondMargin / 100)
            ).toFixed(2);

            updatedDiamond = {
              ...diamond,
              [field]: value,
              DiamondSellRate: diamondSellRate,
              DiamondSellAmount: "0",
              DiamondPurchaseAmount: "0",
              TotaldiamondWeight: "0",
              DiamondPieces: "0",
            };
          } else if (field === "DiamondSellRate") {
            const diamondSellRate = parseFloat(value || 0);
            const diamondPurchaseRate = parseFloat(
              diamond.DiamondPurchaseRate || 0
            );

            if (diamondPurchaseRate !== 0) {
              const diamondMargin = (
                (diamondSellRate / diamondPurchaseRate - 1) *
                100
              ).toFixed(2);

              updatedDiamond = {
                ...diamond,
                [field]: value,
                DiamondMargin: diamondMargin,
                DiamondSellAmount: "0",
                DiamondPurchaseAmount: "0",
                TotaldiamondWeight: "0",
                DiamondPieces: "0",
              };
            } else {
              updatedDiamond = {
                ...diamond,
                [field]: value,
                DiamondSellAmount: "0",
                DiamondPurchaseAmount: "0",
                TotaldiamondWeight: "0",
                DiamondPieces: "0",
              };
            }
          } else if (field === "DiamondPieces") {
            const diamondPieces = parseFloat(value || "0");
            const diamondWeight = parseFloat(diamond.DiamondWeight || 0);
            const diamondPurchaseRate = parseFloat(
              diamond.DiamondPurchaseRate || 0
            );
            const diamondSellRate = parseFloat(diamond.DiamondSellRate || 0);

            updatedDiamond = {
              ...diamond,
              [field]: value,
              TotalDiamondWeight: (diamondWeight * diamondPieces).toFixed(3),
              DiamondPurchaseAmount: (
                diamondPurchaseRate * diamondPieces
              ).toFixed(2),
              DiamondSellAmount: (diamondSellRate * diamondPieces).toFixed(2),
            };
          }

          // Update DiamondPurchaseRate based on DiamondWeight, DiamondShape, or DiamondClarity
          if (
            field === "DiamondWeight" ||
            field === "DiamondShape" ||
            field === "DiamondClarity"||
            field === "DiamondCut"
          ) {
            const diamondTemplate = allDiamondSizeWeightRate.find(
              (template) => {
                return template.Id === diamondTemplateId;
              }
            );

            if (diamondTemplate) {
              // const shape = newDiamond[index].DiamondShape ? getShapeValue(null, newDiamond[index].DiamondShape) : null;
              // const clarity = newDiamond[index].DiamondClarity ? getDiamondClarity(null, newDiamond[index].DiamondClarity) : null;
              const shape = updatedDiamond.DiamondShape
                ? getShapeValue(
                    null,
                    updatedDiamond.DiamondShape,
                    "DiamondShape"
                  )
                : null;
              const clarity = updatedDiamond.DiamondClarity
                ? getShapeValue(
                    null,
                    updatedDiamond.DiamondClarity,
                    "DiamondClarity"
                  )
                : null;
              const color = updatedDiamond.DiamondColour
                ? getShapeValue(
                    null,
                    updatedDiamond.DiamondColour,
                    "DiamondColour"
                  )
                : null;
              const size = updatedDiamond.DiamondSize
                ? getShapeValue(null, updatedDiamond.DiamondSize, "DiamondSize")
                : null;
              const cut = updatedDiamond.DiamondCut
                ? getShapeValue(null, updatedDiamond.DiamondCut, "DiamondCut")
                : null;
              if (
                updatedDiamond.DiamondWeight &&
                updatedDiamond.DiamondWeight > 0
              ) {
                const foundData = findClosestHigherDiamondWeight(
                  diamondTemplate.DiamondSizeWeightRates,
                  updatedDiamond.DiamondWeight,
                  shape,
                  clarity,
                  color,
                  size,
                  cut
                );
    
                if (foundData) {
                  // updatedDiamond = {
                  //   ...updatedDiamond,
                  //   DiamondRate: foundData.DiamondPurchaseRate,
                  // };
                  updatedDiamond.DiamondRate = foundData.DiamondSellRate
                }
              } else {
                // updatedDiamond = {
                //   ...updatedDiamond,
                //   DiamondRate: "0",
                // };
                updatedDiamond.DiamondRate = '0'
              }
            }
            // if (diamondTemplate) {
            //   const shape = updatedDiamond.DiamondShape
            //     ? getShapeValue(null, updatedDiamond.DiamondShape)
            //     : null;
            //   const clarity = updatedDiamond.DiamondClarity
            //     ? getDiamondClarity(null, updatedDiamond.DiamondClarity)
            //     : null;

            //   const findedData = findClosestHigherDiamondWeight(
            //     diamondTemplate.DiamondSizeWeightRates,
            //     updatedDiamond.DiamondWeight,
            //     shape,
            //     clarity
            //   );
            //   if (findedData) {
            //     updatedDiamond.DiamondPurchaseRate =
            //       findedData.DiamondPurchaseRate;
            //   }
            // }
          }

          return updatedDiamond;
        });

        const productPieces = parseFloat(product.Pieces || "0");

        const totalDiamondWeight = updatedDiamonds
          .reduce(
            (total, stone) =>
              total + parseFloat(stone.TotalDiamondWeight || 0) * productPieces,
            0
          )
          .toFixed(3);

        const totalDiamondAmount = updatedDiamonds
          .reduce(
            (total, stone) =>
              total + parseFloat(stone.DiamondSellAmount || 0) * productPieces,
            0
          )
          .toFixed(2);

        const totalNetWt = parseFloat(
          parseFloat(product.GrossWt) -
            parseFloat(product.TotalStoneWeight) -
            parseFloat(totalDiamondWeight)
        ).toFixed(3);

        const totalDiamondPieces = (
          product.Diamonds.length * productPieces
        ).toString();

        return {
          ...product,
          Diamonds: updatedDiamonds,
          TotalDiamondWeight: totalDiamondWeight,
          TotalDiamondAmount: totalDiamondAmount,
          TotalDiamondPieces: totalDiamondPieces,
          NetWt: totalNetWt,
        };
      });
      return updatedProducts;
    });
  };

  const handleAddStone = () => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product, index) =>
        index === selectedProductIndex
          ? { ...product, Stones: [...product.Stones, {}] }
          : product
      )
    );
  };
  const handleAddDiamond = () => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product, index) =>
        index === selectedProductIndex
          ? { ...product, Diamonds: [...product.Diamonds, {}] }
          : product
      )
    );
  };
  const deleteStone = (stoneIndex) => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product, index) =>
        index === selectedProductIndex
          ? {
              ...product,
              Stones: product.Stones.filter(
                (_, sIndex) => sIndex !== stoneIndex
              ),
            }
          : product
      )
    );
  };
  const deleteDiamond = (diamondIndex) => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product, index) =>
        index === selectedProductIndex
          ? {
              ...product,
              Diamonds: product.Diamonds.filter(
                (_, sIndex) => sIndex !== diamondIndex
              ),
            }
          : product
      )
    );
    if (addedProducts[selectedProductIndex]?.Diamonds.length === 1) {
      setShowAddDiamondBox(false);
    }
  };
  const handleClose = () => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product, index) => {
        if (index !== selectedProductIndex) return product;

        const filteredStones = product.Stones.filter(
          (stone) =>
            stone.StoneName &&
            stone.StoneWeight &&
            stone.StonePieces &&
            stone.StoneRate &&
            stone.StoneAmount &&
            stone.Description
        );

        return { ...product, Stones: filteredStones };
      })
    );
    setShowAddStoneBox(false);
  };
  const handleCloseDiamond = () => {
    // setAddedProducts((prevProducts) =>
    //     prevProducts.map((product, index) => {
    //         if (index !== selectedProductIndex) return product;
    //
    //         const filteredDiamonds = product.Diamonds.filter(
    //             (diamond) =>
    //                 diamond.DiamondPieces &&
    //                 diamond.TotalDiamondWeight &&
    //                 diamond.DiamondWeight &&
    //                 diamond.DiamondSellAmount &&
    //                 diamond.DiamondSellRate &&
    //                 diamond.DiamondPurchaseAmount &&
    //                 diamond.DiamondPurchaseRate &&
    //                 diamond.DiamondMargin &&
    //                 diamond.DiamondSize
    //         );
    //
    //         return {...product, Diamonds: filteredDiamonds};
    //     })
    // );
    setShowAddDiamondBox(false);
  };
  useEffect(() => {
    if (selectedStone !== null) {
      const { index, stone } = selectedStone;
      const newStones = [...newStonesList];
      newStones[index] = {
        ...newStones[index],
        StoneName: stone.StoneName,
        StoneWeight: stone.StoneWeight,
        StonePieces: stone.StonePieces,
        StoneRate: stone.StoneRate,
        StoneAmount: stone.StoneAmount,
        Description: stone.Description,
      };
      setNewStonesList(newStones);
      setSelectedStone(null);
    }
  }, [selectedStone, newStonesList]);
  return (
    <div>
      <div>
        <AdminHeading />
        <div className="adminMainBodyBox" id="addBulkProductsBoxTop">
          <AdminBreadCrump
            title={"Add Bulk Stock"}
            companyName={"Loyalstring"}
            module={"E-commerce"}
            page={"Add Bulk Stock"}
          />
          <div className="adminAddCategoryMainBox2">
            <div
              style={{
                margin: "0px",
                padding: "0px",
                backgroundColor: "transparent",
              }}
              className="adminAddCategoryInnerBox2"
            >
              {goldAlert
                ? // <AlertMessage
                  //   type="error"
                  //   message="Gross Wt of Gold could not be zero"
                  // />
                  alert("Gross Wt of Gold could not be zero")
                : null}
              {barCodeAlert
                ? // <AlertMessage
                  //   type="error"
                  //   message="Sorry, Please enter a correct Barcode"
                  // />
                  alert("Sorry, Please enter a correct Barcode")
                : null}
              {loadingTop ? (
                <div
                  style={{ height: "50vh", marginBottom: "1rem" }}
                  // className={loadingAdd == true ? "loading" : "none"}
                  className="loading"
                >
                  <InfinitySpin
                    // className={loadingAdd == true ? "loading" : "none"}
                    className="loading"
                    width="150"
                    color="#4fa94d"
                  />
                </div>
              ) : null}
              {showAddStoneBox && selectedProductIndex !== null ? (
                <div className="popup">
                  <div
                    style={{ maxHeight: "250px", overflowY: "auto" }}
                    className="popup-inner"
                  >
                    <div className="adminAddProductsPopupInnerBox">
                      {addedProducts[selectedProductIndex].Stones.map(
                        (x, index) => (
                          <div
                            className="adminPurchaseEntryAddStonesMainBox"
                            key={index}
                          >
                            <div style={{ gridColumn: "span 6" }}>
                              <h4 style={{ margin: "5px" }}>
                                Stone {index + 1}
                              </h4>
                            </div>
                            <label>Stone Name</label>
                            <input
                              value={x.StoneName || ""}
                              onChange={(e) =>
                                handleStoneChange(
                                  index,
                                  "StoneName",
                                  e.target.value
                                )
                              }
                              type="text"
                              list="allStonesList"
                            />
                            <datalist id="allStonesList">
                              {allStonesList.map((stone) => (
                                <option
                                  key={
                                    stone.StoneMainName
                                      ? stone.StoneMainName
                                      : stone.StoneName
                                  }
                                  value={
                                    stone.StoneMainName
                                      ? stone.StoneMainName
                                      : stone.StoneName
                                  }
                                >
                                  {stone.StoneMainName
                                    ? stone.StoneMainName
                                    : stone.StoneName}
                                </option>
                              ))}
                            </datalist>
                            <label>Stone Weight</label>
                            <input
                              value={x.StoneWeight || ""}
                              onChange={(e) =>
                                handleStoneChange(
                                  index,
                                  "StoneWeight",
                                  e.target.value
                                )
                              }
                              type="text"
                            />
                            <label>Stone Pieces</label>
                            <input
                              value={x.StonePieces || ""}
                              onChange={(e) =>
                                handleStoneChange(
                                  index,
                                  "StonePieces",
                                  e.target.value
                                )
                              }
                              type="text"
                            />
                            <label>Stone Rate</label>
                            <input
                              value={x.StoneRate || ""}
                              onChange={(e) =>
                                handleStoneChange(
                                  index,
                                  "StoneRate",
                                  e.target.value
                                )
                              }
                              type="text"
                            />
                            <label>Stone Amount</label>
                            <input
                              value={x.StoneAmount || ""}
                              onChange={(e) =>
                                handleStoneChange(
                                  index,
                                  "StoneAmount",
                                  e.target.value
                                )
                              }
                              type="text"
                            />
                            <label>Stone Description</label>
                            <input
                              value={x.Description || ""}
                              onChange={(e) =>
                                handleStoneChange(
                                  index,
                                  "Description",
                                  e.target.value
                                )
                              }
                              type="text"
                            />
                            <button
                              className="bulkProductAddDeleteButton close-btn"
                              onClick={() => deleteStone(index)}
                            >
                              Delete Stone
                            </button>
                            <button
                              id="bulkStockAddProductImportButton"
                              onClick={handleAddStone}
                              className="close-btn"
                            >
                              Add Stone
                            </button>
                          </div>
                        )
                      )}
                      {addedProducts[selectedProductIndex].Stones.length ===
                      0 ? (
                        <button
                          id="bulkStockAddProductImportButton"
                          onClick={handleAddStone}
                          className="close-btn"
                        >
                          Add Stone
                        </button>
                      ) : null}
                      <button
                        onClick={handleClose}
                        className="bulkProductAddDeleteButton close-btn"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {showAddDiamondBox && selectedProductIndex !== null ? (
                <div className="popup">
                  <div
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                    className="popup-inner"
                  >
                    <div className="adminAddProductsPopupInnerBox">
                      {addedProducts[selectedProductIndex].Diamonds.map(
                        (x, index) => (
                          <div
                            className="adminPurchaseEntryAddStonesMainBox"
                            key={index}
                          >
                            {/* <div style={{ gridColumn: "span 6" }}>
                              <h4 style={{ margin: "5px" }}>
                                Diamond {index + 1}
                              </h4>
                            </div> */}

                            <DiamondEntryComponent
                              key={index}
                              index={index}
                              diamond={x}
                              allDiamondAttributes={allDiamondAttributes}
                              allDiamondSizeWeightRate={
                                allDiamondSizeWeightRate
                              }
                              handleDiamondChange={handleDiamondChange}
                              deleteDiamond={deleteDiamond}
                              addDiamond={() =>
                                setPurchaseProduct((prevState) => ({
                                  ...prevState,
                                  Diamonds: [...prevState.Diamonds, addDiamond],
                                }))
                              }
                              from={'product'}
                            />

                      


                            {/* <button
                              className="bulkProductAddDeleteButton close-btn"
                              onClick={() => deleteDiamond(index)}
                            >
                              Delete Diamond
                            </button>
                            <button
                              id="bulkStockAddProductImportButton"
                              onClick={handleAddDiamond}
                              className="close-btn"
                            >
                              Add Diamond
                            </button> */}
                          </div>
                        )
                      )}
                      {addedProducts[selectedProductIndex].Diamonds.length ===
                      0 ? (
                        <button
                          id="bulkStockAddProductImportButton"
                          onClick={handleAddDiamond}
                          className="close-btn"
                        >
                          Add Diamond
                        </button>
                      ) : null}
                      <button
                        onClick={handleCloseDiamond}
                        className="bulkProductAddDeleteButton close-btn"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {piecesBox ? (
                <div className="adminInvoiceOpenEditMainBox adminAddBulkStockMultiplePiecesMainBox">
                  <div className="adminInvoiceOpenEditInnerBox">
                    <div className="adminInvoiceOpenEditInnerTitleBox">
                      <button
                        onClick={() => closePiecesEditBox()}
                        className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
                      >
                        close
                      </button>
                    </div>
                    <div className="adminInvoiceOpenEditOuterGridBox">
                      {barcodeNumbersArray.map((item, index) => {
                        const barcodeNumberKey = Object.keys(item)[0]; // Get the barcodeNumber key
                        const tidValue = item[barcodeNumberKey]; // Get the tid value

                        return (
                          <>
                            <div
                              className="adminInvoiceOpenEditInnerGridItem"
                              key={index}
                            >
                              <label>Barcode Number</label>
                              <input
                                type="text"
                                value={barcodeNumberKey}
                                onChange={(e) =>
                                  handleBarcodeNumberChange(
                                    e.target.value.toUpperCase(),
                                    index
                                  )
                                }
                              />
                            </div>
                            <div
                              className="adminInvoiceOpenEditInnerGridItem"
                              key={index}
                            >
                              <label>Tid</label>
                              <input type="text" value={tidValue} readOnly />
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => {
                        handleCheckTidValues();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : null}

              <div>
                {loadingAdd ? (
                  <div className="adminAddCategoryMainbox addProductMain">
                    <form
                      style={{
                        marginTop: "10px",
                      }}
                      onSubmit={
                        stockType === "Labelled"
                          ? handleCreateAddedProducts
                          : handleSubmitUnlabelled
                        // ? handleSubmit
                      }
                    >
                      <h3
                        className="adminAddBulkStockAddedTitle"
                        style={{ marginBottom: "3rem", width: "97%" }}
                      >
                        ADD BULK STOCK
                      </h3>

                      {/* <h4
                          id="adminInvoiceAddedCustomerEdit"
                          className="adminInvoiceAddTitles"
                          style={{
                            marginBottom: "3rem",
                            width: "95%",
                            fontSize: "16px",
                            padding: "15px 10px",
                          }}
                        >
                          Add Product
                        </h4>{" "} */}
                      <div className="addProductDetailsUpperBox">
                        <div
                          // style={{ width: "92%" }}
                          className="addProductDetailsBox"
                        >
                          <label htmlFor="category">
                            <strong>SUPPLIER</strong>
                          </label>
                          <select
                            id="category"
                            required="required"
                            value={partyTypeId}
                            onChange={(e) => {
                              setPartyTypeId(e.target.value);
                              const tempId = partyData.find(
                                (event, ind) => event.Id == e.target.value
                              );
                              setDiamondTemplateId(
                                tempId.DiamondSizeWeightRateTemplateId
                              );
                            }}
                          >
                            <option value="">
                              Select Party / Karigar Name
                            </option>
                            {partyData.map((x, y) => {
                              return (
                                <option key={y} value={parseInt(x.Id)}>
                                  {x.VendorName}
                                </option>
                              );
                            })}
                          </select>
                          <p>Unlabelled Gold :</p>

                          <div>
                            {(() => {
                              const selectedParty = partyData.find(
                                (x) => x.Id === parseInt(partyTypeId)
                              );
                              if (selectedParty) {
                                return (
                                  <div
                                    className="addProductSupplierDetailsBox"
                                    key={selectedParty.Id}
                                  >
                                    {" "}
                                    {/* It's good practice to include a key even if it's not strictly necessary here */}
                                    <p>{selectedParty.InwardGold}</p>
                                  </div>
                                );
                              }
                              return null; // If no party is found, render nothing
                            })()}
                          </div>
                        </div>
                        <div
                          // style={{ width: "92%" }}
                          className="addProductDetailsBox"
                        >
                          <label htmlFor="sku">
                            <strong>SKU</strong>
                          </label>
                          <input
                            // style={{ width: "30vw" }}
                            type="text"
                            name="skuList"
                            placeholder="Enter SKU"
                            value={selectedSkuName}
                            onInput={handleSkuInputChange}
                            list="skuList"
                          />
                          <datalist id="skuList">
                            {allSku.map((sku, index) => (
                              <option
                                key={index}
                                value={`${sku.StockKeepingUnit}`}
                              />
                            ))}
                          </datalist>
                          <p>Unlabelled Silver :</p>
                          <div>
                            {(() => {
                              const selectedParty = partyData.find(
                                (x) => x.Id === parseInt(partyTypeId)
                              );
                              if (selectedParty) {
                                return (
                                  <div
                                    className="addProductSupplierDetailsBox"
                                    key={selectedParty.Id}
                                  >
                                    {" "}
                                    {/* It's good practice to include a key even if it's not strictly necessary here */}
                                    <p>{selectedParty.InwardSilver}</p>
                                  </div>
                                );
                              }
                              return null; // If no party is found, render nothing
                            })()}
                          </div>
                        </div>
                        <div
                          // style={{ width: "92%" }}
                          className="addProductDetailsBox"
                        >
                          <label htmlFor="invoiceType">
                            <strong>STOCK TYPE</strong>
                          </label>
                          <select
                            id="invoiceType"
                            required="required"
                            value={stockType}
                            onChange={(e) => setStockType(e.target.value)}
                          >
                            <option value="Labelled">Labelled</option>
                            <option value="Unlabelled">Unlabelled</option>
                          </select>
                          <p>Unlabelled Diamond :</p>
                          <div>
                            {(() => {
                              const selectedParty = partyData.find(
                                (x) => x.Id === parseInt(partyTypeId)
                              );
                              if (selectedParty) {
                                return (
                                  <div
                                    className="addProductSupplierDetailsBox"
                                    key={selectedParty.Id}
                                  >
                                    <p>{selectedParty.VendorName}</p>
                                  </div>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        </div>
                        <div
                          style={
                            {
                              // width: "92%",
                              // marginBottom: "20px",
                            }
                          }
                          className="addProductDetailsBox"
                        >
                          <label htmlFor="selectBranch">
                            <strong>SELECT BRANCH</strong>
                          </label>
                          <select
                            id="selectBranch"
                            required="required"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                          >
                            <option value="Home">Home</option>
                            <option value="Branch 2">Branch 2</option>
                          </select>

                          <p>Unlabelled Other :</p>
                          <div>
                            {(() => {
                              const selectedParty = partyData.find(
                                (x) => x.Id === parseInt(partyTypeId)
                              );
                              if (selectedParty) {
                                return (
                                  <div
                                    className="addProductSupplierDetailsBox"
                                    key={selectedParty.Id}
                                  >
                                    {" "}
                                    {/* It's good practice to include a key even if it's not strictly necessary here */}
                                    <p>{selectedParty.VendorName}</p>
                                  </div>
                                );
                              }
                              return null; // If no party is found, render nothing
                            })()}
                          </div>
                        </div>
                        <div
                          style={
                            {
                              // width: "92%",
                              // marginBottom: "20px",
                            }
                          }
                          className="addProductDetailsBox"
                        >
                          <label htmlFor="selectBranch">
                            <strong>SELECT LOT NUMBER</strong>
                          </label>
                          <select
                            id="selectBranch"
                            // required="required"
                            value={lotNumber}
                            onChange={(e) => setLotNumber(e.target.value)}
                          >
                            <option value={0}>Select Lot Number</option>
                            {allFilteredPurchaseItems &&
                              allFilteredPurchaseItems.map((x) => {
                                return (
                                  <option value={x.LotNumber}>
                                    {x.LotNumber}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <h4
                        style={{ width: "95%", marginTop: "30px" }}
                        id="adminInvoiceAddedCustomerEdit"
                        className="adminInvoiceAddTitles"
                      >
                        Add Items
                      </h4>
                      {/* <div
                          style={{
                            display: "flex",
                            cursor: "pointer",
                            width: "100%",
                            justifyContent: "flex-end",
                          }}
                          className="adminAddBulkStockShowEditButton"
                          onClick={() => showAllInputs()}
                        >
                          <AiOutlineEdit size={"20px"} />
                        </div> */}
                      <div
                        // className="bulkStockAddProductDetailsBox bulkStockAddProductDetailsBoxHalfHeight"
                        className="bulkStockAddProductDetailsBox"
                        id="bulkStockAddProductDetailsBox"
                      >
                        <div className="bulkStockAddProductDetailsItem">
                          <label style={{ margin: 0 }}>Category</label>
                          <select
                            id="category"
                            required="required"
                            value={category}
                            disabled={readOnly}
                            onChange={(e) => {
                              setDiamondShape("");
                              setDiamondClarity("");
                              setDiamondColour("");
                              setDiamondSize("");
                              // setDiamondPieces('');
                              setPacketNumber("");
                              setDiamondSleve("");
                              setDiamondQty("");
                              setDiamondWeight("");
                              setDiamondSellRate("");
                              setDiamondTotalWeight("");
                              setDiamondTotalAmount("");
                              setDiamondCut("");
                              setDiamondSettingType("");
                              setDiamondCertificate("");
                              setDiamondDescription("");
                              if (
                                e.target.value == 11 ||
                                e.target.value == 12 ||
                                e.target.value == 13
                              ) {
                                setShowDiamondBtn(true);
                              } else {
                                setShowDiamondBtn(false);
                              }

                              if (e.target.value == 10) {
                                setIsLooseDiamond(true);
                              } else {
                                setIsLooseDiamond(false);
                              }
                              if (
                                categoriesData &&
                                categoriesData
                                  .filter((x) => x.Id == e.target.value)[0]
                                  ?.CategoryName.toLowerCase() !== "diamonds"
                              ) {
                                setCategory(e.target.value),
                                  setBaseMetal(e.target.value);
                              } else if (
                                categoriesData &&
                                categoriesData.filter(
                                  (x) => x.Id == e.target.value
                                )[0]?.CategoryName !== "loose diamonds"
                              ) {
                                setCategory(e.target.value),
                                  setBaseMetal(0),
                                  setProductType(""),
                                  setCollection(""),
                                  setPurity(""),
                                  setBoxId(""),
                                  setDiamondSize(""),
                                  setDiamondWeight("0"),
                                  setDiamondPurchaseRate("0"),
                                  setDiamondSellRate("0"),
                                  setDiamondClarity(""),
                                  setDiamondColour(""),
                                  setDiamondShape(""),
                                  setDiamondCut(""),
                                  setDiamondSettingType(""),
                                  setDiamondCertificate(""),
                                  setDiamondPieces("0"),
                                  setDiamondPurchaseAmount("0"),
                                  setDiamondTotalAmount("0"),
                                  setDiamondDescription(""),
                                  setStockType("Labelled");
                              } else {
                                setCategory(e.target.value), setBaseMetal(1);
                              }
                              if (e.target.value == 10) {
                                setStockType("Unlabelled");
                              }
                            }}
                          >
                            <option value="">Category</option>
                            {categoriesData.map((x, y) => {
                              return (
                                <option key={y} value={x.Id}>
                                  {x.CategoryName}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        {categoryName && categoryName == "LOOSE DIAMOND" ? (
                          <>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Diamond Shape</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondShape}
                                onChange={(e) => {
                                  setDiamondShape(e.target.value);
                                }}
                                list="diamondAttributesShapeList"
                              />
                              <datalist id="diamondAttributesShapeList">
                                {allDiamondAttributes
                                  .filter(
                                    (x) => x.DiamondAttribute == "DiamondShape"
                                  )
                                  .map((attribute) => (
                                    <option value={attribute.DiamondValue}>
                                      {attribute.DiamondValue}
                                    </option>
                                  ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>
                                Diamond Clarity
                              </label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondClarity}
                                onChange={(e) => {
                                  setDiamondClarity(e.target.value);
                                }}
                                list="diamondAttributesClarityList"
                              />
                              <datalist id="diamondAttributesClarityList">
                                {allDiamondAttributes
                                  .filter(
                                    (x) =>
                                      x.DiamondAttribute == "DiamondClarity"
                                  )
                                  .map((attribute) => (
                                    <option value={attribute.DiamondValue}>
                                      {attribute.DiamondValue}
                                    </option>
                                  ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>
                                Diamond Colour
                              </label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondColour}
                                onChange={(e) => {
                                  setDiamondColour(e.target.value);
                                }}
                                list="diamondAttributesColourList"
                              />
                              <datalist id="diamondAttributesColourList">
                                {allDiamondAttributes
                                  .filter(
                                    (x) => x.DiamondAttribute == "DiamondColour"
                                  )
                                  .map((attribute) => (
                                    <option value={attribute.DiamondValue}>
                                      {attribute.DiamondValue}
                                    </option>
                                  ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Diamond Size</label>
                              <input
                                required="required"
                                type="text"
                                value={diamondSize}
                                onChange={(e) => {
                                  // setDiamondSize(e.target.value);
                                  const selectedDiamondSizeWeightRate =
                                    allDiamondSizeWeightRate.filter(
                                      (x) => x.DiamondSize == e.target.value
                                    );
                                  if (
                                    e.target.value !== "" &&
                                    selectedDiamondSizeWeightRate.length > 0
                                  ) {
                                    setDiamondSize(e.target.value),
                                      setDiamondWeight(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondWeight
                                          ) * parseInt(diamondPieces)
                                        ).toFixed(3)
                                      ),
                                      setDiamondSellRate(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondSellRate
                                          )
                                        ).toFixed(2)
                                      );
                                    setDiamondTotalAmount(
                                      parseFloat(
                                        parseFloat(
                                          selectedDiamondSizeWeightRate[0]
                                            ?.DiamondSellRate
                                        ) * parseInt(diamondPieces)
                                      ).toFixed(2)
                                    ),
                                      setDiamondPurchaseRate(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondPurchaseRate
                                          )
                                        ).toFixed(2)
                                      ),
                                      setDiamondPurchaseAmount(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondPurchaseAmount
                                          ) * parseInt(diamondPieces)
                                        ).toFixed(2)
                                      );
                                    // setDiamondPieces(1);
                                  } else {
                                    setDiamondSize(e.target.value);
                                    setDiamondWeight("0");
                                    setDiamondSellRate("0");
                                    setDiamondTotalAmount("0");
                                    setDiamondPurchaseRate("0");
                                    setDiamondPurchaseAmount("0");
                                    setDiamondPieces("0");
                                  }
                                }}
                                list="diamondSizeList"
                              />
                              <datalist id="diamondSizeList">
                                {allDiamondSizeWeightRate.map((x, index) => (
                                  <option key={index}>{x.DiamondSize}</option>
                                ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label htmlFor="PacketId" style={{ margin: 0 }}>
                                Packet
                              </label>
                              <select
                                id="PacketId"
                                // required="required"
                                value={packetNumber}
                                onChange={(e) =>
                                  setPacketNumber(e.target.value)
                                }
                              >
                                <option value="">Packet</option>
                                {allPacketNumbers.map((x, y) => {
                                  return (
                                    <option key={y} value={parseInt(x.Id)}>
                                      {x.PacketName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            <div className="bulkStockAddProductDetailsItem">
                              <label htmlFor="boxId" style={{ margin: 0 }}>
                                Box
                              </label>
                              <select
                                id="boxId"
                                // required="required"
                                value={boxId}
                                onChange={(e) => setBoxId(e.target.value)}
                              >
                                <option value="">Box</option>
                                {filteredBoxes.map((x, y) => {
                                  return (
                                    <option key={y} value={parseInt(x.Id)}>
                                      {x.BoxName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Sleve</label>
                              <input
                                required="required"
                                type="text"
                                value={diamondSleve}
                                onChange={(e) => {
                                  setDiamondSleve(e.target.value);
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>
                                Diamond Weight
                              </label>
                              <input
                                required="required"
                                type="text"
                                value={diamondWeight}
                                onChange={(e) => {
                                  setDiamondWeight(e.target.value);
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Sell Rate</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondSellRate}
                                onChange={(e) => {
                                  setDiamondSellRate(e.target.value),
                                    setDiamondTotalAmount(
                                      parseFloat(
                                        parseFloat(e.target.value) *
                                          parseInt(diamondPieces)
                                      ).toFixed(2)
                                    );
                                }}

                                // readOnly
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Quantity</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondQty}
                                onChange={(e) => {
                                  setDiamondQty(e.target.value);
                                  setDiamondTotalWeight(
                                    e.target.value * diamondWeight
                                  );
                                  setDiamondTotalAmount(
                                    e.target.value *
                                      diamondWeight *
                                      diamondSellRate
                                  );
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Total Weight</label>
                              <input
                                required="required"
                                type="text"
                                value={diamondTotalWeight}
                                onChange={(e) => {
                                  setDiamondTotalWeight(e.target.value);
                                }}
                                readOnly
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Total Amount</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondTotalAmount}
                                onChange={(e) => {
                                  setDiamondTotalAmount(e.target.value);
                                  setDiamondSellRate(
                                    parseFloat(
                                      parseFloat(e.target.value) /
                                        parseInt(diamondPieces)
                                    ).toFixed(2)
                                  );
                                }}
                                readOnly
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Diamond Cut</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondCut}
                                onChange={(e) => {
                                  setDiamondCut(e.target.value);
                                }}
                                list="diamondAttributesCutList"
                              />
                              <datalist id="diamondAttributesCutList">
                                {allDiamondAttributes
                                  .filter(
                                    (x) => x.DiamondAttribute == "DiamondCut"
                                  )
                                  .map((attribute) => (
                                    <option value={attribute.DiamondValue}>
                                      {attribute.DiamondValue}
                                    </option>
                                  ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>SettingType</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondSettingType}
                                onChange={(e) => {
                                  setDiamondSettingType(e.target.value);
                                }}
                                list="diamondAttributesSettingTypeList"
                              />
                              <datalist id="diamondAttributesSettingTypeList">
                                {allDiamondAttributes
                                  .filter(
                                    (x) =>
                                      x.DiamondAttribute == "DiamondSettingType"
                                  )
                                  .map((attribute) => (
                                    <option value={attribute.DiamondValue}>
                                      {attribute.DiamondValue}
                                    </option>
                                  ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Certificate</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondCertificate}
                                onChange={(e) => {
                                  setDiamondCertificate(e.target.value);
                                }}
                              />
                            </div>
                            {/*<div className="bulkStockAddProductDetailsItem">*/}
                            {/*  <label style={{ margin: 0 }}>D.Pieces</label>*/}
                            {/*  <input*/}
                            {/*    required="required"*/}
                            {/*    type="number"*/}
                            {/*    value={diamondPieces}*/}
                            {/*    onChange={(e) => {*/}
                            {/*      const selectedDiamondSizeWeightRate =*/}
                            {/*        allDiamondSizeWeightRate.filter(*/}
                            {/*          (x) => x.DiamondSize == diamondSize*/}
                            {/*        );*/}
                            {/*      if (e.target.value !== "") {*/}
                            {/*        setDiamondPieces(e.target.value),*/}
                            {/*          setDiamondWeight(*/}
                            {/*            parseFloat(*/}
                            {/*              parseFloat(*/}
                            {/*                diamondWeight !== ""*/}
                            {/*                  ? diamondWeight*/}
                            {/*                  : 0*/}
                            {/*              ) * parseInt(e.target.value)*/}
                            {/*            ).toFixed(3)*/}
                            {/*          ),*/}
                            {/*          setDiamondTotalAmount(*/}
                            {/*            parseFloat(*/}
                            {/*              parseFloat(diamondSellRate) **/}
                            {/*                parseInt(e.target.value)*/}
                            {/*            ).toFixed(2)*/}
                            {/*          ),*/}
                            {/*          setDiamondPurchaseAmount(*/}
                            {/*            parseFloat(*/}
                            {/*              parseFloat(diamondPurchaseRate) **/}
                            {/*                parseInt(e.target.value)*/}
                            {/*            ).toFixed(2)*/}
                            {/*          );*/}
                            {/*      } else {*/}
                            {/*        setDiamondPieces(e.target.value),*/}
                            {/*          setDiamondWeight(*/}
                            {/*            parseFloat(*/}
                            {/*              parseFloat(*/}
                            {/*                selectedDiamondSizeWeightRate[0]*/}
                            {/*                  ?.DiamondWeight*/}
                            {/*              )*/}
                            {/*            ).toFixed(3)*/}
                            {/*          ),*/}
                            {/*          setDiamondSellRate(*/}
                            {/*            parseFloat(*/}
                            {/*              parseFloat(*/}
                            {/*                selectedDiamondSizeWeightRate[0]*/}
                            {/*                  ?.DiamondSellRate*/}
                            {/*              )*/}
                            {/*            ).toFixed(2)*/}
                            {/*          );*/}
                            {/*        setDiamondTotalAmount(*/}
                            {/*          parseFloat(*/}
                            {/*            parseFloat(*/}
                            {/*              selectedDiamondSizeWeightRate[0]*/}
                            {/*                ?.DiamondSellRate*/}
                            {/*            ) * parseInt(e.target.value)*/}
                            {/*          ).toFixed(2)*/}
                            {/*        ),*/}
                            {/*          setDiamondPurchaseRate(*/}
                            {/*            parseFloat(*/}
                            {/*              parseFloat(*/}
                            {/*                selectedDiamondSizeWeightRate[0]*/}
                            {/*                  ?.DiamondPurchaseRate*/}
                            {/*              )*/}
                            {/*            ).toFixed(2)*/}
                            {/*          ),*/}
                            {/*          setDiamondPurchaseAmount(*/}
                            {/*            parseFloat(*/}
                            {/*              parseFloat(*/}
                            {/*                selectedDiamondSizeWeightRate[0]*/}
                            {/*                  ?.DiamondPurchaseAmount*/}
                            {/*              ) * parseInt(e.target.value)*/}
                            {/*            ).toFixed(2)*/}
                            {/*          );*/}
                            {/*      }*/}
                            {/*    }}*/}
                            {/*  />*/}
                            {/*</div>*/}

                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Description</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondDescription}
                                onChange={(e) => {
                                  setDiamondDescription(e.target.value);
                                }}
                              />
                            </div>
                            {/*{addedProducts.length <= 0  ? (*/}
                            <div
                              style={{
                                justifyContent: "left",
                                marginTop: "20px",
                              }}
                              className="bulkStockAddProductDetailsItem"
                            >
                              {/* <label>Add Product</label> */}
                              <button
                                type="submit"
                                style={{
                                  width: "100px",
                                  marginRight: "10px",
                                }}
                              >
                                <IoIosAddCircleOutline
                                  style={{ marginRight: "10px" }}
                                  size={"20px"}
                                />
                                Add
                              </button>

                              <button
                                id="bulkStockAddProductImportButton"
                                type="button"
                                onClick={() =>
                                  setShowImportPopup(!showImportPopup)
                                }
                                style={{ width: "100px", marginInline: "0" }}
                              >
                                <CiImport
                                  style={{ marginRight: "10px" }}
                                  size={"20px"}
                                />
                                Import
                              </button>
                              {/* </div> */}
                            </div>
                            {/*) : null}*/}
                          </>
                        ) : (
                          <>
                            {category &&
                            categoryName.toLowerCase() == "diamonds" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>Metal</label>
                                <select
                                  id="baseMetal"
                                  required="required"
                                  value={baseMetal}
                                  onChange={(e) => setBaseMetal(e.target.value)}
                                >
                                  <option value="">Select Base Metal</option>
                                  {categoriesData.map((x, y) => {
                                    return (
                                      <option key={y} value={x.Id}>
                                        {x.CategoryName}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            ) : null}
                            <div className="bulkStockAddProductDetailsItem">
                              <label
                                htmlFor="productTypeId"
                                style={{ margin: 0 }}
                              >
                                Product
                              </label>

                              <select
                                id="productTypeId"
                                required="required"
                                value={productType}
                                onChange={(e) => setProductType(e.target.value)}
                              >
                                <option value="">Product Type</option>
                                {filteredProducts.map((x, y) => {
                                  return (
                                    <option
                                      key={y}
                                      value={`${parseInt(x.Id)},${
                                        x.ProductName
                                      }`}
                                    >
                                      {x.ProductName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Design</label>
                              <select
                                id="collection"
                                required="required"
                                value={collection}
                                onChange={(e) => setCollection(e.target.value)}
                              >
                                <option value="">Design</option>
                                {filteredCollection.map((x, y) => {
                                  return (
                                    <option
                                      key={y}
                                      value={`${parseInt(x.Id)},${
                                        x.DesignName
                                      }`}
                                    >
                                      {x.DesignName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Purity</label>
                              <select
                                id="purity"
                                required="required"
                                value={purity}
                                onChange={(e) => setPurity(e.target.value)}
                              >
                                <option value="">Purity</option>

                                {filteredPurity.map((x, y) => {
                                  return (
                                    <option
                                      key={y}
                                      value={`${parseInt(x.Id)},${
                                        x.PurityName
                                      }`}
                                    >
                                      {x.PurityName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            <div className="bulkStockAddProductDetailsItem">
                              <label htmlFor="PacketId" style={{ margin: 0 }}>
                                Packet
                              </label>
                              <select
                                id="PacketId"
                                // required="required"
                                value={packetNumber}
                                onChange={(e) =>
                                  setPacketNumber(e.target.value)
                                }
                              >
                                <option value="">Packet</option>
                                {allPacketNumbers.map((x, y) => {
                                  return (
                                    <option key={y} value={parseInt(x.Id)}>
                                      {x.PacketName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label htmlFor="boxId" style={{ margin: 0 }}>
                                  Box
                                </label>
                                <select
                                  id="boxId"
                                  // required="required"
                                  value={boxId}
                                  onChange={(e) => setBoxId(e.target.value)}
                                >
                                  <option value="">Box</option>
                                  {filteredBoxes.map((x, y) => {
                                    return (
                                      <option key={y} value={parseInt(x.Id)}>
                                        {x.BoxName}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            ) : null}

                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Quantity</label>
                              <input
                                required="required"
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                  setQuantity(e.target.value);
                                }}
                              />
                            </div>
                            {/* <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>P Name</label>
                              <input
                                type="text"
                                required="required"
                                value={productName}
                                onChange={(e) => {
                                  setProductName(e.target.value);
                                }}
                              />
                            </div> */}

                            <div className="bulkStockAddProductDetailsItem">
                              <label htmlFor="grosswt" style={{ margin: 0 }}>
                                G.Wt
                              </label>
                              {/* <select
                        id="category"
                        required="required"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">G.Wt</option>
                      </select> */}
                              <input
                                type="number"
                                id="grosswt"
                                required="required"
                                value={grosswt}
                                onChange={(e) => {
                                  setGrosswt(e.target.value),
                                    e.target.value - parseFloat(stoneWeight) > 0
                                      ? setNetWt(
                                          parseFloat(e.target.value) -
                                            parseFloat(clipWeight) -
                                            parseFloat(stoneWeight)
                                        )
                                      : (setNetWt(0),
                                        setStoneWeight(0),
                                        setClipWeight(0),
                                        setSelectedSkuStones({ Id: 0 }));
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Select Stone</label>
                              <select
                                // required="required"
                                value={
                                  selectedSkuStones ? selectedSkuStones.Id : ""
                                }
                                onChange={handleSelectedSkuStoneChange}
                              >
                                {/* Default option with an empty value */}
                                <option value="">Select An Stone</option>
                                {allSelectedSkuStones.map((stone, index) => (
                                  <option key={index} value={stone.Id}>
                                    {stone.StoneMainName}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>
                                Select Weights
                              </label>
                              <select
                                value={weights ? weights : ""}
                                onChange={handleSelectedweights}
                              >
                                <option value="">Select a weight</option>
                                {selectedweights.map((weight, index) => (
                                  <option key={index} value={weight}>
                                    {weight}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label
                                htmlFor="stoneWeight"
                                style={{ margin: 0 }}
                              >
                                Clip.Wt
                              </label>

                              <input
                                type="number"
                                id="clipWeight"
                                value={clipWeight}
                                onChange={(e) => {
                                  // e.target.value <= parseFloat(grosswt)
                                  // ?
                                  setClipWeight(e.target.value),
                                    setNetWt(
                                      (
                                        parseFloat(grosswt) -
                                        parseFloat(stoneWeight) -
                                        parseFloat(e.target.value)
                                      ).toFixed(3)
                                    );
                                  // : null;
                                  // setGrosswt(
                                  //   parseFloat(netWt) + parseFloat(e.target.value)
                                  // );
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label
                                htmlFor="stoneWeight"
                                style={{ margin: 0 }}
                              >
                                St.Wt
                              </label>

                              <input
                                type="number"
                                id="stoneWeight"
                                value={stoneWeight}
                                onChange={(e) => {
                                  e.target.value <= parseFloat(grosswt)
                                    ? (setStoneWeight(e.target.value),
                                      setNetWt(
                                        (
                                          parseFloat(grosswt) -
                                          parseFloat(clipWeight) -
                                          parseFloat(e.target.value)
                                        ).toFixed(3)
                                      ))
                                    : null;
                                  // setGrosswt(
                                  //   parseFloat(netWt) + parseFloat(e.target.value)
                                  // );
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label htmlFor="netWt" style={{ margin: 0 }}>
                                Net.Wt
                              </label>
                              {/* <select
                          id="category"
                          required="required"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">Net.Wt</option>
                        </select> */}
                              <input
                                type="number"
                                id="netWt"
                                value={netWt}
                                readOnly
                                // onChange={(e) => {
                                //   setNetWt(e.target.value),
                                //     setGrosswt(
                                //       parseFloat(e.target.value) +
                                //         parseFloat(stoneWeight)
                                //     );
                                // }}
                              />
                            </div>
                            {stockType !== "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>Fine%</label>
                                <input
                                  type="number"
                                  value={finePerc}
                                  onChange={(e) => {
                                    setFinePerc(e.target.value),
                                      setFineWastagePerc(e.target.value);
                                  }}
                                />
                              </div>
                            ) : null}
                            {stockType !== "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>Wastage%</label>
                                <input
                                  type="number"
                                  value={wastagePerc}
                                  onChange={(e) => {
                                    setWastagePerc(e.target.value),
                                      setFineWastagePerc(
                                        parseFloat(finePerc) +
                                          parseFloat(e.target.value)
                                      );
                                  }}
                                />
                              </div>
                            ) : null}
                            {stockType !== "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>
                                  Fine+Wastage%
                                </label>
                                <input
                                  type="number"
                                  value={fineWastagePerc}
                                  onChange={(e) => {
                                    setFineWastagePerc(e.target.value);
                                  }}
                                />
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>MRP</label>
                                <input
                                  type="number"
                                  value={mrp}
                                  onChange={(e) => {
                                    setMRP(e.target.value);
                                  }}
                                />
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label htmlFor="name" style={{ margin: 0 }}>
                                  P.Name
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  value={productName}
                                  onChange={(e) =>
                                    setProductName(e.target.value)
                                  }
                                />
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label
                                  htmlFor="description"
                                  style={{ margin: 0 }}
                                >
                                  P.Description
                                </label>
                                <input
                                  style={{ width: "2fr" }}
                                  type="text"
                                  id="description"
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                />
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>Gender</label>
                                <select
                                  value={gender}
                                  onChange={(e) => setGender(e.target.value)}
                                >
                                  <option value="">Select an option</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Unisex">Unisex</option>
                                  <option value="Kids">Kids</option>
                                </select>
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label htmlFor="name" style={{ margin: 0 }}>
                                  Making-Percentage
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  value={making_Percentage}
                                  onChange={(e) =>
                                    setMaking_Percentage(e.target.value)
                                  }
                                />
                              </div>
                            ) : null}
                            {/* {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <button
                                  id="bulkStockAddProductImportButton"
                                  style={{
                                    width: "100px",
                                    marginRight: "20px",
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={() => setShowAddStoneBox(true)}
                                  type="button"
                                >
                                  <IoIosAddCircleOutline
                                    style={{ marginRight: "5px" }}
                                    size={"20px"}
                                  />
                                  Stone-{newStonesList.length}
                                </button>
                                <button
                                  id="bulkStockAddProductImportButton"
                                  style={{ width: "100px" }}
                                  onClick={() => setShowAddStoneBox(true)}
                                  type="button"
                                >
                                  {" "}
                                  <IoIosAddCircleOutline
                                    style={{ marginRight: "5px" }}
                                    size={"20px"}
                                  />
                                  Diamond
                                </button>

                              </div>
                            ) : null} */}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0, cursor: "pointer" }}>
                                  {/* Images {`${selectedFiles.length}`} */}
                                  <BsImages
                                    className="bulkStockAddProductAddImagesIcon"
                                    style={{ marginInline: "1rem" }}
                                    size={"2.5rem"}
                                  />
                                  <input
                                    id="images"
                                    style={{ display: "none" }}
                                    type="file"
                                    multiple
                                    onChange={handleFileInputChange}
                                  />
                                </label>
                                <label>
                                  {" "}
                                  Images {`${selectedFiles.length}`}
                                </label>
                              </div>
                            ) : null}

                            {addedProducts.length <= 0 ? (
                              <div
                                style={{
                                  justifyContent: "left",
                                }}
                                className="bulkStockAddProductDetailsItem"
                              >
                                {/* <label>Add Product</label> */}
                                <button
                                  type="submit"
                                  style={{
                                    width: "100px",
                                    marginRight: "10px",
                                  }}
                                >
                                  <IoIosAddCircleOutline
                                    style={{ marginRight: "10px" }}
                                    size={"20px"}
                                  />
                                  Add
                                </button>

                                <button
                                  id="bulkStockAddProductImportButton"
                                  type="button"
                                  onClick={() =>
                                    setShowImportPopup(!showImportPopup)
                                  }
                                  style={{ width: "100px", marginInline: "0" }}
                                >
                                  <CiImport
                                    style={{ marginRight: "10px" }}
                                    size={"20px"}
                                  />
                                  Import
                                </button>
                                {/* </div> */}
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                    </form>
                    {showImportPopup && (
                      <div className="popup">
                        <div className="popup-inner">
                          <div className="adminAddProductsPopupInnerBox">
                            <input
                              onChange={(e) => setImportFile(e.target.files[0])} // Adjusted to handle file
                              type="file"
                              accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv" // Now accepts CSV files as well
                            />
                            <button
                              id="bulkStockAddProductImportButton"
                              onClick={() =>
                                importFile && importFile instanceof File
                                  ? uploadExcelFile()
                                  : alert("Please Select a file")
                              }
                              className="close-btn"
                            >
                              Import
                            </button>
                            <button
                              onClick={() => setShowImportPopup(false)}
                              className="bulkProductAddDeleteButton close-btn"
                            >
                              Close
                            </button>
                          </div>
                          {/* <p>This is a popup screen!</p> */}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    style={{ height: "50vh", marginBottom: "1rem" }}
                    // className={loadingAdd == true ? "loading" : "none"}
                    className="loading"
                  >
                    <InfinitySpin
                      // className={loadingAdd == true ? "loading" : "none"}
                      className="loading"
                      width="150"
                      color="#4fa94d"
                    />
                  </div>
                )}
                {/* <div>
            <h1>Table Component</h1>
            <table style={{ margin: "3rem" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>P Name</th>
                  <th>Gross Wt</th>
                  <th>Stone Wt</th>
                  <th>Net Wt</th>
                </tr>
              </thead>
               <tbody>{renderTableRows()}</tbody>
            </table>
          </div> */}
                <div
                  style={{ height: "100px", marginBottom: "1rem" }}
                  className={loading === true ? "loading" : "none"}
                >
                  <InfinitySpin
                    className={loading === true ? "loading" : "none"}
                    width="150"
                    color="#4fa94d"
                  />
                </div>
                <div
                  id="adminAddBulkStockAddedTitleStatement"
                  className="adminAddBulkStockShowEditBox"
                >
                  <h3
                    style={{
                      margin: "0px",
                      padding: "0px",
                    }}
                    className="adminAddBulkStockAddedTitle"
                  >
                    Added Products
                  </h3>
                  <div className="adminAddBulkStockShowEditButton">
                    <AiOutlineEdit
                      onClick={() => setShowAllFields(!showAllFields)}
                      size={"20px"}
                    />
                  </div>
                </div>
                {console.log(categoryName)}
                <div className="adminAddBulkStockAddedProductsOuterBox">
                  {/* <form onSubmit={updatedetailsBox}> */}
                  {showAllFields ? (
                    <div
                      className="bulkProductAddingTableMain"
                      style={{ margin: "1.5rem", overflowX: "auto" }}
                    >
                      <table style={{ width: "100%" }}>
                        {stockType === "Labelled" ? (
                          <thead>
                            <tr style={{ whiteSpace: "nowrap" }}>
                              <th>Product Type</th>
                              <th>Collection</th>
                              <th>Purity</th>
                              <th>Label</th>
                              <th>Barcode Number</th>
                              <th>TID</th>
                              <th>GrossWt</th>
                              <th>ClipWt</th>
                              <th>StoneWt</th>
                              <th>NetWt</th>
                              <th>Size</th>
                              <th>Pieces</th>
                              <th>Description</th>
                              <th>Product name</th>
                              <th>HUID Code</th>
                              <th>Hallmark Amount</th>
                              <th>Stone Amount</th>
                              <th>Making Per Gram</th>
                              <th>Making Percentage</th>
                              <th>Fixed Making</th>
                              <th>Fixed Wastage</th>
                              <th>MRP</th>
                              <th>Add Stone</th>
                              {/*{addedProducts.length > 0 && addedProducts[0].CategoryId === 5 && (*/}
                              <th>Add Diamond</th>
                              {/*)}*/}
                              <th>Occassion</th>
                              <th>Gender</th>
                              <th>Online Status</th>
                              <th>Delete Product</th>
                            </tr>
                          </thead>
                        ) : (
                          <thead>
                            <tr style={{ whiteSpace: "nowrap" }}>
                              {isLooseDiamond ? (
                                <>
                                  <th>Diamond Shape</th>
                                  <th>Diamond Clarity</th>
                                  <th>Diamond Colour</th>
                                  <th>Diamond Cut</th>
                                  <th>Diamond Size</th>
                                  <th>Sieve</th>
                                  <th>Diamond Weight</th>
                                  <th>Sell rate</th>
                                  <th>Quantity</th>
                                  <th>Packet</th>
                                  <th>Total Weight</th>
                                  <th>Total Amount</th>
                                  <th>Setting Type</th>
                                  <th>Certificate</th>
                                  <th>Description</th>
                                </>
                              ) : (
                                <>
                                  <th>Metal</th>
                                  <th>Product Type</th>
                                  <th>Collection</th>
                                  <th>Purity</th>
                                  <th>Quantity</th>
                                  <th>GrossWt</th>
                                  <th>StoneWt</th>
                                  <th>NetWt</th>
                                  <th>Making Per Gram</th>
                                  <th>Making Percentage</th>
                                  <th>Fixed Making</th>
                                  <th>Fixed Wastage</th>
                                  <th>Pieces</th>
                                  <th>Size</th>
                                  <th>Description</th>
                                  <th>Occasion</th>
                                  <th>Gender</th>
                                  <th>Featured</th>
                                  <th>Online Status</th>
                                </>
                              )}
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {addedProducts?.map((x, index) => (
                            // <tr key={x.Customer_id}>

                            <tr key={index}>
                              {isLooseDiamond ? (
                                <>
                                  <td>
                                    <input
                                      id="DiamondShape"
                                      type="text"
                                      placeholder={x.DiamondShape}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "DiamondShape"
                                        )
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="DiamondClarity"
                                      type="text"
                                      placeholder={x.DiamondClarity}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "DiamondClarity"
                                        )
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="DiamondColour"
                                      type="text"
                                      placeholder={x.DiamondColour}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "DiamondColour"
                                        )
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="DiamondCut"
                                      type="text"
                                      placeholder={x.DiamondCut}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "DiamondCut"
                                        )
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="DiamondSize"
                                      type="text"
                                      placeholder={x.DiamondSize}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "DiamondSize"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="Sieve"
                                      type="text"
                                      placeholder={x.Sieve}
                                      onChange={(e) =>
                                        handleInputChange(e, index, "Sieve")
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="DiamondWeight"
                                      type="text"
                                      placeholder={x.DiamondWeight}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "DiamondWeight"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="DiamondSellRate"
                                      type="text"
                                      placeholder={x.DiamondSellRate}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "DiamondSellRate"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="Quantity"
                                      type="text"
                                      placeholder={x.Quantity}
                                      onChange={(e) =>
                                        handleInputChange(e, index, "Quantity")
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="PacketId"
                                      type="text"
                                      placeholder={x.PacketId}
                                      onChange={(e) =>
                                        handleInputChange(e, index, "PacketId")
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="TotalDiamondWeight"
                                      type="text"
                                      placeholder={x.TotalDiamondWeight}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "TotalDiamondWeight"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="TotalDiamondAmount"
                                      type="text"
                                      placeholder={x.TotalDiamondAmount}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "TotalDiamondAmount"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="DiamondSettingType"
                                      type="text"
                                      placeholder={x.DiamondSettingType}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "DiamondSettingType"
                                        )
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="DiamondCertificate"
                                      type="text"
                                      placeholder={x.DiamondCertificate}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "DiamondCertificate"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      id="DiamondDescription"
                                      type="text"
                                      placeholder={x.DiamondDescription}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "DiamondDescription"
                                        )
                                      }
                                    />
                                  </td>
                                </>
                              ) : (
                                <>
                                  {stockType !== "Labelled" ? (
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={
                                          categoriesData.find(
                                            (item) => item.Id == x.CategoryId
                                          ).CategoryName
                                        }
                                        // placeholder={x.CategoryId}
                                        readOnly
                                        // value={x.product_type}
                                        // onChange={(e) => handleInputChange(e, x.id, "Product_type")}
                                      />
                                    </td>
                                  ) : null}
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={
                                        x.ProductName
                                        // x.ProductId
                                        // ? productTypeData.find(
                                        //     (item) => item.Id == x.ProductId
                                        //   ).ProductName
                                        // : ""
                                      }
                                      readOnly
                                      // value={x.product_type}
                                      // onChange={(e) => handleInputChange(e, x.id, "Product_type")}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={
                                        x.DesignName
                                        // x.DesignId
                                        //   ? collectionTypeData.find(
                                        //       (item) => item.Id == x.DesignId
                                        //     )?.DesignName
                                        //   : ""
                                      }
                                      // placeholder={x.collection}
                                      // value={x.collection}
                                      readOnly
                                      // onChange={(e) => handleInputChange(e, x.id, "collection")}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      // placeholder={x.purity}
                                      // value={x.purity}
                                      placeholder={
                                        x.PurityName
                                        // ? purityData?.find(
                                        //     (item) => item.Id == x.PurityId
                                        //   ).PurityName
                                        // : ""
                                      }
                                      readOnly
                                      // onChange={() => {
                                      //   setPurity(x.purity);
                                      // }}
                                    />
                                  </td>

                                  {stockType !== "Labelled" ? (
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.Quantity}
                                        value={x.Quantity}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            "Quantity"
                                          )
                                        }
                                        // onChange={() => {
                                        //   setPurity(x.purity);
                                        // }}
                                      />
                                    </td>
                                  ) : null}
                                  {stockType === "Labelled" ? (
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.ItemCode}
                                        value={x.ItemCode}
                                        //   onChange={() => {
                                        //     setItemCode(x.itemCode);
                                        //   }}
                                      />
                                    </td>
                                  ) : null}
                                  {stockType === "Labelled" ? (
                                    <td>
                                      <input
                                        id="RFIDCode"
                                        type="text"
                                        placeholder={x.RFIDCode}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            "RFIDCode"
                                          )
                                        }
                                        style={{
                                          color: x.hasError ? "red" : "black",
                                        }}
                                        //     setItemCode(x.itemCode);
                                        //   }}
                                      />
                                    </td>
                                  ) : null}
                                  {stockType === "Labelled" ? (
                                    <td>
                                      <input
                                        style={{ cursor: "not-allowed" }}
                                        type="text"
                                        placeholder={x.TIDNumber}
                                        value={x.TIDNumber}
                                        readOnly
                                      />
                                    </td>
                                  ) : null}

                                  {stockType == "Labelled" ? (
                                    <td>
                                      <input
                                        type="number"
                                        placeholder={x.GrossWt}
                                        value={x.GrossWt}
                                        onChange={(e) =>
                                          handleInputChange(e, index, "GrossWt")
                                        }
                                      />
                                    </td>
                                  ) : (
                                    <td>
                                      <input
                                        type="number"
                                        placeholder={x.TotalGrossWt}
                                        value={x.TotalGrossWt}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            "TotalGrossWt"
                                          )
                                        }
                                      />
                                    </td>
                                  )}
                                  {stockType == "Labelled" ? (
                                    <td>
                                      <input
                                        type="number"
                                        placeholder={x.ClipWeight}
                                        value={x.ClipWeight}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            "ClipWeight"
                                          )
                                        }
                                      />
                                    </td>
                                  ) : null}
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.TotalStoneWeight}
                                      value={x.TotalStoneWeight}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "TotalStoneWeight"
                                        )
                                      }
                                    />
                                  </td>

                                  {/*{stockType === "Labelled" ? (*/}
                                  {/*    <td>*/}
                                  {/*        <button*/}
                                  {/*            onClick={() => {*/}
                                  {/*                setAddedProducts((prevProducts) =>*/}
                                  {/*                    prevProducts.map((item, i) =>*/}
                                  {/*                        i === index*/}
                                  {/*                            ? {*/}
                                  {/*                                ...item,*/}
                                  {/*                                Stones: [*/}
                                  {/*                                    ...item.Stones,*/}
                                  {/*                                    addStone,*/}
                                  {/*                                ],*/}
                                  {/*                            }*/}
                                  {/*                            : item*/}
                                  {/*                    )*/}
                                  {/*                ),*/}
                                  {/*                    setSelectedProductIndex(index);*/}
                                  {/*                setShowAddStoneBox(true);*/}
                                  {/*            }}*/}
                                  {/*        >*/}
                                  {/*            Stone{x.Stones.length}*/}
                                  {/*        </button>*/}
                                  {/*    </td>*/}
                                  {/*) : null}*/}

                                  {stockType == "Labelled" ? (
                                    <td>
                                      <input
                                        type="number"
                                        placeholder={x.NetWt}
                                        value={x.NetWt}
                                        // onChange={(e) =>
                                        //   handleInputChange(e, x.id, "netWt")
                                        // }
                                        readOnly
                                      />
                                    </td>
                                  ) : (
                                    <td>
                                      <input
                                        type="number"
                                        placeholder={x.TotalNetWt}
                                        value={x.TotalNetWt}
                                        // onChange={(e) =>
                                        //   handleInputChange(e, x.id, "netWt")
                                        // }
                                        readOnly
                                      />
                                    </td>
                                  )}
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.Size}
                                      value={x.Size}
                                      onChange={(e) =>
                                        handleInputChange(e, index, "Size")
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      value={x.Pieces}
                                      onChange={(e) =>
                                        handleInputChange(e, index, "Pieces")
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.Description}
                                      value={x.Description}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "Description"
                                        )
                                      }
                                    />
                                  </td>
                                  {stockType === "Labelled" ? (
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.ProductTitle}
                                        value={x.ProductTitle}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            "ProductTitle"
                                          )
                                        }
                                      />
                                    </td>
                                  ) : null}
                                  {stockType === "Labelled" ? (
                                    <td>
                                      <input
                                        type="text"
                                        maxLength={6}
                                        placeholder={x.HUIDCode}
                                        value={x.HUIDCode}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            "HUIDCode"
                                          )
                                        }
                                      />
                                    </td>
                                  ) : null}
                                  {stockType === "Labelled" ? (
                                    <td>
                                      <input
                                        type="number"
                                        placeholder={x.HallmarkAmount}
                                        value={x.HallmarkAmount}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            "HallmarkAmount"
                                          )
                                        }
                                      />
                                    </td>
                                  ) : null}
                                  {stockType === "Labelled" ? (
                                    <td>
                                      <input
                                        type="number"
                                        placeholder={x.TotalStoneAmount}
                                        value={x.TotalStoneAmount}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            "TotalStoneAmount"
                                          )
                                        }
                                      />
                                    </td>
                                  ) : null}
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.MakingPerGram}
                                      value={x.MakingPerGram}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "MakingPerGram"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.MakingPercentage}
                                      value={x.MakingPercentage}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "MakingPercentage"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.MakingFixedAmt}
                                      value={x.MakingFixedAmt}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "MakingFixedAmt"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.MakingFixedWastage}
                                      value={x.MakingFixedWastage}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "MakingFixedWastage"
                                        )
                                      }
                                    />
                                  </td>
                                  {/* <td>
                                  <input
                                    type="number"
                                    placeholder={x.pieces}
                                    onChange={(e) =>
                                      handleInputChange(e, x.id, "pieces")
                                    }
                                  />
                                </td> */}

                                  {stockType === "Labelled" ? (
                                    <td>
                                      <input
                                        type="number"
                                        placeholder={x.MRP}
                                        value={x.MRP}
                                        onChange={(e) =>
                                          handleInputChange(e, index, "MRP")
                                        }
                                      />
                                    </td>
                                  ) : null}
                                  {stockType === "Labelled" ? (
                                    <td>
                                      <button
                                        onClick={() => {
                                          setAddedProducts((prevProducts) =>
                                            prevProducts.map((item, i) =>
                                              i === index
                                                ? {
                                                    ...item,
                                                    Stones: [
                                                      ...item.Stones,
                                                      addStone,
                                                    ],
                                                  }
                                                : item
                                            )
                                          ),
                                            setShowAddStoneBox(true);
                                          setSelectedProductIndex(index);
                                        }}
                                      >
                                        Stone{x.Stones.length}
                                      </button>
                                    </td>
                                  ) : null}
                                  <td>
                                    <button
                                      style={{ display: "flex" }}
                                      onClick={() => {
                                        // setAddedProducts((prevProducts) =>
                                        //     prevProducts.map((product, index) =>
                                        //         index === selectedProductIndex
                                        //             ? {...product, Diamonds: [...product.Diamonds, {}]}
                                        //             : product
                                        //     )
                                        // );
                                        if (x.Diamonds.length === 0) {
                                          setAddedProducts((prevProducts) =>
                                            prevProducts.map((item, i) =>
                                              i === index
                                                ? {
                                                    ...item,
                                                    Diamonds: [
                                                      ...item.Diamonds,
                                                      addDiamond,
                                                    ],
                                                  }
                                                : item
                                            )
                                          );
                                        }
                                        setShowAddDiamondBox(true);
                                        setSelectedProductIndex(index);
                                      }}
                                    >
                                      {/*<IoMdAddCircleOutline*/}
                                      {/*    style={{*/}
                                      {/*        marginRight: "5px",*/}
                                      {/*    }}*/}
                                      {/*    size={"18px"}*/}
                                      {/*/>*/}
                                      DIAMOND-{x.Diamonds.length}
                                    </button>
                                  </td>
                                  {stockType === "Labelled" &&
                                  addedProducts.length > 0 &&
                                  addedProducts[0].CategoryId == 5 ? (
                                    <td>
                                      <button
                                        onClick={() => {
                                          setAddedProducts((prevProducts) =>
                                            prevProducts.map((item, i) =>
                                              i === index
                                                ? {
                                                    ...item,
                                                    Diamonds: [
                                                      ...item.Diamonds,
                                                      addDiamond,
                                                    ],
                                                  }
                                                : item
                                            )
                                          ),
                                            setShowAddDiamondBox(true);
                                          setSelectedProductIndex(index);
                                        }}
                                      >
                                        Diamond-{x.Diamonds.length}
                                      </button>
                                    </td>
                                  ) : null}
                                  {/* {stockType === "Labelled" ? (
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.hallmark}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "hallmark")
                                      }
                                    />
                                  </td>
                                ) : null} */}

                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.OccassionName}
                                      value={x.OccassionName}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          index,
                                          "OccassionName"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.Gender}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "Gender")
                                      }
                                    />
                                  </td>
                                  {stockType !== "Labelled" ? (
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.Status}
                                        value={x.Status}
                                        readOnly
                                      />
                                    </td>
                                  ) : null}
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.Featured}
                                      onChange={(e) =>
                                        handleInputChange(e, index, "Featured")
                                      }
                                    />
                                  </td>
                                  {stockType === "Labelled" ? (
                                    <td>
                                      <input
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                          color: "red",
                                        }}
                                        type="checkbox"
                                        checked={checkedProducts.includes(x.Id)}
                                        onChange={() =>
                                          handleCheckboxChange(x.Id, x.ItemCode)
                                        }
                                      />
                                    </td>
                                  ) : null}

                                  {/* <td>
                                  <button
                                    type="submit"
                                    onClick={() => {
                                      setItemCode(x.itemCode);
                                      setProductInEditImages(x.images);
                                      setProductInEdit(x);
                                      {
                                        console.log(x.id);
                                      }
                                      updatedetailsBox(x.id);
                                    }}
                                  >
                                    Update
                                  </button>
                                </td> */}
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div>
                      <div
                        className="bulkProductAddingTableMain bulkProductAddingTableMain2"
                        style={{ margin: "1.5rem", overflowX: "auto" }}
                      >
                        <table>
                          <thead>
                            <tr>
                              {isLooseDiamond ? (
                                <>
                                  <th>Diamond Shape</th>
                                  <th>Diamond Clarity</th>
                                  <th>Diamond Colour</th>
                                  <th>Diamond Cut</th>
                                  <th>Diamond Size</th>
                                  <th>Sleve</th>
                                  <th>Diamond Weight</th>
                                  <th>Sell rate</th>
                                  <th>Quantity</th>
                                </>
                              ) : (
                                <>
                                  {stockType !== "Labelled" && <th>Metal</th>}
                                  <th>Collection</th>
                                  <th>Purity</th>
                                  {stockType === "Labelled" && <th>Label</th>}
                                  <th>GrossWt</th>
                                  {stockType === "Labelled" && <th>ClipWt</th>}
                                  <th>StoneWt</th>
                                  <th>Stones</th>
                                  {showDiamondBtn && <th>Diamonds</th>}
                                  <th>NetWt</th>
                                  {stockType === "Labelled" && (
                                    <th>Making Per Gram</th>
                                  )}
                                  {stockType === "Labelled" && (
                                    <th>Making Percentage</th>
                                  )}
                                  {stockType === "Labelled" && (
                                    <th>Fixed Making</th>
                                  )}
                                  {stockType !== "Labelled" && (
                                    <th>Quantity</th>
                                  )}
                                  {stockType !== "Labelled" && <th>Pieces</th>}
                                </>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {addedProducts?.map((x, index) => (
                              <tr key={index}>
                                {isLooseDiamond ? (
                                  <>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.DiamondShape}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.DiamondClarity}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.DiamondColour}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.DiamondCut}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.DiamondSize}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.Sieve}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.DiamondWeight}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.DiamondSellRate}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        value={x.Quantity}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            "Quantity"
                                          )
                                        }
                                      />
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    {stockType !== "Labelled" ? (
                                      <td>
                                        <input
                                          type="text"
                                          placeholder={x.Metal}
                                          readOnly
                                        />
                                      </td>
                                    ) : null}
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.ProductName}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder={x.PurityName}
                                        readOnly
                                      />
                                    </td>
                                    {stockType === "Labelled" ? (
                                      <td>
                                        <input
                                          type="text"
                                          placeholder={x.ItemCode}
                                          value={x.ItemCode}
                                          readOnly
                                        />
                                      </td>
                                    ) : null}
                                    {stockType === "Labelled" ? (
                                      <td>
                                        <input
                                          type="number"
                                          placeholder={x.GrossWt}
                                          value={x.GrossWt}
                                          onChange={(e) =>
                                            handleInputChange(
                                              e,
                                              index,
                                              "GrossWt"
                                            )
                                          }
                                        />
                                      </td>
                                    ) : (
                                      <td>
                                        <input
                                          type="number"
                                          placeholder={x.TotalGrossWt}
                                          value={x.TotalGrossWt}
                                          onChange={(e) =>
                                            handleInputChange(
                                              e,
                                              index,
                                              "TotalGrossWt"
                                            )
                                          }
                                        />
                                      </td>
                                    )}
                                    {stockType === "Labelled" ? (
                                      <td>
                                        <input
                                          type="number"
                                          placeholder={x.ClipWeight}
                                          value={x.ClipWeight}
                                          onChange={(e) =>
                                            handleInputChange(
                                              e,
                                              index,
                                              "ClipWeight"
                                            )
                                          }
                                        />
                                      </td>
                                    ) : null}
                                    <td>
                                      <input
                                        type="number"
                                        placeholder={x.TotalStoneWeight}
                                        value={x.TotalStoneWeight}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            index,
                                            "TotalStoneWeight"
                                          )
                                        }
                                      />
                                    </td>
                                    {stockType === "Labelled" ? (
                                      <td>
                                        <button
                                          onClick={() => {
                                            setAddedProducts((prevProducts) =>
                                              prevProducts.map((item, i) =>
                                                i === index
                                                  ? {
                                                      ...item,
                                                      Stones: [
                                                        ...item.Stones,
                                                        addStone,
                                                      ],
                                                    }
                                                  : item
                                              )
                                            );
                                            setShowAddStoneBox(true);
                                            setSelectedProductIndex(index);
                                          }}
                                        >
                                          Stone-{x.Stones.length}
                                        </button>
                                      </td>
                                    ) : null}
                                    {showDiamondBtn && (
                                      <td>
                                        <button
                                          style={{ display: "flex" }}
                                          onClick={() => {
                                            // setAddedProducts((prevProducts) =>
                                            //     prevProducts.map((product, index) =>
                                            //         index === selectedProductIndex
                                            //             ? {...product, Diamonds: [...product.Diamonds, {}]}
                                            //             : product
                                            //     )
                                            // );
                                            if (x.Diamonds.length === 0) {
                                              setAddedProducts((prevProducts) =>
                                                prevProducts.map((item, i) =>
                                                  i === index
                                                    ? {
                                                        ...item,
                                                        Diamonds: [
                                                          ...item.Diamonds,
                                                          addDiamond,
                                                        ],
                                                      }
                                                    : item
                                                )
                                              );
                                            }
                                            setShowAddDiamondBox(true);
                                            setSelectedProductIndex(index);
                                          }}
                                        >
                                          <IoMdAddCircleOutline
                                            style={{
                                              marginRight: "5px",
                                            }}
                                            size={"18px"}
                                          />
                                          DIAMOND-{x.Diamonds.length}
                                        </button>
                                      </td>
                                    )}
                                    {stockType === "Labelled" ? (
                                      <td>
                                        <input
                                          type="number"
                                          placeholder={x.NetWt}
                                          value={x.NetWt}
                                          readOnly
                                        />
                                      </td>
                                    ) : (
                                      <td>
                                        <input
                                          type="number"
                                          placeholder={x.TotalNetWt}
                                          value={x.TotalNetWt}
                                          readOnly
                                        />
                                      </td>
                                    )}
                                    {stockType === "Labelled" ? (
                                      <td>
                                        <input
                                          type="number"
                                          placeholder={x.MakingPerGram}
                                          value={x.MakingPerGram}
                                          onChange={(e) =>
                                            handleInputChange(
                                              e,
                                              index,
                                              "MakingPerGram"
                                            )
                                          }
                                        />
                                      </td>
                                    ) : null}
                                    {stockType === "Labelled" ? (
                                      <td>
                                        <input
                                          type="number"
                                          placeholder={x.MakingPercentage}
                                          value={x.MakingPercentage}
                                          onChange={(e) =>
                                            handleInputChange(
                                              e,
                                              index,
                                              "MakingPercentage"
                                            )
                                          }
                                        />
                                      </td>
                                    ) : null}
                                    {stockType === "Labelled" ? (
                                      <td>
                                        <input
                                          type="number"
                                          placeholder={x.MakingFixedAmt}
                                          value={x.MakingFixedAmt}
                                          onChange={(e) =>
                                            handleInputChange(
                                              e,
                                              index,
                                              "MakingFixedAmt"
                                            )
                                          }
                                        />
                                      </td>
                                    ) : null}
                                    {stockType !== "Labelled" ? (
                                      <td>
                                        <input
                                          type="number"
                                          value={x.Quantity}
                                          onChange={(e) =>
                                            handleInputChange(
                                              e,
                                              index,
                                              "Quantity"
                                            )
                                          }
                                        />
                                      </td>
                                    ) : null}
                                    {stockType !== "Labelled" ? (
                                      <td>
                                        <input
                                          type="number"
                                          value={x.Pieces}
                                          onChange={(e) =>
                                            handleInputChange(
                                              e,
                                              index,
                                              "Pieces"
                                            )
                                          }
                                        />
                                      </td>
                                    ) : null}
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div
                    // style={{ marginLeft: "10px" }}
                    style={{ width: "100%" }}
                    className="bulkProductAddingTableMain"
                  >
                    {deleteSelected ? (
                      <button
                        style={{
                          marginLeft: deleteSelected ? "1.5rem" : "0px",
                        }}
                        onClick={() => deleteAllProducts(selectedItems)}
                        className="bulkProductAddDeleteButton"
                      >
                        Delete Selected
                      </button>
                    ) : null}
                    {addedProducts.length > 0 ? (
                      <button
                        style={{
                          marginLeft: !deleteSelected ? "1.5rem" : "0px",
                          cursor: "pointer",
                        }}
                        // onClick={handleEditProducts}>
                        onClick={
                          stockType === "Labelled"
                            ? handleEditProducts
                            : handleEditProductsUnlabelled
                        }
                      >
                        <BiSave size={"12px"} style={{ marginRight: "5px" }} />
                        Save All
                      </button>
                    ) : null}

                    <Link to="/inventory">
                      <button
                        style={{
                          cursor: "pointer",
                          marginLeft:
                            addedProducts.length > 0 ? null : "1.5rem",
                        }}
                      >
                        <BiListUl
                          size={"12px"}
                          style={{
                            marginRight: "5px",
                          }}
                        />
                        Labelled List
                      </button>
                    </Link>
                    <Link to="/unlabelled_list">
                      <button style={{ cursor: "pointer" }}>
                        <BiListUl
                          size={"12px"}
                          style={{ marginRight: "5px" }}
                        />
                        Unlabelled List
                      </button>
                    </Link>

                    {!hasUnsavedChanges && addedProducts.length > 0 ? (
                      <button
                        onClick={() => {
                          setAddedProducts([]);
                          setSelectedSku([]);
                          setSelectedSkuName("");
                          setSelectedSkuStones([]);
                          setAllSelectedSkuStones([]);
                          // setAllSelectedSkuStones([]);
                          setSelectedFiles([]);
                          setStockType("Labelled");
                          setDeleteAll(false);
                          setGrosswt(0);
                          setStoneWeight(0);
                          setNetWt(0);
                          setClipWeight(0);
                          fetchAllLabelledStock();
                          setGrossWithClip(false);
                          scrollToCenter("addBulkProductsBoxTop");
                        }}
                      >
                        <AiOutlineFileAdd
                          size={"12px"}
                          style={{ marginRight: "5px" }}
                        />
                        New Item
                      </button>
                    ) : null}
                    {deleteAll &&
                    stockType === "Labelled" &&
                    addedProducts.length > 0 ? (
                      <button
                        onClick={() => deleteAllProducts(allItemCodesArray)}
                        className="bulkProductAddDeleteButton"
                        style={{ backgroundColor: "#c14456" }}
                      >
                        Delete All
                      </button>
                    ) : null}
                  </div>
                  {/* </form> */}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
