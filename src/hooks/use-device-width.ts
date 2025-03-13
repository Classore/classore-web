import React from "react";

type DeviceWidth = {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1024;

export const useDeviceWidth = () => {
  const [deviceWidth, setDeviceWidth] = React.useState<DeviceWidth>({
    width: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  React.useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      setDeviceWidth({
        width,
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
      });
    };
    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return deviceWidth;
};
