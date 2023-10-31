

var playerRed = "R"
var playerYellow = "y"
var currPlayer = playerRed;

var gameOver = "false";

var bord;
var currColumns ;

var rows = 6;
var coloums = 7;

window.onload = function (){
    setGame();
}

function setGame(){
    bord = [];
    currColumns = [5,5,5,5,5,5,5];

    for(let r = 0; r < rows; r++){
        let row = [];
        for(let c = 0; c < coloums; c++){
            //JS
            row.push(' ');

            //HTML
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add('tile');
            tile.addEventListener('click', setPiece);
            document.getElementById('bord').appendChild(tile);
        }
        bord.push(row);
    }
}

function setPiece(){
    
    // if (gameOver){
    //     return;
    // }

    console.log("hello");
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);


    r = currColumns[c];
    if(r < 0){
        return;
    }
    bord[r][c] = currPlayer;
    let tile = document.getElementById(r.toString()+ "-" + c.toString());

    if(currPlayer === playerRed){
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }
    r -= 1;
    currColumns[c] = r;
    checkWinner();
}

function checkWinner(){
    for(let r = 0; r < rows; r++ ){
        for(let c = 0; c < coloums; c++){
            if(bord[r][c] != ' '){
                if(bord[r][c] == bord[r][c+1] == bord[r][c+2] && bord[r][c+2] == bord[r][c+3]){
                    setWinner(r , c);
                    return;
                }
            }
        }
    }
    for(let c = 0; c < coloums; c++){
        for(let r = 0; r < rows-3; r++){
            if(bord[r][c] != " "){
                if(bord[r][c] == bord[r+1][c] == bord[r+2][c] && bord[r+2][c] == bord[r+3][c]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for(let r = 0; r < rows-3; r++){
        for(let c = 0; c < coloums-3; c++){
            if(bord[r][c] != " "){
                if(bord[r][c] == bord[r+1][c+1] && bord[r+1][c+1] == bord[r+2][c+2] && bord[r+2][c+2] == bord[r+3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for(let r = 3; r < rows; r++){
        for(let c = 0; c < coloums-3; c++){
            if(bord[r][c] != " "){
                if(bord[r][c] == bord[r-1][c+1] && bord[r-1][c+1] == bord[r-2][c+2] && bord[r-2][c+2] == bord[r-3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

}

function setWinner(r, c){
    let winner = document.getElementById('winner');
    if(bord[r][c] == playerRed){
        winner.innerHTML = "Red Wins";
    }else{
        winner.innerHTML = "yellow Wins";
    }
    gameOver = "true"
}