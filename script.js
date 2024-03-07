var qtdAlunosPadrao = 3;
var qtdAlunos = 0;
var qtdNotas = 4;

function desenhaTabela(){
    let dadoAntigo;
    for(let i = 1; i <= qtdAlunosPadrao; i++){
        criarLinha();
    }
}

function criarDadoHeader(aluno){
    let elementoHeader = document.createElement('th');
    
    elementoHeader.innerText = aluno;

    return elementoHeader;
}

function criarDadoIn(tipo, aluno, nota){
    let elementoDadoEntrada = document.createElement('td');
    let elementoEntrada = document.createElement('input');
    
    elementoEntrada.classList.add("form-control");

    if(tipo == 'number'){
        // elementoDado.setAttribute("id", `coluna${aluno}${nota}`);
        elementoEntrada.setAttribute("id", `nota${aluno}${nota}`);
        elementoEntrada.type = "number";
        elementoEntrada.min = 0;
        elementoEntrada.max = 100;
    }else if(tipo == 'text'){
        elementoEntrada.placeholder = 'nome';
        elementoEntrada.setAttribute("id", `nome${aluno}`);
        elementoEntrada.type = "text";
    }

    elementoDadoEntrada.appendChild(elementoEntrada);

    return elementoDadoEntrada;
}

function criarDadoOut(coluna, aluno){
    let elementoDadoSaida = document.createElement('td');
    let elementoSaida = document.createElement('output');
    
    elementoSaida.setAttribute("id", `${coluna}${aluno}`);

    elementoDadoSaida.appendChild(elementoSaida);

    return elementoDadoSaida;
}

function criarLinha() {
    
    if (qtdAlunos < 10) {
        qtdAlunos += 1;

        let linha

        linha = document.createElement('tr');
        linha.setAttribute("id", `linha${qtdAlunos}`);

        linha.appendChild(criarDadoHeader(qtdAlunos));
        linha.appendChild(criarDadoIn('text', qtdAlunos, 0))

        for (let x = 1; x <= qtdNotas; x++) {
            linha.appendChild(criarDadoIn('number', qtdAlunos, x));
        }

        linha.appendChild(criarDadoOut('media', qtdAlunos));
        linha.appendChild(criarDadoOut('situacao', qtdAlunos));

        document.getElementById('conteudo').appendChild(linha);
    }
}

function deletarLinha() {
    if (qtdAlunos > 1) {
        let child = document.getElementById(`linha${qtdAlunos}`)
        document.getElementById('conteudo').removeChild(child);
        qtdAlunos -= 1
    }
}

function criarColuna() {
    
    if (qtdNotas < 6) {
        qtdNotas += 1;

        let colunaMedia = document.getElementById('media0');
        let novaColuna = criarDadoHeader(`Nota ${qtdNotas}`);

        document.getElementById('linha0').insertBefore(novaColuna, colunaMedia);

        for (let x = 1; x <= qtdAlunos; x++) {
            novaColuna = criarDadoIn('number', x, qtdNotas)
            colunaMedia = document.getElementById(`media${x}`).parentElement;
 
            document.getElementById(`linha${x}`).insertBefore(novaColuna, colunaMedia);
        }

    }
}

function deletarColuna() {
    if (qtdNotas > 1) {
        let child = document.getElementById('media0').previousElementSibling;;
        document.getElementById('linha0').removeChild(child);

        for (let x = 1; x <= qtdAlunos; x++) {
            child = document.getElementById(`nota${x}${qtdNotas}`).parentElement;
            document.getElementById(`linha${x}`).removeChild(child);
        }
        qtdNotas -= 1;
    }
}

function calcular(){
    for(let aluno=1; aluno<=qtdAlunos;aluno++){
        let notaParcial;
        let notaSoma = 0;
        for(let nota=1;nota<=qtdNotas;nota++){
            notaParcial = Number(document.getElementById(`nota${aluno}${nota}`).value);
            notaSoma = notaSoma + notaParcial;
        }
        let media = (notaSoma)/qtdNotas;
        document.getElementById(`media${aluno}`).innerText = Math.round(media);
        if(media >= 50){
            document.getElementById(`situacao${aluno}`).innerText = 'Aprovado'
            document.getElementById(`situacao${aluno}`).style.backgroundColor = 'green';
    
        }else if(media >=45 && media <50){
            document.getElementById(`situacao${aluno}`).innerText = 'Recuperação';
            document.getElementById(`situacao${aluno}`).style.backgroundColor = 'yellow'; 
        }else if(media < 45){
            document.getElementById(`situacao${aluno}`).innerText = 'Reprovado';
            document.getElementById(`situacao${aluno}`).style.backgroundColor = 'red';
        }
    }
}