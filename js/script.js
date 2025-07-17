document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('#selling-page .product-item button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.parentNode;
            const productName = productItem.querySelector('h3').textContent;
            const productPriceText = productItem.querySelector('p:nth-child(3)').textContent; // Assuming price is the 3rd paragraph
            const productPrice = parseFloat(productPriceText.replace('Price: ₹', ''));

            const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
            cartItems.push({ name: productName, price: productPrice });
            localStorage.setItem('cart', JSON.stringify(cartItems));

            alert(`${productName} added to cart! (Basic functionality for now)`);
            updateCartCount(); // We'll create this function next
        });
    });

    // Function to update the cart count in the header (we'll refine this later)
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCountSpan = document.getElementById('cart-count'); // We'll add this to the header later
        if (cartCountSpan) {
            cartCountSpan.textContent = cartItems.length;
        }
    }

    // Initial call to update cart count when the page loads
    updateCartCount();
    
    // Function to display cart items on the cart page
        function displayCartItems() {
            const cartItemsContainer = document.getElementById('cart-items');
            const cartSubtotalSpan = document.getElementById('cart-subtotal');

            if (cartItemsContainer && cartSubtotalSpan) {
                const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
                let subtotal = 0;

                if (cartItems.length > 0) {
                    cartItemsContainer.innerHTML = ''; // Clear any existing content
                    const ul = document.createElement('ul');

                    cartItems.forEach((item, index) => {
                        const li = document.createElement('li');
                        const quantityLabel = document.createElement('label');
                        quantityLabel.textContent = 'Quantity: ';
                        const quantityInput = document.createElement('input');
                        quantityInput.type = 'number';
                        quantityInput.value = 1; // Default quantity
                        quantityInput.min = 1;
                        quantityInput.classList.add('cart-quantity-input');
                        quantityInput.dataset.index = index; // Store index to identify item

                        const removeButton = document.createElement('button');
                        removeButton.textContent = 'Remove';
                        removeButton.classList.add('cart-remove-button');
                        removeButton.dataset.index = index; // Store index to identify item

                        li.appendChild(document.createTextNode(`${item.name} - ₹${item.price.toFixed(2)}`));
                        li.appendChild(document.createElement('br'));
                        li.appendChild(quantityLabel);
                        li.appendChild(quantityInput);
                        li.appendChild(removeButton);
                        ul.appendChild(li);
                        subtotal += item.price * parseInt(quantityInput.value); // Consider initial quantity
                    });
                    cartItemsContainer.appendChild(ul);
                    cartSubtotalSpan.textContent = subtotal.toFixed(2);

                    attachCartItemEventListeners(); // Call function to add event listeners
                } else {
                    cartItemsContainer.innerHTML = '<p>Your cart is currently empty.</p>';
                    cartSubtotalSpan.textContent = '0.00';
                }
            }
        }

        // Function to attach event listeners to quantity inputs and remove buttons
        function attachCartItemEventListeners() {
            const quantityInputs = document.querySelectorAll('.cart-quantity-input');
            const removeButtons = document.querySelectorAll('.cart-remove-button');

            quantityInputs.forEach(input => {
                input.addEventListener('change', function() {
                    const index = parseInt(this.dataset.index);
                    const newQuantity = parseInt(this.value);
                    updateCart(index, newQuantity);
                });
            });

            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    removeItemFromCart(index);
                });
            });
        }

        function updateCartCount() {
            const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
            const cartCountSpan = document.getElementById('cart-count');
            if (cartCountSpan) {
                cartCountSpan.textContent = cartItems.length;
            }
        }

        function updateCart(index, quantity) {
            const cartItems = JSON.parse(localStorage.getItem('cart'));
            if (cartItems && cartItems[index]) {
                cartItems[index].quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cartItems));
                displayCartItems(); // Re-render the cart to update subtotal
                updateCartCount();
            }
        }

        function removeItemFromCart(index) {
            const cartItems = JSON.parse(localStorage.getItem('cart'));
            if (cartItems && cartItems[index]) {
                cartItems.splice(index, 1); // Remove item at the given index
                localStorage.setItem('cart', JSON.stringify(cartItems));
                displayCartItems(); // Re-render the cart
                updateCartCount();
            }
        }

        // Call displayCartItems if we are on the cart page
        if (document.getElementById('cart-page')) {
            displayCartItems();
        }

        // Initial call to update cart count when the page loads
        updateCartCount();
    });