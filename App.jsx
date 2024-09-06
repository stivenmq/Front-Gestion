import axios from "axios"
import e from "cors";
import { useEffect, useState } from 'react'

const initialState={
  username:"",
  email:"",
  password:""
}

function App() {
  const [count, setCount] = useState(0)
 
  const [usuarios,setUsuarios]=useState([]);
  const[isEdit,setIsEdit] = useState(false)

  const [formulario, setFormulario]=useState(initialState);

  const handleChange = (e) => {
    setFormulario({...setFormulario, [e.target.name]:e.target.value});
  }
  

 const getUsuarios= async()=> {
  try {
      const {data} = await axios.get(`http://localhost:4000/user`)
      setUsuarios(data.data);
  } catch (error) {
    console.log(`error en la funcion getUsuarios ${error.message}`)
  }
 };

  useEffect(() => {
      getUsuarios()
  },[]);
  
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const method = isEdit? axios.put : axios.post;
      const url = isEdit
      
      ? `http://localhost:4000/user/registro/${usuarios._id}`
      : `http://localhost:4000/user/login`;

      const { data } = await method(url, usuarios);
      console.log(data.message);

      getUsuarios();
    } catch (error) {
      console.log("error en onSubmit", error.message)
    }
  }

  return (
    <div className='container'>
      <div className="d-flex justify-content-center my-4 ">
        <div className="card: col-12 col-md-5 shadow ">
          <div className="card-header">
            <h4 className="card-title text-center">
              Crear Usuario
            </h4>
          </div>
          <div className="card-body ">
            <form onSubmit={onSubmit}>
              <div className="my-5">
                <label  className="form-label  "> Nombre de Usuario</label>
                  <input 
                  type="text" 
                  name="username"
                  className="form-control"
                  required
                  autoFocus
                  onChange={(e)=> handleChange(e)}
                  value={formulario.username} />      
              </div>
              <div className="mb-3 ">
                <label  className="form-label ">Correo electronico</label>
                  <input 
                  type="email" 
                  name="email"
                  className="form-control"
                  required
                  autoFocus
                  onChange={(e)=> handleChange(e)}
                  value={formulario.email} />      
              </div>
              <div className="mb-3">
                <label  className="form-label">Contraseña</label>
                  <input 
                  type="password" 
                  name="password"
                  className="form-control"
                  required
                  autoFocus
                  onChange={(e)=> handleChange(e)}
                  value={formulario.password} />      
              </div>
              <button className="btn btn-success" type="submit">
                <i className=" fa-solid fa-floppy-disk me-3"/>
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-12">
        <table className=" table table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre de Usuario</th>
              <th>Correo electronico</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {
              usuarios.map((usuario,i)=>(
                <tr key={usuario._id}>
                  <th>{i+1}</th>
                  <th>{usuario.username}</th>
                  <th>{usuario.email}</th>
                  <th>
                    <div className="d-flex justify-content-between ">
                      <i className="fa-solid btn fa-pencil btn-warning mr-6"/>
                      <i className="fa-solid btn fa-trash btn-danger"/>
                    </div>
                  </th>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
