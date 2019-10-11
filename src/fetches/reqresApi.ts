/**
 * Fetch Person
 */

export interface FetchPersonType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export const fetchPerson = (id: number): Promise<Response> => fetch(new Request(`https://reqres.in/api/users/${id}`, {
  method: 'get',
}));
