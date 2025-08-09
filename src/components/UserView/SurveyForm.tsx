"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import { z } from "zod";

type SurveyQuestion = string;

// Create a Zod schema dynamically based on the number of questions
function createSurveySchema(questionCount: number) {
    return z.object({
        answers: z
            .array(
                z.object({
                    question_id: z.number(),
                    text: z.string().nonempty("Answer is required"),
                })
            )
            .length(questionCount),
    });
}

export default function SurveyForm({
                                       questions,
                                       studyID,
                                   }: {
    questions: SurveyQuestion[];
    studyID: string;
}) {
    // Use index-based ids (1..N)
    const [answers, setAnswers] = useState(
        questions.map((_q, i) => ({ question_id: i + 1, text: "" }))
    );

    const handleChange = (i: number, value: string) => {
        setAnswers((prev) =>
            prev.map((ans, idx) => (idx === i ? { ...ans, text: value } : ans))
        );
    };



    const handleSubmit = async () => {
        const surveySchema = createSurveySchema(questions.length);
        const result = surveySchema.safeParse({ answers });

        if (!result.success) {
            toast.error("Please answer all questions before submitting.");
            return;
        }

        const res = await fetch(`/api/survey/responses/${studyID}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.data.answers),
        });

        if (!res.ok) {
            toast.error("Submission failed");
        } else {
            toast.success("Survey submitted successfully!");
        }
    };


    return (
        <div className="flex flex-col items-center min-h-screen bg-stone-900 text-white px-4 py-12">
            <h1 className="text-3xl font-semibold mb-10">Demographics Survey</h1>

            {questions.map((q, i) => (
                <div key={i} className="w-[80vh] max-w-4xl mb-10">
                    <p className="font-bold text-2xl mb-1">
                        {i + 1}) {q}
                    </p>
                    <p className="mb-2 text-sm text-stone-400">Answer:</p>
                    <textarea
                        className="w-full bg-stone-800 text-stone-200 rounded p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        rows={3}
                        value={answers[i].text}
                        onChange={(e) => handleChange(i, e.target.value)}
                    />
                </div>
            ))}

            <button
                onClick={handleSubmit}
                className="bg-stone-800 hover:bg-stone-700 text-white px-10 py-2 rounded transition cursor-pointer"
            >
                Submit
            </button>
        </div>
    );
}
