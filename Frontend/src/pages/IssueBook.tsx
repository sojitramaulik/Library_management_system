import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import axios from "axios";

type FormValues = {
  s_id: number;
  b_id: number;
  issueDate: string;
  submissionDate: string;
};

export default function IssueBook() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

 
   const issueDate = watch("issueDate")

  const onSubmit = async (data: FormValues) => {
   
    if (!data.s_id || !data.b_id || !data.issueDate || !data.submissionDate) {
      alert("Please Enter all the data ");
    }
   
    const bookData = {
      s_id: data.s_id,
      b_id: data.b_id,
      iss_date: data.issueDate,
      sub_date: data.submissionDate,
    };

    try {

       const response = await axios.post(
         `${import.meta.env.VITE_API_URL}/book/issue`,
         bookData,
         {
           withCredentials: true,
         },
       );

       console.log(response);

       toast.success("Data Added Successfully");

       reset()

      
    } catch (error) {
          console.log("Failed to add Book", error);
          toast.error("Failed to add Book");
          reset()
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
              Issue
              <br />
              Books Easily
            </h1>

            <p className="text-slate-300 mt-6 leading-8">
              Manage books smarter with a modern library dashboard experience.
            </p>
          </div>

          {/* Form */}
          <div className="p-10">
            <h2 className="text-4xl font-bold text-white">Issue Book</h2>

            <p className="text-slate-300 mt-3">Fill the details below.</p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" grid md:grid-cols-2 gap-6 mt-10"
            >
              {/* Book Name */}
              <div>
                <input
                  type="text"
                  placeholder="Enter Student Id"
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
                  {...register("s_id", {
                    required: "Please enter Student Id",
                  })}
                />

                {errors.s_id && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.s_id.message}
                  </p>
                )}
              </div>

              {/* Semester */}
              <div>
                <input
                  type="number"
                  placeholder="Enter Book Id"
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
                  {...register("b_id", {
                    required: "Please enter Semester",
                  })}
                />

                {errors.b_id && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.b_id.message}
                  </p>
                )}
              </div>

              {/*  Issue Date */}

              <div>
                <label className="text-slate-200 block mb-2">
                  Issue Date:
                </label>

                <input
                  type="date"
                  style={{ colorScheme: "dark" }}
                  className="
                      w-full
                      bg-white/10
                      border
                      border-white/10
                      text-white
                      px-5
                      py-4
                      rounded-2xl
                      outline-none
                      focus:border-teal-400"
                  {...register("issueDate", {
                    required: "Please select Issue Date",
                  })}
                />

                {errors.issueDate && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.issueDate.message}
                  </p>
                )}
              </div>

              {/* Submission Date */}

              <div>
                <label className="text-slate-200 block mb-2">
                  Submission Date
                </label>

                <input
                  type="date"
                  style={{ colorScheme: "dark" }}
                  className="
                      w-full
                      bg-white/10
                      border
                      border-white/10
                      text-white
                      px-5
                      py-4
                      rounded-2xl
                      outline-none
                      focus:border-teal-400
                    "
                  {...register("submissionDate", {
                    required: "Please select Submission Date",

                    validate: (value) => 
                       value >= issueDate ||
                         "Submission date cannot be before issue date",
                  })}
                />

                {errors.submissionDate && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.submissionDate.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                className="
                  mt-2
                  md:col-span-2
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
                Issue Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
