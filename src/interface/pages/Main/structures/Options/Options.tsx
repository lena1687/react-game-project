import React from "react";
import { Complexity } from "./Copmlexity";
import Themes from "./Themes";
import styles from "./Options.sass";

type Option = { shouldIRender: boolean };
class Options extends React.Component<any, Option> {
  constructor(props: Option) {
    super(props);
    this.state = {
      shouldIRender: true,
    };
  }
  componentDidMount(): void {
    setTimeout(() => {
      this.setState({ shouldIRender: false });
    }, 10000);
  }

  render(): JSX.Element {
    return (
      <div className={styles.options}>
        <Complexity />
        {this.state.shouldIRender && (
          <div>
            <span>
              The Block Themes will be deleted in 10 seconds for Emulate
              'componentWillUnmount'
            </span>
            <Themes />
          </div>
        )}
      </div>
    );
  }
}

export default Options;
