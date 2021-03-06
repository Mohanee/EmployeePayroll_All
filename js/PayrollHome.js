let employeePayrollList;

//event listener to call inner html 
window.addEventListener("DOMContentLoaded", (event) => {
    employeePayrollList= getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent= employeePayrollList.length;
    createInnerHtml();
});

//function to create inner HTML to store tabulated Employee Data
const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    if(employeePayrollList.length == 0) return;    
        let innerHtml = `${headerHtml}`;
            for (const employeePayrollData of employeePayrollList) {
                innerHtml = `${innerHtml}
                <tr>
                    <td><img class="profile" alt="" src="${employeePayrollData._profile}"></td>
                    <td>${employeePayrollData._name}</td>
                    <td>${employeePayrollData._gender}</td>
                    <td>${getDeptHtml(employeePayrollData._department)}</td>
                    <td>${employeePayrollData._salary}</td>
                    <td>${employeePayrollData._startDate}</td>
                    <td>
                        <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                        <img name="${employeePayrollData._id}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
                    </td>
                </tr>
                `;
            }
            document.querySelector('#display').innerHTML = innerHtml
        }

const getEmployeePayrollDataFromStorage = () => {
            return localStorage.getItem('employeePayrollList')?JSON.parse(localStorage.getItem('employeePayrollList')):[];
    }

 const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [{
        _id: new Date().getTime(),
        _name: "Zoya",
        _salary: "$ 100000",
        _gender: "Female",
        _department: ["Engineering"],
        _notes: "Excellent Employee",
        _profile: "../assets/profile-images/Ellipse -4.png",
        _startDate: "18/02/2019, 12:00:00 AM"
    },
    {
        _id: new Date().getTime() + 1,
        _name: "Rishank",
        _salary: "$ 70000",
        _gender: "Male",
        _department: ["Engineering", "Sales"],
        _notes: null,
        _profile: "../assets/profile-images/Ellipse -8.png",
        _startDate: "18/09/2020, 12:00:00 AM"
    }
    ];
    return employeePayrollListLocal;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}
