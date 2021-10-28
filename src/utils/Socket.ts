const users: any[] = [];

const addUser = ({ socket_id, user_id, room_id }: any) => {
  const exist = users.find(
    (user) => user.socket_id === socket_id && user.user_id === user_id
  );
  if (exist) {
    return { error: 'User already exists in this room' };
  }

  const user = { socket_id, user_id, room_id };
  users.push(user);

  return { user: user };
};

const removeUser = (socket_id: any) => {
  const index = users.findIndex((user) => user.socket_id === socket_id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (socket_id: any) => {
  const user = users.find((user) => user.socket_id === socket_id);

  return user;
};

module.exports = { addUser, removeUser, getUser };
