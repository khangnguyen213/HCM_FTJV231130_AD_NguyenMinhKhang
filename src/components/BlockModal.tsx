import { Employee } from '../interfaces';
import apis from '../apis';
import { notification } from 'antd';

type Props = {
  data: { id: string; isActive: boolean };
  closeModal: () => void;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};

export default function BlockModal(props: Props) {
  const confirmClick = () => {
    apis.employeesApi
      .toggleBlockEmployee(props.data.id, props.data.isActive)
      .then(() => {
        notification.success({
          message: 'Cập nhật thành công',
          placement: 'bottomRight',
        });
        props.setEmployees((prev) =>
          prev.map((e) =>
            e.id === props.data.id
              ? { ...e, isActive: !props.data.isActive }
              : e
          )
        );
        props.closeModal();
      })
      .catch((error) => {
        console.log(error);
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
          {props.data.isActive ? (
            <span>Bạn có chắc chắn muốn chặn tài khoản này?</span>
          ) : (
            <span>Bạn có chắc chắn muốn bỏ chặn tài khoản này?</span>
          )}
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-light" onClick={props.closeModal}>
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
