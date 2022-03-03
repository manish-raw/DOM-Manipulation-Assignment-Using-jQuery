// Creating the start app button
var LStartApplication = $('<button id="tsidStartApp">Start Application</button>');

//Run after document is ready
$(document).ready(function () {
    $('body').append(LStartApplication);//add Application button into the html body

});

// start application button adding the created tags into the body of html
$(LStartApplication).one("click", function () {

    $('<br>').appendTo('body');

    LRadioBtn1.appendTo('body');
    LLabelforRadioBtn1.appendTo('body');
    LRadioBtn2.appendTo('body');
    LLabelforRadioBtn2.appendTo('body');


    $('<br>').appendTo('body');

    LinputBtn1.appendTo('body');
    LinputBtn2.appendTo('body');
    LAddUserBTn.appendTo('body');

    $('<br>').appendTo('body');

    LContainerLeftDiv.appendTo(LMainContainer);
    LContainerRightDiv.appendTo(LMainContainer);
    LContainerRightDiv.append(LTextArea);
    $('body').append(LMainContainer);


    $('<br>').appendTo('body');

    $('body').append(LLoadJSONBtn);
    $('body').append(LGenerateJSONBtn);

});


//creating radio button
var LRadioBtn1 = $('<input type="radio" name="RadioBtn" id="tsidRadioBtn1" value="1" />');
var LLabelforRadioBtn1 = $('<label for="tsidRadioBtn1">Using Div</label>');//Label for radio button 1

$(LRadioBtn1).click(function () {
    var isChecked = $('#tsidRadioBtn1').prop('checked'); //this will confirm wheather this radio button is checked or not
    if (isChecked) {
        $('#tsidContainerLeftDiv').empty();
        createTableUsingDiv();  //this function will create the table structure using div tags 
        Lusingdiv = 1;
        Lusingtable = 0;
    }


});


//creating radio button 2
var LRadioBtn2 = $('<input type="radio" name="RadioBtn" id="tsidRadioBtn2" value="2" />');
var LLabelforRadioBtn2 = $('<label for="tsidRadioBtn2">Using Table</label>');//Label for radio button 2
$(LRadioBtn2).click(function () {
    var isChecked = $('#tsidRadioBtn2').prop('checked');    //this will confirm wheather this radio button is checked or not
    if (isChecked) {
        $('#tsidContainerLeftDiv').empty();
        createTable();  //this function will create the table structure 
        Lusingtable = 1;
        Lusingdiv = 0;

    }
});


//creating input field 1 and 2 for firstName and Last Name 
var LinputBtn1 = $(`<input type="text" name="FirstName" id="tsidInputField1" placeholder="Enter Firstname"  />`);
var LinputBtn2 = $('<input type="text" name="LastName" id="tsidInputField2" placeholder="Enter Lastname" />');
var LAddUserBTn = $('<button id="tsidAddUserBtn">Add User</button>');// Creating Add User Button

//will add user into the table
$(LAddUserBTn).click(function () {


    var name = $("#tsidInputField1").val().trim();  //taking value(FirstName) from input field1
    var lname = $("#tsidInputField2").val().trim();  //taking value(LastName) from input field2
    if ($.isNumeric(name) || $.isNumeric(lname) || name == '' || lname == '') {
        alert("Cannot be empty and must be string");
        return;
    }
    if (Lusingtable == 1) {
        var row = "<tr class='tsclsDataRow'>  <td>" + name + "</td>   <td>" + lname + "</td><td> <button class='tsclsDeleteBtn'>Delete</button> </td> </tr>";
        //the above line is creating new row 
        $('#tsidTbody').append(row);
        $('tr').click(function () {
            // debugger;
            var currentTds = $(this).find("td"); // find all td of selected row
            var cell2 = $(currentTds).eq(0).text(); // eq= cell , text = inner text
            var cell3 = $(currentTds).eq(1).text();
            alert(cell2 +" "+ cell3);
            
        });
        $('.tsclsDeleteBtn').click(function () {
            $(this).parents('tr').remove();
        });
    } else if (Lusingdiv == 1) {
        var row = `<div class="tsclsActualTrOfDiv"><div class="tsclsDataDiv" >${name}</div><div class="tsclsDataDiv">${lname}</div><div class="tsclsDataDiv"><button class="tsclsDeleteBtn">Delete</button></div> </div>`;
        $('#tsidTbodyDiv').append(row);
        $('.tsclsActualTrOfDiv').click(function () {
            // debugger;
            var currentTds = $(this).find(".tsclsDataDiv"); // find all td of selected row
            var cell2 = $(currentTds).eq(0).text(); // eq= cell , text = inner text
            var cell3 = $(currentTds).eq(1).text();
            alert(cell2 +" "+ cell3);
            
        });
        $('.tsclsDeleteBtn').click(function () {
            $(this).parents('.tsclsActualTrOfDiv').remove();
        });

    }

    $('#tsidInputField1').val(''); // empty the input field1 after adding into table
    $('#tsidInputField2').val('');  // empty the input field2 after adding into table

});


