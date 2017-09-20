$(document).ready(function () {

    setup_draggable();

    /*
    Used for spliting form into 2 colums
    */
    // $("#n-columns").on("change", function () {
    //     var v = $(this).val();
    //     if (v === "1") {
    //         var $col = $('.form-body .col-md-12').toggle(true);
    //         $('.form-body .col-md-6 .draggable').each(function (i, el) {
    //             $(this).remove().appendTo($col);
    //         })
    //         $('.form-body .col-md-6').toggle(false);
    //     } else {
    //         var $col = $('.form-body .col-md-6').toggle(true);
    //         $(".form-body .col-md-12 .draggable").each(function (i, el) {
    //             $(this).remove().appendTo(i % 2 ? $col[1] : $col[0]);
    //         });
    //         $('.form-body .col-md-12').toggle(false);
    //     }
    // });

    $("#copy-to-clipboard").on("click", function () {

        var $copy = $(".form-body").parent().clone().appendTo(document.body);
        $copy.find(".tools, :hidden").remove();
        $.each(["draggable", "droppable", "sortable", "dropped",
            "ui-sortable", "ui-draggable", "ui-droppable", "form-body"
        ], function (i, c) {
            $copy.find("." + c).removeClass(c);
        });
        var html = html_beautify($copy.html());
        $copy.remove();

        $modal = get_modal(html).modal("show");
        $modal.find(".btn").remove();
        $modal.find(".modal-title").html("Copy HTML");
        $modal.find(":input:first").select().focus();
        return false;
    });


});

var setup_draggable = function () {
    $(".draggable").draggable({
        appendTo: "body",
        helper: "clone"
    });
    $(".droppable").droppable({
        accept: ".draggable",
        helper: "clone",
        hoverClass: "droppable-active",
        drop: function (event, ui) {

            // console.log(ui.helper.position());
            $(".empty-form").remove();
            var $orig = $(ui.draggable);
            var controlId = uuidv4();
            if (!$(ui.draggable).hasClass("dropped")) {
                var $el = $orig
                    .clone()
                    .addClass("dropped")
                    .attr('id', controlId)
                    .css({
                        "position": "static",
                        "left": null,
                        "right": null
                    })
                    .appendTo(this);

                // update id
                var id = $orig.find(":input").attr("id");

                if (id) {
                    id = id.split("-").slice(0, -1).join("-") + "-" +
                        (parseInt(id.split("-").slice(-1)[0]) + 1);

                    $orig.find(":input").attr("id", id);
                    $orig.find("label").attr("for", id);
                }

                // tools
                $('<p class="tools">\
                    <a class="edit-link" onclick="showProperties(this);" data-id=' + controlId + '>Edit<a> | \
                    <a class="remove-link" onclick="" data-id=' + controlId + '>Remove</a></p>').appendTo($el);
            } else {
                if ($(this)[0] != $orig.parent()[0]) {
                    var $el = $orig
                        .clone()
                        .css({
                            "position": "static",
                            "left": null,
                            "right": null
                        })
                        .appendTo(this);
                    $orig.remove();
                }
            }
        }
    }).sortable({
        stop: function (event, ui) {

            //  console.log($('.sortable').sortable('toArray'));
            //console.log("New position: " + ui.item.index());
        },
        update: function () {
            var a = [];
            var controlData = {};
            $('.sortable').children().each(function (i) {
                controlData = {
                    controlId: $(this).attr('id'),
                    controlType: $(this).attr('data-type'),
                    controlPosition: i
                };
                a.push(controlData);
                //  a.push($(this).attr('id') + ':' + i);
            });
            var s = a.join(',');
            console.log(s);
        }

    });

};

var get_modal = function (content) {
    var modal = $('<div class="modal" style="overflow: auto;" tabindex="-1">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <a type="button" class="close"\
                        data-dismiss="modal" aria-hidden="true">&times;</a>\
                    <h4 class="modal-title">Edit HTML</h4>\
                </div>\
                <div class="modal-body ui-front">\
                    <textarea class="form-control" \
                        style="min-height: 200px; margin-bottom: 10px;\
                        font-family: Monaco, Fixed">' + content + '</textarea>\
                    <button class="btn btn-success">Update</button>\
                </div>\
            </div>\
        </div>\
        </div>').appendTo(document.body);
    return modal;
};

/* $(document).on("click", ".edit-link", function (ev) {
$(".edit-link").on('click',function(){    
alert(this);
var $el = $(this).parent().parent();
var $el_copy = $el.clone();

var $edit_btn = $el_copy.find(".edit-link").parent().remove();

//var $modal = get_modal(html_beautify($el_copy.html())).modal("show");

var $modal = get_modal(html_beautify(getHtmlForTable())).modal("show");

$modal.find(":input:first").focus();

$modal.find(".btn-success").click(function (ev2) {
    var html = $modal.find("textarea").val();
    if (!html) {
        $el.remove();
    } else {
        $el.html(html);
        $edit_btn.appendTo($el);
    }
    $modal.modal("hide");
    return false;
})
}); */

