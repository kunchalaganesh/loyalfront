import { useSelector } from 'react-redux';
import {
  a1,
  a125,
  a128,
  a134,
  a136,
  a146,
  a149,
  a152,
  a153,
  a154,
  a155,
  a156,
  a157,
  a158,
  a159,
  a163,
  a174,
  a18,
  a191,
  a194,
  a20,
  a22,
  a28,
  a4,
  a40,
  a41,
  a48,
  a49,
  a51,
  a53,
  a56,
  a57,
  a59,
  a61,
  a64,
  a65,
  a66,
  a71,
  a74,
  getAllSizeWeightRate,
} from "../Api/RootApiPath";

class GetApiService {
  constructor() {
    const allStates = useSelector((state) => state);
    this.adminLoggedIn = allStates.reducer1;
    this.clientCode = this.adminLoggedIn.ClientCode;
  }

  async fetchApi(url) {
    const formData = { ClientCode: this.clientCode };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow to handle it in the component
    }
  }

  async fetchAllSalesTeam() {
    return await this.fetchApi(a59);
  }

  async fetchAllCustomers() {
    return await this.fetchApi(a149);
  }

  async fetchAllSkuList() {
    return await this.fetchApi(a163);
  }

  async fetchAllCategories() {
    return await this.fetchApi(a125);
  }

  async fetchAllProductType() {
    return await this.fetchApi(a128);
  }

  async fetchAllPurities() {
    return await this.fetchApi(a134);
  }

  async fetchAllStonesList() {
    return await this.fetchApi(a146);
  }

  async fetchAllDiamondsList() {
    return await this.fetchApi(a153);
  }

  async fetchAllVendorTounche() {
    return await this.fetchApi(a174);
  }

  async fetchAllDiamondSizeWeightRate() {
    return await this.fetchApi(a191);
  }

  async GetAllSizeWeightRate() {
    return await this.fetchApi(getAllSizeWeightRate);
  }

  async fetchAllDiamondAttributes() {
    return await this.fetchApi(a194);
  }

  async fetchAllRDPurchaseList() {
    return await this.fetchApi(a159);
  }

  async fetchPurchaseEntryForBill(idRcvd) {
    const formData = { ClientCode: this.clientCode };
    try {
      const response = await fetch(a159, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const selectedEntry = data.find((x) => x.Id === idRcvd);
      return selectedEntry; // Return the selected entry
    } catch (error) {
      console.error(error);
      throw error; // Rethrow to handle it in the component
    }
  }
}

export default new GetApiService();
