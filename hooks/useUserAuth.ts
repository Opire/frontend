import { useMemo } from 'react';
import { Token } from '../app/_core/_vos/Token';
import { TokenServiceLocalStorage } from '../TokenServiceLocalStorage';

export const useUserAuth = () => {
  const token = TokenServiceLocalStorage.getToken();

  const userAuth = useMemo(() => {
    if (token) {
      return Token.getTokenPayload(token);
    }

    return null;
  }, [token]);

  return userAuth;
};
