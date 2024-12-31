import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { addProduct, editProduct } from './redux/reducer';
import { Product } from './redux/reducer';

interface ProductFormProps {
  existingProduct?: Product;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ existingProduct, onClose }) => {
  const [name, setName] = useState(existingProduct?.name || '');
  const [price, setPrice] = useState(existingProduct?.price || 0);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingProduct) {
      dispatch(editProduct({ ...existingProduct, name, price }));
    } else {
      dispatch(addProduct({ id: Date.now(), name, price, quantity: 0 }));
    }
    onClose();
  };

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setPrice(existingProduct.price);
    }
  }, [existingProduct]);

  return (
    <form onSubmit={handleSubmit}>
      <h3>{existingProduct ? 'Edit Product' : 'Add Product'}</h3>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </label>
      </div>
      <button type="submit">{existingProduct ? 'Save Changes' : 'Add Product'}</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default ProductForm;
