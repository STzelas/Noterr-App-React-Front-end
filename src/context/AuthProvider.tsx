import {AuthContext} from "@/context/AuthContext.ts";
import {type PropsWithChildren, useEffect, useState} from "react";
import type {JwtPayload, LoginFields} from "@/types/types.ts";
import {login} from "@/api/login.ts";
import {deleteCookie, getCookie, setCookie} from "@/utils/cookies.ts";
import {jwtDecode} from "jwt-decode";

type AuthProviderProps = PropsWithChildren

export const AuthProvider = ({children} : AuthProviderProps) => {
  const [ accessToken, setAccessToken ] = useState<string | null>(null);
  const [ userId, setUserId ] = useState<number | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const token = getCookie("access_token");
    setAccessToken(token ?? null);

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUserId(decoded.userId ?? null);
      } catch (err) {
        console.log(err);
        setUserId(null);
      }
    } else {
      setUserId(null);
    }

    setLoading(false);
  }, []);

  const loginUser = async (fields: LoginFields) => {
    try {
      const response = await login(fields);
      const token = response.token;

      const decoded: JwtPayload = jwtDecode(token);
      // Token expires in 3 hours, cookie will too
      const expirationTime = 3 * 60 * 60 * 1000 // 3h
      const expiryDate = new Date(Date.now() + expirationTime)

      setCookie("access_token", token, {
        expires: expiryDate,
        sameSite: "Lax",
        secure: false, // true in production
        path: "/"
      });

      setAccessToken(token);
      setUserId(decoded.userId ?? null);

    } catch (err) {
      console.error("API Login error:", err);
      setAccessToken(null);
      setUserId(null);
      throw err;
    }
  };

  const logoutUser = async () => {
    deleteCookie("access_token");
    setAccessToken(null);
    setUserId(null);
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!accessToken,
      accessToken,
      userId,
      loginUser,
      logoutUser,
      loading
    }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
};

export default AuthProvider
