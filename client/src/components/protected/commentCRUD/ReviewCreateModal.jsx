import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import getFileTypes from "../../../helpers/getFileTypes.js";
import createComment from "../../../helpers/createComment.js";

export default function ReviewCreateModal({
  showModal,
  setShowModal,
  setUpdate,
}) {
  const [availableFileTypes, setAvailableFileTypes] = useState([]);
  const [strippedAvailableFileTypes, setStrippedAvailableFileTypes] =
    useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFileTypes = async () => {
      const fileTypes = await getFileTypes();
      setAvailableFileTypes(fileTypes);
      const strippedFileTypes = fileTypes
        .map((fileType) => fileType.split("/")[1].toUpperCase())
        .join(", ");
      setStrippedAvailableFileTypes(strippedFileTypes);
    };
    fetchFileTypes();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  const submitHandler = async (data) => {
    try {
      await createComment(data);
      setUpdate((update) => update + 1);
      setError("");
      setValue("product_id", "");
      setValue("comment", "");
      setValue("stars", "");
      setValue("images", "");
      setShowModal(false);
    } catch (error) {
      setError(error.response?.data?.message || "Nepavyko sukurti komentaro");
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <dialog
        open={showModal}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-full max-w-lg"
      >
        <div className="flex justify-between items-center mb-4">
            
          <h3 className="text-xl font-semibold text-gray-800">
            Create new review
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-500 transition-colors text-xl font-bold"
            title="Uždaryti"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
        >
          <div>
            <input
              type="number"
              placeholder="Produkto ID"
              {...register("product_id", {
                required: "Produkto ID yra privalomas",
                min: {
                  value: 1,
                  message: "Produkto ID turi būti teigiamas skaičius",
                },
                valueAsNumber: true,
                onChange: () => {
                  setError("");
                  clearErrors("product_id");
                },
              })}
              className="rounded-lg p-2 border border-slate-300 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.product_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.product_id.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Komentaras"
              {...register("comment", {
                required: "Komentaras yra privalomas",
                onChange: () => {
                  setError("");
                  clearErrors("comment");
                },
              })}
              className="rounded-lg p-2 border border-slate-300 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Įvertinimas (1-5)"
              {...register("stars", {
                required: "Įvertinimas yra privalomas",
                min: {
                  value: 1,
                  message: "Įvertinimas turi būti bent 1",
                },
                max: {
                  value: 5,
                  message: "Įvertinimas negali būti didesnis nei 5",
                },
                valueAsNumber: true,
                onChange: () => {
                  setError("");
                  clearErrors("stars");
                },
              })}
              className="rounded-lg p-2 border border-slate-300 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.stars && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stars.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="file"
              multiple
              {...register("images", {
                onChange: () => {
                  setError("");
                  clearErrors("images");
                },
                validate: {
                  fileType: (value) => {
                    if (!value || !Array.from(value)[0]) return true;
                    return (
                      availableFileTypes.includes(Array.from(value)[0].type) ||
                      `Leidžiami failų formatai: ${strippedAvailableFileTypes}`
                    );
                  },
                },
              })}
              className="rounded-lg p-2 border border-slate-300 w-full text-sm file:mr-2 file:py-1 file:px-3 file:border file:rounded file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {errors.images.message}
              </p>
            )}
          </div>

          <span className="text-red-500 text-sm mt-1">{error}</span>

          <input
            type="submit"
            value="Pateikti atsiliepimą"
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 px-4 rounded-lg mt-2 font-medium"
          />
        </form>
      </dialog>
    </div>
  );
}
