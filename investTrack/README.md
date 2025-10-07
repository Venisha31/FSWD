# InvestTrack - Virtual Stock Portfolio Simulator

A modern, full-stack web application for virtual stock trading and portfolio management built with the MERN stack.

## 🚀 Features

### Authentication
- User registration and login with JWT
- Secure password hashing with bcrypt
- Protected routes and middleware

### Portfolio Management
- Virtual ₹1,00,000 starting balance for each user
- Real-time stock price tracking via AlphaVantage API
- Holdings management with P&L calculations
- Portfolio value tracking over time

### Trading
- Buy and sell stocks with real-time pricing
- Transaction history with filtering
- Balance validation and error handling

### Watchlist
- Add/remove stocks to personal watchlist
- Live price updates and percentage changes
- Stock details and trading actions

### Analytics Dashboard
- Portfolio performance charts
- Asset allocation visualization
- Monthly returns analysis
- Performance metrics (Sharpe ratio, volatility, etc.)

### Modern UI/UX
- Glassmorphism design with gradients
- Dark/light mode toggle
- Responsive design for all devices
- Smooth animations and transitions
- Real-time notifications

## 🛠 Tech Stack

### Frontend
- **React** - UI framework
- **Modern CSS** - Custom styling with CSS variables
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Router** - Navigation
- **Notistack** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **AlphaVantage API** - Stock data

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- AlphaVantage API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/investtrack
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ALPHA_VANTAGE_KEY=your-alphavantage-api-key
STARTING_BALANCE=100000
```

4. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Portfolio
- `GET /api/portfolio` - Get portfolio overview
- `GET /api/portfolio/holdings` - Get user holdings
- `GET /api/portfolio/analytics` - Get analytics data

### Transactions
- `GET /api/transactions` - Get transaction history
- `POST /api/transactions/buy` - Buy stocks
- `POST /api/transactions/sell` - Sell stocks

### Watchlist
- `GET /api/watchlist` - Get user watchlist
- `POST /api/watchlist/add` - Add stock to watchlist
- `POST /api/watchlist/remove` - Remove stock from watchlist

### Stock Data
- `GET /api/stock/quote/:symbol` - Get stock quote
- `GET /api/stock/history/:symbol` - Get historical data

## 🎨 Design Features

### Modern UI Components
- Glassmorphism cards with backdrop blur
- Gradient backgrounds and borders
- Smooth hover animations
- Responsive grid layouts
- Custom form inputs and buttons

### Color Scheme
- Light and dark theme support
- CSS custom properties for easy theming
- Consistent color palette throughout

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Flexible grid systems
- Touch-friendly interactions

## 📱 Pages

1. **Dashboard** - Portfolio overview with key metrics and charts
2. **Holdings** - Current stock holdings with P&L
3. **Transactions** - Trading history with filters
4. **Watchlist** - Stock watchlist with live prices
5. **Analytics** - Detailed portfolio analysis and charts

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable management

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Configure MongoDB connection

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- AlphaVantage for providing stock market data
- Lucide for the beautiful icons
- Recharts for the charting library
- The React and Node.js communities

## 📞 Support

For support or questions, please open an issue in the GitHub repository.
