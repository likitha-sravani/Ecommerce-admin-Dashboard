const API_BASE = 'http://localhost:8000'; // Change to your backend URL

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/api/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${API_BASE}/api/products/`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data.results || data;
}

export async function getOrders(token) {
  const res = await fetch(`${API_BASE}/api/orders/`, {
    headers: { 'Authorization': `Token ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function checkout(cart, token) {
  const res = await fetch(`${API_BASE}/api/checkout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({ cart })
  });
  if (!res.ok) throw new Error('Checkout failed');
  return res.json();
} 