'use strict';

var matrix_width, matrix_height;
var characters;
var start_end_distance;
var matrix;
var startCell;
var endCell;
var minRouteLength;
var minLegLength;
var last_matrix;

function init() {
    matrix_width = 9;
    matrix_height = 9;
    characters = ['X', '0'];
    start_end_distance = 5;
    minRouteLength = (matrix_width + matrix_height) * 1.4142;
    minLegLength = 2;
    initMatrix();
}

function initMatrix() {
    let rowString = ' '.repeat(matrix_width);
    //console.log(rowString);
    //    let rowArray = rowString.split('');
    //console.log(rowArray);
    //console.log(rowArray.toString());
    //console.log('[' + rowArray.join('][') + ']');
    matrix = [];
    for (let i = 0; i < matrix_height; i++) {
        //console.log(i);
        let rowArray = rowString.split('');
        matrix.push(rowArray);
    }
    //console.log(matrix);
}

function displayMatrix() {
    var s = '';
    for (let iRow = 0; iRow < matrix_height; iRow++) {
        if (iRow > 0) s += '\n';
        s += '[' + matrix[iRow].join('][') + ']';
    }
    console.log(s);
}

function logMatrix(m) {
    var s = '';
    for (let iRow = 0; iRow < m.length; iRow++) {
        //if (iRow > 0) s += '\n';
        if (iRow > 0) s += '\n\n';
        //s += '[' + m[iRow].join('][') + ']';
        s += '  ' + m[iRow].join('  ') + ' ';
    }
    console.log(s);
}

function displayMatrixRoute(matrix, route) {
    let m = [];
    for (let row = 0; row < matrix.length; row++) {
        let r = [];
        for (let col = 0; col < matrix[row].length; col++) {
            r.push(matrix[row][col]);
        }
        m.push(r);
    }
    for (let i = 0; i < route.length; i++) {
        if (!route[i].equals(startCell)) {
            m[route[i].row][route[i].col] = i % 10;
        }
    }
    var s = '';
    for (let iRow = 0; iRow < matrix_height; iRow++) {
        if (iRow > 0) s += '\n';
        s += '[' + m[iRow].join('][') + ']';
    }
    console.log(s);
}

function getRandomBackgroundCaracter() {
    if (characters.length == 2) return characters[1];
    return characters[1 + Math.floor(Math.random() * (characters.length - 1))];
}

function getMatrixWithRoute(matrix, route) {
    let rowString = ' '.repeat(matrix_width);
    let m = [];
    for (let i = 0; i < matrix_height; i++) {
        let rowArray = rowString.split('');
        m.push(rowArray);
    }

    for (let iRow = 0; iRow < matrix_height; iRow++) {
        for (let iCol = 0; iCol < matrix_width; iCol++) {
            m[iRow][iCol] = getRandomBackgroundCaracter();
        }
    }

    m[startCell.row][startCell.col] = characters[0].toUpperCase();
    for (let i = 0; i < route.length; i++) {
        if (!route[i].equals(startCell)) {
            m[route[i].row][route[i].col] = characters[0];
        }
    }
    m[endCell.row][endCell.col] = characters[0].toUpperCase();
    //console.log(m.toString());
    return m;
}

function createStartAndEnd() {
    let sides = ['left', 'top', 'right', "bottom"];
    let startSide = sides.splice(Math.floor(Math.random() * 4), 1)[0];
    //console.log(startSide);
    let endSide = sides.splice(Math.floor(Math.random() * 3), 1)[0];
    //console.log(endSide);
    switch (startSide) {
        case 'left':
            startCell = new Cell(Math.floor(Math.random() * matrix_height), 0);
            break;
        case 'top':
            startCell = new Cell(0, Math.floor(Math.random() * matrix_width));
            break;
        case 'right':
            startCell = new Cell(Math.floor(Math.random() * matrix_height), matrix_width - 1);
            break;
        case 'bottom':
            startCell = new Cell(matrix_height - 1, Math.floor(Math.random() * matrix_width));
            break;
        default:
    }
    //console.log(`startCell at ${startSide} = ${startCell.toString()}`);
    switch (endSide) {
        case 'left':
            endCell = new Cell(Math.floor(Math.random() * matrix_height), 0);
            break;
        case 'top':
            endCell = new Cell(0, Math.floor(Math.random() * matrix_width));
            break;
        case 'right':
            endCell = new Cell(Math.floor(Math.random() * matrix_height), matrix_width - 1);
            break;
        case 'bottom':
            endCell = new Cell(matrix_height - 1, Math.floor(Math.random() * matrix_width));
            break;
        default:
    }
    //console.log(`endCell at ${endSide} = ${endCell.toString()}`);
}

