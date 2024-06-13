import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { Input } from './Inputs';
import styles from './Form.module.scss';
import dayjs from 'dayjs';

interface IQuestion {
  id: number;
  title: string;
  options: string[];
}

interface IFormProps {
  IQ: IQuestion[];
  title: string;
}

const Form = ({ IQ, title }: IFormProps) => {
  const [answers, setAnswers] = useState<string[]>(IQ.map(() => ''));
  const [comments, setComments] = useState<string[]>(IQ.map(() => ''));

  useEffect(() => {
    console.log('Answers State: ', answers);
    console.log('Comments State: ', comments);
  }, [answers, comments]);

  const handleSendEmail = () => {
    const currentDateTime = dayjs().format('DD.MM.YYYY HH:mm');
    const subject = `${currentDateTime} заполнил форму ${title}`;
    const body = IQ.map((question, index) => {
      const answer = answers[index].trim() ? `Пункты:\n${answers[index]}` : 'Пункты: Не заполнено';
      const comment = comments[index].trim() ? `Комментарий: ${comments[index]}` : 'Комментарий: Не заполнено';
      return `${question.title}\n${answer}\n${comment}`;
    }).join('\n\n');

    const mailtoLink = `mailto:help@gctm.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <Row gutter={[16, 16]} justify="center" className={styles.container} style={{ padding: '20px' }}>
        {IQ.map((el, index) => (
          <Col xs={24} sm={12} md={12} lg={12} xl={12} key={`col-${el.id}`}>
            <Input
              id={index}
              options={el.options}
              title={el.title}
              state={answers}
              setState={setAnswers}
              comments={comments}
              setComments={setComments}
            />
          </Col>
        ))}
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Button className={styles.Button} type="primary" onClick={handleSendEmail}>
          Отправить письмо
        </Button>
      </Row>
    </>
  );
};

export default Form;
