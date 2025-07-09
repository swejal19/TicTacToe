    let boxes=document.querySelectorAll(".box");
    let reset=document.querySelector(".reset");
    let result=document.querySelector(".result-container");
    let text=document.querySelector(".result");
    let newgame=document.querySelector(".new-game");
    const clickSound = new Audio("preview.mp3");
    const Sound = new Audio("click.wav");
    const achievementsound = new Audio("preview (2).mp3");
    const sadsound=new Audio("fail.wav");

    let win=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];
    let content=true;

    function enable(){
        boxes.forEach((b)=>{
            b.innerHTML="";
            b.disabled=false;
        });
    }

    function disable(){
        boxes.forEach((b)=>{
            b.disabled=true;
        });
    }

    boxes.forEach((b)=>{
        b.addEventListener("click",()=>{
            clickSound.currentTime = 0;
            clickSound.play();
            if(b.classList.contains("clicked")) return ;
            b.classList.add("clicked");
            b.innerHTML = content ? "X" : "O";
            content = !content;
            b.disabled=true;
            check();
            drawcheck();
        });
    });

    //to check if there is no winner
    function drawcheck(){
    let draw=true;
    for (let b of boxes){
        if (b.innerHTML === "") {
            draw=false;
            break;
        }
    }

    if(draw){
        sadsound.play();
        result.classList.remove("hide");
        text.innerHTML=`Oops, looks like there's no winner 😥`;
    } 
    }

    const winner=(a)=>{
        achievementsound.currentTime = 0;
        achievementsound.play();
        result.classList.remove("hide");
        text.innerHTML=`Congratulations!! ${a} wins 🥳`;
        disable();
    }

    const check=()=>{
        for (let pattern of win) {
            const a = boxes[pattern[0]].innerHTML;
            const b = boxes[pattern[1]].innerHTML;
            const c = boxes[pattern[2]].innerHTML;

            if(a!="" && b!="" && c!=""){
                if(a==b && b==c){
                    winner(a);
                }
            }
        }
    };

    function blank(){
        enable();
        boxes.forEach((b)=>{
            b.classList.remove("clicked");
        });
        content=true;
        result.classList.add("hide");
    }

    reset.addEventListener("click",()=>{
        blank();
        Sound.currentTime = 0;
        Sound.play();
    });

    newgame.addEventListener("click",()=>{
        blank();
            Sound.currentTime = 0;
        Sound.play();
    });