function isStartAndEndOK() {
    if (startCell.row == endCell.row && startCell.col == endCell.col) return (false);
    if (startCell.row == 0 && endCell.row == matrix_height - 1) return (true);
    if (startCell.row == matrix_height - 1 && endCell.row == 0) return (true);
    if (startCell.col == 0 && endCell.col == matrix_width - 1) return (true);
    if (startCell.col == matrix_width - 1 && endCell.col == 0) return (true);
    let distance = Math.abs(startCell.row - endCell.row) + Math.abs(startCell.col - endCell.col);
    //console.log(`distance = ${distance}`);
    if (distance <= Math.min(matrix_width, matrix_height) - 2) return (false);
    return (true);
}

function swapCells(cell1, cell2) {
    let r = cell1.row;
    let c = cell1.col;
    cell1.col = cell2.col;
    cell1.row = cell2.row;
    cell2.col = c;
    cell2.row = r;
}

function changeStartAndEndWhenNeeded() {
    if (startCell.col > endCell.col) {
        swapCells(startCell, endCell);
    }
    if (startCell.col == endCell.col && startCell.row > endCell.row) {
        swapCells(startCell, endCell);
    }
}

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
    toString() {
        return (`Cell(row=${this.row} col=${this.col})`);
    }
    equals(anotherCell) {
        return (anotherCell.row == this.row && anotherCell.col == this.col);
    }
}

// function isLegLengthOK(route, cell) {
//     //if (route.length < minLegLength) return true;
//     if (route.length < 3) return true;
//     if (isCellAtTheEnd(cell)) return true;
//     let lastCellInRoute = route[route.length - 1];
//     if (cell.row == lastCellInRoute.row) {
//         if (cell.col < lastCellInRoute.col) {
//             //check left to right
//             for (let i = 2; i <= minLegLength; i++) {
//                 if (route[route.length - i].row != cell.row) return false;
//             }
//         } else {
//             //check right to left
//             for (let i = 2; i <= minLegLength; i++) {
//                 if (route[route.length - i].row != cell.row) return false;
//             }
//         }
//     }
//     if (cell.col == lastCellInRoute.col) {
//         if (cell.row < lastCellInRoute.row) {
//             //check top to bottom
//             for (let i = 2; i <= minLegLength; i++) {
//                 if (route[route.length - i].col != cell.col) return false;
//             }
//         } else {
//             //check bottom to top
//             for (let i = 2; i <= minLegLength; i++) {
//                 if (route[route.length - i].col != cell.col) return false;
//             }
//         }
//     }
//     return true;
// }

function isCellOkToRoute(route, cell) {
    for (let i = 0; i < route.length - 2; i++) {
        if (cell.row == route[i].row && cell.col == route[i].col) return false;

        if (cell.row == route[i].row - 1 && cell.col == route[i].col - 1) return false;
        if (cell.row == route[i].row - 1 && cell.col == route[i].col) return false;
        if (cell.row == route[i].row - 1 && cell.col == route[i].col + 1) return false;
        if (cell.row == route[i].row && cell.col == route[i].col + 1) return false;
        if (cell.row == route[i].row + 1 && cell.col == route[i].col + 1) return false;
        if (cell.row == route[i].row + 1 && cell.col == route[i].col) return false;
        if (cell.row == route[i].row + 1 && cell.col == route[i].col - 1) return false;
        if (cell.row == route[i].row && cell.col == route[i].col - 1) return false;

        if (cell.row == endCell.row - 1 && cell.col == endCell.col - 1) return false;
        if (cell.row == endCell.row + 1 && cell.col == endCell.col - 1) return false;
        if (cell.row == endCell.row + 1 && cell.col == endCell.col + 1) return false;
        if (cell.row == endCell.row - 1 && cell.col == endCell.col + 1) return false;
    }
    //if (!isLegLengthOK(route, cell)) return false;
    return true;
}

