import React from 'react';

function MenuItem({ item, quantity, addItem, removeItem }) {
  const { title, description, imageName, price } = item;

  return (
    <div className="menu-item d-flex align-items-center">
      <img 
        src={`${process.env.PUBLIC_URL}/images/${imageName}`} 
        alt={title} 
        className="menu-image rounded"
        style={{ width: '100px', height: '100px' }}
      />
      <div className="menu-details flex-grow-1">
        <h3 className="fw-bold">{title}</h3>
        <p className="text-muted">{description}</p>
        <span className="fw-bold">${price.toFixed(2)}</span>
      </div>

      <div className="quantity-controls d-flex flex-column align-items-center ms-3">
        <button className="circular-button" onClick={addItem}>+</button>
        <span className="fw-bold">{quantity}</span>
        <button className="circular-button" onClick={removeItem} disabled={quantity === 0}>−</button>
      </div>
    </div>
  );
}

export default MenuItem;
