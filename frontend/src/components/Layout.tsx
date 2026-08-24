import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <main className="p-6">
      <Outlet />
    </main>
  );
}
