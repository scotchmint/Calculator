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
  return num1 / num2;
}

function module(num1, num2)
{
  return num1 % num2;
}

function sqrt(num)
{
  return Math.round(Math.sqrt(num) * 1000) / 1000;
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

  let operation = 0;
    switch(operator)
    {
        case "+":
            operation = add(num1, num2);
            break;
        case "-":
            operation = subtract(num1, num2);
            break;
        case "*":
            operation = multiply(num1, num2);
            break;
        case "/":
            operation = divide(num1, num2);
            break;
        case "%":
            operation = module(num1, num2);
            break;
    } 
  
  return Math.round(operation *1000) / 1000;
}

function checkMathError(result)
{
  let resultStr = result.toString();

  if(resultStr === "NaN" || resultStr === "Infinity" || resultStr === "-Infinity")
  {
    return true;
  }

  return false;
}

function clearScreen() 
{
  historyArr = [];
  history.textContent = "";
  display.textContent = "";
  firstNum = "";
  secondNum = "";
  operator = "";
  result = undefined;
}

let history = document.querySelector('.history');
let display = document.querySelector('.display');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let clear = document.querySelector('.clear');
let del = document.querySelector('.delete');
let dot = document.getElementById('dot');

let historyArr = [];
let firstNum = '';
let secondNum = '';
let operator = '';
let result = undefined; // undefined makes calculations easier than numbers or strings

numbers.forEach(function(number){
  number.addEventListener('click', function(e){
    
    if (e.target.textContent === '.')
    {
      // if user enters dot only, prefix it with zero
      if(!firstNum)
      {
        firstNum = '0';
      }
      dot.disabled = true;
    }

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
        if (e.target.textContent === '.')
        {
          // if user enters dot only, prefix it with zero
          if(!secondNum)
          {
            secondNum = '0';
          }
          dot.disabled = true;
        }
        
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

let tempOperator = '';
let historyDisplay = '';
let historyElement = '';
let checkResult = false;

operators.forEach(function(op){
  op.addEventListener('click', function(e){
    operator = e.target.textContent;

    dot.disabled = false;

    if (e.target.textContent !== "=")
    {
      if (firstNum === "") 
      {
        firstNum = 0;
      } 
      else if (secondNum) 
      {
        if (tempOperator === "√") 
        {
          result = sqrt(secondNum);
          firstNum = result;
        } 
        else 
        {
          result = operate(tempOperator, +firstNum, +secondNum);

          checkResult = checkMathError(result);
          if (checkResult) 
          {
            result = "MATH ERROR!";
          }
          
        }
        display.textContent = result;
      }
      secondNum = "";
      tempOperator = operator;
      display.textContent += " " + tempOperator;
    }
    else
    {
      if (display.textContent.includes('.'))
      {
        dot.disabled = true;
      }

      if(tempOperator === '√')
      {
        result = sqrt(secondNum);
        firstNum = result;
      }
      else
      {
        result = operate(tempOperator, +firstNum, +secondNum);
      }
      
      checkResult = checkMathError(result);

      if (result === undefined)
      {
        firstNum = '';   
        secondNum = '';     
      }
      else if(checkResult)
      {
        result = 'MATH ERROR!';
        display.textContent = result;
        secondNum = '';
      }
      else
      {
        // if result is integer re-enable the dot button
        if (result % 1 === 0) 
        {
          dot.disabled = false;
        }

        display.textContent = result;
        
        if(tempOperator === '√')
        {
          historyDisplay = tempOperator + " " + secondNum + " " + operator + " " + result;
        }
        else
        {
          historyDisplay = firstNum + " " + tempOperator + " " + secondNum + " " + operator + " " + result;
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

clear.addEventListener('click', clearScreen);