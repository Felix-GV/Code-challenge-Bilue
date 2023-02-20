import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import Form from "./Form";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";

import * as styles from "../styles/App.module.css";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { postCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handlePostCodeChange for example
   */
  const [postCode, setPostCode] = React.useState("");
  const [houseNumber, setHouseNumber] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [selectedAddress, setSelectedAddress] = React.useState("");
  // TODO: setIsLoading

  /**
   * Results states
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Redux actions
   */
  const { addAddress, removeAddress } = useAddressBook();

  /**
   * Text fields onChange handlers
   */
  const handlePostCodeChange = (e) => setPostCode(e.target.value);

  const handleHouseNumberChange = (e) => setHouseNumber(e.target.value);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);

  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleSelectedAddressChange = (e) => setSelectedAddress(e.target.value);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    try {
      const response = await fetch(
        `/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }
      const data = await response.json();
      const transformedAddresses = data.map((address) =>
        transformAddress(address, houseNumber)
      );
      setAddresses(transformedAddresses);
      setSelectedAddress(null);
      // setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch addresses. Please try again later.");
      // setIsLoading(false);
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

    // Check for duplicate address
    const isDuplicate = addresses.some(
      (address) =>
        address.postCode === foundAddress.postCode &&
        address.houseNumber === foundAddress.houseNumber &&
        address.firstName === firstName &&
        address.lastName === lastName
    );
  };
  
  const handleRemoveAddress = (addressId) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== addressId)
    );
  };
  
  const handleClearForm = () => {
    setPostCode("");
    setHouseNumber("");
    setFirstName("");
    setLastName("");
    setSelectedAddress("");
    setError(undefined);
    setAddresses([]);
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
