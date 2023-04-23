/*jshint esversion: 6 */

let hamburgerBtn = document.querySelector('.header__hamburger');
let menu = document.querySelector('.burger-menu');
let header = document.querySelector('.header');
hamburgerBtn.addEventListener('click', function() {
	hamburgerBtn.classList.toggle('active');
	menu.classList.toggle('active');
	header.classList.toggle('active');
});

const questions = [{
	type: 'radio',
	question: 'Ваш пол:',
	answers: ['Мужчина', 'Женщина'],
}, {
	type: 'radio',
	question: 'Укажите свой возраст:',
	answers: ['До 18', 'От 18 до 28', 'От 28 до 35', 'От 36'],
}, {
	type: 'radio',
	question: 'Выберите лишнее:',
	answers: ['Дом', 'Шалаш', 'Бунгало', 'Скамейка', 'Хижина'],
}, {
	type: 'radio',
	question: `Продолжите числовой ряд: <br> 18 20 24 32`,
	answers: ['62', '48', '74', '57', '60', '77'],
}, {
	type: 'color',
	question: 'Выберите цвет, который сейчас наиболее вам приятен',
	answers: ['#A8A8A8', '#0000A9', '#00A701', '#F60100', '#FDFF19', '#A95403', '#000000', '#850068', '#46B2AC'],
}, {
	type: 'color',
	question: 'Отдохните пару секунд, еще раз выберите цвет, который сейчас наиболее вам приятен',
	answers: ['#A8A8A8', '#46B2AC', '#A95403', '#00A701', '#000000', '#F60100', '#850068', '#FDFF19', '#0000A9'],
}, {
	type: 'radio',
	question: 'Какой из городов лишний:',
	answers: ['Вашингтон', 'Лондон', 'Париж', 'Нью-Йорк', 'Москва', 'Оттава'],
}, {
	type: 'digit',
	question: `Выберите правильную фигуру из четырёх пронумерованных. <img src='img/question8.png' alt='figure'>`,
	answers: ['1', '2', '3', '4'],
}, {
	type: 'radio',
	question: 'Вам привычнее и важнее:',
	answers: ['Наслаждаться каждой минутой проведенного времени', 'Быть устремленными мыслями в будущее', 'Учитывать в ежедневной практике прошлый опыт'],
}, {
	type: 'radio',
	question: `Какое определение, по-Вашему, больше подходит к этому геометрическому изображению:  <img src='img/question10.png' alt='figure'>`,
	answers: ['Оно остроконечное', 'Оно устойчиво', 'Оно в состоянии равновесия'],
}, {
	type: 'digit',
	question: `Вставьте подходящее <br> число  <img src='img/question11.png' alt='figure'>`,
	answers: ['34', '36', '53', '44', '66', '42'],
}, ];
let currentQuestion = 0;
let selectedAnswer = null;
const nextButton = document.querySelector('#button-test');
const answers = [];

function showQuestion(questionIndex) {
	const questionContainer = document.querySelector('.test-container');
	questionContainer.innerHTML = '';
	const question = questions[questionIndex];
	const questionElement = document.createElement('div');
	questionElement.classList.add("question");
	questionElement.innerHTML = question.question;
	questionContainer.appendChild(questionElement);

	if (question.type === 'radio') {
		const answerContainer = document.createElement('div');
		answerContainer.classList.add('answers');
		question.answers.forEach((answer, index) => {
			const answerWrap = document.createElement('div');
			answerWrap.classList.add('radio-wrapper');
			const inputWraper = document.createElement('div');
			inputWraper.classList.add('input-wraper');
			const answerElement = document.createElement('input');
			answerElement.type = 'radio';
			answerElement.name = `answer-${questionIndex}`;
			answerElement.value = index;
			answerElement.id = `answer-${questionIndex}-${index}`;
			answerElement.addEventListener('change', () => {
				selectedAnswer = answerElement.value;
				nextButton.disabled = false;
				nextButton.classList.add('active');
				const selectedRadio = document.querySelector('.radio-wrapper.selected');
				if (selectedRadio) {
					selectedRadio.classList.remove('selected');
				}
				answerWrap.classList.add('selected');
				answers[questionIndex] = selectedAnswer; // Save the selected answer to the array
			});
			const labelElement = document.createElement('label');
			labelElement.innerText = answer;
			labelElement.htmlFor = `answer-${questionIndex}-${index}`;
			inputWraper.appendChild(answerElement);
			answerWrap.appendChild(inputWraper);
			answerWrap.appendChild(labelElement);
			answerContainer.appendChild(answerWrap);
		});
		questionContainer.appendChild(answerContainer);
	} else if (question.type === 'color') {
		const answerContainer = document.createElement('div');
		answerContainer.classList.add('color-answers');
		question.answers.forEach((answer) => {
			const answerWrap = document.createElement('div');
			answerWrap.classList.add('color-wrapper');
			const answerElement = document.createElement('div');
			answerElement.classList.add('color-element');
			answerElement.style.backgroundColor = answer;
			answerElement.addEventListener('click', () => {
				selectedAnswer = answer;
				nextButton.disabled = false;
				nextButton.classList.add('active');
				const selectedColor = document.querySelector('.color-wrapper.selected');
				if (selectedColor) {
					selectedColor.classList.remove('selected');
				}
				answerWrap.classList.add('selected');
				answers[questionIndex] = selectedAnswer; // Save the selected answer to the array
			});
			answerWrap.appendChild(answerElement);
			answerContainer.appendChild(answerWrap);
		});
		questionContainer.appendChild(answerContainer);
	} else if (question.type === 'digit') {
		const answerContainer = document.createElement('div');
		answerContainer.classList.add('digit-answers');
		question.answers.forEach((answer) => {
			const answerElement = document.createElement('div');
			answerElement.classList.add('digit-element');
			answerElement.innerHTML = answer;
			answerElement.addEventListener('click', () => {
				selectedAnswer = answer;
				nextButton.disabled = false;
				nextButton.classList.add('active');
				const selectedDigit = document.querySelector('.digit-element.selected');
				if (selectedDigit) {
					selectedDigit.classList.remove('selected');
				}
				answerElement.classList.add('selected');
			});
			answerContainer.appendChild(answerElement);
		});
		questionContainer.appendChild(answerContainer);
	}
	selectedAnswer = null;
	nextButton.disabled = true;
}


