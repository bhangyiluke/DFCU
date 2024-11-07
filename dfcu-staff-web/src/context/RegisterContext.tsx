import { createContext, MutableRefObject, PropsWithChildren, SetStateAction, useRef, useState } from "react";

type RegisterType = {
    user: {
        username?: String,
        email?: String,
        password?: String,
        confirmPassword?: String,
        birthdate?: Date,
        bio?: String,
        website?: String,
        acceptTerms?: false,
        newsletter?: false,
        token:string
    },
    activeStep: number,
    errors?: {
        email?: string,
        token?:string
    },
    response?:{
        success:boolean,
        message:string;
    },
    image?: any;
};

const defaultValue: RegisterType = {
    user: {
        birthdate: new Date(),
        token:""
    },
    activeStep: 0
};

type StateType = { state: RegisterType, setState?: React.Dispatch<SetStateAction<RegisterType>> };

export const RegisterContext = createContext<StateType>({ state: defaultValue});

export default ({ children }: PropsWithChildren) => {
    const [state, setState] = useState<RegisterType>(defaultValue);
    return <RegisterContext.Provider value={{ state, setState }}>
        {children}
    </RegisterContext.Provider>

}