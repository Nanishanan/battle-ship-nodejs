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

    duplicate_ship_cell = false

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
            console.log(placed_cells)

        } else {
            alert("Choose a different value")
        }
    }

}

function delete_ship(ship_type, length, but_name){
    document.getElementById(but_name).disabled = true
    var index = 0
    console.log(ship_type)

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

    console.log("Index",index,"length", length)

    for(i=index;i<(length+index);i++){
        console.log("inside i", placed_cells[i])
        x[placed_cells[i]].style.backgroundColor = 'white'
    }

    placed_cells.splice(index, length)
}