import config from "../Config/conig";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class DatabaseService {
  client = new Client();
  Databases;
  bucket; //storage bucket

  constructor() {
    this.client.setEndpoint(config.appwriteURL).setProject(
      config.appwriteProjectID,
    );
    this.Databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createDocument({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }) {
    try {
      return await this.Databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredimage: featuredImage,
          status,
          userid: userId,
        },
      );
    } catch (error) {
      console.log("Appwrite sevices :: CreatePost :: Error", error);
      throw error;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.Databases.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredimage: featuredImage,
          status,
        },
      );
    } catch (error) {
      console.log("Appwrite sevices :: updatePost :: Error", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.Databases.deleteDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite sevices :: deletePost :: Error", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
        return await this.Databases.getDocument(
            config.appwriteDatabaseID,
            config.appwriteCollectionID,
            slug,
        )
    } catch (error) {
        console.log("appwrite services :: getPost :: Error",error);
        return false;
    }
  }
  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
        return await this.Databases.listDocuments(
            config.appwriteDatabaseID,
            config.appwriteCollectionID,
            queries,
        )
    } catch (error) {
        console.log("appwrite services :: getAllPosts :: Error",error);
        
    }
  }

  //File Upload service

  async uploadFile(flie){
    try {
        return await this.bucket.createFile(
            config.appwriteBucketID,
            ID.unique(),
            flie,
        )
    } catch (error) {
        console.log("appwrite services :: uploadFile :: Error",error);
        
    }
  }
  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            config.appwriteBucketID,
            fileId,
        )
        return true;
    } catch (error) {
        console.log("appwrite services :: deleteFile :: Error",error);
        return false;
    }
}
getFilePreview(fileid){
    if(!fileid) return "";
    return this.bucket.getFilePreview(
        config.appwriteBucketID,
        fileid,
    ).toString()
}
}
const databaseService = new DatabaseService();

export default databaseService;
