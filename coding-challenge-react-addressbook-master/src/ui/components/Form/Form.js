import React from "react";
import PropTypes from "prop-types";
import styles from "./Form.module.css";
import Button from "/Users/filo/Desktop/Code-challenge-Bilue/coding-challenge-react-addressbook-master/src/ui/components/Button/Button.js";

const Form = ({ legend, onSubmit, children }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <fieldset>
        <legend className={styles.legend}>{legend}</legend>
        {children}
        <div className={styles.formRow}>
          <Button type="button" onClick={onSubmit} variant="primary">
            ubmit
          </Button>
        </div>
      </fieldset>
    </form>
  );
};

Form.propTypes = {
  legend: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Form;
