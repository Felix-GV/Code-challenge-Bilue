import React from "react";
import PropTypes from "prop-types";
import * as styles from "../styles/App.module.css";
import Button from "./ui/components/Button/Button";

const Form = ({ name, legend, onSubmit, children, variant }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <fieldset>
        <legend className={styles.legend}>{legend}</legend>
        {children}
        <div className={styles.formRow}>
          <Button
            type="button"
            onClick={onSubmit}
            variant={variant}
            className={name}
          >
            {name}
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
