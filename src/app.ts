const bill = <HTMLInputElement>document.getElementById("bill");
const people = <HTMLInputElement>document.getElementById("people");
const amountPerson = document.getElementById("amount");
const total = document.getElementById("total");
const tip = document.querySelectorAll(".tip");
const custom = <HTMLInputElement>document.getElementById("custom");
const button = document.querySelector("button");
const error = document.getElementById("error");
let active = 0;

tip.forEach((number) => {
  //function that add event listener for each tip and if tip is clicked it adds class and remove it from other
  number.addEventListener("click", function active() {
    tip.forEach((item) => {
      item.classList.remove("active");
    });
    number.classList.add("active");
  });
});

const calculate = () => {
  active = Number(custom.value); //sets custom value
  for (let i = 0; i < tip.length; i++) {
    //iterates through every item in tip[] looking for class "active" and copy number of tip without % and then adds it to variate active
    if (tip[i].classList.contains("active") === true) {
      let length = tip[i].innerHTML.length - 1; //removes % from inner html // takes only number
      active = Number(tip[i].innerHTML.slice(0, length));
    }
  }
  let funcPersonTip: number = Number(
    ((Number(bill.value) * active) / 100 / Number(people.value)).toFixed(2)
  ); //amount per person
  amountPerson.innerHTML = `$${funcPersonTip}`;
  total.innerHTML = `$${(
    Number(bill.value) / Number(people.value) +
    Number(funcPersonTip)
  ).toFixed(2)}`; //total price for person
};

custom.addEventListener("click", function remove() {
  //adds event listener to custom tip that removes class "active" from every other tip
  tip.forEach((item) => {
    item.classList.remove("active");
  });
});

const on = () => {
  //function that checks if function calculate can start
  if (
    Number(bill.value) != 0 &&
    bill.value != "" &&
    Number(people.value) != 0 &&
    people.value != ""
  ) {
    calculate();
  } else {
    total.innerHTML = "$0.00";
    amountPerson.innerHTML = "$0.00";
  }
  if (people.value == "0") {
    people.style.border = "1px solid red";
    error.style.opacity = "1";
  } else {
    people.style.border = "1px solid transparent";
    error.style.opacity = "0";
  }
};

for (let i = 0; i < tip.length; i++) {
  tip[i].addEventListener("click", on); //add event listener  to every tip[]
}

button.addEventListener("click", function reset() {
  //restes everything when clicked on button
  bill.value = "";
  people.value = "";
  total.innerHTML = "$0.00";
  amountPerson.innerHTML = "$0.00";
  custom.value = "";
  tip.forEach((item) => {
    item.classList.remove("active");
  });
  on();
});

custom.addEventListener("click", on);
custom.addEventListener("keyup", on);
people.addEventListener("keyup", on);
bill.addEventListener("keyup", on);
