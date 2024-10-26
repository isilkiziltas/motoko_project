import { useState, useEffect } from 'react';
import { motoko_project_backend } from 'declarations/motoko_project_backend';
import { FaPlusCircle } from "react-icons/fa";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [enteredBy, setEnteredBy] = useState('');

  const fetchProducts = async () => {
    const allProducts = await motoko_project_backend.getAllProducts();
    setProducts(allProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (event) => {
    event.preventDefault();
    await motoko_project_backend.addProduct(name, price, description, enteredBy);
    setName('');
    setPrice(0);
    setDescription('');
    setEnteredBy('');
    fetchProducts();
  };

  return (
    <div className="app-container"> {/* Added app-container */}
      <h1>Ürün Yönetim Sistemi</h1>
      <main>
        <div className="add-product-section"> {/* Applied class add-product-section */}
          <h2>Yeni Ürün Ekle <FaPlusCircle /></h2>
          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              placeholder="Ürün Adı"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Fiyat"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
            <textarea
              placeholder="Açıklama"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Ekleyen Kişi"
              value={enteredBy}
              onChange={(e) => setEnteredBy(e.target.value)}
              required
            />
            <button type="submit">Ekle</button>
          </form>
        </div>
        <div className="product-list-section"> {/* Applied class product-list-section */}
          <h2>Ürün Listesi</h2>
          <table>
            <thead>
              <tr>
                <th>Ürün Adı</th>
                <th>Fiyat</th>
                <th>Açıklama</th>
                <th>Ekleyen Kişi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price} TL</td>
                  <td>{product.description}</td>
                  <td>{product.enteredBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
