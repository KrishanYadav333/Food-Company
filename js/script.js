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
});