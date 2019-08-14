// const checkbox = document.getElementById('discount-checkbox');

// checkbox.addEventListener('change', function() {
//     console.log(this.checked);
//     // if (this.checked === true) {
//     if (this.checked) {
//         this.nextElementSibling.classList.add('checked');
//     } else {
//         this.nextElementSibling.classList.remove('checked');
//     }
// });

// // checkbox.onchange = function() {
// //     console.log('hello');

// // };

const checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach(function(element){
    element.addEventListener('change', function() {
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });
});

// const checkbox = document.querySelector('#discount-checkbox');
// for(let i = 0; i < checkbox.length; i++) {
//     checkbox[i].addEventListener('change', function() {
//         if (this.checked) {
//             this.nextElementSibling.classList.add('checked');
//         } else {
//             this.nextElementSibling.classList.remove('checked');
//         }
//     });
// }

//cart
const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const btnClose = document.querySelector('.cart-close');


btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

btnClose.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
});
//end cart

//работа с корзиной
const cards = document.querySelectorAll('.goods .card'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    cartEmpty = document.getElementById('cart-empty'),
    countGoods = document.querySelector('.counter');

cards.forEach((card) => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
        console.log(card);
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        showData();
    });
});

function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;
    
}
//end работа с корзиной