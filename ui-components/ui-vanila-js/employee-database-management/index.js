(async () => {
  const response = await fetch("https://dummyjson.com/users");
  const userResponse = await response.json();
  let employeesData = userResponse?.users?.length
    ? structuredClone(userResponse?.users)
    : [];

  let selectedEmployee = employeesData[0];

  const employeeList = document.querySelector(".employee__name--list");
  employeeList.addEventListener("click", (event) => {
    const empId = parseInt(event.target.id, 10);
    if (event.target.tagName === "DIV") {
      const selectedEmp = employeesData.find((emp) => emp.id === empId);

      if (selectedEmp) {
        renderSingleEmployee(selectedEmp);
      }
    }
    if (event.target.tagName === "BUTTON") {
      const selectedEmpIndex = employeesData.findIndex(
        (emp) => emp.id === empId
      );

      if (selectedEmpIndex >= 0) {
        employeesData = employeesData.toSpliced(selectedEmpIndex, 1);
        selectedEmployee = employeesData.length ? employeesData[0] : undefined;

        renderEmployee(employeesData, selectedEmployee);
      }
    }
  });

  function renderEmployee(employeesData = [], selectedEmployee) {
    const employees = document.querySelector(".employee__name--list");

    if (!employeesData.length) {
      employees.innerHTML = "<p>No Data Found</p>";
      renderSingleEmployee(selectedEmployee);
      return;
    }

    employees.innerHTML = "";

    employeesData.forEach((emp) => {
      const employee = document.createElement("div");

      employee.id = emp.id;
      if (selectedEmployee?.id === emp.id) {
        employee.classList.add("employee__name--list--item");
        employee.classList.add("selected");
        renderSingleEmployee(selectedEmployee);
      } else {
        employee.classList.add("employee__name--list--item");
      }

      employee.innerHTML = `
                  ${emp.firstName} ${emp.lastName}
                  <button type="button" class="employee__name--list--delete-item" id="${emp.id}">
                      X
                  </button>
            `;

      employees.append(employee);
    });
  }
  renderEmployee(employeesData, selectedEmployee);

  function renderSingleEmployee(employee) {
    const singleEmployee = document.querySelector(".employee__single--info");

    if (!employee) {
      singleEmployee.innerHTML = "<p>No Data Found</p>";
      return;
    }

    const employeeImg =
      employee.image ||
      "https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg";
    const fullnameWithAge = `${employee.firstName} ${employee.lastName} (${employee.age})`;
    const id = employee.id;
    const designation = employee.company.title;
    const formattedAddress = `${employee.address.address}, ${employee.address.city}, ${employee.address.state}, ${employee.address.country}, ${employee.address.postalCode}`;

    singleEmployee.innerHTML = `
    <div class="employee__single--info">
          <img
            loading="lazy"
            class="employee__single--info--img"
            src="${employeeImg}"
            alt="employee image"
          />
          <div class="employee__single--info--text">
            <span class="employee__single--info-name">${fullnameWithAge}</span>
            <span class="employee__single--info-id">Employee Id: ${id}</span>
            <span class="employee__single--info-designation"
              >Designation: ${designation}</span
            >
            <span class="employee__single--info-start-date"
              >Address: ${formattedAddress}</span
            >
          </div>
        </div>
   `;
  }
})();
