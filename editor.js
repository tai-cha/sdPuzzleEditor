$(document).ready(()=>{
    const items = {
        0: null,
        1: "wall",
        2: "player",
        10: "red_obj",
        11: "red_goal",
        20: "blue_obj",
        21: "blue_goal",
        30: "green_obj",
        31: "green_goal"
    };
    let data = new Array(8);
    for(let i = 0;i<data.length;i++) data[i] = (new Array(8)).fill(0);
    console.log(data);
    let table = $("<table></table>").prependTo(".main");
    for(let row = 0; row < 8; row++){
        let tr = $("<tr></tr>").appendTo(table);
        for(let col = 0; col < 8; col++){
            let td = $(`<td data-row="${row}" data-col="${col}"></td>`).appendTo(tr);
        }
    }
    $("td").on("click", function(event){
        cellClicked($(this));
    });

    $("input[type=\"submit\"]").on("click", function(event){
        console.log("export clicked");
        exportMapData();
    });

    let cellClicked = (td) => {
        let row = parseInt(td.data("row"));
        let col = parseInt(td.data("col"));
        let nowIdx = Object.keys(items).findIndex(n => parseInt(n) == data[row][col]);
        if (nowIdx < 8){
            data[row][col] = parseInt(Object.keys(items)[nowIdx + 1]);
        }else{
            data[row][col] = parseInt(Object.keys(items)[0]);
        }
        let nextItem = data[row][col];
        changeDisplay(td, nextItem);
        console.log(data);
    }

    let changeDisplay = (td, num) => {
        td.removeClass();
        td.addClass(items[num]);
    }

    let exportMapData = () => {
        let exportArray = new Array(10);
        for(let i = 0; i < 10; i++){
            exportArray[i] = (new Array(10)).fill(1);
        }
        for(let row = 1; row< 9; row++){
            for(let col = 1; col < 9; col++){
                exportArray[row][col] = data[row-1][col-1];
            }
        }
        console.log(exportArray);
        let exportdata = {
            "mapData": exportArray
        }
        console.log(JSON.stringify(exportdata));
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(exportdata)], {type: 'application/json'}));
        a.download = 'mapdata.json';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

});