import React from "react";
import { RadioGroup } from "../../../../../composites/forms/RadioGroup";

type PropsThemes = {
  error: Record<"message", string> | null;
  isLoaded: boolean;
  themes: { id: number; text: string; value: string }[];
};

class Themes extends React.Component<any, PropsThemes> {
  _isMounted = false;
  constructor(props: PropsThemes) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      themes: [],
    };
  }

  async getThemes(): Promise<void> {
    await fetch("./data/ThemesMemoryCards.json")
      .then((res) => {
        console.log(res);
        const serverError = () =>
          this.setState({
            error: { message: "serverError" },
            isLoaded: false,
            themes: [],
          });
        return res.ok && res.status === 200 ? res.json() : serverError();
      })
      .then(
        (result) => {
          if (this._isMounted) {
            this.setState({
              error: null,
              isLoaded: true,
              themes: result,
            });
          }
        },
        (error) => {
          this.setState({ isLoaded: true, error });
        }
      );
  }

  componentDidMount(): void {
    this._isMounted = true;
    this.getThemes();
  }

  componentDidUpdate(
    nextProps: Readonly<any>,
    nextState: Readonly<PropsThemes>
  ): void {
    if (this.state.themes.length && this.state.error?.message.length) {
      this.getThemes();
    }
  }

  componentWillUnmount(): boolean {
    return (this._isMounted = false);
  }

  render(): JSX.Element {
    const { error, isLoaded, themes } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading data</div>;
    } else {
      return (
        <div>
          <RadioGroup
            options={themes}
            name="ThemesMemoryCards"
            heading="Choose the theme of cards"
          />
        </div>
      );
    }
  }
}

export default Themes;
