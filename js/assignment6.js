function MenuChoice(){
    if (document.getElementById("menu").value == "Customer List")
    {
        document.getElementById("sec1").style.visibility = "visible";
        document.getElementById("sec2").style.visibility = "hidden";
        document.getElementById("sec3").style.visibility = "hidden";
    }
   else if (document.getElementById("menu").value =="Customers Order History")
   {
    document.getElementById("sec2").style.visibility = "visible";
    document.getElementById("sec1").style.visibility = "hidden";
    document.getElementById("sec3").style.visibility = "hidden";
   }
   
    else if (document.getElementById("menu").value =="List of Orders Placed by Customer")
    {
    document.getElementById("sec3").style.visibility = "visible";
    document.getElementById("sec1").style.visibility = "hidden";
    document.getElementById("sec2").style.visibility = "hidden";
   }

   else
   {
    document.getElementById("sec1").style.visibility = "hidden";
    document.getElementById("sec2").style.visibility = "hidden";
    document.getElementById("sec3").style.visibility = "hidden";
   }
}

//Section 1 start
function CreateCustomer()
{

var objRequest = new XMLHttpRequest();
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";


//Collect Customer data from web page

var customerid = document.getElementById("custid").value;
var customername = document.getElementById("custname").value;
var customercity = document.getElementById("custcity").value;

//Create the parameter string

var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername +'","City":"' + customercity +'"}';
//Checking for AJAx operation return
objRequest.onreadystatechange = function()
{
    if (objRequest.readyState == 4 && objRequest.status == 200)
    {
        var result = JSON.parse(objRequest.responseText);
    
        OperationResult(result);
    }
}

//Start AJAX request

objRequest.open("POST", url, true);
objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); objRequest.send(newcustomer);

}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
      document.getElementById("result").innerHTML = "The operation was successful!"
    }
else
    {
      document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

//Section 2 start
function UpdateAddress()
{
    var oRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    var custid = Number(document.getElementById("orderid").value);
    var custname = document.getElementById("shippingname").value;
    var address = document.getElementById("shipaddress").value;
    var city = document.getElementById("city").value;
    var Zzip = document.getElementById("zip").value;
    
    var newaddress = '{"OrderID":' + custid +',"ShipName":"' + custname +'", "ShipAddress":"' + address +'",  "ShipCity":"' + city +'", "ShipPostcode":"' + Zzip +'"}';
    
    oRequest.onreadystatechange = function()
{
    if (oRequest.readyState == 4 && oRequest.status == 200)
    {
        var result = JSON.parse(oRequest.responseText);
    
        OResult(result);
    }
}
oRequest.open("POST", url, true);
oRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); oRequest.send(newaddress);
}

    function OResult(result)
    {
       if (result == 1)
        {
          document.getElementById("address").innerHTML = "The operation was successful!"
        }
        else if(result == 0)

        {
          document.getElementById("address").innerHTML = "Operation failed with an unspecified error!"
        }
        else if (result == 2)
        {
            document.getElementById("address").innerHTML = "Operation failed because the data string supplied could not be deserialized into the service object"
        }
        else
        {
            document.getElementById("address").innerHTML = "Operation failed because a record with the supplied Order ID could not be found"
        }
       
    }
    
    //Section 3 start
    function Delete()
    {
        var Request = new XMLHttpRequest();
        var url ="http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
         url += document.getElementById("cusid").value;
        
        Request.onreadystatechange = function()
    {
        if (Request.readyState == 4 && Request.status == 200)
        {
            var output = JSON.parse(Request.responseText);
            Result(output);
        }
    }
    //Initiate the server request
    
    Request.open("GET", url, true);
    Request.send();
    }
    function Result(output) {
     if (output.DeleteCustomerResult.WasSuccessful==1)
     {
        document.getElementById("display").innerHTML ="Operation completed successfully"
     }
     else{
        document.getElementById("display").innerHTML = "Operation failed Ð Error Message included" + "<br>" + output.Exception;
     }
}