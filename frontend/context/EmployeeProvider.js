import { createContext, useState } from "react";

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <EmployeeContext.Provider
      value={{ employees, loading, setEmployees, setLoading }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeProvider };
export default EmployeeContext;
