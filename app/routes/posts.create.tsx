import {useEffect} from "react";
import {Form, Link, redirect} from "@remix-run/react";
import {ActionFunctionArgs} from "@remix-run/node";
import {z} from "zod";
import {zx} from "zodix";
import {prisma} from "~/db.server";

export default function Create() {
    return <div id="default-modal" tabIndex="-1" aria-hidden="true"
                className="bg-black bg-opacity-60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] h-full">
        <div className="relative p-4 w-full m-auto  mt-[7%] max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <Form method={'post'}>
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-gray-900 ">
                        Create post
                    </h3>
                    <Link to={'/posts'}>
                        <button type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-11 h-11 ms-auto inline-flex justify-center items-center"
                                data-modal-hide="default-modal">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </Link>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                    <div>
                        <label htmlFor="title"
                               className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                        <input type="text" name={'title'}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                               placeholder="Enter a title here" required/>
                    </div>
                </div>
               <div className={'flex justify-between items-center'}>
                   <div>

                   </div>
                   <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                       <button data-modal-hide="default-modal" type="submit"
                               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit
                       </button>
                       <Link to={'/posts'}>
                           <button data-modal-hide="default-modal" type="button"
                                   className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Cancel
                           </button>
                       </Link>
                   </div>
               </div>
                </Form>
            </div>
        </div>
    </div>
}

function slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
}

export async function action({request}: ActionFunctionArgs) {
    const { title } = await zx.parseForm(request, {
        title: z.string(),
    });

    const slug = slugify(title);

    await prisma.post.create({
        data: {
            title,
            name: slug
        }
    })


    return redirect("/posts?created=true")
}