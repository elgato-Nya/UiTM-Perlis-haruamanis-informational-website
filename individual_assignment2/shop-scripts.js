const products = [
  { id: 1, name: "Harumanis Classic", price: 10, image: "mango1.jpg", description: "Sweet and juicy Harumanis mangoes." },
  { id: 2, name: "Mango Smoothie", price: 15, image: "mango2.jpg", description: "Refreshing mango smoothie made with fresh Harumanis mangoes." },
  { id: 3, name: "Mango Jam", price: 8, image: "mango3.jpg", description: "Delicious homemade mango jam." },
];

let cart = [];

function 

const productList = document.getElementById("productList");
const cartPopup = document.getElementById("cartPopup");
const cartItems = document.getElementById("cartItems");
const grandTotal = document.getElementById("grandTotal");
const checkCartButton = document.getElementById("checkCartButton");
const closeCartButton = document.getElementById("closeCartButton");

// Generate product cards
products.forEach(product => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="content">
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button onclick="toggleDetails(${product.id})">View Details</button>
      </div>
      <div class="details" id="details-${product.id}">
          <p>${product.description}</p>
          <div class="quantity-controls">
              <button onclick="changeQuantity(${product.id}, -1)">-</button>
              <span id="quantity-${product.id}">1</span>
              <button onclick="changeQuantity(${product.id}, 1)">+</button>
          </div>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
  `;

  productList.appendChild(card);
});

function toggleDetails(productId) {
  const details = document.getElementById(`details-${productId}`);
  details.style.display = details.style.display === "block" ? "none" : "block";
}

function changeQuantity(productId, change) {
  const quantityElement = document.getElementById(`quantity-${productId}`);
  let quantity = parseInt(quantityElement.textContent);
  quantity = Math.max(1, quantity + change);
  quantityElement.textContent = quantity;
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent);

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
      existingItem.quantity += quantity;
  } else {
      cart.push({ ...product, quantity });
  }

  alert(`${product.name} added to cart!`);
}

checkCartButton.addEventListener("click", () => {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      cartItems.innerHTML += `
          <p>${item.name} - ${item.quantity} x $${item.price.toFixed(2)} = $${itemTotal.toFixed(2)}</p>
      `;
  });

  const tax = total * 0.1;
  const grandTotalPrice = total + tax;

  grandTotal.innerHTML = `
      Total: $${total.toFixed(2)}<br>
      Tax (10%): $${tax.toFixed(2)}<br>
      Grand Total: $${grandTotalPrice.toFixed(2)}
  `;

  cartPopup.classList.remove("hidden");
});

closeCartButton.addEventListener("click", () => {
  cartPopup.classList.add("hidden");
});
