"use client";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className="bg-zinc-600 m-3 p-4 border border-zinc-700  rounded-xl" {...register("firstName", { required: true, maxLength: 20 })} />
      <input className="bg-zinc-600 m-3 p-4 border border-zinc-700  rounded-xl" {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input className="bg-zinc-600 m-3 p-4 border border-zinc-700  rounded-xl" type="number" {...register("age", { min: 18, max: 99 })} />
      <input className="bg-zinc-600 m-3 p-4 border border-zinc-700  rounded-xl" type="submit" />
    </form>
  );
}
