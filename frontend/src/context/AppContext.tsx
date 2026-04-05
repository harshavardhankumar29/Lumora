"use client"

import { AppProviderProps, User, AppContextType } from "@/type";
import { createContext, useContext, useState, useEffect } from "react";
import { userApi } from "@/lib/api";
import Cookies from "js-cookie";

export const utils_service = process.env.NEXT_PUBLIC_UTILS_URL || "http://localhost:5002";
export const auth_service = process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5001";
export const user_service = process.env.NEXT_PUBLIC_USER_URL || "http://localhost:5003";
export const job_service = process.env.NEXT_PUBLIC_JOB_URL || "http://localhost:5004";
export const payment_service = process.env.NEXT_PUBLIC_PAYMENT_URL || "http://localhost:5005";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            // Fetch full user profile when a token exists
            userApi.get("/me")
                .then((res) => {
                    setUser(res.data);
                    setIsAuth(true);
                })
                .catch(() => {
                    // Token is invalid or expired — clean up
                    Cookies.remove("token");
                    Cookies.remove("user_id");
                    setIsAuth(false);
                    setUser(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AppContext.Provider value={{ user, loading, btnLoading, isAuth, setUser, setIsAuth, setLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}