async function fetchCondicoesAnormais() {
    try {
        const response = await fetch('https://backsolo2.onrender.com/api/condicoes_anormais');
        const data = await response.json();

        if (data.length === 0) {
            document.getElementById('error-message').style.display = 'block';
            return;
        }

        renderCondicoes(data.reverse());
    } catch (error) {
        console.error('Erro ao buscar as condições anormais:', error);
        document.getElementById('error-message').style.display = 'block';
    }
}

function renderCondicoes(condicoes) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    condicoes.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h2');
        title.textContent = `Condições Anormais para o Solo `;
        card.appendChild(title);

        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Parâmetro</th>
                    <th>Condição</th>
                    <th>Solução</th>
                </tr>
            </thead>
            <tbody>
                ${Object.keys(item.condicoes).map(parametro => `
                    <tr>
                        <td>${capitalize(parametro)}</td>
                        <td class="problema">${item.condicoes[parametro]}</td>
                        <td class="solucao">${item.tratamentos[parametro]}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;

        card.appendChild(table);
        content.appendChild(card);
    });
}

// Função para capitalizar a primeira letra de uma string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Chamada para buscar as condições anormais
fetchCondicoesAnormais();
