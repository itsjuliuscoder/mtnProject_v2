import React from "react";
import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/logo-dark.svg";
import LogoLight from "../../../assets/images/logos/logo-white.svg";
import rightNetLogo from "../../../assets/images/logos/RN.png";

const LogoIcon = () => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <Link href="/">
      {customizer.activeMode === "dark" ? (
        <Image src={rightNetLogo} alt={LogoLight} />
      ) : (
        <Image src={rightNetLogo} alt={LogoDark} />
      )}
    </Link>
  );
};

export default LogoIcon;
