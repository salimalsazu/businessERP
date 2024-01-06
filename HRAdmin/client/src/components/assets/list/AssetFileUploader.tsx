import { useState } from "react";
import { Uploader } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
// import toast from "react-hot-toast";
import Image from "next/image";

interface StyleImageUploadProps {
  field: {
    onChange: (file: FileType | undefined) => void;
    value: FileType | undefined;
  };
}
const AssetFileUploader = ({ field }: StyleImageUploadProps) => {
  const [fileValue, setFileValue] = useState<FileType[]>([]);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  const handleChangeImages = (files: FileType[]) => {
    if (files.length > 0) {
      const latestFile = files[files.length - 1];
      const fileSizeLimit = 512 * 2 * 1024; // 1 MB

      if (
        latestFile.blobFile?.size &&
        latestFile.blobFile?.size <= fileSizeLimit
      ) {
        setFileValue([latestFile]);

        field.onChange(latestFile);

        const file = latestFile;
        const reader = new FileReader();

        reader.onload = (e) => {
          const imagePreviewUrl = e.target?.result as string;
          setImagePreview(imagePreviewUrl);
        };

        reader.readAsDataURL(file.blobFile as File);
      } else {
        clearImagePreview();
        // toast.error("File size exceeds 1MB.");
      }
    } else {
      clearImagePreview();
    }
  };

  const clearImagePreview = () => {
    setImagePreview(undefined);
    field.onChange(undefined);
    setFileValue([]);
  };

  return (
    <div className="relative group">
      <Uploader
        fileList={fileValue}
        onChange={handleChangeImages}
        draggable
        autoUpload={false}
        action={""}
        onRemove={clearImagePreview}
        className="w-full"
        accept="image/*"
      >
        {imagePreview ? (
          <div className="relative border-4">
            <Image
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-full object-contain object-center cursor-pointer"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
              }}
              width={"100"}
              height={"100"}
            />
          </div>
        ) : (
          <div
            style={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>Click or Drag Image to this area to upload</span>
          </div>
        )}
      </Uploader>
    </div>
  );
};

export default AssetFileUploader;
