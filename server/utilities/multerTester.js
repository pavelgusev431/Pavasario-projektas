import images from './getImages.js';

const checkMulter = () => {
    try {
        // fs.access(
        //     images(),
        //     fs.constants.F_OK |
        //         fs.constants.R_OK |
        //         fs.constants.W_OK |
        //         fs.constants.X_OK,
        //     (err) => {
        //         if (err) console.log(`FileSystem access error: ${err}`);
        //         else
        //             console.log(
        //                 `\x1b[0mFileSystem access: \x1b[32m${!err}\x1b[0m`
        //             );
        //     }
        // );
        const formattedImages = images()
            .split('/')
            .map((image) => {
                if (image != 'public' && image != 'images') {
                    return `\x1b[30m${image}`;
                } else {
                    return `\x1b[32m${image}`;
                }
            })
            .join('\x1b[0m/');
        console.log('\x1b[0mMulter: \x1b[32mFile upload is ready\x1b[0m');
        console.log(`File upload at: \x1b[30m${formattedImages}\x1b[0m`);
    } catch (error) {
        console.log(
            `\x1b[31mMulter: Multer is not configured properly: ${error}\x1b[0m`
        );
    }
};

checkMulter();
