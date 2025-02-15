"use server"

export async function authenticate(username: string, password: string): Promise<boolean> {
  try {
    // Hardcoded credentials as specified
    if (username === "hacker" && password === "htn2025") {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
} 