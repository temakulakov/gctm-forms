import { Row, Col } from 'antd';
import { Input } from './Inputs';
import { useState } from 'react';
import styles from './Form.module.scss';

interface IFormProps {
    IQ: IQuestion[];
    title: string;
}

const Form = ({IQ, title}: IFormProps) => {
    const [answers, setAnswers] = useState<string[]>(IQ.map(() => ''));

    return (
        <>
            <h2 style={{textAlign: 'center'}}>{title}</h2>
            <Row gutter={[16, 16]} justify="center" className={styles.container} style={{ padding: '20px'}}>
            {IQ.map(el => (
                <Col xs={24} sm={12} md={12} lg={12} xl={12} key={el.id} >
                    <Input
                        id={el.id}
                        options={el.options}
                        title={el.title}
                        state={answers}
                        setState={setAnswers}
                    />
                </Col>
            ))}
        </Row>
        </>
    );
};

export default Form;
