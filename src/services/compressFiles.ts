import Compressor from "compressorjs";

export const compressFile = async (file: File) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.5,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });
};

interface ImageObj {
  file: File;
}

export const compressFiles = (files: ImageObj[]) => {
  files.map(async ({ file }) => {
    const fileSize = file.size;
    console.log({ fileSize });
    let compressedFile = (await compressFile(file)) as File;
    console.log({ compressedFileSize: compressedFile.size });
    return { file: compressedFile };
  });
};
