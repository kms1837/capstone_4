const common = require('./common');
const multer = require('multer');
const util = require("util");
const tableName = "file";

const uploadFilePath = `${__dirname}/../uploads`;

var storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, uploadFilePath);
    },

    filename: (request, file, cb) => {
        file.uploadedFile = {
            name: file.originalname.split('.')[0],
            ext: file.mimetype.split('/')[1],
        };

        file.uploadedFile["uploadName"] = `${Date.now()}_${file.originalname}`;

        cb(null, file.uploadedFile["uploadName"]);
    }
});

var uploadProcess = multer({ storage: storage });

module.exports = {
    findToID(id) {
        return common.findToID(tableName, id);
    },

    async upload(request, response) {
        try {
            let uploadPromise = util.promisify(uploadProcess.any());
            await uploadPromise(request, response);
            let fileID = await this.insertFile(request);
            return fileID;

        } catch (err) {
            console.log(err);
            return false;
        }
    },

    insertFile(request) {
        let userData = request.body;
        let now = new Date();
        let dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        let fileData = {
            "path": request.files[0].filename,
            "date" : dateStr
        }
        return common.insert(tableName, fileData);
    }
}