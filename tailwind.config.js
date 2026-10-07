export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#236B3B', dark: '#173D27', soft: '#E4F0E3' },
        canvas: '#F2F7F0',
        card: '#FFFFFF',
        line: '#DFE8DF',
        accent: { DEFAULT: '#E7B844', soft: '#FBF1D3', ink: '#6B4E00' },
        ink: { DEFAULT: '#202B23', muted: '#647168' },
        danger: { DEFAULT: '#B42318', soft: '#FDECEA' },
        warn: { DEFAULT: '#8A5300', soft: '#FFF2D6' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(23,61,39,0.05), 0 2px 10px rgba(23,61,39,0.05)',
        nav: '0 -2px 14px rgba(23,61,39,0.07)',
        cta: '0 6px 20px rgba(35,107,59,0.22)',
      },
    },
  },
};
