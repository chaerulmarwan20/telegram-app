import React from "react";
import { Helmet } from "react-helmet";

class Title extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Telegram App | {this.props.title}</title>
        </Helmet>
      </>
    );
  }
}

export default Title;
