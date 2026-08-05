import { useEffect, useState } from "react";
import { fetchItems } from "./api";
import ItemList from "./components/ItemList";

const CATEGORIES = ["", "Electronics", "Furniture", "Stationery"];

export default function App() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchItems({ search, category, page, limit }).then((res) => {
      setItems(res.data);
      setTotal(res.total);
    });
  }, [search, category, page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Item Catalog</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c || "All categories"}
            </option>
          ))}
        </select>
      </div>

      <ItemList items={items} />

      <div style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center" }}>
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
