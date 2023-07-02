import axios from "axios";

export async function fetchCarBrands() {
  const response = await axios.get("http://localhost:8000/car-brands");
  return response.data;
}

export const fetchCarTypes = (brand) => {
  return axios.get(`http://localhost:8000/types/${brand}`);
};

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

export async function addNewCarBrand(brandData) {
  console.log(brandData.brandName)
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
