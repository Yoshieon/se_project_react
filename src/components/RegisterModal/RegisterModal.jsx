import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const isFormValid =
    values.name.trim() !== "" &&
    values.avatar.trim() !== "" &&
    values.email.trim() !== "" &&
    values.password.trim() !== "";

  const handleSwitchToLogin = () => {
    onSwitchToLogin?.();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isFormValid) return;
    onRegister(values);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Create account"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
      secondaryAction={
        onSwitchToLogin && (
          <button
            type="button"
            className="modal__switch-button"
            onClick={handleSwitchToLogin}>
            or Log in
          </button>
        )
      }>
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="register-name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="register-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="register-password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
