import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { usePosts } from "../context/postContext"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa"


export function PostFrom() {
    const { createPost, getPost, updatePost } = usePosts()
    const navigate = useNavigate()
    const params = useParams()
    const [post, setPost] = useState({
        title: "",
        description: "",image: null
    })
    useEffect(() => {
        (async () => {
            if (params.id) {
                const post = await getPost(params.id)
                setPost(post)
            }
        })()
    }, [params.id])

    return (
        <div className="text-white flex items-center justify-center">
            <div className="bg-zinc-800 p-10 shadow-md shadow-black">
                <header className="flex justify-between item-center text-white py-4">
                    <h3>New Post</h3>
                    <Link to="/" className="text-gray-400 hover:text-gray-300 text-sm">Go Back</Link>
                </header>
                <Formik
                    initialValues={post}
                    validationSchema={Yup.object({
                        title: Yup.string().required("Capmpo requerido"),
                        description: Yup.string().required("Capmpo requerido")
                    })}
                    onSubmit={async (values, actions) => {
                        if (params.id) {
                            await updatePost(params.id, values)
                        } else {
                            await createPost(values)
                        }
                        actions.setSubmitting(false)
                        navigate("/")
                    }}
                    enableReinitialize
                >
                    {({ handleSubmit, setFieldValue, isSubmitting }) => (
                        <Form onSubmit={handleSubmit} className="flex flex-col justify-center item-center">
                            <label htmlFor="title" className="text-sm font-bold text-gray-400 block">Title</label>
                            <Field
                                name="title"
                                placeholder="title"
                                className="text-white px-3 py-2 focus:outline-none ronded bg-gray-600 w-full" />
                            <ErrorMessage component="p" name="title" className="text-red-400 text-sm" />
                            <label htmlFor="description" className="text-sm font-bold text-gray-400 block">Descirption</label>
                            <Field
                                component="textarea"
                                name="description"
                                placeholder="descrition"
                                className="text-white px-3 py-2 focus:outline-none ronded bg-gray-600 w-full"
                                row={3}
                            />
                            <label htmlFor="image" className="text-sm font-bold text-gray-400 block">Image</label>
                            <input
                                type="file"
                                name="image"
                                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                                onChange={(e)=> setFieldValue("image", e.target.files[0])}
                            />
                            <ErrorMessage component="p" name="description" className="text-red-400 text-sm" />
                            <button
                                type="submit"
                                className="bg-blue-900 rounded hover:bg-blue-800 mt-2 px-4 py-2 text-white focus:outline-none disabled:to-blue-300"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <FaSpinner className="animate-spin h-5 w-5"/>
                                ) : ("Save")}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

