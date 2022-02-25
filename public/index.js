letter_template =   `
    <option value="1">A</option>
    <option value="2">B</option>
    <option value="3">C</option>
    <option value="4">D</option>
    <option value="5">E</option>
    <option value="6">F</option>
    <option value="7">G</option>
    <option value="8">H</option>
    <option value="9">I</option>
    <option value="10">J</option>`;

number_template = `
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>`;

align_template = `
    <option value="HORIZONTAL">HORIZONTAL</option>
    <option value="VERTICAL">VERTICAL</option>`;

document.getElementById('carrier_hor').innerHTML += letter_template
document.getElementById('carrier_ver').innerHTML += number_template
document.getElementById('carrier_align').innerHTML += align_template

document.getElementById('battleship_hor').innerHTML += letter_template
document.getElementById('battleship_ver').innerHTML += number_template
document.getElementById('battleship_align').innerHTML += align_template

document.getElementById('destroyer_hor').innerHTML += letter_template
document.getElementById('destroyer_ver').innerHTML += number_template
document.getElementById('destroyer_align').innerHTML += align_template

document.getElementById('submarine_hor').innerHTML += letter_template
document.getElementById('submarine_ver').innerHTML += number_template
document.getElementById('submarine_align').innerHTML += align_template

document.getElementById('patrolboat_hor').innerHTML += letter_template
document.getElementById('patrolboat_ver').innerHTML += number_template
document.getElementById('patrolboat_align').innerHTML += align_template

const placed_cells = []

const carrier = []
var carrier_index_in_pc = 0
const battleship = []
var battleship_index_in_pc = 0
const destroyer = []
var destroyer_index_in_pc = 0
const submarine = []
var submarine_index_in_pc = 0
const patrolboat = []
var patrolboat_index_in_pc = 0

var all_players_ships = []

const comp_placed_cells = []

const comp_carrier = []
var comp_carrier_index_in_pc = 0
const comp_battleship = []
var comp_battleship_index_in_pc = 0
const comp_destroyer = []
var comp_destroyer_index_in_pc = 0
const comp_submarine = []
var comp_submarine_index_in_pc = 0
const comp_patrolboat = []
var comp_patrolboat_index_in_pc = 0

var all_computers_ships = []


function push_to_array(st, val){
    switch(st){
        case 'carrier':
            carrier.push(val);
            break;
        case 'battleship':
            battleship.push(val);
            break;
        case 'destroyer':
            destroyer.push(val);
            break;
        case 'submarine':
            submarine.push(val);
            break;
        case 'patrolboat':
            patrolboat.push(val);
            break;
    }
}

function save_index(st, length){
    switch(st){
        case 'carrier':
            carrier_index_in_pc = (placed_cells.length - length);
            break;
        case 'battleship':
            battleship_index_in_pc = (placed_cells.length - length);
            break;
        case 'destroyer':
            destroyer_index_in_pc = (placed_cells.length - length);
            break;
        case 'submarine':
            submarine_index_in_pc = (placed_cells.length - length);
            break;
        case 'patrolboat':
            patrolboat_index_in_pc = (placed_cells.length - length);
            break;
    }
    // console.log(st, placed_cells.length-length)
}

function fill_ship(ship_type, length, color, but_name){

    const alignment = document.getElementById(ship_type + '_align').value
    const hori = document.getElementById(ship_type + '_hor').value
    const verti = document.getElementById(ship_type + '_ver').value

    x = document.getElementById('table_battleship').getElementsByTagName('td');

    var duplicate_ship_cell = false

    if(alignment == 'HORIZONTAL'){
        if(length <= (11-hori)){
            cell = (verti-1) + (hori)
            for(i=0;i<length;i++){
                if(placed_cells.includes(parseInt(cell)+i)){
                    duplicate_ship_cell = true
                }
            }
            if(!duplicate_ship_cell){
                for(i=0;i<length;i++){
                    x[parseInt(cell)+i].style.backgroundColor = color
                    placed_cells.push(parseInt(cell)+i)
                    push_to_array(ship_type, (parseInt(cell)+i))
                }
                save_index(ship_type, length)
                document.getElementById(but_name).disabled = false
            }            
            // console.log(placed_cells)
        } else {
            alert("Choose a different value")
        }
    } else {
        if(length <= (11-verti)){
            cell = (verti-1) + (hori)
            for(i=0;i<length;i++){
                if(placed_cells.includes(parseInt(cell)+(i*10))){
                    duplicate_ship_cell = true
                }
            }
            if(!duplicate_ship_cell){
                for(i=0;i<length;i++){
                    x[parseInt(cell)+(i*10)].style.backgroundColor = color
                    placed_cells.push(parseInt(cell)+(i*10))
                    push_to_array(ship_type, (parseInt(cell)+(i*10)))
                }
                save_index(ship_type)
                document.getElementById(but_name).disabled = false
            }            

        } else {
            alert("Choose a different value")
        }
    }
    check_player_ships()
}

function delete_ship(ship_type, length, but_name){
    document.getElementById(but_name).disabled = true
    var index = 0

    switch(ship_type){
        case 'carrier':
            index = carrier_index_in_pc;
            carrier.splice(0,length);
            break;
        case 'battleship':
            index = battleship_index_in_pc;
            battleship.splice(0,length);
            break;
        case 'destroyer':  
            index = destroyer_index_in_pc;
            destroyer.splice(0,length);
            break;
        case 'submarine':  
            index = submarine_index_in_pc;
            submarine.splice(0,length);
            break;
        case 'patrolboat':     
            index = patrolboat_index_in_pc;
            patrolboat.splice(0,length);
            break;
    }

    for(i=parseInt(index);i<(parseInt(length)+parseInt(index));i++){
        x[placed_cells[i]].style.backgroundColor = '#BCDD5A'
        delete placed_cells[i]
    }
}

function generate_random_int(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

pc_table = document.getElementById('table_battleship_pc').getElementsByTagName('td')
var no_pc_carrier_placed = true
var no_pc_battleship_placed = true
var no_pc_destroyer_placed = true
var no_pc_sub_placed = true
var no_pc_boat_placed = true

var not_all_ships_placed = true

var pc_no_duplicate_cell = true


function find_dup_placed_cell(cell, length, ali){
    pc_no_duplicate_cell = true
    if(ali == 'h'){
        for(i=0;i<length;i++){
            cell = ((row-1)*10 + column) + i
            if(comp_placed_cells.includes(cell))
                pc_no_duplicate_cell = false
        }
    } else {
        for(i=0;i<length;i++){
            cell = ((row-1)*10 + column) + (i*10)
            if(comp_placed_cells.includes(cell))
                pc_no_duplicate_cell = false
        }
    }
    
}

function computer_generated_ships(){
    while(not_all_ships_placed){
        var align = ''
        if(no_pc_carrier_placed){
            if((generate_random_int(1,10)) > 5)
                align = 'HORIZONTAL'
            else
                align = 'VERTICAL'

            if (align == 'HORIZONTAL'){
                column = generate_random_int(1,6)
                row = generate_random_int(1,10)
                find_dup_placed_cell(((row-1)*10 + column), 5, 'h')
                if(pc_no_duplicate_cell){
                    for(i=0;i<5;i++){
                        cell = ((row-1)*10 + column) + i
                        // pc_table[cell].style.backgroundColor = 'red'
                        comp_placed_cells.push(cell)
                        comp_carrier.push(cell)
                        no_pc_carrier_placed = false
                    }
                }
            } else {
                column = generate_random_int(1,10)
                row = generate_random_int(1,6)
                find_dup_placed_cell(((row-1)*10 + column), 5, 'v')
                if(pc_no_duplicate_cell){
                    for(i=0;i<5;i++){
                        cell = ((row-1)*10 + column) + (i*10)
                        // pc_table[cell].style.backgroundColor = 'red'
                        comp_placed_cells.push(cell)
                        comp_carrier.push(cell)
                        no_pc_carrier_placed = false
                    }
                }
            }
        }
        if(no_pc_battleship_placed){
            if((generate_random_int(1,10)) > 5)
                align = 'HORIZONTAL'
            else
                align = 'VERTICAL'

            if (align == 'HORIZONTAL'){
                column = generate_random_int(1,7)
                row = generate_random_int(1,10)
                find_dup_placed_cell(((row-1)*10 + column), 4, 'h')
                if(pc_no_duplicate_cell){
                    for(i=0;i<4;i++){
                        cell = ((row-1)*10 + column) + i
                        // pc_table[cell].style.backgroundColor = 'blue'
                        comp_placed_cells.push(cell)
                        comp_battleship.push(cell)
                        no_pc_battleship_placed = false
                    }
                }
            } else {
                column = generate_random_int(1,10)
                row = generate_random_int(1,7)
                find_dup_placed_cell(((row-1)*10 + column), 4, 'v')
                if(pc_no_duplicate_cell){
                    for(i=0;i<4;i++){
                        cell = ((row-1)*10 + column) + (i*10)
                        // pc_table[cell].style.backgroundColor = 'blue'
                        comp_placed_cells.push(cell)
                        comp_battleship.push(cell)
                        no_pc_battleship_placed = false
                    }
                }
            }
        }
        if(no_pc_destroyer_placed){
            if((generate_random_int(1,10)) > 5)
                align = 'HORIZONTAL'
            else
                align = 'VERTICAL'

            if (align == 'HORIZONTAL'){
                column = generate_random_int(1,8)
                row = generate_random_int(1,10)
                find_dup_placed_cell(((row-1)*10 + column), 3, 'h')
                if(pc_no_duplicate_cell){
                    for(i=0;i<3;i++){
                        cell = ((row-1)*10 + column) + i
                        // pc_table[cell].style.backgroundColor = 'orange'
                        comp_placed_cells.push(cell)
                        comp_destroyer.push(cell)
                        no_pc_destroyer_placed = false
                    }
                }
            } else {
                column = generate_random_int(1,10)
                row = generate_random_int(1,8)
                find_dup_placed_cell(((row-1)*10 + column), 3, 'v')
                if(pc_no_duplicate_cell){
                    for(i=0;i<3;i++){
                        cell = ((row-1)*10 + column) + (i*10)
                        // pc_table[cell].style.backgroundColor = 'orange'
                        comp_placed_cells.push(cell)
                        comp_destroyer.push(cell)
                        no_pc_destroyer_placed = false
                    }
                }
            }
        }
        if(no_pc_sub_placed){
            if((generate_random_int(1,10)) > 5)
                align = 'HORIZONTAL'
            else
                align = 'VERTICAL'

            if (align == 'HORIZONTAL'){
                column = generate_random_int(1,8)
                row = generate_random_int(1,10)
                find_dup_placed_cell(((row-1)*10 + column), 3, 'h')
                if(pc_no_duplicate_cell){
                    for(i=0;i<3;i++){
                        cell = ((row-1)*10 + column) + i
                        // pc_table[cell].style.backgroundColor = 'pink'
                        comp_placed_cells.push(cell)
                        comp_submarine.push(cell)
                        no_pc_sub_placed = false
                    }
                }
            } else {
                column = generate_random_int(1,10)
                row = generate_random_int(1,8)
                find_dup_placed_cell(((row-1)*10 + column), 3, 'v')
                if(pc_no_duplicate_cell){
                    for(i=0;i<3;i++){
                        cell = ((row-1)*10 + column) + (i*10)
                        // pc_table[cell].style.backgroundColor = 'pink'
                        comp_placed_cells.push(cell)
                        comp_submarine.push(cell)
                        no_pc_sub_placed = false
                    }
                }
            }
        }
        if(no_pc_boat_placed){
            if((generate_random_int(1,10)) > 5)
                align = 'HORIZONTAL'
            else
                align = 'VERTICAL'

            if (align == 'HORIZONTAL'){
                column = generate_random_int(1,9)
                row = generate_random_int(1,10)
                find_dup_placed_cell(((row-1)*10 + column), 2, 'h')
                if(pc_no_duplicate_cell){
                    for(i=0;i<2;i++){
                        cell = ((row-1)*10 + column) + i
                        // pc_table[cell].style.backgroundColor = 'violet'
                        comp_placed_cells.push(cell)
                        comp_patrolboat.push(cell)
                        no_pc_boat_placed = false
                    }
                }
            } else {
                column = generate_random_int(1,10)
                row = generate_random_int(1,9)
                find_dup_placed_cell(((row-1)*10 + column), 2, 'v')
                if(pc_no_duplicate_cell){
                    for(i=0;i<2;i++){
                        cell = ((row-1)*10 + column) + (i*10)
                        // pc_table[cell].style.backgroundColor = 'violet'
                        comp_placed_cells.push(cell)
                        comp_patrolboat.push(cell)
                        no_pc_boat_placed = false
                    }
                }
            }
        }
        if(!(no_pc_carrier_placed || no_pc_battleship_placed || no_pc_destroyer_placed || no_pc_sub_placed || no_pc_boat_placed)){
            not_all_ships_placed = false
        }
    }
}

computer_generated_ships()

// Function to check whether player placed all the ships
function check_player_ships(){
    if((carrier.length > 0) && (battleship.length > 0) && (destroyer.length > 0) && (submarine.length > 0) && (patrolboat.length > 0)){
        document.getElementById('start_button').disabled = false
    } else {
        document.getElementById('start_button').disabled = true
    }
}


player_table_cells = document.getElementById('table_battleship').getElementsByTagName('td');

// table.onclick = (e)=>{
//     console.log("You clicked me", e.target.parentElement.rowIndex, e.target.cellIndex)
//     rx = (parseInt(e.target.parentElement.rowIndex)-1)*10
//     cX = parseInt(e.target.cellIndex)
//     cell = table.getElementsByTagName('td')
//     cell[(rx+cX)].style.backgroundColor = 'black'
//     // console.log(document.getElementsByTagName('td'))
// }

pc_table_cells = document.getElementById('table_battleship_pc');
var pc_played_cells = []

function start_game(){
    document.getElementById('message_1').innerHTML += "<h3> Game Started </h3>"
    document.getElementById('inputs').style.display = "none"
    document.getElementById('start_button').disabled = true
    var no_end_game = true
    document.getElementById('message').innerHTML += "<p> Your Turn </p>"

    all_players_ships = [...carrier, ...battleship, ...destroyer, ...submarine, ...patrolboat]
    all_computers_ships = [...comp_carrier, ...comp_battleship, ...comp_destroyer, ...comp_submarine, ...comp_patrolboat]


    pc_table_cells.onclick = (e)=> {
        var rX = (parseInt(e.target.parentElement.rowIndex)-1)*10
        var cX = parseInt(e.target.cellIndex)
        var cell = (rX+cX)
        pc_cell = pc_table_cells.getElementsByTagName('td')

        if(comp_carrier.includes(cell) || comp_battleship.includes(cell) || comp_destroyer.includes(cell) || 
            comp_submarine.includes(cell) || comp_patrolboat.includes(cell)) {
                pc_cell[cell].style.backgroundColor = 'green'

                for(var i=0;i<all_computers_ships.length;i++){
                    if(all_computers_ships[i]==cell){
                        all_computers_ships.splice(i,1)
                        break   
                    }
                }

            } else {
                pc_cell[cell].style.backgroundColor = 'black'
            }
        // console.log(all_computers_ships)
        var comp_played = true
        while(comp_played){
            cell = generate_random_int(1,100)
            if(pc_played_cells.includes(cell)){
                console.log("Same cell")
            } else {
                if(carrier.includes(cell) || battleship.includes(cell) || destroyer.includes(cell) || 
                    submarine.includes(cell) || patrolboat.includes(cell)) {
                        player_table_cells[cell].style.backgroundColor = 'green'

                        for(var i=0;i<all_players_ships.length;i++){
                            if(all_players_ships[i]==cell){
                                all_players_ships.splice(i,1)
                                break   
                            }
                        }
                } else {
                    player_table_cells[cell].style.backgroundColor = 'black'
                }
                pc_played_cells.push(cell)
                comp_played = false
            }
        }
        // console.log("PC", all_computers_ships.length)
        // console.log("Player", all_players_ships.length)
        if((all_players_ships.length == 0) || (all_computers_ships.length == 0)){
            if(all_players_ships.length == 0){
                document.getElementById('message_1').innerHTML += "<br><h4> Computer Won ! You Lost :( </h4>"
            } else {
                document.getElementById('message_1').innerHTML += "<br><h4> You have Won ! </h4>"
            }
        }
    }
}