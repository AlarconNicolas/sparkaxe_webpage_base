import {BrowserRouter, Route, Routes} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

// *********** PAGES ***********
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Orders from "./pages/Orders/Orders";
import ConfirmOrder from "./pages/Pay/ConfirmOrder";
import ConfirmAccount from "./pages/User/ConfirmAccount";
import ResetPassword from "./pages/User/ResetPassword";
import InformationOrder from "./pages/Pay/InformationOrder";
import Product from "./pages/Product/Product";
import ScrollToTop from "./helpers/ScrollToTop";
import ForgotPassword from "./pages/User/ForgotPassword";
import ConfirmSend from "./pages/User/ConfirmSend";
import OrderDone from "./pages/Pay/OrderDone";
import POS from "./pages/POS/POS";
import POSRegister from "./pages/POSRegister/POSRegister";
import Store from "./pages/Store/Store";
import ProductPet from "./pages/ProductPet/ProductPet";
import PaymentError from "./pages/PaymentError/PaymentError";
import StoreSearch from "./pages/StoreSearch/StoreSearch";
import Links from "./pages/Links/Link";

// ***************** Layouts *****************
import Layout from "./layouts/layout";
import ProtectedLayout from "./layouts/ProtectedLayout";

// ***************** Providers *****************
import {AppProvider} from "./providers/AppProvider";

function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<ScrollToTop/>
				<Routes> {/* Ruta principal que usa el Layout con el Navbar */}
					<Route path="links"
						element={<Links/>}/>
					<Route path="/"
						element={<Layout/>}>
						{/* Rutas anidadas bajo el Layout para mantener el Navbar */}
						<Route index
							element={<Home/>}/>
						<Route path="store"
							element={<Store/>}/>
						<Route path="storesearch"
							element={<StoreSearch/>}/>
						<Route path="about"
							element={<About/>}/>
						<Route path="contact"
							element={<Contact/>}/>
						<Route path="pos"
							element={<POS/>}/>
						<Route path="pos-register"
							element={<POSRegister/>}/>
						<Route path="payment-error"
							element={<PaymentError/>}/>

						<Route path="login"
							element={<Login/>}/>
						<Route path="signup"
							element={<Signup/>}/>
						<Route path="confirm-account/:token"
							element={<ConfirmAccount/>}/>
						<Route path="forgot-password"
							element={<ForgotPassword/>}/>
						<Route path="confirm-send"
							element={<ConfirmSend/>}/>
						<Route path="reset-password/:token"
							element={<ResetPassword/>}/> {/*******************************  Only authenticated users  *******************************/}
						<Route path="/"
							element={<ProtectedLayout/>}>
							<Route path="orders"
								element={<Orders/>}/>
							<Route path="confirm-order"
								element={<ConfirmOrder/>}/>
							<Route path="information-order"
								element={<InformationOrder/>}/>
							<Route path="order-done"
								element={<OrderDone/>}/>
						</Route>

						{/* Ruta para productos */}
						<Route path="product/:name/:id"
							element={<Product/>}/>
						<Route path="productpet/:name/:id"
							element={<ProductPet/>}/> {/* Ruta para categorías */} </Route>
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}

export default App;
