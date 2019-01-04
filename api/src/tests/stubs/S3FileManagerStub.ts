import FileManager from '../../AssetManager/FileManager'
import { DEFAULT_FILE_TYPE } from '../../AssetManager/constants';
// import {s3} from '../../../../common/config'

export class S3FileManagerStub implements FileManager {
    private bucketName;
    private fakeFiles: any;

    constructor(fakeListFilesResponse: any) {
        this.bucketName = "STUB_BUCKET";
        this.fakeFiles = fakeListFilesResponse
    }
    saveFile(file:any, fileName:string) {
        return new Promise((resolve, reject)=> {
            resolve(true);
        })
    }

    getFile(fileName: string) {
        return new Promise((resolve, reject)=> {
            resolve(true);
        })
    }

    listFiles(path: string) {
        return new Promise((resolve, reject)=> {
            resolve(this.fakeFiles);
        })
    }

    getFileCompleteName(fileName: string) {
        return `https://s3.amazonaws.com/${this.bucketName}/${fileName}`;
    }

    getFileUploadURL(fileType: string = DEFAULT_FILE_TYPE): Promise<string> {
        const fileName = this.generateFileNameForUpload()
        return new Promise((resolve, reject) => {
            resolve(`https://s3.amazonaws.com/test.avb.assets/zip/0951a083?AWSAccessKeyId=AKIAIFJSMCAH3EMBWYBQ&Content-Type=${encodeURIComponent(fileType)}&Expires=1525801710&Signature=DTPJNiUxDAMQzgxNYRRNKplS0B4%3D`)
        })
    }

    generateFileNameForUpload() {
        const uuid: string = "a1a1a1"
        return `${uuid.substr(0,8)}`
    }

    getFileToPath (fileName: string, path: string): Promise<any> {
        return Promise.resolve();
    }

    deleteFile (fileName: string): Promise<any> {
        return Promise.resolve();
    }
}