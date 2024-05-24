import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useSearchParams,
} from "@remix-run/react";
import './style.css'
import './tailwind.css'
import {useEffect} from "react";

export function Layout({ children }: { children: React.ReactNode }) {
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (searchParams.get('created')) {
            alert("Post created")
            const params = new URLSearchParams();
            params.delete("created");
            setSearchParams(params, {
                preventScrollReset: true,
            });
        }
    }, [searchParams])
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
