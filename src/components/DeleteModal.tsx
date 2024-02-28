import { Employee } from '../interfaces';
import apis from '../apis';
import { notification } from 'antd';

type Props = {
  id: string;
  closeModal: () => void;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};

export default function DeleteModal(props: Props) {
  const confirmClick = () => {
    apis.employeesApi.deleteEmployee(props.id).then(() => {
      notification.success({
        message: 'Xóa thành công',
        placement: 'bottomRight',
      });
      props.setEmployees((prev) => prev.filter((e) => e.id !== props.id));
      props.closeModal();
    });
  };
  return (
    <div className="overlay">
      <div className="modal-custom">
        <div className="modal-title">
          <h4>Cảnh báo</h4>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="modal-body-custom">
          <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-light" onClick={() => props.closeModal()}>
            Hủy
          </button>
          <button className="btn btn-danger" onClick={confirmClick}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
