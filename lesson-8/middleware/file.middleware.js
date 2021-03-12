const {
    DOCS_MIMETYPES,
    FILE_MAX_SIZE,
    PHOTO_MAX_SIZE,
    PHOTOS_MIMETYPES,
    VIDEO_MAX_SIZE,
    VIDEOS_MIMETYPES
} = require('../constant/constants');

module.exports = {
    checkFile: (req, res, next) => {
        try {
            const { files } = req;

            const docs = [];
            const photos = [];
            const video = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { name, size, mimetype } = allFiles[i];

                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new Error(`File ${name} is too big`);
                    }
                    photos.push(allFiles[i]);
                } else if (DOCS_MIMETYPES.includes(mimetype)) {
                    if (FILE_MAX_SIZE < size) {
                        throw new Error(`File ${name} is too big`);
                    }
                    docs.push(allFiles[i]);
                } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (VIDEO_MAX_SIZE < size) {
                        throw new Error(`File ${name} is too big`);
                    }
                    [req.avatar] = req.photos;

                    video.push(allFiles[i]);
                    next();
                } else {
                    throw new Error('Not valid file');
                }
            }

            req.docs = docs;
            req.photos = photos;
            req.video = video;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatar: (req, res, next) => {
        try {
            if (req.photos.length > 1) {
                throw new Error('You can upload just one photo');
            }
        } catch (e) {
            next(e);
        }
    }
};
