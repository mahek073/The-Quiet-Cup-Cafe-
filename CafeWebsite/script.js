// to scroll through the nav bars
var navLinks = document.querySelectorAll('.nav-links a');

for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function (event) {
        event.preventDefault();

        var sectionName = this.innerText.toLowerCase();
        var targetSection = document.querySelector('.' + sectionName + '-section');

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}


// to pop up the alert after message has been submitted and store it in the local storage
var contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

      
        var name = contactForm.querySelector('input[type="text"]').value;
        var email = contactForm.querySelector('input[type="email"]').value;
        var message = contactForm.querySelector('textarea').value;

     
        var submissions = JSON.parse(localStorage.getItem('submissions')) || [];

      
        submissions.push({ name: name, email: email, message: message });

     
        localStorage.setItem('submissions', JSON.stringify(submissions));

        alert("Thank you! Your message has been saved. ☕");

        
        contactForm.reset();
    });
}

// =====================
// CART FUNCTIONALITY
// =====================

const cart = [];

const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");

const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

// Open Cart
cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

// Close Cart
closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

// Add Items To Cart
document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", () => {

        const item = {
            name: button.dataset.name,
            price: Number(button.dataset.price)
        };

        cart.push(item);

        updateCart();

        // Automatically open cart
        cartSidebar.classList.add("active");
    });

});

// Update Cart UI
function updateCart() {

    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                ₨${item.price}
            </div>

            <button class="remove-btn" data-index="${index}">
                Remove
            </button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // Remove Item
    document.querySelectorAll(".remove-btn").forEach(button => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            cart.splice(index, 1);

            updateCart();
        });

    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total;
}

// Checkout
document.getElementById("checkout-form").addEventListener("submit", function (e) {

    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! ☕");

    cart.length = 0;

    updateCart();

    this.reset();

    cartSidebar.classList.remove("active");
});
