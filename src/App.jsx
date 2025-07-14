import React from 'react'
import { useForm } from 'react-hook-form'
import './styles/Form.css'

function App() {
  //inicializacion de useForm con valores de serie, funcion register y envolvente handleSbumbit
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: { username: '', email: '', password: '' }
  })
  // callback onSubmit se ejecutara solo si pasa la validacion, recogera el objeto data que contiene username email i pass
  const onSubmit = (data) => {
    console.log('Datos del formulario:', data)
  }

  return (
    <div className='app-container'>
      <h1>Registro Usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* mensajes de errores globales para cada input */}
        <div className='alerts'>
          {errors.username && <p>{errors.username.message}</p>}

          {errors.email && <p>{errors.email.message}</p>}
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        {/* campos individuales */}
        <div className='fields'>
          <label htmlFor='username'>Nombre de usuario</label>
          {/* uso htmlFor, su valor debe coincidir con el id del input, lo que lo atará direcamente haciendole foco */}
          <input
            id='username'
            // genero la classe error, que se aplicara si existen errores en el campo. register pasara como primer argumento el username, que quedara en name,
            //  el segundo argumento seran las reglas de este input, es requerido y mostraremos el mensaje sino se cumple.
            className={errors.username ? 'error' : ''}
            {...register('username', {
              required: 'El nombre de usuario es requerido'
            })}
          />
        </div>

        <div className='fields'>
          <label htmlFor='email'>Email </label>
          <input
            id='email'
            className={errors.email ? 'error' : ''}
            {...register('email', {
              required: 'El email es requerido',
              // seguimos el mismo proceso de antes pero le pasamos un value como pattern para asi tener una obligacion a l ahora de setear el email
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: 'Debes poner un formato de email correcto'
              }
            })}
          />
        </div>

        <div className='fields'>
          <label htmlFor='password'>Contraseña</label>
          <input
            id='password'
            type='password'
            className={errors.password ? 'error' : ''}
            {...register('password', {
              required: 'El campo contraseña es requerido',
              pattern: {
                // igual, seteamos las condiciones de nuestra contraseña.
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,8}$/,
                //almenos 8 charact minimo 2
                message:
                  'Contraseña debe incluir letras, numbers y tener max 8 caracteres'
              }
            })}
          />
        </div>
        {/* usando el metodo dirty, consigo solo mostrar el boton de envio cuando el formulario este completo, es decir sus campos esten rellenos. */}
        <button type='submit' disabled={!isDirty}>
          Registrar
        </button>
      </form>
    </div>
  )
}

export default App
