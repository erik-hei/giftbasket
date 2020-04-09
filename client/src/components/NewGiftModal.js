import React, { useState } from "react";
import { Modal, Backdrop, Fade, Typography, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NewGiftPanel from "./NewGiftPanel";
import ExistingGiftsPanel from "./ExistingGiftPanel";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, 
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  title: {
    textAlign: "center"
  }
}));

function NewGiftModal(props) {

  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (e, selectedTab) => {
    setCurrentTab(selectedTab);
  }

  return(
    <Modal
      aria-labelledby="add gift modal"
      aria-describedby="A modal for adding a new gift or select and existing one you've already created"
      className={classes.modal}
      open={props.isShowing}
      onClose={() => props.toggleModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}>
      <Fade in={props.isShowing}>
        <div className={`${classes.paper} no-outline`}>
          <Tabs 
            indicatorColor="secondary"
            value={currentTab}
            onChange={handleTabChange}
            aria-label="Gift Option Tabs">
            <Tab 
              label="New Gift"
              id="new-gift-tab"/>
            <Tab 
              label="Your Gifts"
              id="existing-gift-tab"/>
          </Tabs>
          <NewGiftPanel value={currentTab} index={0} addGift={props.addGift} toggleModal={props.toggleModal}></NewGiftPanel>
          <ExistingGiftsPanel value={currentTab} index={1}></ExistingGiftsPanel>
          </div>
      </Fade>
    </Modal>
  );
}

export default NewGiftModal;
