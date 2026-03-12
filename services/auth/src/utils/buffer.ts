import DataUriParser from "datauri/parser.js";
import path from "path";

const getBuffer = (file:any) => {
    const parser = new DataUriParser();

    const extName = path.extname(file.originalname).toString();

    return parser.format(extName, file.buffer);
}

export default getBuffer;   


//datauri is a library that converts file data into a format that can be easily
//transmitted over the internet. It encodes the file data as a base64 string,
//which can be included in URLs or sent as part of an HTTP request. 
//This is particularly useful for handling file uploads in web applications,
//as it allows you to process files without needing to save them to disk first.

//cloudinary takes the buffer and uploads it to their cloud storage, returning a URL that can be used to access the file.