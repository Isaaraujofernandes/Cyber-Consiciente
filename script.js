
/* MENU RESPONSIVO */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {

    const opened = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(opened));

});

mainNav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* BOTÃO DE SINAIS DE ALERTA */

const alertButton = document.getElementById("alertButton");
const alertDetails = document.getElementById("alertDetails");

alertButton.addEventListener("click", () => {

    const isHidden = alertDetails.hidden;

    alertDetails.hidden = !isHidden;

    alertButton.textContent = isHidden
        ? "Ocultar sinais ↑"
        : "Ver sinais de alerta ↗";

});


/* PERGUNTAS DO QUIZ */

const questions = [

    {
        q: "Um vendedor pede que você não conte ao comprador o valor real do produto. O que fazer?",

        a: [
            "Aceitar, porque é um acordo entre eles.",
            "Interromper a negociação e confirmar os valores diretamente com a outra parte.",
            "Pagar primeiro e perguntar depois.",
            "Enviar seus dados pessoais para confirmar."
        ],

        correct: 1,

        why: "O pedido de segredo é um sinal de alerta. Comprador e vendedor devem confirmar diretamente valores e condições."
    },

    {
        q: "Você encontra o mesmo produto em dois anúncios, mas um está muito mais barato e tem outro contato. Qual atitude é mais segura?",

        a: [
            "Pagar rapidamente para aproveitar a oferta.",
            "Confiar porque as fotos são iguais.",
            "Verificar a origem do anúncio e falar diretamente com o vendedor verdadeiro.",
            "Transferir um sinal para reservar."
        ],

        correct: 2,

        why: "Anúncios copiados e preços muito abaixo do mercado podem ser usados para atrair vítimas."
    },

    {
        q: "O intermediário informa uma conta bancária que não pertence ao vendedor. O que você deve fazer?",

        a: [
            "Não transferir e confirmar o titular e o pagamento diretamente com o vendedor.",
            "Transferir se o intermediário parecer confiável.",
            "Pedir desconto e pagar mesmo assim.",
            "Dividir o pagamento em duas contas."
        ],

        correct: 0,

        why: "O pagamento deve ser confirmado com o vendedor legítimo. Não envie dinheiro para terceiros desconhecidos."
    },

    {
        q: "Qual é uma característica comum do golpe do falso intermediário?",

        a: [
            "A plataforma sempre confirma a identidade do vendedor.",
            "O golpista cria uma negociação paralela e conta histórias diferentes para comprador e vendedor.",
            "O comprador recebe um comprovante oficial antes de pagar.",
            "O vendedor e comprador conversam diretamente sobre tudo."
        ],

        correct: 1,

        why: "O criminoso tenta controlar a comunicação e impedir que as duas partes comparem as informações."
    },

    {
        q: "Depois de perceber que caiu em um golpe, qual é uma providência adequada?",

        a: [
            "Apagar as conversas e não contar a ninguém.",
            "Continuar negociando para tentar recuperar o valor.",
            "Registrar ocorrência, guardar comprovantes e contatar imediatamente o banco ou meio de pagamento.",
            "Publicar senhas e dados da conta para pedir ajuda."
        ],

        correct: 2,

        why: "Guarde registros, comunique o banco ou meio de pagamento imediatamente e registre a ocorrência."
    }

];


/* ELEMENTOS DO QUIZ */

let currentQuestion = 0;
let score = 0;
let selected = null;

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const answers = document.getElementById("answers");
const feedback = document.getElementById("quizFeedback");
const nextButton = document.getElementById("nextQuestion");

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

const quizContent = document.getElementById("quizContent");
const quizResult = document.getElementById("quizResult");


/* MOSTRAR PERGUNTA */

function renderQuestion() {

    const item = questions[currentQuestion];

    selected = null;

    questionNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0");

    progressText.textContent =
        `PERGUNTA ${currentQuestion + 1} DE ${questions.length}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    questionText.textContent = item.q;

    answers.innerHTML = "";

    item.a.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-option";

        button.type = "button";

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {

            chooseAnswer(index);

        });

        answers.appendChild(button);

    });

    feedback.textContent =
        "Escolha uma alternativa para continuar.";

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Ver resultado →"
            : "Próxima pergunta →";

}


/* VERIFICAR RESPOSTA */

function chooseAnswer(index) {

    if (selected !== null) return;

    selected = index;

    const item = questions[currentQuestion];

    const options = [...answers.querySelectorAll("button")];

    options.forEach((button, i) => {

        button.disabled = true;

        if (i === item.correct) {

            button.classList.add("correct");

        }

        if (i === index && i !== item.correct) {

            button.classList.add("wrong");

        }

    });

    if (index === item.correct) {

        score++;

        feedback.textContent =
            `Correto! ${item.why}`;

    } else {

        feedback.textContent =
            `Não é essa. ${item.why}`;

    }

    nextButton.disabled = false;

}


/* AVANÇAR PERGUNTA */

nextButton.addEventListener("click", () => {

    if (selected === null) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        renderQuestion();

        return;

    }

    quizContent.hidden = true;

    quizResult.hidden = false;

    document.getElementById("resultTitle").textContent =

        score === 5
            ? "Excelente! Você está preparado."
            : score >= 3
                ? "Bom trabalho! Continue atento."
                : "Vamos reforçar a prevenção.";

    document.getElementById("resultText").textContent =

        `Você acertou ${score} de ${questions.length} perguntas. ` +

        (score === 5
            ? "Você reconheceu os principais sinais de alerta."
            : "Revise as orientações e tente novamente para fixar os cuidados.");

});


/* REINICIAR QUIZ */

document.getElementById("restartQuiz").addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    selected = null;

    quizResult.hidden = true;

    quizContent.hidden = false;

    renderQuestion();

});


/* INICIAR QUIZ */

renderQuestion();


/* CHECKLIST DE COMPUTADORES COMPARTILHADOS */

const checklistItems = [
    ...document.querySelectorAll(".check-item")
];

const checkCount = document.getElementById("checkCount");

const checkMessage = document.getElementById("checkMessage");


/* ATUALIZAR CONTAGEM */

function updateChecklist() {

    const checked = checklistItems.filter(
        item => item.checked
    ).length;

    checkCount.textContent =
        `${checked}/${checklistItems.length}`;

    checkMessage.textContent =

        checked === checklistItems.length
            ? "Tudo certo! Você concluiu todos os cuidados."
            : checked === 0
                ? "Sua segurança começa com pequenos hábitos."
                : "Boa! Continue conferindo os outros cuidados.";

}


/* MARCAR CHECKLIST */

checklistItems.forEach(item => {

    item.addEventListener("change", updateChecklist);

});


/* LIMPAR CHECKLIST */

document.getElementById("resetChecklist").addEventListener("click", () => {

    checklistItems.forEach(item => {

        item.checked = false;

    });

    updateChecklist();

});
