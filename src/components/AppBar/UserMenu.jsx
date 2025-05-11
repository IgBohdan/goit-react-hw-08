import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className="flex items-center gap-4">
      <span className="text-lg">Welcome, {user.name}</span>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </div>
  );
};

export default UserMenu;
