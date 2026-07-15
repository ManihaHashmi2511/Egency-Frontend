import { useRef, useState } from "react";
import { uploadImage } from "../../utils/uploadImage";
import Swal from "sweetalert2";
import { MdOutlineCloudUpload, MdClose } from "react-icons/md";

const GalleryDropzone = ({ images, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  const fileInputRef = useRef(null);

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;

    setUploadingCount(files.length);
    try {
      const urls = await Promise.all(files.map((file) => uploadImage(file)));
      onChange([...images, ...urls]);
    } catch (error) {
      console.log("Gallery upload error:", error);
      Swal.fire(
        "Upload Failed",
        "Images upload nahi ho saki. Backend console check karo ke Cloudinary setup sahi hai ya nahi.",
        "error"
      );
    } finally {
      setUploadingCount(0);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (url) => {
    onChange(images.filter((i) => i !== url));
  };

  return (
    <div>
      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full py-10 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragging ? "border-red-500 bg-red-50" : "border-gray-300 bg-white hover:bg-gray-50"
        }`}
      >
        <MdOutlineCloudUpload className="text-4xl text-gray-400 mb-2" />
        <p className="text-gray-500 text-base font-medium">
          {uploadingCount > 0 ? `Uploading ${uploadingCount} image(s)...` : "Drag & drop images here"}
        </p>
        <p className="text-gray-400 text-sm mt-1">or click to browse (multiple files allowed)</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-5">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-white border border-gray-200">
              <img src={img} alt="Gallery" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(img)}
                className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full cursor-pointer"
              >
                <MdClose className="text-sm" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryDropzone;