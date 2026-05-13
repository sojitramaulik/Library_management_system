import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import axios from "axios";

type FormValues = {
  bookName: string;
  semester: number;
};

export default function AddBook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (!data.bookName || !data.semester) {
      alert("Please Enter all the data ");
    }

    const bookData = {
      bookName: data.bookName,
      sem: data.semester,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/book`,
        bookData,
        {
          withCredentials: true,
        },
      );

      console.log(response);

      toast.success("Book Added Successfully");

      reset();
    } catch (error) {
      console.log("Failed to add Book", error);
      toast.error("Failed to add Book");
      reset();
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-[#021414]
          via-[#042f2e]
          to-[#134e4a]
          flex
          justify-center
          items-center
          px-6
          py-20
        "
      >
        <div
          className="
            w-full
            max-w-4xl
            grid
            md:grid-cols-2
            rounded-3xl
            overflow-hidden
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            shadow-2xl
          "
        >
          {/* Left Side */}
          <div
            className="
              hidden
              md:flex
              flex-col
              justify-center
              p-10
              bg-gradient-to-br
              from-teal-900/70
              to-cyan-900/40
            "
          >
            <h1 className="text-5xl font-black text-white leading-tight">
              Add New
              <br />
              Books Easily
            </h1>

            <p className="text-slate-300 mt-6 leading-8">
              Manage books smarter with a modern library dashboard experience.
            </p>
          </div>

          {/* Form */}
          <div className="p-10">
            <h2 className="text-4xl font-bold text-white">Add Book</h2>

            <p className="text-slate-300 mt-3">Fill the details below.</p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 mt-10"
            >
              {/* Book Name */}
              <div>
                <input
                  type="text"
                  placeholder="Enter Book Name"
                  className="
                    w-full
                    bg-white/10
                    border
                    border-white/10
                    text-white
                    placeholder:text-slate-400
                    px-5
                    py-4
                    rounded-2xl
                    outline-none
                    focus:border-teal-400
                  "
                  {...register("bookName", {
                    required: "Please enter Book Name",
                  })}
                />

                {errors.bookName && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.bookName.message}
                  </p>
                )}
              </div>

              {/* Semester */}
              <div>
                <input
                  type="number"
                  placeholder="Enter Semester"
                  className="
                    w-full
                    bg-white/10
                    border
                    border-white/10
                    text-white
                    placeholder:text-slate-400
                    px-5
                    py-4
                    rounded-2xl
                    outline-none
                    focus:border-teal-400
                  "
                  {...register("semester", {
                    required: "Please enter Semester",
                  })}
                />

                {errors.semester && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.semester.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                className="
                  mt-2
                  bg-gradient-to-r
                  from-teal-500
                  to-cyan-500
                  hover:from-teal-400
                  hover:to-cyan-400
                  text-white
                  font-semibold
                  py-4
                  rounded-2xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                "
              >
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
