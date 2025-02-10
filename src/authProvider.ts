import { AuthProvider, fetchUtils } from 'react-admin';
import data from './users.json';
import { stringify } from 'query-string';

/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
const apiUrl = import.meta.env.VITE_API_URL;
const httpClient = fetchUtils.fetchJson;
interface Credentials {
    username: string;
    password: string;
  }

export const authProvider: AuthProvider = {
    login:  ({ username, password }) => {
          const url = `${apiUrl}/login`;
          const request  = new Request(url, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
          });
          return fetch(request)
          .then(response => {
              if (response.status < 200 || response.status >= 300) {
                  throw new Error(response.statusText);
              }
              return response.json();
          })
          .then(data => {
            const user = data.user;
                if (user.groups.includes('portal')) {
                    localStorage.setItem('user', JSON.stringify(data));
                  } else {
                    throw new Error("Недостатньо прав для доступу зверніться до системного адміністратора");
                  }
          })
          .catch(error => {
            if (error.message === 'Invalid username or password') {
              throw new Error("Недостатньо прав для доступу");
            } else {
              throw error;
            }
          });
          
  },
    
    logout: () => {
        localStorage.removeItem('user');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem('user') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => {
        return Promise.resolve(undefined);
    },
    getIdentity: () => {
      const userString = localStorage.getItem('user');
      if (userString) {
          const { id, fullName } = JSON.parse(userString).user || {}; // додайте перевірку на null для об'єкта user
          const avatar = 'photos/adminich.jpg';
          return Promise.resolve({ id, avatar, fullName });
      } else {
          return Promise.reject('No user data found in localStorage');
      }
  },
};

export default authProvider;
