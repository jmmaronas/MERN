import Post from "../models/Post.js"
import { deleteImage, upploadImage } from "../libs/cloudinary.js"
import fs from "fs-extra"

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body
        let image;
        if (req.files?.image) {
            const result = await upploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const newPost = new Post({ title, description, image })

        await newPost.save()

        return res.send(newPost)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true })
        return res.send(updatedPost)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postRemove = await Post.findByIdAndDelete(req.params.id)
        if (!postRemove) {
            return res.sendStatus(404)

        }
        if (postRemove.image.public_id){
            await deleteImage(postRemove.image.public_id)
        }
        return res.sendStatus(202)

    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        return !post ? res.sendStatus(404) : res.json(post)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({ message: error.message })
    }
}