
const GetUserById = ({ userId }) => {
  return (
    <div className="get-user-by-id">
      <h2>User Details</h2>
      <p>User ID: {userId}</p>
      {/* User data would be fetched and displayed here */}
    </div>
  );
};

export default GetUserById;
