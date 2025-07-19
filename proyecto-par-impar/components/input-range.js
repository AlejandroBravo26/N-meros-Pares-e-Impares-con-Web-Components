class InputRange extends HTMLElement {
    constructor() {
        super();
        //Shadow DOM
        this.attachShadow({ mode: 'open' }); 

        this.shadowRoot.innerHTML = `
            <style>
                
                :host {
                    display: block; 
                    margin-bottom: 20px;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .input-group {
                    margin-bottom: 15px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #333;
                }
                input[type="number"] {
                    width: calc(100% - 22px); 
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                }
                button {
                    background-color: #007bff;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #0056b3;
                }
                .error-message {
                    color: red;
                    margin-top: 10px;
                    font-size: 0.9em;
                }
            </style>
            <div class="input-container">
                <div class="input-group">
                    <label for="start-number">Inicio del rango:</label>
                    <input type="number" id="start-number" value="1">
                </div>
                <div class="input-group">
                    <label for="end-number">Fin del rango:</label>
                    <input type="number" id="end-number" value="10">
                </div>
                <button id="submit-button">Mostrar Pares/Impares</button>
                <div class="error-message" id="error-message"></div>
            </div>
        `;
    }

    connectedCallback() {
        
        const startInput = this.shadowRoot.getElementById('start-number');
        const endInput = this.shadowRoot.getElementById('end-number');
        const submitButton = this.shadowRoot.getElementById('submit-button');
        const errorMessage = this.shadowRoot.getElementById('error-message');

        
        submitButton.addEventListener('click', () => {
            const start = parseInt(startInput.value);
            const end = parseInt(endInput.value);

            
            if (isNaN(start) || isNaN(end)) {
                errorMessage.textContent = 'Por favor, ingrese números válidos.';
                return;
            }
            if (start > end) {
                errorMessage.textContent = 'El número de inicio debe ser menor o igual al número final.';
                return;
            }

            
            errorMessage.textContent = '';

         
            const rangoSeleccionadoEvent = new CustomEvent('rango-seleccionado', {
                detail: { start, end }, 
                bubbles: true, 
                composed: true 
            });
            this.dispatchEvent(rangoSeleccionadoEvent);
        });
    }
}


customElements.define('input-range', InputRange);