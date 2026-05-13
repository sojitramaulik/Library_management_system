import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStudents } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

type FormValues = {
  firstName?: string;
  lastName?: string;
  bookName?: string;
  issueDate: string;
  submissionDate: string;
};

export default function FetchData() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const issueDate = watch("issueDate")

  const inputStyle = `
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
  transition-all
  duration-300
  focus:border-teal-400
  focus:bg-white/15
`;

  const onSubmit = async (data: FormValues) => {
   
    if (!data.issueDate || !data.submissionDate) {
      alert("Please Enter a date ");
    }
   
    const bookData = {
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.bookName && { bookName: data.bookName }),

      issue_date: data.issueDate,
      sub_date: data.submissionDate,
    };

    try {

       const response = await axios.post(
         `${import.meta.env.VITE_API_URL}/fetch`,
         bookData,
         {
           withCredentials: true,
         },
       );

       dispatch(setStudents(response.data.data))

       toast.success("Data Fetch Successfully");

       navigate('/data')

       reset()

      
    } catch (error) {
          console.log("Failed to fetch data", error);
          toast.error("Failed to Fetch Data");
          reset()
    }

  };

  return (
    <>
      {/* <Navbar /> */}

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
              Fetch
              <br />
              Books Easily
            </h1>

            <p className="text-slate-300 mt-6 leading-8">
              Manage books smarter with a modern library dashboard experience.
            </p>
          </div>

          {/* Form */}
          <div className="p-10">
            <h2 className="text-4xl font-bold text-white">Fetch Book</h2>

            <p className="text-slate-300 mt-3">Fill the details below.</p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" grid md:grid-cols-2 gap-6 mt-10"
            >
              {/* First Name */}
              <div>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className={inputStyle}
                  {...register("firstName")}
                />

                {errors.firstName && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* lastName */}
              <div>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className={inputStyle}
                  {...register("lastName")}
                />

                {errors.lastName && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* BookName */}

              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Enter Book Name"
                  className={inputStyle}
                  {...register("bookName")}
                />

                {errors.bookName && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.bookName.message}
                  </p>
                )}
              </div>

              {/*  Issue Date */}

              <div>
                <label className="text-slate-200 block mb-2">Issue Date:</label>

                <input
                  type="date"
                  style={{ colorScheme: "dark" }}
                  className={inputStyle}
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
                  Submission Date:
                </label>

                <input
                  type="date"
                  style={{ colorScheme: "dark" }}
                  className={inputStyle}

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
                Fetch Data
              </button>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}
