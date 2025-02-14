import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";

const Cart = ({ cart, onRemoveFromCart }) => {
  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛒 Your Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          <Card className="p-3 shadow-sm">
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h5>{item.name}</h5>
                    <p className="text-muted">Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onRemoveFromCart(item.id)}>
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          <Card className="p-3 mt-3 shadow-sm">
            <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
            <Button variant="success" className="w-100 mt-2">
              Proceed to Checkout
            </Button>
          </Card>
        </>
      ) : (
        <p className="text-muted">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
