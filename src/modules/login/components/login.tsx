import React, { ChangeEventHandler } from "react";
import styled from "styled-components";
import { LogoIcon } from "../../../common/logo-icon";
import { Input } from "../../../common/input";
import { Switcher } from "../../../common/switcher";
import { LeftArrowIcon } from "../../../common/left-arrow-icon";
import { RightArrowIcon } from "../../../common/right-arrow-icon";
import { Loader } from "../../../common/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const UsernameWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 270px;
`;

const PasswordWrapper = styled("div")`
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

export interface LoginProps {
  onSuccessSignIn(token: string, refreshToken: string, remember: boolean): void;
  username: string;
  password: string;
  checked: boolean;
  onUsernameChange(username: string): void;
  onPasswordChange(password: string): void;
  onCheckedChange(checked: boolean): void;
  onLeftClick(): void;
  onRightClick(): void;
  isFetching: boolean;
  error: { message: string } | null;
}

export const Login: React.FC<LoginProps> = ({
  username,
  password,
  checked,
  onUsernameChange,
  onPasswordChange,
  onCheckedChange,
  onLeftClick,
  onRightClick,
  isFetching,
  error,
}) => {
  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onUsernameChange(e.target.value);
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onPasswordChange(e.target.value);

  React.useEffect(() => {
    if (error) {
      // alert(error.message);
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
  }, [error]);
  return (
    <Container>
      <Content>
        <LogoIconWrapper>
          <LogoIcon />
        </LogoIconWrapper>
        <Title>Log In</Title>
        <BottomBlock>
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
