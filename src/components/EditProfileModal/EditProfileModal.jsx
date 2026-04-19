import { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../utils/context/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, resetForm } = useForm({
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

  const isFormValid = values.name.trim() !== "" && values.avatar.trim() !== "";

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isFormValid) return;
    onUpdateUser(values);
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, resetForm]);

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText="Save changes"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}>
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="editProfile-name"
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
          id="editProfile-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
