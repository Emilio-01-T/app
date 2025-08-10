import { AuthProvider } from './hooks/useAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import ChatContainer from './components/Chat/ChatContainer';
import { useAuth } from './hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <ChatContainer />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default App;
