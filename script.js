let currentCell;
const columns = 26;
const rows= 100;


//----------------------creating 2D matrix -----------------

    // [                         : outer array { storing rows }
    //    [ {}, {} ],            : inner array { storing columns }
    //    [ {}, {} ],            : inner array  { storing columns }
    //    [ {}, {} ],            : inner array { storing columns }
    // ]
    // matrix === 1 * 3           : rows=1 , column =3 
    
     // Total  matrix of table = 101 * 27 

     let matrix = new Array(rows); ;

     for(let row=0; row<rows; row++){
        matrix[row] = new Array(columns);                          // columns (26) : length of  matrix[row] array
        
        for(col=0; col<columns; col++){
            matrix[row][col]={};
        }    
     }
 
 
     // update matrix take  currentCell
 
    function updateMatrix(currentCell){
        let obj ={
            style: currentCell.style.cssText,
            text: currentCell.innerText,
            id: currentCell.id,                                                  // id: A1 , A2 , A3 , B1 , B2 , B3
        }
         
        let id = currentCell.id.split("");                                       // become :  id === ["B"] [1] , if B1
        
        let i= id[1]-1 ;                                                         // 0 , 1 , 2 , 3
        let j = id[0].charCodeAt(0)-65;                                     
        //                    A    - 65   === 0 , B - 65 === 1 , C - 65 === 2
        matrix[i][j] = obj; 
    }



//-------------Creating the whole of tables---------------

//1-For heading alphabts  :  A --------- Z

const theadRow = document.getElementById("table-heading-row");

for(let col=0; col<columns; col++){
    let th = document.createElement("th");                                       // creating <th> tag
    th.innerText = String.fromCharCode(col + 65);                                // Filling th with alphates
    theadRow.append(th);                                                         // Adding th by { append } in theadRow
}



//2-For creating rows 1------ 100 no.

const tbody = document.getElementById("table-body");


// This will create all the row no. 1 ----- 100 
for(let row=1; row<=rows; row++){
    let tr = document.createElement("tr");                                      //  creating <tr> tag : row     
    let th = document.createElement("th");                                      //  creating <th> tag : header
    th.innerText = row;                                                        //   In <th> header tag : writting value === row no. 1 ----- 100 by variable row
    tr.append(th);                                                             //   In <tr> tag : adding <th> value



    // This will create the 1 ----- 100  row cells {empty}
    for(let col= 0; col<columns-1; col++){
        let td = document.createElement("td");                                // creating <td> : table data : empty cells 
        
        //3-To edit the cells :  Mark contenteditable  as true { This is the inbuilt attribute  }
        td.setAttribute("contenteditable", true);


        //4- This will create id of each cells  : as  A --------- Z and row no.
        //                            id= "A 1" :  A and current row no.
        td.setAttribute("id",`${String.fromCharCode(col + 65)}${row}`);



        //----------onInputFn-------
        td.addEventListener("input", onInputFn);


        //5- Creating function(onfocus) when clicking / focus oon cells
         td.addEventListener("focus", onFocusFn );                               //(event)=> onfocus(event));


        tr.append(td);                                                        // Adding to the 1st <tr> tag
    }
    tbody.append(tr);                                                        // Adding in table
}






//-------------onInputFn function : printing current/ clicked / focused cell---- ----------

function onInputFn(event){
    updateMatrix(event.target);  
   // console.log(matrix);                                            // give event,target to updateMatrix function === this provide all information about focused cell
}



//-------------onFocusFn function-------------

function onFocusFn(event){
    currentCell = event.target;

    // currentCell.id = each cell id_name
    // Selecting the h1 {id : current-cell } and writting = currentCell.id
    document.getElementById("current-cell").innerText = currentCell.id;
}





