import React from "react";
function Card(props: any) {
  return (
    <div className="p-8 bg-white rounded-2xl cursor-pointer" {...props}>
      {props.children}
    </div>
  );
}

export default Card;
