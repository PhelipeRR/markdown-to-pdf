import { ofetch } from "ofetch";

const API_BASE_URL = "http://localhost:3001";

class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    async convertMarkdownToPDF(markdown: string, css: string = "", name: string): Promise<any> {
        return this.request<{ message: string }>("/convert", "POST", { markdown, css, name });
    }

    private async request<T>(endpoint: string, method: "GET" | "POST", body?: object): Promise<T> {
        try {
            return await ofetch<T>(`${this.baseUrl}${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: method === "POST" ? body : undefined,
            });
        } catch (error) {
            console.error(`Erro ao chamar ${endpoint}:`, error);
            throw new Error("Falha na comunicação com a API");
        }
    }

}

export const api = new ApiService();
