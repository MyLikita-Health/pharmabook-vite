import classNames from "classnames";
import React from "react";
import { Card } from "reactstrap";
// import { themeClass } from "variables";

function BorderedCard(props) {
  return (
    <Card
      className={classNames([ props.className])}
      color="primary"
      outline
    >
      {props.children}
    </Card>
  );
}

export default BorderedCard;
