import filter from './filter';

export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    //создаем коллекцию (set -хранит только уникальные значения и map)
    const categories = new Set();
    let filterTitle = document.querySelector('.filter-title h5');

    cards.forEach((card)=> {
        //обращаемся к свойству, которое мы прописали в data attribut
        // console.dir(card.dataset.category);
        categories.add(card.dataset.category);
    });

    categories.forEach((item)=>{
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    //получаем все ли, чтобы их перебрать и присвоить им класс active
    const allLi = catalogList.querySelectorAll('li');

    catalogBtn.addEventListener('click', (event) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }
        // console.log(event);

        if (event.target.tagName === 'LI') {
            cards.forEach((card)=> {
                if (card.dataset.category === event.target.textContent) {
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';
                }
            });

            allLi.forEach((elem) => {
                //когда мы кликнули по ли, у нее появился event.target 
                if(elem === event.target) {
                    elem.classList.add('active');
                } else {
                    elem.classList.remove('active');
                }
            });
            

            // let filterTitle = document.querySelector('.filter-title h5');
            filterTitle.innerHTML = event.target.textContent;
            // console.log(event.target.textContent);
            filter();
        }
    });

    // console.log(categories);
}