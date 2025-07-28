document.addEventListener("DOMContentLoaded", function () {
    function coletarItens(titulo) {
        let itens = [], total = 0, contador = 1;
        while (true) {
            let valor = parseFloat(prompt(`Digite o valor do ${contador}º ${titulo}:`));
            if (valor === 0 || isNaN(valor)) break;
            let nome = prompt(`Digite o nome do ${contador}º ${titulo}:`);
            itens.push({ nome, valor }); total += valor; contador++;
        }
        return { itens, total };
    }

    let saldo = parseFloat(prompt("Valor do saldo atual:"));
    let saldo_anterior = parseFloat(prompt("Informe o saldo anterior: R$"));

    let ganhos = coletarItens("Ganho"), compras = coletarItens("Compra"),
        lanches = coletarItens("Lanche"), saidas = coletarItens("Saída"),
        jogos = coletarItens("Jogo");

    let salario = 700, despesas = 0;
    if (prompt("Você pagou a poupança (R$120)? (s/n)").toLowerCase() === "s") despesas += 120;
    if (prompt("Você pagou o transporte (R$180)? (s/n)").toLowerCase() === "s") despesas += 180;
    if (prompt("Você pagou os créditos (R$35)? (s/n)").toLowerCase() === "s") despesas += 35;
    despesas += prompt("Você pagou o Spotify (R$27.90)? (s/n)").toLowerCase() === "s" ? 30 : 2.1;
    if (prompt("Você pagou o Youtube (R$16.90)? (s/n)").toLowerCase() === "s") despesas += 16.90;

    despesas += compras.total + lanches.total + saidas.total + jogos.total;
    let saldo_atual = (salario + saldo + ganhos.total) - despesas;
    let gasto_total = (salario + saldo) - saldo_atual;

    let resumo = [
        ["Saldo", saldo], ["Ganhos", ganhos.total], ["Compras", compras.total],
        ["Lanches", lanches.total], ["Saídas", saidas.total],
        ["Extras", lanches.total + saidas.total], ["Jogos", jogos.total],
        ["Saldo Atual", saldo_atual], ["Gasto Total", gasto_total]
    ];

    let output = "<h2>Resumo Final</h2><table><tr><th>Descrição</th><th>Valor (R$)</th></tr>";
    resumo.forEach(([nome, valor]) => output += `<tr><td>${nome}</td><td>R$ ${valor.toFixed(2)}</td></tr>`);
    output += "</table>";

    output += saldo_atual > saldo_anterior
        ? "<p style='color:lightgreen;'>Você está economizando! Parabéns!</p>"
        : saldo_atual === saldo_anterior
            ? "<p style='color:yellow;'>Você manteve seu saldo, economize mais!</p>"
            : "<p style='color:red;'>Você gastou mais do que economizou!</p>";

    if (prompt("Gostaria de ver a lista de itens por categoria? (s/n)").toLowerCase() === "s") {
        output += "<h2>Itens por Categoria</h2>";
        [["Ganhos", ganhos.itens], ["Compras", compras.itens],
         ["Lanches", lanches.itens], ["Saídas", saidas.itens], ["Jogos", jogos.itens]]
        .forEach(([titulo, lista]) => {
            output += `<h3>${titulo}</h3><ul>`;
            output += lista.length === 0
                ? "<li>Nenhum item registrado.</li>"
                : lista.map(item => `<li>${item.nome} - R$ ${item.valor.toFixed(2)}</li>`).join("");
            output += "</ul>";
        });
    }

    document.body.innerHTML += output;
});