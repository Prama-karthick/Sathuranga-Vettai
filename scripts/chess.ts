const pieces:NodeListOf<HTMLElement> = document.querySelectorAll('.piece'); //++
const squares:NodeListOf<HTMLElement>  = document.querySelectorAll('.square');//++
const playerturn:HTMLElement=document.querySelector('.fa-regular')!;//++
const messages:HTMLElement=document.querySelector('.alert-msg')!;//++
const chessboard:HTMLElement=document.querySelector('.chessboard')!;//++

var selectedsquare:HTMLElement=document.createElement('p');
// var selectedsquare=`<div></div>`; ++
let possibleMoves:number[][]=[]; //++
var selectedpiece:HTMLElement =document.createElement('a');
// var selectedpiece=`<a></a>`; ++
var piecenames:any="";
var selectedpiecenames:any="";
let check:boolean=false;
let kingAttackMoves:number[][]=[];
var deafaultParaElement:HTMLElement =document.createElement('p');


pieces.forEach(piece => {
            
            piece.addEventListener('click', () => {
                                                        // Getting the details of selected piece
            piecenames=piece.getAttribute("class")!;
            piecenames=piecenames.split(" ");
                                                                                                            //++
            if(piecenames[2]==playerturn?.getAttribute("class") || (piecenames[2]!=selectedpiecenames[2] && (selectedpiece instanceof HTMLAnchorElement==false)) ){

                console.log(playerturn?.title);

            
                if(selectedpiece instanceof HTMLAnchorElement  || piecenames[2]==selectedpiecenames[2]){
                    selectedpiece=piece;
                    selectedpiecenames=selectedpiece.getAttribute("class")!;
                    selectedpiecenames=selectedpiecenames.split(" ");
                    if(selectedsquare instanceof HTMLParagraphElement == false) //++
                    {selectedsquare.style.border="0px solid blue";}
                    selectedsquare=document.querySelector(`[data-row="${selectedpiece.style.gridRow}"][data-col="${selectedpiece.style.gridColumn}"]`)!;
                    selectedsquare.style.border="2px double blue";
                }
                
                else if(piecenames[2]!=selectedpiecenames[2]){
                    
                    var endsquare=[piece.style.gridRow,piece.style.gridColumn];
            
                    moveNext(selectedpiece,endsquare,piece);
                }
            }
            else{
                messages.style.display="inline";
                messages.textContent="Now "+playerturn.title+" turn";
                console.log("it's "+playerturn.title+" turn");
                setTimeout(function() {
                    messages.style.display="none";
                }, 3000);
            }
            console.log(selectedpiece);
            console.log(selectedsquare);
        },true);
    
});


squares.forEach(square => {
square.addEventListener('click', () => {
    
  moveNext(selectedpiece,[square.dataset.row,square.dataset.col]);
  const checkmsg:HTMLDivElement=document.querySelector('.checkmate-scenario')!;
  if(checkMate()){
    checkmsg.textContent="!! Check For "+playerturn.title+" !!";
      checkmsg.style.display="inline";
  }
  else{
      checkmsg.style.display="none";
  }
},true);
});


function movesOfPawn(piece:HTMLElement){
let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
console.log(currentPosition);
let currentRow=Number(currentPosition[0]);
let currentColumn=Number(currentPosition[1]);
let noOfmoves=0;
// var possibleMoves=[];
if(currentRow==7 || currentRow==2){//For initial move of pawn
    noOfmoves=2;
}
else{//for other moves
    noOfmoves=1;
}

if(selectedpiecenames[2]=="fa-regular"){//white pawn row value decrease
        for(let min=1;min<=noOfmoves;min+=1){
            
            let move=[currentRow-min,currentColumn];
            var casevalue=attackPossibles(move);
    
                        if(casevalue==1)    { possibleMoves.push([currentRow-min,currentColumn]); }
    
                        if(casevalue==2 || casevalue ==3)    { min=noOfmoves+1; }
        }
        let move=[currentRow-1,currentColumn+1];                    //white pawn attack moves
        var casevalue=attackPossibles(move);
        if(casevalue==3)    { possibleMoves.push([currentRow-1,currentColumn+1]); }
        
        move=[currentRow-1,currentColumn-1];
        var casevalue=attackPossibles(move);
        if(casevalue==3)    { possibleMoves.push([currentRow-1,currentColumn-1]); }
    


}
else{                           //Black pawn row value increase
    for(let min=1;min<=noOfmoves;min+=1){
        
        let move=[currentRow+min,currentColumn];
        var casevalue=attackPossibles(move);

                    if(casevalue==1)    {possibleMoves.push([currentRow+min,currentColumn]);}

                    if(casevalue==2 || casevalue ==3)    { min=noOfmoves+1; }

    }
    let move=[currentRow+1,currentColumn+1];                     //black pawn attack moves
    var casevalue=attackPossibles(move);
    if(casevalue==3)    { possibleMoves.push([currentRow+1,currentColumn+1]); }
        
    move=[currentRow+1,currentColumn-1];
    var casevalue=attackPossibles(move);
    if(casevalue==3)    { possibleMoves.push([currentRow+1,currentColumn-1]); }
   
}

console.log(possibleMoves);
const moves=possibleMoves;
return moves;
}

