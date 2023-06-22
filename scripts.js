// elements
let SpansArea = document.querySelector(".bullets .right");
let BBullets = document.querySelector(".bullets");
let questionArea = document.querySelector(".question")
let answersArea = document.querySelector(".answers")
let infospan = document.querySelector(".count span")
let sumbit = document.querySelector(".sumbit")
let results = document.querySelector(".results")
let time = document.querySelector(".left")

let counter = 0;
let trueanswer = 0;
 let counteR;
function main (){
    let jsfile = new XMLHttpRequest();
    jsfile.open("Get","quiz.json");
    jsfile.send();

    jsfile.onreadystatechange = function(){
        if(this.readyState===4 && this.status===200){

            let jsonfile = JSON.parse(this.responseText)
            let jsonfileLength = jsonfile.length 


            countSpansArea(jsonfileLength);

            createquestion(jsonfile[counter] , jsonfileLength)

                tm(3,jsonfileLength)

            sumbit.onclick = function(){
                                tm(5,jsonfileLength)
                                        clearInterval(counteR)
                let rightanswer = jsonfile[counter].right_answer;
                counter++
            check(rightanswer , jsonfileLength)
                questionArea.innerHTML = ""
                answersArea.innerHTML = ""
            createquestion(jsonfile[counter] , jsonfileLength)
            handlebullets(jsonfileLength)

              clearInterval(counteR)
                tm(3,jsonfileLength)

            finish(jsonfileLength)
              

            }
        }
    }
}
main()



function createquestion (count , number){
    if(counter < number){
         let h2 = document.createElement("h2");
    let h2Text = document.createTextNode(count.title)
    h2.appendChild(h2Text)
    questionArea.appendChild(h2);

    for (let i=1; i <=4; i++){

        let div = document.createElement("div");
        let input = document.createElement("input");
        let label = document.createElement("label");
        let labelText = document.createTextNode(count[`answer_${i}`])
        label.appendChild(labelText)
        div.appendChild(input)
        div.appendChild(label)

        div.className = "answer";
        input.type = "radio"
        input.name = "answer"
        input.id = `answer_${i}`
        input.dataset.answer = count[`answer_${i}`]
        label.htmlFor =  `answer_${i}`
        answersArea.appendChild(div)

        if(i==1){
            input.checked =true
        }
    }
    }
}






function countSpansArea(count){
    for(let i=0; i<count; i++){
    let Span = document.createElement("span");
    SpansArea.appendChild(Span)
    if(i==0){
        Span.className = "on"
    }
    }

    infospan.innerHTML = count
}


function check (right , number){
    let answers = document.getElementsByName("answer")
let choosen;


    for (let i=0; i<answers.length; i++){
        if(answers[i].checked){
            choosen = answers[i].dataset.answer;
        }
    }

    if(right === choosen){
        trueanswer++
      
    }
}


function handlebullets (number){
  
    if(counter <number){
          let bullets = document.querySelectorAll(".bullets .right span")
    let bulletsarray = Array.from(bullets)

    bulletsarray.forEach(function(span , index){
        if(counter == index){
            span.className = "on"
        }
     
    })
    }
}




function finish (number){
    let righttque;

    if(counter==number){
        sumbit.remove()
        questionArea.remove()
        questionArea.remove()
        BBullets.remove()

            if(trueanswer > number/2 && trueanswer < number){
        righttque = `<span class="good">  good </span> ${trueanswer} from ${number} `
    }else if(trueanswer === number){
             righttque = `<span class="perfect">perfect</span> ${trueanswer} from ${number} `
    }else{
                     righttque = `<span class="bad">bad</span> ${trueanswer} from ${number} `  }

                results.innerHTML = righttque

    }
}



function tm ( duration , number ){
 if(counter < number){
    let minute ,sec;
    counteR  = setInterval(function() {
     minute = parseInt(duration / 60)
          sec = parseInt(duration % 60)

    time.innerHTML = `${minute}:${sec}`;

    if(--duration < 0 ){
        clearInterval(counteR)
        console.log("Aa")
        sumbit.click()
    }

  }, 1000);
 }
}



