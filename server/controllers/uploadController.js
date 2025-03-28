import multer from 'multer';

const checkMulter = () => {
    if (multer) {
        console.log('\x1b[0mMulter: \x1b[32mFile upload is ready\x1b[0m');
    } else {
        console.log('\x1b[31mMulter: Multer is not configured properly\x1b[0m');
    }
};

let filepath = '';

const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        filepath = `${Date.now()}_${file.originalname}`;
        return cb(null, './public/images');
    },
    filename: (_req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const uploadToServer = multer({ storage });

const getFilePath = (_req, res) => {
    res.cookie('filepath', filepath, { maxAge: 10000, httpOnly: true });
    res.status(201).json({
        status: 'success',
        data: filepath,
    });
};

export { uploadToServer, getFilePath, checkMulter };
