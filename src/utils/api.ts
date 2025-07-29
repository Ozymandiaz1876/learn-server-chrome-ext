import API_ENDPOINTS from './constants';

const { BASE_URL, LOGIN } = API_ENDPOINTS;

const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}${LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Login failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data;
};

export default login;
