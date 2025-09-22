"use client";

import { ReactNode, useState } from "react";
import Loader from "./Loader";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <>{loading ? <Loader onComplete={() => setLoading(false)} /> : children}</>
  );
}