function movesOfElephant(piece:HTMLElement){
let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
console.log(currentPosition);
let currentRow=Number(currentPosition[0]);
let currentColumn=Number(currentPosition[1]);
// var possibleMoves=[]
possibleMoves=nondiagonalmoves(currentRow,currentColumn,possibleMoves);

    console.log(possibleMoves);
    const moves=possibleMoves;
    return moves;
}

function movesOfHorse(piece:HTMLElement,isKing:boolean=false){
        let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
        console.log(currentPosition);
        let currentRow=Number(currentPosition[0]);
        let currentColumn=Number(currentPosition[1]);
        // var possibleMoves=[];
        // for(let direction=1;direction<=4; direction+=1){ //possible up moves
        //     if(moveup<=8) { possibleMoves.push([moveup,currentColumn]); }    // For code efficency
        //     if(moveright<=8) { possibleMoves.push([currentRow,moveright]); }
        // }
        var casevalue:number;
        var move:number[];

        move=[currentRow+2,currentColumn-1];
        casevalue = attackPossibles(move,isKing)
        if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

        move=[currentRow+2,currentColumn+1];
        casevalue = attackPossibles(move,isKing);
        if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

        move=[currentRow-2,currentColumn-1];
        casevalue =    attackPossibles(move,isKing) ;
        if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

        move=[currentRow-2,currentColumn+1];
        casevalue =    attackPossibles(move,isKing) ;
        if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

        move=[currentRow+1,currentColumn+2];
        casevalue =    attackPossibles(move,isKing) ;
        if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

        move=[currentRow-1,currentColumn+2];
        casevalue =    attackPossibles(move,isKing) ;
        if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

        move=[currentRow+1,currentColumn-2];
        casevalue =    attackPossibles(move,isKing) ;
        if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

        move=[currentRow-1,currentColumn-2];
        casevalue =    attackPossibles(move,isKing) ;
        if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

        if(isKing && kingAttackMoves.length)
        {
            let horseFlag=0; // No horse in the attack places
                var oppTeam:string = (playerturn.title=="white")? "fa-solid" : "fa-regular" ;
                var oppenentHorses:NodeListOf<HTMLElement>=document.querySelectorAll('.horse.'+oppTeam);
                if( oppenentHorses.length ){
                    oppenentHorses.forEach(oppenentHorse=>{
                            for(let kAttackmove of kingAttackMoves){
                                let oppHorseRow=Number(oppenentHorse.style.gridRow);
                                let oppHorseCol=Number(oppenentHorse.style.gridColumn);
                                if( oppHorseRow === kAttackmove[0] && oppHorseCol === kAttackmove[1] ){
                                    horseFlag=1; // Horse in the attack places
                                }

                            }
                    })
                }
                if(!horseFlag){
                    kingAttackMoves=[];
                    check=false;
                }
        }

        console.log(possibleMoves);
        const moves=possibleMoves;
        return moves;

}

function movesOfBishop(piece:HTMLElement){
let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
console.log(currentPosition);
let currentRow=Number(currentPosition[0]);
let currentColumn=Number(currentPosition[1]);
// var possibleMoves=[];
possibleMoves=diagonalmoves(currentRow,currentColumn,possibleMoves);


console.log(possibleMoves);
const moves=possibleMoves;
return moves;
}

