import React from "react";
import styled from "styled-components";
import { Input, TimeZoneInput } from "../../../common/input";
import { LogoIcon } from "../../../common/logo-icon";
import { LeftArrowIcon } from "../../../common/left-arrow-icon";
import * as RD from "../../../utils/remoteData";
import { Loader } from "../../../common/loader";

const Container = styled("div")`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Content = styled("div")`
  background: #ffffff;
  transform: scale(0.25) translate(-50%, -50%);
  transform-origin: left top;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
`;

const FormWrapper = styled("div")`
  width: 2960px;
  height: 1684px;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const FooterWrapper = styled("div")`
  width: 2960px;
  height: 513px;
  background: #e73645;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const FirstBlock = styled("div")`
  padding: 383px 0 0 0;
`;
const SecondBlock = styled("div")`
  padding: 287px 0 0 603px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Label = styled("div")`
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 76px;

  color: #e73645;
`;

const InputWrapper = styled("div")`
  margin-top: 23px;
  &:first-child {
    margin-top: 0;
  }
`;

const ArrowWrapper = styled("div")`
  margin-left: 60px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

interface InputWithLabelProps {
  text: string;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
const InputWithLabel: React.FC<InputWithLabelProps> = ({
  text,
  value,
  onChange,
}) => {
  return (
    <InputWrapper>
      <Label>{text}</Label>
      <Input value={value} onChange={onChange} style={{ marginTop: 22 }} />
    </InputWrapper>
  );
};

const LogoTitle = styled("div")`
  height: 153px;
  font-style: normal;
  font-weight: normal;
  font-size: 120px;
  line-height: 153px;
  text-align: center;
  color: #e73645;
  width: 100%;
`;

const ProfileIconWrapper = styled("div")`
  margin-top: 33px;
  background: #ffffff;
  border: 2px solid #e73645;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.04), -1px 1px 2px rgba(0, 0, 0, 0.02);
  border-radius: 40px;
  width: 536px;
  height: 435px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProfileIcon = styled("img")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const NoProfileText = styled("div")`
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 38px;
  text-align: center;

  color: #484848;
  position: absolute;
  bottom: 0;
`;

const UploadBtn = styled("label")`
  cursor: pointer;
  outline: none;
  height: 110px;
  background: #ffffff;
  border: 2px solid #e73645;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.04), -1px 1px 2px rgba(0, 0, 0, 0.02);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 87px 0 53px;
  margin-left: auto;
  margin-top: 24px;

  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 76px;

  color: #e73645;

  &:hover {
    background: #d6d6da;
  }

  & > svg {
    margin-right: 44px;
  }
`;

