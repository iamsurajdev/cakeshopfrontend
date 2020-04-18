import React from "react";
import Base from "./Base";
import Hstyle from "./allstyles/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faLeaf,
  faGrinHearts,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <Base>
      <div className={Hstyle.imagecontainer}>
        <div className={Hstyle.siteTitleDiv}>
          <h1 className={Hstyle.title}>Welcome to Daniels Cake Shop </h1>
          <p className={Hstyle.subtitle}>Your smile is our motivation</p>
        </div>
      </div>
      <div className={Hstyle.secondContainer}>
        <h1 className={Hstyle.secondTitle}> Why we are the best</h1>
        <div className={Hstyle.usp_container}>
          <div className={Hstyle.first_uspdiv}>
            <div className={Hstyle.uspcard}>
              <h1>
                <FontAwesomeIcon icon={faClipboardCheck} />
              </h1>
              <h2>Best Quality</h2>
              <p>
                this is demo text for the description for all cards, it needs to
                be long that's way i wrote this otherwise i don't give any fuck
              </p>
            </div>
          </div>
          <div className={Hstyle.second_uspdiv}>
            <div className={Hstyle.uspcard}>
              <h1>
                <FontAwesomeIcon icon={faLeaf} />
              </h1>
              <h2>ECO Friendly</h2>
              <p>
                this is demo text for the description for all cards, it needs to
                be long that's way i wrote this otherwise i don't give any fuck
              </p>
            </div>
          </div>
          <div className={Hstyle.third_uspdiv}>
            <div className={Hstyle.uspcard}>
              <h1>
                <FontAwesomeIcon icon={faGrinHearts} />
              </h1>
              <h2>Professional Design</h2>
              <p>
                this is demo text for the description for all cards, it needs to
                be long that's way i wrote this otherwise i don't give any fuck
              </p>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
