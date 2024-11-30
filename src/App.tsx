import { useEffect, useRef, useState } from "react";
import Header from "./components/core/header";
import Story from "./components/story";
import UserStoryPreview from "./components/story/userStoryPreview";
import { User } from "./types";

const fetchData = async () => {
  return await fetch("/data/stories.json")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const App = () => {
  const activeStoryIdxRef = useRef(0);
  const [users, setUsers] = useState<User[] | null>(null);
  const [activeUser, setActiveUser] = useState<null | User>(null);

  useEffect(() => {
    fetchData()
      .then((res) => setUsers(res.users))
      .catch((err) => console.log(err));
  }, []);

  const onClose = () => {
    setActiveUser(null);
  };

  const onNext = () => {
    if (users && activeStoryIdxRef.current < users?.length - 1) {
      setActiveUser(users[activeStoryIdxRef.current + 1]);
      activeStoryIdxRef.current = activeStoryIdxRef.current += 1;
    } else {
      onClose();
    }
  };

  const onPrev = () => {
    if (users && activeStoryIdxRef.current >= 1) {
      setActiveUser(users[activeStoryIdxRef.current - 1]);
      activeStoryIdxRef.current = activeStoryIdxRef.current -= 1;
    } else {
      onClose();
    }
  };

  return (
    <div>
      <Header />
      {activeUser && (
        <Story
          activeUser={activeUser}
          onClose={onClose}
          onNext={onNext}
          onPrev={onPrev}
        />
      )}
      {users !== null && (
        <UserStoryPreview
          setActiveStory={(e: User, idx: number) => {
            activeStoryIdxRef.current = idx;
            setActiveUser(e);
          }}
          users={users}
        />
      )}
    </div>
  );
};

export default App;
