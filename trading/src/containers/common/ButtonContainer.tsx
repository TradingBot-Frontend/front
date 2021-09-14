import React, { useEffect } from "react";
import { CommonButton } from "../../components/common/Button";
export interface ButtonProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const CommonButtonContainer: React.FC<ButtonProps> = ({
  title,
  onClick,
}) => {
  return <CommonButton title={title} onClick={onClick} />;
};
