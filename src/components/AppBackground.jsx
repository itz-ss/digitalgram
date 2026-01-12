import { memo } from "react";
import "./style/AppBackground.css";

/**
 * AppBackground
 * Global animated gradient mesh + grain texture
 * Sits behind the entire application
 * Zero interaction, zero re-render cost
 */
const AppBackground = () => {
  return <div className="app-background" aria-hidden="true" />;
};

export default memo(AppBackground);
