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
            console.log("this.state", this.state);
          }
        },
        (error) => {
          this.setState({ isLoaded: true, error });
        }
      );
  }

  //componentDidMount() is called immediately after mounting (that is, inserting the component into the DOM).
  // Actions that require DOM nodes should occur in this method. This is a good place to create network requests.

  componentDidMount(): void {
    console.log("componentDidMount");
    this._isMounted = true;
    this.getThemes();
  }

  //Use shouldComponentUpdate() to indicate the need for the next render based on state changes and props.
  //By default, re-rendering occurs whenever the state changes. In most cases, you should rely on this behavior.
  //shouldComponentUpdate() is called before rendering when it receives new props or state.
  //The default value is true. This method is not called at the first render or when forceUpdate() is used.

  shouldComponentUpdate(
    nextProps: Readonly<any>,
    nextState: Readonly<PropsThemes>
  ): boolean {
    console.log("shouldComponentUpdate");
    return this.state.isLoaded !== nextState.isLoaded;
  }

  //An example of when to use componentDidUpdate() is when we need to call an external API on condition that
  // the previous state and the current state have changed.
  //The call to the API would be conditional to the state being changed. If there is no state change, no API is called.

  componentDidUpdate(
    nextProps: Readonly<any>,
    nextState: Readonly<PropsThemes>
  ): void {
    console.log("componentDidUpdate");
    if (this.state.themes.length && this.state.error?.message.length) {
      this.getThemes();
    }
  }

  //componentWillUnmount() is called immediately before unmounting and deleting the component.
  //This method performs the necessary reset: canceling timers, network requests, and subscriptions created in
  //componentDidMount().
  //Do not use setState() in componentWillUnmount(), as the component will never be rendered again.

  componentWillUnmount(): boolean {
    console.log("componentWillUnmount");
    return (this._isMounted = false);
  }

  changeThemes = (): void => {
    return this.setState({ themes: [] });
  };

  getError = (): void => {
    return this.setState({
      error: { message: "Stop, here the error" },
      isLoaded: false,
    });
  };

  render(): JSX.Element {
    console.log("render");
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
          <button onClick={this.changeThemes}>
            Emulate 'shouldComponentUpdate'-changeThemes
          </button>
          <br />
          <button onClick={this.getError}>
            Emulate 'componentDidUpdate'-getError
          </button>
        </div>
      );
    }
  }
}

export default Themes;
