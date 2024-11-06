
const UpdateUser = () => {
  return (
    <div className="update-user">
      <h2>Update User Info</h2>
      <form>
        <div>
          <label htmlFor="username">New Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="email">New Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
