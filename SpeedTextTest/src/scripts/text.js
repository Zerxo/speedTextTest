const text = [
    `The spoon helps astronauts eat more easily. It will be important during long trips to Mars. Astronauts use normal spoons now. The spoons are a little longer. It is not always easy to eat with them at zero gravity. The food must be wet. Then it sticks to the spoon.The new spoon is very different. It is something between a spoon and chopsticks. You hold it in your hand. You press it at the end. The food stays on the spoon. It is easier to put food in your mouth.It will be possible to eat more kinds of food. Astronauts will be happier.`,
    `Jimmy Hayes, who spent seven seasons in the NHL and won a national championship at Boston College, died unexpectedly Monday. He was 31. Hayes was pronounced dead at his Massachusetts home, The Boston Globe reported, citing a law enforcement official. The cause of death was not immediately available. Hayes, who grew up in the Boston suburb of Dorchester, leaves his wife and two sons. Boston College and the  Bruins acknowledged his death Monday. The 6-foot-5 right winger played 334 games for Chicago, Florida, Boston and New Jersey. His 2017-18 season with the Devils was his last season in the NHL. He scored 54 goals and 109 points for his career, with 33 goals coming across two seasons with Boston. Hayes last played professionally in 2019. For the past two years, he co-hosted a podcast with former NHL players Shane O'Brien and Scottie Upshall. Their last live show aired earlier this month.`,
    `Bryson DeChambeau accepted an invitation to compete in The Professional Long Driver's Association World Championship in Mesquite, Nevada, on September 27. DeChambeau posted on Instagram that he believes this is an opportunity to help grow the game of golf through the long drive competitions. "I want to show the world how incredibly talented and hard working these athletes are," DeChambeau said on Instagram. "I've been working hard to get my game up to their speeds so (sic) I have a chance but will still continue to play my best golf with my regular day job." DeChambeau is currently ranked first on the PGA Tour in driving distance, averaging 321.5 yards per drive. His longest drive of the season came in the second round of the Sentry Tournament on the 12th hole, when he hit the ball 414 yards. That was good for the fifth longest drive of the season, with Lee Westwood at No. 1, hitting a 425-yard drive at the Byron Nelson, and only one yard ahead of Cameron`,
]
function setTextElement(text){
    let html = '<div class="line">';
    let word = '<span class="word">'
    let line = 28;
    for(let i in text){
       
        if(text[i] == ' ' || i == text.length-1){
      
            if(i>=line){
                // word+=' </span> <br />';
                html += '</div> <div class="line">'
                line+= 30
            }
                word+=' </span>';
            

            html+= word;
            word = '<span class="word">'
            continue
     }

     let char = text[i]
     word+= `<span class="char">${char}</span>`;

}

return html
}


export {setTextElement,text}


  