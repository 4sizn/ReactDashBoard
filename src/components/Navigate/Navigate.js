import React from "react";
import { Button } from "semantic-ui-react";
import "./Navigate.css";

//TODO:Navi다음

function Navigate({ postId, disabled, onClick }) {
  return (
    <div className="Navigate">
      <Button
        color="teal"
        content="Previous"
        icon="left arrow"
        labelPosition="left"
        onClick = {
            ()=>onClick('PREV')
        }
        disabled = {disabled}
      />
      <div className="Navigate-page-num">{postId}</div>
      <Button
        color="teal"
        content="Previous"
        icon="right arrow"
        labelPosition="right"
        className="Navigate-right-button"
        onClick = {
            ()=>onClick('NEXT')
        }
        disabled = {disabled}
      />
    </div>
  );
}

export default Navigate;
