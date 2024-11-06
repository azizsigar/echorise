
const ProfileUser = ({ user }) => {
  return (
    <div className="profile-user">
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default ProfileUser;
