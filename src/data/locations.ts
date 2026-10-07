/**
 * Partial suggestion lists only — NOT a complete Philippine location dataset.
 * Every location input also accepts free text.
 */
export const provinceSuggestions = [
'Surigao del Sur',
'Surigao del Norte',
'Agusan del Norte',
'Agusan del Sur',
'Dinagat Islands',
'Davao del Norte',
'Bukidnon',
'Leyte',
'Bohol',
'Iloilo',
'Nueva Ecija',
'Isabela',
'Pangasinan'];


export const citySuggestions: Record<string, string[]> = {
  'Surigao del Sur': ['Tandag City', 'Bislig City', 'Barobo', 'Cantilan', 'Carrascal', 'Hinatuan', 'Lianga', 'San Miguel', 'Tago'],
  'Surigao del Norte': ['Surigao City', 'Mainit', 'Placer', 'Alegria'],
  'Agusan del Norte': ['Butuan City', 'Cabadbaran City', 'Buenavista', 'Nasipit'],
  'Agusan del Sur': ['Bayugan City', 'Prosperidad', 'San Francisco', 'Trento']
};

export const barangaySuggestions: Record<string, string[]> = {
  'Tandag City': ['Telaje', 'Mabua', 'Bag-ong Lungsod', 'Bioto', 'Dagocdoc', 'Awasian', 'Rosario', 'Pangi', 'San Agustin Norte'],
  Tago: ['Poblacion', 'Cabangahan', 'Unaban']
};