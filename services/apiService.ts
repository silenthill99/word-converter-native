import API_CONFIG from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    token?: string;
}

interface AuthResponse {
    success: boolean;
    token?: string;
    message?: string;
    data?: {
        user?: any;
        token?: string;
    }
}

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    email: string;
    email_confirmation: string;
    password: string;
    password_confirmation: string;
}

class ApiService {
    private baseUrl: string;
    private readonly TOKEN_KEY = 'auth_token';
    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL
    }

    // Gestion des token
    async saveToken(token: string): Promise<void> {
        try {
            await AsyncStorage.setItem(this.TOKEN_KEY, token);
        } catch (error) {
            console.error('Erreur sauvegarde token:', error);
        }
    }

    async getToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(this.TOKEN_KEY);
        } catch (error) {
            console.error('Erreur récupération token:', error);
            return null;
        }
    }

    async removeToken(): Promise<void> {
        try {
            await AsyncStorage.removeItem(this.TOKEN_KEY);
        } catch (error) {
            console.error('Erreur suppression token:', error);
        }
    }

    private async makeRequest<T>(endpoints: string, options: RequestInit = {}, requiresAuth: boolean = false): Promise<ApiResponse<T>> {
        try {
            const url = `${this.baseUrl}${endpoints}`;
            //Préparer les headers
            let headers : Record<string, string> = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...options.headers as Record<string, string>
            };

            // Ajouter le token si l'authentification est requise
            if (requiresAuth) {
                const token = await this.getToken();
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }
            }
            const response = await fetch(url, {
                ...options,
                headers
            });
            console.log(`API Request: ${url}`, response.status, response.statusText);

            if (!response.ok) {
                return {
                    success: false,
                    message: `Erreur serveur: ${response.status}`,
                }
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error)
            return {
                success: false,
                message: "Impossible de se connecter au serveur",
            };
        }
    }

    async login(loginData: LoginData): Promise<AuthResponse> {
        const result = await this.makeRequest(API_CONFIG.ENDPOINTS.LOGIN, {
            method: "POST",
            body: JSON.stringify(loginData),
        }) as AuthResponse;

        // Sauvegarder le token si la connexion réussit
        if (result.success ) {
            const token = result.token || result.data?.token;
            if (token) {
                await this.saveToken(token);
            }
        }

        return result;
    }

    async register(registerData: RegisterData): Promise<AuthResponse> {
        const result = await this.makeRequest<AuthResponse>(API_CONFIG.ENDPOINTS.REGISTER, {
            method: "POST",
            body: JSON.stringify(registerData),
        }) as AuthResponse;

        // Sauvegarder le token si l'inscription réussit
        if (result.success ) {
            const token = result.token || result.data?.token;
            if (token) {
                await this.saveToken(token);
            }
        }

        return result;
    }

    async logout(): Promise<void> {
        await this.removeToken();
    }

    async isAuthenticated(): Promise<boolean> {
        const token = await this.getToken();
        return !!token;
    }
    async testConnection(): Promise<boolean> {
        try {
            const response = await fetch(this.baseUrl)
            return response.ok;
        } catch {
            return false;
        }
    }
}

export default new ApiService();