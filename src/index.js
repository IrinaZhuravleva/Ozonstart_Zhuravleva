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

function toggleCheckbox() {
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
}
toggleCheckbox();


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
function toggleCart(){
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
}
toggleCart();
//end cart

//работа с корзиной
function addCart() {
    const cards = document.querySelectorAll('.goods .card'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    cartEmpty = document.getElementById('cart-empty'),
    countGoods = document.querySelector('.counter');


    cards.forEach((card) => {
    const btn = card.querySelector('button');

    btn.addEventListener('click', () => {
        // console.log(card);
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        // cartEmpty.remove();
        showData();

        const removeBtn = cardClone.querySelector('.btn');
        removeBtn.textContent = 'Удалить из корзины';
        removeBtn.addEventListener('click', () =>{
            cardClone.remove();
            showData();
        });
    });
}); 
    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');
            
        let sum = 0;
        countGoods.textContent = cardsCart.length;

        cardsPrice.forEach((cardPrice) => {
            // let sum = 0;
            let price = parseFloat(cardPrice.innerText);
            // console.log(price);
            sum += price;
            // console.log(sum);
            return sum;
        });
        cardTotal.textContent = sum;
        // cardTotal.innerText = sum;

        if (cardsCart.length === 0) {
            cartWrapper.appendChild(cartEmpty);
            // cartEmpty.remove();
        } else{
            cartEmpty.remove();
        }
    }
}

addCart();
//end работа с корзиной

//фильтр и поиск
function actionPage() {
    //заново получаем все карточки, потому что это отдельный модуль
    const cards = document.querySelectorAll('.goods .card'),
    discountCheckbox = document.getElementById('discount-checkbox'),

    //получить инпуты фильтров
    min = document.getElementById('min'),
    max = document.getElementById('max'),
    search = document.querySelector('.search-wrapper_input'),
    // search = document.getElementById('search-wrapper_input'),
    searchBtn = document.querySelector('.search-btn');
    
    discountCheckbox.addEventListener('click', () => {
        //перебираем все карточки на странице во время клика
        //эта функция принимает во время клика все элементы elem
        cards.forEach((elem) => {
            if(discountCheckbox.checked) {
                //есть ли у карточки класс, отвечающий за распродажу

                //если стоит checked на Акции, то цикл определяет нижеприведенной строкой, где тру а где фолс
                // console.log(new Boolean(elem.querySelector('.card-sale')));
                if (!elem.querySelector('.card-sale')) {
                    //обращаемся к родителю карточки через parentNode и скрываем его
                    // первый способ
                    // elem.parentNode.remove();

                    // // второй способ
                    elem.parentNode.style.display = 'none';
                }
            } else {
                // первый способ
                // document.querySelector('.goods').appendChild(elem.parentNode);

                // // второй способ
                elem.parentNode.style.display = '';
            }
        });
    });

    //фильтр по цене
    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

    //обработчики собыьий на инпуты макс и мин
    function filterPrice() {

        // перебор карточек для получения их цены
        cards.forEach((elem) => {
            const cardPrice = elem.querySelector('.card-price');

            //отрезаем пробел,Р(рубль) или доллар от цифры цены посредством встроенной функции parseFloat
            const price = parseFloat(cardPrice.textContent);
            // console.log(price);
            // console.log(min.value);

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                elem.parentNode.remove();
            } else {
                document.querySelector('.goods').appendChild(elem.parentNode);
            }
        });
    }

    //поиск
    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        
        //перебираем карточки
        cards.forEach((elem) => {
            const title = elem.querySelector('.card-title');
            //метод test - возвращает булево значение 
            if(!searchText.test(title.textContent)) {
                elem.parentNode.style.display = 'none';
            } else {
                elem.parentNode.style.display = '';
            }
        });

        //для очистки строки поиска
        search.value = '';
    });
}

actionPage();

//end фильтр и поиск