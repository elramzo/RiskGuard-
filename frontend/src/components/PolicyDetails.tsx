import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface PolicyDetailsProps {
  company: string;
  price: number;
  coverage: number;
  features: string[];
  country: string;
  sport: string;
  startDate: Date | null;
  endDate: Date | null;
}

const PolicyDetails: React.FC<PolicyDetailsProps> = ({
  company,
  price,
  coverage,
  features,
  country,
  sport,
  startDate,
  endDate,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return format(date, 'd MMMM yyyy', { locale: ru });
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: 2, pb: 4 }}>
      <Container maxWidth="sm">
        {/* Шапка с кнопкой назад */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handleBack}
            sx={{
              color: '#fff',
              p: 0,
              '&:hover': {
                backgroundColor: 'transparent',
                opacity: 0.8,
              },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 28 }} />
          </IconButton>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            Страховой полис
          </Typography>
        </Box>

        {/* Основная карточка */}
        <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, mb: 2 }}>
          <CardContent sx={{ p: 3 }}>
            {/* Заголовок с ценой */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>
                {company}
              </Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                  {price} ₽
                </Typography>
              </Box>
            </Box>

            {/* Информация о поездке */}
            <List sx={{ mb: 2 }}>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <LocationOnIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={country}
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      color: '#fff'
                    }
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <SportsMartialArtsIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={sport}
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      color: '#fff'
                    }
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <CalendarTodayIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={`${formatDate(startDate)} — ${formatDate(endDate)}`}
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      color: '#fff'
                    }
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <SecurityIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={`Страховое покрытие до ${coverage.toLocaleString()} €`}
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      color: '#fff'
                    }
                  }}
                />
              </ListItem>
            </List>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', my: 2 }} />

            {/* Список включенных опций */}
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              Включено в страховку:
            </Typography>
            <List>
              {features.map((feature, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircleIcon sx={{ color: '#4CAF50' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={feature}
                    sx={{ 
                      '& .MuiListItemText-primary': { 
                        color: '#fff'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Кнопки действий */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              height: 48,
              fontSize: '16px',
            }}
          >
            Оформить полис
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              height: 48,
              fontSize: '16px',
              borderColor: 'rgba(255, 255, 255, 0.23)',
              color: '#fff',
              '&:hover': {
                borderColor: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            Скачать условия страхования
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PolicyDetails; 