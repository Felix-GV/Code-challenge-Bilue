import React from "react";
import PropTypes from "prop-types";
import * as styles from "../styles/App.module.css";
import Button from "./ui/components/Button/Button";

const Form = ({ legend, onSubmit, children }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <fieldset>
        <legend className={styles.legend}>{legend}</legend>
        {children}
        <div className={styles.formRow}>
          <Button type="button" onClick={onSubmit} variant="primary">
            Submit
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
