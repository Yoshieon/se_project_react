import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSwitchToRegister = () => {
    onSwitchToRegister();
  };

  const isFormValid =
    values.email.trim() !== "" && values.password.trim() !== "";

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isFormValid) return;
    onLogin(values);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
      secondaryAction={
        onSwitchToRegister && (
          <button
            type="button"
            className="modal__switch-button"
            onClick={handleSwitchToRegister}>
            or Register
          </button>
        )
      }>
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="login-email"
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
          id="login-password"
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

export default LoginModal;
