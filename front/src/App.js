import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [mail, setMail] = useState('')
  const [text, setText] = useState('')
  console.log(mail,text)
  const [message, setMessage] = useState([])
  
  const getMessages = async () => {
    try {
        const { data } = await axios.get('http://localhost:7000/mail/messages');
        console.log(data);
        setMessage(data);
    } catch (error) {
        console.error('Xatolik:', error);
    }
  }
  
  useEffect( () => {
      getMessages()
  }, []);
  

  const sendMail = async () => {
    if (!mail || !text) {
      alert("Email yoki habar kiritilmagan");
    } else {
      try {
        await axios.post('http://localhost:7000/mail/send', {
          mail: mail,
          text: text
        });
        alert('Habar yuborildi :)');
      } catch (error) {
        alert(`Xatolik yuzaga keldi. Iltimos, qayta urinib ko'ring`);
        console.log('Xatolik:', error);
      }
    }
  };

  return (
    <div className='container align-items-center mt-5'>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Kimga yubormoqchisiz?</label>
        <input onChange={e => setMail(e.target.value)} type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Habar matni</label>
        <textarea onChange={e => setText(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <button onClick={() => sendMail()} className='btn btn-primary'>Jo'natish</button>
      
      <h5 className='text-center my-5'>Barcha yuborilgan habarlar</h5>

      <table class="table my-5">
        <thead>
          <tr>
            <th scope="col">Mail</th>
            <th scope="col">Yuborilgan habar</th>
          </tr>
        </thead>
        {message.map(item => (
          <tbody>
          <tr>
            
            <td>{item?.mail}</td>
            <td>{item?.text}</td>
          </tr>
          </tbody>
        ))}
        
      </table>
    </div>
  );
}

export default App;
