import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  FormControlLabel,
  Radio,
  RadioGroup,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Интерфейс для данных с бэкенда
interface InsuranceOffer {
  id: number;
  name: string;
  price: number;
  type: string;
  coverage_amount: number;
  currency: string;
  duration?: string;
  description?: string;
  features?: string[];
}

// Интерфейс для пропсов
interface SearchResultsProps {
  country: string;
  sport: string;
  startDate: string;
  endDate: string;
}

// Компонент, принимающий пропсы
const SearchResults: React.FC<SearchResultsProps> = ({ country, sport, startDate, endDate }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [offers, setOffers] = useState<InsuranceOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/offers');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке предложений');
      }
      const data = await response.json();
      setOffers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError('Не удалось загрузить предложения');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error">{error}</Typography>
        <Button onClick={fetchOffers} sx={{ mt: 2 }}>
          Попробовать снова
        </Button>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh', 
        py: 2,
        '& *::before': {
          display: 'none'
        }
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3,
            '& > *': {
              marginRight: '0 !important',
              marginLeft: '0 !important'
            }
          }}
        >
          <IconButton 
            onClick={handleBack} 
            sx={{ 
              mr: '16px !important',
              '&::before, &::after': {
                display: 'none'
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography 
            variant="h5" 
            component="h1"
            sx={{
              '&::before, &::after': {
                display: 'none'
              }
            }}
          >
            Найдено {offers.length} предложений
          </Typography>
        </Box>

        <Box sx={{ 
          bgcolor: 'background.paper', 
          p: 2, 
          borderRadius: 1,
          mb: 2
        }}>
          <RadioGroup defaultValue="inTrip">
            <FormControlLabel 
              value="inTrip" 
              control={<Radio />} 
              label="Уже нахожусь в поездке"
            />
            <FormControlLabel 
              value="yearPolicy" 
              control={<Radio />} 
              label="Годовой полис"
            />
          </RadioGroup>

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Валюта
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button 
              variant="outlined" 
              sx={{ minWidth: 80 }}
            >
              USD
            </Button>
            <Button 
              variant="contained" 
              sx={{ minWidth: 80 }}
            >
              EUR
            </Button>
          </Box>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Сумма покрытия
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Button variant="outlined" sx={{ minWidth: 100 }}>
              10 000
            </Button>
            <Button variant="outlined" sx={{ minWidth: 100 }}>
              25 000
            </Button>
            <Button variant="contained" sx={{ minWidth: 100 }}>
              50 000
            </Button>
            <Button variant="outlined" sx={{ minWidth: 100 }}>
              100 000
            </Button>
          </Box>
        </Box>

        {/* Список предложений */}
        {offers.map((offer) => (
          <Card key={offer.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {offer.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {offer.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="h5" color="primary">
                  {offer.price} {offer.currency}
                </Typography>
                <Button variant="contained" color="primary">
                  Выбрать
                </Button>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Покрытие: {offer.coverage_amount} {offer.currency}
                </Typography>
                {offer.duration && (
                  <Typography variant="body2" color="text.secondary">
                    Длительность: {offer.duration}
                  </Typography>
                )}
              </Box>
              {offer.features && offer.features.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Включено:
                  </Typography>
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    {offer.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default SearchResults; 