import type { AppLoadContext } from "react-router";
import { unstable_createContext } from "react-router";

export const ExecutionContext = unstable_createContext<AppLoadContext>();
