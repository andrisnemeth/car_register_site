import axios from "axios";

//brands
export async function fetchCarBrands() {
  const response = await axios.get("http://localhost:8000/car-brands");
  return response.data;
}

export async function addNewCarBrand(brandData) {
  console.log(brandData.brandName);
  try {
    const response = await axios.post("http://localhost:8000/car-brands", {
      brandName: brandData.brandName,
    });
    return response;
  } catch (error) {
    console.error("Error saving car brand:", error);
    throw error;
  }
}

//types
export const fetchCarTypes = (type) => {
  return axios.get(`http://localhost:8000/car-types`);
};

export const fetchSelectedCarTypes = (brandNameId) => {
  return axios
    .get(`http://localhost:8000/car-types-selected?brandNameId=${brandNameId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching selected car types:", error);
      throw error;
    });
};

export async function addNewCarType(typeData) {
  try {
    const response = await axios.post("http://localhost:8000/car-types", {
      typeName: typeData.typeName,
    });
    return response;
  } catch (error) {
    console.error("Error saving car type:", error);
    throw error;
  }
}

//cardata
export const saveCarData = (
  selectedBrand,
  selectedType,
  year,
  color,
  fuelType,
  images
) => {
  const carData = {
    brand: selectedBrand,
    type: selectedType,
    year: parseInt(year),
    color,
    fuelType,
    images,
  };

  return axios
    .post("http://localhost:8000/cars", carData)
    .then((response) => {
      console.log("Car data saved successfully:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error saving car data:", error);
      throw error;
    });
};
