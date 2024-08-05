// Get references to DOM elements
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let cartTab = document.querySelector(".cartTab");
let cartItemsContainer = document.querySelector(".cartItems");

// Initialize cart from localStorage or create an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to toggle the cart visibility
iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

// Function to update the cart count displayed on the cart icon
function updateCartCount() {
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  iconCartSpan.innerText = totalQuantity;
}

// Function to add an item to the cart
function addItemToCart(product) {
  let existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// Function to render cart items in the cart tab
function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  cart.forEach(item => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("item");
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" width="50" />
      </div>
      <div class="cart-item-details">
        <div>${item.name}</div>
        <div>Rs.${item.price} x ${item.quantity}</div>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
}

// Add event listeners to add-to-cart buttons
document.querySelectorAll(".column").forEach(column => {
  column.addEventListener("click", () => {
    let product = {
      id: column.dataset.id,
      name: column.dataset.name,
      price: column.dataset.price,
      image: column.dataset.image, // Get the image URL from the data attribute
    };
    addItemToCart(product);
  });
});

// Initialize cart display on page load
updateCartCount();
renderCartItems();
