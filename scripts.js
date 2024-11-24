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
        title.textContent = `Condições Anormais para o Solo ${item.id}`;
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
                        <td>${parametro}</td>
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


fetchCondicoesAnormais();