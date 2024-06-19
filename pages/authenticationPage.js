import { USER_URL } from "../api/api";
import { router, routes } from "../main";


const container = document.getElementById('app');
export function authenticationPage() {
  container.innerHTML = "";
  container.className = 'flex items-center justify-center min-h-screen bg-gray-100';

  const formContainer = document.createElement('div');
  formContainer.className = 'bg-white p-8 rounded-lg shadow-lg w-full max-w-md';

  const heading = document.createElement('h1');
  heading.className = 'text-2xl font-bold text-center text-gray-800 mb-8';
  heading.textContent = 'Authentication';
  formContainer.appendChild(heading);

  const form = document.createElement('form');
  form.className = 'space-y-4';

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'email';
  emailInput.placeholder = 'Email';
  emailInput.required = true;
  emailInput.className = 'w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500';
  form.appendChild(emailInput);


  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.name = 'password';
  passwordInput.placeholder = 'Password';
  passwordInput.required = true;
  passwordInput.className = 'w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500';
  form.appendChild(passwordInput);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'w-full bg-blue-500 text-white rounded-lg h-10 hover:bg-blue-600';
  submitButton.textContent = 'Log In';
  form.appendChild(submitButton);

  const switchButton = document.createElement('button');
  switchButton.type = 'button';
  switchButton.className = 'w-full mt-4 text-blue-500';
  switchButton.textContent = 'Switch to Sign Up';
  formContainer.appendChild(switchButton);

  formContainer.appendChild(form);

  container.appendChild(formContainer);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const endpoint = submitButton.textContent === 'Log In' ? 'signin' : 'register';

    try {
      const response = await fetch(`${USER_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const token = data.accessToken;
      localStorage.setItem('token', token);
      router.navigate(routes.products);

    } catch (error) {
      console.error('Error:', error);
    }
  });

  switchButton.addEventListener('click', () => {
    const isLogin = submitButton.textContent === 'Log In';
    submitButton.textContent = isLogin ? 'Sign Up' : 'Log In';
    switchButton.textContent = isLogin ? 'Switch to Log In' : 'Switch to Sign Up';
  });
}