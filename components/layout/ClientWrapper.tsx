"use client";

import { ReactNode, useEffect, useState } from "react";
import Loader from "./Loader";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <>{loading ? <Loader onComplete={() => setLoading(false)} /> : children}</>
  );
}
