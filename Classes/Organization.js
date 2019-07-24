class Organization {
    constructor(name, budget) {
        this.name = name;
        this.budget = Number(budget);
        this.employees = [];
        this.departments = {
            marketing: this.budget * 0.4,
            finance: this.budget * 0.25,
            production: this.budget * 0.35
        }
    }

    get departmentsBudget() {
        return {
            marketing: this.departments["marketing"],
            finance: this.departments["finance"],
            production: this.departments["production"]
        };
    }

    add(employeeName, department, salary) {
        if (this.departments[department] >= salary) {
            const newEmployee = {
                employeeName,
                department,
                salary
            };

            this.employees.push(newEmployee);

            this.departments[department] -= salary;

            return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`;
        }

        return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is $${this.departments[department]}.`;
    }

    employeeExists(employeeName) {
        const employeeIndex = this.employees.findIndex(e => e.employeeName === employeeName);

        if (employeeIndex >= 0) {
            return `Mr./Mrs. ${employeeName} is part of the ${this.employees[employeeIndex].department} department.`;
        }

        return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
    }

    leaveOrganization(employeeName) {
        const employeeIndex = this.employees.findIndex(e => e.employeeName === employeeName);

        if (employeeIndex < 0) {
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }

        const salary = this.employees[employeeIndex].salary;
        const department = this.employees[employeeIndex].department;
        this.employees.splice(employeeIndex, 1);
        this.departments[department] += salary;

        return `It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}.`;
    }

    status() {
        let status = [];
        status.push(`${this.name.toUpperCase()} DEPARTMENTS:`);

        for (const department in this.departments) {
            let departmentInfo = [];
            const departmentNameUpperCase = department.charAt(0).toUpperCase() + department.slice(1);
            departmentInfo.push(departmentNameUpperCase);

            const departmentEmployees = this.employees
                .filter(e => e.department === department)
                .sort((a, b) => b.salary - a.salary)
                .map(e => e.employeeName);

            departmentInfo.push(`Employees: ${departmentEmployees.length}: ${departmentEmployees.join(', ')}`);
            departmentInfo.push(`Remaining Budget: ${this.departments[department]}`);
            status.push(departmentInfo.join(' | '));
        }

        return status.join('\n');
    }
}