function movesOfQueen(piece:HTMLElement,isKing:boolean=false){
let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
console.log(currentPosition);
let currentRow=Number(currentPosition[0]);
let currentColumn=Number(currentPosition[1]);
// var possibleMoves=[];
    //possible moves same as elephant
    possibleMoves=nondiagonalmoves(currentRow,currentColumn,possibleMoves,isKing);


    //possible moves same as bishop
    possibleMoves=diagonalmoves(currentRow,currentColumn,possibleMoves,isKing);


    //Note : -> To handle Pawn and horse attacks while checking for King check conditions (finisihed)
    if(isKing && kingAttackMoves.length)
    {
       
        let change=1;
        let nonAttackIndex:number[]=[];
       
            var oppTeam:string = (playerturn.title=="white")? "fa-solid" : "fa-regular" ;
            var oppenentHorses:NodeListOf<HTMLElement>=document.querySelectorAll('.horse.'+oppTeam);
            var oppenentPawns:NodeListOf<HTMLElement>=document.querySelectorAll('.pawn.'+oppTeam);
            var oppenentBishops:NodeListOf<HTMLElement>=document.querySelectorAll('.bishop.'+oppTeam);
            var oppenentElephants:NodeListOf<HTMLElement>=document.querySelectorAll('.elephant.'+oppTeam);
                console.log("Before:");
                console.log(kingAttackMoves);
                        for(let kAmove=0;kAmove<kingAttackMoves.length;kAmove+=1){
                            console.log(kAmove+":"+kingAttackMoves[kAmove]);
                            if( oppenentHorses.length){
                                for(var h=0 ;h<oppenentHorses.length;h++){
                                let oppHorseRow=Number(oppenentHorses[h].style.gridRow);
                                let oppHorseCol=Number(oppenentHorses[h].style.gridColumn);
                                console.log([oppHorseRow,oppHorseCol]+":"+( oppHorseRow === kingAttackMoves[kAmove][0] && oppHorseCol === kingAttackMoves[kAmove][1] ));
                                    if( (oppHorseRow === kingAttackMoves[kAmove][0] && oppHorseCol === kingAttackMoves[kAmove][1])){
                                         //Horse are in wrong attack place
                                        nonAttackIndex.push(kAmove);
                                        change=0;
                                        h=oppenentHorses.length+1;
                                    }
                                }
                            }
                            if(oppenentPawns.length && change){
                                    for(var p=0;p<oppenentPawns.length; p++){
                                    let oppPawnRow=Number(oppenentPawns[p].style.gridRow);
                                    let oppPawnCol=Number(oppenentPawns[p].style.gridColumn);
                                    console.log([oppPawnRow,oppPawnCol]+":"+( oppPawnRow === kingAttackMoves[kAmove][0] && oppPawnCol === kingAttackMoves[kAmove][1] ));
                                        if( ( oppPawnRow === kingAttackMoves[kAmove][0] && oppPawnCol === kingAttackMoves[kAmove][1] )){
                                            //pawn in any one attack place
                                            // if( (oppPawnRow==currentRow-1 || oppPawnRow==currentRow+1) && (oppPawnCol==currentColumn-1||oppPawnCol==currentColumn+1) )
                                            // {
                                            nonAttackIndex.push(kAmove);
                                            change=0;
                                            p=oppenentPawns.length+1;
                                        //    }
                                        }
                                    }
                             }

                             if(oppenentBishops.length && change){
                                for(var p=0;p<oppenentBishops.length; p++){
                                    let oppBishopRow=Number(oppenentBishops[p].style.gridRow);
                                    let oppBishopCol=Number(oppenentBishops[p].style.gridColumn);
                                    console.log([oppBishopRow,oppBishopCol]+":"+( oppBishopRow === kingAttackMoves[kAmove][0] && oppBishopCol === kingAttackMoves[kAmove][1] ));
                                    
                                        if( ( oppBishopRow === kingAttackMoves[kAmove][0] && oppBishopCol === kingAttackMoves[kAmove][1] )){
                                            if(currentRow == oppBishopRow || currentColumn==oppBishopCol ){
                                                   //Bishop in wrong attack place
                                                   nonAttackIndex.push(kAmove);
                                                    p=oppenentBishops.length+1;
                                                    change=0
                                            }
                                           
                                        }
                                    }
                             }
                             if(oppenentElephants.length && change){
                                for(var p=0;p<oppenentElephants.length; p++){
                                    let oppElephantRow=Number(oppenentElephants[p].style.gridRow);
                                    let oppElephantCol=Number(oppenentElephants[p].style.gridColumn);
                                    console.log([oppElephantRow,oppElephantCol]+":"+( oppElephantRow === kingAttackMoves[kAmove][0] && oppElephantCol === kingAttackMoves[kAmove][1] ));
                                        if( ( oppElephantRow === kingAttackMoves[kAmove][0] && oppElephantCol === kingAttackMoves[kAmove][1] )){
                                            if(currentRow != oppElephantRow || currentColumn!=oppElephantCol ){
                                            //Elephant in wrong attack place
                                                nonAttackIndex.push(kAmove);
                                                p=oppenentElephants.length+1;
                                            }
                                            
                                        }
                                    }
                             }

                            change=1;
                            
                        }

            for(let i=0;i<nonAttackIndex.length;i++){
                kingAttackMoves.splice(i);
            }
            nonAttackIndex=[];
            if((kingAttackMoves.length<=0)) {
                check=false;
            }  
            console.log("After:")
            console.log(kingAttackMoves)
            console.log(kingAttackMoves.length);
            
    }

    console.log(possibleMoves);
    const moves=possibleMoves;
    return moves;

}

