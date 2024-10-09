import UserDataForm from "@/components/users/userDataForm";
import { usePathname } from "next/navigation";

export default function Account() {
  const pathName = usePathname();
  if (!pathName) return;
  const userId = pathName.split("/")[2];
  return <UserDataForm id={userId} />;
}
