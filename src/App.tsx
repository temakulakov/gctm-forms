import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Row, Col } from 'antd';
import styles from './App.module.scss';
import Form from './components/forms/Form';

interface FormMenu {
  id: number;
  title: string;
  description: string;
  component: React.ReactNode;
};

const formsArray: Array<FormMenu> = [
  { id: 1, title: "Прилегающая территория и внешние фасады зданий", description: '', component: <Form IQ={[
    {id: 0, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 1, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 2, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 3, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 4, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 5, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 6, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 7, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 8, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 9, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 10, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 11, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 12, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    {id: 13, title: 'Ворота 1, калитка 1, забор вдоль ЦТИ', options: ['Чисто', 'нет новых повреждений']},
    // остальные элементы
]} /> },
  { id: 2, title: "Территория квартала", description: '', component: <Form IQ={[]} /> },
  { id: 3, title: "ЦТИ", description: '', component: <Form IQ={[]} /> },
];



const Menu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Row gutter={[16, 16]} justify="center">
      {
        formsArray.map((el) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={el.id}>
            <div
              className={styles.element}
              onClick={() => navigate(`/${el.id}`)}
            >
              {el.title}
            </div>
          </Col>
        ))
      }
    </Row>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        {formsArray.map((el) => (
          <Route key={el.id} path={`/${el.id}`} element={el.component} />
        ))}
      </Routes>
    </Router>
  );
};



export default App;