// -------------- button below navbar : U I B ---------------------------------

    const boldButton = document.getElementById("bold-btn");
    const italicsButton = document.getElementById("italics-btn");
    const underlineButton = document.getElementById("underline-btn");


    // for bold button
    boldButton.addEventListener("click", ()=>{
        if(currentCell.style.fontWeight === "bold"){
                currentCell.style.fontWeight ="normal";
        }
        else{
            currentCell.style.fontWeight="bold";
        }

        updateMatrix(currentCell);                                                                                          // storing the style
        console.log(matrix);
    });



    // for italics button
    italicsButton.addEventListener("click", ()=>{
        if(currentCell.style.fontStyle === "italic"){
            currentCell.style.fontStyle ="normal";
        }
        else{
        currentCell.style.fontStyle="italic";
        }

        updateMatrix(currentCell);    
    });
    


    // for underline button
    underlineButton.addEventListener("click", ()=>{
        if(currentCell.style.textDecoration=== "underline"){
            currentCell.style.textDecoration ="none";
        }
        else{
        currentCell.style.textDecoration="underline";
        }

        updateMatrix(currentCell);    
    });
    


  //---------------- left , center , right button --------------
  
    const leftAlign= document.getElementById("left-align");
    const rightAlign= document.getElementById("right-align");
    const centerAlign= document.getElementById("center-align");


    //  leftAlign button
    leftAlign.addEventListener("click", ()=>{
        currentCell.style.textAlign= "left";

        updateMatrix(currentCell);    
    })


    //centertAlign button
    centerAlign.addEventListener("click", ()=>{
        currentCell.style.textAlign = "center";

        updateMatrix(currentCell);    
    })


    //rightAlign button
    rightAlign.addEventListener("click", ()=>{
        currentCell.style.textAlign = "right";

        updateMatrix(currentCell);    
    })


    // ----------------font-size dropdownn button -----------
    const fontSizeDropDown  = document.getElementById("font-size");

    fontSizeDropDown.addEventListener("change", ()=>{
        currentCell.style.fontSize = fontSizeDropDown.value;                  //currentCell  chane style === to fontSizeDropDown.value
   
        updateMatrix(currentCell);    
    })



    // ----------------font-family dropdownn button -----------
    const fontFamilyDropDown  = document.getElementById("font-family");

    fontFamilyDropDown.addEventListener("change", ()=>{
        currentCell.style.fontFamily = fontFamilyDropDown.value;                  //currentCell  chane style === to fontSizeDropDown.value
        
        updateMatrix(currentCell);    
    })



    //----------------cut , copy , paste button-----------
    const cutButton = document.getElementById("cut-button");
    const copyButton = document.getElementById("copy-button");
    const pasteButton = document.getElementById("paste-button");
    
    let cutCell = {};                                                                                                  // empty object

    cutButton.addEventListener("click", ()=>{

        // creating the object to store the cssText , innerText
        cutCell ={
            style : currentCell.style.cssText,
            text : currentCell.innerText,
        };

        // for removing the Text , style : the remove cell styling and text
        currentCell.innerText="";
        currentCell.style = null;

        updateMatrix(currentCell);    
    })


    
    copyButton.addEventListener("click", ()=>{
        cutCell ={
            style : currentCell.style.cssText,
            text : currentCell.innerText,
        };
    })

    

    pasteButton.addEventListener("click", ()=>{

        if(cutCell.text ||  cutCell.style){
            currentCell.style = cutCell.style;                      // putting object as styling : refereing the cutButton function 
            currentCell.innerText = cutCell.text;                  // object_name.key === value
            
            updateMatrix(currentCell);    
        } 
    })






    // ---------------cell colour --------------
    const bgColorInput = document.getElementById("bgColor");

    bgColorInput.addEventListener("input", ()=>{
        currentCell.style.backgroundColor = bgColorInput.value;

        updateMatrix(currentCell);    
    })



    // ---------------Text Color colour --------------
    const textColorInput = document.getElementById("textColor");

    textColorInput.addEventListener("input", ()=>{                                             //  input === change   { but different }
        currentCell.style.color = textColorInput.value;

        updateMatrix(currentCell);    
    })




    // ------------------download button------------------
    function downloadJson(){
        // console.log("testing");                                                       button working
        
        //1-Converting matrix to string
        const matrixString = JSON.stringify(matrix);

        //2-Converting  text form of matrix to download form  { blob : gives memory }
        const blob = new Blob([matrixString], {type: "application/json"})
        //                     string      ,  memory type


        //3-Creating a link to download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);                                                                             // create blob as link

        
        //4- download    name.json
        link.download = "Sheet.json";
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);

    }
    


    //-------------------- upload jsonFile ------------------
    const uploadJsonFile = document.getElementById("jsonFile");

    uploadJsonFile.addEventListener("change", readJSONfileFn);

    function readJSONfileFn(event){                                                                                 // upload the file
        const file = event.target.files[0];                                                                         // array files = [file];
    
        if(file){
           const reader = new FileReader();
            reader.onload = function(e){
                const fileContent = e.target.result;
                
                try{
                    const fileContentJSON = JSON.parse(fileContent);

                    matrix = fileContentJSON;

                    fileContentJSON.forEach((row)=>{
                        row.forEach((cell)=>{                                                                                 // cell : object of currentCell
                            if(cell.id){
                                var currentCell = document.getElementById(cell.id);
                                currentCell.innerText = cell.text;
                                currentCell.style.cssText = cell.style;
                            }
                        })
                    })
                }

                catch(err){
                    console.log("Error in json file", err);
                }
            };

            reader.readAsText(file);
        }
    }