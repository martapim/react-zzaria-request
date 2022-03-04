import styled from "styled-components";
import { ReactComponent as MainLogo } from "../../images/logo-react-zzaria.svg";

const Logo = styled(MainLogo)`
  width: 200px;
  height: 50px;

  & path {
    fill: ${({ theme }) => theme.palette.common.white};
  }

  & line {
    stroke: ${({ theme }) => theme.palette.common.white};
  }
`;

export default Logo;
