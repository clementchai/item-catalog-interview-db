// Simple in-memory "database". Good enough for a take-home test —
// no need to set up Postgres/Mongo for this exercise.

let items = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", price: 19.99, inStock: true },
  { id: 2, name: "Standing Desk", category: "Furniture", price: 249.0, inStock: true },
  { id: 3, name: "USB-C Cable", category: "Electronics", price: 9.99, inStock: false },
  { id: 4, name: "Office Chair", category: "Furniture", price: 189.5, inStock: true },
  { id: 5, name: "Notebook", category: "Stationery", price: 3.5, inStock: true },
  { id: 6, name: "Mechanical Keyboard", category: "Electronics", price: 89.99, inStock: true },
  { id: 7, name: "Desk Lamp", category: "Furniture", price: 34.0, inStock: false },
  { id: 8, name: "Pen Set", category: "Stationery", price: 12.0, inStock: true },
  { id: 9, name: "Monitor Stand", category: "Furniture", price: 45.0, inStock: true },
  { id: 10, name: "Webcam", category: "Electronics", price: 59.99, inStock: true },
  { id: 11, name: "Sticky Notes", category: "Stationery", price: 4.25, inStock: true },
  { id: 12, name: "External SSD", category: "Electronics", price: 129.0, inStock: true },
];

function getAll() {
  return items;
}

function getById(id) {
  return items.find((i) => i.id === id);
}

function create(item) {
  const newItem = { id: items.length + 1, ...item };
  items.push(newItem);
  return newItem;
}

module.exports = { getAll, getById, create };
