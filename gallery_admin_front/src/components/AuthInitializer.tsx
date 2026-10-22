import { useEffect, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface AuthInitializerProps {
  children: ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const { restoreAuth } = useAuth();

  useEffect(() => {
    void restoreAuth();
  }, [restoreAuth]);

  return <>{children}</>;
};
export default AuthInitializer;