function isCellInMatrix(cell) {
    if (cell.row < 0 || cell.row > matrix_height - 1 || cell.col < 0 || cell.col > matrix_width - 1) return false;
    return true;
}

function isCellAtTheEnd(cell) {
    if (cell.row == endCell.row - 1 && cell.col == endCell.col) return true;
    if (cell.row == endCell.row && cell.col == endCell.col - 1) return true;
    if (cell.row == endCell.row + 1 && cell.col == endCell.col) return true;
    if (cell.row == endCell.row && cell.col == endCell.col + 1) return true;
    return false
}

function isLegLengthsAreOK(route) {
    // let r = [];
    let lastCorner = -1;
    for (let i = 0; i < route.length; i++) {
        if (i == 0 || i == route.length - 1) {
            // r.push(1);
        } else {
            if ((route[i].row == route[i - 1].row && route[i].col == route[i + 1].col) || (route[i].col == route[i - 1].col && route[i].row == route[i + 1].row)) {
                // r.push(1);
                if (lastCorner > 0) {
                    if (i - lastCorner < minLegLength) return false;
                }
                lastCorner = i;
            } else {
                // r.push(0);
            }
        }
    }
    return true;
}

function createRoute(route, level) {
    //console.log(`Level = ${level} Route = ${route.toString()}`);
    //console.log(route.toString());
    //route is an array of Cells
    let lastCellInRoute = route[route.length - 1];
    let previousCellInRoute = route.length > 1 ? route[route.length - 2] : undefined;
    //console.log(previousCellInRoute);
    let possibleNextCells = [];
    let cell = null;
    //left
    if (lastCellInRoute.col > 0 && (!previousCellInRoute || previousCellInRoute.col != lastCellInRoute.col - 1)) {
        cell = new Cell(lastCellInRoute.row, lastCellInRoute.col - 1);
        if (isCellOkToRoute(route, cell) && isCellInMatrix(cell)) {
            possibleNextCells.push(cell);
        }
    }
    //right
    if (lastCellInRoute.col < matrix_width - 1 && (!previousCellInRoute || previousCellInRoute.col != lastCellInRoute.col + 1)) {
        cell = new Cell(lastCellInRoute.row, lastCellInRoute.col + 1);
        if (isCellOkToRoute(route, cell) && isCellInMatrix(cell)) {
            possibleNextCells.push(cell);
        }
    }
    //up
    if (lastCellInRoute.row > 0 && (!previousCellInRoute || previousCellInRoute.row != lastCellInRoute.row - 1)) {
        cell = new Cell(lastCellInRoute.row - 1, lastCellInRoute.col);
        if (isCellOkToRoute(route, cell) && isCellInMatrix(cell)) {
            possibleNextCells.push(cell);
        }
    }
    //down
    if (lastCellInRoute.row < matrix_height - 1 && (!previousCellInRoute || previousCellInRoute.row != lastCellInRoute.row + 1)) {
        cell = new Cell(lastCellInRoute.row + 1, lastCellInRoute.col);
        if (isCellOkToRoute(route, cell) && isCellInMatrix(cell)) {
            possibleNextCells.push(cell);
        }
    }
    possibleNextCells.sort(function () { return 0.5 - Math.random() });
    let found_route = null;
    //console.log(possibleNextCells.toString());
    //console.log(`Level = ${level} lastCellInRoute = ${lastCellInRoute.toString()} possibleNextCells = ${possibleNextCells.toString()}`);
    for (let i = 0; i < possibleNextCells.length; i++) {
        //console.log(possibleNextCells[i].toString());
        //matrix[possibleNextCells[i].row][possibleNextCells[i].col] = i;
        let a = [...route];
        a.push(possibleNextCells[i]);
        if (isCellAtTheEnd(possibleNextCells[i])) {
            //console.log('return '+possibleNextCells[i].toString());
            if (a.length >= minRouteLength && isLegLengthsAreOK(a)) {
                return a;
            } else {
                return null;
            }
        }
        //if (level < 10) {
        //if (level < matrix_width + matrix_height + 1) {
        if (level < minRouteLength + 1) {
            //if (level < 100) {
            found_route = createRoute(a, level + 1);
            if (found_route != null) {
                return found_route;
            }
        } else {
            //console.log('');
            //console.log(`Level = ${level} i=${i} Route = ${a.toString()}`);
            //displayMatrixRoute(matrix, a);
        }
    }
    return null;
}