//This div contains 2 div's (flex property)
var LMainContainer = $('<div id="tsidMainContainer"></div>');
// This div contains the table stucture (for using table and aslo for using div )
var LContainerLeftDiv = $('<div id="tsidContainerLeftDiv">No Record Found</div>');

//this div contains the textarea 
var LContainerRightDiv = $('<div id="tsidContainerRightDiv"></div>');

//this textarea is in the 2nd div 
var LTextArea = $('<textarea id="tsidTextArea" />');


//load json button for creating table using the generated data
var LLoadJSONBtn = $('<button id="tsidLoadJSONBtn">Load JSON</button>');
//On clicking the load JSON button this function will execute
$(LLoadJSONBtn).click(function () {

    //checking which radio button is selected
    $('#tsidContainerLeftDiv').empty(); //empty the 1st div if it contains table
    var data = JSON.parse($('#tsidTextArea').val());   //changing the json string data into array/js object format
      //selecting the tbody of the table 
    if (Lusingdiv == 1) {
        createTableUsingDiv(); //this function will create the table structure using div tags
        var table = $('#tsidTbodyDiv');
        for (var i = 0; i < data.length; i++) {   //data.length times the loop will iterate
            var row = `<div class="tsclsActualTrOfDiv"> <div class="tsclsDataDiv">${data[i].FirstName}</div> <div class="tsclsDataDiv">${data[i].LastName}</div> <div class="tsclsDataDiv"> <button class='tsclsDeleteBtn'>Delete</button> </div></div>`;
            //the above line is for creating the new row(created row using div tags) and inserting into the table
            table.append(row);//add newly created row into table tbody
        }
        $('.tsclsDeleteBtn').click(function () {  //deleting the row (delete function)
            $(this).parents('.tsclsActualTrOfDiv').remove();     //remove that particular row
        });
    } else if (Lusingtable == 1) {
        createTable();
        var table = $('#tsidTbody');
        
        for (var i = 0; i < data.length; i++) {   //data.length times the loop will iterate
            var row = `<tr class='tsclsDataRow'> <td>${data[i].FirstName}</td> <td>${data[i].LastName}</td> <td> <button class='tsclsDeleteBtn'>Delete</button> </td></tr>`;
            //the above line is for creating the new row(created row using div tags) and inserting into the table
            table.append(row);//add newly created row into table tbody
        }
        $('.tsclsDeleteBtn').click(function () {  //deleting the row (delete function)
            $(this).parents('tr').parent().remove();     //remove that particular row
        });


    }
});




//use to generate the json data from the table 
var LGenerateJSONBtn = $('<button id="tsidGenerateJSONBtn">Generate JSON</button>');

//for converting the table data into json string format
$(LGenerateJSONBtn).click(function () {

    if (Lusingtable == 1) {   //checking which radio button is selected
        var array1 = [];   //created object for storing data 
        $("[id*=tsidmyTable] .tsclsDataRow").each(function () {
            var Lamount1 = $(this).find('td').eq(2).text().trim();
            if (isNaN(Lamount1)) {
                var firstTableData1 = {};
                firstTableData1.FirstName = $(this).find('td').eq(0).text();// eq(0) 0 is the column number
                //will store the firstname of full column

                firstTableData1.LastName = $(this).find('td').eq(1).text(); // eq(1) 1 is the column number
                //will store the Lastname of full column

                array1.push(firstTableData1);

            }
        });

        $('#tsidTextArea').val(''); //empty the textarea 
        $('#tsidTextArea').val($('#tsidTextArea').val() + JSON.stringify(array1));  //adding the table data and the previous data
    }
    else if (Lusingdiv == 1) {
        var array2 = [];
        $("[id*=tsidUsingDiv] .tsclsActualTrOfDiv").each(function () {
            var Lamount = $(this).find('div').eq(2).text().trim();
            if (isNaN(Lamount)) {
                var firstTableData = {};
                firstTableData.FirstName = $(this).find('div').eq(0).text();

                firstTableData.LastName = $(this).find('div').eq(1).text();
                array2.push(firstTableData);
            }
        });

        $('#tsidTextArea').val('');
        $('#tsidTextArea').val($('#tsidTextArea').val() + JSON.stringify(array2));

    }

});




//for checking which radio button is selected
var Lusingdiv = 0;
var Lusingtable = 0;

//this function will create the table structure using div tags
function createTableUsingDiv() {
    var tableDiv = $('<div id="tsidUsingDiv"> <div id="tsidThOfDiv"> <div class="tsclsTrOfDiv"> <div class="tsclsDataDiv">FirstName</div> <div class="tsclsDataDiv">LastName</div> <div class="tsclsDataDiv">Delete</div></div> </div> <div id="tsidTbodyDiv"></div></div>');
    $('#tsidContainerLeftDiv').append(tableDiv);
}


//this function will create the table structure
function createTable() {
    var table = $('<table id="tsidmyTable"> <thead> <tr id="tsidHeaderofTable"> <th>FirstName</th> <th>LastName</th> <th>Delete</th> </tr> </thead> <tbody id="tsidTbody"></tbody></table>');
    $('#tsidContainerLeftDiv').append(table);

}





