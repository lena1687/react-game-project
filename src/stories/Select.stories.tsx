import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select } from "../interface/composites/forms/Select";
import { COMPLEXITY_MEMORY_CARDS } from "../consts/common";
import withFormik from "storybook-formik";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Select",
  component: Select,
  decorators: [withFormik],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Select>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Select> = (args) => (
  <Select {...args}>Save</Select>
);

export const topLabel = Template.bind({});
topLabel.args = {
  name: "name",
  topLabel: "label",
  placeholder: "placeholder",
  options: COMPLEXITY_MEMORY_CARDS,
};

export const withoutTopLabel = Template.bind({});
withoutTopLabel.args = {
  name: "name",
  placeholder: "placeholder",
  options: COMPLEXITY_MEMORY_CARDS,
};
