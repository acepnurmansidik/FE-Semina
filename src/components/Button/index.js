import React from "react";
import { Button } from "react-bootstrap";

const SButton = ({
  loading,
  children,
  className,
  action,
  variant,
  size,
  disabled,
}) => {
  return (
    <Button
      disabled={disabled}
      className={className}
      onClick={action}
      variant={variant}
      size={size}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
};

export default SButton;
