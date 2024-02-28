import { Employee } from '../interfaces';

interface TableRowProps {
  employee: Employee;
  openEditModal: (employee: Employee) => void;
  openDeleteModal: (id: string) => void;
  openBlockModal: (id: string, isActive: boolean) => void;
  index: number;
}

export default function TableRow(props: TableRowProps) {
  const { employee } = props;
  return (
    <tr>
      <td>{props.index}</td>
      <td>{employee.name}</td>
      <td>{employee.dob}</td>
      <td>{employee.email}</td>
      <td>{employee.address}i</td>
      <td>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            className={`status ${
              employee.isActive ? 'status-active' : 'status-stop'
            }`}
          ></div>
          <span>
            {employee.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
          </span>
        </div>
      </td>
      <td>
        <span
          className="button button-block"
          onClick={() => {
            props.openBlockModal(employee.id, employee.isActive);
          }}
        >
          {employee.isActive ? 'Chặn' : 'Bỏ chặn'}
        </span>
      </td>
      <td>
        <span
          className="button button-edit"
          onClick={() => props.openEditModal(employee)}
        >
          Sửa
        </span>
      </td>
      <td>
        <span
          className="button button-delete"
          onClick={() => {
            props.openDeleteModal(employee.id);
          }}
        >
          Xóa
        </span>
      </td>
    </tr>
  );
}
