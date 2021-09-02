class AuthService {

  logout() {
    let allCookies = document.cookie.split(";");
    for (let oneCookie of allCookies)
      document.cookie =
          oneCookie + "=;expires=" + new Date(0).toUTCString();
    window.location = "/";
  }

  isLoggedIn() {
    return !!document.cookie.split("; ").find((row) => row.startsWith("authenticator="));
  }
}

export default new AuthService();
