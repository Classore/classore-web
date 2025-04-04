import { combine } from "zustand/middleware";
import { create } from "zustand/react";

import { useGlobalStore, useUserStore } from "./z-store";

const useStore = create(combine(useGlobalStore, useUserStore));

export { useStore };
