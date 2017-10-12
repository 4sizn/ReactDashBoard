import React from "react";
import "./Warning.css";

class Warning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closing: false
    };
  }
  //새로운 props를 받을때  이전 render() 완료상태 -> componentWillReceiveProps => render() ->
  componentWillReceiveProps = nextProps => {
    if (this.props.visible && !nextProps.visible) {
      //visible props is changing from true => false

      this.setState({
        closing: true
      });

      setTimeout(() => {
        this.setState({
          closing: false
        });
      }, 1000);
    }
  };

  render() {
    const { message, visible } = this.props;
    const { closing } = this.state;
    if (!visible && !closing) return null;
    return (
      <div className="Warning-wrapper">
        <div className="Warning animated bounceIn">{message}</div>
      </div>
    );
  }
}
export default Warning;
