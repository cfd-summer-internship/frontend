import { Plus } from 'lucide-react';
import QuestionText from "./QuestionText";
import { useState } from 'react';

export default function SurveyQuestion() {
    const [questions, setQuestion] = useState([0]);
    const [checked, setChecked] = useState(false);
    function addQuestion() {
        setQuestion(prev => [...prev, prev.length]);
    }

    function removeQuestion(idToRemove) {
        setQuestion(prev => prev.filter(id => id !== idToRemove));
    }
    return (
        <div className="flex flex-col items-center">
            <div className='flex items-center w-full mx-4'>
                <label className='text-stone-300'>Demographic Survey:</label>
                <input type="checkbox" className='mx-4 bg-stone-700' name="experiment.survey" checked={checked} onChange={e => setChecked(e.target.checked)}></input>
            </div>
            {checked && (
                <>{questions.map((id,index )=> (
                    <QuestionText key={id} id={id} index={index} onRemove={removeQuestion} />
                ))}
                    <div className='flex items-start w-full'>
                        <button type="button" onClick={addQuestion} className='bg-stone-800 hover:outline-1 outline-stone-700 rounded-sm text-stone-300 px-8 py-2 mt-2 ml-21'><Plus /></button>
                    </div>
                </>)}
        </div>

    )
}