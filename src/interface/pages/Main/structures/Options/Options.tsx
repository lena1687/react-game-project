import React from "react";
import Themes from "./Themes";
import { Form, Formik, FormikProps } from "formik";
import { OptionsType } from "../../../../../types/OptionsType";
import * as Yup from "yup";
import { COMPLEXITY_MEMORY_CARDS } from "../../../../../consts/common";
import { Select } from "../../../../composites/forms/Select";
import { TextField } from "../../../../composites/forms/TextField";
import { Button } from "../../../../components/Button";
import { OverlayForm } from "../../../../components/Overlays/OverlayForm";
import { OverlayFormFields } from "../../../../components/Overlays/OverlayForm/OverlayFormFields";
import { OverlayFormFieldsButtons } from "../../../../components/Overlays/OverlayForm/OverlayFormButtons";

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

  const resetFormValues = (
    resetForm: FormikProps<OptionsType>["resetForm"],
    values: FormikProps<OptionsType>["values"]
  ) => {
    const isEmpty = Object.values(values).every((x) => x === null || x === "");
    if (!isEmpty) {
      resetForm();
    }
  };

  const initializingFormContent = ({
    values,
    setFieldValue,
    resetForm,
  }: FormikProps<OptionsType>) => {
    return (
      <Form noValidate={true}>
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
      </Form>
    );
  };

  const sendFormData = async (data: OptionsType) => {
    //console.log(data);
  };

  return (
    <OverlayForm
      heading="Initial Options"
      subHeading="Please, fill in the required fields"
    >
      <Formik
        initialValues={initialValuesForm}
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