function movesOfKing(piece:HTMLElement){
let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
console.log(currentPosition);

let currentRow=Number(currentPosition[0]);
let currentColumn=Number(currentPosition[1]);
// var possibleMoves=[];

var move:number[]=[currentRow+1,currentColumn];
var casevalue=attackPossibles(move);
if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

move=[currentRow-1,currentColumn];
casevalue=attackPossibles(move);
if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}


move=[currentRow,currentColumn-1];
casevalue=attackPossibles(move);
if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

move=[currentRow,currentColumn+1];
casevalue=attackPossibles(move);
if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}


move=[currentRow+1,currentColumn+1];
casevalue=attackPossibles(move);
if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

move=[currentRow-1,currentColumn-1];
casevalue=attackPossibles(move);
if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

move=[currentRow+1,currentColumn-1];
casevalue=attackPossibles(move);
if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}

move=[currentRow-1,currentColumn+1];
casevalue=attackPossibles(move);
if(casevalue==1 || casevalue==3)    {possibleMoves.push(move);}


console.log(possibleMoves);
const moves=possibleMoves;
return moves;

}

function attackPossibles(move:number[],isKing:boolean=false){
        // console.log(move);
        var movesquare:HTMLElement=document.querySelector(`[data-row="${move[0]}"][data-col="${move[1]}"]`)!;
        if(isKing){
            selectedpiecenames[2]=playerturn.getAttribute('class');
        }

        if(movesquare!=null)
        {
            var squareContains=movesquare.title;
            // console.log(squareContains)
            if(squareContains== "none")
            {
                return 1;               //no elements in square so move can be included
            }
            else if( (squareContains == "black" && selectedpiecenames[2]=="fa-solid")  || (squareContains=="white" && selectedpiecenames[2]=="fa-regular") )
            {
                return 2;               //both positions contains same squad element
            }
            else if( (squareContains == "white" && selectedpiecenames[2]=="fa-solid")  || (squareContains=="black" && selectedpiecenames[2]=="fa-regular") )
            {
                if(isKing ){
                    kingAttackMoves.push(move);
                    check=true;
                }
                return 3;               //both has different elements
            }
        }

        return 4;

}



