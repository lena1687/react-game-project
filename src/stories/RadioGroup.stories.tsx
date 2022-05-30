import React from "react";
import { RadioGroup } from "../interface/composites/forms/RadioGroup";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import themes from "../../public/data/ThemesMemoryCards.json";
import withFormik from "storybook-formik";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/RadioGroup",
  component: RadioGroup,
  decorators: [withFormik],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof RadioGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RadioGroup> = (args) => (
  <RadioGroup {...args} />
);

export const withHeading = Template.bind({});
withHeading.args = {
  options: themes,
  name: "ThemesMemoryCards",
  heading: "Choose the theme of cards",
};

export const withoutHeading = Template.bind({});
withoutHeading.args = {
  options: themes,
  name: "ThemesMemoryCards",
};

export const smallSizeRadio = Template.bind({});
smallSizeRadio.args = {
  options: themes,
  name: "ThemesMemoryCards",
  sizeRadio: "small",
};

export const columnDirection = Template.bind({});
columnDirection.args = {
  options: themes,
  name: "ThemesMemoryCards",
  direction: "column",
};
