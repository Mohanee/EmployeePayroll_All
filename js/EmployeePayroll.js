
//setting event listening to display the salary on draging of salary range bar
//and validating the given name
window.addEventListener('DOMContentLoaded',(event)=>{

    const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input',function(){
        output.textContent=salary.value;
    });

    const name = document.querySelector('#name');
    const nameError = document.querySelector('#name-error');
    name.addEventListener('input', function () {
        let namRegex = new RegExp(/^[A-Z][a-z]{2,}$/);
        if (namRegex.test(name.value))
            nameError.textContent = "";
        else
            nameError.textContent = "Name is Incorrect";
    });
});

function save(){
    try{    
        updateLocalStorage(createEmployeePayroll());
    }
    catch(e)
    {
        alert(e);
        return;
    }
}

//function to create an employee payroll object
// and store it into an employeePayroll array of objects
let empPayroll = [];
function createEmployeePayroll()
{
    let employeepayrollData = new PayrollModel();
    employeepayrollData.name = getInputValueById('#name');
    employeepayrollData.profile = getSelectedValues('[name = profile]').pop();
    employeepayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeepayrollData.department = getSelectedValues('[name=department]');
    employeepayrollData.salary = getInputValueById('#salary');
    employeepayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#year') + "-"+ getInputValueById('#month') + "/" + getInputValueById('#day');
    employeepayrollData.startDate = new Date(date);
    empPayroll.push(employeepayrollData)
    alert("Your entry is successfully added");
    alert(empPayroll);
    return employeepayrollData;
}

//Function to store every employee payroll object in a list
//which will be stored into local storage of browser
function updateLocalStorage(employeepayrollData)
{
    //let empList = JSON.parse(localStorage.getItem("empList"));
    let employeePayrollList = JSON.parse(localStorage.getItem("employeePayrollList"));
    if(employeePayrollList!=undefined)
    {
        employeePayrollList.push(employeepayrollData);
    }
    else{
        employeePayrollList=[employeepayrollData];
    }
    //alert(empList.toString());
    localStorage.setItem("employeePayrollList", JSON.stringify(employeePayrollList));
}

function getSelectedValues(attribute)
{
    let allItems = document.querySelectorAll(attribute);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked){
            selItems.push(item.value);
        }
    });
    return selItems;
}
function getInputValueById(id){
    let value = document.querySelector(id).value;
    return value;
}
function getElementValueById(id){
    let value = document.getElementById(id).value
    return value;
} 

function resetForm(){
    setValue('#name','');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
    unsetSelectedValues('[name=profle]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
}

function setValue(id,value){
    document.querySelector(id).value = value;
}
function unsetSelectedValues(propertyValue){
    document.querySelectorAll(propertyValue).forEach(item => item.checked=false);
} 