import React, { useState, useEffect } from 'react';
import { Checkbox, Input as AntdInput } from 'antd';
import styles from './Form.module.scss';
const { TextArea } = AntdInput;

interface InputProps {
  id: number;
  options: string[];
  title: string;
  state: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  comments: string[];
  setComments: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Input: React.FC<InputProps> = ({ title, options, state, setState, id, comments, setComments }) => {
  const [localChecked, setLocalChecked] = useState<string[]>([]);

  useEffect(() => {
    const activeOptionsText = localChecked.map(option => `- ${option}`).join('\n');
    const updatedState = `${activeOptionsText}`;
    setState(prevState => {
      const newState = [...prevState];
      newState[id] = updatedState;
      return newState;
    });
  }, [localChecked, comments, id, setState]);

  const handleCheckboxChange = (checkedValues: any) => {
    setLocalChecked(checkedValues as string[]);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setComments(prevState => {
      const newState = [...prevState];
      newState[id] = value;
      return newState;
    });
  };

  return (
    <>
      <p style={{ margin: '0 0 15px 0' }}>{`${id + 1}. ${title}`}</p>
      <Checkbox.Group
        options={options.map((option, index) => ({ label: option, value: option, key: `${option}-${index}` }))}
        value={localChecked}
        onChange={handleCheckboxChange}
        style={{ marginBottom: 16 }}
      />
      <TextArea
        placeholder={'Комментаий'}
        value={comments[id]}
        onChange={handleTextChange}
        style={{ height: 100, marginTop: 8 }}
      />
    </>
  );
};