function letterLabyrinth() {
    //console.log('letterLabyrinth');
    let startDate = new Date();
    init();
    let i = 0;
    do {
        createStartAndEnd();
        i++;
    } while (i < 10 && !isStartAndEndOK());
    if (!isStartAndEndOK()) {
        console.log('Sorry, something went wrong during the creation - please try again!');
        return;
    }
    changeStartAndEndWhenNeeded();
    matrix[startCell.row][startCell.col] = 'S';
    matrix[endCell.row][endCell.col] = 'E';
    //createRoute([startCell, startCell]);
    let route = createRoute([startCell], 0);
    if (route != null) {
        //console.log('FOUND!!!');
        displayMatrixRoute(matrix, route);
    } else {
        console.log('not found ...');
    }
    let endDate = new Date();
    let timeElapsed = endDate.getTime() - startDate.getTime();
    // console.log(`startDate ${startDate.getMilliseconds()} milliseconds`);
    // console.log(`endDate ${endDate.getMilliseconds()} milliseconds`);
    console.log(`Elapsed ${timeElapsed} milliseconds`);
    //console.log('');
    //displayMatrix();
}

function createEndPoints() {
    let i = 0;
    do {
        createStartAndEnd();
        i++;
    } while (i < 10 && !isStartAndEndOK());
    if (!isStartAndEndOK()) {
        console.log('Sorry, something went wrong during the creation - please try again!');
        return;
    }
    changeStartAndEndWhenNeeded();
}

function generateMatrix(p_matrix_width, p_matrix_height, p_characters) {
    let retMatrix = null;
    matrix_width = p_matrix_width;
    matrix_height = p_matrix_height;
    characters = p_characters.split('');

    //    console.log(characters.toString());

    if (matrix_width < 5) matrix_width = 5;
    if (matrix_width > 9) matrix_width = 9;
    if (matrix_height < 5) matrix_height = 5;
    if (matrix_height > 9) matrix_height = 9;

    if (characters.length == 0) characters = ['X', 'O'];
    if (characters.length == 1) characters.push(characters[0] == 'O' ? 'X' : 'O');

    start_end_distance = 5;
    minRouteLength = (matrix_width + matrix_height) * 1.4142;
    minLegLength = 2;
    initMatrix();
    createEndPoints();
    matrix[startCell.row][startCell.col] = 'S';
    matrix[endCell.row][endCell.col] = 'E';
    //createRoute([startCell, startCell]);
    let route = createRoute([startCell], 0);
    if (route != null) {
        //console.log('FOUND!!!');
        retMatrix = getMatrixWithRoute(matrix, route);
    } else {
        console.log('not found ...');
    }
    return retMatrix;
}

function generateHTML(p_matrix_width, p_matrix_height, p_characters, cellsize, highlight) {
    let m = generateMatrix(p_matrix_width, p_matrix_height, p_characters);
    last_matrix = m;
    let retHTML = '';
    if (m != null) retHTML = createHTMLFromMatrix(m, startCell, endCell, cellsize, highlight);
    return retHTML;
}

function getLastMatrixHTML(cellsize, highlight) {
    let retHTML = '';
    if (last_matrix != null) retHTML = createHTMLFromMatrix(last_matrix, startCell, endCell, cellsize, highlight);
    return retHTML;
}

function getLastMatrix(){
    return last_matrix;
}

function getStartCell(){
    return startCell;
}

function getEndCell(){
    return endCell;
}

