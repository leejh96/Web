import { useState, useCallback } from 'react';

function useInputs(initialForm) {
    const [ form, setForm ] = useState(initialForm);

    const onChange1 = useCallback((e) => {
        const { name , value } = e.target;
        setForm(form => ({
            ...form,
            [name] : value,
        }))
    }, []);
    
    const reset = useCallback(() => setForm(initialForm), [initialForm]);

    return [ form, onChange1, reset ]; 
}

export default useInputs;