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
let dot = document.getElementById('dot');
let clearBtn = document.querySelector('.clear');
let deleteBtn = document.querySelector('.delete');

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

    // in the next operation, result will be the first number in the calculation
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

        if (operator === "√") // special handling for square root because it takes one number only
        {
          display.textContent = operator + " " + secondNum;
        } 
        else 
        {
          display.textContent = firstNum + " " + operator + " " + secondNum;
        }
        
      }
      else // user can add more numbers to result shown on screen to start a new calculation with it
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

    dot.disabled = false; // re-enable dot after entering an operator

    // handle chain calculations
    if (e.target.textContent !== "=")
    {    
      if (firstNum === "") // this is important if user enter operator before entering any number
      {
        firstNum = 0;
      }
      else if (secondNum) // at this point: first, second numbers and operator are all ready for calculations
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

      secondNum = ""; // empty second number so user can chain operations
      tempOperator = operator;
      display.textContent += " " + tempOperator;
    }
    else // handle when user enter operator "="
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
        // handle problem (firstNum + "empty secondNum" = result)
        if (secondNum === "") 
        {
          secondNum = "0";
        }

        result = operate(tempOperator, +firstNum, +secondNum);
      }

      checkResult = checkMathError(result);

      // reset numbers if user get an undefined result by mistake
      if (result === undefined)
      {
        firstNum = '';   
        secondNum = '';     
      }
      else if(checkResult) // handle dividing by zero or NaN results
      {
        result = 'MATH ERROR!';
        display.textContent = result;
        secondNum = '';
      }
      else // if everything is normal, print result on screen and assign calculation to history
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
    
    // reset second number after every successful operation so that user can chain operations using result
    secondNum = '';
    });
  });

clearBtn.addEventListener('click', clearScreen);