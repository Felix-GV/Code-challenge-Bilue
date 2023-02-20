import React from "react";
import PropTypes from "prop-types";
import styles from "./Form.module.css";

const Form = ({ legend, onSubmit, children }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <fieldset>
        <legend className={styles.legend}>{legend}</legend>
        {children}
        <div className={styles.formRow}>
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
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
