import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './frontend/src/components/layout/Navbar';
import Footer from './frontend/src/components/layout/Footer';
import Home from './frontend/src/pages/Home';
import Explore from './frontend/src/pages/Explore';
import AssetDetail from './frontend/src/pages/AssetDetail';
import Learn from './frontend/src/pages/Learn';
import SignIn from './frontend/src/pages/SignIn';
import SignUp from './frontend/src/pages/SignUp';
import AdvancedTrading from './frontend/src/pages/AdvancedTrading';
import Dashboard from './frontend/src/pages/Dashboard';
import { AuthProvider, useAuth } from './frontend/src/context/AuthContext';
import { LivePricesProvider } from './frontend/src/context/LivePriceContext';
import { TransactionsProvider } from './frontend/src/context/TransactionContext';

const AUTH_ROUTES = ['/signin', '/signup'];

function PrivateRoute({ children }) {
  const { user, authLoading } = useAuth();
  if (authLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        Checking authentication...
      </div>
    );
  }
  return user ? children : <Navigate to="/signin" replace />;
}


function AppLayout() {
  const location = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/asset/:id" element={<AssetDetail />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/advanced-trading" element={<AdvancedTrading />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LivePricesProvider>
        <TransactionsProvider>
          <Router>
            <AppLayout />
          </Router>
        </TransactionsProvider>
      </LivePricesProvider>
    </AuthProvider>
  );
}

export default App;
