import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
            <div className={classes.wrap}>
                <div className={classes.loader}></div>
                <span className={classes.text}>loading...</span>
            </div>
        </div>
    );
};

export default Loader;