/* Used For removing Control*/
$(document).on("click", ".remove-link", function (ev) {
    $(this).parent().parent().remove();
});

/////////////////////////////////////////////////////////////////////////////////////////////
/* My code */
function getHtmlForTable() {
    var html =
        '<div>\
	<label for="Enter No of Coumns"></label>\
	<input type="text">\
	<label for="Enter No of Rows"></label>\
	<input type="text">\
       </div>';
    return html;
}

/*Generating Unique Ids for Control*/
function uuidv4() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function getfromControlData() {
    var controlDataArr = [];
    var controlDataObj = {};
    $('.sortable').children().each(function (i) {
        controlDataObj = {
            controlId: $(this).attr('id'),
            controlType: $(this).attr('data-type'),
            controlPosition: i
        };
        controlDataArr.push(controlDataObj);
    });
    return controlDataArr;
}

function showProperties(controlId) {

    var selectedControlId = $(controlId).attr('data-id');
    var controlsData = getfromControlData();
    //Used for selecting specific control
    var selControl = _.find(controlsData, {
        'controlId': selectedControlId
    });
    $('#hdnSelectedControlType').val(selControl.controlType);
    $('#hdnSelectedControlId').val(selControl.controlId);
    var setData = getControlProperties(selControl.controlType);
    $('#Properties').html(setData);

}

function getControlProperties(type) {
    var html = "";
    switch (type) {
        case "TextBox":
            html = getTextBox();
            break;
        case "DropDown":
            html = getDropdown();
            break;
        case "Calender":
            html = "This is Calender";
            break;
        case "Table":
            html = "This is Table";
            break;
        case "Radio":
            html = "This is Radio";
            break;
        case "Label":
            html = "This is Label";
            break;
        default:
            html = "No Control Selected";
            break;
    }
    return html;
}

var controlsHtml = {
    textbox: getTextBox
};

//$("#textboxPropertiesTemplate").tmpl(data).appendTo("#divTemplateContainer");
function getTextBox() {
    var html = $("#textboxPropertiesTemplate").tmpl().html();
    return html;
}

function getDropdown(){
    debugger;
    var html = $("#dropdownPropertiesTemplate").tmpl().html();
    return html;
}

var savedControlJson = [
    //TextBox
    {
        controlType: "TextBox",
        controlProperties: {
             controlId: 890,
            label: "Employee Name",
            placehoder: "Enter Emplyee Name"
        }
    },
    //DropDown
    {
        controlType: "DropDown",
        controlProperties: {
            controlId: 789,
            label: "select department",
            options: [{
                    Key: "0",
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
    },
    //Radio button
    {
        controlType: "Radio",
        controlProperties: {
            controlId: 790,
            label: "select department",
            options: [{
                    Key: "0",
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
    },
    //label
    {
        controlType: "Label",
        controlProperties: {
            controlId: 791,
            label: "Department",
            value: "HR Department"
        }
    },
    //Calender
    {
      
        controlType: "Calender",
        controlProperties: {
            controlId: 792,
            label: "Select Date",
            format: "dd-mm-yy",
        }
    },
    //Table
    {
        controlType: "Table",
        controlProperties: {
            controlId: 793,
            label: "Data Table",
            options: [{
                    columnHeader: "Employee Name",
                    columnControl: "Textbox"
                },
                {
                    columnHeader: "Employee Department",
                    columnControl: "Dropdown"
                },
                {
                    columnHeader: "Employee DOJ",
                    columnControl: "Calender"
                },
                {
                    columnHeader: "Employee Marital Status",
                    columnControl: "Radio"
                }

            ]
        }
    }
];
$(document).ready(function () {
    $('#btnSaveProperties').on('click', function () {

        var selectedControlType = $('#hdnSelectedControlType').val();
        var selectedControlId = $('#hdnSelectedControlId').val();
        var controlData = {};
        if (selectedControlType === "TextBox") {
            controlData = {
                controlId: selectedControlId,
                controlData: {
                    control: selectedControlType,
                    value: $('#txtLabelText').val()
                }
            };
            savedControlJson.push(controlData);
        }
        localStorage.setItem("FromData", JSON.stringify(savedControlJson));
    });
});

function showAutoFillContainer(element) {
    var seletedDataType=$("showAutoFillContainer").val();
    var divAutofillSection= $("#divAutofillSection");
    if(seletedDataType!=="Select"){
        divAutofillSection.show();
    }else{
        divAutofillSection.hide();
        
    }
    
}