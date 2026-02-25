const API_URL = "http://localhost:3000";

export const authenticationService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const ErrorData = await response.json();
      throw new Error(ErrorData.message);
    }

    return response.json;
  },
  signup: async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const ErrorData = await response.json();
      throw new Error(ErrorData.message);
    }

    return response.json;
  },
};
