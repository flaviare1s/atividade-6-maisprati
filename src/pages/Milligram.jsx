import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { Heart, Moon, Sun, Star, Cloud, Zap, Leaf, Droplet, Diamond } from 'lucide-react';
import styles from './Milligram.module.css';

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

export const Milligram = () => {
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

  const getProductIcon = (productName) => {
    const IconComponent = iconMap[productName];
    return IconComponent ? <IconComponent size={48} /> : <Star size={48} />;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#f39c12' : '#d1d1d1' }}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className={styles.milligram}>
        <div className={styles.container} style={{ paddingTop: '8rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2>Loading...</h2>
            <p>Carregando produtos...</p>
          </div>

          <div className={styles.row}>
            {[...Array(9)].map((_, index) => (
              <div className={`${styles.column} ${styles.column33}`} key={index}>
                <div className={styles.skeletonCard}>
                  <div className={styles.skeletonCircle}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonLine}></div>
                  <div className={styles.skeletonBlock}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.milligram}>
      <div className={styles.container} style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>Milligram Category</h2>
        </div>

        <div className={styles.row}>
          {products.map((product) => {
            const quantity = getItemQuantity(product.id);

            return (
              <div className={`${styles.column} ${styles.column33}`} key={product.id}>
                <div className={styles.card}>
                  {product.status && (
                    <div className={`${styles.badge} ${product.status === 'novo' ? '' : styles.badgeSecondary}`}>
                      {product.status === 'novo' ? 'Novo' : 'Promoção'}
                    </div>
                  )}

                  <div className={styles.cardContent}>
                    <div className={styles.productIcon}>
                      {getProductIcon(product.name)}
                    </div>

                    <h4>{product.name}</h4>
                    <p>{product.description}</p>

                    <div className={styles.rating}>
                      <span className={styles.stars}>{renderStars(product.rating)}</span>
                      <span className={styles.ratingText}>({product.rating})</span>
                    </div>

                    <div className={styles.price}>
                      R$ {product.price.toFixed(2)}
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    {quantity === 0 ? (
                      <button
                        className={`${styles.button} ${styles.buttonOutline}`}
                        onClick={() => handleAddToCart(product)}
                        style={{ width: '100%' }}
                      >
                        Adicionar
                      </button>
                    ) : (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem'
                      }}>
                        <button
                          className={`${styles.button} ${styles.buttonOutline} ${styles.quantityButton}`}
                          onClick={() => handleRemoveFromCart(product.id)}
                        >
                          −
                        </button>

                        <span className={styles.quantity}>
                          {quantity}
                        </span>

                        <button
                          className={`${styles.button} ${styles.buttonOutline} ${styles.quantityButton}`}
                          onClick={() => handleAddToCart(product)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
