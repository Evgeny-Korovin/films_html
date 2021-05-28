'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv > img'),
          genre = document.querySelector('.promo__genre'),
          bg = document.querySelector('.promo__bg'),
          films = document.querySelector('.promo__interactive-list'),
          filmsList = document.querySelectorAll('.promo__interactive-item'),
          addForm = document.querySelector('form.add'),
          btn = document.querySelector('.add button'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');
    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;
        
        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.slice(0, 21)}…`;
            }
            if (favorite) {
                console.log('Добавляем любимый фильм');
            }
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createFilmsList(movieDB.movies, films);
        }
        event.target.reset();
    });

    function deleteAdv(arr) {
        arr.forEach(item => item.remove());
    }
    
    const makeChanges = () => {
        genre.textContent = 'ДРАМА';
        bg.style.backgroundImage = 'url("img/bg.jpg")';

    };
    
    const sortArr = (arr) => {
        arr.sort();
    };

    function createFilmsList(arrFilms, node) {
        node.innerHTML = '';
        sortArr(arrFilms);
        arrFilms.forEach((item, index) => {
            node.innerHTML += `
            <li class="promo__interactive-item">${index + 1} ${item}
                <div class="delete"></div>
            </li>`;
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createFilmsList(arrFilms, node);
            });
        });
    }
   
    deleteAdv(adv);
    makeChanges();
    createFilmsList(movieDB.movies, films);
});