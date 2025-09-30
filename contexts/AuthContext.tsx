import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";
import ApiService from "@/services/apiService"

interface User {
    email?: string;
    [key: string]: any;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{success: boolean, message?: string}>;
    register: (email: string, emailConfirmation: string, password: string, passwordConfirmation: string) => Promise<{success: boolean, message?: string}>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        checkAuthStatus();
    }, [])

    const checkAuthStatus = async () => {
        try {
            const authenticated = await ApiService.isAuthenticated();
            setIsAuthenticated(authenticated)

            if (authenticated) {

            }
        } catch (error) {
            console.error('Erreur vérification auth:', error)
            setIsAuthenticated(false)
        } finally {
            setIsLoading(false)
        }
    };

    const login = async (email: string, password: string): Promise<{ success: boolean, message?: string }> => {
        try {
            const result = await ApiService.login({ email, password});
            if (result.success) {
                setIsAuthenticated(true);
                setUser(result.data?.user || { email })
                return {success: true};
            }

            return { success: false, message: result.message || 'Erreur de connexion' };
        } catch (error) {
            console.error("Erreur login:", error)
            return {success: false, message: 'Erreur de connexion'}
        }
    };

    const register = async (
        email: string,
        emailConfirmation: string,
        password: string,
        passwordConfirmation: string
    ): Promise<{ success: boolean; message?: string }> => {
        try {
            const result= await ApiService.register({
                email,
                email_confirmation: emailConfirmation,
                password,
                password_confirmation: passwordConfirmation
            });

            if (result.success) {
                setIsAuthenticated(true);
                setUser(result.data?.user || { email })
                return { success: true};
            }

            return { success: false, message: result.message || "Erreur d'inscription" }
        } catch (error) {
            console.error("Erreur register:", error)
            return { success: false, message: "Erreur d'inscription"}
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await ApiService.logout();
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error("Erreur logout:", error)
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
     const context = useContext(AuthContext);                                                                                         if (context === undefined) {
         throw new Error('useAuth must be used within an AuthProvider');
     }
     return context;
};