import axios from "axios";
import { PRODUCT_URL } from "../api/api";
import { router, routes } from "../main";

const container = document.getElementById('app');


export function productsPage() {
  const token = localStorage.getItem('token');
  if (token) {
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
    searchBtn.addEventListener('click', () => {
      fetchProducts(input.value);
    })


    const productsContainer = document.createElement('div');
    productsContainer.id = 'products-container';
    productsContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12';
    container.appendChild(productsContainer);
    fetchProducts("");
  } else {
    container.innerHTML = "";
    container.className = 'flex items-center justify-center min-h-screen bg-gray-100';

    const card = document.createElement('div');
    card.className = 'bg-white p-8 rounded-lg shadow-lg text-center';

    const message = document.createElement('h1');
    message.className = 'text-2xl font-bold text-red-500 mb-4';
    message.textContent = 'You are not authorized';

    const button = document.createElement('button');
    button.className = 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700';
    button.textContent = 'Go to Authentication Page';
    button.addEventListener('click', () => {
      router.navigate(routes.authentication)
    });

    card.appendChild(message);
    card.appendChild(button);

    container.appendChild(card);
  }
}


async function fetchProducts(searchKey) {
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = "";
  let result = "";
  try {
    const url = searchKey !== "" ? `${PRODUCT_URL}?name=${searchKey}` : PRODUCT_URL;

    const response = await axios.get(url);

    result = response.data;
    result = result.sort((a, b) => {
      return a.id - b.id;
    });
  } catch (e) {
    if (e.response) {
      console.log(e.response.statusText);
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log(e.message);
    }
  }

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
  const link = document.createElement('a');
  link.href = `/products/${product.id}`;
  link.className = "w-fit"
  link.append(img);

  const name = document.createElement('h2');
  name.textContent = product.name;
  name.className = 'mt-4 text-xl font-semibold text-gray-800';

  const price = document.createElement('p');
  price.textContent = `Price: $${(product.price / 100).toFixed(2)}`;
  price.className = 'mt-2 text-gray-600';

  card.appendChild(link);
  card.appendChild(name);
  card.appendChild(price);


  return card;
}
