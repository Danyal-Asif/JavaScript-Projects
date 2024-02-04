// Form element
const form=document.querySelector(".cipher-form")
// Text/Message element that contains the message to be encrypted
const message=document.querySelector('.message')
// Element that shows the cipher
const cipher=document.querySelector(".cipher")
// choose type of action
const operation=document.querySelector(".operation");
// select the number of shift
const shift=document.querySelector(".shift");
// div that contains buttons.
const btnContainer=document.querySelector(".btn-container");
// alert element to show text
const alert=document.querySelector(".alert");

form.addEventListener("submit",applyCipher)
// copyBtn.addEventListener("click",copyText);
const alphabets=[]
// fill array with alphabets
for(let i='A'.charCodeAt(0);i<='Z'.charCodeAt(0);i++){
    alphabets.push(String.fromCharCode(i));
}

const keys=[];
// fill keys with number from 1 to 25
for(let i=1;i<=25;i++){
    keys.push(i);
}
 
let key;
let encoded="",decoded="";

function applyCipher(e){
    e.preventDefault();
    
    if(operation.value === "encode"){
        encodeCipher(e)
        encoded=""
    }
    else{
        decodeCipher(e)
        decoded=""
    }

}


function encodeCipher(e){
    e.preventDefault();
    const text=message.value.toUpperCase();
    // let random=Math.floor(Math.random()* keys.length)
    // key=keys[random];
    key=Number.parseInt(shift.value);
    for(const char of text){
        if(/[A-Za-z]/.test(char)==false){
            encoded+=char;
        }
        else{
            let index=alphabets.indexOf(char)+key;
            if(index>alphabets.length-1){
                index=index-alphabets.length
            }
            encoded+=alphabets[index]
        }
    }
    cipher.innerText=encoded;
    btnContainer.innerHTML=`
    <button class="copy-text" onclick=copyText()>Copy</button>
<button class="clear-btn" onclick=location.reload()>Clear Text</button>
    `;
    
}

function decodeCipher(e){
    e.preventDefault();
    const text=message.value.toUpperCase();
    key=Number.parseInt(shift.value);
    for(const char of text){
        if(/[A-Za-z]/.test(char)==false){
            decoded+=char;
        }
        else{
            let index=alphabets.indexOf(char)-key;
            if(index<0){
                index+=alphabets.length;
            }
            decoded+=alphabets[index]
        }
    }
    cipher.innerText=decoded;
    btnContainer.innerHTML=`
    <button class="copy-text" onclick=copyText()>Copy</button>
    <button class="clear-btn" onclick=location.reload()>Clear Text</button>
    `;
}

function copyText(){
    let cipherText=document.querySelector(".cipher").innerHTML;
    navigator.clipboard.writeText(cipherText);
    displayAlert("Cipher copied to clipboard!","success");
}

function displayAlert(text,action){
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);

    setTimeout(function(){
        alert.textContent="";
        alert.classList.remove(`alert-${action}`);
    },1000)
}
