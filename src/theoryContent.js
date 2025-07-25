// src/theoryContent.js

// Conteúdo traduzido e adaptado do PDF "Music Theory for the 21st-Century Classroom"
// e do PDF "teoria-01-e-02-musical-compasso".
export const theorySections = [
    {
        title: "Fundamentos do Ritmo",
        content: `
            <h4>Pulso, Batida e Andamento</h4>
            [cite_start]<p>A música é organizada em torno de um pulso constante e regular. [cite: 73]</p>
            <ul>
                [cite_start]<li><strong>Pulso e Batida:</strong> São sinônimos que representam a unidade básica para medir o tempo na música. [cite: 74] É o que você marca quando bate o pé ao ouvir uma canção.</li>
                <li><strong>Andamento (Tempo):</strong> Refere-se à velocidade do pulso, geralmente medida em <strong>BPM</strong> (Batidas Por Minuto). [cite_start]Um andamento de 60 BPM significa que há uma batida a cada segundo. [cite: 75, 76]</li>
            </ul>
        `
    },
    {
        title: "Fórmula de Compasso",
        content: `
            [cite_start]<p>A fórmula de compasso é uma fração que aparece no início de uma partitura e define a métrica da música. [cite: 217]</p>
            <div class="music-example">
                <span class="time-signature-example">4</span>
                <span class="time-signature-example">4</span>
            </div>
            <ul>
                [cite_start]<li>O <strong>número de cima</strong> indica "quantos" pulsos existem em cada compasso. [cite: 6, 7]</li>
                [cite_start]<li>O <strong>número de baixo</strong> indica "qual" figura rítmica vale um pulso. [cite: 6, 11]</li>
            </ul>
            [cite_start]<p>Exemplo: <strong>4/4</strong> significa <strong>4 pulsos</strong>, onde a <strong>semínima (1/4)</strong> vale 1 pulso. [cite: 13, 224, 227]</p>
        `
    },
    {
        title: "Figuras Rítmicas e Pausas",
        content: `
            <p>As figuras representam a duração dos sons, enquanto as pausas representam a duração do silêncio.</p>
            <h4>Figuras de Som</h4>
            <ul>
                <li><strong>Semibreve (𝅝):</strong> A figura de maior duração, geralmente vale 4 pulsos em 4/4.</li>
                [cite_start]<li><strong>Mínima (𝅗𝅥):</strong> Metade da duração de uma semibreve. [cite: 25]</li>
                [cite_start]<li><strong>Semínima (♩):</strong> Metade da duração de uma mínima. [cite: 26]</li>
                [cite_start]<li><strong>Colcheia (𝅘𝅥𝅮):</strong> Metade da duração de uma semínima. [cite: 29]</li>
                [cite_start]<li><strong>Semicolcheia (𝅘𝅥𝅯):</strong> Metade da duração de uma colcheia. [cite: 30]</li>
            </ul>
             <h4>Figuras de Pausa</h4>
            <ul>
                [cite_start]<li><strong>Pausa de Semibreve:</strong> Geralmente ocupa um compasso inteiro de 4/4. [cite: 34]</li>
                [cite_start]<li><strong>Pausa de Mínima:</strong> Metade da pausa de semibreve. [cite: 34]</li>
                [cite_start]<li><strong>Pausa de Semínima:</strong> Metade da pausa de mínima. [cite: 35]</li>
                [cite_start]<li><strong>Pausa de Colcheia:</strong> Metade da pausa de semínima. [cite: 35]</li>
                [cite_start]<li><strong>Pausa de Semicolcheia:</strong> Metade da pausa de colcheia. [cite: 35]</li>
            </ul>
        `
    },
    {
        title: "Pontos e Ligaduras",
        content: `
            [cite_start]<p>Para criar durações que não são representadas por uma única figura, usamos pontos de aumento e ligaduras. [cite: 57]</p>
            <ul>
                [cite_start]<li><strong>Ponto de Aumento:</strong> Um ponto à direita de uma figura aumenta sua duração em metade do seu valor original. [cite: 60] Ex: Uma mínima (2 tempos) pontuada (𝅗𝅥.) vale 2 + 1 = 3 tempos.</li>
                [cite_start]<li><strong>Ligadura de Prolongamento:</strong> É uma linha curva que une duas ou mais notas da <strong>mesma altura</strong>, somando suas durações. [cite: 58]</li>
            </ul>
        `
    },
    {
        title: "Tipos de Compasso (Metro)",
        content: `
            [cite_start]<p>O metro descreve como os pulsos são agrupados e divididos dentro de um compasso. [cite: 72]</p>
            <h4>Compasso Simples</h4>
            [cite_start]<p>O pulso é dividido em <strong>duas</strong> partes iguais (subdivisão binária). [cite: 80] [cite_start]Os numeradores mais comuns são 2 (binário), 3 (ternário) e 4 (quaternário). [cite: 78, 79]</p>
            <div class="music-example"><strong>2/4</strong> (Binário Simples) | <strong>3/4</strong> (Ternário Simples) | <strong>4/4</strong> (Quaternário Simples)</div>

            <h4>Compasso Composto</h4>
            [cite_start]<p>O pulso é uma <strong>figura pontuada</strong> e é dividido em <strong>três</strong> partes iguais (subdivisão ternária). [cite: 81, 91] [cite_start]Os numeradores mais comuns são 6 (binário), 9 (ternário) e 12 (quaternário). [cite: 93]</p>
            <div class="music-example"><strong>6/8</strong> (Binário Composto) | <strong>9/8</strong> (Ternário Composto) | <strong>12/8</strong> (Quaternário Composto)</div>
            [cite_start]<p>Exemplo: Em <strong>6/8</strong>, há <strong>dois pulsos</strong> principais, e cada pulso vale uma semínima pontuada (♩.). [cite: 275]</p>
        `
    },
    {
        title: "Quiálteras (Tuplets)",
        content: `
            [cite_start]<p>Quiálteras são grupos de notas que alteram a divisão natural de um pulso. [cite: 98]</p>
            <ul>
                <li><strong>Tercina:</strong> O tipo mais comum. [cite_start]Três notas são executadas no tempo que normalmente seria ocupado por duas. [cite: 100] Ex: Três colcheias no tempo de uma semínima.</li>
                [cite_start]<li><strong>Duína e Quádrupla:</strong> Em compassos compostos, onde a divisão natural é por três, podemos ter grupos de duas (duína) ou quatro (quádrupla) notas no tempo de um pulso. [cite: 113]</li>
            </ul>
        `
    }
];