import './App.css';
import MenuItem from './components/MenuItem';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.

// Menu data. An array of objects where each object represents a menu item. Each menu item has an id, title, description, image name, and price.
// You can use the image name to get the image from the images folder.
const menuItems = [
  {
    id: 1,
    title: 'Gyoza',
    description: 'Japanese dumplings',
    imageName: 'gyoza.png',
    price: 5.99,
  },
  {
    id: 2,
    title: 'Sushi',
    description: 'Japanese rice rolls',
    imageName: 'sushi.png',
    price: 6.99,
  },
  {
    id: 3,
    title: 'Ramen',
    description: 'Japanese noodle soup',
    imageName: 'ramen.png',
    price: 7.99,
  },
  {
    id: 4,
    title: 'Matcha Cake',
    description: 'Japanese green tea cake',
    imageName: 'matcha-cake.png',
    price: 4.99,
  },
  {
    id: 5,
    title: 'Mochi',
    description: 'Japanese rice cake',
    imageName: 'mochi.png',
    price: 3.99,
  },
  {
    id: 6,
    title: 'Yakitori',
    description: 'Japanese skewered chicken',
    imageName: 'yakitori.png',
    price: 2.99,
  },
  {
    id: 7,
    title: 'Takoyaki',
    description: 'Japanese octopus balls',
    imageName: 'takoyaki.png',
    price: 5.99,
  },
  {
    id: 8,
    title: 'Sashimi',
    description: 'Japanese raw fish',
    imageName: 'sashimi.png',
    price: 8.99,
  },
  {
    id: 9,
    title: 'Okonomiyaki',
    description: 'Japanese savory pancake',
    imageName: 'okonomiyaki.png',
    price: 6.99,
  },
  {
    id: 10,
    title: 'Katsu Curry',
    description: 'Japanese curry with fried pork',
    imageName: 'katsu-curry.png',
    price: 9.99,
  }
];

function App() {
  const [cart, setCart] = useState({}); // Object to store item quantities { id: quantity }

  // Function to add an item to the cart
  const addItem = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1
    }));
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    setCart((prevCart) => {
      if (!prevCart[id]) return prevCart; // Prevent negative values
      const updatedCart = { ...prevCart };
      if (updatedCart[id] === 1) {
        delete updatedCart[id]; // Remove item if quantity is 0
      } else {
        updatedCart[id] -= 1;
      }
      return updatedCart;
    });
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart({});
  };

  // Function to calculate the total price
  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const item = menuItems.find((menuItem) => menuItem.id === Number(id));
      return total + item.price * quantity;
    }, 0).toFixed(2);
  };

  // Function to place an order
  const placeOrder = () => {
    if (Object.keys(cart).length === 0) {
      alert('No items in cart');
      return;
    }

    let orderSummary = 'Order placed! Here is your receipt:\n\n';
    menuItems.forEach((item) => {
      if (cart[item.id]) {
        orderSummary += `${cart[item.id]}x ${item.title} - $${(item.price * cart[item.id]).toFixed(2)}\n`;
      }
    });

    orderSummary += `\nTotal: $${calculateTotal()}`;
    alert(orderSummary);

    clearCart(); // Clear cart after placing order
  };

  return (
    <div className="container">
      <div className="header">
        <img src="https://www.oscampuscafe.com/wp-content/uploads/2019/11/os-campus-cafe-logo-2x.png" alt="Campus Cafe Logo" />
        <p>Delicious, From-Scratch Recipes Close at Hand</p>
        <h2>The Fresh Choice of UT!</h2>
      </div>

      <div className="menu">
        {menuItems.map((item) => (
          <MenuItem 
            key={item.id}
            item={item}
            quantity={cart[item.id] || 0}
            addItem={() => addItem(item.id)}
            removeItem={() => removeItem(item.id)}
          />
        ))}
      </div>

      <div className="cart">
        <h3>Cart Summary</h3>
        <p>Total: ${calculateTotal()}</p>
        <div className="cart-buttons"> {/* New div for buttons */}
          <button className="order-button" onClick={placeOrder}>Order</button>
          <button className="clear-button" onClick={clearCart}>Clear All</button>
      </div>
    </div>
    </div>
  );
}


export default App;
