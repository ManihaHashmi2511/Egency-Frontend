import { useRef, useState } from "react";
import { uploadImage } from "../../utils/uploadImage";
import Swal from "sweetalert2";
import { MdOutlineCloudUpload, MdClose } from "react-icons/md";

const ImageDropzone = ({ value, onChange, aspect = "aspect-square", shapeClass = "rounded-2xl" }) => {
  const [preview, setPreview] = useState(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const url = await uploadImage(file);
      onChange(url);
      setPreview(url);
    } catch (error) {
      console.log("Upload error:", error);
      setPreview(value || null); // upload fail ho to purani/khaali state pe wapas le jao
      Swal.fire(
        "Upload Failed",
        "Image upload nahi ho saki. Backend console check karo ke Cloudinary setup sahi hai ya nahi.",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      onClick={() => fileInputRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`w-full ${aspect} ${shapeClass} border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden relative ${
        isDragging ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
      }`}
    >
      {preview ? (
        <>
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-medium text-center px-2">
              Uploading...
            </div>
          )}
          {!uploading && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPreview(null);
                onChange("");
              }}
              className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full cursor-pointer"
            >
              <MdClose className="text-sm" />
            </button>
          )}
        </>
      ) : (
        <div className="text-center px-2">
          <MdOutlineCloudUpload className="text-4xl text-gray-400 mx-auto mb-1" />
          <p className="text-gray-500 text-sm font-medium">Drag & drop</p>
          <p className="text-gray-400 text-xs mt-0.5">or click</p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files[0])}
        className="hidden"
      />
    </div>
  );
};

export default ImageDropzone;