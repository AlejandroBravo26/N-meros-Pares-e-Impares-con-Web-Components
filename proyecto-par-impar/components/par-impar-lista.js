class ParImparLista extends HTMLElement {
    constructor() {
        super();
        //Shadow DOM
        this.attachShadow({ mode: 'open' });

        
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos encapsulados para este componente */
                :host {
                    display: block;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background-color: #e6f7ff; /* Un color diferente para la lista */
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                ul {
                    list-style-type: none; /* Quitar viñetas predeterminadas */
                    padding: 0;
                    margin: 0;
                }
                li {
                    padding: 8px 0;
                    border-bottom: 1px dashed #eee;
                    font-size: 1.1em;
                }
                li:last-child {
                    border-bottom: none;
                }
                .par {
                    color: #28a745; /* Verde para par */
                    font-weight: bold;
                }
                .impar {
                    color: #dc3545; /* Rojo para impar */
                    font-weight: bold;
                }
                .empty-message {
                    color: #666;
                    font-style: italic;
                }
            </style>
            <div class="list-container">
                <h2>Resultados:</h2>
                <ul id="number-list">
                    <li class="empty-message">Ingrese un rango para ver los resultados.</li>
                </ul>
            </div>
        `;
    }

    connectedCallback() {
        
        this.numberList = this.shadowRoot.getElementById('number-list');

       
        document.addEventListener('rango-seleccionado', this.handleRangeSelected.bind(this));
    }

    
    handleRangeSelected(event) {
        const { start, end } = event.detail; 

        //Limpiar la lista actual
        this.numberList.innerHTML = '';

        
        if (start > end) {
            this.numberList.innerHTML = '<li class="empty-message">Rango inválido.</li>';
            return;
        }

        for (let i = start; i <= end; i++) {
            const listItem = document.createElement('li');
            if (i % 2 === 0) {
                listItem.textContent = `${i} - Par`;
                listItem.classList.add('par');
            } else {
                listItem.textContent = `${i} - Impar`;
                listItem.classList.add('impar');
            }
            this.numberList.appendChild(listItem);
        }
    }

    disconnectedCallback() {
       
        document.removeEventListener('rango-seleccionado', this.handleRangeSelected.bind(this));
    }
}


customElements.define('par-impar-lista', ParImparLista);