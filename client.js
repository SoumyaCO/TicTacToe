/* 
List of features to be made:
1. reset button => expand/collapse & clearCells 
2. Score Borad update
3. Rules for the game
furthur features ===========================
a. online multiplayer [custom rooms]
b. give name and avatar 
*/

const cell = document.querySelectorAll(".cell");
// const score = document.querySelectorAll(".score"); // not working.. why??

let isClicked = true;
let listOfDivs = [];
let audio1 = new Audio("sounds/sound-effect1.wav");
let audio2 = new Audio("sounds/sound-effect2.wav");
let audio3 = new Audio("sounds/sound-effect-draw.wav");

// Scaling effect of the cells ======================================
const scaleEffect = (e) => {
  e.style.scale = 1.2;
  setTimeout(() => {
    e.style.scale = 1}
    ,300)
} 
// Checking the cell is already clicked or not =======================
const checkCell = (e) => {
  if (isClicked) { // exchanging between 'cross' and 'circle' input by changing the boolean isClicked.
    e.innerHTML = "&#x274C;";
    audio1.play();
    isClicked = false;
  } else {
    e.innerHTML = "&#x25EF;";
    audio2.play();
    isClicked = true;
  }
};
// if all cells are full, then clear the cells: ====================
const clearCells = () => {
    for (let j = 0; j < cell.length; j++) {
      const clear = () => {
        listOfDivs = [];
        cell[j].innerHTML = "";
      };
      setTimeout(clear, 500);
    }
  };
// result Checking: =================================================
const result = (i) => { 
  if(cell[i].innerHTML == "❌"){
    console.log("cross wins")
    clearCells()
  }else if (cell[i].innerHTML == "◯"){
    console.log("circle wins")
    clearCells()
  }
}
// Shorthand for cell[i].innerHTML =================================
const ctx = (index) => {
  return cell[index].innerHTML
}
// game winning logic =================================================
const winningLogic = () => {
  if (ctx(0)==ctx(1) && ctx(1)==ctx(2)  //Checking every winning position 
  || ctx(0)==ctx(3) && ctx(3)==ctx(6)
  || ctx(0)==ctx(4) && ctx(4)==ctx(8)){
    result(0);
  }
  else if(ctx(1)==ctx(4) && ctx(4)==ctx(7)){
    result(1)
  }
  else if(ctx(2)==ctx(5) && ctx(5)==ctx(8) || ctx(2)==ctx(4) && ctx(4)==ctx(6)){
    result(2);
  }
  else if(ctx(3)==ctx(4) && ctx(4)==ctx(5)){
    result(3)
  }
  else if(ctx(6)==ctx(7) && ctx(7)==ctx(8)){
    result(6)
  }
};



//Loop and onClickListener =================================================
for (let i = 0; i < cell.length; i++) {
  let e = cell[i];
  e.addEventListener("click", () => {
    if (e.innerHTML == "") {
      listOfDivs.push(i); //populating the list with number of pressed cells.
      scaleEffect(e);
      checkCell(e);
      if (listOfDivs.length == cell.length) {
        clearCells();
      }
      if(listOfDivs.length >=5){ //Starting to check after 5 inputs  
        winningLogic()
      }
    }
  });
}