function generateEmptyHTML(p_matrix_width, p_matrix_height, cellsize) {
    matrix_width = p_matrix_width;
    matrix_height = p_matrix_height;

    if (matrix_width < 5) matrix_width = 5;
    if (matrix_width > 9) matrix_width = 9;
    if (matrix_height < 5) matrix_height = 5;
    if (matrix_height > 9) matrix_height = 9;

    let rowString = ' '.repeat(matrix_width);
    let m = [];
    for (let i = 0; i < matrix_height; i++) {
        let rowArray = rowString.split('');
        m.push(rowArray);
    }

    startCell = new Cell(-1, -1);
    endCell = new Cell(-1, -1);

    let retHTML = '';
    if (m != null) retHTML = createHTMLFromMatrix(m, startCell, endCell, cellsize);
    return retHTML;
}

function test(param) {
    return param;
}

function createHTMLFromMatrix(m, sc, ec, cellsize, highlight) {
    let retHTML = '';
    retHTML += `<div style="display:grid; grid-template-columns: repeat(${matrix_width}, ${cellsize}px); grid-template-rows: repeat(${matrix_height}, ${cellsize}px); width:${matrix_width*cellsize+20}px; height:${matrix_width*cellsize+20}px; padding:10px; background:white; border-radius:4px">`;
    for (let iRow = 0; iRow < matrix_height; iRow++) {
        if (iRow > 0) retHTML += '\n';
        for (let iCol = 0; iCol < matrix_width; iCol++) {
            let border_left = " border-left: 1px solid grey; ";
            if (sc && iCol == 0 && iRow == sc.row && iCol == sc.col) border_left = " border-left: 5px solid grey; ";
            if (ec && iCol == 0 && iRow == ec.row && iCol == ec.col) border_left = " border-left: 5px solid grey; ";

            let border_top = " border-top: 1px solid grey; ";
            if (sc && iRow == 0 && iRow == sc.row && iCol == sc.col) border_top = " border-top: 5px solid grey; ";
            if (ec && iRow == 0 && iRow == ec.row && iCol == ec.col) border_top = " border-top: 5px solid grey; ";

            let border_right = (iCol == matrix_width-1) ? " border-right: 1px solid grey; " : "";
            if (sc && iCol == matrix_width-1 && iRow == sc.row && iCol == sc.col) border_right = " border-right: 5px solid grey; ";
            if (ec && iCol == matrix_width-1 && iRow == ec.row && iCol == ec.col) border_right = " border-right: 5px solid grey; ";

            let border_bottom = (iRow == matrix_height-1) ? " border-bottom: 1px solid grey; " : "";
            if (sc && iRow == matrix_height-1 && iRow == sc.row && iCol == sc.col) border_bottom = " border-bottom: 5px solid grey; ";
            if (ec && iRow == matrix_height-1 && iRow == ec.row && iCol == ec.col) border_bottom = " border-bottom: 5px solid grey; ";

            let border = border_left + border_top + border_right + border_bottom;
            let background = highlight && characters && characters.length>0 && m[iRow][iCol].toLowerCase() == characters[0].toLowerCase() ? "background:orange;" : "";
            //retHTML += `<div style="${border} ${background}"><span style="font-size:${cellsize/2}px; text_align:center; vertical-align:50px;">${m[iRow][iCol].toLowerCase()}</span></div>\n`;
            retHTML += `<div style="${border} ${background}"><span style="font-size:${cellsize * 0.6}px; text_align:center;">${m[iRow][iCol].toLowerCase()}</span></div>\n`;
        }
    }
    retHTML += '</div>';
    return retHTML;
}

function consoleHtmlTest() {
    let m = generateMatrix(9, 9, 'pb');
    if (m != null) console.log(createHTMLFromMatrix(m));
}

function consoleTest() {
    //let m = generateMatrix(9, 9, 'X0');
    //let m = generateMatrix(9, 9, 'X01');
    //let m = generateMatrix(9, 9, 'pbq');
    let m = generateMatrix(9, 9, 'pb');
    //let m = generateMatrix(9, 9, 'pq');
    if (m != null) logMatrix(m);
    // console.log(getRandomBackgroundCaracter());
    // console.log(getRandomBackgroundCaracter());
    // console.log(getRandomBackgroundCaracter());
    // console.log(getRandomBackgroundCaracter());
    // console.log(getRandomBackgroundCaracter());
    // console.log(getRandomBackgroundCaracter());
    // console.log(getRandomBackgroundCaracter());
}
