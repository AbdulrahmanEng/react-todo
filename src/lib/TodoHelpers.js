export const addTodo = (list, item) => [...list, item];
export const generateId = () => Math.floor(Math.random() * 1000000);
export const findById = (id, list) => list.find(item => item.id === id);
export const toggleTodo = (todo) => ({...todo,  isComplete: !todo.isComplete});
export const updateTodo = (list, updatedItem) => {
  const updatedIndex = list.findIndex(item => item.id === updatedItem.id);
  return [
    ...list.slice(0, updatedIndex),
    updatedItem,
    ...list.slice(updatedIndex + 1)
  ]
};