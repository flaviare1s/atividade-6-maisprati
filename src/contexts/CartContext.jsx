import { useReducer, useEffect } from 'react';
import { CartContext } from './CartContextCreate';

// Reducer para gerenciar ações do carrinho
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalQuantity: state.totalQuantity + 1
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        totalQuantity: state.totalQuantity + 1
      };
    }
    case 'REMOVE_FROM_CART': {
      const item = state.items.find(item => item.id === action.payload.id);
      if (!item) return state;

      if (item.quantity === 1) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
          totalQuantity: state.totalQuantity - 1
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        totalQuantity: state.totalQuantity - 1
      };
    }
    case 'CLEAR_CART':
      return {
        items: [],
        totalQuantity: 0
      };
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
};

const initialState = {
  items: [],
  totalQuantity: 0
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('styled-store-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
  }, []);

  // Salvar no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('styled-store-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (productId) => {
    const item = cart.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const getTotalPrice = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getItemQuantity,
    getTotalPrice,
    totalQuantity: cart.totalQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};


