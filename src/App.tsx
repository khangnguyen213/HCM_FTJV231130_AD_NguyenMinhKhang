import { useEffect, useState } from 'react';
import './global.scss';
import BlockModal from './components/BlockModal';
import DeleteModal from './components/DeleteModal';
import TableRow from './components/TableRow';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import { Employee } from './interfaces';
import apis from './apis';

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filtedEmployees, setFiltedEmployees] = useState<Employee[]>([]);

  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [payload, setPayload] = useState<any>(null);

  const [keyword, setKeyword] = useState('');

  const blockClick = (id: string, isActive: boolean) => {
    setPayload({ id, isActive });
    setIsBlockModalOpen(true);
  };

  const deleteClick = (id: string) => {
    setPayload(id);
    setIsDeleteModalOpen(true);
  };

  const addClick = () => {
    setIsAddModalOpen(true);
  };

  const editClick = (employee: Employee) => {
    setPayload(employee);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsBlockModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setPayload(null);
  };

  useEffect(() => {
    const filtered = employees.filter((employee) =>
      employee.email.includes(keyword)
    );
    setFiltedEmployees(filtered);
  }, [keyword, employees]);

  useEffect(() => {
    apis.employeesApi.getEmployees().then((data) => {
      setEmployees(data);
      setFiltedEmployees(data);
    });
  }, []);
  return (
    <div className="page">
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <button className="btn btn-primary" onClick={addClick}>
              Thêm mới nhân viên
            </button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <input
              style={{ width: '350px' }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <i className="fa-solid fa-arrows-rotate" title="Refresh"></i>
          </div>
          {/* <!-- Danh sách nhân viên --> */}
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan={2}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filtedEmployees.map((employee, index) => (
                <TableRow
                  index={index + 1}
                  key={employee.id}
                  employee={employee}
                  openEditModal={editClick}
                  openBlockModal={blockClick}
                  openDeleteModal={deleteClick}
                />
              ))}
            </tbody>
          </table>
        </main>
      </div>

      {/* <!-- Form thêm mới nhân viên --> */}
      {isAddModalOpen && (
        <AddModal closeModal={closeModal} setEmployees={setEmployees} />
      )}

      {/* <!-- Form chỉnh sửa nhân viên --> */}
      {isEditModalOpen && (
        <EditModal
          closeModal={closeModal}
          employee={payload as Employee}
          setEmployees={setEmployees}
        />
      )}

      {/* <!-- Modal xác nhận chặn tài khoản --> */}
      {isBlockModalOpen && (
        <BlockModal
          closeModal={closeModal}
          data={payload as { id: string; isActive: boolean }}
          setEmployees={setEmployees}
        />
      )}

      {/* <!-- Modal xác nhận xóa tài khoản --> */}
      {isDeleteModalOpen && (
        <DeleteModal
          closeModal={closeModal}
          id={payload as string}
          setEmployees={setEmployees}
        />
      )}
    </div>
  );
}
