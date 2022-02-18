// const template = document.createAttribute('template')

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

function fill_ship(ship_type, length){

    const alignment = document.getElementById(ship_type + '_align').value
    const hori = document.getElementById(ship_type + '_hor').value
    const verti = document.getElementById(ship_type + '_ver').value

    x = document.getElementById('table_battleship').getElementsByTagName('td');

    if(alignment == 'HORIZONTAL'){
        if(!((hori > length) && (length == 5))){
            console.log(hori, length)
            for(i=0;i<length;i++){
                cell = (verti-1) + (hori)
                console.log(parseInt(cell)+i)
                x[parseInt(cell)+i].style.backgroundColor = 'red'
            }
        }
    }

}
