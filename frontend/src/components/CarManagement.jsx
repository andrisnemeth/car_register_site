import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Text, Spacer } from "@nextui-org/react";
import {
  fetchCarBrands,
  fetchSelectedCarTypes,
  saveCarData,
  addNewCarBrand,
  addNewCarType,
} from "../api/carManagement";
import { validateBrandName } from "../helpers/inputFieldValidators";
import "../styles/CarManagement.css";

function CarManagement() {
  const [isAdmin, setIsAdmin] = useState(true);
  const currentYear = new Date().getFullYear();
  //brand states
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [brandName, setBrandName] = useState("");
  const [shakeBrandName, setShakeBrandName] = useState(false);
  const [addNewBrandModalVisible, setAddNewBrandModalVisible] = useState(false);
  const [brandsCount, setBrandsCount] = useState(0);
  // type states
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [typeName, setTypeName] = useState("");
  const [shakeTypeName, setShakeTypeName] = useState(false);
  const [addNewTypeModalVisible, setAddNewTypeModalVisible] = useState(false);
  //year, color, fuel, image states
  const [year, setYear] = useState(0);
  const [color, setColor] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [images, setImages] = useState([]);

  //Render Lists
  useEffect(() => {
    fetchCarBrands().then((data) => {
      setBrands(data);
    });
  }, [brandsCount]);

  useEffect(() => {
    if (selectedBrand) {
      fetchSelectedCarTypes(selectedBrand)
        .then((data) => {
          setTypes(data);
        })
        .catch((error) => {
          console.error(
            `Error fetching car types for brand ${selectedBrand}:`,
            error
          );
        });
    }
  }, [selectedBrand]);

  // Helper
  const brandNameHelper = React.useMemo(() => {
    if (!brandName)
      return {
        text: "",
        color: "default",
      };
    const isValid = validateBrandName(brandName);
    return {
      text: isValid
        ? `Megfelelően kitöltött mező!`
        : "Kérjük csak az általános formátumokat használja",
      color: isValid ? "success" : "warning",
    };
  }, [brandName]);

  const typeNameHelper = React.useMemo(() => {
    if (!typeName)
      return {
        text: "",
        color: "default",
      };
    const isValid = validateBrandName(typeName);
    return {
      text: isValid
        ? `Megfelelően kitöltött mező!`
        : "Kérjük csak az általános formátumokat használja",
      color: isValid ? "success" : "warning",
    };
  }, [typeName]);

  //Handlers
  const handleBrandChange = (event) => {
    const brandId = event.target.value;
    setSelectedBrand(parseInt(brandId));
    setSelectedType("");
  };

  // console.log(selectedBrand);
  // const filteredBrandId = selectedBrand
  const handleTypeChange = (event) => {
    const brandNameId = parseInt(event.target.value);

    if (!brandNameId) {
      setTypes([]);
      setSelectedType("");
    } else {
      fetchSelectedCarTypes(brandNameId)
        .then((response) => {
          console.log(response);
          setTypes(response);
          setSelectedType(response.length > 0 ? response[0].id : "");
        })
        .catch((error) => {
          console.error(
            `Error fetching car types for brand ${brandNameId}:`,
            error
          );
        });
    }
  };

  const handleAddNewBrand = async () => {
    if (brandName.length === 0) {
      setShakeBrandName(true);
      brandNameHelper.color = "error";
      brandNameHelper.text = "Kérjük tölse ki ezt a mezőt";
    }
    if (validateBrandName(brandName)) {
      try {
        await addNewCarBrand({
          brandName,
        });
        setBrandsCount((prevCount) => prevCount + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddNewType = async () => {
    if (typeName.length === 0) {
      setShakeTypeName(true);
      typeNameHelper.color = "error";
      typeNameHelper.text = "Kérjük tölse ki ezt a mezőt";
    }
    if (validateBrandName(typeName)) {
      try {
        await addNewCarType({
          typeName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const closeModalHandler = () => {
    setAddNewBrandModalVisible(false);
    setAddNewTypeModalVisible(false);
    setTypeName("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    saveCarData(selectedBrand, selectedType, year, color, fuelType, images)
      .then(() => {
        setSelectedBrand("");
        setSelectedType("");
        setYear(0);
        setColor("");
        setFuelType("");
        setImages([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="car_data_form_container">
        <h2 className="car_data_form_headline" style={{ textAlign: "center" }}>
          Autónyilvántartás
        </h2>
        <h3>Profin, egyszerűen</h3>
        <div className="car_data_form_content">
          {isAdmin && (
            <>
              <h4>Új márka hozzáadása</h4>
              <Button
                size="md"
                rounded
                onPress={setAddNewBrandModalVisible}
                className="car_data_add_new_button"
              >
                Hozzáadás
              </Button>
              <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={addNewBrandModalVisible}
                onClose={closeModalHandler}
              >
                <Modal.Header>
                  <Text id="modal-title" size={18}>
                    Új márkanév
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <Input
                    clearable
                    className={shakeBrandName ? "shake" : ""}
                    onChange={(e) => setBrandName(e.target.value)}
                    required
                    bordered
                    status={brandNameHelper.color}
                    color={brandNameHelper.color}
                    helperColor={brandNameHelper.color}
                    helperText={brandNameHelper.text}
                    fullWidth
                    size="md"
                    placeholder="Márkanév:"
                    aria-labelledby="Márkanév"
                  />
                  <Spacer y={1} />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    auto
                    rounded
                    flat
                    color="error"
                    onPress={closeModalHandler}
                  >
                    Bezárás
                  </Button>
                  <Button auto rounded onPress={handleAddNewBrand}>
                    Hozzáadás
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}

          <h4>Új típus hozzáadása</h4>
          <Button
            size="md"
            className="car_data_add_new_button"
            rounded
            onPress={setAddNewTypeModalVisible}
          >
            Hozzáadás
          </Button>

          <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={addNewTypeModalVisible}
            onClose={closeModalHandler}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Új típus
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Input
                clearable
                className={shakeTypeName ? "shake" : ""}
                onChange={(e) => setTypeName(e.target.value)}
                required
                bordered
                status={typeNameHelper.color}
                color={typeNameHelper.color}
                helperColor={typeNameHelper.color}
                helperText={typeNameHelper.text}
                fullWidth
                size="md"
                placeholder="Típus:"
                aria-labelledby="Típus"
              />
              <Spacer y={1} />
            </Modal.Body>
            <Modal.Footer>
              <Button
                auto
                rounded
                flat
                color="error"
                onPress={closeModalHandler}
              >
                Bezárás
              </Button>
              <Button auto rounded onPress={handleAddNewType}>
                Hozzáadás
              </Button>
            </Modal.Footer>
          </Modal>
          <form onSubmit={handleSubmit} id="car_management_form">
            <div>
              <Spacer y={2.5} />
              <label className="car_data_form_select_label">Márkanév:</label>
              <select value={selectedBrand} onChange={handleBrandChange}>
                <option value="">Válasszon márkát</option>
                {brands.length > 0 ? (
                  brands.map((brand, index) => (
                    <option key={index} value={brand.id}>
                      {brand.brandName}
                    </option>
                  ))
                ) : (
                  <option value="">
                    Nincs elérhető márka, kérjük vegye fel a kapcsolatot a
                    support-tal
                  </option>
                )}
              </select>
            </div>
            <Spacer y={2} />
            <label className="car_data_form_select_label">Típus:</label>
            <select
              value={selectedType}
              onChange={(event) => handleTypeChange(event)}
            >
              <option value="">Válasszon típust</option>
              {types &&
                types.map((type, index) => (
                  <option key={index} value={type.id}>
                    {type.typeName}
                  </option>
                ))}
            </select>
            <Spacer y={2} />
            <Input
              type="number"
              underlined
              width="100%"
              value={year}
              min="1885"
              max={currentYear}
              labelLeft="Évjárat"
              onChange={(e) => setYear(e.target.value)}
            />
            <Spacer y={0.5} />
            <Input
              type="text"
              width="100%"
              value={color}
              underlined
              labelLeft="Szín"
              label
              onChange={(e) => setColor(e.target.value)}
            />
            <Spacer y={2} />
            <Input
              style={{ fontSize: "" }}
              type="text"
              value={fuelType}
              width="100%"
              underlined
              labelLeft="Üzemanyag típusa"
              labelPlaceholder
              onChange={(e) => setFuelType(e.target.value)}
            />
            <Spacer y={2} />
            <Input
              type="file"
              width="100%"
              underlined
              labelLeft="Fotó feltöltése"
              onChange={(e) => setImages(e.target.files)}
              multiple
            />
            <Button id="car_data_submit_button" type="submit">
              Mentés
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CarManagement;
