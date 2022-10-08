import React from "react";
import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/logo-dark.svg";
import LogoLight from "../../../assets/images/logos/logo-white.svg";
import LogoImg from "../../../assets/images/logos/rightnet.jpg";
import rightNetLogo from "../../../assets/images/logos/RN.png";

const LogoIcon = () => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <Link href="/">
      {customizer.activeMode === "dark" ? (
        <Image src={LogoImg} alt={LogoLight} width="90" height="90" />
      ) : (
        <Image src={LogoImg} alt={LogoDark} width="90" height="90" />
      )}
    </Link>
  );
};

export default LogoIcon;
