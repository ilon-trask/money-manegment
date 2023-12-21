import React, { ReactNode } from "react";

function Text({
  children,
  className,
}: {
  className: string;
  children: ReactNode;
}) {
  return <p className={`text-2xl ${className}`}>{children}</p>;
}

export default Text;
