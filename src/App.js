import './App.css';

import {useState, useEffect} from "react";

import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([]);
  const [name,setName] = useState("");
  const [price,setPrice] = useState("");

  //customHook
  const {data: items, httpConfig, loading, error} = useFetch(url);

  //Remover produto
  const handleRemove = (id) => {
    httpConfig(id, "DELETE")
  }

  // useEffect( () => {
  //   async function fetchData() {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setProducts(data);
  //   }
  //   fetchData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name, price
    };

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(product),
    // });

    // const addedProduct = await res.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    httpConfig(product, "POST");

    setName("");
    setPrice("");

  };

  return (
    <div className="App">
      {/* Loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      <h1>Lista de produtos </h1>
      {!loading && 
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
            <button onClick={() => handleRemove(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>}
      <div className = "add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type='text' value={name} name="name" onChange={(e) => setName(e.target.value)}/>
          </label>
          <label>
            Preço:
            <input type='number' value={price} name="price" onChange={(e) => setPrice(e.target.value)}/>
          </label>
          {/* State de loading no post  */}
          {loading && <input type='submit' disabled value="Aguarde" />}
          {!loading && <input type='submit' value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
