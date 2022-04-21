import {v2 as cloudinary} from"cloudinary"

cloudinary.config({
    cloud_name:"coder-house",
    api_key:"287361535169244",
    api_secret:"CxXIwIMT0HjL1hjyRzZoNgq4gvM"
})

export const upploadImage= async filePath=>{
    return await cloudinary.uploader.upload(filePath, {
        folder:"posts"
    })
}

export const deleteImage= async id =>{
    return await cloudinary.uploader.destroy(id)
}
