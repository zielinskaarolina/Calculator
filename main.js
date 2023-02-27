const numbers = document.querySelectorAll('.liczba');
const operators = document.querySelectorAll('.operator');
const placeScore1 = document.querySelector('.jeden');
const placeScore2 = document.querySelector('.wynikNastepny');
const wyczysc = document.querySelector('.wyczysc');
const usunZnak = document.querySelector('.usun');
const rownosc = document.querySelector('.rownosc');

let score1 = '';
let score2 = '';
let dzialanie = '';

placeScore2.textContent = score2;

const zaaktualizujWynik = () => {
	placeScore1.textContent = score1;
	placeScore2.textContent = score2;
};

const operatorActions = (operator) => {
	score1 *= 1;
	score2 *= 1;

	rownanie();

	switch (operator) {
		case '+':
			dzialanie = 'dodawanie';
			score1 += score2;
			break;
		case '-':
			if (score2) {
				score2 -= score1;
			}
			dzialanie = 'odejmowanie';
			break;
		case 'x':
			if (score2) {
				score1 *= score2;
			}
			dzialanie = 'mnozenie';
			break;

		case '/':
			if (score2) {
				score2 /= score1;
				score1 = score2;
			}
			dzialanie = 'dzielenie';
			break;
	}

	score2 = score1;

	placeScore1.textContent = score2;
	score1 = '';
};

const dodajLiczbe = (liczba) => {
	if (liczba === '.') {
		if (score1.includes('.')) {
			return;
		}
	}

	score1 += liczba;
};

const wyczyscWszystko = () => {
	score1 = '';
	score2 = null;
};

const usunJedenZnak = () => {
	if (score1) {
		score1 = score1.slice(0, -1);
	}
};

const rownanie = () => {
	score1 *= 1;
	score2 *= 1;

	if (dzialanie === 'dodawanie') {
		score1 += score2;
	} else if (dzialanie === 'odejmowanie') {
		score2 -= score1;
		score1 = score2;
	} else if (dzialanie === 'mnozenie') {
		score1 *= score2;
	} else if (dzialanie === 'dzielenie') {
		score2 /= score1;
		score1 = score2;
	}

	score2 = '';
	zaaktualizujWynik();
	return;
};

const addActiveClass = (e) => {
	console.log(e);
};

operators.forEach((operator) => {
	operator.addEventListener('click', (e) => {
		addActiveClass(e.target);
		operatorActions(operator.textContent);
	});
});

numbers.forEach((number) => {
	number.addEventListener('click', () => {
		dodajLiczbe(number.textContent);
		zaaktualizujWynik();
	});
});

wyczysc.addEventListener('click', () => {
	wyczyscWszystko();
	zaaktualizujWynik();
});

usunZnak.addEventListener('click', () => {
	usunJedenZnak();
	zaaktualizujWynik();
});

rownosc.addEventListener('click', rownanie);
