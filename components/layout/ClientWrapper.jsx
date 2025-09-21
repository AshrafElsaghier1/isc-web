"use client";

import { useState } from "react";
import Loader from "./Loader";

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <>{loading ? <Loader onComplete={() => setLoading(false)} /> : children}</>
  );
}
