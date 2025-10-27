export abstract class TokenServiceLocalStorage {
  private static readonly keyPersistenceToken = 'token';

  public static getToken(): string | null {
    const token = localStorage.getItem(TokenServiceLocalStorage.keyPersistenceToken);

    if (!token) {
      return null;
    }

    return token;
  }

  public static saveToken(token: string): void {
    localStorage.setItem(TokenServiceLocalStorage.keyPersistenceToken, token);
  }

  public static removeToken(): void {
    localStorage.removeItem(TokenServiceLocalStorage.keyPersistenceToken);
  }
}
