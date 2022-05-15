$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 }
 $("#alertError").hide();
});

//SAVE============================================

$(document).on("click", "#btnSave", function(event)
{
// Clear alerts---------------------
 $("#alertSuccess").text("");
 $("#alertSuccess").hide();
 $("#alertError").text("");
 $("#alertError").hide();
// Form validation-------------------
var status = validateUserForm();
if (status != true)
 {
 $("#alertError").text(status);
 $("#alertError").show();
 return;
 }
// If valid------------------------
var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
 $.ajax(
 {
 url : "UserAPI",
 type : type,
 data : $("#formUser").serialize(),
 dataType : "text",
 complete : function(response, status)
 {
 onUserSaveComplete(response.responseText, status);
 }
 });
});

// UPDATE==========================================

$(document).on("click", ".btnUpdate", function(event)
{
$("#hidItemIDSave").val($(this).data("id"));
 $("#name").val($(this).closest("tr").find('td:eq(0)').text());
 $("#contact").val($(this).closest("tr").find('td:eq(1)').text());
 $("#email").val($(this).closest("tr").find('td:eq(2)').text());
 $("#password").val($(this).closest("tr").find('td:eq(3)').text());
});


//REMOVE==============================================

$(document).on("click", ".btnRemove", function(event)
{
 $.ajax(
 {
 url : "UserAPI",
 type : "DELETE",
 data : "id=" + $(this).data("id"),
 dataType : "text",
 complete : function(response, status)
 {
 onUserDeleteComplete(response.responseText, status);
 }
 });
});


// CLIENT-MODEL================================================================
function validateUserForm()
{
// NAME
if ($("#name").val().trim() == "")
 {
 return "Insert name.";
 }
// CONTACT
if ($("#contact").val().trim() == "")
 {
 return "Insert contact.";
 } 
 
// EMAIL-------------------------------
if ($("#email").val().trim() == "")
 {
 return "Insert email.";
 }

// PASSWORD------------------------
if ($("#password").val().trim() == "")
 {
 return "Insert password.";
 }
return true;
}

function onUserSaveComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully saved.");
 $("#alertSuccess").show();
 $("#divItemsGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while saving.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while saving..");
 $("#alertError").show();
 } 
 14
 $("#hidItemIDSave").val("");
 $("#formUser")[0].reset();
}


function onUserDeleteComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully deleted.");
 $("#alertSuccess").show();
 $("#divItemsGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while deleting.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while deleting..");
 $("#alertError").show();
 }
}