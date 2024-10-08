import config from '../config/config'
import {Client, Databases, ID, Query, Storage } from 'appwrite'


export class Service {
client = new Client();
databases
bucket

    constructor(){
        this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

        // async createPost({title,slug,content,featuredImage,status,userId}){
        //     try {
        //         return await this.databases.createDocument(
        //             config.appWriteDatabaseId,
        //             config.appWriteCollectionId,
        //             slug,
        //             {
        //                 title,content,featuredImage,status,userId
        //             }
        //         )
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }

        async createPost({title, slug, content, featuredImage, status, userId}){
            try {
                return await this.databases.createDocument(
                    config.appWriteDatabaseId,
                    config.appWriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId,
                    }
                )
            } catch (error) {
                console.log("Appwrite serive :: createPost :: error", error);
            }
        }

       

        async updatePost(slug, { title,content,featuredImage,status}){
            try {
                return await this.databases.updateDocument(
                    config.appWriteDatabaseId,
                    config.appWriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                    }
                )
                
            } catch (error) {
                console.log(error)
            }
        }


        async deletePost(slug){
            try {
                 await this.databases.deleteDocument(
                    config.appWriteDatabaseId,
                    config.appWriteCollectionId,
                    slug
                )
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }


        async getPost(slug){
            try {
                return await this.databases.getDocument(
                    config.appWriteDatabaseId,
                    config.appWriteCollectionId,
                    slug
                
                )
                
            } catch (error) {
                console.log("Appwrite serive :: getPost :: error", error);
                return false
            }
        }

        // async getAllPost(){
        //     try {
        //         return await this.databases.listDocuments(
        //             config.appWriteDatabaseId,
        //             config.appWriteCollectionId,
        //             [
        //                 Query.equal('status', 'active')
        //             ]
        //         )
        //     } catch (error) {
        //         console.log("appwrite :: db :: getAllPost ",error)
        //     }
        // }

        
    async getAllPost(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getAllPost :: error", error);
            return false
        }
    }

        // file services

        // async uploadFile(file){
        //     try {
        //         return await this.bucket.createFile(
        //             config.appWriteBucketId,
        //             ID.unique(),
        //             file
        //         )
        //     } catch (error) {
        //         console.log(error)
        //         return false
        //     }
        // }

        async uploadFile(file){
            try {
                return await this.bucket.createFile(
                    config.appWriteBucketId,
                    ID.unique(),
                    file
                )
            } catch (error) {
                console.log("Appwrite serive :: uploadFile :: error", error);
                return false
            }
        }



        async deleteFile(fileId){
            try {
                 await this.bucket.deleteFile(
                    config.appWriteBucketId,
                    fileId
                )
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }

        getFilePreview(fileId){
            return this.bucket.getFilePreview(
                config.appWriteBucketId,
                fileId
            )
        }

}

const service = new Service()

export default service