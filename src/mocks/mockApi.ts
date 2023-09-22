import { mockData } from './mockData';

const mockApi = () => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(mockData),
});

export default mockApi;
