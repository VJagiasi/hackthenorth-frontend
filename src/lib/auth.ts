"use server"

export async function authenticate(username: string, password: string) {
  // Hardcoded credentials as specified
  if (username === "hacker" && password === "htn2025") {
    return true
  }
  return false
}

