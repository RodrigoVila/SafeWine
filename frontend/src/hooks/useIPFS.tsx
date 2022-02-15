import { useEffect, useState } from "react";
import { create } from "ipfs-http-client";

interface File {
  name: string;
  description: string;
  tokenImage: string;
}

const useIPFS = () => {
  const [IPFS, setIPFS] = useState<any>();
  const [fileBUffer, setFileBuffer] = useState<any[]>([]);
  const [fileURI, setFileURI] = useState("");
  const [tokenBuffer, setTokenBuffer] = useState<any[]>([]);
  const [tokenURI, setTokenURI] = useState("");

  const handleFileInput = (e) => {
    e.preventDefault();
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFileBuffer(Buffer.from(reader.result));
    };
  };

  const uploadFileToIPFS = async () => {
    try {
      const created = await IPFS.add(fileBUffer);
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      console.log("!2.5aaa URL:", url);
      setFileURI(url);
      return url;
    } catch (error) {
      console.error("Error on uploadFileToIPFS: ", error);
      return false;
    }
  };

  const uploadMetadataToIPFS = async (
    name: string,
    description: string,
    fileURI: string
  ) => {
    if (fileURI) {
      const metaObj = {
        name,
        description,
        fileURI,
      };
      console.log("!3aaaa, fileURI: ", fileURI);
      const jsonObj = JSON.stringify(metaObj);

      try {
        const created = await IPFS.add(jsonObj);
        const url = `https://ipfs.infura.io/ipfs/${created.path}`;
        console.log("!4aaaa, url: ", url);
        setTokenURI(url);
        return url;
      } catch (error) {
        console.error("Error on uploadMetadataToIPFS: ", error);
        return false;
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      const instance = create({
        url: "https://ipfs.infura.io:5001",
      });
      setIPFS(instance);
    };
    init();
    //eslint-disable-next-line
  }, []);

  return {
    fileBUffer,
    tokenURI,
    handleFileInput,
    uploadFileToIPFS,
    uploadMetadataToIPFS,
  };
};

export default useIPFS;