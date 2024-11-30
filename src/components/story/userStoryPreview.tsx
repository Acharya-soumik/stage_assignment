import { User } from "../../types";

interface Props {
  users: User[];
  setActiveStory: (user: User, index: number) => void;
}

const UserStoryPreview = ({ users, setActiveStory }: Props) => {
  return (
    <div
      data-testid="story-list"
      className="flex gap-4 overflow-x-auto px-4 py-4 scrollbar-hide"
    >
      {users.map((user, idx) => (
        <div
          data-testid="story-item"
          key={user.userId}
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => setActiveStory(user, idx)}
        >
          <div className="w-16 h-16 rounded-full ring-2 ring-fuchsia-400 p-1">
            <img
              className="w-full h-full rounded-full object-cover"
              src={user.previewUrl}
              alt={user.username}
            />
          </div>
          <p className="text-xs text-gray-600">{user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default UserStoryPreview;
