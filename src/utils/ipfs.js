
//ipfs
import { getIpfs, providers } from 'ipfs-provider';


const { httpClient, jsIpfs } = providers;

/**
 * initIpfs
 **/
export const initIpfs = async () => {
    console.log(getIpfs);
    const result = await getIpfs({
        providers: [
            jsIpfs({
                loadJsIpfsModule: () => window.Ipfs,
                options: { /* advanced config */ }
            })
        ]
    });
    //console.log('>>>>>>>>>',result, result.ipfs,result.provider);
};
/*
export const doAddFiles = (files) => async ({ dispatch, getIpfs }) => {
    const ipfs = getIpfs()

    for (const _file of files) {
      const fileId = shortid.generate()
      const fileName = _file.name
      const fileSize = _file.size

      const file = {
        [fileId]: {
          id: fileId,
          name: fileName,
          size: fileSize,
          progress: 0,
          pending: true
        }
      }

      //dispatch({ type: 'FILES_ADD_STARTED', payload: { file } })

      const updateProgress = (bytesLoaded) => {
        const progress = Math.round((bytesLoaded / fileSize) * 100)

        //dispatch({ type: 'FILES_ADD_PROGRESS', payload: { id: fileId, progress } })
      }

      try {
        const addedFile = await ipfs.add(_file, { pin: false, progress: updateProgress })
        //dispatch({ type: 'FILES_ADD_FINISHED', payload: { id: fileId, cid: addedFile.cid } })
      } catch (err) {
        console.error(err)
        //dispatch({ type: 'FILES_ADD_FAILED', payload: { id: fileId, error: err.message } })
      }
    }
  },*/