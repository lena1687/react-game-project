import React from "react";
import { RadioGroup } from "../../../../../composites/forms/RadioGroup";

type PropsThemes = {
  error: Record<"message", string> | null;
  isLoaded: boolean;
  themes: { id: number; text: string; value: string }[];
};

class Themes extends React.Component<any, PropsThemes> {
  constructor(props: PropsThemes) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      themes: [],
    };
  }

  componentDidMount() {
    fetch("./data/ThemesMemoryCards.json")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("-> result", result);
          this.setState({
            isLoaded: true,
            //JSON.parse(
            themes: result,
          });
        },
        (error) => {
          this.setState({ isLoaded: true, error });
        }
      );
  }

  render() {
    const { error, isLoaded, themes } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка данных</div>;
    } else {
      return (
        <RadioGroup
          options={themes}
          name="ThemesMemoryCards"
          heading="Choose the theme of cards"
        />
      );
    }
  }
}

export default Themes;
