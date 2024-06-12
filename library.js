"use strict";



let blocks = document.getElementsByClassName("block");
let timer = document.getElementById("timer");
let blockContainer = document.getElementById("slidingBlocks");


let event = new CustomEvent("puzzleSolved");
let timerID;


window.addEventListener("load", init);



function init() {

   for (let items of blocks) {
      items.onclick = swapWithBlank;
   } 
   

   document.getElementById("Start").addEventListener("click", startGame);
   

   function startGame() {
      timer.value = 0;      
      let scrambledOrder = scrambleIntegers(8);

      for (let i = 1; i <= 8; i++) {
         let currentBlock = blockContainer.children[i-1];
         currentBlock.id = "block" + scrambledOrder[i-1];
         currentBlock.firstElementChild.src = "block" + scrambledOrder[i-1] + ".jpg";
         currentBlock.firstElementChild.alt = scrambledOrder[i];
      }  


      timerID = window.setInterval(runTimer, 1000);
      function runTimer() {
         timer.value++;
      }
   }  
}



function swapWithBlank(e) {
   let blankCheck, rowCheck, colCheck, qs;
   let activeBlock = e.target.parentElement;
   
   let rowNum = parseInt(activeBlock.classList[1].charAt(1));
   let colNum = parseInt(activeBlock.classList[2].charAt(1));


   if (colNum > 1) {
      blankCheck = activeBlock.previousElementSibling;
      if (blankCheck.id === "block0") {
         swap(activeBlock, blankCheck);
         checkBoard();
         return;
      }
   }

   if (colNum < 3) {
      blankCheck = activeBlock.nextElementSibling;
      if (blankCheck.id === "block0") {
         swap(activeBlock, blankCheck);
         return;
      }
   }  

   if (rowNum > 1) {
      blankCheck = activeBlock.previousElementSibling.previousElementSibling.previousElementSibling;
      if (blankCheck.id === "block0") {
         swap(activeBlock, blankCheck);
         checkBoard();
         return;
      }
   } 


   if (rowNum < 3) {
      blankCheck = activeBlock.nextElementSibling.nextElementSibling.nextElementSibling;
      if (blankCheck.id === "block0") {
         swap(activeBlock, blankCheck);
         checkBoard();
         return;
      }
   } 

   function swap(block, blank) {    
      let holdClass = blank.className;
      blank.className = block.className;
      block.className = holdClass;
      
      let clonedBlock = block.cloneNode(true);
      clonedBlock.onclick = swapWithBlank;
      let clonedBlank = blank.cloneNode(true);

      blank.parentNode.replaceChild(clonedBlock, blank);
      block.parentNode.replaceChild(clonedBlank, block);       
   }
   

   function checkBoard() {
      let solved = true;
      for (let i = 1; i <= 8; i++) {
         if (blockContainer.children[i-1].id !== "block" + i) {
            solved = false;
            break;
         }
      }
      
      if (solved) {
         clearInterval(timerID);
         window.alert("Solved!!");

         window.dispatchEvent(event);   
      }
   }
}



function scrambleIntegers(size) {
  let x = new Array(size);
  for (let i = 0;i < x.length;i++) {x[i] = i+1;}
  x.sort(randOrder);
 
  let nSum = 0;

  for (let i = 0; i < x.length;i++) {
     for (let j = i; j < x.length; j++) {if (x[j] < x[i]) nSum++;}
  }
   
  if (Math.floor(nSum/2) != nSum/2) { 

     let temp;
     let needSwap = true;
     for (let i = 0; (i < x.length) && needSwap; i++) {
        for (var j = i; j < x.length && needSwap; j++) {
           if (x[j] > x[i]) {temp=x[j];x[j]=x[i];x[i]=temp;needSwap=false;}
        }
     }
  }
  return x;
   
   function randOrder(){
      return 0.5 - Math.random();
   }   
}
