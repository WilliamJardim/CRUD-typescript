import { useState } from 'react'
import './App.css'

function App() {
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('usarname@domain.com');

  function createNewUser(e:any): void{
    e.preventDefault();
    if( name && email ){
    }else{
      alert('Fill all fields!')
    }

    const url = 'http://localhost:3000/users'; // Substitua pela URL do seu servidor

    const data = {
      name:  name,
      email: email
    };

    // Configurações da requisição
    const options = {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json' // Especifica que o conteúdo está no formato JSON
      },
      query: JSON.stringify(data), // Converte os dados para JSON
      body: JSON.stringify(data) // Converte os dados para JSON
    };

    // Enviando a requisição com fetch
    fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          return response.json(); // Transforma a resposta em JSON
        })
        .then(data => {
          alert('Success!');
          console.log('Resposta do servidor:', data);
        })
        .catch(error => {
          console.error('Erro:', error);
        });
  }

  return (
    <>
      <h1> Create a new user </h1>
      <div className='part user-form'>
        <form>
          <input required name="name"  value={ name }  onChange={(e:any)=>{ setName(e.target.value) }}  placeholder='Type your name'/> <br />
          <input name="email" value={ email }          onChange={(e:any)=>{ setEmail(e.target.value) }} placeholder='Type your email'/> <br />

          <button onClick={ createNewUser }>
            Send
          </button>

        </form>
      </div>

      <div className='part user-list'>
         <h1> List all users </h1>
         <table>
            <tr>
              <td> Name </td>
              <td> Email </td>
            </tr>

            <tr>
              <td> Test </td>
              <td> Test </td>
            </tr>
         </table>
      </div>
    </>
  )
}

export default App
