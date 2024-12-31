import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { deleteProduct, addToCart } from './redux/reducer';
import ProductForm from './ProductForm';
import { Product } from './redux/reducer';

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch<AppDispatch>();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const openForm = (product?: Product) => {
    setEditingProduct(product || null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={() => openForm()}>Add New Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => dispatch(addToCart(product.id))}>Add to Cart</button>
            <button onClick={() => openForm(product)}>Edit</button>
            <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
          </li>
        ))}
      </ul>
      {isFormOpen && (
        <ProductForm
          existingProduct={editingProduct || undefined}
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default ProductList;
