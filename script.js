const questions=[
    {
        question:"Which planet in the solar system is known as the “Red Planet”?",
        answers:[
            {text:"Venus",correct:false},
            {text:"Earth",correct:false},
            {text:"Mars",correct:true},
            {text:"Jupiter",correct:false},
        ]
    },
    {
        question:"What gas is used to extinguish fires?",
        answers:[
            {text:"Oxygen",correct:false},
            {text:"Nitrogen",correct:true},
            {text:"Carbon Dioxide",correct:false},
            {text:"Hydrogen",correct:false},
        ]
    },
    {
        question:"For which of these disciplines Nobel Prize is awarded?",
        answers:[
            {text:"Physics,Chemistry",correct:false},
            {text:"Physiology",correct:false},
            {text:"Medicine",correct:false},
            {text:"All the Above",correct:true},
        ]
    },
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },
    {
        question: "Which river is the second longest in the world?",
        answers:[
            {text:"Amazon",correct:true},
            {text:"Yangtze",correct:false},
            {text:"Nile",correct:false},
            {text:"Missisippi",correct:false},
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            {text:"Vatican City",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"Shri Lanka",correct:false},
        ]
    },
    {
        question:"Which is the largest dessert in the world?",
        answers:[
            {text:"Kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Sahara",correct:false},
            {text:"Antarctica",correct:true},
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers:[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Arctic",correct:false},
            {text:"Africa",correct:false},
        ]
    },
    {
        question:"In what year was UNESCO (United Nations Educational, Scientific and Cultural Organization) founded?",
        answers:[
            {text:"1942",correct:false},
            {text:"1950",correct:true},
            {text:"1965",correct:false},
            {text:"1973",correct:false},
        ]
    },
    {
        question:"What year was the Olympic Organization founded?",
        answers:[
            {text:"1886",correct:false},
            {text:"1896",correct:true},
            {text:"1900",correct:false},
            {text:"1912",correct:false},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=> {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
         answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Take the Quiz Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();
