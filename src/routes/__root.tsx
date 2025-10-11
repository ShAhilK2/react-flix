import {
  Link,
  Outlet,
  createRootRoute,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import Header from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-black text-foreground transition-colors duration-300">
      <Header />
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className=" text-white pt-20">
      Something went wrong + {error.message}
    </div>
  ),
  notFoundComponent: () => {
    const navigate = useNavigate();
    return (
      <>
        <div className=" text-white pt-12 text-center">
          404 Not Found Page{" "}
          <button
            className="!text-red-600 cursor-pointer"
            onClick={() => navigate({ to: "/" })}
          >
            Go Back To Home
          </button>
        </div>
      </>
    );
  },
});