const LogoWrapper = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export interface UserProfileProps {
  isFetching: boolean;
  savingRes: RD.RemoteData<void>;
  name: string;
  dateOfBirth: string;
  careFacility: string;
  primaryCaretaker: string;
  timeZone: number;
  imgUrl: string;
  onNameChange(value: string): void;
  onDateOfBirthChange(value: string): void;
  onCareFacilityChange(value: string): void;
  onPrimaryCaretakerChange(value: string): void;
  onTimeZoneChange(value: number): void;
  onImgUrlChange(value: Blob | undefined): void;
  saveUserProfile(): void;
  goToMain(): void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  dateOfBirth,
  careFacility,
  primaryCaretaker,
  timeZone,
  imgUrl,
  onNameChange,
  onDateOfBirthChange,
  onCareFacilityChange,
  onPrimaryCaretakerChange,
  onTimeZoneChange,
  onImgUrlChange,
  isFetching,
  saveUserProfile,
  savingRes,
  goToMain,
}) => {
  const isSaving = RD.isPending(savingRes);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    onNameChange(e.target.value);

  const handleDateOfBirthChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => onDateOfBirthChange(e.target.value);

  const handleCareFacilityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => onCareFacilityChange(e.target.value);

  const handlePrimaryCaretakerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => onPrimaryCaretakerChange(e.target.value);

  const handleProfileIconChange = (e: any): void => {
    const file = e.target.files[0];
    if (file) {
      onImgUrlChange(file);
    }
  };

  const handleLeftClick = (): void => {
    const shouldSave = window.confirm("Save data?");
    if (shouldSave) {
      saveUserProfile();
    } else {
      goToMain();
    }
  };

  return (
    <Container>
      <Content>
        <FormWrapper>
          <FirstBlock>
            <InputWithLabel
              value={name}
              onChange={handleNameChange}
              text="Name *"
            />
            <InputWithLabel
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              text="Date of Birth *"
            />
            <InputWithLabel
              value={careFacility}
              onChange={handleCareFacilityChange}
              text="Care Facility (Optional)"
            />
            <InputWithLabel
              value={primaryCaretaker}
              onChange={handlePrimaryCaretakerChange}
              text="Primary Caretaker (Optional)"
            />
            <TimeZoneInput
              text="Time Zone"
              value={timeZone}
              onChange={onTimeZoneChange}
            />
          </FirstBlock>
          <SecondBlock>
            <LogoWrapper>
              <LogoIcon />
            </LogoWrapper>

            <LogoTitle>User Profile</LogoTitle>
            <ProfileIconWrapper>
              <ProfileIcon id="__user-avatar__" src={imgUrl} />
              <svg
                width="290"
                height="303"
                viewBox="0 0 290 303"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M145 1C105.22 1 73.0004 34.6744 73.0004 76.25C73.0004 117.826 105.22 151.5 145 151.5C184.78 151.5 217 117.826 217 76.25C217 34.6744 184.78 1 145 1ZM181 76.2502C181 55.5564 164.8 38.6252 145 38.6252C125.2 38.6252 109 55.5564 109 76.2502C109 96.9439 125.2 113.875 145 113.875C164.8 113.875 181 96.9439 181 76.2502ZM253 264.375C249.4 251.018 193.6 226.75 145 226.75C96.5797 226.75 41.1397 250.83 36.9996 264.375H253ZM1 264.375C1 214.334 96.94 189.125 145 189.125C193.06 189.125 289 214.334 289 264.375V302H1V264.375Z"
                  fill="#FF5656"
                />
                <path
                  d="M253 264.375V264.875H253.652L253.482 264.245L253 264.375ZM36.9996 264.375L36.5215 264.229L36.324 264.875H36.9996V264.375ZM289 302V302.5H289.5V302H289ZM1 302H0.5V302.5H1V302ZM73.5004 76.25C73.5004 34.9295 105.517 1.5 145 1.5V0.5C104.924 0.5 72.5004 34.4193 72.5004 76.25H73.5004ZM145 151C105.517 151 73.5004 117.571 73.5004 76.25H72.5004C72.5004 118.081 104.924 152 145 152V151ZM216.5 76.25C216.5 117.571 184.484 151 145 151V152C185.077 152 217.5 118.081 217.5 76.25H216.5ZM145 1.5C184.484 1.5 216.5 34.9295 216.5 76.25H217.5C217.5 34.4193 185.077 0.5 145 0.5V1.5ZM145 39.1252C164.503 39.1252 180.5 55.8115 180.5 76.2502H181.5C181.5 55.3013 165.097 38.1252 145 38.1252V39.1252ZM109.5 76.2502C109.5 55.8115 125.497 39.1252 145 39.1252V38.1252C124.903 38.1252 108.5 55.3013 108.5 76.2502H109.5ZM145 113.375C125.497 113.375 109.5 96.6888 109.5 76.2502H108.5C108.5 97.199 124.903 114.375 145 114.375V113.375ZM180.5 76.2502C180.5 96.6888 164.503 113.375 145 113.375V114.375C165.097 114.375 181.5 97.199 181.5 76.2502H180.5ZM145 227.25C169.226 227.25 195.265 233.301 215.698 241.021C225.914 244.881 234.711 249.153 241.171 253.282C244.401 255.348 247.035 257.37 248.967 259.279C250.908 261.196 252.101 262.961 252.517 264.505L253.482 264.245C252.999 262.45 251.66 260.534 249.67 258.568C247.672 256.593 244.976 254.528 241.71 252.44C235.175 248.263 226.311 243.963 216.051 240.086C195.534 232.333 169.374 226.25 145 226.25V227.25ZM37.4778 264.521C37.9595 262.945 39.2099 261.158 41.1918 259.228C43.1662 257.304 45.8306 255.273 49.0807 253.204C55.5801 249.065 64.3783 244.799 74.5713 240.951C94.9591 233.254 120.864 227.25 145 227.25V226.25C120.716 226.25 94.6902 232.286 74.2181 240.015C63.981 243.88 55.1167 248.174 48.5436 252.36C45.2575 254.453 42.5331 256.525 40.494 258.511C38.4625 260.49 37.0748 262.419 36.5215 264.229L37.4778 264.521ZM253 263.875H36.9996V264.875H253V263.875ZM145 188.625C120.905 188.625 84.8388 194.94 54.7844 207.523C39.7563 213.815 26.2006 221.687 16.3944 231.146C6.58415 240.609 0.5 251.689 0.5 264.375H1.5C1.5 252.04 7.40835 241.204 17.0887 231.866C26.7731 222.524 40.2062 214.711 55.1706 208.446C85.1012 195.914 121.035 189.625 145 189.625V188.625ZM289.5 264.375C289.5 251.689 283.416 240.609 273.606 231.146C263.799 221.687 250.244 213.815 235.216 207.523C205.161 194.94 169.095 188.625 145 188.625V189.625C168.965 189.625 204.899 195.914 234.829 208.446C249.794 214.711 263.227 222.524 272.911 231.866C282.592 241.204 288.5 252.04 288.5 264.375H289.5ZM289.5 302V264.375H288.5V302H289.5ZM1 302.5H289V301.5H1V302.5ZM0.5 264.375V302H1.5V264.375H0.5Z"
                  fill="black"
                />
              </svg>
              <NoProfileText>No Profile</NoProfileText>
            </ProfileIconWrapper>
            <UploadBtn htmlFor="profile-icon">
              <input
                type="file"
                id="profile-icon"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfileIconChange}
              />
              <svg
                width="50"
                height="66"
                viewBox="0 0 50 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40.625 21.875H43.75C47.2018 21.875 50 24.6732 50 28.125V59.375C50 62.8268 47.2018 65.625 43.75 65.625H6.25C2.79822 65.625 0 62.8268 0 59.375V28.125C0 24.6732 2.79822 21.875 6.25 21.875H9.375C11.1009 21.875 12.5 23.2741 12.5 25C12.5 26.7259 11.1009 28.125 9.375 28.125H6.25V59.375H43.75V28.125H40.625C38.8991 28.125 37.5 26.7259 37.5 25C37.5 23.2741 38.8991 21.875 40.625 21.875ZM22.6259 1.09285C23.199 0.423892 24.05 0 25 0C25.95 0 26.801 0.423892 27.3741 1.09285L36.0485 9.76729C37.2689 10.9877 37.2689 12.9663 36.0485 14.1867C34.8282 15.4071 32.8495 15.4071 31.6291 14.1867L28.125 10.6826V40.625C28.125 42.3509 26.7259 43.75 25 43.75C23.2741 43.75 21.875 42.3509 21.875 40.625V10.6826L18.3709 14.1867C17.1505 15.4071 15.1718 15.4071 13.9515 14.1867C12.7311 12.9663 12.7311 10.9877 13.9515 9.76729L22.6259 1.09285Z"
                  fill="#FF5656"
                />
              </svg>
              Upload
            </UploadBtn>
          </SecondBlock>
        </FormWrapper>
        <FooterWrapper>
          <ArrowWrapper onClick={handleLeftClick}>
            <LeftArrowIcon />
          </ArrowWrapper>
        </FooterWrapper>
      </Content>
      {(isFetching || isSaving) && <Loader />}
    </Container>
  );
};
