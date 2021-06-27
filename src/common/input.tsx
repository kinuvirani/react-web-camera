import React from "react";
import styled from "styled-components";

export const Input = styled("input")`
  border: 2px solid #e73645;
  outline: none;
  width: 859px;
  height: 110px;
  background: #ffffff;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.04), -1px 1px 2px rgba(0, 0, 0, 0.02);
  border-radius: 40px;
  padding: 0 129px;

  font-style: normal;
  font-weight: normal;
  font-size: 80px;
  line-height: 102px;
  text-align: center;
  color: #484848;

  &::placeholder {
    color: #c4c4c4;
  }
`;

const Container = styled("div")`
  position: relative;
  margin-top: 23px;
`;

const ArrowWrapper = styled("div")`
  width: 75px;
  height: 75px;
  background-color: transparent;
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled("div")`
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 76px;

  color: #e73645;
`;

const UpClickableBlock = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50%;
  z-index: 1;
  cursor: pointer;
`;

const DownClickableBlock = styled("div")`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  cursor: pointer;
`;

export interface TimeZoneInputProps {
  text: string;
  value: number;
  onChange(timeZone: number): void;
}
export const TimeZoneInput: React.FC<TimeZoneInputProps> = ({
  text,
  value,
  onChange,
}) => {
  const [timeZone, setTimeZone] = React.useState<number>(-5);
  React.useEffect(() => {
    if (value <= 12 && value >= -12) {
      setTimeZone(value);
    }
  }, [value]);
  const handleChange = (): void => setTimeZone((v) => v);
  const inputValue = `EST (UTC ${timeZone >= 0 ? "+" : "-"} ${Math.abs(
    timeZone,
  )})`;
  const handleUp = (): void => {
    setTimeZone((v) => {
      const newValue = v < 12 ? v + 1 : v;
      onChange(newValue);
      return newValue;
    });
  };
  const handleDown = (): void =>
    setTimeZone((v) => {
      const newValue = v > -12 ? v - 1 : v;
      onChange(newValue);
      return newValue;
    });
  return (
    <Container>
      <Label>{text}</Label>
      <Input
        value={inputValue}
        onChange={handleChange}
        style={{ marginTop: 22 }}
      />
      <ArrowWrapper>
        <svg
          width="29"
          height="57"
          viewBox="0 0 29 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.4067 19.125L14.5005 9.21875L4.59424 19.125L0.156738 14.7188L14.5005 0.375L28.813 14.7188L24.4067 19.125ZM4.59389 37.875L14.5001 47.7812L24.4064 37.875L28.8439 42.2812L14.5001 56.625L0.187645 42.2812L4.59389 37.875Z"
            fill="#EB5757"
          />
        </svg>
        <UpClickableBlock onClick={handleUp} />
        <DownClickableBlock onClick={handleDown} />
      </ArrowWrapper>
    </Container>
  );
};
