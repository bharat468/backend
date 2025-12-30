import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import instance from '../axiosConfig';

const Product = () => {
    const [ products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        setLoading(true);
        const response = await instance.get("/product");
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
    }

    return (
      <>
        {loading && <p className="loading">Loading...</p>}
        <div className="product-container">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} slug={product.slug} />
          ))}
        </div>
      </>
    );

}

export default Product;