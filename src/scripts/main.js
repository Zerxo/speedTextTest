import { setTextElement,text } from "./text.js";
const showText = document.getElementById('textwriting');
const startBtn = document.getElementById('btn-start');
const windowBegin = document.getElementById('begin')
const windowTest = document.getElementById('test')
let timeElement = document.getElementById('time-ago');

const error =  document.querySelector('.error');
let timer = null;


let initalText = text[Math.floor(Math.random()*text.length)];

window.addEventListener('load',init);


function init(){
    startBtn.addEventListener('click',startTest);

}

function startTest(){
    const selectTime = document.getElementById('time').value;

    if(!selectTime){
        error.innerText="Please Choose Time";
        return
    }
    error.innerText="";
    timer = setTimer(selectTime);
    windowBegin.classList.add('none')

    showText.innerHTML = setTextElement(initalText);
    showText.children[0].children[0].children[0].classList.add('active')
    showText.children[0].classList.add('activeLine')
    windowTest.classList.remove('none','hide');
    windowTest.classList.add('show');
    windowTest.ontransitionend = ()=>  windowTest.classList.remove('show');

    window.addEventListener('keydown',writing)
}
let lineIdx = 0;
let wordIdx = 0;
let charIdx=  0;
let wordPerMin = [];
let wordAllTime = [];
function writing({keyCode,key}){
  
    let lines = showText.querySelectorAll('.line')
    let line = lines[lineIdx]

    let words = line.querySelectorAll('.word');

    let word = words[wordIdx]
    let char =word.querySelectorAll('.char');
    
    let condation = keyCode >=65 && keyCode <=90 || [',','.','-','_',`'`].includes(key) || keyCode>=48 && keyCode<=57 || keyCode===32;
   

 
    if(condation){
        if(key === char[charIdx].innerText){
        
           
          
            let wordText = word.innerText.trim()
            //old char
            char[charIdx].classList.remove('active');
            char[charIdx].classList.add('success');
         

           

            if(charIdx === wordText.length-1){
                   //End Text
            
            wordPerMin.push(word);

               wordIdx+=1;
               charIdx=0;
               if( wordIdx == line.children.length){
                wordIdx = 0;
                line.classList.remove('activeLine');
                line.classList.add('hide');
                line.ontransitionend = (e)=> {
                    e.target.classList.add('none');
                    if(lines.length-1 ===  lineIdx){
                        showText.innerHTML += setTextElement(text[Math.floor(Math.random()*text.length)]);
                        return;
                    }
                };


                lineIdx+=1;
                
                line = lines[lineIdx]
                word = line.querySelectorAll('.word')
                char = word[wordIdx].querySelectorAll('.char');
            }else{
                word = words[wordIdx]
                char = word.querySelectorAll('.char');
            }

            }else{
                //increce idx
                 charIdx+=1;
            }
            line.classList.add('activeLine');
            //new char
            char[charIdx].classList.add('active');
            char[charIdx].classList.add('active');

        }else{
            char[charIdx].classList.add('fail')
            word.dataset.error = true;
        }

    }
}

function setTimer(minutes){
    let seconds  = 60*minutes
    let min = 60;
    let s = 0;
    return setInterval(()=>{
      let formatSeconds = seconds % 60 < 10 ? '0'+Math.floor(seconds % 60) : Math.floor(seconds % 60)
 
        timeElement.innerText='time Left :'+ Math.floor(seconds / 60) +':' + formatSeconds;
        if(s === min){
            min+=60;
            setStatus();

        }
       
        if(seconds <=0){
            reset()
        }
        
        seconds-=1;
        s+=1;
    },1000)
}


function setStatus(){
   wordAllTime.push(wordPerMin);
   wordPerMin = [];
}


function reset(){
    window.removeEventListener('keydown',writing);
    windowBegin.classList.remove('none');
    windowTest.classList.add('hide');
    let count = 0;
    wordAllTime.forEach(item=>{
       count+= item.length; 
    })
    console.log(wordAllTime)
    document.getElementById('wordPerMinute').innerText = 'متوسط عدد الكلمات في الدقيقة :'+(Math.floor(count/wordAllTime.length)) +' كلمة';
    document.getElementById('wordSuccess').innerText ='عدد الكلمات الخاطئة:'+ document.querySelectorAll('.word[data-error=true]').length ;
    lineIdx = 0;
    wordIdx = 0;
    charIdx=  0;
    wordPerMin = [];
    wordAllTime = [];
    timeElement.innerText = '';
    clearInterval(timer);
    windowTest.ontransitionend = ()=>{windowTest.classList.add('none');windowTest.classList.remove('hide')}

}