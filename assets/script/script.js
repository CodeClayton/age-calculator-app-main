const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const calcButton = document.querySelector('.calcAgeButton');

const yearValue = document.querySelector('.yearValue')
const monthValue = document.querySelector('.monthValue')
const dayValue = document.querySelector('.dayValue')

calcButton.addEventListener('click', () => {
  const d = Number(dayInput.value);
  const m = Number(monthInput.value);
  const y = Number(yearInput.value);

  if (!d || !m || !y) {
    console.log('Preencha todos os campos.');
    return;
  }

  const birthDate = new Date(y, m - 1, d);
  const today = new Date();
  if (birthDate > today) {
    console.log('Data no futuro não é válida.');
    return;
  }

  if (
    birthDate.getDate() !== d ||
    birthDate.getMonth() !== m - 1 ||
    birthDate.getFullYear() !== y
  ) {
    console.log('Data inválida.');
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
