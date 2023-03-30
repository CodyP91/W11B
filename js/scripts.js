document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const cartDiv = document.querySelector('.cart');
    const clearCartBtn = document.getElementById('clear-cart');

    const products = [
      { id: 1, name: 'Product 1', image: 'product1.jpg', price: 10 },
      { id: 2, name: 'Product 2', image: 'product2.jpg', price: 20 },
      { id: 3, name: 'Product 3', image: 'product3.jpg', price: 30 },
    ];
  
    function displayProducts() {
      products.forEach(product => {
        const productCard = `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        `;
        productGrid.innerHTML += productCard;
      });
    }
  
    function getProductById(id) {
      return products.find(product => product.id === parseInt(id));
    }
  
    function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    function displayCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length === 0) {
        cartDiv.innerHTML = "<p>You don't have anything picked.</p>";
      } else {
        cartDiv.innerHTML = '';
        cart.forEach((item, index) => {
          const cartItem = `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}">
              <span>${item.name} - $${item.price}</span>
              <button class="delete-item" data-index="${index}">Delete</button>
            </div>
          `;
          cartDiv.innerHTML += cartItem;
        });
      }
    }
  
    function deleteItem(index) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart();
    }
  
    function clearCart() {
      localStorage.removeItem('cart');
      displayCart();
    }
  
    if (productGrid) {
      displayProducts();
  
      productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
          const id = e.target.dataset.id;
          const product = getProductById(id);
          addToCart(product);
        }
      });
    }
  
    if (cartDiv) {
      displayCart();
  
      cartDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-item')) {
          const index = e.target.dataset.index;
          deleteItem(index);
        }
      });
    }
  
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', clearCart);
    }
  });