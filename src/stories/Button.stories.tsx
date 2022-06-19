import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "Components/Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Save</Button>
);

export const Secondary = Template.bind({});
Secondary.args = {
  isSecondary: true,
  value: "Button-1",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  value: "Button-2",
};

export const Medium = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Medium.args = {
  size: "medium",
  value: "Button-3",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  value: "Button-4",
};
