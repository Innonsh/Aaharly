// ⚙️ Configuration - Update this with your actual backend URL
const API_BASE_URL = "http://localhost:5000/api"; // ← Change to your backend URL

// Generic API function (keep for backward compatibility)
export const api = async (path: string, token: string, method = "GET", body?: any) => {
  return await fetch(`${API_BASE_URL}/${path}`, {
    method,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};

/**
 * ✅ Send Google ID Token to Backend
 * @param idToken - Firebase JWT token from Google Sign-In
 * @returns Backend response with user data
 */
export const sendGoogleTokenToBackend = async (idToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: idToken,  // ← This is the Firebase JWT token
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Backend authentication failed");
    }

    const data = await response.json();
    // Backend should return: { success: true, user: {...}, sessionToken: "..." }
    return data;
  } catch (error) {
    console.error("Error sending Google token to backend:", error);
    throw error;
  }
};

/**
 * Send Phone OTP Token to Backend
 * @param idToken - Firebase JWT token from Phone OTP
 */
export const sendPhoneTokenToBackend = async (idToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/phone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Backend authentication failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending phone token to backend:", error);
    throw error;
  }
};

/**
 * Send Email Login Token to Backend
 * @param idToken - Firebase JWT token from Email/Password
 */
export const sendEmailTokenToBackend = async (idToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Backend authentication failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending email token to backend:", error);
    throw error;
  }
};
