const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const calcButton = document.querySelector('.calcAgeButton');

const yearValue = document.querySelector('.yearValue')
const monthValue = document.querySelector('.monthValue')
const dayValue = document.querySelector('.dayValue')

//Validators form (LIMITO O INPUT)
dayInput.addEventListener('input', (e) => {
  let value = e.target.value;

  value = value.replace(/\D/g, '');

  if (value.length > 2) {
    value = value.slice(0, 2);
  }

  e.target.value = value;
});

monthInput.addEventListener('input', (e) => {
  let value = e.target.value;
  value = value.replace(/\D/g, '');

  if (value.length > 2) {
    value = value.slice(0, 2);
  }

  e.target.value = value;
});

yearInput.addEventListener('input', (e) => {
  let value = e.target.value;

  value = value.replace(/\D/g, '');

  if (value.length > 4) {
    value = value.slice(0, 4);
  }

  e.target.value = value;
});


calcButton.addEventListener('click', () => {
  const d = Number(dayInput.value);
  const m = Number(monthInput.value);
  const y = Number(yearInput.value);

  if (!d || !m || !y) {
      Toastify({
        text: "Preencha todos os campos.",
        duration: 3000,
        backgroundColor:"#2196F3"
        }).showToast();
    return;
  }

  let dayIsCorrect = verifyDay(d,m);
  if(!dayIsCorrect){
    Toastify({
        text: "Data inválida.",
        duration: 3000,
        backgroundColor:"#F44336"
        }).showToast();
    return;
  }

  if(y < 1901 || m > 12){
    Toastify({
      text: 'Data inválida.',
      duration: 3000,
      backgroundColor:"#F44336"
      }).showToast();
  }

  const birthDate = new Date(y, m - 1, d);
  const today = new Date();
  if (birthDate > today) {
        Toastify({
        text: 'Data no futuro não é válida.',
        duration: 3000,
        backgroundColor:"#F44336"
        }).showToast();
    return;
  }

  if (
    birthDate.getDate() !== d ||
    birthDate.getMonth() !== m - 1 ||
    birthDate.getFullYear() !== y
  ) {
  Toastify({
    text: "Data inválida.",
    duration: 3000,
    backgroundColor:"#F44336"
    }).showToast();

    return;
  }

  const age = calculateAge(birthDate, today);
  yearValue.innerHTML = age.years;
  monthValue.innerHTML = age.months;
  dayValue.innerHTML = age.days;
  //console.log(`${age.years} anos, ${age.months} meses e ${age.days} dias`);
});

function calculateAge(birthDate, today) {
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function verifyDay(day, month){
  const date = new Date(2023, month - 1, day);
  return date.getDate() === day && date.getMonth() === (month - 1);
}
