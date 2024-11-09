import { useState, ChangeEvent } from "react";

export const useFormulario = <T extends Object>(objetoInicial: T) => {
    const [objeto, setObjeto] = useState(objetoInicial);
    const dobleEnlace = ({ target }: ChangeEvent<any>) => {
        const { name, value } = target;
        setObjeto({ ...objeto, [name]: value });
    };

    return {
        objeto, dobleEnlace, ...objeto,
    }
}

/*
import { useState, ChangeEvent } from "react";

export const useFormulario = <T extends Object>(objetoInicial: T) => {
    const [objeto, setObjeto] = useState<T>(objetoInicial);

    const dobleEnlace = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setObjeto((prevObjeto) => ({ ...prevObjeto, [name]: value }));
    };

    return {
        objeto,
        dobleEnlace,
        ...objeto
    };
}
*/