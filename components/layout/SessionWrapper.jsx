import Loader from "./Loader";

export default function SessionWrapper({ children }) {
  if (true) {
    return <Loader />;
  }

  return <>{children}</>;
}
