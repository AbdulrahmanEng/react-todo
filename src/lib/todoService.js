const baseUrl = 'https://node-machine-engicom.c9users.io:8081/todos';

export const loadTodos = () => {
  return fetch(baseUrl)
  .then(res => res.json())
};