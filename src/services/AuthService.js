class AuthService {

  logout() {
    let allCookies = document.cookie.split(";");
    for (let i = 0; i < allCookies.length; i++)
      document.cookie =
          allCookies[i] + "=;expires=" + new Date(0).toUTCString();
    window.location = "/";
  }

  isLoggedIn() {
    return !!document.cookie.split("; ").find((row) => row.startsWith("authenticator="));
  }
}

export default new AuthService();
