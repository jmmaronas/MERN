import toast from "react-hot-toast"
import { usePosts } from "../context/postContext"
import { useNavigate } from "react-router-dom"


export function PostCard({ post }) {
    const navigate = useNavigate()
    const { deletePost } = usePosts()

    const handleDelete = (_id) => {
        toast((t) => (
            <div>
                <p className="text-white">Do you want delete? <strong>{_id}</strong></p>
                <div>
                    <button className="bg-red-900 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
                        onClick={() => {
                            toast.dismiss(t.id)
                            deletePost(_id)
                        }
                        }
                    >
                        Delete
                    </button>
                    <button className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2 text-sm"
                        onClick={(t) => toast.dismiss(t.id)}>
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            style: {
                background: "#202020"
            }
        })
    }

    return (
        <div className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
            onClick={() => navigate(`/posts/${post._id}`)}
        >
            <div className="px-4 py-7">
                <div className="flex justify-between">
                    <h3>
                        {post.title}
                    </h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(post._id)
                        }
                        }
                        className="bg-red-600 hover:bg-red-500 text-s py-1 px-2 rounded-sm ">
                        Delete
                    </button>
                </div>
                <p>
                    {post.description}
                </p>
            </div>
            {post.image && <img src={post.image.url} className="w-full h-60 object-cover" />}
        </div>
    )
}