showQuestion(currentQuestion);
console.log(answers);

function showResult() {
	const testContainer = document.querySelector('.test-container');
	testContainer.classList.add('test-container__loading');
	testContainer.innerHTML = '';
	const resultTitle = document.createElement('h2');
	resultTitle.classList.add('title-result');
	resultTitle.innerHTML = `Oбработка <br> результатов`;
	const loader = document.createElement('div');
	loader.classList.add('sk-chase');
	for (var i = 0; i < 6; i++) {
		let dot = document.createElement('div');
		dot.classList.add('sk-chase-dot');
		loader.appendChild(dot);
	}
	const loadingText = document.createElement('p');
	loadingText.classList.add('loading-text');
	loadingText.innerHTML = `Определение стиля мышления...........<br>........................................................`;
	testContainer.appendChild(resultTitle);
	testContainer.appendChild(loader);
	testContainer.appendChild(loadingText);
	document.querySelector('.button-container').style.display = 'none';
}

const progresBar = document.querySelector('.progress-bar');
nextButton.addEventListener('click', () => {
	currentQuestion++;
	nextButton.classList.remove('active');
	progresBar.value += 9.09;
	if (currentQuestion < questions.length) {
		showQuestion(currentQuestion);
	} else {
		showResult();
		setTimeout(function() {
			progresBar.style.display = 'none';
			const mainContainer = document.querySelector('.main-test');
			mainContainer.style.display = 'block';
			const testContainer = document.querySelector('.test-container');
			testContainer.classList.add('timer-container');
			testContainer.classList.remove('test-container');
			testContainer.classList.remove('test-container__loading');
			testContainer.innerHTML = '';
			const headerTitle = document.querySelector('.header__title');
			headerTitle.textContent = 'Готово!';
			headerTitle.style.fontSize = '20px';
			let html = '<h3 class="first-header"> Ваш результат рассчитан: </h3>';
			html += '<p class="first-text"><span>Вы относитесь к 3% </span>респондентов, чей уровень интеллекта более чем на 15 пунктов отличается от среднего в большую или меньшую сторону! </p>';
			html += '<h2 class="second-header">Скорее получите свой результат!</h2>';
			html += '<div class="highlighted-text">В целях защиты персональных </br>данных результат теста, их подробная интерпретация и рекомендации доступны в виде голосового сообщения по звонку с вашего мобильного телефона </div>';
			html += '<p class="timer-title">Звоните скорее, запись доступна всего </p>';
			html += '<div class="timer" id="timer"></div>';
			html += '<button class="call-button" type="button" ><img src="img/call.svg"/ alt="call">Позвонить и прослушать результат </button>';
			html += '<div class="show-result"></div>';
			html += '<footer class="final-footer">TERMENI SI CONDITII: ACESTA ESTE UN SERVICIU DE DIVERTISMENT. PRIN FOLOSIREA LUI DECLARATI CA AVETI 18 ANI IMPLINITI, </footer>';
			testContainer.innerHTML = html;
			const timer = document.getElementById("timer");
			let milliseconds = 600000;
			
			function updateTimer() {
				if (milliseconds <= 0) {
					clearInterval(timerInterval);
					timer.innerHTML = "Время вышло!";
				} else {
					let minutes = Math.floor(milliseconds / 60000);
					let seconds = Math.floor((milliseconds % 60000) / 1000);
					if (minutes < 10) {
						minutes = "0" + minutes;
					}
					if (seconds < 10) {
						seconds = "0" + seconds;
					}
					timer.innerHTML = `<span>${minutes}:${seconds}</span> минут`;
					milliseconds -= 1000;
				}
			}
			let timerInterval = setInterval(updateTimer, 1000);

			const callButton = document.querySelector('.call-button');
			const resultContainer = document.querySelector('.show-result');
			callButton.addEventListener('click', () => {
				fetch('https://swapi.dev/api/people/1/')
					.then(response => response.json())
					.then(data => {
						const table = `
            <table>
              <tr>
                <th>Name</th>
                <td>${data.name}</td>
              </tr>
              <tr>
                <th>Height</th>
                <td>${data.height}</td>
              </tr>
              <tr>
                <th>Mass</th>
                <td>${data.mass}</td>
              </tr>
              <tr>
                <th>Hair Color</th>
                <td>${data.hair_color}</td>
              </tr>
              <tr>
                <th>Skin Color</th>
                <td>${data.skin_color}</td>
              </tr>
              <tr>
                <th>Eye Color</th>
                <td>${data.eye_color}</td>
              </tr>
              <tr>
                <th>Birth Year</th>
                <td>${data.birth_year}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>${data.gender}</td>
              </tr>
              <tr>
                <th>Homeworld</th>
                <td>${data.homeworld}</td>
              </tr>
            </table>
          `;
						resultContainer.innerHTML = table;
					})
					.catch(error => {
						console.log(error);
					});
			});
		}, 5000);
	}


});