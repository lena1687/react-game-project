import React from "react";
import Themes from "./Themes";
import styles from "./Options.sass";
import { Form, Formik } from "formik";
import { OptionsType } from "../../../../../types/OptionsType";
import * as Yup from "yup";
import { COMPLEXITY_MEMORY_CARDS } from "../../../../../consts/common";
import { Select } from "../../../../composites/forms/Select";
import { TextField } from "../../../../composites/forms/TextField";

const EMPTY_VALUE = ";";

export const Options = (): JSX.Element => {
  const initialValuesForm: OptionsType = {
    userName: EMPTY_VALUE,
    complexity: null,
    theme: null,
  };

  const formValidationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Name is not specified")
      .max(20, "Name must be no more 20 characters"),
    complexity: Yup.string().required("Complexity is not specified"),
    theme: Yup.string().required("Theme is not specified"),
  });

  const InitializingFormContent = () => {
    return (
      <Form noValidate={true}>
        <TextField name="name" topLabel="UserName" />
        <Select
          options={COMPLEXITY_MEMORY_CARDS}
          topLabel="Difficulty level"
          placeholder="Choose the difficulty level"
        />
        <Themes />
      </Form>
    );
  };

  // const finishForm = async (data: OptionsType) => {
  //   console.log(data);
  // };

  return (
    <div className={styles.options}>
      <Formik
        initialValues={initialValuesForm}
        validationSchema={formValidationSchema}
        onSubmit={async (data) => {
          //await finishForm(data);
        }}
      >
        {InitializingFormContent}
      </Formik>
    </div>
  );
};
