import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../app/contants";
export interface MainProps {}

export const Main: React.FC<MainProps> = () => {


  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  return (
    <>
    <div>
      Main <Link to={routes.userProfile}>Go to user profile</Link>
    </div>
    </>
  );
};
