import type { FC } from "react";

import logo from "../assets/logo.svg";

interface LogoProps { }

const Logo: FC<LogoProps> = () => {
    return <img src={logo} width={100} alt="Logo Img" />;
};

export default Logo;
