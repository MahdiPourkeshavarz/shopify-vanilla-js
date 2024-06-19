import axios from "axios";
import { PRODUCT_URL } from "../api/api";

const container = document.getElementById('app');

export async function productPage(params) {
  container.className = 'flex items-center justify-center min-h-screen bg-gray-100 p-6';
  const productContainer = document.createElement('div');
  productContainer.innerHTML = "";

  let response = "";
  let product = "";
  try {
    response = await axios.get(`${PRODUCT_URL}/${params.data.id}`);

    product = response.data;

  } catch (e) {
    if (e.response) {
      console.log(e.response.statusText);
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log(e.message);
    }
  }


  productContainer.className = 'bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full';

  const img = document.createElement('img');
  img.src = product.img;
  img.alt = product.name;
  img.className = 'w-full h-84 object-cover rounded-t-lg';
  productContainer.appendChild(img);

  const name = document.createElement('h1');
  name.textContent = product.name;
  name.className = 'mt-6 text-3xl font-semibold text-gray-800';
  productContainer.appendChild(name);

  const price = document.createElement('p');
  price.textContent = `Price: $${(product.price / 100).toFixed(2)}`;
  price.className = 'mt-4 text-xl text-gray-600';
  productContainer.appendChild(price);

  const description = document.createElement('p');
  description.textContent = product.description;
  description.className = 'mt-4 text-gray-700';
  productContainer.appendChild(description);


  container.appendChild(productContainer);

  addToCartButton.addEventListener('click', () => {

    alert(`Added ${product.name} to cart`);
  });
}












