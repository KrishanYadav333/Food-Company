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

                    cartItems.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
                        ul.appendChild(li);
                        subtotal += item.price;
                    });
                    cartItemsContainer.appendChild(ul);
                    cartSubtotalSpan.textContent = subtotal.toFixed(2);
                } else {
                    cartItemsContainer.innerHTML = '<p>Your cart is currently empty.</p>';
                    cartSubtotalSpan.textContent = '0.00';
                }
            }
        }

        // Call displayCartItems if we are on the cart page
        if (document.getElementById('cart-page')) {
            displayCartItems();
        }
});