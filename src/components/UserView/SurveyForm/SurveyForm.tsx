"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import ErrorDisplay from "../Error";
// import toast from "react-hot-toast";

const genderOptions = [
    "Gender Fluid",
    "Man",
    "Non-Binary",
    "Woman",
    "Other"
] as const;

const raceOptions = [
    "American Indian/Alaska Native",
    "Asian",
    "Black",
    "Latina/Latino",
    "Native Hawaiian/Pacific Islander",
    "White",
    "Multiracial"
] as const;


const surveySchema = z.object({
    age: z.coerce.number().int().positive().min(1, "Enter a valid age"),
    gender: z.string().min(1, "Please select a gender"),
    race: z.string().min(1, "Please select a race"),
    genderOther: z.string().optional(),
    raceOther: z.string().optional(),
});

export default function SurveyForm({ subjectID }: { subjectID: string }) {
    const [form, setForm] = useState({
        age: "",
        gender: "",
        genderOther: "",
        race: "",
        raceOther: "",
    });

    const router = useRouter();

    const [isError, setIsError] = useState<boolean>(false);
    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        const result = surveySchema.safeParse(form);

        if (!result.success) {
            // toast.error("Please fill out all fields correctly.");
            return;
        }

        const payload = {
            subject_id: subjectID,
            age: String(result.data.age),
            sex: result.data.gender === "Other" ? result.data.genderOther : result.data.gender,
            race: result.data.race === "Multiracial" ? result.data.raceOther : result.data.race,
        };

        const res = await fetch(`/api/survey/responses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            setIsError(true);
        } else {
            //console.log("Survey submitted successfully!");
            router.push("/study/conclusion/debrief");
        }
    };

    if (isError) return <ErrorDisplay />;

    return (
        <div className="flex flex-col items-center min-h-screen bg-stone-900 text-white px-4 py-12">
            <h1 className="text-3xl font-semibold mb-10">Demographics Survey</h1>

            {/* Age */}
            <div className="w-[80vh] max-w-4xl mb-8">
                <p className="text-xl mb-2">1) What is your age in years?</p>
                <input
                    type="number"
                    min={1}
                    placeholder="Enter age (whole number)"
                    className="w-full bg-stone-800 text-white p-3 rounded"
                    value={form.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                />
            </div>

            {/* Gender */}
            <div className="w-[80vh] max-w-4xl mb-8">
                <p className="text-xl mb-2">2) In terms of Gender, how do you identify?</p>
                <div className="space-y-2">
                    {genderOptions.map((opt) => (
                        <label key={opt} className="block">
                            <input
                                type="radio"
                                name="gender"
                                value={opt}
                                className="mr-2"
                                checked={form.gender === opt}
                                onChange={(e) => handleChange("gender", e.target.value)}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
                {form.gender === "Other" && (
                    <input
                        type="text"
                        placeholder="Please specify"
                        className="w-full mt-2 bg-stone-800 text-white p-2 rounded"
                        value={form.genderOther}
                        onChange={(e) => handleChange("genderOther", e.target.value)}
                    />
                )}
            </div>

            {/* Race */}
            <div className="w-[80vh] max-w-4xl mb-8">
                <p className="text-xl mb-2">3) What is your ethnicity/race?</p>
                <div className="space-y-2">
                    {raceOptions.map((opt) => (
                        <label key={opt} className="block">
                            <input
                                type="radio"
                                name="race"
                                value={opt}
                                className="mr-2"
                                checked={form.race === opt}
                                onChange={(e) => handleChange("race", e.target.value)}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
                {form.race === "Multiracial" && (
                    <input
                        type="text"
                        placeholder="Please specify"
                        className="w-full mt-2 bg-stone-800 text-white p-2 rounded"
                        value={form.raceOther}
                        onChange={(e) => handleChange("raceOther", e.target.value)}
                    />
                )}
            </div>

            <button
                onClick={handleSubmit}
                className="bg-stone-800 hover:bg-stone-700 text-white px-10 py-2 rounded transition cursor-pointer"
            >
                Submit
            </button>
        </div>
    );
}
