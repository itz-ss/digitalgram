import { useEffect, useState } from "react";

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};

export function useDevice() {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const detect = () => {
      const width = window.innerWidth;

      if (width <= BREAKPOINTS.mobile) {
        setDevice("mobile");
      } else if (width <= BREAKPOINTS.tablet) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    detect();
    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  return {
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
}
