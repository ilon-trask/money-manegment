import React from "react";
function H3(props: any) {
  return (
    <h3 className="font-semibold text-3xl" {...props}>
      {props.children}
    </h3>
  );
}

export default H3;
