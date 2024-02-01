let boxes=document.querySelectorAll(".box")
let resetBtn=document.querySelector(".reset-btn")

resetBtn.addEventListener("click",()=>{document.location.reload()})

let turnO=true

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O"
            turnO=!turnO
        }
        else{
            box.innerText="X"
            turnO=!turnO
        }
        box.disabled=true
        checkWin();
    });
})

const checkWin=()=>{
    for(let pattern of winPatterns){
        // console.log(boxes[pattern[0]].innerText + boxes[pattern[1]].innerText + boxes[pattern[2]].innerText)
        let index1=boxes[pattern[0]];
        let index2=boxes[pattern[1]];
        let index3=boxes[pattern[2]];
        if(index1.innerText!="" && index2.innerText!="" && index3.innerText!=""){
        if(index1.innerText===index2.innerText && index2.innerText===index3.innerText){
            document.querySelector("#result").innerText=index1.innerText+" is the Winner."
            index1.style.background='black'
            index2.style.background='black'
            index3.style.background='black'
            boxes.forEach((box)=>{
                box.disabled=true
            })
        }
    }
    }
}