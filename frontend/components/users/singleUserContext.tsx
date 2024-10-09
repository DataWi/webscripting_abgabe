import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./usersList";
import Users from "../../assets/users.json";
import { useRouter, usePathname } from "next/navigation";

interface UserContextType {
  user: User | null;
  findUser: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  findUser: () => {},
  isLoading: false,
});

const fallBackUser = Users[0];

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname()!;

  const findUser = () => {
    if (!pathname) return;
    const id = pathname.split("/")[2];

    if (pathname.split("/")[1] !== "users") {
      router.push("/404");
    }

    setIsLoading(true);
    const result = Users.find((user) => user.id === Number(id));

    if (!result) {
      setUser(null);
      setIsLoading(false);
      console.log("User not found");
      router.push("/404");
      return;
    }

    setUser(result);
    setIsLoading(false);
  };

  useEffect(() => findUser(), [pathname]);

  return (
    <UserContext.Provider value={{ user, findUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserContextProvider, useUser };
