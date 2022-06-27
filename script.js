const dropList = document.querySelectorAll('.drop-list select'),
	getButton = document.querySelector('form button'),
	fromCurrency = document.querySelector('.from select'),
	toCurrency = document.querySelector('.to select'),
	icon = document.querySelector('.icons');


for (var i = 0; i < dropList.length; i++) {
	for (var country_code in country_list) {
		let selected;
		if (i == 0) {
			selected = country_code == 'USD' ? 'selected' : '';
		} else if (i == 1) {
			selected = country_code == 'BDT' ? 'selected' : '';
		}
		let optionTag = `<option value="${country_code}" ${selected}>${country_code}</option>`
		dropList[i].insertAdjacentHTML('beforeend', optionTag);
	}
	dropList[i].addEventListener('change', e => {
		loadFlag(e.target);
	})
}

function loadFlag(element) {
	for (var code in country_list) {
		if (code == element.value) {
			let imgTag = element.parentElement.querySelector('img');
			imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`
		}
	}
}


getButton.addEventListener('click', e => {
	e.preventDefault();
	getExchangeRate();
})
icon.addEventListener('click', e => {
	fromToTo();
})


function fromToTo() {
	let tempCode = toCurrency.value;
	toCurrency.value = fromCurrency.value;
	fromCurrency.value = tempCode;
	getExchangeRate();
	loadFlag(fromCurrency)
	loadFlag(toCurrency)
}

function getExchangeRate() {
	let amount = document.querySelector('.amount input'),
		amountVal = amount.value,
		exchangeRateTxt = document.querySelector('.exchange-rate');
	exchangeRateTxt.innerHTML = `Getting Exchange Rate...`
	if (amountVal == '' || isNaN(amountVal)) {
		exchangeRateTxt.innerHTML = `Please Enter only Number Without Syntax Or Arithmetic Signs`;
		return
	}
	if (amountVal == '' || amountVal == 0) {
		amount.value = 1;
		amountVal = 1;
	}
	let url = `https://v6.exchangerate-api.com/v6/b3671758d7bfb57716c8544d/latest/${fromCurrency.value}`;
	fetch(url).then(response => response.json()).then(result => {
		let exchangeRate = result.conversion_rates[toCurrency.value]
		let totalExchangeRate = (exchangeRate * amountVal).toFixed(3);
		exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
	});
}
getExchangeRate();
