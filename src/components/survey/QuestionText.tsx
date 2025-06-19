import { useId } from "react";
import { CircleX } from "lucide-react";

export default function QuestionText({id,onRemove}) {
    return (
        <div className="flex flex-row items-center">
            <label htmlFor="question" className="text-stone-300 text-md mr-4">Question: </label>
            <textarea id={id} rows={2} name="question" className="bg-stone-800 outline outline-stone-700 text-stone-300 my-1 w-100 rounded-sm p-1 resize-none"></textarea>
            <button onClick={()=> onRemove(id)}><CircleX className="text-stone-300 mx-4"/></button>
        </div>
    )
}