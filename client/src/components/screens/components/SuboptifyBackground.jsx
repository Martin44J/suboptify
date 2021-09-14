import React from "react";
import styled from 'styled-components';
import * as styles from "./SuboptifyBackground.module.css";



const SuboptifyBackground = () =>{

    const getString = () =>{
      let string = "";
      for (let i =0; i < 800; i++){
        string += " suboptify"
      }
      return string;
    }

    document.body.style.overflow = "hidden";

    return(
      <div className={styles.backgroundBox}>{getString()}</div>
    );
}

export default SuboptifyBackground;