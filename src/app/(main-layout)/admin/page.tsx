import CreateUserComponent from "@/components/CreateUserComponent";
import PaginationComponent from "@/components/PaginationComponent";
import StatisticComponent from "@/components/StatisticComponent";
import UsersComponent from "@/components/UserContainer/UsersComponent";
import AdminRequired from "@/hok/AdminRequired";

export default function Main() {
  return (
    <>
      <AdminRequired>
        <StatisticComponent />
        <CreateUserComponent />
        <UsersComponent />
        <PaginationComponent />
      </AdminRequired>
    </>
  );
}
