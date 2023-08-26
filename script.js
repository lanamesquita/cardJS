// url do ojeto CSV
const target = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSHuOn8ktKO3l4rirMV_TjqSP7mOizvssdFFb6VMLcl4kIxNB44h6kJNmHEPM73qdCNT4huOKSM1oi/pub?gid=1648505482&single=true&output=tsv";

// contador para rotacionar o carrossel
let idx = 0;

/**
 * Função para requisitar os objetos em csv 
 */

const readCSVFile = async () => {

    try {
        const response = await fetch(target, {
            method: 'get',
            headers: {
                'content-type': 'text/csv;charset=UTF-8',
            }
        })

        if (response.status === 200) {
            const data = await response.text();
            //console.log(data);
            getRandomMessage(data, carrosselSetInterval);
        } else {
            console.log(`Error code ${response.status}`);
        }
    } catch (err) {
        console.log(err)
    }

}


/**
 * 
 * @param {int} min 
 * @param {int} max 
 * @returns {int} valor randomico entr o menor min e maior max
 */
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 
 * @param {object} csvdata // objeto asyncrono contendo od dados da requisição 
 * @param {*} callbck //função de callback para executar ao termino da instrução completa
 */
function getRandomMessage(csvdata, callbck) {
    // transforma em array todas linahs
    let rowData = csvdata.split('\n');
    // embaralha randomicamente o array
    rowData = rowData.sort(() => (Math.random() > .5) ? 1 : -1);

    console.log("<rowData> -> ", rowData);
    for(let x=0; x<=rowData.length; x++){
        
        console.log("x -> ", rowData[x]);
        
        if(rowData[x]){
            //não será mais necessário uima vezx que todos os dados ja foram carregados em apenas uma requisição
            //let randomLine = randomIntFromInterval(2, rowData.length - 1);
            //console.log("Linha escolhida: " + randomLine);

            let texto = rowData[x].split('\t')[2];
            console.log("Texto: " + texto);
    
            //insere o texto na dom
            document.getElementById("texts").innerHTML += `<p class="texto">${texto}</p>`;
        }

    }
    callbck();
    
    // debugger;
}

//nao será necessário uma vez que o carrossel irá trazer randomicamente os textos na tela 
// setInterval(() => {
//     readCSVFile();
// }, 1000 * 60 * 5); // Executar a cada 5 minutos


/**
 * Função carrossel em que exibe em intervalos os elementos dentro de sua container
 */
function carrossel(){
    const texts = document.getElementById("texts");
    const text = document.querySelectorAll("#texts p");
    idx++;
    if(idx > text.length - 1){
        idx=0;
    }

    texts.style.transform = `translateX(${-idx * 228}px)`;

}

/**
 * Função para inicializar o carrossel com intervalos de 1800ms
 */
function carrosselSetInterval(){
    setInterval(carrossel, 1800);
}

/**
 * Função inicializada logo após a DOM ter sido carregada
 */
document.addEventListener("DOMContentLoaded", function () {
    readCSVFile();
});