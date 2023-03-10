import React, { useState } from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import useFormFields from "./ui/hooks/useFormField";
import Form from "./Form";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";

import * as styles from "../styles/App.module.css";

function App() {
  const { fields, handleFieldChange } = useFormFields({
    postcode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
  });

  const { loadSavedAddresses, addAddress } = useAddressBook();

  const { postcode, houseNumber, firstName, lastName } = fields;

  const handlePostCodeChange = handleFieldChange;

  const handleHouseNumberChange = handleFieldChange;

  const handleSelectedAddressChange = handleFieldChange;

  const handleFirstNameChange = handleFieldChange;

  const handleLastNameChange = handleFieldChange;

  const [error, setError] = useState(undefined);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (!postcode || !houseNumber) {
      setError("Please fill in both fields");
      return;
    }

    const url = `/api/getAddresses?postcode=${postcode}&streetnumber=${houseNumber}`;
    const response = await fetch(url);

    const data = await response.json();
    console.log(data);

    if (data.length === 0) {
      setError("No addresses found, please try again");
      return;
    }

    const transformedAddresses = [data].map((address) => {
      const street = address.street;
      const city = address.city;
      return transformAddress({
        ...address,
        street,
        houseNumber,
        postcode,
        city,
      });
    });

    setAddresses(transformedAddresses);
    setSelectedAddress(transformedAddresses[0].id);
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === selectedAddress
    );

    addAddress({ ...foundAddress, firstName, lastName, postcode, houseNumber });
  };

  const handleClearForm = () => {
    setAddresses([]);
    setSelectedAddress(undefined);
    setError(undefined);
    fields.postcode = "";
    fields.houseNumber = "";
    fields.firstName = "";
    fields.lastName = "";
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const addressOptions = addresses.map((address) => ({
    label: `${address.street}, ${address.city}`,
    value: address.id,
    checked: address.id === selectedAddress,
  }));

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! ????
          </small>
        </h1>

        <Form
          name="Find"
          legend="???? Find an address"
          onSubmit={handleAddressSubmit}
          variant="primary"
        >
          <div className={styles.formRow}>
            <InputText
              name="postcode"
              onChange={handlePostCodeChange}
              placeholder="Post Code"
              value={postcode}
            />
          </div>
          <div className={styles.formRow}>
            <InputText
              name="houseNumber"
              onChange={handleHouseNumberChange}
              value={houseNumber}
              placeholder="House number"
            />
          </div>
        </Form>
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleSelectedAddressChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}

        {selectedAddress && (
          <Form
            name="Add to address book"
            legend="?????? Add personal info to address"
            onSubmit={handlePersonSubmit}
            variant="primary"
          >
            <div className={styles.formRow}>
              <InputText
                name="firstName"
                placeholder="First name"
                onChange={handleFirstNameChange}
                value={firstName}
              />
            </div>
            <div className={styles.formRow}>
              <InputText
                name="lastName"
                placeholder="Last name"
                onChange={handleLastNameChange}
                value={lastName}
              />
            </div>
          </Form>
        )}

        {error && <ErrorMessage message={error} />}

        <Button
          type="button"
          onClick={handleClearForm}
          variant="secondary"
          clear={true}
        >
          Clear all Fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
