import { API_URL } from 'common/config';
import { METHOD_POST } from 'common/constants';

const request = async (path: string, parameters?: RequestInit) => await fetch(`${API_URL}${path}`, parameters);

const get = async (path: string) => {
  try {
    const response = await request(path);
    return await response.json();
  } catch (error) {
    console.log('Get request error:', error)
  }
};

const post = async (path: string, data: Object) => {
  try {
    const body = new FormData();
    data && Object.entries(data).forEach(([key, value]) => body.append(key, value));
    const parameters = { method: METHOD_POST, body };
    await request(path, parameters);
    return true;
  } catch (error) {
    console.log('Post request error:', error);
  }
  return false;
};

export default { get, post };
