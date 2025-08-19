import { useState, useEffect } from 'react';
import { Heart, Moon, Sun, Star, Cloud, Zap, Leaf, Droplet, Diamond, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import 'bootstrap/dist/css/bootstrap.min.css';

// CSS inline para garantir a fonte do Bootstrap
const bootstrapFontStyle = {
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif'
};

const iconMap = {
  'Sticker Coração': Heart,
  'Sticker Lua': Moon,
  'Sticker Sol': Sun,
  'Sticker Estrela': Star,
  'Sticker Nuvem': Cloud,
  'Sticker Raio': Zap,
  'Sticker Folha': Leaf,
  'Sticker Gota': Droplet,
  'Sticker Diamante': Diamond
};

export const Bootstrap = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar produtos:', error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'text-warning' : 'text-muted'}>
        ★
      </span>
    ));
  };

  const getStatusBadge = (status) => {
    if (status === 'novo') {
      return <span className="badge bg-warning">Novo</span>;
    }
    if (status === 'promo') {
      return <span className="badge bg-success">Promoção</span>;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3">Carregando produtos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-theme-background"
      style={bootstrapFontStyle}
    >
      <div className="container-fluid mt-5 pt-5">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-primary mb-3">Bootstrap Category</h2>
        </div>

        <div className="row g-4">
          {products.map((product) => {
            const IconComponent = iconMap[product.name] || Heart;
            const quantity = getItemQuantity(product.id);

            return (
              <div key={product.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0 bg-theme-surface">
                  {product.status && (
                    <div className="position-absolute top-0 end-0 m-3" style={{ zIndex: 1 }}>
                      {getStatusBadge(product.status)}
                    </div>
                  )}

                  <div className="card-body d-flex flex-column text-center">
                    <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '120px' }}>
                      <IconComponent size={80} className="text-primary" />
                    </div>

                    <h5 className="card-title text-dark fw-bold mb-3">
                      {product.name}
                    </h5>

                    {product.description && (
                      <p className="card-text text-secondary small mb-3 flex-grow-1">
                        {product.description}
                      </p>
                    )}

                    <div className="mb-3">
                      {renderStars(product.rating)}
                      <small className="text-theme-secondary ms-2">({product.rating}/5)</small>
                    </div>

                    <div className="mb-3">
                      <h4 className="text-success fw-bold mb-0">
                        R$ {product.price.toFixed(2)}
                      </h4>
                    </div>

                    <div className="mt-auto">
                      <div className="d-grid border rounded-xl">
                        {quantity === 0 ? (
                          <button
                            className="btn btn-primary d-flex items-center justify-content-center"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="mr-2" />
                            Adicionar ao Carrinho
                          </button>
                        ) : (
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleRemoveFromCart(product.id)}
                            >
                              −
                            </button>
                            <button className="btn btn-light" disabled>
                              {quantity}
                            </button>
                            <button
                              className="btn btn-outline-success"
                              onClick={() => handleAddToCart(product)}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row mt-5 mb-4">
        </div>
      </div>
    </div>
  );
};
