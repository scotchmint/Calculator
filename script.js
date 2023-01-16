function add(num1, num2)
{
    return num1 + num2;
}

function subtract(num1, num2)
{
    return num1 - num2;
}

function multiply(num1, num2)
{
    return num1 * num2;
}

function divide(num1, num2)
{
  if (num2 === 0)
  {
    display.textContent = "ERROR";
  }
  else
  {
    return num1 / num2;
  }
}

function module(num1, num2)
{
  return num1 % num2;
}

function sqrt(num)
{
  return Math.sqrt(num);
}

function operate(operator, num1, num2)
{
  if (operator === "x")
  {
    operator = "*";
  }
  else if (operator === "÷")
  {
    operator = "/";
  }

    switch(operator)
    {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        case "%":
            return module(num1, num2);
    }
}

let history = document.querySelector('.history');
let display = document.querySelector('.display');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let clear = document.querySelector('.clear');
let del = document.querySelector('.delete');

let historyArr = [];
let firstNum = '';
let secondNum = '';
let operator = '';
let result;

display.textContent = '0';

numbers.forEach(function(number){
  number.addEventListener('click', function(e){
    if (result >= 0 || result < 0)
    {
      firstNum = result;
    }

    if (operator === '')
    {
      firstNum += +e.target.textContent;
      display.textContent = firstNum;
    }
    else
    {
      if (operator !== "=")
      {
        secondNum += e.target.textContent;
        display.textContent = firstNum + " " + operator + " " + secondNum;
      }
      else
      {
        firstNum += e.target.textContent;
        result = firstNum;
        display.textContent = result;
      }
    }

    
  });
});

let temp = '';
let historyDisplay = '';

operators.forEach(function(op){
  op.addEventListener('click', function(e){
    operator = e.target.textContent;

    if (e.target.textContent !== "=")
    {
      if (firstNum === '')
      {
        firstNum = 0;
      }

      display.textContent += " " + operator;
      temp = operator;

      if (secondNum)
      {
        secondNum = '';
      }
    }
    else
    {
      result = operate(temp, +firstNum, +secondNum);
      if (result === undefined)
      {
        firstNum = '';        
      }
      else
      {
        display.textContent = result;
        historyDisplay = firstNum + " " + temp + " " + secondNum + " " + operator + " " + result;
        historyArr.push(historyDisplay);

        let historyElement;
        for (let i = 0; i < historyArr.length; ++i)
        {
          historyElement = document.createElement('div');
          historyElement.textContent = historyArr[i];
        }
        history.appendChild(historyElement);
      }
    }

    });
  });