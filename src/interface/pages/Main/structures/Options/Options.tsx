import React from "react";
import Themes from "./Themes";
import styles from "./Options.sass";
import { Form, Formik, FormikProps } from "formik";
import { OptionsType } from "../../../../../types/OptionsType";
import * as Yup from "yup";
import { COMPLEXITY_MEMORY_CARDS } from "../../../../../consts/common";
import { Select } from "../../../../composites/forms/Select";
import { TextField } from "../../../../composites/forms/TextField";
import { Button } from "../../../../components/Button";

const EMPTY_VALUE = "";

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
    complexity: Yup.string().required("Complexity is not specified").nullable(),
    theme: Yup.string().required("Theme is not specified").nullable(),
  });

  const changeUserName = (
    value: string,
    setFieldValue: FormikProps<OptionsType>["setFieldValue"]
  ) => {
    setFieldValue("userName", value.charAt(0).toUpperCase() + value.slice(1));
  };

  const initializingFormContent = ({
    setFieldValue,
  }: FormikProps<OptionsType>) => {
    return (
      <Form className={styles.options} noValidate={true}>
        <TextField
          name="userName"
          topLabel="UserName"
          onChangeText={(value) => changeUserName(value, setFieldValue)}
        />
        <Select
          name="complexity"
          options={COMPLEXITY_MEMORY_CARDS}
          topLabel="Difficulty level"
          placeholder="Choose the difficulty level"
        />
        <Themes />
        <Button type="submit" size="large">
          Let's go
        </Button>
      </Form>
    );
  };

  const sendFormData = async (data: OptionsType) => {
    //console.log(data);
  };

  return (
    <Formik
      initialValues={initialValuesForm}
      validationSchema={formValidationSchema}
      onSubmit={async (data) => {
        await sendFormData(data);
      }}
    >
      {initializingFormContent}
    </Formik>
  );
};
