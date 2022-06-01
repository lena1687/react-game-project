import { Select, SelectFieldOptions } from "./Select";
import React from "react";
import {
  getNodeText,
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Form, Formik } from "formik";
import { Button } from "../../../components/Button";

const SELECT_OPTIONS: SelectFieldOptions[] = [
  { text: "Значение 1", value: "option-1" },
  { text: "Значение 2", value: "option-2" },
  { text: "Значение 3", value: "option-3" },
  { text: "Значение 4", value: "option-4" },
  { text: "Значение 5", value: "option-5" },
  { text: "Значение 6", value: "option-6" },
  { text: "Значение 7", value: "option-7" },
  { text: "Значение 8", value: "option-8" },
  { text: "Значение 9", value: "option-9" },
  { text: "Значение 10", value: "option-10" },
];

describe("Select", () => {
  it("render without errors", () => {
    const onSubmit = jest.fn();
    render(
      <Formik initialValues={{ field: undefined }} onSubmit={onSubmit}>
        {() => (
          <Form>
            <Select
              name="field"
              options={SELECT_OPTIONS}
              topLabel="Label"
              placeholder="Choose the option"
            />
            <Button type="submit">Save</Button>
          </Form>
        )}
      </Formik>
    );
  });

  it("select value and send form", async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Formik initialValues={{ field: undefined }} onSubmit={onSubmit}>
        {() => (
          <Form>
            <Select
              name="field"
              options={SELECT_OPTIONS}
              topLabel="Label"
              placeholder="Choose the option"
            />
            <Button type="submit">Save</Button>
          </Form>
        )}
      </Formik>
    );
    await waitFor(() => {
      expect(getByText("Choose the option")).toBeInTheDocument();
    });
    expect(
      getNodeText(container.querySelector(".field") as HTMLElement)
    ).toEqual("Choose the option");
    expect(container.getElementsByClassName("panel").length).toBe(0);
    fireEvent.click(container.querySelector(".fieldWrap") as Element);
    await waitFor(() => {
      expect(container.querySelector(".panel")).toBeVisible();
    });
    const items = container.getElementsByClassName("panelItem");
    expect(items).toHaveLength(10);
    fireEvent.click(getByText("Значение 3"));
    await waitFor(() => {
      expect(
        getNodeText(container.querySelector(".field") as HTMLElement)
      ).toEqual("option-3");
    });
    expect(container.getElementsByClassName("panel").length).toBe(0);
    fireEvent.click(getByText("Save"));
    await waitFor(() => {
      expect(onSubmit).toBeCalledTimes(1);
    });
    expect(onSubmit.mock.calls[0][0]).toStrictEqual({ field: "option-3" });
  });
});
