import API_CONFIG from "@/config/api";

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
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
    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL
    }

    private async makeRequest<T>(endpoints: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        try {
            const url = `${this.baseUrl}${endpoints}`;
            const response = await fetch(url, {
                ...options,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                    ...options.headers,
                }
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

    async login(loginData: LoginData): Promise<ApiResponse> {
        const formData = new URLSearchParams();
        formData.append("email", loginData.email);
        formData.append("password", loginData.password);

        return this.makeRequest(API_CONFIG.ENDPOINTS.LOGIN, {
            method: "POST",
            body: formData,
        })
    }

    async register(registerData: RegisterData): Promise<ApiResponse> {
        const formData = new URLSearchParams();
        Object.entries(registerData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        return this.makeRequest(API_CONFIG.ENDPOINTS.REGISTER, {
            method: "POST",
            body: formData,
        })
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