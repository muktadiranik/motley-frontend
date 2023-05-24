import "./App.css";
import "./bootstrap.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/Home/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/Home/Product";
import CartScreen from "./components/Cart/CartScreen";
import LoginScreen from "./components/Login/LoginScreen";
import RegistrationScreen from "./components/Registration/RegistrationScreen";
import ProfileScreen from "./components/Profile/ProfileScreen";
import ShippingAddressScreen from "./components/Checkout/ShippingAddressScreen";
import PaymentMethodScreen from "./components/Checkout/PaymentMethodScreen";
import PlaceOrderScreen from "./components/Checkout/PlaceOrderScreen";
import PaymentSuccessScreen from "./components/Checkout/PaymentSuccessScreen";
import OrderScreen from "./components/Order/OrderScreen";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />

        <div className=' container-fluid'>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/products/:id/' element={<Product />} />
            <Route path='/cart/' element={<CartScreen />} />
            <Route path='/login/' element={<LoginScreen />} />
            <Route path='/register/' element={<RegistrationScreen />} />
            <Route path='/profile/' element={<ProfileScreen />} />
            <Route path='/orders/' element={<OrderScreen />} />
            <Route
              path='/shipping-address/'
              element={<ShippingAddressScreen />}
            />
            <Route path='/payment-method/' element={<PaymentMethodScreen />} />
            <Route path='/place-order/' element={<PlaceOrderScreen />} />
            <Route
              path='/payment-success/'
              element={<PaymentSuccessScreen />}
            />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
