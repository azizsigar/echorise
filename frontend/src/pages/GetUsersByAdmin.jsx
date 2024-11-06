
const GetUsersByAdmin = ({ users }) => {
  return (
    <div className="get-users-by-admin">
      <h2>All Users</h2>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.email}
            </li>
          ))
        ) : (
          <p>No users available</p>
        )}
      </ul>
    </div>
  );
};

export default GetUsersByAdmin;
