    const pieces = document.querySelectorAll('.piece');
    const squares = document.querySelectorAll('.square');
    const playerturn=document.querySelector('.fa-regular');
    const messages=document.querySelector('.alert-msg');
    const chessboard=document.querySelector('.chessboard');
    var selectedsquare=`<div></div>`;
    let possibleMoves=[];
    var selectedpiece=`<a></a>`;
    var piecenames="";
    var selectedpiecenames="";

pieces.forEach(piece => {
                
                piece.addEventListener('click', () => {
                                                            // Getting the details of selected piece
                piecenames=piece.getAttribute("class");
                piecenames=piecenames.split(" ");

                if(piecenames[2]==playerturn.getAttribute("class") || (piecenames[2]!=selectedpiecenames[2] && selectedpiece!=`<a></a>`) ){

                    console.log(playerturn.title);

                
                    if(selectedpiece==`<a></a>` || piecenames[2]==selectedpiecenames[2]){
                        selectedpiece=piece;
                        selectedpiecenames=selectedpiece.getAttribute("class");
                        selectedpiecenames=selectedpiecenames.split(" ");
                        if(selectedsquare!=`<div></div>`)
                        {selectedsquare.style.border="0px solid blue";}
                        selectedsquare=document.querySelector(`[data-row="${selectedpiece.style.gridRow}"][data-col="${selectedpiece.style.gridColumn}"]`);
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
        
      moveNext(selectedpiece,[square.dataset.row,square.dataset.col])
    },true);
});


function movesOfPawn(piece){
    let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
    console.log(currentPosition);
    let currentRow=Number(currentPosition[0]);
    let currentColumn=Number(currentPosition[1]);
    let noOfmoves=0;
    var possibleMoves=[];
    if(currentRow=="7" || currentRow=="2"){//For initial move of pawn
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

function movesOfElephant(piece){
    let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
    console.log(currentPosition);
    let currentRow=Number(currentPosition[0]);
    let currentColumn=Number(currentPosition[1]);
    var possibleMoves=[]
    possibleMoves=nondiagonalmoves(currentRow,currentColumn,possibleMoves);

        console.log(possibleMoves);
        const moves=possibleMoves;
        return moves;
}

function movesOfHorse(piece){
    let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
    console.log(currentPosition);
    let currentRow=Number(currentPosition[0]);
    let currentColumn=Number(currentPosition[1]);
    var possibleMoves=[];
    // for(let direction=1;direction<=4; direction+=1){ //possible up moves
    //     if(moveup<=8) { possibleMoves.push([moveup,currentColumn]); }    // For code efficency
    //     if(moveright<=8) { possibleMoves.push([currentRow,moveright]); }
    // }

    possibleMoves.push([currentRow+2,currentColumn-1]);
    possibleMoves.push([currentRow+2,currentColumn+1]);
    possibleMoves.push([currentRow-2,currentColumn-1]);
    possibleMoves.push([currentRow-2,currentColumn+1]);

    possibleMoves.push([currentRow+1,currentColumn+2]);
    possibleMoves.push([currentRow-1,currentColumn+2]);
    possibleMoves.push([currentRow+1,currentColumn-2]);
    possibleMoves.push([currentRow-1,currentColumn-2]);

    console.log(possibleMoves);
    const moves=possibleMoves;
    return moves;
    
}

function movesOfBishop(piece){
    let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
    console.log(currentPosition);
    let currentRow=Number(currentPosition[0]);
    let currentColumn=Number(currentPosition[1]);
    var possibleMoves=[];
    possibleMoves=diagonalmoves(currentRow,currentColumn,possibleMoves);


    console.log(possibleMoves);
    const moves=possibleMoves;
    return moves;
}

function movesOfQueen(piece){
    let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
    console.log(currentPosition);
    let currentRow=Number(currentPosition[0]);
    let currentColumn=Number(currentPosition[1]);
    var possibleMoves=[];
        //possible moves same as elephant
        possibleMoves=nondiagonalmoves(currentRow,currentColumn,possibleMoves);


        //possible moves same as bishop
        possibleMoves=diagonalmoves(currentRow,currentColumn,possibleMoves);

        console.log(possibleMoves);
        const moves=possibleMoves;
        return moves;
   
}

function movesOfKing(piece){
    let currentPosition=[piece.style.gridRow,piece.style.gridColumn];
    console.log(currentPosition);

    let currentRow=Number(currentPosition[0]);
    let currentColumn=Number(currentPosition[1]);
    var possibleMoves=[];

    var move=[currentRow+1,currentColumn];
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

function attackPossibles(move){
    // console.log(move);
    var movesquare=document.querySelector(`[data-row="${move[0]}"][data-col="${move[1]}"]`);

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
            return 3;               //both has different elements
        }
    }

    return 4;

}



function moveNext(startpiece,endpoints,endpiece=`<p></p>`){
    console.log("square handler"+endpoints);
    // console.log(startpiece);
    if(startpiece!=`<a></a>`){
        if(selectedpiecenames[1]=="pawn"){
            possibleMoves=movesOfPawn(startpiece,piecenames);
        }
        else if(selectedpiecenames[1]=="elephant"){
            possibleMoves=movesOfElephant(startpiece,piecenames);
        }
        else if(selectedpiecenames[1]=="horse"){
            possibleMoves=movesOfHorse(startpiece,piecenames);
        }
        else if(selectedpiecenames[1]=="bishop"){
            possibleMoves=movesOfBishop(startpiece,piecenames);
        }
        else if(selectedpiecenames[1]=="queen"){
            possibleMoves=movesOfQueen(startpiece,piecenames);
        }
        else if(selectedpiecenames[1]=="king"){
            possibleMoves=movesOfKing(startpiece,piecenames);
        }
  let choosenSquare=endpoints;    //piece movement
    let wrongmove=0;
  for(let possiblesquare of possibleMoves){
    // console.log("ps:"+possiblesquare);
    // console.log("cs:"+choosenSquare);
    if(choosenSquare[0] == possiblesquare[0] && choosenSquare[1]==possiblesquare[1]){
        console.log("Move on");
        var startsquare=document.querySelector(`[data-row="${startpiece.style.gridRow}"][data-col="${startpiece.style.gridColumn}"]`);
        
        var endsquare=document.querySelector(`[data-row="${choosenSquare[0]}"][data-col="${choosenSquare[1]}"]`);
       
        startpiece.style.gridRow=endsquare.dataset.row;
        startpiece.style.gridColumn=endsquare.dataset.col;
        endsquare.title=startsquare.title;
        startsquare.title="none";
        console.log("Endpiece");
        console.log(endpiece);
        if(endpiece!=`<p></p>`){
            var endpiecenames=endpiece.getAttribute("class");
            endpiecenames=endpiecenames.split(" ");
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
  if(wrongmove==0){
    
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
  selectedpiece=`<a></a>`;
  possibleMoves=[];
  

        
}


function nondiagonalmoves(currentRow,currentColumn,possibleMoves){
    for(let moveup=currentRow+1,moveright=currentColumn+1; moveup<=8 || moveright<=8; moveup+=1,moveright+=1){ //possible up moves
        if(moveup<=8) { 
          let move=[moveup,currentColumn];
          var casevalue=attackPossibles(move);
  
                      if(casevalue==1)    { possibleMoves.push([moveup,currentColumn]); }
  
                      if(casevalue==2)    { moveup=9; }
  
                      if(casevalue==3)    { possibleMoves.push([moveup,currentColumn]); moveup=9;  }
      
        }
        if(moveright<=8) { 
          let move=[currentRow,moveright];
          var casevalue=attackPossibles(move);
  
                      if(casevalue==1)    { possibleMoves.push([currentRow,moveright]); }
  
                      if(casevalue==2)    { moveright=9; }
  
                      if(casevalue==3)    { possibleMoves.push([currentRow,moveright]); moveright=9;  }
      
        }
      }
  
      for(let movedown=currentRow-1,moveleft=currentColumn-1; movedown>=1 || moveleft>=1; movedown-=1,moveleft-=1){ //possible down moves
          if(movedown>=1) {
              let move=[movedown,currentColumn];
              var casevalue=attackPossibles(move);
  
                      if(casevalue==1)    { possibleMoves.push([movedown,currentColumn]); }
  
                      if(casevalue==2)    { movedown=0; }
  
                      if(casevalue==3)    { possibleMoves.push([movedown,currentColumn]); movedown=0;  }
      
          }
          if(moveleft>=1)  {
              let move=[currentRow,moveleft];
              var casevalue=attackPossibles(move);
  
                      if(casevalue==1)    { possibleMoves.push([currentRow,moveleft]); }
  
                      if(casevalue==2)    { moveleft=0; }
  
                      if(casevalue==3)    { possibleMoves.push([currentRow,moveleft]); moveleft=0;  }
      
          }
        }

        return possibleMoves;
}

function diagonalmoves(currentRow,currentColumn,possibleMoves){
    for(let moveup=currentRow+1,moveright=currentColumn+1; moveup<=8 && moveright<=8; moveup+=1,moveright+=1){ //possible up moves
        
        let move=[moveup,moveright];
        var casevalue=attackPossibles(move);

                if(casevalue==1)    { possibleMoves.push([moveup,moveright]); }

                if(casevalue==2)    { moveup=9; }

                if(casevalue==3)    { possibleMoves.push([moveup,moveright]); moveup=9;  }

    }
    for(let moveup=currentRow-1,moveright=currentColumn-1; moveup>=1 && moveright>=1; moveup-=1,moveright-=1){ //possible up moves
        

        let move=[moveup,moveright];
        var casevalue=attackPossibles(move);

                if(casevalue==1)    { possibleMoves.push([moveup,moveright]); }

                if(casevalue==2)    { moveup=0; }

                if(casevalue==3)    { possibleMoves.push([moveup,moveright]); moveup=0;  }

    }
    for(let moveup=currentRow+1,moveright=currentColumn-1; moveup<=8 && moveright>=1; moveup+=1,moveright-=1){ //possible up moves
       
        let move=[moveup,moveright];
        var casevalue=attackPossibles(move);

                if(casevalue==1)    { possibleMoves.push([moveup,moveright]); }

                if(casevalue==2)    { moveup=9; }

                if(casevalue==3)    { possibleMoves.push([moveup,moveright]); moveup=9;  }

    }
    for(let moveup=currentRow-1,moveright=currentColumn+1; moveup>=1 && moveright<=8; moveup-=1,moveright+=1){ //possible up moves
        let move=[moveup,moveright];
        var casevalue=attackPossibles(move);

                if(casevalue==1)    { possibleMoves.push([moveup,moveright]); }

                if(casevalue==2)    { moveup=0; }

                if(casevalue==3)    { possibleMoves.push([moveup,moveright]); moveup=0;  }

    }

    return possibleMoves;
}

function gameover(winner){
    if(winner=="fa-solid"){
        winner="White";
    }
    else{
        winner="Black";
    }
    const winnerboard=document.querySelector(".winnerboard");
    winnerboard.textContent=" "+winner+" Won The Game";
    winnerboard.style.display="inline";

    // pieces.style.display="none";

    pieces.forEach(piece => {
        piece.remove();
    });
    // squares.addEventListener("click",function(event){
    //     event.preventDefault();
    // });
}