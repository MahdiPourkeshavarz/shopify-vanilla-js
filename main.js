import { authenticationPage } from './pages/authenticationPage'
import { homePage } from './pages/homePage'
import { productPage } from './pages/productPage'
import { productsPage } from './pages/productsPage'
import "./output.css";
import Navigo from 'navigo'


export const routes = {
  home: "/",
  products: "/products",
  productDetails: "/products/:id",
  authentication: "/auth"
}

export const router = new Navigo("/");

router
  .on(routes.home, homePage())
  .on(routes.products, productsPage())
  .on(routes.productDetails, (match) => productPage(match))
  .on(routes.authentication, authenticationPage())
  .resolve();

