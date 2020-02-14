function solve() {
    let quoteElement = document.getElementById('quote-text');
    let authorElement = document.getElementById('author-text');
    let imageElement = document.getElementById('image-url');

    let quotesDiv = document.getElementById('quotes');
    
    let addButton = document.getElementById('add-button');
    addButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (quoteElement.value) {
            let mainDiv = document.createElement('div');
            mainDiv.className = 'rounded bg-light border d-flex mr-1 mb-3';

            if (imageElement.value) {
                let imgDiv = document.createElement('div');
                imgDiv.className = 'col-4 pl-0';

                let img = document.createElement('img');
                img.src = `${imageElement.value}`;
                img.className = 'img-thumbnail m-1 border-0';

                imgDiv.appendChild(img);
                mainDiv.appendChild(imgDiv);
            }

            let textDiv = document.createElement('div');
            textDiv.className = 'text-truncate';

            let p = document.createElement('p');
            p.textContent = quoteElement.value;
            p.className = 'px-3 pt-4 pb-2';
            
            textDiv.appendChild(p);
            
            if (authorElement.value) {
                let span = document.createElement('span');
                span.textContent = authorElement.value;
                span.className = 'px-3 font-italic text-secondary';
                
                textDiv.appendChild(span);

                let br = document.createElement('br');
                textDiv.appendChild(br);
            }
            
            let inputBtn = document.createElement('input');
            inputBtn.className = 'btn btn-secondary bg-dark m-3';
            inputBtn.value = '\u2605';
            inputBtn.type = 'button';
            inputBtn.addEventListener('click', move);

            textDiv.appendChild(inputBtn);
            
            mainDiv.appendChild(textDiv);
            quotesDiv.appendChild(mainDiv);

            quoteElement.value = '';
            authorElement.value = '';
            imageElement.value = '';
        }
    });

    function move() {
        let element = this.parentElement.parentElement;
        
        let favourites = document.getElementById('favourites');
        favourites.appendChild(element);

        element.querySelector('input').removeEventListener('click', move);
    }
}