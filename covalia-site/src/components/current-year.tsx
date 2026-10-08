"use client";

import { useSyncExternalStore } from "react";

const BUILD_YEAR = new Date().getFullYear();
const subscribe = () => () => {};

/** O HTML estático sai com o ano do build; no navegador o React troca pelo ano atual sem erro de hidratação. */
export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => BUILD_YEAR);
  return <>{year}</>;
}
