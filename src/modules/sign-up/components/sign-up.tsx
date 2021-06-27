import React, { ChangeEventHandler } from "react";
import styled from "styled-components";
import Amplify from "aws-amplify";
import { LogoIcon } from "../../../common/logo-icon";
import { Input } from "../../../common/input";
import { Switcher } from "../../../common/switcher";
import { LeftArrowIcon } from "../../../common/left-arrow-icon";
import { RightArrowIcon } from "../../../common/right-arrow-icon";
import * as Router from "react-router";
import { routes } from "../../app/contants";
import awsconfig from "../../../aws-exports";
import { Loader } from "../../../common/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Amplify.configure(awsconfig);

const Container = styled("div")`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Content = styled("div")`
  width: 2960px;
  height: 2197px;
  background: #ffffff;
  transform: scale(0.25) translate(-50%, -50%);
  transform-origin: left top;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
`;

const LogoIconWrapper = styled("div")`
  margin-top: 192px;
  text-align: center;
`;

const Title = styled("div")`
  text-align: center;
  margin-top: 47px;
  font-style: normal;
  font-weight: normal;
  font-size: 120px;
  line-height: 153px;
  color: #484848;
`;

const BottomBlock = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  background: #e73645;
`;

const SignInWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 133px;
`;

const UsernameWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 61px;
`;

const PasswordWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
`;

const ConfirmWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
`;

const SwitcherWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
`;

const SignInLabel = styled("div")`
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 76px;
  color: #ffffff;
  margin-right: 17px;
`;

const Button = styled("button")`
  border: none;
  outline: none;
  width: 232px;
  height: 87px;
  background: #ffffff;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.04), -1px 1px 2px rgba(0, 0, 0, 0.02);
  border-radius: 40px;
  cursor: pointer;

  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 76px;
  text-align: center;
  color: #e73645;

  &:hover {
    background: #d6d6da;
  }
`;

const Label = styled("div")`
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 51px;
  color: #ffffff;
  margin-right: 40px;
`;

const ArrowsWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 61px;
`;

const ArrowWrapper = styled("div")`
  margin-right: 279px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

export interface SignUpProps {
  onSuccessSignIn(token: string, refreshToken: string, remember: boolean): void;
  username: string;
  password: string;
  confirmPassword: string;
  checked: boolean;
  onUsernameChange(username: string): void;
  onPasswordChange(password: string): void;
  onConfirmPasswordChange(confirmPassword: string): void;
  onCheckedChange(checked: boolean): void;
  onLeftClick(): void;
  onRightClick(): void;
  goToSignIn(): void;
  isFetching: boolean;
  error: { message: string } | null;
}

export const SignUp: React.FC<SignUpProps> = ({
  username,
  password,
  confirmPassword,
  checked,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onCheckedChange,
  onLeftClick,
  onRightClick,
  isFetching,
  error,
  goToSignIn,
}) => {
  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onUsernameChange(e.target.value);
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onPasswordChange(e.target.value);
  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => onConfirmPasswordChange(e.target.value);

  React.useEffect(() => {
    if (error) {
      const errorMsg = "Password and confirm password are not equal";
      if (error.message === errorMsg) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            maxWidth: "100%",
          },
        });
      } else {
        const response = JSON.parse(error.message);
        if (response.message) {
          toast.error(response.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              maxWidth: "100%",
            },
          });
        } else if (response.log) {
          toast.error(response.log, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              maxWidth: "100%",
            },
          });
        }
      }
    }
  }, [error]);

  return (
    <Container>
      <Content>
        <LogoIconWrapper>
          <LogoIcon />
        </LogoIconWrapper>
        <Title>Sign Up</Title>
        <BottomBlock>
          <SignInWrapper>
            <SignInLabel>Already have an account?</SignInLabel>
            <Button onClick={goToSignIn}>Sign In</Button>
          </SignInWrapper>
          <UsernameWrapper>
            <Input
              value={username}
              onChange={handleUsernameChange}
              placeholder="Email"
            />
          </UsernameWrapper>
          <PasswordWrapper>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </PasswordWrapper>
          <ConfirmWrapper>
            <Input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm password"
            />
          </ConfirmWrapper>
          <SwitcherWrapper>
            <Label>Remember me on this device</Label>
            <Switcher value={checked} onChange={onCheckedChange} />
          </SwitcherWrapper>
          <ArrowsWrapper>
            <ArrowWrapper onClick={onLeftClick}>
              <LeftArrowIcon />
            </ArrowWrapper>
            <ArrowWrapper onClick={onRightClick}>
              <RightArrowIcon />
            </ArrowWrapper>
          </ArrowsWrapper>
        </BottomBlock>
      </Content>
      {isFetching && <Loader />}
      <ToastContainer />
    </Container>
  );
};
