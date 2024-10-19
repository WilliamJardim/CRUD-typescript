import { useEffect, useState, useTransition } from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";

function App() {
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('usarname@domain.com');

  const [pesquisaUser, setPesquisaUser] = useState('');
  const [users,        setUsers]        = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('http://localhost:3000/users');
      const dadosUsuarios = await response.json();
      setUsers(dadosUsuarios.filter( (usr:any)=>{ if( usr.name.toLowerCase().indexOf( pesquisaUser.toLowerCase() ) != -1 ){ return usr } } )); // Supondo que 'dadosUsuarios' seja um array
    }
  
    fetchUsers();
  }, [pesquisaUser]);

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

  function onDeletarUsuario(e:any): void{
    const botao:any    = e.target;
    const indexUsuario:number = botao.indexUsuario;

    
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
         
         <input value={ pesquisaUser } onChange={ ( e:any )=>{ setPesquisaUser(e.target.value) } } placeholder='Pesquisar...'></input>

         <table>
            <tr>
              <td> Name </td>
              <td> Email </td>
            </tr>

            {
              users.map(function(userObj: any, userIndex:number){
                return <tr>
                  <td className={ `coluna-nome  coluna-nome-${ userIndex }` }>  {userObj.name}  </td>
                  <td className={ `coluna-email coluna-email-${ userIndex }` }> {userObj.email} </td>
                  <td className={ `btn-delete` }>

                      <button className={ `btn-delete btn-delete-${userIndex} btn-user-id${userObj.id}` } onClick={ onDeletarUsuario }>
                         <MdDelete/> Delete
                      </button> 

                  </td>

                </tr>
              })
            }

         </table>
      </div>
    </>
  )
}

export default App
