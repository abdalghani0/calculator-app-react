import { useState } from "react";
import "./App.css";

export default function Calculator() {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [previousNumber, setPreviousNumber] = useState("0");
  const [operation, setOperation] = useState("");
  document.body.className= "theme-1";

  return (
    <main className="app">
      <div className="container">
        <Header />
        <Screen currentNumber={currentNumber} previousNumber={previousNumber} />
        <Keypad
          currentNumber={currentNumber}
          previousNumber={previousNumber}
          op ={operation}
          setOp={setOperation}
          setCurrentNumber={setCurrentNumber}
          setPreviousNumber={setPreviousNumber}
        />
      </div>
    </main>
  );
}

function Header() {
  function changeTheme(event) {
    if(event.target.id !== "slider" && event.target.id !== null && event.target.id !== "") {
      let themeNum = event.target.id;
      let app = document.body;
      let slider = document.getElementById("slider");
      app.className = `theme-${themeNum}`;
      slider.style.left = themeNum === "1"? "4px" : themeNum === "2"? "25px" :"45px"; 
  }
  }

  return (
      <header className= "header">

        <h3>calc</h3>
  
  
        <div className= "theme-toggle">
  
          <span></span>
  
          <div>
              <span className= "theme-num">1</span> <span className= "theme-num">2</span> <span>3</span>
          </div>
  
          <p>THEME</p>
  
          <div className="theme-selector">
                <div onClick= {(e) => changeTheme(e)}>
                  <span id= "1" className= "input"></span>
                  <span id= "2" className= "input"></span>
                  <span id= "3" className= "input"></span>
                </div>
		            <span id="slider"></span>
		      </div> 
  
         </div>

</header>
  );
  
}

function Screen({ currentNumber, previousNumber }) {
  return (
    <section className="screen">
      <span>{previousNumber}</span>
      <span>{currentNumber}</span>
    </section>
  );
}


function Keypad({ currentNumber, previousNumber, setCurrentNumber, setPreviousNumber, op, setOp }) {
  let res;

  function handleButton(event) {
      let target = event.target;
      if(target.matches(".num")) {
        if(currentNumber[0] === "0"){
          setCurrentNumber(target.innerHTML);
      }
          else
          setCurrentNumber(currentNumber + target.innerHTML);
      }
      else if(target.matches(".op")) {
          setPreviousNumber(currentNumber);
          setCurrentNumber("0");
          setOp(target.innerHTML);
          console.log(op);
      }
      else if(target.matches(".special")) {
          if(target.innerHTML === "DEL") {
              
              currentNumber.length === 1
                  ? (setCurrentNumber("0"))
                  : (setCurrentNumber(currentNumber.slice(0, -1) + ""));
          }
          else {
              setPreviousNumber("0");
              setCurrentNumber("0");
          }
      }
      else if(target.matches(".result")) {
          console.log(op);
          switch(op) {
              case "+":
                  res = parseFloat(previousNumber) + parseFloat(currentNumber);
                  break;
              case "-":
                  res = parseFloat(previousNumber) - parseFloat(currentNumber);
                  break;
              case "x":
                  res = parseFloat(previousNumber) * parseFloat(currentNumber);
                  break;
              case "/":
                  res = previousNumber*1 / currentNumber*1;
                  break;
              default:
                  res = 0;
                  break;
          }
          setCurrentNumber(res.toString());
          setPreviousNumber("0");
      }
      console.log({currentNumber});
      console.log({previousNumber});
  }

  return (
      <section 
          onClick= {(e) => handleButton(e)}
          className= "keypad">

          <span className="key num">7</span>
          <span className="key num">8</span>
          <span className="key num">9</span>
          <span className="key special">DEL</span>
          <span className="key num">4</span>
          <span className="key num">5</span>
          <span className="key num">6</span>
          <span className="key op">+</span>
          <span className="key num">1</span>
          <span className="key num">2</span>
          <span className="key num">3</span>
          <span className="key op">-</span>
          <span className="key num">.</span>
          <span className="key num">0</span>
          <span className="key op">/</span>
          <span className="key op">x</span>
          <span className="key special" >RESET</span>
          <span className="key result" >=</span>
  
    </section>
  );
}