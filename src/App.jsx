import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import store from "./core/redux/store/store";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import PrivateRoute from "./routes/PrivateRoute";
import RecipePage from "./pages/RecipePage/RecipePage";
import CreateRecipePage from "./pages/CreateRecipePage/CreateRecipePage";
import HomePage from "./pages/HomePage/HomePage";
import ContactPage from "./pages/ContactPage/ContactPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recipe/:recipeId" element={<RecipePage />} />
          <Route path="/home" element={<HomePage   />} />
          <Route path="/contact" element={<ContactPage   />} />
          
          
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateRecipePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
