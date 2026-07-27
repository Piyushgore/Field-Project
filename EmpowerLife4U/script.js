const genderForm = document.getElementById('genderForm');
const metricsForm = document.getElementById('metricsForm');
const bmiResults = document.getElementById('bmiResults');
const genderImage = document.getElementById('genderImage');
const backBtn = document.getElementById('backBtn');
const backFromBmiBtn = document.getElementById('backFromBmiBtn');
const bmiArrow = document.getElementById('bmiArrow');
const bmiNumber = document.getElementById('bmiValueSvg');
const bmiCategory = document.getElementById('bmiCategory');
const nextBtn = document.getElementById('nextBtn');
const mainPage = document.getElementById('mainPage');
const header = document.querySelector('.header');
let _needleAnim = null;
let _currentAngle = 0;

genderForm.addEventListener('submit', function(e){
	e.preventDefault();
	const checked = document.querySelector('input[name="gender"]:checked');
	if(!checked){
		alert('Please select an option to continue.');
		return;
	}

	genderForm.classList.add('hidden');
	metricsForm.classList.remove('hidden');

	const selectedGender = checked.value;
	genderImage.src = selectedGender + '1.png';
	genderImage.alt = selectedGender + ' image';

	console.log('Selected gender:', selectedGender);
});

backBtn.addEventListener('click', function(e){
	e.preventDefault();
	metricsForm.classList.add('hidden');
	genderForm.classList.remove('hidden');
    if (header) header.classList.remove('main-active');
});

metricsForm.addEventListener('submit', function(e){
	e.preventDefault();
	const name = document.getElementById('name').value && document.getElementById('name').value.trim();
	const age = document.getElementById('age').value;
	const height = document.getElementById('height').value;
	const weight = document.getElementById('weight').value;
	const gender = document.querySelector('input[name="gender"]:checked').value;

	if(!name){
		alert('Please enter your name.');
		return;
	}

	if(!age || !height || !weight){
		alert('Please fill in all fields.');
		return;
	}

	const heightInMeters = height / 100;
	const bmi = weight / (heightInMeters * heightInMeters);

	const userData = {name, gender, age, height, weight, bmi};
	console.log(userData);
	
	showBMIResults(bmi);
});

function calculateBMI(bmi) {
	if (bmi < 18.5) {
		return { category: 'Underweight', color: '#3498db', labelId: 'lbl-underweight' };
	}
	if (bmi < 25) {
		return { category: 'Normal Weight', color: '#2ecc71', labelId: 'lbl-normal' };
	}
	if (bmi < 30) {
		return { category: 'Overweight', color: '#f39c12', labelId: 'lbl-overweight' };
	}
	return { category: 'Obese', color: '#e74c3c', labelId: 'lbl-obese' };
}

function showBMIResults(bmi) {
	const result = calculateBMI(bmi);
	
	metricsForm.classList.add('hidden');
	bmiResults.classList.remove('hidden');
	
	if (bmiNumber) {
		bmiNumber.textContent = bmi.toFixed(1);
	}
	bmiCategory.textContent = result.category;
	bmiCategory.style.color = result.color;
	
	if (_needleAnim) {
		cancelAnimationFrame(_needleAnim);
		_needleAnim = null;
	}

	const fixedAngles = {
		'Underweight': 45,
		'Normal Weight': 90,
		'Overweight': 135,
		'Obese': 180
	};

	const to = fixedAngles[result.category] !== undefined ? fixedAngles[result.category] : 140;

	try {
		if (!bmiArrow) throw new Error('bmiArrow element not found');
		if (_needleAnim) {
			cancelAnimationFrame(_needleAnim);
			_needleAnim = null;
		}
		bmiArrow.setAttribute('transform', 'rotate(' + to + ' 200 200)');
		_currentAngle = to;
		console.debug('Jumped needle to', to, 'for category', result.category);
	} catch (err) {
		console.error('Failed to set needle transform immediately', err);
	}
}

backFromBmiBtn.addEventListener('click', function(e){
	e.preventDefault();
	bmiResults.classList.add('hidden');
	metricsForm.classList.remove('hidden');
	if (_needleAnim) {
		cancelAnimationFrame(_needleAnim);
		_needleAnim = null;
	}
	_currentAngle = 0;
	bmiArrow.setAttribute('transform', 'rotate(0 200 200)');
    if (header) header.classList.remove('main-active');
});

if (nextBtn) {
	nextBtn.addEventListener('click', function(e){
		e.preventDefault();
		try {
			bmiResults.classList.add('hidden');
			if (mainPage) mainPage.classList.remove('hidden');
			if (header) header.classList.add('main-active');
			if (mainPage) mainPage.scrollIntoView({behavior: 'smooth'});
		} catch (err) {
			console.error('Failed to navigate to main page', err);
		}
	});
}
if (nextBtn){
	nextBtn.addEventListener('click', function(){
		window.location.href = "main.html";
});
}