const cartBtn = document.getElementById("btnCart");
const cart = document.getElementById("productsCart");
const productsCart = document.getElementById("cartList");
const body = document.body;
const totalCartElement = document.getElementById("totalCart"); // Elemento donde se mostrará el total
const buyBtn = document.getElementById("btnBuy");
const emptyCartBtn = document.getElementById("btnEmpty");

cartBtn.addEventListener("click", () => {
    cart.classList.toggle('hidden');
    body.classList.toggle('shifted');
    console.log("Cart visibility toggled.");
});

let cartPrices = [];

export const addDragEventToCard = (card) => {
    card.addEventListener('dragstart', (e) => {
        console.log('Drag started:', card.id);
        e.dataTransfer.setData('text/plain', card.id);
        e.dataTransfer.effectAllowed = 'move';
    });
};

productsCart.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    console.log("Dragging over cart.");
});

productsCart.addEventListener('drop', (e) => {
    e.preventDefault();
    const productId = e.dataTransfer.getData('text/plain');
    const productElement = document.getElementById(productId);
    if (!productsCart.contains(productElement)) {
        console.log("Product dropped in cart:", productId);
        addProductToCart(productElement);
    }
});

const addProductToCart = (productElement) => {
    const clone = productElement.cloneNode(true);
    clone.classList.add('added-to-cart');
    clone.setAttribute('draggable', true);
    clone.id = `clone-${productElement.id}-${Date.now()}`;  // Asignar un ID único que incluya un timestamp para diferenciar 2 productos del mismo tipo.
    const productPrice = parseFloat(productElement.querySelector('.subtitle').textContent.replace('$', ''));
    cartPrices.push({ id: clone.id, price: productPrice });
    updateTotal();
    productsCart.appendChild(clone);
    addRemoveEventToCartItem(clone);
    console.log(`Product added to cart: ${clone.id}`);
};

const updateTotal = () => {
    const total = cartPrices.reduce((sum, item) => sum + item.price, 0);
    totalCartElement.textContent = `$${total.toFixed(2)}`;
    console.log(`Total updated: $${total.toFixed(2)}`);
};

const addRemoveEventToCartItem = (item) => {
    item.addEventListener('dragstart', (e) => {
        console.log('Drag start on cart item:', item.id);
        e.dataTransfer.setData('text/plain', item.id);
    });

    item.addEventListener('dragend', (e) => {
        console.log('Drag end detected.');
        const rect = productsCart.getBoundingClientRect();
        const inCart = (e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom);

        if (!inCart) {
            console.log('Product dragged outside the cart:', item.id);
            removeProductFromCart(item.id);
        }
    });
};

//Arrastrar fuera del carrito
const removeProductFromCart = (productId) => {
    const productToRemove = document.getElementById(productId);
    if (productToRemove) {
        cartPrices = cartPrices.filter(item => item.id !== productId);
        updateTotal();
        productToRemove.remove();
        console.log(`Product removed from cart: ${productId}`);
    }
};

//Botón comprar carrito
buyBtn.addEventListener('click', () => {
    alert('Próximamente: Funcionalidad de compra no disponible en este momento.');
});

//Botón vaciar carrito.
emptyCartBtn.addEventListener('click', () => {
    productsCart.innerHTML = "";
    cartPrices = [];
    updateTotal();
    console.log("Cart emptied.");
});
