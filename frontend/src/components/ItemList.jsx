export default function ItemList({ items }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>In Stock</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{item.inStock ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
