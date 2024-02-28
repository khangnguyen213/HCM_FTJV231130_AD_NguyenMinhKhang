import { SubmitHandler, useForm } from 'react-hook-form';
import { IoCloseSharp } from 'react-icons/io5';
import apis from '../apis';
import { Employee } from '../interfaces';
import { notification } from 'antd';

type Props = {
  employee: Employee;
  closeModal: () => void;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};

type FormValues = {
  name: string;
  dob: string;
  email: string;
  address: string;
};

export default function EditModal(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: props.employee.name,
      dob: props.employee.dob,
      email: props.employee.email,
      address: props.employee.address,
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const employee = {
      ...data,
      isActive: props.employee.isActive,
      id: props.employee.id,
    };
    apis.employeesApi.updateEmployee(employee).then(() => {
      notification.success({
        message: 'Cập nhật thành công',
        placement: 'bottomRight',
      });
      props.setEmployees((prev) =>
        prev.map((e) => (e.id === employee.id ? employee : e))
      );
      props.closeModal();
    });
  };

  return (
    <div className="overlay">
      <form
        className="form position-relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <IoCloseSharp
          className="position-absolute"
          style={{
            top: '20px',
            right: '30px',
            cursor: 'pointer',
            fontSize: '20px',
          }}
          onClick={props.closeModal}
        />

        <div className="d-flex justify-content-between align-items-center">
          <h4>Chỉnh sửa nhân viên</h4>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div>
          <label className="form-label" htmlFor="userName">
            Họ và tên
          </label>
          <input
            id="userName"
            type="text"
            className="form-control"
            {...register('name', { required: true })}
          />
          {errors?.name?.type === 'required' && (
            <div className="form-text error">
              Họ và tên không được để trống.
            </div>
          )}
        </div>
        <div>
          <label className="form-label" htmlFor="dateOfBirth">
            Ngày sinh
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className="form-control"
            {...register('dob', {
              max: new Date().toISOString().split('T')[0],
              required: true,
            })}
          />
        </div>
        {errors?.dob?.type === 'max' && (
          <div className="form-text error">
            Ngày sinh không được lớn hơn ngày hiện tại.
          </div>
        )}
        {errors?.dob?.type === 'required' && (
          <div className="form-text error">Ngày sinh không được để trống.</div>
        )}
        <div>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            {...register('email', { required: true })}
          />
        </div>
        {errors?.email?.type === 'required' && (
          <div className="form-text error">Email không được để trống.</div>
        )}
        <div>
          <label className="form-label" htmlFor="address">
            Địa chỉ
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            {...register('address', { required: true })}
          />
          {errors?.address?.type === 'required' && (
            <div className="form-text error">Địa chỉ không được để trống.</div>
          )}
        </div>
        <div>
          <button className="w-100 btn btn-primary" type="submit">
            Chỉnh sửa
          </button>
        </div>
      </form>
    </div>
  );
}
