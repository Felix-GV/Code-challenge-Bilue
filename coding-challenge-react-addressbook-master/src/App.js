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
    postCode: '',
    houseNumber: '',
    firstName: '',
    lastName: '',
  });

  const { loadSavedAddresses, addAddress } = useAddressBook();

  const { postCode, houseNumber, firstName, lastName } = fields;
  
  const handlePostCodeChange = handleFieldChange;
  
  const handleHouseNumberChange = handleFieldChange;
  
  const handleFirstNameChange = handleFieldChange;
  
  const handleLastNameChange = handleFieldChange;

  const [error, setError] = useState(undefined);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {

      const url = `/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`;
      const response = await fetch(url);
     
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const transformedAddresses = [data].map((address) => transformAddress({ ...address, houseNumber }));
     
      setAddresses(transformedAddresses);
      setSelectedAddress(transformedAddresses[0]); // Select the first address by default
      // load saved address
      const foundAddress = addresses.find(
        (address) => address.id === selectedAddress
      );

    } catch (error) {
      setError(error.message);
    }
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
  
      addAddress({ ...foundAddress, firstName, lastName, postCode, houseNumber });
  };
  
  

  const handleClearForm = () => {
    setAddresses([]);
    setSelectedAddress(undefined);
    setError(undefined);
    fields.postCode = '';
    fields.houseNumber = '';
    fields.firstName = '';
    fields.lastName = '';
  };
  

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        <Form legend="🏠 Find an address" onSubmit={handleAddressSubmit}>
          <div className={styles.formRow}>
            <InputText
              name="postCode"
              onChange={handlePostCodeChange}
              placeholder="Post Code"
              value={postCode}
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

        {selectedAddress && (
          <Form
            legend="✏️ Add personal info to address"
            onSubmit={handlePersonSubmit}
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
          Clear All
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
