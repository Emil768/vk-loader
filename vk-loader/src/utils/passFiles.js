export const onUploadFiles = (files, setFiles, infoFiles, setInfoFiles) => {
  const newFiles = { files: [], info: [{ nameLoaded: [], size: [] }] };

  for (let i = 0; i < files.length; i++) {
    newFiles.files.push(files[i]);
    newFiles.info[0].nameLoaded.push(files[i].name);
    newFiles.info[0].size.push(files[i].size);
  }

  setFiles([...newFiles.files]);
  setInfoFiles({
    ...infoFiles,
    nameLoaded: [...newFiles.info[0].nameLoaded],
    size: [...newFiles.info[0].size],
  });
};
