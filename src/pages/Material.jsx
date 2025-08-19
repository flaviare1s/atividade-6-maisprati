import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  Chip,
  Rating,
  IconButton,
  Button,
  Skeleton,
  Stack,
  Avatar
} from '@mui/material';
import {
  Add,
  Remove,
  ShoppingCart,
  Favorite,
  LightMode,
  Star,
  Cloud,
  Bolt,
  WaterDrop,
  Diamond,
  LocalFlorist
} from '@mui/icons-material';
import { useCart } from '../hooks/useCart';

const iconMap = {
  'Sticker Coração': Favorite,
  'Sticker Lua': LightMode,
  'Sticker Sol': Star,
  'Sticker Estrela': Star,
  'Sticker Nuvem': Cloud,
  'Sticker Raio': Bolt,
  'Sticker Folha': LocalFlorist,
  'Sticker Gota': WaterDrop,
  'Sticker Diamante': Diamond
};

export const Material = () => {
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Skeleton variant="text" sx={{ fontSize: '3rem', mb: 2 }} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 4 }} />

        <Grid container spacing={4}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                elevation={1}
              >
                <Skeleton
                  variant="circular"
                  width={80}
                  height={80}
                  sx={{ mx: 'auto', mt: 3, mb: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" sx={{ width: '60%' }} />
                </CardContent>
                <CardActions>
                  <Skeleton variant="rectangular" width="100%" height={40} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: 10,
        pb: 6,
        '& .MuiGrid-container': {
          display: 'flex !important',
          flexWrap: 'wrap !important'
        },
        '& .MuiGrid-item': {
          boxSizing: 'border-box !important'
        }
      }}
    >
      <Box textAlign="center" my={6}>
        <Typography variant="h3" component="h1" color="primary" gutterBottom>
          Material UI Category
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3,
          mt: 2,
          width: '100%'
        }}
      >
        {products.map((product) => {
          const IconComponent = iconMap[product.name] || Favorite;
          const quantity = getItemQuantity(product.id);

          return (
            <Box key={product.id} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  height: '100%',
                  width: '100%',
                  minWidth: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: 'none',
                  flex: '1 1 auto'
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3, position: 'relative' }}>
                  {product.status && (
                    <Chip
                      label={product.status === 'novo' ? 'Novo' : 'Promoção'}
                      color={product.status === 'novo' ? 'primary' : 'secondary'}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 1
                      }}
                    />
                  )}

                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main'
                    }}
                  >
                    <IconComponent sx={{ fontSize: 40, color: 'white' }} />
                  </Avatar>

                  <Typography variant="h6" component="h2" gutterBottom>
                    {product.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>

                  <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary" ml={1}>
                      ({product.rating})
                    </Typography>
                  </Box>

                  <Typography variant="h5" color="text.primary" fontWeight="bold">
                    R$ {product.price.toFixed(2)}
                  </Typography>
                </CardContent>

                <CardActions sx={{ mt: 'auto', p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  {quantity === 0 ? (
                    <Button
                      variant="text"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                    >
                      Adicionar
                    </Button>
                  ) : (
                    <Stack
                      direction="row"
                      spacing={1}
                      width="100%"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        <Remove />
                      </IconButton>

                      <Typography variant="h6" color="primary">
                        {quantity}
                      </Typography>

                      <IconButton
                        color="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        <Add />
                      </IconButton>
                    </Stack>
                  )}
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};
