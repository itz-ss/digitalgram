import { memo } from "react";
import "./style/AppBackground.css";
import FloatingLines from "./Background/FloatingLines";


const AppBackground = () => {
  return (
    <div className="app-background" aria-hidden="true">
      <FloatingLines/>
    </div>
  );
};

export default memo(AppBackground);
