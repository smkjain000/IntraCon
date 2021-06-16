import React from "react";
import "./SwipeButtons.css";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";
import { Button, makeStyles } from "@material-ui/core";


const SwipeButtons = () => {
  const classes = useStyles();
  return (
    <div className="swipeButtons">
      {/* <IconButton className="swipeButtons__repeat">
        <ReplayIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__left">
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__star">
        <StarRateIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__right">
        <FavoriteIcon fontSize="large" />
      </IconButton>
      <IconButton className="swipeButtons__lightning">
        <FlashOnIcon fontSize="large" />
      </IconButton> */}
      <Button
                      type="submit"
                      
                      variant="contained"
                      className={classes.submit}
                    >
        Connect
      </Button>
      <Button
                      type="submit"
                      
                      variant="contained"
                      className={classes.submit}
                    >
        View Profile
      </Button>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  submit: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
    padding: '10px',
  },
}));
export default SwipeButtons;