function moveNext<T>(startpiece:HTMLElement,endpoints:T[],endpiece:HTMLElement=deafaultParaElement){
console.log("square handler"+endpoints);
// console.log(startpiece);
    if(!(selectedpiece instanceof HTMLAnchorElement)){
        if(selectedpiecenames[1]=="pawn"){
            possibleMoves=movesOfPawn(startpiece);
        }
        else if(selectedpiecenames[1]=="elephant"){
            possibleMoves=movesOfElephant(startpiece);
        }
        else if(selectedpiecenames[1]=="horse"){
            possibleMoves=movesOfHorse(startpiece);
        }
        else if(selectedpiecenames[1]=="bishop"){
            possibleMoves=movesOfBishop(startpiece);
        }
        else if(selectedpiecenames[1]=="queen"){
            possibleMoves=movesOfQueen(startpiece);
        }
        else if(selectedpiecenames[1]=="king"){
            possibleMoves=movesOfKing(startpiece);
        }
    let choosenSquare=endpoints;    //piece movement
    let wrongmove=0;
    for(let possiblesquare of possibleMoves){
    // console.log("ps:"+possiblesquare);
    // console.log("cs:"+choosenSquare);
    if(choosenSquare[0] == possiblesquare[0] && choosenSquare[1]==possiblesquare[1]){
        console.log("Move on");
        var startsquare:HTMLElement=document.querySelector(`[data-row="${startpiece.style.gridRow}"][data-col="${startpiece.style.gridColumn}"]`)!;
        
        var endsquare:HTMLElement=document.querySelector(`[data-row="${choosenSquare[0]}"][data-col="${choosenSquare[1]}"]`)!;
    
        startpiece.style.gridRow=endsquare.dataset.row!;
        startpiece.style.gridColumn=endsquare.dataset.col!;
        endsquare.title=startsquare.title;
        startsquare.title="none";
        console.log("Endpiece");
        console.log(endpiece);
        if(endpiece!=deafaultParaElement){
            var endpiecenames:any=endpiece.getAttribute("class");
            endpiecenames=endpiecenames.split(" ")!;
            if(endpiecenames[1]=="king"){
                gameover(endpiecenames[2]);
            }
            endpiece.remove();

        }

        if(playerturn.title=="white"){
            playerturn.title="black";
            playerturn.setAttribute("class","fa-solid");
            playerturn.textContent="Black's turn";
            chessboard.style.transform="rotate(180deg)";
            pieces.forEach(piece=>{
                piece.style.transform="rotate(180deg)";
            })
        }
        else{
            playerturn.title="white";
            playerturn.setAttribute("class","fa-regular");
            playerturn.textContent="white's turn";
            chessboard.style.transform="rotate(0deg)";
            pieces.forEach(piece=>{
                piece.style.transform="rotate(0deg)";
            })
        }

        
        wrongmove=1;
        break;
    }
    else{
        console.log("Not possible"); 
    }
    }
        if(wrongmove==0 && messages){

                messages.style.display="inline";
                messages.textContent="!! Wrong Move !!";
                console.log("it's "+playerturn.title+" turn");
                    setTimeout(function() {
                    messages.style.display="none";
                }, 3000);
        }

    }
    else{
    console.log(startpiece);
    messages.style.display="inline";
    messages.textContent="Choose a "+playerturn.title+" piece";
    console.log("it's "+playerturn.title+" turn");
    setTimeout(function() {
            messages.style.display="none";
        }, 3000);
    }
// selectedpiece=`<a></a>`; ++
selectedpiece=document.createElement('a');
possibleMoves=[];


}


function nondiagonalmoves(currentRow:number,currentColumn:number,possibleMoves:number[][],isKing:boolean=false){
for(let moveup=currentRow+1,moveright=currentColumn+1; moveup<=8 || moveright<=8; moveup+=1,moveright+=1){ //possible up moves
    if(moveup<=8) { 
      let move=[moveup,currentColumn];
      var casevalue=attackPossibles(move,isKing);

                  if(casevalue==1)    { possibleMoves.push([moveup,currentColumn]); }

                  if(casevalue==2)    { moveup=9; }

                  if(casevalue==3)    { possibleMoves.push([moveup,currentColumn]); moveup=9;  }
  
    }
    if(moveright<=8) { 
      let move=[currentRow,moveright];
      var casevalue=attackPossibles(move,isKing);

                  if(casevalue==1)    { possibleMoves.push([currentRow,moveright]); }

                  if(casevalue==2)    { moveright=9; }

                  if(casevalue==3)    { possibleMoves.push([currentRow,moveright]); moveright=9;  }
  
    }
  }

  for(let movedown=currentRow-1,moveleft=currentColumn-1; movedown>=1 || moveleft>=1; movedown-=1,moveleft-=1){ //possible down moves
      if(movedown>=1) {
          let move=[movedown,currentColumn];
          var casevalue=attackPossibles(move,isKing);

                  if(casevalue==1)    { possibleMoves.push([movedown,currentColumn]); }

                  if(casevalue==2)    { movedown=0; }

                  if(casevalue==3)    { possibleMoves.push([movedown,currentColumn]); movedown=0;  }
  
      }
      if(moveleft>=1)  {
          let move=[currentRow,moveleft];
          var casevalue=attackPossibles(move,isKing);

                  if(casevalue==1)    { possibleMoves.push([currentRow,moveleft]); }

                  if(casevalue==2)    { moveleft=0; }

                  if(casevalue==3)    { possibleMoves.push([currentRow,moveleft]); moveleft=0;  }
  
      }
    }

    return possibleMoves;
}

