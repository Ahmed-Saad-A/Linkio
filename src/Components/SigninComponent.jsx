import React from 'react'
import style from "../Shared/Css/Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faLink,
  faComments,
  faCog,
  faSatelliteDish,
  faCloud,
  faWifi,
  faNetworkWired,
  faEnvelope,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

const icons = [
  faGlobe,
  faLink,
  faComments,
  faCog,
  faSatelliteDish,
  faCloud,
  faWifi,
  faNetworkWired,
  faEnvelope,
  faShareAlt,
];

const SigninComponent = () => {
  return (
    <>
          {/*  Background with floating icons and text */}
          <div className={style.backgroundIcons}>
            {[...Array(40)].map((_, i) => {
              const left = Math.random() * 100;
              const top = Math.random() * 100;
              const size = Math.random() * 20 + 20;
              const duration = Math.random() * 10 + 10;
    
              const styleItem = {
                left: `${left}%`,
                top: `${top}%`,
                fontSize: `${size}px`,
                animationDuration: `${duration}s`,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`,
              };
    
              return (
                <span key={i} className={style.floatingItem} style={styleItem}>
                  {i % 4 === 0 ? (
                    <span className={style.logoGhost}>linkio</span>
                  ) : (
                    <FontAwesomeIcon
                      icon={icons[Math.floor(Math.random() * icons.length)]}
                    />
                  )}
                </span>
              );
            })}
          </div>
          <h1 className={style.logo}>
            <FontAwesomeIcon icon={faLink} style={{ color: "#005eff" }} /> linkio
          </h1>
    </>
  )
}

export default SigninComponent