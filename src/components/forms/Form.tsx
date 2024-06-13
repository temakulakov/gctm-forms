import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import axios from 'axios';
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
  contactID: number;
}

const Form = ({ IQ, title, contactID }: IFormProps) => {
  const [answers, setAnswers] = useState<string[]>(IQ.map(() => ''));
  const [comments, setComments] = useState<string[]>(IQ.map(() => ''));

  useEffect(() => {
    console.log('Answers State: ', answers);
    console.log('Comments State: ', comments);
  }, [answers, comments]);

  const sendEmail = async (): Promise<void> => {
    const apiUrl = 'https://intranet.gctm.ru/rest/1552/shmn8un2eq3g119r/crm.activity.add';
    const contactId = 16752; // ID контакта
    const currentDateTime = dayjs().format('DD.MM.YYYY HH:mm');
    const subject = `${currentDateTime} заполнил форму ${title}`;
    const body = IQ.map((question, index) => {
      const answer = answers[index].trim() ? `Пункты:\n${answers[index]}` : 'Пункты: Не заполнено';
      const comment = comments[index].trim() ? `Комментарий: ${comments[index]}` : 'Комментарий: Не заполнено';
      return `${question.title}\n${answer}\n${comment}`;
    }).join('\n\n');
    const responsibleId = 1552; // Ваш ID или ID ответственного сотрудника
  
    try {
      // Сначала получаем данные контакта
      const contactResponse = await axios.post('https://intranet.gctm.ru/rest/1552/shmn8un2eq3g119r/crm.contact.get', {
        id: contactId
      });
  
      const contactData = contactResponse.data.result;
  
      if (!contactData || !contactData.ASSIGNED_BY_ID || !contactData.EMAIL) {
        throw new Error('Contact data is incomplete');
      }
  
      const userResponse = await axios.post('https://intranet.gctm.ru/rest/1552/shmn8un2eq3g119r/user.get', {
        filter: {
          ID: contactData.ASSIGNED_BY_ID
        }
      });
  
      const userData = userResponse.data.result[0];
  
      if (!userData || !userData.EMAIL) {
        throw new Error('User data is incomplete');
      }
  
      const email = contactData.EMAIL[0].VALUE;
  
      const response = await axios.post(apiUrl, {
        fields: {
          SUBJECT: subject,
          DESCRIPTION: body,
          DESCRIPTION_TYPE: 2, // 3 означает текст, можете использовать другие типы как html, bbCode
          COMPLETED: 'Y', // Отправить сразу
          DIRECTION: 2, // Исходящее
          OWNER_ID: contactId,
          OWNER_TYPE_ID: 3, // Тип владельца (контакт)
          TYPE_ID: 4, // Тип активности (email)
          COMMUNICATIONS: [
            {
              VALUE: email,
              ENTITY_ID: contactId,
              ENTITY_TYPE_ID: 3 // Тип владельца (контакт)
            }
          ],
          START_TIME: new Date().toISOString(),
          END_TIME: new Date(Date.now() + 3600 * 1000).toISOString(), // Плюс 1 час
          RESPONSIBLE_ID: responsibleId,
          SETTINGS: {
            MESSAGE_FROM: `${userData.NAME} ${userData.LAST_NAME} <${userData.EMAIL}>`
          }
        }
      });
  
      if (response.data.result) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error(response.data.error_description || 'Failed to send email'));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <Row gutter={[16, 16]} className={styles.container} style={{ padding: '20px' }}>
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
        <Button type="primary" onClick={sendEmail} className={styles.Button}>
          Отправить письмо
        </Button>
      </Row>
    </>
  );
};

export default Form;
