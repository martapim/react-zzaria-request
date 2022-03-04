import React from "react";
import styled from "styled-components";
import { Button, Grid } from "@material-ui/core";
import { ReactComponent as MainLogo } from "../../images/logo-react-zzaria.svg";
import useAuth from "../../hooks/auth";
// eslint-disable-next-line
import FirebaseApp from "../../services/firebase";

function Login() {
  const { login } = useAuth();

  return (
    <Container>
      <Grid container spacing={5} justifyContent={"center"}>
        <Grid item xs={12}>
          <Logo />
        </Grid>

        <Grid item xs={12} container justifyContent={"center"}>
          <GithubButton onClick={login}>Entrar com GitHub</GithubButton>
        </Grid>
      </Grid>
    </Container>
  );
}

const Logo = styled(MainLogo)`
  width: 100%;
`;

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

const GithubButton = styled(Button).attrs({
  variant: "contained",
  fullWidth: true,
})`
  && {
    text-transform: none;
    font-size: ${({ theme }) => theme.typography.h5.fontsize};
    padding: ${({ theme }) => theme.spacing(2)}px;
    max-width: 480px;
  }
`;

export default Login;
