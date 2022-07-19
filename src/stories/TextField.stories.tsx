import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TextField } from "Composites/forms/TextField";
import React from "react";
import withFormik from "storybook-formik";

export default {
  title: "Example/TextField",
  component: TextField,
  decorators: [withFormik],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TextField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const topLabel = Template.bind({});
topLabel.args = {
  name: "userName",
  topLabel: "UserName",
};

export const withoutTopLabel = Template.bind({});
withoutTopLabel.args = {
  name: "userName",
};

export const smallSizeInput = Template.bind({});
smallSizeInput.args = {
  name: "userName",
  topLabel: "UserName",
  sizeInput: "small",
};

export const disabledInput = Template.bind({});
disabledInput.args = {
  name: "userName",
  topLabel: "UserName",
  isDisabled: true,
};
