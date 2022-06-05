import { RadioGroup } from "./RadioGroup";
import React from "react";
import { fireEvent, waitFor, render } from "@testing-library/react";
import { RadioGroupType } from "../../../../types/RadioGroupType";
import { Form, Formik } from "formik";
import { Button } from "../../../components/Button";

const RADIO_GROUP_OPTIONS: RadioGroupType[] = [
  {
    id: 1,
    text: "Text 1",
    value: "value_1",
  },
  {
    id: 2,
    text: "Text 2",
    value: "value_2",
  },
];

describe("RadioGroup", () => {
  it("render without errors", () => {
    const onSubmit = jest.fn();
    render(
      <Formik initialValues={{ field: undefined }} onSubmit={onSubmit}>
        {() => (
          <Form>
            <RadioGroup
              options={RADIO_GROUP_OPTIONS}
              name="field"
              heading="Choose the option"
            />
            <Button type="submit">Save</Button>
          </Form>
        )}
      </Formik>
    );
  });

  it("choose value", async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Formik initialValues={{ field: undefined }} onSubmit={onSubmit}>
        {() => (
          <Form>
            <RadioGroup
              options={RADIO_GROUP_OPTIONS}
              name="field"
              heading="Choose the option"
            />
            <Button type="submit">Save</Button>
          </Form>
        )}
      </Formik>
    );
    expect(getByText("Choose the option")).toBeInTheDocument();
    const radioValueOne = container.querySelector(
      'input[value="value_1"]'
    ) as HTMLElement;
    const radioValueTwo = container.querySelector(
      'input[value="value_2"]'
    ) as HTMLElement;
    expect(radioValueOne).not.toBeChecked();
    expect(radioValueTwo).not.toBeChecked();
    radioValueOne.focus();
    expect(radioValueOne).toHaveFocus();
    fireEvent.click(radioValueOne);
    expect(radioValueOne).toBeChecked();
    expect(radioValueTwo).not.toBeChecked();
    radioValueTwo.focus();
    expect(radioValueTwo).toHaveFocus();
    fireEvent.click(radioValueTwo);
    expect(radioValueOne).not.toBeChecked();
    expect(radioValueTwo).toBeChecked();
    fireEvent.click(getByText("Save"));
    await waitFor(() => {
      expect(onSubmit).toBeCalledTimes(1);
    });
    expect(onSubmit.mock.calls[0][0]).toStrictEqual({ field: "value_2" });
  });
});
