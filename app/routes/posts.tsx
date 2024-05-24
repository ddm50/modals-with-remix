import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {prisma} from "~/db.server";
import {Link, Outlet, useLoaderData} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const {posts} = useLoaderData();

  return (
    <div className={'w-[80%] m-auto p-6'}>
     <nav className={'mb-6'}>
       <h1 className={'text-2xl font-medium'}>Posts</h1>
         <Link to={'/posts/create'}>
             <button className={'bg-blue-600 px-5 py-1.5 text-white text-sm text-center rounded-[8px]'}>Create</button>

         </Link>
     </nav>
      <div >
        <table className={'text-left'}>
          <thead >
          <tr>
            <th scope="col" >
              Post ID
            </th>
            <th scope="col">
              Title
            </th>
            <th scope="col" >
              Name
            </th>
            <th scope="col" >
              Last updated
            </th>
            <th scope="col" >
Actions
            </th>
          </tr>
          </thead>
          <tbody>
          {posts.map(post => <tr >
            <th scope="row" >
              {post.id}
            </th>
            <td>
              {post.title}
            </td>
            <td >
              {post.name}
            </td>
            <td >
              {post.date_updated}
            </td>
            <td className={'text-left'} >
          <Link className={'text-left'} to={`/posts/${post.id}`}>
            Edit
          </Link>
            </td>
          </tr>)}
          </tbody>
        </table>
      </div>
      <Outlet/>
    </div>
  );
}

export async function loader({request}: LoaderFunctionArgs) {
  const posts = await prisma.post.findMany()

  return {posts}
}