import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  MenuItem, 
  Button, 
  Box,
  Typography,
  InputAdornment,
  ThemeProvider,
  createTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import PolicyDetails from './components/PolicyDetails';

// Создаем тему в стиле Aviasales
const theme = createTheme({
  palette: {
    primary: {
      main: '#828293',
      contrastText: '#fff',
    },
    background: {
      default: '#1e1a34',
      paper: '#2C2C2E',
    }
  },
  typography: {
    fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#3A3A3C',
          borderRadius: '12px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            }
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '16px',
          borderRadius: '12px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.16)',
            },
          },
        },
      },
    },
  },
});

// Список стран для демонстрации
const countries = [
  'Россия',
  'США',
  'Франция',
  'Италия',
  'Испания',
  'Германия',
  'Великобритания',
  'Япония',
  'Австралия',
];

// Список экстремальных видов спорта
const extremeSports = [
  'Скалолазание',
  'Парашютный спорт',
  'Сноубординг',
  'Серфинг',
  'Рафтинг',
  'Дайвинг',
  'Горные лыжи',
  'Кайтсерфинг',
];

function SearchForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedState = location.state || {};
  
  const [country, setCountry] = useState(savedState.country || '');
  const [sport, setSport] = useState(savedState.sport || '');
  const [startDate, setStartDate] = useState<Date | null>(savedState.startDate || null);
  const [endDate, setEndDate] = useState<Date | null>(savedState.endDate || null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/results', { 
      state: { 
        country, 
        sport, 
        startDate, 
        endDate 
      } 
    });
  };

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      pt: 2
    }}>
      <Container maxWidth="sm" sx={{ px: 2 }}>
        <Typography variant="h4" component="h1" sx={{ 
          color: '#fff',
          fontSize: '28px',
          fontWeight: 700,
          textAlign: 'center',
          mb: 3
        }}>
          Покоряй мир —
          <br />
          мы позаботимся о безопасности
        </Typography>

        <Box sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 3,
          p: 2,
          mb: 3
        }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1.5
            }}>
              <TextField
                select
                label="Куда летим"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
                required={false}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#fff', ml: 0.5, fontSize: 22 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: '14px',
                    color: '#fff',
                    ml: 5,
                    transform: 'translate(0, 16px)',
                    '&.Mui-focused, &.MuiFormLabel-filled': {
                      display: 'none'
                    }
                  },
                  '& .MuiSelect-select': {
                    fontSize: '16px',
                    color: '#fff',
                    pl: 5,
                  },
                  '& .MuiInputAdornment-root': {
                    position: 'absolute',
                    zIndex: 1,
                  },
                  '& .MuiSelect-icon': {
                    color: '#fff'
                  }
                }}
              >
                {countries.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Вид спорта"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                fullWidth
                required={false}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#fff', ml: 0.5, fontSize: 22 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: '14px',
                    color: '#fff',
                    ml: 5,
                    transform: 'translate(0, 16px)',
                    '&.Mui-focused, &.MuiFormLabel-filled': {
                      display: 'none'
                    }
                  },
                  '& .MuiSelect-select': {
                    fontSize: '16px',
                    color: '#fff',
                    pl: 5,
                  },
                  '& .MuiInputAdornment-root': {
                    position: 'absolute',
                    zIndex: 1,
                  },
                  '& .MuiSelect-icon': {
                    color: '#fff'
                  }
                }}
              >
                {extremeSports.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <DatePicker
                  label="Туда"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  format="d MMM"
                  enableAccessibleFieldDOMStructure={false}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: false,
                      sx: {
                        backgroundColor: '#3A3A3C',
                        borderRadius: '12px',
                        '& .MuiInputBase-root': {
                          color: '#fff',
                        },
                        '& .MuiInputBase-input': {
                          color: '#fff !important',
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: '14px',
                          color: '#fff',
                          transform: 'translate(14px, 16px)',
                          '&.Mui-focused, &.MuiFormLabel-filled': {
                            display: 'none'
                          }
                        },
                        '& .MuiIconButton-root': {
                          color: '#fff',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none'
                        }
                      }
                    },
                    popper: {
                      sx: {
                        '& .MuiPaper-root': {
                          backgroundColor: '#2C2C2E',
                          color: '#fff',
                        },
                        '& .MuiPickersDay-root': {
                          color: '#fff',
                          '&.Mui-selected': {
                            backgroundColor: '#0087E9',
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          }
                        },
                        '& .MuiDayCalendar-weekDayLabel': {
                          color: '#fff',
                        },
                        '& .MuiPickersCalendarHeader-label': {
                          color: '#fff',
                        },
                        '& .MuiPickersArrowSwitcher-button': {
                          color: '#fff',
                        },
                        '& .MuiPickersYear-yearButton': {
                          color: '#fff',
                        },
                        '& .MuiPickersCalendarHeader-switchViewButton': {
                          color: '#fff',
                        },
                        '& .MuiYearCalendar-root button': {
                          color: '#fff',
                        },
                        '& .MuiPickersYear-yearButton.Mui-selected': {
                          backgroundColor: '#0087E9',
                        },
                        '& .MuiPickersCalendarHeader-switchViewIcon': {
                          color: '#fff',
                        }
                      }
                    }
                  }}
                />
                <DatePicker
                  label="Обратно"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  minDate={startDate || undefined}
                  format="d MMM"
                  enableAccessibleFieldDOMStructure={false}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: false,
                      sx: {
                        backgroundColor: '#3A3A3C',
                        borderRadius: '12px',
                        '& .MuiInputBase-root': {
                          color: '#fff',
                        },
                        '& .MuiInputBase-input': {
                          color: '#fff !important',
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: '14px',
                          color: '#fff',
                          transform: 'translate(14px, 16px)',
                          '&.Mui-focused, &.MuiFormLabel-filled': {
                            display: 'none'
                          }
                        },
                        '& .MuiIconButton-root': {
                          color: '#fff',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none'
                        }
                      }
                    },
                    popper: {
                      sx: {
                        '& .MuiPaper-root': {
                          backgroundColor: '#2C2C2E',
                          color: '#fff',
                        },
                        '& .MuiPickersDay-root': {
                          color: '#fff',
                          '&.Mui-selected': {
                            backgroundColor: '#0087E9',
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          }
                        },
                        '& .MuiDayCalendar-weekDayLabel': {
                          color: '#fff',
                        },
                        '& .MuiPickersCalendarHeader-label': {
                          color: '#fff',
                        },
                        '& .MuiPickersArrowSwitcher-button': {
                          color: '#fff',
                        },
                        '& .MuiPickersYear-yearButton': {
                          color: '#fff',
                        },
                        '& .MuiPickersCalendarHeader-switchViewButton': {
                          color: '#fff',
                        },
                        '& .MuiYearCalendar-root button': {
                          color: '#fff',
                        },
                        '& .MuiPickersYear-yearButton.Mui-selected': {
                          backgroundColor: '#0087E9',
                        },
                        '& .MuiPickersCalendarHeader-switchViewIcon': {
                          color: '#fff',
                        }
                      }
                    }
                  }}
                />
              </Box>

              <Button 
                variant="contained" 
                type="submit" 
                fullWidth
                sx={{ 
                  mt: 1,
                  height: 48,
                  fontSize: '16px',
                }}
              >
                Найти страховку
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

function ResultsWrapper() {
  const location = useLocation();
  const { country, sport, startDate, endDate } = location.state || {};
  
  return (
    <SearchResults 
      country={country || ''} 
      sport={sport || ''} 
      startDate={startDate} 
      endDate={endDate}
    />
  );
}

function PolicyWrapper() {
  const location = useLocation();
  const policyData = location.state || {};
  
  return <PolicyDetails {...policyData} />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <Router>
          <Routes>
            <Route path="/" element={<SearchForm />} />
            <Route path="/results" element={<ResultsWrapper />} />
            <Route path="/policy" element={<PolicyWrapper />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
