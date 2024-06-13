import React from 'react';
import { AutoComplete, Input as AntdInput } from 'antd';
import { SelectProps } from 'antd/es/select';
import styles from './Form.module.scss'
const { TextArea } = AntdInput;

interface InputProps {
    id: number;
    options: string[];
    title: string;
    state: string[];
    setState: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Input: React.FC<InputProps> = ({ title, options, state, setState, id }) => {
    const formattedOptions: SelectProps<object>['options'] = options.map(option => ({
        value: option,
    }));

    const handleChange = (value: string) => {
        setState(prevState => {
            const newState = [...prevState];
            newState[id] = value;
            return newState;
        });
    };
    const handleKeyPress = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
        console.log('handleKeyPress', ev);
      };

    React.useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <>
            <p style={{ margin: '0 0 15px 0'}}>{`${id}. ${title}`}</p>
            <AutoComplete
                style={{ width: '100%' }}
                options={formattedOptions}
                value={state[id]}
                onChange={handleChange}
                filterOption={(inputValue, option) => {
                    const value = option?.value;
                    return value ? value.toString().toLowerCase().includes(inputValue.toLowerCase()) : false;
                }}
            >
           
                <TextArea
                    placeholder={'Введите текст'}
                    className="custom"
                    style={{ height: 30 }}
                />
            </AutoComplete>
        </>
    );
};
