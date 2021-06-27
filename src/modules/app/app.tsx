import React from "react";
import * as RouterDom from "react-router-dom";
import styled from "styled-components";
import { Onboarding } from "../onboarding/components/onboarding";
import { routes } from "./contants";
import { Redirect } from "react-router-dom";
import { Main } from "../main/components/main";
import Amplify from "aws-amplify";
import { LoginContainer } from "../login/containers/login";
import { SignUpContainer } from "../sign-up/container/sign-up";
import { UserProfileContainer } from "../user-profile/containers/user-profile";
import DefaultCamera from "../../components/defaultCamera";
import TextToSpeech from "../../components/text-to-speech";
import KeyboardDemo from "../../components/keyboard/keyboard";
import PollySpeaking from "../../components/defaultCamera/pollySpeaking";

const Container = styled("div")``;

export interface AppProps {}

export const App: React.FC<AppProps> = () => {
  React.useEffect(() => {
    Amplify.Auth.currentSession()
      .then(() => {
        setIsAuthorized(true);
      })
      .catch(() => {
        setIsAuthorized(false);
      });
  }, []);

  const [isAuthorized, setIsAuthorized] = React.useState<boolean | null>(null);
  const handleSuccessLogin = (
    accessToken: string,
    refreshToken: string,
    remember: boolean,
  ): void => {
    if (remember) {
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);
    }
    setIsAuthorized(true);
  };
  return isAuthorized !== null ? (
    <Container>
      <RouterDom.Switch>
        <RouterDom.Route exact path="/camera" component={DefaultCamera} />
        <RouterDom.Route
          exact
          path="/text-to-speech"
          component={TextToSpeech}
        />
        <RouterDom.Route exact path="/pollySpeaking" component={PollySpeaking} />
        <RouterDom.Route
          path={routes.onboarding}
          component={() =>
            !isAuthorized ? <Onboarding /> : <Redirect to={routes.main} />
          }
        />
        <RouterDom.Route
          path={routes.login}
          render={({ history }) => {
            const goToOnboarding = (): void => history.push(routes.onboarding);
            return !isAuthorized ? (
              <LoginContainer
                onLeftClick={goToOnboarding}
                onSuccessSignIn={handleSuccessLogin}
              />
            ) : (
              <Redirect to={routes.main} />
            );
          }}
        />
        <RouterDom.Route
          path={routes.signUp}
          render={({ history }) => {
            const goToOnboarding = (): void => history.push(routes.onboarding);
            const goToSignIn = (): void => history.push(routes.login);
            return !isAuthorized ? (
              <SignUpContainer
                goToSignIn={goToSignIn}
                onLeftClick={goToOnboarding}
                onSuccessSignIn={handleSuccessLogin}
              />
            ) : (
              <Redirect to={routes.main} />
            );
          }}
        />
        <RouterDom.Route
          path={routes.userProfile}
          render={({ history }) => {
            const goToMain = (): void => history.push(routes.main);
            return isAuthorized ? (
              <UserProfileContainer goToMain={goToMain} />
            ) : (
              <Redirect to={routes.onboarding} />
            );
          }}
        />
        <RouterDom.Route
          path={routes.main}
          component={() =>
            isAuthorized ? (
              <DefaultCamera />
            ) : (
              <Redirect to={routes.onboarding} />
            )
          }
        />

        <RouterDom.Route component={() => <Redirect to={routes.main} />} />
      </RouterDom.Switch>
    </Container>
  ) : (
    <div />
  );
};
