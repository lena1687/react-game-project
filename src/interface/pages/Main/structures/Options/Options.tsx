import React from "react";
import Themes from "./Themes";
import styles from "./Options.sass";
import { Form, Formik, FormikProps } from "formik";
import { OptionsType } from "Types/OptionsType";
import * as Yup from "yup";
import { Select } from "Composites/forms/Select";
import { TextField } from "Composites/forms/TextField";
import { Button } from "Components/Button";
import { OverlayForm } from "Components/Overlays/OverlayForm";
import { OverlayFormFields } from "Components/Overlays/OverlayForm/OverlayFormFields";
import { OverlayFormFieldsButtons } from "Components/Overlays/OverlayForm/OverlayFormButtons";
import { useNavigate } from "react-router-dom";
import { COMPLEXITY_MEMORY_CARDS } from "Constants/common";

const EMPTY_VALUE = "";

interface Props {
  initialValues?: OptionsType;
  onSubmitValues?: (value: OptionsType) => void;
}

export const Options = ({
  initialValues,
  onSubmitValues,
}: Props): JSX.Element => {
  const navigate = useNavigate();

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

  const resetFormValues = (
    resetForm: FormikProps<OptionsType>["resetForm"],
    values: FormikProps<OptionsType>["values"]
  ) => {
    const isEmpty = Object.values(values).every((x) => x === null || x === "");
    if (!isEmpty) {
      resetForm({
        values: initialValuesForm,
      });
    }
  };

  const initializingFormContent = ({
    values,
    setFieldValue,
    resetForm,
  }: FormikProps<OptionsType>) => {
    return (
      <Form className={styles.options} noValidate={true}>
        <div className={styles.header}>Initial Options</div>
        <div className={styles.wrap}>
          <OverlayFormFields>
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
          </OverlayFormFields>
          <OverlayFormFieldsButtons
            isWidthLikeForm
            left={
              <Button type="submit" size="large">
                Let's go
              </Button>
            }
            right={
              <Button
                type="button"
                isSecondary
                size="large"
                onButtonClick={() => resetFormValues(resetForm, values)}
              >
                Reset form
              </Button>
            }
          />
        </div>
      </Form>
    );
  };

  const sendFormData = async (data: OptionsType) => {
    if (onSubmitValues) {
      onSubmitValues(data);
    }
    const currentData = Object.entries(data)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    navigate(`/memory-cards?${currentData}`);
  };

  return (
    <OverlayForm
      heading="Before playing, please, select the initial options."
      subHeading="Please, fill in the required fields"
    >
      <Formik
        initialValues={initialValues || initialValuesForm}
        validationSchema={formValidationSchema}
        onSubmit={async (data) => {
          await sendFormData(data);
        }}
      >
        {initializingFormContent}
      </Formik>
    </OverlayForm>
  );
};
