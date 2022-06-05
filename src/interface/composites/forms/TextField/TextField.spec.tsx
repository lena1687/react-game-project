import { fireEvent, render, waitFor } from "@testing-library/react";
import { Form, Formik, FormikProps } from "formik";
import { TextField } from "./TextField";
import React from "react";
import { Button } from "../../../components/Button";
import { OptionsType } from "../../../../types/OptionsType";

describe("TextField", () => {
  it("render without errors", () => {
    const onSubmit = jest.fn();
    render(
      <Formik initialValues={{ field: undefined }} onSubmit={onSubmit}>
        {() => (
          <Form>
            <TextField name="userName" topLabel="UserName" />
          </Form>
        )}
      </Formik>
    );
  });
  it("data entry and send form", async () => {
    const onSubmit = jest.fn();

    const changeUserName = (
      value: string,
      setFieldValue: FormikProps<OptionsType>["setFieldValue"]
    ) => {
      setFieldValue("field", value.charAt(0).toUpperCase() + value.slice(1));
    };

    const { container, getByText } = render(
      <Formik initialValues={{ field: "" }} onSubmit={onSubmit}>
        {({ setFieldValue }: FormikProps<OptionsType>) => (
          <Form>
            <TextField
              name="field"
              topLabel="Entry data"
              onChangeText={(value) => changeUserName(value, setFieldValue)}
            />
            <Button type="submit">Save</Button>
          </Form>
        )}
      </Formik>
    );
    expect(getByText("Entry data")).toBeInTheDocument();
    const input = container.querySelector("input[name='field']") as HTMLElement;
    input.focus();
    fireEvent.change(input, {
      target: { value: "result" },
    });
    expect(input?.getAttribute("value")).toBe("Result");
    fireEvent.click(getByText("Save"));
    await waitFor(() => {
      expect(onSubmit).toBeCalledTimes(1);
    });
    expect(onSubmit.mock.calls[0][0]).toStrictEqual({ field: "Result" });
  });
});
