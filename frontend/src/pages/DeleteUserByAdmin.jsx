
const DeleteUserByAdmin = ({ userId, onDelete }) => {
  return (
    <div className="delete-user-by-admin">
      <h2>Delete User by Admin</h2>
      <p>Are you sure you want to delete the user with ID {userId}?</p>
      <button onClick={() => onDelete(userId)}>Yes, Delete</button>
      <button>No, Cancel</button>
    </div>
  );
};

export default DeleteUserByAdmin;