function diagonalmoves(currentRow:number,currentColumn:number,possibleMoves:number[][],isKing:boolean=false){
for(let moveup:number=currentRow+1,moveright:number=currentColumn+1; moveup<=8 && moveright<=8; moveup+=1,moveright+=1){ //possible up moves
    
    let move=[moveup,moveright];
    var casevalue=attackPossibles(move,isKing);

            if(casevalue==1)    { possibleMoves.push(move); }

            if(casevalue==2)    { moveup=9; }

            if(casevalue==3)    { possibleMoves.push([moveup,moveright]); moveup=9;  }

}
for(let moveup=currentRow-1,moveright=currentColumn-1; moveup>=1 && moveright>=1; moveup-=1,moveright-=1){ //possible up moves
    

    let move=[moveup,moveright];
    var casevalue=attackPossibles(move,isKing);

            if(casevalue==1)    { possibleMoves.push([moveup,moveright]); }

            if(casevalue==2)    { moveup=0; }

            if(casevalue==3)    { possibleMoves.push([moveup,moveright]); moveup=0;  }

}
for(let moveup=currentRow+1,moveright=currentColumn-1; moveup<=8 && moveright>=1; moveup+=1,moveright-=1){ //possible up moves
   
    let move=[moveup,moveright];
    var casevalue=attackPossibles(move,isKing);

            if(casevalue==1)    { possibleMoves.push([moveup,moveright]); }

            if(casevalue==2)    { moveup=9; }

            if(casevalue==3)    { possibleMoves.push([moveup,moveright]); moveup=9;  }

}
for(let moveup=currentRow-1,moveright=currentColumn+1; moveup>=1 && moveright<=8; moveup-=1,moveright+=1){ //possible up moves
    let move=[moveup,moveright];
    var casevalue=attackPossibles(move,isKing);

            if(casevalue==1)    { possibleMoves.push([moveup,moveright]); }

            if(casevalue==2)    { moveup=0; }

            if(casevalue==3)    { possibleMoves.push([moveup,moveright]); moveup=0;  }

}

return possibleMoves;
}

function checkMate():boolean{
let kingteam:string=playerturn.getAttribute('class')!;

    let currentKing:HTMLElement=document.querySelector(".king."+kingteam)!;
    console.log("CurrentKing===================>");
console.log(currentKing);

    let isKing:boolean=true;
   
    // Possible attacks by horse
    let nonLinearAttackmoves:number[][]=movesOfHorse(currentKing,isKing);
    if(check){
        check=false;
        console.log("NonLAttacks");
        console.log(kingAttackMoves);
        return true;
    }

    // possible attacks by queens , bishops , elephant , pawn , king
    let linearAttackmoves:number[][]=movesOfQueen(currentKing,isKing);
    if(check){
        check=false;
        console.log("LineAttacks");
        console.log(kingAttackMoves);
        return true;
    }
    kingAttackMoves=[];
    isKing=false;
    return false;
}




function gameover(winner:string){


    const winnerboard:HTMLElement=document.querySelector(".winnerboard")!;
    if(winner=="fa-solid"){
        winner="White"; 
        winnerboard.style.transform="rotate(180deg)";
    }
    else{
        winner="Black";
        winnerboard.style.transform="rotate(0deg)";
    }
    
    winnerboard.textContent=" "+winner+" Won The Game";
    winnerboard.style.display="inline";

    // pieces.style.display="none";

    pieces.forEach(piece => {
        piece.remove();
    });
    // chessboard.style.transform="rotate(0deg)";
   
    // squares.addEventListener("click",function(event){
    //     event.preventDefault();
    // });
}