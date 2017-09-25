$(document).ready(function () {
    //  var fromData=JSON.parse(localStorage.getItem("FromData"));
    var textBox = {
            controlType: "TextBox",
            controlId: 890,
            label: "Employee Name",
            placeholder: "Enter Emplyee Name"
       
    };

    var dropDown={
        controlType: "DropDown",
        controlProperties: {
            controlId: 789,
            label: "Select Department",
            selectedOption:"",
            options: [{
                    key: "0",
                    value: "HR"
                },
                {
                    key: "1",
                    value: "IT"
                },
                {
                    key: "2",
                    value: "Finance"
                }
            ]
        }
    };

    var radio={
        controlType: "Radio",
        controlProperties: {
            controlId: 790,
            label: "Marital Status",
            selectedOption:"",
            options: [{
                    key: "0",
                    value: "Married"
                },
                {
                    key: "1",
                    value: "Not Married"
                },
                {
                    key: "2",
                    value: "Others"
                }
            ]
        }
    };

    var calendar= {
        controlType: "Calender",
        controlProperties: {
            controlId: 792,
            label: "Date Of Joining",
            format: "dd-mm-yy",
        }
    };

    var table={
        controlType:"Table",
        controlProperties:{
            controlId:793,
            label: "Data Table",
            options:[
                {
                    columHeader:"Emplyee Department",
                    columControl:"DropDown"
                },
                {
                    columHeader:"Emplyee Gender",
                    columControl:"Radio"
                },
                {
                    columHeader:"Emplyee Name",
                    columControl:"Textbox"
                },
                {
                    columHeader:"Employee DOB",
                    columControl:"DateTime"
                }
            ]
        }
    }


    $("#textboxTemplate").tmpl(textBox).appendTo("#divFrom");
    $("#dropdownTemplate").tmpl(dropDown.controlProperties).appendTo("#divFrom");
    $("#radioTemplate").tmpl(radio.controlProperties).appendTo("#divFrom");
    $("#datetimepickerTemplate").tmpl(calendar.controlProperties).appendTo("#divFrom");
    setDateTimePicker();

    function setDateTimePicker(id,dateFormat) {
        //alert("in");  $('#datetimepicker5').datetimepicker({
        $("#792").datetimepicker();
         /*    {
            defaultDate: dateFormat,
        }); */
    }

  

});