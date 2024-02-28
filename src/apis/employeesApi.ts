import axios from 'axios';

const BASE_URL = 'http://localhost:3001/employees';

import { Employee } from '../interfaces';

const getEmployees = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const addEmployee = async (employee: Employee) => {
  const response = await axios.post(BASE_URL, employee);
  return response.data;
};

const deleteEmployee = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

const updateEmployee = async (employee: Employee) => {
  const response = await axios.put(`${BASE_URL}/${employee.id}`, employee);
  return response.data;
};

const toggleBlockEmployee = async (id: string, isActive: boolean) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, {
    isActive: !isActive,
  });
  return response.data;
};

export default {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  toggleBlockEmployee,
};
