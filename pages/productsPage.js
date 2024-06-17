import axios from "axios";
import { PRODUCT_URL } from "../api/api";

const container = document.getElementById('app');


export function productsPage() {
  container.innerHTML = "";
  container.className = 'flex items-center flex-col my-6 w-full';

  const heading = document.createElement('h1');
  heading.className = 'text-2xl font-bold text-center text-gray-800 mb-8';
  heading.textContent = 'Our Products';
  container.appendChild(heading);

  const searchContainer = document.createElement('div');
  searchContainer.className = 'flex mx-auto w-fit relative';

  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'name';
  input.id = 'search-input';
  input.placeholder = 'Enter a name...';
  input.required = true;
  input.className = 'w-80 border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500';
  searchContainer.appendChild(input);

  const searchBtn = document.createElement('img');
  searchBtn.src = './assets/search.png';
  searchBtn.alt = '_';
  searchBtn.id = 'search-btn';
  searchBtn.className = 'w-5 h-5 absolute right-4 top-3 cursor-pointer';
  searchContainer.appendChild(searchBtn);

  container.appendChild(searchContainer);

  const productsContainer = document.createElement('div');
  productsContainer.id = 'products-container';
  productsContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12';
  container.appendChild(productsContainer);
  fetchProducts(input.value);
}


async function fetchProducts(searchKey) {
  let response = "";
  let result = "";
  try {
    if (searchKey !== "") {
      response = await fetch(`${PRODUCT_URL}?name=${searchKey}`);
    } else {
      response = await fetch(PRODUCT_URL)
    }

    if (response.ok) {
      result = await response.json();
      result = result.sort((a, b) => {
        return a.id - b.id;
      })
    } else if (!response.ok) {
      console.log(response.statusText)
    }

  } catch (e) {
    console.log(e)
  }
  const productsContainer = document.getElementById('products-container');
  // biome-ignore lint/complexity/noForEach: <explanation>
  result.forEach(product => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow-lg p-6';

  const img = document.createElement('img');
  img.src = product.img;
  img.alt = product.name;
  img.className = 'w-full h-48 object-cover rounded-t-lg';


  const name = document.createElement('h2');
  name.textContent = product.name;
  name.className = 'mt-4 text-xl font-semibold text-gray-800';

  const price = document.createElement('p');
  price.textContent = `Price: $${(product.price / 100).toFixed(2)}`;
  price.className = 'mt-2 text-gray-600';

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(price);

  return card;
}

