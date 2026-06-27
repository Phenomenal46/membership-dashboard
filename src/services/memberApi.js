const API_URL =import.meta.env.VITE_API_URL;
if (!API_URL) {
    throw new Error(
        "Missing VITE_API_URL"
    );
}

// Centralized API functions.
// UI components never call fetch directly.
export const memberApi = {

    async getMembers() {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch members");
        }

        return response.json();
    },

    async createMember(member) {

        const response = await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(member),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create member");
        }

        return response.json();
    },
};