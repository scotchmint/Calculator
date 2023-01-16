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

numbers.forEach(function(number){
  number.addEventListener('click', function(e){
    if (result >= 0 || result < 0)
    {
      firstNum = result;
    }

    if (operator === '')
    {
      firstNum += e.target.textContent;
      display.textContent = firstNum;
    }
    else
    {
      if (operator !== "=")
      {
        secondNum += e.target.textContent;

        if (operator === "√") 
        {
          display.textContent = operator + " " + secondNum;
        } 
        else 
        {
          display.textContent = firstNum + " " + operator + " " + secondNum;
        }
        
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
let historyElement = '';

operators.forEach(function(op){
  op.addEventListener('click', function(e){
    operator = e.target.textContent;

    if (e.target.textContent !== "=")
    {
      if (firstNum === "") 
      {
        firstNum = 0;
      } 
      else if (secondNum) 
      {
        if (temp === "√") 
        {
          result = sqrt(secondNum);
          firstNum = result;
          secondNum = "";
        } 
        else 
        {
          result = operate(temp, +firstNum, +secondNum);
          display.textContent = result;
          secondNum = "";
        }
      }

      temp = operator;
      display.textContent += " " + temp;
    }
    else
    {
      if(temp === '√')
      {
        result = sqrt(secondNum);
        firstNum = result;
      }
      else
      {
        result = operate(temp, +firstNum, +secondNum);
      }
      
      if (result === undefined)
      {
        firstNum = '';   
        secondNum = '';     
      }
      else
      {
        display.textContent = result;

        if(temp === '√')
        {
          historyDisplay = temp + " " + secondNum + " " + operator + " " + result;
        }
        else
        {
          historyDisplay = firstNum + " " + temp + " " + secondNum + " " + operator + " " + result;
        }
        
        historyArr.push(historyDisplay);

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