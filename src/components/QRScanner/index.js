import React, { Component } from 'react'
import PropTypes from 'prop-types';
import QrReader from 'react-qr-scanner'
import { Box } from "@material-ui/core";
import styles from "./styles";

class QrScanner extends Component {
  static propTypes = {
    setData: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: "",
    };
 
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    this.setState({
      result: data,
    });
    this.props.setData(JSON.parse(data));
  }

  handleError(err) {
    console.warn(err);
  }

  render() {
 
    return(
      <Box
        style={styles.box}
      >
        <QrReader
          delay={this.state.delay}
          style={styles.reader}
          onError={this.handleError}
          onScan={this.handleScan}
          />
      </Box>
    )
  }
}

export default QrScanner;