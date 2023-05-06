import './App.css';
import React from 'react';
//import ReactDOM from 'react-dom/client';
import './index.css';

const calcRegex = /^([0-9]|-|\+|\*|\/|\.)*$/;
const Header = () => <div className='header'>Calculadora</div>;

  const Button = (props) => {
    const {value, onClick, className} = props
   return ( <button
    onClick = {()=> {
      onClick(value);
    }}
    className={className}>
      {value}
       </button>
    )}
    
    const Calculadora = () => {
          const [display, setDisplay] = React.useState('');
          const [error, setError] = React.useState();
          const [showAdv, toggleAdv] = React.useState(false);
          const [history, setHistory] = React.useState([]);
          const [showHist, toggleHist] = React.useState(false);
          const histRef = React.useRef();
          const buildButtonKey = value => {
                    const span2Class = value === 0 ? "span2" : "";
                    const primaryClass = isNaN(value) ? "primary" : "";
                   return( 
                   <Button
                    key={value} 
                    value={value}
                    onClick={handleClick}
                    className={`${span2Class}${primaryClass}`}
                    />
                   );
                   }
          
          const keyboard = [
            7,8,9,"/","C",
            4,5,6,"*","DEL",
            1,2,3,"-","Adv",
            0,".","+","="]

            const advKeys = [
              "(", ")", "Hist", "UP", "AC"
            ]

            React.useEffect(()=>{
              if(error){
              setError();
            };
            },[display, error]);

            React.useEffect(()=>{
              if(history.length > 2 && showHist){
              histRef.current.scrollTop = 
                histRef.current.scrollHeight;
              }
            },[history.length, showHist]);
            

            const onTheMath = () => {
              try{
                // eslint-disable-next-line no-eval
                const result = eval(display);
                setHistory([].concat(history, {
                  calculation: display, result }));
              setDisplay(`${result}`);
            } catch (err){
              setError(`Expressão Inválida: ${err.message}`);
            }
            }

          
          const handleClick = (value) =>{
            switch (value) {
              case "=":
                onTheMath();                  
              break;
              case "C":
                  setDisplay("");
              break;
              case "DEL":
                  setDisplay(display.substring(0, display.length-1));
              break;
              case "Adv":
                toggleAdv(!showAdv);
                toggleHist(false);
                break;
              case "Hist":
                toggleHist(!showHist);
              break;
              case "AC":
                setDisplay("");
                setHistory([]);
              break;
              case "UP":
                const lastIndex = history.length - 1;
                if(lastIndex > -1){
                const newDisplay = history[lastIndex].calculation;
                const newHistory = history.slice(0, lastIndex);
                setDisplay(newDisplay);
                setHistory(newHistory);
              } else{
                setDisplay("");
              }
                break;
           default:
              setDisplay(`${display}${value}`);
            }
          }

           return (
            <div className='calculadora'>
              {showHist && (
                <div ref={histRef} className='history'>
                {history.map( ({calculation, result}, index) => (
                  <p key={index}>
                    {`${calculation} = ${result}`}
                  </p>
                ))}  
                </div>
              )}
              <input 
              type="text"
              className='display'
              value={display}
              onChange={(event)=>{
                const {value}= event.target;
                
                if(calcRegex.test(value)){
                setDisplay(event.target.value);
              }
            }}
            onKeyPress = {event =>{
              if(event.key === 'Enter'){
                onTheMath();
              }else if(event.key.toLocaleLowerCase() === 'c'){
                 setDisplay('');
              }
            }}
              />
              {error && (
                <p className='error'>{error}</p>
              )}
              {showAdv && (
                <div className='teclado'>
              {advKeys.map(buildButtonKey)}
                </div>       
              )}
                     
                <div className='teclado'>
                  {keyboard.map(buildButtonKey)}                  
                </div>
            </div>
          );
              }
        
                  

function App() {
  return (
    <div>
      <Header />
      <Calculadora />
    </div>
  );
}

export default App;
