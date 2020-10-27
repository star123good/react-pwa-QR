import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, Slide } from "@material-ui/core";
// import { MdClose } from 'react-icons/md';
// import 'react-add-to-homescreen/src/style.scss';

import { isIos, isInStandaloneMode } from 'react-add-to-homescreen/src/utils';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class AddToHomescreen extends Component {
  static propTypes = {
    onAddToHomescreenClick: PropTypes.func,
    title: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
  };

  state = {
    bannerVisible: !localStorage.getItem("isAddHomeScreen"),
  };

  onAddToHomescreenClick = () => {
    this.props.onAddToHomescreenClick();
    localStorage.setItem("isAddHomeScreen", true);
    this.setState({ bannerVisible: false });
  };

  handleCloseBannerBtnClick = () => {
    this.setState({ bannerVisible: false });
  };

  handleCancelBtnClick = () => {
    localStorage.setItem("isAddHomeScreen", false);
    this.setState({ bannerVisible: false });
  };

  render() {
    const { title, icon, text } = this.props;
    const { bannerVisible } = this.state;
    const shouldRender = bannerVisible && isIos() && !isInStandaloneMode();

    return (
      <>
        <Dialog
          open={shouldRender}
          onClose={this.handleCloseBannerBtnClick}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {title || 'Add home screen'}
          </DialogTitle>

          <DialogContent >

            <DialogContentText id="alert-dialog-slide-description">
              {icon ? <img className="add-to-home-icon" src={icon} alt="" /> : null}
              {text || 'Do you want to add to home screen?'}
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelBtnClick} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onAddToHomescreenClick} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default AddToHomescreen;
